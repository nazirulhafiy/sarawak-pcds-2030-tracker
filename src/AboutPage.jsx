import SiteFooter from './SiteFooter.jsx';
import { getUiCopy } from './localization.js';

const content = {
  en: {
    title: 'About this tracker',
    intro: <>An independent view of major projects connected to{' '}<span className="concept-about-intro-strategy">Sarawak’s Post COVID-19 Development Strategy 2030.</span></>,
    sections: [
      ['What you can find', 'Compare project status, review milestones, and follow links to public sources. Each card brings together the reported scope, lead parties, value and next milestone where this information is available.'],
      ['Where the information comes from', 'The tracker uses public reports, news outlets and official announcements. Source links are listed on each project card so you can read the original reports. This is a selected project list, not a complete register of every PCDS initiative.'],
      ['How to read project status', 'Planning means the scope or delivery is still being shaped. Ongoing means delivery is moving, approval is pending, or the next public decision is awaited. Completed means the tracked scope is reported as complete. These labels summarise public evidence; they are not official certification.'],
      ['Milestones and limits', 'Milestone totals count the checkpoints recorded here. They are not a measure of physical construction progress or money spent. Reports can be incomplete or out of date. The last-updated date records a tracker data update, not a guarantee that every project was checked that day.'],
      ['Independent ownership', <>Built and maintained by <a href="https://hafiy.my/">hafiy.my</a>. This site is not affiliated with the Sarawak Government. Status and milestones are best-effort based on available information.</>],
    ],
    contact: 'Report a correction',
    contactText: 'Please include the project name, the detail to correct, and a link to a public source.',
  },
  ms: {
    title: 'Tentang platform ini',
    intro: <>Maklumat perkembangan projek utama yang berkaitan dengan{' '}<span className="concept-about-intro-strategy">Strategi Pembangunan Pasca COVID-19 2030 Sarawak.</span></>,
    sections: [
      ['Maklumat yang tersedia', 'Bandingkan status projek, semak pencapaian utama dan ikuti pautan ke sumber awam. Setiap kad menghimpunkan skop, pihak peneraju, nilai dan pencapaian seterusnya yang dilaporkan, apabila maklumat tersedia.'],
      ['Sumber maklumat', 'Platform ini menggunakan laporan awam, media berita dan pengumuman rasmi. Pautan sumber disertakan pada setiap kad projek untuk rujukan kepada laporan asal. Senarai ini meliputi projek terpilih, bukan daftar lengkap semua inisiatif PCDS.'],
      ['Memahami status projek', 'Perancangan bermaksud skop atau pelaksanaan masih dibentuk. Pelaksanaan bermaksud projek sedang berjalan, menunggu kelulusan atau menunggu keputusan awam seterusnya. Selesai bermaksud skop yang dipantau dilaporkan telah selesai. Label ini merumuskan bukti awam dan bukan pengesahan rasmi.'],
      ['Pencapaian utama dan batasan', 'Jumlah pencapaian merujuk kepada titik semakan yang direkodkan di sini. Ia bukan ukuran kemajuan fizikal pembinaan atau perbelanjaan. Laporan mungkin tidak lengkap atau sudah lapuk. Tarikh kemas kini terakhir merujuk kepada kemas kini data platform, bukan jaminan bahawa setiap projek disemak pada hari tersebut.'],
      ['Pengurusan bebas', <>Dibina dan diselenggara oleh <a href="https://hafiy.my/">hafiy.my</a>. Laman ini tidak mempunyai hubungan rasmi dengan Kerajaan Sarawak. Status dan pencapaian utama disediakan sebaik mungkin berdasarkan maklumat yang tersedia.</>],
    ],
    contact: 'Laporkan pembetulan',
    contactText: 'Sertakan nama projek, butiran yang perlu dibetulkan dan pautan ke sumber awam.',
  },
};

export default function AboutPage({ language, onNavigate, headingRef }) {
  const text = content[language] || content.en;
  return <div className="app-shell">
    <main className="concept-about">
      <header><h1 className="page-heading" ref={headingRef} tabIndex={-1}>{language === 'en' ? <>About this <span className="concept-about-title-accent">tracker</span></> : text.title}</h1><p>{text.intro}</p></header>
      <div className="concept-about-copy">
        {text.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}
        <section><h2>{text.contact}</h2><p>{text.contactText}</p><a href="mailto:contact@pcds2030.com?subject=PCDS%202030%20correction">contact@pcds2030.com</a></section>
      </div>
      <SiteFooter concept currentPage="about" copy={getUiCopy(language)} language={language} onNavigate={onNavigate} />
    </main>
  </div>;
}
