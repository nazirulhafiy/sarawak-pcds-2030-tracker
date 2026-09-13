import { spawnSync } from "node:child_process";

function runGit(args, options = {}) {
  const result = spawnSync("git", args, {
    encoding: "utf8",
    stdio: options.inherit ? "inherit" : "pipe",
  });

  if (result.status !== 0) {
    if (!options.allowFailure) {
      const detail = result.stderr?.trim() || result.stdout?.trim();
      throw new Error(detail || `git ${args.join(" ")} failed`);
    }
    return null;
  }

  return options.inherit ? "" : result.stdout.trim();
}

function requireCleanWorktree(stage) {
  const status = runGit(["status", "--porcelain"]);
  if (status) {
    throw new Error(`The worktree is not clean ${stage}. Commit, stash, or remove these changes first:\n${status}`);
  }
}

function requireRef(ref) {
  const value = runGit(["rev-parse", "--verify", ref], { allowFailure: true });
  if (!value) {
    throw new Error(`The required ref ${ref} is not available. Run git fetch --prune origin first.`);
  }
  return value;
}

function runNpm(script) {
  const result = spawnSync("npm", ["run", script], { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(`npm run ${script} failed`);
  }
}

try {
  requireCleanWorktree("before the release checks");

  const head = requireRef("HEAD");
  const preview = requireRef("origin/preview");
  requireRef("origin/main");

  if (head !== preview) {
    throw new Error(`HEAD must be the exact origin/preview tip.\nHEAD:           ${head}\norigin/preview: ${preview}`);
  }

  if (runGit(["merge-base", "--is-ancestor", "origin/main", "origin/preview"], { allowFailure: true }) === null) {
    throw new Error("origin/main is not an ancestor of origin/preview. Resolve the branch difference before release.");
  }

  console.log(`\nProduction release target: ${preview}`);
  console.log("Changed paths since origin/main:");
  const changedPaths = runGit(["diff", "--name-status", "origin/main..origin/preview"]);
  console.log(changedPaths || "(none)");

  for (const script of ["check:content", "lint", "build:preview", "build"]) {
    console.log(`\nRunning npm run ${script}`);
    runNpm(script);
  }

  requireCleanWorktree("after the release checks");
  console.log(`\nRelease checks passed for origin/preview at ${preview}.`);
} catch (error) {
  console.error(`\nRelease readiness check failed: ${error.message}`);
  process.exitCode = 1;
}
