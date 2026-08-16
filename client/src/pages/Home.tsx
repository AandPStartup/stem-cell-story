// Bio-Editorial Atlas: asymmetric scientific storytelling, bilingual RTL/LTR, Aqua Cobalt accent.
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpRight, Check, ChevronDown, FlaskConical, Globe2, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ASSETS = {
  hero: "/manus-storage/cell-story-hero_386d0fbe.png",
  differentiation: "/manus-storage/cell-story-differentiation_0806c6b1.png",
  ips: "/manus-storage/cell-story-ips_e9663db7.png",
  tissue: "/manus-storage/cell-story-tissue_1bf97910.png",
  mark: "/manus-storage/cell-story-mark_989300fc.png",
};

type Lang = "fa" | "en";

const copy = {
  fa: {
    eyebrow: "راهنمای تعاملی سلول‌های بنیادی",
    title: "علم را بکاوید؛\nروایتگر آن باشید.",
    subtitle: "از یک سلول، داستانی برای آینده‌ی پزشکی",
    heroBody: "سلول‌های بنیادی می‌توانند خودشان را نوسازی کنند و، زیر تأثیر پیام‌های زیستی، به سلول‌های تخصصی‌تری تبدیل شوند. اینجا مسیرشان را ساده، دقیق و تصویری دنبال می‌کنیم.",
    begin: "شروع روایت",
    journey: "مشاهده مسیر سلول",
    scroll: "برای کشف بیشتر پایین بروید",
    explore: "کاوش علمی",
    question: "پرسش",
    simple: "توضیح ساده",
    detail: "جزئیات بیشتر",
    close: "بستن",
    stemTitle: "سلول بنیادی چیست؟",
    stemIntro: "یک سلول؛ دو توانایی کلیدی",
    stemBody: "سلول بنیادی هم می‌تواند نسخه‌های بیشتری از خودش بسازد و هم، وقتی پیام‌های درست را دریافت می‌کند، به سلول‌هایی با وظایف تخصصی تبدیل شود.",
    selfRenew: "خودنوزایی",
    selfRenewBody: "ساخت نسخه‌های بیشتر از خود برای حفظ منبع سلولی.",
    differentiate: "تمایز",
    differentiateBody: "تغییر تدریجی هویت و عملکرد در پاسخ به محیط و برنامه‌های ژنی.",
    choose: "یک مسیر را انتخاب کنید",
    signals: "پیام‌های محیطی",
    genes: "برنامه‌های ژنی",
    precursor: "سلول پیش‌ساز",
    specialized: "سلول تخصصی",
    challengeTitle: "از آزمایشگاه تا درمان؛ چرا مسیر آسان نیست؟",
    challengeIntro: "امید علمی وقتی به درمان نزدیک می‌شود که از چندین دروازه‌ی ایمنی، کیفیت و شواهد عبور کند.",
    more: "جزئیات بیشتر",
    gapTitle: "فاصله‌ی میان امید و درمان",
    lab: "امید آزمایشگاهی",
    preclinical: "شواهد پیش‌بالینی",
    validated: "درمان تأییدشده",
    ipsTitle: "وقتی یک سلول بالغ، فرصت بازگشت پیدا می‌کند",
    ipsIntro: "iPSها انعطاف‌پذیری را به سلول‌های انسانی بازمی‌گردانند.",
    ipsBody: "پژوهشگران می‌توانند یک سلول بالغ، مانند سلول پوست، را به حالت پرتوان القایی بازبرنامه‌ریزی کنند؛ سپس آن را برای ساخت مدل بیماری، آزمون دارو و پژوهش درباره‌ی سلول‌های جایگزین هدایت کنند.",
    why: "چرا مهم است؟",
    whyBody: "کار بهاروند و همکارانش در مسیر تثبیت و پیشبرد پژوهش سلول‌های iPS انسانی در ایران اهمیت داشت: این کار نشان داد که می‌توان از سلول‌های بالغ انسانی به یک منبع انعطاف‌پذیر برای مطالعه و تمایز سلولی رسید. این دستاورد یک امکان پژوهشی و درمانی ساخت، نه یک درمان تضمین‌شده.",
    quizTitle: "روایت را خودتان تعریف کنید",
    quizIntro: "سه پرسش کوتاه برای اینکه ببینیم ایده‌ی اصلی را گرفته‌اید.",
    next: "پرسش بعدی",
    finish: "پایان روایت",
    complete: "اکنون می‌توانید داستان سلول بنیادی را برای دیگران تعریف کنید.",
    sources: "منابع و مسیر مطالعه",
    closing: "علم فقط پاسخ نیست؛ راهی است برای پرسیدن بهتر، آزمودن دقیق‌تر و امید بستن مسئولانه.",
    footer: "یک روایت تعاملی برای فهم بهتر زیست‌شناسی سلول‌های بنیادی",
    correct: "آفرین؛ دلیلش این است:",
    almost: "نزدیک بود؛ نکته‌ی مهم این است:",
    simpleMode: "ساده",
    deepMode: "عمیق‌تر",
    questionLabels: ["ماهیت سلول", "چالش درمان", "اهمیت iPS"],
  },
  en: {
    eyebrow: "An interactive field guide to stem cells",
    title: "Explore science.\nTell its story.",
    subtitle: "From one cell, a story about the future of medicine",
    heroBody: "Stem cells can renew themselves and, under the right biological signals, become more specialized cells. Follow their journey here through simple language, precise ideas, and visual explanations.",
    begin: "Begin the story",
    journey: "View the cell journey",
    scroll: "Scroll to explore",
    explore: "Scientific exploration",
    question: "Question",
    simple: "Simple explanation",
    detail: "More detail",
    close: "Close",
    stemTitle: "What is a stem cell?",
    stemIntro: "One cell; two defining abilities",
    stemBody: "A stem cell can make more copies of itself and, when it receives the right signals, become cells with specialized functions.",
    selfRenew: "Self-renewal",
    selfRenewBody: "Making more stem cells to maintain a renewable source.",
    differentiate: "Differentiation",
    differentiateBody: "Gradually changing identity and function in response to context and gene programs.",
    choose: "Choose a pathway",
    signals: "Environmental signals",
    genes: "Gene programs",
    precursor: "Progenitor cell",
    specialized: "Specialized cell",
    challengeTitle: "From laboratory to treatment: why is the path difficult?",
    challengeIntro: "Scientific promise moves toward treatment only after passing gates of safety, quality, evidence, and oversight.",
    more: "More detail",
    gapTitle: "The distance between promise and treatment",
    lab: "Laboratory promise",
    preclinical: "Preclinical evidence",
    validated: "Validated treatment",
    ipsTitle: "When a mature cell gets a chance to return",
    ipsIntro: "iPS cells return flexibility to human cells.",
    ipsBody: "Researchers can reprogram a mature cell, such as a skin cell, into an induced pluripotent state, then guide it toward disease models, drug testing, and research on replacement cells.",
    why: "Why it matters",
    whyBody: "Baharvand and colleagues’ work helped establish and advance human iPS-cell research in Iran. It showed the value of turning accessible adult cells into a flexible resource for studying and directing cell fate. That created a research and therapeutic possibility—not a guaranteed treatment.",
    quizTitle: "Tell the story yourself",
    quizIntro: "Three short questions to check the core ideas.",
    next: "Next question",
    finish: "Finish the story",
    complete: "You can now explain the stem-cell story to someone else.",
    sources: "Sources for further reading",
    closing: "Science is not only about answers; it is a way to ask better questions, test more carefully, and hope responsibly.",
    footer: "An interactive story for understanding stem-cell biology",
    correct: "Correct — here is why:",
    almost: "Almost — the important point is:",
    simpleMode: "Simple",
    deepMode: "Deeper",
    questionLabels: ["Cell identity", "Treatment challenge", "Why iPS matters"],
  },
} as const;

const fates = {
  fa: ["سلول عصبی", "سلول عضلانی", "سلول خونی", "سلول کبدی"],
  en: ["Neuron", "Muscle cell", "Blood cell", "Liver cell"],
};

const challenges = {
  fa: [
    ["کنترل تمایز", "باید سلول هدف را به‌طور قابل اعتماد تولید کرد و سلول‌های ناخواسته را به حداقل رساند.", "تغییر کوچک در پیام‌های محیطی می‌تواند مسیر سلول را عوض کند؛ بنابراین کنترل فرآیند ضروری است."],
    ["ایمنی و رد پیوند", "سیستم ایمنی ممکن است سلول‌های پیوندشده را بیگانه بداند یا سلول‌ها درست کار نکنند.", "سازگاری ایمنی و پایش طولانی‌مدت بخشی از مسیر ارزیابی است."],
    ["خطر تومورزایی", "سلول‌های پرتوان باقی‌مانده یا سلول‌های غیرطبیعی می‌توانند خطر ایجاد تومور داشته باشند.", "خالص‌سازی، آزمون‌های دقیق و کنترل کیفیت برای کاهش این خطر لازم‌اند."],
    ["بقا و ادغام", "سلول‌های منتقل‌شده باید زنده بمانند، با بافت اطراف ارتباط برقرار کنند و وظیفه‌ی درست را انجام دهند.", "رسیدن سلول به بافت، فقط آغاز پرسش است؛ عملکرد پایدار اهمیت دارد."],
    ["مقیاس‌پذیری و کیفیت", "تولید باید استریل، قابل تکرار، قابل ردیابی و از یک دسته به دسته‌ی دیگر سازگار باشد.", "آنچه در یک آزمایش کوچک کار می‌کند، لزوماً در مقیاس درمانی پایدار نیست."],
    ["شواهد بالینی و اخلاق", "نتیجه‌ی امیدوارکننده‌ی آزمایشگاهی با درمان اثبات‌شده یکی نیست؛ کارآزمایی، رضایت آگاهانه و نظارت لازم است.", "اعتماد علمی با شفافیت، ارزیابی مستقل و پیگیری طولانی‌مدت ساخته می‌شود."],
  ],
  en: [
    ["Controlled differentiation", "Researchers must reliably produce the intended cell type and minimize unwanted cells.", "Small changes in environmental signals can redirect a cell, so control matters."],
    ["Immunity and rejection", "The immune system may attack transplanted cells, or the cells may not function as intended.", "Immune compatibility and long-term monitoring are part of translation."],
    ["Tumor risk", "Remaining pluripotent or abnormal cells may create a risk of tumors.", "Purification, careful testing, and quality control are essential."],
    ["Survival and integration", "Transplanted cells must survive, connect with surrounding tissue, and perform the right function.", "Reaching a tissue is only the beginning; durable function matters."],
    ["Scale and quality", "Manufacturing must be sterile, reproducible, traceable, and consistent across batches.", "What works in a small experiment may not remain stable at clinical scale."],
    ["Clinical evidence and ethics", "A promising laboratory result is not the same as a proven treatment; trials, consent, and oversight are required.", "Scientific trust is built through transparency, independent review, and follow-up."],
  ],
};

const quiz = {
  fa: [
    { q: "کدام عبارت سلول بنیادی را بهتر توصیف می‌کند؟", options: ["سلولی که همیشه همه‌چیز می‌شود", "سلولی با توان خودنوزایی و تولید سلول‌های تخصصی‌تر", "سلولی که فقط در جنین وجود دارد"], answer: 1, explain: "سلول بنیادی با دو ویژگی شناخته می‌شود: خودنوزایی و توانایی تمایز در شرایط مناسب." },
    { q: "چرا ساخت سلول هدف به‌تنهایی درمان را تضمین نمی‌کند؟", options: ["چون ایمنی، بقا، کیفیت و شواهد بالینی هم باید بررسی شوند", "چون سلول‌ها هرگز قابل استفاده نیستند", "چون آزمایشگاه به بدن انسان شباهت ندارد"], answer: 0, explain: "مسیر درمان به ایمنی، عملکرد، تولید استاندارد و شواهد انسانی نیاز دارد." },
    { q: "اهمیت مفهومی iPSها چیست؟", options: ["سلول بالغ را به منبعی انعطاف‌پذیر برای پژوهش تبدیل می‌کنند", "همه‌ی بیماری‌ها را درمان کرده‌اند", "جایگزین کامل کارآزمایی بالینی هستند"], answer: 0, explain: "iPSها امکان مدل‌سازی بیماری، آزمون دارو و پژوهش درباره‌ی تمایز سلولی را گسترش می‌دهند." },
  ],
  en: [
    { q: "Which statement best describes a stem cell?", options: ["A cell that always becomes everything", "A cell with self-renewal and the ability to produce more specialized cells", "A cell found only in embryos"], answer: 1, explain: "Stem cells are defined by self-renewal and the capacity to differentiate under the right conditions." },
    { q: "Why does making the desired cell not guarantee a treatment?", options: ["Safety, survival, quality, and clinical evidence must also be evaluated", "Cells can never be used", "A laboratory is identical to the human body"], answer: 0, explain: "Translation also requires safety, function, standardized manufacturing, and human evidence." },
    { q: "What is the conceptual importance of iPS cells?", options: ["They turn mature cells into a flexible research resource", "They have already cured every disease", "They replace clinical trials"], answer: 0, explain: "iPS cells expand disease modelling, drug testing, and research into controlled differentiation." },
  ],
};

function SectionTag({ n, label }: { n: string; label: string }) {
  return <div className="section-tag"><img src={ASSETS.mark} alt="" /><span>{n}</span><i />{label}</div>;
}

function AppHeader({ lang, setLang, theme, toggleTheme }: { lang: Lang; setLang: (l: Lang) => void; theme: string; toggleTheme: () => void }) {
  const t = copy[lang];
  return <header className="topbar">
    <a href="#top" className={`brand ${lang === "fa" ? "brand-fa" : "brand-en"}`} aria-label={lang === "fa" ? "خانه روایت سلول" : "Cell Story home"}><img src={ASSETS.mark} alt="" /><span>{lang === "fa" ? <><b>روایت</b><br />سلول</> : <>cell<br /><b>story</b></>}</span></a>
    <div className="topbar-actions">
      <button className="control-pill" onClick={() => setLang(lang === "fa" ? "en" : "fa")} aria-label="Change language"><Globe2 size={15} /><span>{lang === "fa" ? "English" : "فارسی"}</span></button>
      <button className="icon-control" onClick={toggleTheme} aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}>{theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</button>
    </div>
  </header>;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("cell-story-lang") as Lang) || "fa");
  const { theme, toggleTheme } = useTheme();
  const [selectedFate, setSelectedFate] = useState(0);
  const [deep, setDeep] = useState(false);
  const [openChallenge, setOpenChallenge] = useState<number | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const t = copy[lang];
  const direction = lang === "fa" ? "rtl" : "ltr";
  const motionProps = reduced ? {} : { initial: { opacity: 0, y: 34 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-16% 0px -16%" }, transition: { duration: 0.42, ease: "easeOut" as const } };

  useEffect(() => { localStorage.setItem("cell-story-lang", lang); document.documentElement.lang = lang === "fa" ? "fa" : "en"; document.documentElement.dir = direction; }, [lang, direction]);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });

  return <div id="top" className="site-shell" dir={direction}>
    <AppHeader lang={lang} setLang={(l) => setLang(l)} theme={theme} toggleTheme={() => toggleTheme?.()} />
    <main>
      <section className="hero section-grid">
        <div className="hero-copy">
          <div className="kicker"><span className="kicker-dot" />{t.eyebrow}</div>
          <h1>{t.title.split("\n").map((x, i) => <span key={x} className={i === 1 ? "accent-line" : ""}>{x}</span>)}</h1>
          <p className="hero-subtitle">{t.subtitle}</p>
          <p className="hero-body">{t.heroBody}</p>
          <div className="hero-actions"><button className="btn-primary" onClick={() => scrollTo("one")}>{t.begin}<ArrowDown size={16} /></button><button className="btn-quiet" onClick={() => scrollTo("differentiation")}>{t.journey}<ArrowUpRight size={16} /></button></div>
          <div className="hero-note"><span>01</span><span>{t.scroll}</span></div>
        </div>
        <div className="hero-visual"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><img src={ASSETS.hero} alt={lang === "fa" ? "نمایش هنری علمی از یک سلول بنیادی در محیط سلولی" : "Artistic scientific visualization of a stem cell in a cellular environment"} /><div className="plate-callout hero-callout"><i />{lang === "fa" ? "هسته‌ی قابلیت" : "Potential, held within"}</div><div className="visual-caption"><span>{lang === "fa" ? "یک سلول؛ چند مسیر ممکن" : "One cell; many possible paths"}</span></div></div>
      </section>

      <section id="one" className="story-section section-grid">
        <motion.div className="section-intro" {...motionProps}><SectionTag n="01" label={t.question} /><h2>{t.stemTitle}</h2><p className="lead">{t.stemIntro}</p><p>{t.stemBody}</p><div className="ability-list"><div><strong>01</strong><div><h3>{t.selfRenew}</h3><p>{t.selfRenewBody}</p></div></div><div><strong>02</strong><div><h3>{t.differentiate}</h3><p>{t.differentiateBody}</p></div></div></div><button className="text-button" onClick={() => setDeep(!deep)}>{deep ? t.simpleMode : t.deepMode}<ChevronDown size={15} className={deep ? "rotate-180" : ""} /></button>{deep && <div className="deep-note">{lang === "fa" ? "تمایز به زمینه وابسته است: پیام‌های مولکولی، تماس با سلول‌های همسایه، ماتریکس بافت و تنظیم بیان ژن‌ها همگی در تعیین سرنوشت سلول نقش دارند." : "Differentiation is context-dependent: molecular signals, neighboring cells, the tissue matrix, and gene regulation all influence cell fate."}</div>}</motion.div>
        <motion.div className="fate-panel" {...motionProps}><div className="panel-heading"><span>{t.choose}</span><small>SELF-RENEWAL → FATE</small></div><div className="fate-visual"><img src={ASSETS.differentiation} alt="" /><div className="fate-core">{lang === "fa" ? "بنیادی" : "stem"}</div>{fates[lang].map((f, i) => <button key={f} className={`fate-node fate-${i + 1} ${selectedFate === i ? "selected" : ""}`} onClick={() => setSelectedFate(i)}><span className="node-dot" /><b>{f}</b></button>)}</div><AnimatePresence mode="wait"><motion.div key={selectedFate + lang} className="fate-caption" initial={reduced ? {} : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}><span>↳</span>{lang === "fa" ? `با پیام‌های مناسب، سلول می‌تواند به ${fates[lang][selectedFate]} تبدیل شود.` : `With the right signals, the cell may become a ${fates[lang][selectedFate].toLowerCase()}.`}</motion.div></AnimatePresence></motion.div>
      </section>

      <section id="differentiation" className="timeline-section"><div className="wide-inner"><SectionTag n="01—A" label={lang === "fa" ? "مسیر تمایز" : "The differentiation path"} /><div className="timeline-intro"><h2>{lang === "fa" ? "هویت سلول، یک تصمیم لحظه‌ای نیست." : "Cell identity is not a single moment."}</h2><p>{lang === "fa" ? "محیط، پیام‌ها و برنامه‌های ژنی در طول زمان با هم کار می‌کنند تا یک سلول را تخصصی کنند." : "Environment, signals, and gene programs work together over time to specialize a cell."}</p></div><div className="timeline"><div className="timeline-line" />{[t.simple, t.signals, t.genes, t.precursor, t.specialized].map((label, i) => <div key={label} className={`timeline-step ${i === 0 ? "selected" : ""}`}><span>{String(i + 1).padStart(2, "0")}</span><i /> <b>{label}</b></div>)}</div></div></section>

      <section id="two" className="story-section challenges-section"><div className="wide-inner"><motion.div {...motionProps}><SectionTag n="02" label={t.question} /><div className="section-head-row"><div><h2>{t.challengeTitle}</h2><p className="lead">{t.challengeIntro}</p></div><div className="annotation">{lang === "fa" ? "۶ دروازه‌ی مهم" : "06 critical gates"}<span>↓</span></div></div></motion.div><div className="challenge-layout"><div className="challenge-list">{challenges[lang].map((c, i) => <motion.button {...motionProps} transition={{ ...(motionProps.transition as object), delay: i * 0.04 }} key={c[0]} className={`challenge-card ${openChallenge === i ? "open" : ""}`} onClick={() => setOpenChallenge(openChallenge === i ? null : i)}><span className="challenge-number">0{i + 1}</span><span className="challenge-copy"><b>{c[0]}</b><span>{c[1]}</span>{openChallenge === i && <em>{c[2]}</em>}</span><ChevronDown size={18} /></motion.button>)}</div><div className="challenge-visual"><img src={ASSETS.tissue} alt={lang === "fa" ? "نمایش هنری از محیط بافتی در پزشکی بازساختی" : "Artistic visualization of a tissue environment in regenerative medicine"} /><div className="plate-callout callout-a"><i />{lang === "fa" ? "محیط بافتی" : "Tissue context"}</div><div className="plate-callout callout-b"><i />{lang === "fa" ? "ادغام سلولی" : "Cell integration"}</div><div className="visual-stamp"><FlaskConical size={16} /><span>{lang === "fa" ? "از امید تا شواهد" : "Promise to evidence"}</span></div><div className="plate-caption"><span>PLATE 02</span><b>{lang === "fa" ? "بقا، رسانش، عملکرد" : "Survival, delivery, function"}</b></div></div></div><div className="evidence-strip"><div className="evidence-title">{t.gapTitle}</div><div className="evidence-track"><div className="evidence-fill" /><div><span>01</span><b>{t.lab}</b></div><div><span>02</span><b>{t.preclinical}</b></div><div><span>03</span><b>{t.validated}</b></div></div></div></div></section>

      <section id="three" className="ips-section section-grid"><motion.div className="ips-visual" {...motionProps}><img src={ASSETS.ips} alt={lang === "fa" ? "بازبرنامه‌ریزی سلول بالغ به سلول iPS" : "Reprogramming a mature cell into an iPS cell"} /><div className="plate-callout ips-callout"><i />{lang === "fa" ? "بازگشت به حالت پرتوان" : "Return to pluripotency"}</div><div className="ips-label"><span>FIG. 03</span><b>iPS</b><small>{lang === "fa" ? "بازبرنامه‌ریزی سلولی" : "cellular reprogramming"}</small></div><div className="plate-caption"><span>PLATE 03</span><b>{lang === "fa" ? "از سلول بالغ تا امکان تازه" : "From maturity to possibility"}</b></div></motion.div><motion.div className="ips-copy" {...motionProps}><SectionTag n="03" label={t.question} /><h2>{t.ipsTitle}</h2><p className="lead">{t.ipsIntro}</p><p>{t.ipsBody}</p><div className="ips-path">{[lang === "fa" ? "سلول پوستی بالغ" : "Mature skin cell", lang === "fa" ? "بازبرنامه‌ریزی" : "Reprogramming", lang === "fa" ? "سلول iPS" : "iPS cell", lang === "fa" ? "تمایز هدایت‌شده" : "Directed differentiation"].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, "0")}</span><b>{x}</b>{i < 3 && <i>→</i>}</div>)}</div><div className="why-box"><div><span>WHY IT MATTERS</span><h3>{t.why}</h3></div><p>{t.whyBody}</p></div></motion.div></section>

      <section className="quiz-section"><div className="quiz-inner"><SectionTag n="04" label={lang === "fa" ? "ایستگاه یادگیری" : "Learning checkpoint"} /><div className="quiz-heading"><h2>{t.quizTitle}</h2><p>{t.quizIntro}</p></div><div className="quiz-card"><div className="workbook-stamp"><img src={ASSETS.mark} alt="" /><span>{lang === "fa" ? "برگه‌ی بررسی روایت" : "Narrative field check"}</span></div><div className="quiz-meta"><span>{String(quizIndex + 1).padStart(2, "0")} / 03</span><div className="quiz-progress"><i style={{ width: `${((quizIndex + 1) / 3) * 100}%` }} /></div></div><h3>{quiz[lang][quizIndex].q}</h3><div className="quiz-options">{quiz[lang][quizIndex].options.map((option, i) => <button key={option} className={selectedAnswer === i ? (i === quiz[lang][quizIndex].answer ? "right" : "wrong") : ""} onClick={() => setSelectedAnswer(i)}><span>{String.fromCharCode(65 + i)}</span>{option}{selectedAnswer === i && (i === quiz[lang][quizIndex].answer ? <Check size={17} /> : <X size={17} />)}</button>)}</div>{selectedAnswer !== null && <p className={`feedback ${selectedAnswer === quiz[lang][quizIndex].answer ? "good" : ""}`}>{selectedAnswer === quiz[lang][quizIndex].answer ? t.correct : t.almost} {quiz[lang][quizIndex].explain}</p>}<button className="btn-primary" disabled={selectedAnswer === null} onClick={() => { if (quizIndex < 2) { setQuizIndex(quizIndex + 1); setSelectedAnswer(null); } else scrollTo("footer"); }}>{quizIndex === 2 ? t.finish : t.next}<ArrowUpRight size={16} /></button></div></div></section>

      <footer id="footer" className="footer"><div className="footer-top"><div><img src={ASSETS.mark} alt="" className="footer-mark" /><h2>{t.closing}</h2></div><div className="source-list"><h3>{t.sources}</h3><a href="https://www.isscr.org/treatment-guide" target="_blank" rel="noreferrer">ISSCR Guide to Stem Cell Treatments <ArrowUpRight size={13} /></a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4287204/" target="_blank" rel="noreferrer">Induced Pluripotent Stem Cells for Regenerative Medicine <ArrowUpRight size={13} /></a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6873767/" target="_blank" rel="noreferrer">Research and therapy with iPS cells <ArrowUpRight size={13} /></a><a href="https://www.isscr.org/guidelines" target="_blank" rel="noreferrer">ISSCR Guidelines <ArrowUpRight size={13} /></a></div></div><div className="footer-bottom"><span>© 2026 CELL STORY</span><span>{t.footer}</span><button onClick={() => scrollTo("top")} aria-label="Back to top"><ArrowUp size={16} /></button></div></footer>
    </main>
  </div>;
}
