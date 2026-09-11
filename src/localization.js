// Language resources for the public tracker.  Data IDs, URLs, dates and status
// keys deliberately remain in trackerData.js; this module only supplies display copy.
export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "ms"];

const EN = {
  metadata: { title: "PCDS 2030 Project Tracker", description: "Explore the PCDS 2030 project tracker for the Sarawak Post COVID-19 Development Strategy 2030, with project status, milestones, and public sources." },
  languageControl: { label: "Language", current: "English", switchTo: "Bahasa Melayu" },
  navigation: { primary: "Primary navigation", home: "Home", tracker: "Tracker", updates: "Updates" },
  updatesPage: {
    title: "Updates",
    intro: "A dated record of meaningful public developments reflected in the project tracker, with a supporting source for each entry.",
    entriesLabel: "PCDS 2030 public developments",
    backToTracker: "Project tracker",
    source: "Source:",
  },
  themeToggle: {
    label: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    switchToDark: "Switch to dark mode",
    switchToLight: "Switch to light mode",
  },
  status: {
    "Awaiting Decision": { label: "Ongoing", description: "delivery moving, pending approval, or awaiting next public decision" },
    "In Progress": { label: "Ongoing", description: "delivery moving, pending approval, or awaiting next public decision" },
    Planning: { label: "Planning", description: "scope or delivery being shaped" },
    Operational: { label: "Completed", description: "in use or completed" },
    Designated: { label: "Completed", description: "outcome formally achieved" },
    Enacted: { label: "Completed", description: "law or policy in effect" },
    fallback: { label: "Status", description: "Status is based on available public reporting." },
  },
  filters: { all: "All", planning: "Planning", ongoing: "Ongoing", completed: "Completed" },
  categoryFilters: {
    sectors: "Sectors",
    enablers: "Enablers",
    label: (kind, name) => `${kind}: ${name}`,
    showGroup: (label) => `Show all ${label}`,
    clearGroup: (label) => `Clear ${label} filter`,
    showCategory: (label) => `Show ${label} projects`,
    clearCategory: (label) => `Clear ${label} filter`,
    filteredBy: "Filtered by",
    clearActive: (label) => `Clear active filter: ${label}`,
    results: (count) => `${count} ${count === 1 ? "project" : "projects"} shown`,
  },
  classificationFilters: { label: "Project classification", all: "All", scrollBackward: "Scroll project categories left", scrollForward: "Show more project categories" },
  discovery: {
    label: "Find projects",
    searchLabel: "Search projects",
    placeholder: "Search",
    clear: "Clear",
    clearSearch: "Clear search",
    noSearchResults: (query) => `No projects match “${query}”.`,
    noFilteredResults: "No projects match these filters.",
    refineHint: "Try another search or clear a filter.",
  },
  metrics: { trackedProjects: "Projects", planning: "Planning", ongoing: "Ongoing", completed: "Completed", milestones: "Milestones" },
  milestones: { label: "Milestones", remaining: "Remaining Milestones", next: "Next Milestone", final: "Final milestone", noOpen: "No open milestone", none: "No milestones", count: (done, total, statusGroup) => statusGroup === "completed" ? `${done}/${total}` : `${done}/${total} complete`, progress: (done, total) => `${done} of ${total} milestones completed` },
  facts: { lead: "Lead / parties", value: "Reported value", sources: "Sources" },
  card: { sector: "Sector", enabler: "Enabler", viewDetails: "View details +", hideDetails: "Hide details −", expand: (name) => `View details for ${name}`, collapse: (name) => `Hide details for ${name}`, expandAll: "Show details for all projects", collapseAll: "Hide details for all projects" },
  header: {
    kicker: "Sarawak Development Monitor", title: "Project Tracker", lastUpdated: "Last updated:",
    programmeName: "Sarawak's Post COVID-19 Development Strategy 2030",
    intro: ["Major projects under Sarawak's Post COVID-19 Development Strategy 2030, in one place.", "An independent tracker with project status, milestones and links to public sources."],
  },
  footer: {
    explore: "Explore",
    tracker: "Tracker",
    updates: "Updates",
    contact: "Contact",
    independent: "Built by hafiy.my, an independent tracker. Not affiliated with the Sarawak Government.",
    methodology: "Data sourced from public reports, news outlets, and official announcements. Status and milestones are best-effort based on available information.",
  },
  accessibility: {
    backToTop: "Back to top",
    environment: (name) => `${name} environment`,
    skipToProjects: "Skip to projects",
    projects: "Tracked projects",
  },
};

const MS = {
  metadata: { title: "Papan Pemuka PCDS 2030: Projek & Status | Sarawak", description: "Terokai penjejak projek PCDS 2030 bagi Strategi Pembangunan Pasca COVID-19 Sarawak 2030, termasuk status projek, pencapaian dan sumber awam." },
  languageControl: { label: "Bahasa", current: "Bahasa Melayu", switchTo: "English" },
  navigation: { primary: "Navigasi utama", home: "Utama", tracker: "Tracker", updates: "Kemas Kini" },
  updatesPage: {
    title: "Kemas Kini",
    intro: "Rekod bertarikh mengenai perkembangan awam penting yang dicerminkan dalam 'project tracker', berserta sumber sokongan bagi setiap catatan.",
    entriesLabel: "Perkembangan awam PCDS 2030",
    backToTracker: "Project tracker",
    source: "Sumber:",
  },
  themeToggle: {
    label: "Tema",
    light: "Cerah",
    dark: "Gelap",
    system: "Sistem",
    switchToDark: "Tukar kepada mod gelap",
    switchToLight: "Tukar kepada mod cerah",
  },
  status: {
    "Awaiting Decision": { label: "Pelaksanaan", description: "pelaksanaan bergerak, menunggu kelulusan atau keputusan awam seterusnya" },
    "In Progress": { label: "Pelaksanaan", description: "pelaksanaan bergerak, menunggu kelulusan atau keputusan awam seterusnya" },
    Planning: { label: "Perancangan", description: "skop atau pelaksanaan sedang dirangka" },
    Operational: { label: "Selesai", description: "telah digunakan atau diselesaikan" },
    Designated: { label: "Selesai", description: "hasil telah diiktiraf secara rasmi" },
    Enacted: { label: "Selesai", description: "undang-undang atau dasar telah berkuat kuasa" },
    fallback: { label: "Status", description: "Status adalah berdasarkan laporan awam yang tersedia." },
  },
  filters: { all: "Semua", planning: "Perancangan", ongoing: "Pelaksanaan", completed: "Selesai" },
  categoryFilters: {
    sectors: "Sektor",
    enablers: "Pemboleh",
    label: (kind, name) => `${kind}: ${name}`,
    showGroup: (label) => `Tunjukkan semua ${label}`,
    clearGroup: (label) => `Kosongkan penapis ${label}`,
    showCategory: (label) => `Tunjukkan projek ${label}`,
    clearCategory: (label) => `Kosongkan penapis ${label}`,
    filteredBy: "Ditapis mengikut",
    clearActive: (label) => `Kosongkan penapis aktif: ${label}`,
    results: (count) => `${count} projek dipaparkan`,
  },
  classificationFilters: { label: "Pengelasan projek", all: "Semua", scrollBackward: "Tatal kategori projek ke kiri", scrollForward: "Tunjukkan lebih banyak kategori projek" },
  discovery: {
    label: "Cari projek",
    searchLabel: "Cari projek",
    placeholder: "Cari",
    clear: "Kosongkan",
    clearSearch: "Kosongkan carian",
    noSearchResults: (query) => `Tiada projek sepadan dengan “${query}”.`,
    noFilteredResults: "Tiada projek sepadan dengan penapis ini.",
    refineHint: "Cuba carian lain atau kosongkan penapis.",
  },
  metrics: { trackedProjects: "Projek", planning: "Perancangan", ongoing: "Pelaksanaan", completed: "Selesai", milestones: "Pencapaian" },
  milestones: { label: "Pencapaian Utama", remaining: "Pencapaian Utama yang Baki", next: "Pencapaian Seterusnya", final: "Pencapaian Akhir", noOpen: "Tiada pencapaian utama yang belum selesai", none: "Tiada pencapaian utama", count: (done, total, statusGroup) => statusGroup === "completed" ? `${done}/${total}` : `${done}/${total} selesai`, progress: (done, total) => `${done} daripada ${total} pencapaian utama selesai` },
  facts: { lead: "Peneraju / pihak terlibat", value: "Nilai dilaporkan", sources: "Sumber" },
  card: { sector: "Sektor", enabler: "Pemboleh", viewDetails: "Lihat butiran +", hideDetails: "Sembunyikan butiran −", expand: (name) => `Lihat butiran ${name}`, collapse: (name) => `Sembunyikan butiran ${name}`, expandAll: "Tunjukkan butiran semua projek", collapseAll: "Sembunyikan butiran semua projek" },
  header: {
    kicker: "Sarawak Development Monitor", title: "Project Tracker", lastUpdated: "Kemas kini terakhir:",
    programmeName: "Strategi Pembangunan Pasca COVID-19 2030 Sarawak",
    intro: ["Projek utama di bawah Strategi Pembangunan Pasca COVID-19 2030 Sarawak, di satu tempat.", "Platform pemantauan bebas yang memaparkan pencapaian utama, status semasa dan pautan kepada sumber awam."],
  },
  footer: {
    explore: "Terokai",
    tracker: "Tracker",
    updates: "Kemas Kini",
    contact: "Hubungi",
    independent: "'Project tracker' dibangunkan oleh hafiy.my. Tidak berafiliasi dengan Kerajaan Sarawak.",
    methodology: "Data diperoleh daripada laporan awam, portal berita dan pengumuman rasmi. Status dan pencapaian utama ialah rumusan terbaik berdasarkan maklumat yang tersedia.",
  },
  accessibility: {
    backToTop: "Kembali ke atas",
    environment: (name) => `persekitaran ${{ development: "pembangunan", preview: "pratonton", production: "produksi" }[name] || name}`,
    skipToProjects: "Langkau ke projek",
    projects: "Projek yang dijejaki",
  },
};

/** Returns all fixed rendered copy. Unknown languages safely use English. */
export function getUiCopy(language = DEFAULT_LANGUAGE) {
  return language === "ms" ? MS : EN;
}

const SECTOR_NAMES = {
  manufacturing: "Pembuatan", agriculture: "Pertanian Komersial", tourism: "Pelancongan", forestry: "Perhutanan", mining: "Perlombongan", "social-services": "Perkhidmatan Sosial", "digital-transformation": "Transformasi Digital", innovation: "Inovasi", education: "Pendidikan dan Modal Insan", infrastructure: "Infrastruktur Asas", utilities: "Utiliti", transport: "Pengangkutan", "renewable-energy": "Tenaga Boleh Baharu", overview: "Kerangka PCDS 2030",
};

// Explicit editorial translations keyed by immutable canonical project name. Source labels
// remain source-language citations so that linked report/article titles are not misrepresented.
const PROJECT_TRANSLATIONS = {
  "SMD Semiconductor — GaN Chip Development": { displayName: "Pembangunan Cip Gallium Nitride (GaN)", lead: "SMD Semiconductor (milik kerajaan negeri)", value: "Tidak didedahkan", summary: "Usaha niaga semikonduktor milik kerajaan negeri yang membangunkan cip Gallium Nitride (GaN) dipertingkatkan AI, termasuk keteq.GaN dan keteq.ai. Ia bertujuan membina keupayaan semikonduktor Sarawak.", milestones: ["Premier mengumumkan kejayaan pembangunan cip GaN", "MoA integrasi dan pengkomersialan Linyang ditandatangani", "Pendaftaran harta intelek global", "Pengkomersialan bermula"] },
  "Samalaju SME Cluster": { displayName: "Kluster PKMS Samalaju", lead: "Kementerian Perdagangan Antarabangsa, Industri dan Pelaburan (MINTRED)", value: "RM223 juta", summary: "Pembangunan lot industri secara berfasa di dalam Taman Perindustrian Samalaju, dirancang dalam 10 fasa di kawasan seluas 96.72 hektar dengan anggaran kos pembangunan RM223 juta. Fasa 1 dan Fasa 2 yang telah siap membabitkan kos RM25.8 juta serta menyediakan 21 lot industri untuk perusahaan mikro, kecil dan sederhana tempatan yang membekalkan produk dan perkhidmatan kepada industri di Samalaju.", milestones: ["Fasa 1 dan Fasa 2 mencapai penyiapan", "Kluster dilancarkan secara rasmi", "Baki lapan fasa menyediakan lot industri untuk PMKS tempatan"] },
  "SMA Rural Telecommunication (SMART)": { displayName: "Kesalinghubungan Luar Bandar SMART", lead: "Sarawak Multimedia Authority / SDEC", value: "RM1.5 bilion", summary: "Program kesalinghubungan luar bandar seluruh Sarawak yang menggunakan menara SMART600 berkongsi dan membolehkan jalur lebar rumah MySRBN untuk komuniti yang kurang mendapat liputan. SMA memiliki program ini dan SDEC mengetuai pelaksanaannya, dengan MCMC serta pengendali mudah alih menyokong operasi perkhidmatan.", milestones: ["SMART dilancarkan di Nanga Sekukut", "Menara SMART mula beroperasi dengan MySRBN", "Perjanjian sokongan operasi SMART600 ditandatangani", "Baki menara SMART600 telah beroperasi"] },
  "Sarawak Artificial Intelligence Centre (SAIC)": { displayName: "Pusat Kecerdasan Buatan Sarawak (SAIC)", lead: "Pusat Kecerdasan Buatan Sarawak (SAIC) / Sarawak Artificial Intelligence Centre Sdn Bhd", value: "RM5 juta", summary: "Pusat Kecerdasan Buatan Sarawak (SAIC) ialah agensi AI operasi negeri, dilancarkan pada 2025 di Unifor Complex, Kuching, untuk memacu AI buatan sendiri bagi perkhidmatan awam, bakat dan kedaulatan data. Belanjawan 2026 memperuntukkan RM5 juta untuk operasi; Pelan Induk AI Sarawak sedang dibangunkan selepas sesi permulaan Julai 2026.", milestones: ["Negeri melancarkan SAIC sebagai agensi AI operasi", "CEO dikenal pasti secara terbuka dan prototaip IDECS ditunjukkan", "RM5 juta diperuntukkan bagi operasi SAIC", "SAIC dan SCSDU memulakan Pelan Induk AI", "Penerbitan Pelan Induk AI Sarawak"] },
  "RM1 Billion Paddy Infrastructure Programme": { displayName: "Program Infrastruktur Padi", lead: "Kerajaan Sarawak / Jabatan Pertanian", value: "RM1 bilion", summary: "Program seluruh negeri bagi pengairan, perparitan dan jalan ladang untuk penanaman padi. Peruntukan RM1 bilion menyokong usaha Sarawak mencapai sara diri beras.", milestones: ["Peruntukan RM1 bilion bagi penanaman padi diumumkan", "Pengelompokan petani dan pajakan tanah padi", "Pengeluaran beras tahunan mencapai 500,000 tan"] },
  "Lubok Punggor AgriHub and Mid Sadong 1 Irrigation Project": { displayName: "Projek AgriHub dan Pengairan Lubok Punggor", lead: "Kerajaan Sarawak / Jabatan Pengairan dan Saliran Sarawak", value: "RM30 juta", summary: "Projek fasa awal bernilai RM30 juta di Lubok Punggor, Gedong, merangkumi infrastruktur pengairan bagi 54.4 hektar sawah padi. Skop AgriHubnya merangkumi naik taraf pengairan dan perparitan, takungan air, gudang serta bengkel jentera untuk menyokong pengeluaran padi moden.", milestones: ["Projek fasa awal bernilai RM30 juta diluluskan", "Skim Pemulihan Mid Sadong 1 dilancarkan", "Pampasan tanah diserahkan kepada 119 penerima", "Kerja AgriHub dan pengairan mencapai penyiapan"] },
  "Sarawak Agrotechnology Park": { displayName: "Taman Agroteknologi Sarawak", lead: "Kerajaan Sarawak", value: "RM19.5 juta", summary: "Taman pertanian berasaskan teknologi di Semenggok dan Tarat, termasuk ladang udang kara di Tarat. Belanjawan 2026 memperuntukkan RM19.5 juta bagi kedua-dua tapak untuk menyokong pertanian berteknologi.", milestones: ["Ladang udang kara mula beroperasi di SARTECH Tarat", "RM5 juta diperuntukkan kepada Semenggok dan Tarat", "Peruntukan pembangunan RM19.5 juta diumumkan", "Pembangunan tapak Semenggok dan Tarat mencapai penyiapan"] },
  "Sungai Baji Agropark": { displayName: "Agropark Sungai Baji", lead: "Kementerian Industri Makanan, Komoditi dan Pembangunan Wilayah / LCDA", value: "RM180 juta", summary: "Pembangunan pertanian komersial di Sungai Baji, Sarikei. Pelan tindakan PCDS 2030 merekodkan RM180 juta pembiayaan negeri yang dirancang, terdiri daripada RM29 juta diluluskan di bawah RMK-12 dan anggaran RM151 juta bagi kawasan selebihnya.", milestones: ["LCDA melantik syarikat peneraju", "Komponen infrastruktur dan pertanian siap", "Operasi agropark bermula", "Pengeluaran komersial bermula"] },
  "Rambungan Sustainable Shrimp Aquaculture Project": { displayName: "Projek Akuakultur Udang Lestari Rambungan", lead: "Rambungan Aqua Life Sdn Bhd", value: "Tidak didedahkan", summary: "Projek Akuakultur Udang Lestari Rambungan ialah inisiatif ternakan berorientasikan ESG seluas 297 hektar di Loba Stoh, Rambungan. Diterajui Rambungan Aqua Life Sdn Bhd, projek ini menggunakan amalan akuakultur moden untuk menghasilkan udang premium bagi pasaran domestik dan eksport.", milestones: ["Program penuaian udang diadakan", "Tender pembinaan tangki asuhan udang diterbitkan", "94 kolam ternakan udang baharu dibina", "Pengeluaran tahunan mencapai 1,349 tan", "Eksport tahunan mencapai RM27 juta"] },
  "Selangau Pig Farming Area": { displayName: "Kawasan Penternakan Babi Selangau", lead: "Best Pork Sdn Bhd / Lembaga Kemajuan Tanah Sarawak", value: "RM300 juta", summary: "Kawasan penternakan babi berpusat seluas 232.69 hektar di Sungai Selabi, Selangau, dibina untuk 12,000 ternakan induk menggunakan sistem kandang tertutup, amalan sifar pelepasan dan kemudahan biogas. Kos projek RM300 juta dinyatakan pada majlis pecah tanah November 2024, dan ladang ini bertujuan meluaskan pengeluaran babi Sarawak dengan standard biosekuriti yang lebih ketat.", milestones: ["Pihak Berkuasa Perancang Negeri meluluskan tapak ladang", "Majlis pecah tanah diadakan di Sungai Selabi", "Kerja pembersihan tanah dan infrastruktur bermula", "Infrastruktur asas tapak mencapai penyiapan", "Ladang mula menghasilkan babi pedaging"] },
  "Sarawak Delta Geopark - UNESCO Global Geopark Designation": { displayName: "Geopark Global UNESCO Delta Sarawak", lead: "Kerajaan Sarawak / UNESCO", value: "Tidak didedahkan", summary: "Geopark Global UNESCO seluas 3,112 km² di kawasan Kuching-Santubong-Bako yang menonjolkan warisan geologi Sarawak. Ia dikenali sebagai \"Borneo's Cradle of Origin\".", milestones: ["Dossier pencalonan geopark disediakan", "Penilaian lapangan UNESCO selesai", "Penerimaan Majlis UNESCO diperoleh", "Diiktiraf sebagai Geopark Global UNESCO"] },
  "The Archaeological Heritage of Niah National Park’s Caves Complex": { displayName: "Tapak Warisan Arkeologi Gua Niah", lead: "Sarawak Forestry Corporation / Jabatan Muzium Sarawak", value: "Tidak didedahkan", summary: "Tapak Warisan Dunia UNESCO di Taman Negara Niah yang kompleks guanya memelihara sekurang-kurangnya 50,000 tahun interaksi manusia dengan persekitaran hutan hujan. Tapak ini melindungi bukti sejarah panjang manusia dan alam sekitar di Sarawak.", milestones: ["Dicalonkan untuk penyenaraian Warisan Dunia UNESCO", "Disenaraikan sebagai Tapak Warisan Dunia UNESCO"] },
  "Environment (Reduction of Greenhouse Gases Emission) Ordinance 2023": { displayName: "Ordinan Pelepasan Gas Rumah Hijau 2023", lead: "Kerajaan Sarawak", value: "Tidak berkenaan", summary: "Kerangka negeri untuk mengawal selia pelepasan gas rumah hijau. Sektor ekonomi berjadual perlu mendaftar dan mengemukakan laporan tahunan yang disokong oleh juruaudit luar bertauliah.", milestones: ["Ordinan dikuatkuasakan", "Peraturan juruaudit luar bertauliah diwujudkan", "GHG-MS Fasa 1 mula beroperasi", "Sektor berjadual mengemukakan laporan pelepasan yang disahkan"] },
  "Sarawak Climate Change Centre": { displayName: "Pusat Perubahan Iklim Sarawak", lead: "Kementerian Tenaga dan Kelestarian Alam Sekitar (MEESty) / Jabatan Premier", value: "Tidak didedahkan", summary: "Cadangan Pusat Perubahan Iklim Sarawak ialah hab dasar iklim, digambarkan sebagai lengan teknikal masa depan Unit Diplomasi Iklim dan Tenaga. Ia belum beroperasi sebagai institusi berasingan; tiada alamat, pengarah atau belanjawan khusus pusat yang diterbitkan.", milestones: ["Negeri mengumumkan pusat selepas kajian penubuhan siap", "Premier menggambarkan pusat sebagai hab serantau yang sedang ditubuhkan", "Dinamakan lengan teknikal Unit Diplomasi", "Pusat mula beroperasi sebagai institusi berasingan"] },
  "Bako National Park ASEAN Heritage Park": { displayName: "Taman Negara Bako, Taman Warisan ASEAN", lead: "Kerajaan Sarawak", value: "Tidak didedahkan", summary: "Taman Negara Bako ialah kawasan perlindungan seluas 2,727 hektar berhampiran Kuching dengan dataran batu pasir dan hutan kerangas. Status Taman Warisan ASEAN mengiktiraf habitat monyet belanda, spesies migrasi dan fauna terancam lain yang penting kepada pemuliharaan serantau.", milestones: ["Penilaian Pusat Biodiversiti ASEAN selesai", "Kerajaan Sarawak mengesahkan pencalonan taman secara terbuka", "Diiktiraf sebagai Taman Warisan ASEAN ke-65"] },
  "Lambir Hills National Park ASEAN Heritage Park": { displayName: "Taman Negara Bukit Lambir, Taman Warisan ASEAN", lead: "Kerajaan Sarawak", value: "Tidak didedahkan", summary: "Taman Negara Bukit Lambir berhampiran Miri melindungi hutan hujan dengan kepelbagaian pokok yang luar biasa, rupa bumi berceranggah, tubir dan air terjun. Status Taman Warisan ASEAN mengiktiraf taman ini sebagai Kawasan Burung Penting dan pusat kepelbagaian serta endemisme tumbuhan global.", milestones: ["Penilaian Pusat Biodiversiti ASEAN selesai", "Kerajaan Sarawak mengesahkan pencalonan taman secara terbuka", "Diiktiraf sebagai Taman Warisan ASEAN ke-66"] },
  "Semenggoh Rainforest Discovery Centre": { displayName: "Pusat Penemuan Hutan Hujan Semenggoh", lead: "Kementerian Pembangunan Bandar dan Sumber Asli / Sarawak Forestry Corporation", value: "RM30 juta", summary: "Pembangunan ekopelancongan dan penyelidikan biodiversiti tiga peringkat di Rizab Semula Jadi Semenggoh, merangkumi pintu masuk, kemudahan pelawat, taman botani dan infrastruktur penyelidikan. Projek ini disokong oleh peruntukan RM30 juta.", milestones: ["Majlis asas dan peruntukan RM30 juta diumumkan", "Zon Pusat Hidupan Liar Fasa 1 mencapai penyiapan", "Zon Pintu Masuk Fasa 2 mencapai penyiapan", "Zon Botani Fasa 3 mencapai penyiapan"] },
  "Piasau Nature Reserve Discovery Centre": { displayName: "Pusat Penemuan Rizab Alam Piasau", lead: "Sarawak Forestry Corporation / Kerajaan Sarawak", value: "RM30 juta", summary: "Kemudahan ekopelancongan marin dan pemuliharaan bernilai RM30 juta di Rizab Alam Piasau, Miri. Ia merangkumi pusat interpretasi dan pejabat bagi menyokong Taman Negara Terumbu Karang Miri-Sibuti dan Taman Negara Beting Luconia.", milestones: ["Pembangunan pusat penemuan bermula", "Pusat penemuan mencapai penyiapan"] },
  "Marudi Forest Conservation and Restoration Project": { displayName: "Projek Pemuliharaan dan Pemulihan Hutan Marudi", lead: "SaraCarbon Sdn Bhd", value: "Tidak didedahkan", summary: "Projek Pemuliharaan dan Pemulihan Hutan Marudi ialah inisiatif pemuliharaan dan pemulihan hutan paya gambut seluas 25,675 hektar di Marudi. Diuruskan oleh SaraCarbon Sdn Bhd, projek ini bertujuan melindungi simpanan karbon hutan dan menjana kredit karbon boleh niaga di bawah kerangka karbon Sarawak.", milestones: ["Permit kajian karbon hutan diberikan", "Lesen karbon hutan pertama Sarawak dikeluarkan", "Kredit karbon yang disahkan secara bebas diterbitkan"] },
  "Sarawak Reef Ball Project": { displayName: "Projek Bebola Terumbu Sarawak", lead: "Sarawak Forestry Corporation", value: "RM100 juta", summary: "Program pemuliharaan marin seluruh Sarawak yang diterajui Sarawak Forestry Corporation dan menempatkan bebola terumbu dari Tanjung Datu hingga Lawas untuk memulihkan habitat, melindungi kawasan perikanan dan menyokong mata pencarian pesisir. Fasa I menerima RM70 juta dan Fasa II RM30 juta, menjadikan gabungan peruntukan awam bagi kedua-dua fasa RM100 juta.", milestones: ["Penempatan Fasa I diselesaikan", "RM30 juta diperuntukkan bagi Fasa II", "Terumbu tiruan sepanjang 746km menerima pengiktirafan antarabangsa", "Libat urus pemegang taruh Fasa II bermula", "80 bebola terumbu ditempatkan di Kuala Nyalau-Samalaju", "Fasa II mencapai penyiapan berjadual"] },
  "Bau Gold Project": { displayName: "Projek Emas Bau", lead: "Besra Gold Inc / North Borneo Gold Sdn Bhd", value: "RM1.38 bilion", summary: "Projek penerokaan dan pembangunan emas di Bau yang diterajui Besra melalui North Borneo Gold. PCDS 2030 Highlights 2023 mengunjurkan RM1.38 bilion pelaburan huluan.", milestones: ["Semakan teknikal bebas selesai", "Pembaharuan pajakan perlombongan Jugan diluluskan secara bersyarat", "Syarat pembaharuan pajakan bersyarat diterima", "Tawaran pembaharuan bersyarat diterima secara rasmi", "Pemuktamadan syarat pajakan perlombongan"] },
  "Sarawak Cancer Centre": { displayName: "Pusat Kanser Sarawak", lead: "JKR / Kerajaan Sarawak", value: "RM1.52 bilion", summary: "Pusat kanser pakar yang dirancang di Kota Samarahan, dengan anggaran awal projek RM1.52 bilion. Ia bertujuan meluaskan akses kepada rawatan kanser khusus di Sarawak.", milestones: ["Anggaran kos awal RM1.52 bilion diumumkan", "Perdana Menteri mengarahkan tender S1 2026 dipercepatkan", "Sarawak memperuntukkan RM500 juta untuk peralatan perubatan", "Peringkat perolehan reka dan bina disahkan", "Pembinaan bermula", "Pusat kanser mencapai penyiapan"] },
  "Special Needs Community Centre": { displayName: "Pusat Komuniti Keperluan Khas", lead: "Kerajaan Sarawak", value: "RM30 juta", summary: "Fasa pertama Pusat Komuniti Keperluan Khas bernilai RM30 juta di Samarahan akan menggabungkan intervensi awal, latihan vokasional, terapi dan penginapan pelatih dalam satu kemudahan. Ia direka untuk menyokong orang kurang upaya sejak zaman kanak-kanak hingga pembangunan kemahiran, kesediaan pekerjaan dan penjagaan jangka panjang.", milestones: ["Skop Fasa 1 bernilai RM30 juta diumumkan", "Tender projek dibuka", "Surat setuju terima dikeluarkan", "Fasa 1 mencapai penyiapan"] },
  "One-Stop Early Intervention Centre (OSEIC) Miri": { displayName: "OSEIC Miri", lead: "Kerajaan Sarawak", value: "RM5.743 juta", summary: "OSEIC Miri ialah pusat intervensi awal di Tudan bagi kanak-kanak berkeperluan khas berumur bawah tujuh tahun. Disokong geran pembangunan kerajaan RM5.743 juta, pusat ini akan menyediakan diagnosis, penilaian dan intervensi tersuai lebih dekat kepada keluarga di utara Sarawak.", milestones: ["Geran pembangunan RM3.047 juta diluluskan", "Geran tambahan RM2.696 juta diluluskan", "Kemajuan projek dinilai di tapak Tudan", "Pusat mula beroperasi"] },
  "Community Social Support Centre (CSSC) Network": { displayName: "Rangkaian Pusat Sokongan Sosial Komuniti", lead: "Kementerian Pembangunan Wanita, Kanak-Kanak dan Kesejahteraan Komuniti / Majlis Pembangunan Sosial", value: "Tidak didedahkan", summary: "Rangkaian pusat sehenti seluruh Sarawak yang menyediakan rujukan, kaunseling, sokongan krisis dan program komuniti kepada golongan rentan. Kementerian dan Majlis Pembangunan Sosial sedang memperluas rangkaian ini bersama agensi awam, NGO dan rakan swasta.", milestones: ["Perjanjian bagi pusat pertama di Kuching ditandatangani", "Pusat Sibu dilancarkan dan diserahkan kepada pengendalinya", "Pusat Kuching beroperasi", "Sebutharga pembekalan perabot Bintulu dipanggil", "Pusat Bintulu mula beroperasi", "Pusat tambahan di bahagian lain mula beroperasi"] },
  "CHITOSE Carbon Capture Central Sarawak": { displayName: "CHITOSE Tangkapan Karbon Central Sarawak", lead: "CHITOSE Group / Sarawak Energy / Sarawak Biodiversity Centre", value: "USD18.3 juta", summary: "Kemudahan pengeluaran mikroalga industri dan tangkapan karbon di loji janakuasa arang batu Sejingkat milik Sarawak Energy. Kemudahan C4 Sarawak seluas lima hektar menerima lebih USD18.3 juta pembiayaan Kerajaan Jepun dan menggunakan gas serombong untuk menghasilkan mikroalga bagi biojisim serta tangkapan karbon.", milestones: ["Projek tangkapan karbon mikroalga bermula", "Pembinaan kemudahan C4 seluas lima hektar siap", "Pengeluaran mikroalga industri bermula", "Kemudahan mikroalga industri dilancarkan secara rasmi"] },
  "Sarawak Bioindustrial Park": { displayName: "Taman Bioindustri Sarawak", lead: "Pusat Biodiversiti Sarawak / BioVerde Technologies", value: "RM10 juta", summary: "Hab pengkomersialan bioindustri empat fasa seluas 100 ekar di Kota Samarahan. Belanjawan 2026 memperuntukkan RM10 juta bersama-sama untuk taman ini dan Pusat Komersial Bioproses SBC yang berkaitan.", milestones: ["Pelan pembangunan empat fasa Taman Bioindustri diumumkan", "BioVerde ditubuhkan dengan mandat pengurusan taman", "Peruntukan gabungan RM10 juta dalam Belanjawan 2026 diumumkan", "Tender pakej pelaksanaan gabungan dianugerahkan", "Pembinaan Hab Pusat dimulakan secara rasmi", "Pemilihan rakan peneraju dan penyelidikan", "Pembinaan Hab Pusat mencapai penyiapan", "Operasi kemudahan gabungan bermula"] },
  "Kota Petra Green Technology Park": { displayName: "Taman Teknologi Hijau Kota Petra", lead: "Zecon Berhad", value: "RM328 juta", summary: "Pembangunan teknologi hijau seluas 3,000 ekar berhampiran Demak Laut dan Senari, dengan solar, penyimpanan tenaga dan pusat data sedia AI. Fasa 1 meliputi 300 ekar serta kemudahan 100MWac di bawah kontrak EPCC RM328 juta.", milestones: ["Lesen penjanaan solar 300MW diperoleh", "Perjanjian pembelian tenaga 30 tahun ditandatangani", "Penyediaan tapak Fasa 1 mencapai 150 ekar dibersihkan", "Kontrak EPCC Fasa 1 RM328 juta dianugerahkan", "Pembersihan tapak Fasa 1 selesai", "Operasi komersial bermula", "Jambatan kekal Sungai Serai mencapai penyiapan"] },
  "PETRONAS Kasawari Carbon Capture and Storage Project": { displayName: "Projek Tangkapan dan Penyimpanan Karbon Kasawari", lead: "PETRONAS / MMHE", value: "RM4.5 bilion", summary: "Pembangunan tangkapan dan penyimpanan karbon Fasa 2 yang berkaitan dengan Medan Kasawari luar pesisir PETRONAS. Anggaran 2022 meletakkan nilai projek pada RM4.5 bilion bagi platform CCS khusus dan sambungannya ke platform pemprosesan pusat Fasa 1.", milestones: ["Keputusan pelaburan muktamad diluluskan", "MMHE dianugerahkan kontrak EPCIC CCS Kasawari", "PETRONAS mengumumkan semakan jadual suntikan lebih awal", "Suntikan CO2 pertama"] },
  "Sarawak Science Centre (SSCiEX)": { displayName: "Pusat Sains Sarawak (SSCiEX)", lead: "Sarawak Research and Development Council (SRDC)", value: "Tidak didedahkan", summary: "SSCiEX ialah pusat sains lima tingkat di Jalan Stadium, Kuching, dengan 22 galeri bertema dan lebih 400 pameran interaktif. Ia menyediakan ruang imersif kepada pelajar, keluarga dan masyarakat untuk meneroka sains, teknologi dan inovasi.", milestones: ["Pelan induk pusat sains diluluskan", "Kerja cerucuk bermula", "Pusat lima tingkat siap", "Pusat dilancarkan secara rasmi", "Pusat dibuka kepada pengunjung"] },
  "Sarawak Infectious Disease Centre": { displayName: "Pusat Penyakit Berjangkit Sarawak", lead: "Pusat Penyakit Berjangkit Sarawak (SIDC)", value: "RM300 juta", summary: "Pusat Penyakit Berjangkit Sarawak sedang membangunkan kampus penyelidikan One Health bersebelahan Pusat Jantung Sarawak di Samarahan, selepas pelaburan kerajaan lebih RM300 juta. Makmal dan kemudahan sokongannya direka untuk pengawasan penyakit, diagnostik, penyelidikan vaksin dan kerja Tahap Biokeselamatan 3.", milestones: ["Pusat Penyakit Berjangkit Sarawak ditubuhkan", "Organisasi penyelidikan mula beroperasi", "Pembinaan kampus mencapai 40.19 peratus", "Kampus Samarahan mencapai penyiapan"] },
  "Yayasan Sarawak International Secondary Schools Expansion": { displayName: "Perluasan Sekolah Antarabangsa Yayasan Sarawak", lead: "Yayasan Sarawak / Kerajaan Sarawak", value: "RM120-135 juta", summary: "Rangkaian sekolah menengah antarabangsa yang disokong negeri untuk meluaskan akses pendidikan kepada pelajar luar bandar dan berpendapatan rendah. Bagi tiga sekolah yang masih berbaki, anggaran terbitan RM120 juta hingga RM135 juta adalah berdasarkan anggaran 2022 sebanyak RM40 juta hingga RM45 juta bagi setiap sekolah.", milestones: ["Kampus Petra Jaya mula beroperasi", "Tiga kampus siap di seluruh negeri", "Tarikh pembukaan kampus Sibu diumumkan", "Pembinaan kampus Miri dan Bintulu dimulakan", "Kampus Miri dan Bintulu mencapai penyiapan", "Kampus keenam mencapai penyiapan"] },
  "FR21 Jalan Serian-Tebedu-Indonesia Border Upgrade": { displayName: "Naik Taraf Jalan Serian-Tebedu-Sempadan Indonesia", lead: "Kementerian Kerja Raya Persekutuan / JKR Sarawak", value: "RM0.5-1 bilion", summary: "Cadangan menaik taraf Laluan Persekutuan 21 daripada dua lorong kepada empat lorong antara Serian, Tebedu dan sempadan Indonesia. JKR Sarawak menyatakan skop jalan sepanjang 42 km, manakala laporan Parlimen November 2025 menyatakan kira-kira 48 km dan 10 jambatan baharu; anggaran awalnya melebihi RM500 juta dan mungkin mencecah RM1 bilion, tertakluk kepada pemuktamadan selepas kerja awalan.", milestones: ["Taklimat pihak berkepentingan mengenai kerja awalan dan reka bentuk diadakan", "Anggaran awal dan skop laporan yang lebih luas didedahkan", "Kementerian Kerja Raya Persekutuan mengesahkan kerja awalan RM13 juta RMK-12", "JKR menutup tender semula perundingan C&S termasuk RSA dan TIA", "Kerja awalan selesai menjelang akhir 2026 dan kos sebenar dimuktamadkan", "Kerja menaik taraf jalan empat lorong dan jambatan bermula"] },
  "Coastal Road Network and Second Trunk Road (CSTR)": { displayName: "Rangkaian Jalan Pesisir & Jalan Utama Kedua", lead: "Kerajaan Sarawak", value: "RM11 bilion", summary: "Program jalan, jambatan dan pemulihan di seluruh Sarawak yang merangkumi Rangkaian Jalan Pesisir dan Jalan Utama Kedua. Nilai masing-masing RM5.42 bilion dan RM5.58 bilion membentuk program gabungan RM11 bilion, termasuk pakej Jambatan Sejingkat yang masih aktif.", milestones: ["Pembinaan Jambatan Sejingkat kekal mengikut jadual", "Jambatan Sejingkat dibuka kepada lalu lintas", "Jambatan Sejingkat mencapai penyiapan kontrak", "Pakej jalan dan jambatan CSTR yang berbaki mencapai penyiapan"] },
  "SCORE — Sarawak Corridor of Renewable Energy": { displayName: "Koridor Tenaga Boleh Baharu Sarawak (SCORE)", lead: "RECODA", value: "RM125 bilion", summary: "Koridor pembangunan yang merangkumi Samalaju, Tanjung Manis, Mukah, Baram dan Tunoh, dengan pelaburan terkumpul lebih RM125 bilion. Melalui RECODA, URDA, HDA dan NRDA, ia menyokong pembangunan perindustrian, luar bandar dan pedalaman.", milestones: ["Lebih RM125 bilion pelaburan dan 53,000 pekerjaan dilaporkan", "Taman perindustrian berkembang dan menarik pelaburan", "URDA, HDA dan NRDA menyiapkan infrastruktur luar bandar"] },
  "Kuching Low-Carbon Hub": { displayName: "Hab Rendah Karbon Kuching", lead: "PETROS", value: "Tidak didedahkan", summary: "Cadangan Hab Rendah Karbon Kuching di Tanjung Embang ialah zon strategik bagi industri, perdagangan dan logistik rendah karbon, diterajui PETROS dengan China Jiangsu International dan Sumitomo sebagai rakan peneraju. Ia berada bersama Lapangan Terbang Antarabangsa Kuching Baharu dan Pelabuhan Laut Dalam Tanjung Embang yang dijejak secara berasingan; kos modal seluruh hab tidak didedahkan.", milestones: ["Dilancarkan di Sidang Peta Hala Tuju Gas Sarawak", "PETROS dan CJI menandatangani Perjanjian Kerjasama Strategik", "Dinamakan zon strategik cadangan", "PETROS dan CJI menandatangani Perjanjian Rangka Kerja", "PETROS dan Sumitomo memajukan pembangunan bersama hab", "Pelan induk terperinci mencapai pemuktamadan", "Pembangunan fizikal dan infrastruktur bermula melalui PPP"] },
  "Pan Borneo Highway Sarawak Phase 1": { displayName: "Lebuh Raya Pan Borneo Sarawak Fasa 1", lead: "Kerajaan Persekutuan / JKR", value: "RM16.5 bilion", summary: "Lebuh raya dua lorong sehala sepanjang 786 km dari Telok Melano ke Miri, merangkumi 11 pakej kerja dan kos pembinaan RM16.5 bilion. Ia memperkukuh kesalinghubungan di seluruh Sarawak.", milestones: ["Pembinaan Fasa 1 bermula", "Fasa 1 mencapai 98.6 peratus siap", "Sepuluh pakej kerja siap dan dibuka", "Pakej Kerja 11 mencapai penyiapan penuh"] },
  "Sarawak-Sabah Link Road": { displayName: "Jalan Penghubung Sarawak-Sabah", lead: "Kerajaan Persekutuan / JKR", value: "RM7.6 bilion", summary: "Jalan dua fasa yang menghubungkan Sarawak dan Sabah secara langsung tanpa melalui Brunei. Nilai RM7.6 bilion adalah bagi Fasa 2 sahaja, dan projek ini meningkatkan kesalinghubungan kawasan luar bandar serta pedalaman.", milestones: ["Pembinaan Fasa 1 bermula", "Fasa 2 dilancarkan secara rasmi", "Fasa 1 mencapai kemajuan 70.05 peratus", "Fasa 1 mencapai kemajuan 71.16 peratus", "Fasa 2 mencapai kemajuan fizikal 11.39 peratus", "Fasa 1 mencapai penyiapan", "Fasa 2 mencapai penyiapan"] },
  "Bintulu-Samalaju Gas Pipeline": { displayName: "Saluran Paip Gas Bintulu-Samalaju", lead: "PETROS / Kerajaan Sarawak", value: "RM1 bilion", summary: "Saluran paip gas kira-kira 70 km yang disokong komitmen RM1 bilion untuk membekalkan Taman Perindustrian Samalaju dan stesen janakuasa kitaran gabungan Bintulu. Ia menyokong permintaan tenaga industri dan penjanaan elektrik di koridor Bintulu-Samalaju.", milestones: ["Komitmen RM1 bilion dan pembuatan paip dilaporkan", "Bahagian saluran paip luar pesisir siap", "Aktiviti prapentauliahan saluran paip dimaklumkan", "Operasi komersial secara berperingkat bermula"] },
  "Miri Combined Cycle Gas Turbine (CCGT) Power Plant": { displayName: "Loji Janakuasa CCGT Miri", lead: "Petroleum Sarawak Berhad (PETROS)", value: "RM2 bilion", summary: "Loji Janakuasa Turbin Gas Kitaran Gabungan Miri bernilai RM2 bilion ialah kemudahan penjanaan 500MW di Jalan Pantai, Lutong. Dibangunkan oleh Petroleum Sarawak Berhad, loji ini bertujuan memperkukuh kebolehpercayaan dan kecekapan bekalan elektrik Sarawak.", milestones: ["Kerja tanah bermula", "Projek mencapai 45 peratus siap", "Turbin gas M701F dipasang", "Loji janakuasa mencapai penyiapan"] },
  "Sejingkat Battery Energy Storage System": { displayName: "Sistem Penyimpanan Tenaga Bateri Sejingkat", lead: "Sarawak Energy", value: "RM128 juta", summary: "Sistem penyimpanan tenaga bateri 60MW/82MWh di Sejingkat yang menggunakan 22 kontena, dengan pelaburan RM128 juta oleh Sarawak Energy. Ia menyokong rizab grid, kawal selia dan pengurusan permintaan puncak.", milestones: ["Sistem 60MW/82MWh dibekalkan tenaga", "Pentauliahan BESS berskala utiliti diumumkan"] },
  "Sarawak-Singapore Electricity Interconnection": { displayName: "Sambungan Elektrik Sarawak-Singapura", lead: "Sarawak Energy / Sembcorp Utilities", value: "Tidak didedahkan", summary: "Cadangan sambungan rentas sempadan untuk mengeksport sekitar 1GW tenaga boleh baharu dari Sarawak ke Singapura. Ia menyokong perdagangan tenaga serantau.", milestones: ["Kajian tekno-komersial dijalankan bersama rakan Singapura", "Kelulusan bersyarat diperoleh", "Projek memperoleh kelulusan dan lesen kawal selia lanjut", "Eksport elektrik bermula"] },
  "Miri Port Kuala Baram Capital Dredging": { displayName: "Pengorekan Modal Kuala Baram", lead: "Miri Port Authority / Rimbun Prima-CCCC JV", value: "RM238 juta", summary: "Projek pengorekan dan benteng latihan di Kuala Baram untuk mendalamkan serta menstabilkan saluran akses Pelabuhan Miri. Kontraknya bernilai RM238 juta dan menyokong akses maritim.", milestones: ["Kontrak pengorekan RM238 juta dianugerahkan", "Kemajuan fizikal mencapai kira-kira 55 peratus", "Pengorekan mencapai penyiapan"] },
  "Sarawak River Aids to Navigation and Surveillance System": { displayName: "Sistem Navigasi dan Pengawasan Sungai Sarawak", lead: "Sarawak Rivers Board / Kementerian Pengangkutan Sarawak", value: "RM30 juta", summary: "Sistem keselamatan navigasi dan pemantauan bagi Sungai Sarawak serta skop Sungai Miri yang berkaitan. RM30 juta adalah bagi Fasa 1 Sistem Pengurusan Trafik Kapal di Senari sahaja, bukan sistem Sungai Miri.", milestones: ["Pemasangan fasa pertama bermula", "VTMS Sungai Sarawak beroperasi sepenuhnya", "Sistem Sungai Miri mencapai penyiapan"] },
  "KUTS — Kuching Urban Transportation System": { displayName: "Sistem Pengangkutan Bandar Kuching (KUTS)", lead: "Sarawak Metro Sdn Bhd", value: "RM6 bilion", summary: "Sistem Autonomous Rapid Transit (ART) berkuasa hidrogen dengan Laluan Biru, Merah dan Hijau dalam Fasa 1. Peruntukan negeri RM6 bilion menyokong mobiliti awam dan kesalinghubungan di Kuching.", milestones: ["Kontrak pemindahan loji hidrogen RM58 juta dianugerahkan", "Spektrum frekuensi khas untuk operasi ART diperoleh", "Fasa 1 mencapai kemajuan 38.2 peratus", "Dua unit ART pertama tiba di Kuching", "Perkhidmatan rintis ART bermula", "Pemindahan loji hidrogen Rembus siap", "Perkhidmatan komersial ART bermula", "KUTS mencapai penyiapan keseluruhan projek", "Rangkaian bas pengantara berkuasa hidrogen mula beroperasi"] },
  "Bintulu Port — State Control Handover": { displayName: "Penyerahan Pelabuhan Bintulu kepada Sarawak", lead: "Kerajaan Sarawak / Kerajaan Persekutuan", value: "RM1.8 bilion", summary: "Pemindahan Pelabuhan Bintulu kepada Sarawak di bawah MA63, dengan penilaian RM1.8 bilion. Pelabuhan ini penting untuk eksport LNG dan koridor SCORE.", milestones: ["Perjanjian lanjutan 12 bulan untuk peralihan ditandatangani", "Pengambilalihan RM1.8 bilion dipersetujui pada prinsipnya", "Penilaian RM1.8 bilion disahkan selepas rundingan terperinci", "Perjanjian Tiga Pihak dan Penyempurnaan ditandatangani", "Pelabuhan Bintulu diserahkan kepada Sarawak"] },
  "New Kuching International Airport": { displayName: "Lapangan Terbang Antarabangsa Kuching Baharu", lead: "Kerajaan Sarawak / Kementerian Pengangkutan Sarawak", value: "RM10 bilion", summary: "Cadangan hab penerbangan dan logistik serantau di Tanjung Embang, dengan anggaran kos projek kira-kira RM10 bilion pada 2025. Projek ini bertujuan memperkukuh kesalinghubungan udara, kapasiti kargo dan hubungan serantau Sarawak.", milestones: ["Perunding kajian kebolehlaksanaan dilantik", "Kajian pengesahan tapak dan kebolehlaksanaan selesai", "Pihak berkuasa persekutuan meluluskan Permohonan Pembangunan Lapangan Terbang", "Pembinaan fizikal lapangan terbang bermula"] },
  "Tanjung Embang Deep-Sea Port": { displayName: "Pelabuhan Laut Dalam Tanjung Embang", lead: "Kerajaan Sarawak / PETROS", value: "RM25-30 bilion", summary: "Cadangan projek infrastruktur maritim dan tenaga dalam pembangunan bersepadu Tanjung Embang, dengan anggaran kos RM25 bilion hingga RM30 bilion. Ia menggabungkan pelabuhan laut dalam dan terminal gas untuk menyokong logistik maritim, eksport gas dan perdagangan serantau.", milestones: ["Reka bentuk pelan induk pelabuhan mencapai peringkat akhir", "Kajian kebolehlaksanaan teknikal dan ekonomi sedang dijalankan", "Jadual operasi pelabuhan dan terminal gas diumumkan", "Operasi pelabuhan dan terminal gas bermula"] },
  "Baleh Hydroelectric Project": { displayName: "Projek Hidroelektrik Baleh", lead: "Sarawak Energy Berhad", value: "RM8 bilion", summary: "Empangan hidroelektrik 1,285MW di Sungai Baleh, Kapit, yang dibangunkan Sarawak Energy. Anggaran kos pembinaan 2017 adalah sekitar RM8 bilion, termasuk pembiayaan, bagi menyokong tenaga boleh baharu dan grid Sarawak.", milestones: ["Terowong lencongan siap", "Pengalihan sungai bermula", "Kerja isian batu empangan bermula", "Penakungan takungan bermula", "Takungan mencapai aras operasi minimum", "Unit penjana pertama memulakan operasi", "Penjanaan kuasa penuh bermula"] },
  "Mentarang Induk Hydroelectric Project": { displayName: "Projek Hidroelektrik Mentarang Induk", lead: "PT Kayan Hydropower Nusantara / konsortium diterajui Sarawak Energy", value: "US$2.6 bilion", summary: "Projek hidroelektrik 1,375MW di Kalimantan Utara bernilai US$2.6 bilion, dibangunkan oleh PT Kayan Hydropower Nusantara, usaha sama yang melibatkan Sarawak Energy, Adaro Energy Indonesia dan Kayan Patria Pratama. Jalan akses dilaporkan siap semasa kerja awal; pemaju menyasarkan operasi komersial pada 2030, dengan penutupan kewangan masih belum disahkan.", milestones: ["Majlis pecah tanah diadakan", "Kerja awal dilaporkan berjalan", "Jalan akses dilaporkan siap", "Projek mencapai penutupan kewangan", "Operasi komersial bermula"] },
  "Green Hydrogen Economy — H2ornbill & H2biscus": { displayName: "Projek Hidrogen H2biscus dan H2ornbill", lead: "SEDC Energy", value: "USD4.2 bilion", summary: "Dua cadangan pembangunan hidrogen hijau berorientasikan eksport di Sarawak H2 Hub, Bintulu. Pakej perkongsian strategik gabungan 2024 bernilai USD4.2 bilion merangkumi H2biscus, H2ornbill, hab bersama dan Depot Rembus, tanpa pecahan mengikut projek.", milestones: ["Memorandum tenaga boleh baharu H2biscus ditandatangani", "Perjanjian pembangunan bersama H2ornbill ditandatangani", "Reka bentuk kejuruteraan bahagian hadapan H2biscus bermula", "Perjanjian pembangunan bersama H2biscus ditandatangani", "Kedua-dua projek mencapai reka bentuk kejuruteraan bahagian hadapan", "Konsep asal eksport H2ornbill ke Jepun digantung", "Skop projek eksport memasuki penyelarasan semula", "Pengumuman pelan projek dan garis masa pengeluaran yang dikemas kini", "Keputusan pelaburan muktamad untuk H2biscus dan H2ornbill", "Pembinaan kemudahan hidrogen bermula", "Pengeluaran hidrogen komersial bermula"] },
  "Bintulu Bio-Algae Initial Commercial Plant": { displayName: "Loji Komersial Awal Bio-Alga Bintulu", lead: "SEDC Energy / PETRONAS Research", value: "Tidak didedahkan", summary: "Loji penyelidikan dan pembangunan di Bintulu untuk penanaman dan penuaian mikroalga serta pengekstrakan minyak alga mentah bagi bahan api penerbangan mampan. SEDC Energy dan PETRONAS Research ialah pihak pembangunan teknologi bersama; penanaman berskala lebih besar dan loji komersial seterusnya masih tertakluk kepada peningkatan skala serta daya maju komersial.", milestones: ["Perjanjian kerjasama Loji Komersial Awal ditandatangani", "Perjanjian pembangunan teknologi minyak mikroalga ditandatangani", "Kajian di Bintulu dan pelan peningkatan skala 10,000 ekar disahkan secara terbuka", "Peningkatan skala penanaman mencapai skop 10,000 ekar yang dirancang"] },
  "Sago BioCNG Plant and Gas Distribution Network": { displayName: "Projek BioCNG Sagu dan Pengagihan Gas", lead: "CRAUN Research Sdn Bhd", value: "Tidak didedahkan", summary: "Projek rintis tenaga boleh baharu di Kampung Tabo dan Kampung Teh, Mukah, yang menukar air sisa pemprosesan sagu kepada biogas untuk kediaman dan kemudahan awam berhampiran. Diterajui CRAUN Research, projek ini menggabungkan rawatan sisa dengan rangkaian pengagihan gas tempatan.", milestones: ["Loji rintis rawatan air sisa sagu mula beroperasi", "Loji rintis rawatan air sisa sagu dilancarkan secara rasmi", "Projek pengagihan biogas diluluskan", "Kerjasama pembangunan biogas ditandatangani", "Pembangunan loji BioCNG dilaporkan sedang dijalankan", "Paip gas dipasang ke kediaman dan kemudahan awam", "Projek rintis mencapai penyiapan"] },
  "Batang Ai Floating Solar Farm": { displayName: "Ladang Solar Terapung Batang Ai", lead: "Sarawak Energy / China Power International Holdings / Trina Solar", value: "RM184 juta", summary: "Ladang solar terapung hidro-solar 50MW bernilai RM184 juta di takungan HEP Batang Ai, dibangunkan oleh Sarawak Energy bersama China Power International Holdings dan Trina Solar. Ia menyokong penjanaan tenaga boleh baharu.", milestones: ["Pembinaan bermula secara rasmi", "Pembinaan mencapai 35 peratus siap", "Kemudahan solar terapung 50MW ditauliahkan", "Kapasiti solar terapung meningkat sebanyak 120MW"] },
  "Baram Agrovoltaic Project": { displayName: "Projek Agrovoltaik Baram", lead: "Planet QEOS Sdn Bhd", value: "RM6 bilion", summary: "Cadangan pembangunan agrovoltaik bersepadu di Temala berhampiran Long Lama dalam Zon Ekonomi Tenaga Boleh Baharu Baram, dengan anggaran RM6 bilion. Skopnya merangkumi 1,500 hektar pertanian moden, 500 hektar padi, hab logistik, stesen janakuasa 300MW dan bandar sokongan.", milestones: ["Skop dan anggaran projek diumumkan", "Komponen pertanian dan padi mula beroperasi", "Hab logistik mula beroperasi", "Stesen janakuasa 300MW mula beroperasi", "Bandar sokongan mencapai penyiapan"] },
  "PCDS 2030 — Overarching Framework": { displayName: "Kerangka Menyeluruh PCDS 2030", lead: "Kerajaan Sarawak", value: "Tidak berkenaan", summary: "Strategi Pembangunan Pasca COVID-19 2030. Visi: masyarakat makmur yang dipacu data dan inovasi. Menyasarkan pertumbuhan KDNK tahunan 8%, pendapatan isi rumah median RM15,000 menjelang 2030, pengurangan intensiti GHG 45%, dan 195,000 pekerjaan baharu. Berteraskan 6 Sektor Ekonomi dan 7 Pemboleh.", milestones: ["Melepasi ambang pendapatan tinggi Bank Dunia lebih awal daripada jadual", "Sasaran KDNK RM282 bilion", "Sasaran pendapatan isi rumah median bulanan RM15,000", "Sasaran 195,000 pekerjaan baharu"] },
};

function localizeProject(project) {
  const translation = PROJECT_TRANSLATIONS[project.name];
  if (!translation) return project;
  return {
    ...project,
    displayName: project.displayName || project.name,
    lead: translation.lead,
    value: translation.value,
    summary: translation.summary,
    milestones: project.milestones.map((milestone, index) => ({ ...milestone, text: translation.milestones[index] || milestone.text })),
  };
}

/**
 * Returns data suitable for rendering in the requested language without mutating input.
 * English returns the original reference; BM preserves every canonical name, URL, date and flag.
 */
export function localizeSectors(sectors, language = DEFAULT_LANGUAGE) {
  if (language !== "ms" || !Array.isArray(sectors)) return sectors;
  return sectors.map((sector) => ({
    ...sector,
    name: SECTOR_NAMES[sector.id] || sector.name,
    projects: Array.isArray(sector.projects) ? sector.projects.map(localizeProject) : sector.projects,
  }));
}
