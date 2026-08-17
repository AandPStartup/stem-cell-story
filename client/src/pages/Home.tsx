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

const fateDetails = {
  fa: [
    { summary: "مسیر عصبی معمولاً از یک مرحله‌ی پیش‌ساز عصبی می‌گذرد. در این مسیر، ترکیب پیام‌های محیطی و فعال‌شدن ژن‌های مرتبط با شبکه‌ی عصبی، شکل سلول، اتصال‌ها و توانایی انتقال پیام را تغییر می‌دهد.", signal: "پیام‌های عصبی و تماس با بافت", role: "پردازش و انتقال پیام", note: "ساخت یک نورون کافی نیست؛ اتصال درست آن به شبکه نیز اهمیت دارد.", stages: ["سلول پرتوان", "پیش‌ساز عصبی", "نورون در حال بلوغ"], checkpoint: "هویت سلولی، جهت رشد زائده‌ها و توانایی تشکیل سیناپس بررسی می‌شود.", research: "پژوهشگران با نشانگرهای ژنی، آزمون‌های الکتریکی و الگوی اتصال بررسی می‌کنند که سلول فقط شبیه نورون نباشد، بلکه رفتار مورد انتظار را نیز نشان دهد.", mechanism: "درون سلول، بعضی ژن‌ها خاموش و بعضی فعال می‌شوند. اسکلت سلولی دوباره سازمان می‌یابد تا زائده‌هایی شبیه آکسون و دندریت شکل بگیرند؛ هم‌زمان، گیرنده‌ها و کانال‌های یونی لازم برای دریافت و فرستادن پیام ساخته می‌شوند.", importance: "مدل‌های عصبیِ مشتق از سلول‌های بنیادی می‌توانند به مطالعه‌ی بیماری‌های عصبی، بررسی اثر داروها و فهم تفاوت‌های ژنتیکی میان افراد کمک کنند. با این حال، نتیجه‌ی آزمایشگاهی به‌تنهایی معادلِ جایگزینی ایمن یک شبکه‌ی عصبی در بدن نیست." },
    { summary: "برای رسیدن به سلول عضلانی، سلول ابتدا برنامه‌های ژنی مربوط به انقباض و سازمان‌دهی رشته‌های پروتئینی را فعال می‌کند. سپس به‌تدریج ساختاری مناسب برای تولید نیرو می‌گیرد.", signal: "برنامه‌های رشد و حرکت", role: "انقباض و تولید نیرو", note: "در بافت زنده، نظم رشته‌ها و ارتباط با عصب و خون‌رسانی نیز مهم است.", stages: ["سلول پرتوان", "پیش‌ساز عضلانی", "فیبر عضلانی"], checkpoint: "فعال‌شدن ژن‌های انقباضی و هم‌ترازی رشته‌های پروتئینی کنترل می‌شود.", research: "علاوه بر شکل ظاهری، پژوهشگران توان انقباض، بلوغ فیبرها و واکنش سلول به تحریک را می‌سنجند.", mechanism: "در این مسیر، سلول پروتئین‌های انقباضی بیشتری می‌سازد و رشته‌های آن‌ها را در آرایش منظم قرار می‌دهد. چند سلول پیش‌ساز می‌توانند به‌هم نزدیک شوند و ساختارهای طولانی‌تر و هماهنگ‌تری بسازند که برای تولید نیرو مناسب‌اند.", importance: "این مدل‌ها برای مطالعه‌ی بیماری‌های عضلانی، آزمون سمیت داروها و بررسی چگونگی ترمیم بافت ارزشمندند. اما برای کاربرد درمانی، سلول‌ها باید در محیط واقعی با عصب، رگ و بافت پیوندی نیز هماهنگ شوند." },
    { summary: "خون‌سازی یک شاخه‌ی واحد نیست: پیش‌سازهای خونی می‌توانند به سلول‌هایی با نقش‌های متفاوت، مانند حمل اکسیژن یا دفاع ایمنی، تبدیل شوند. محیط مغز استخوان در انتخاب این مسیرها نقش دارد.", signal: "سیگنال‌های خونساز و ریزمحیط", role: "انتقال اکسیژن یا دفاع", note: "کنترل دقیق نوع سلول و توان تکثیر آن برای کاربرد درمانی ضروری است.", stages: ["سلول پرتوان", "پیش‌ساز خونی", "سلول خونی تخصصی"], checkpoint: "نوع دقیق سلول، توان رشد و نبود جمعیت‌های ناخواسته بررسی می‌شود.", research: "مدل‌های خون‌سازی به پژوهشگران کمک می‌کنند اثر داروها، اختلال‌های ژنتیکی و پایداری جمعیت سلولی را مطالعه کنند.", mechanism: "پیش‌ساز خونی به پیام‌های ریزمحیط خود پاسخ می‌دهد و مجموعه‌ی متفاوتی از ژن‌ها را فعال می‌کند. همین انتخاب‌های مرحله‌ای مشخص می‌کنند سلول در نهایت بیشتر به مسیر گلبول قرمز، بعضی سلول‌های ایمنی یا شاخه‌های خونی دیگر نزدیک شود.", importance: "چون خون‌سازی به بیماری‌های ارثی، ایمنی و درمان‌های دارویی حساس است، این مدل‌ها می‌توانند برای فهم کم‌خونی‌ها، اختلال‌های خونی و پاسخ به دارو مفید باشند. با این حال، تولید یک جمعیت خونی پایدار و قابل استفاده در بدن، نیازمند کنترل کیفیت بسیار دقیق است." },
    { summary: "مسیر کبدی اغلب از مراحل شبیه بافت درون‌پوست آغاز می‌شود. با تغییر مرحله‌ای پیام‌ها، سلول ویژگی‌های لازم برای سوخت‌وساز، سم‌زدایی و تولید پروتئین‌های کبدی را به دست می‌آورد.", signal: "مراحل رشد شبیه کبد", role: "سوخت‌وساز و سم‌زدایی", note: "برای عملکرد واقعی، سلول باید با معماری و رگ‌رسانی بافت کبد هماهنگ شود.", stages: ["سلول پرتوان", "پیش‌ساز درون‌پوست", "سلول شبیه کبد"], checkpoint: "فعالیت‌های سوخت‌وسازی و تولید پروتئین‌های کبدی در چند مرحله اندازه‌گیری می‌شود.", research: "این مدل‌ها برای بررسی سمیت داروها و بیماری‌های کبدی مفیدند، اما هنوز باید کیفیت، بلوغ و ادغام بافتی آن‌ها با دقت ارزیابی شود.", mechanism: "سلول ابتدا ویژگی‌های لایه‌ی درون‌پوست را به دست می‌آورد و سپس با پیام‌های مرحله‌ای، مجموعه‌ای از آنزیم‌ها و پروتئین‌های کبدی را تولید می‌کند. این تغییرات به سلول کمک می‌کنند مولکول‌ها را پردازش کند، بعضی مواد را سم‌زدایی کند و پروتئین‌های لازم را بسازد.", importance: "سلول‌های شبیه کبد برای بررسی ایمنی داروها و مدل‌سازی بیماری‌های کبدی کاربرد پژوهشی مهمی دارند؛ زیرا بعضی اثرات یک دارو فقط وقتی روشن می‌شود که سلول توان سوخت‌وساز شبیه کبد داشته باشد. با این حال، بلوغ کامل و اتصال به ساختار پیچیده‌ی کبد هنوز یک چالش است." },
  ],
  en: [
    { summary: "The neural route usually passes through a neural progenitor stage. Environmental cues and neural gene programs then reshape the cell, its connections, and its capacity to transmit signals.", signal: "Neural cues and tissue contact", role: "Signal processing and transmission", note: "Making a neuron is not enough; it must also connect appropriately within a network.", stages: ["Pluripotent cell", "Neural progenitor", "Maturing neuron"], checkpoint: "Cell identity, neurite direction, and synapse-forming capacity are checked.", research: "Researchers combine gene markers, electrical tests, and connection patterns to ask whether a cell merely looks like a neuron or also behaves as one.", mechanism: "Inside the cell, some genes are switched off while neural gene programs are switched on. The cellular skeleton reorganizes to form axon- and dendrite-like projections, while receptors and ion channels needed to receive and transmit signals are produced.", importance: "Stem-cell-derived neural models can support research into neurological disease, drug effects, and person-to-person genetic differences. A laboratory result alone, however, is not the same as safely replacing a functional neural network in the body." },
    { summary: "To become a muscle cell, the cell activates gene programs for contraction and protein-filament organization. It then gradually gains a structure that can generate force.", signal: "Growth and movement programs", role: "Contraction and force generation", note: "In living tissue, fiber alignment, nerve input, and blood supply also matter.", stages: ["Pluripotent cell", "Muscle progenitor", "Muscle fiber"], checkpoint: "Activation of contraction genes and alignment of protein filaments are monitored.", research: "Beyond appearance, researchers measure contraction, fiber maturation, and how cells respond to stimulation.", mechanism: "Along this route, the cell makes more contractile proteins and arranges their filaments in an orderly pattern. Several progenitors can draw together into longer, more coordinated structures that are better suited to generating force.", importance: "These models are useful for studying muscle disorders, drug toxicity, and tissue repair. For clinical use, cells would also need to coordinate with nerves, blood vessels, and connective tissue in a real biological environment." },
    { summary: "Blood formation is not a single route: blood progenitors can become cells with different roles, such as oxygen transport or immune defense. The bone-marrow environment helps guide those choices.", signal: "Blood-forming cues and niche", role: "Oxygen transport or defense", note: "For treatment, the exact cell type and its growth behavior must be controlled carefully.", stages: ["Pluripotent cell", "Blood progenitor", "Specialized blood cell"], checkpoint: "The exact cell identity, growth capacity, and absence of unwanted populations are checked.", research: "Blood-forming models help researchers study drug effects, genetic disorders, and the stability of a cell population.", mechanism: "A blood progenitor responds to its local niche and activates different sets of genes. Those stepwise choices determine whether it moves closer to red-cell formation, particular immune-cell routes, or other blood lineages.", importance: "Because blood formation is relevant to inherited conditions, immunity, and drug response, these models can support research into anemia and blood disorders. Producing a stable, body-ready blood population still requires exceptionally careful quality control." },
    { summary: "The liver route often begins with endoderm-like stages. By changing signals step by step, a cell gains features needed for metabolism, detoxification, and liver-protein production.", signal: "Stage-specific liver cues", role: "Metabolism and detoxification", note: "For real function, the cell must coordinate with liver structure and blood flow.", stages: ["Pluripotent cell", "Endoderm progenitor", "Liver-like cell"], checkpoint: "Metabolic activity and liver-protein production are measured across stages.", research: "These models can help study drug toxicity and liver disease, but maturity, quality, and tissue integration still need careful evaluation.", mechanism: "The cell first gains endoderm-like traits, then receives staged cues that turn on liver enzymes and proteins. These changes help it process molecules, detoxify some substances, and produce proteins associated with liver function.", importance: "Liver-like cells are particularly useful for drug-safety studies because some effects appear only after liver-style metabolism. Full maturity and coordination with the liver’s complex architecture remain important unresolved challenges." },
  ],
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
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [openChallenge, setOpenChallenge] = useState<number | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const t = copy[lang];
  const direction = lang === "fa" ? "rtl" : "ltr";
  const motionProps = reduced ? {} : { initial: { opacity: 0, y: 34 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-16% 0px -16%" }, transition: { duration: 0.42, ease: "easeOut" as const } };

  useEffect(() => { localStorage.setItem("cell-story-lang", lang); document.documentElement.lang = lang === "fa" ? "fa" : "en"; document.documentElement.dir = direction; }, [lang, direction]);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  const timelineLabels = [t.simple, t.signals, t.genes, t.precursor, t.specialized];
  const timelineDetails = lang === "fa" ? [
    { title: "پتانسیل باز", body: "سلول هنوز چند مسیر تخصصی را پیش روی خود دارد و می‌تواند با حفظ توان پرتوانی، نسخه‌های بیشتری از خود بسازد.", cue: "هنوز چند امکان هم‌زمان باز است." },
    { title: "پیام‌های محیطی", body: "مولکول‌های پیام‌رسان، تماس با سلول‌های اطراف و ویژگی‌های ماتریکس بافتی به سلول می‌گویند کدام مسیر را جدی‌تر دنبال کند.", cue: "محیط، انتخاب‌ها را جهت می‌دهد." },
    { title: "برنامه‌ی ژنی", body: "برخی ژن‌ها فعال و برخی خاموش می‌شوند. این تغییر در بیان ژن، پروتئین‌ها و رفتار آینده‌ی سلول را شکل می‌دهد.", cue: "هویت تازه از درون سلول ساخته می‌شود." },
    { title: "سلول پیش‌ساز", body: "سلول وارد یک مرحله‌ی میانی می‌شود؛ دیگر کاملاً پرتوان نیست، اما هنوز می‌تواند به چند سلول نزدیک و مرتبط تبدیل شود.", cue: "مسیر محدودتر، اما مشخص‌تر می‌شود." },
    { title: "سلول تخصصی", body: "در پایان، سلول ساختار و عملکردی متناسب با نقش خود پیدا می‌کند؛ مانند انتقال پیام عصبی، انقباض عضلانی یا تولید پروتئین.", cue: "هویت، ساختار و عملکرد هم‌راستا می‌شوند." },
  ] : [
    { title: "Open potential", body: "The cell still has several possible specialized routes and can keep renewing itself while its potency remains broad.", cue: "Several possibilities remain open." },
    { title: "Environmental signals", body: "Molecules, neighboring cells, and the tissue matrix help the cell read which direction should become more likely.", cue: "Context gives the choice a direction." },
    { title: "Gene program", body: "Some genes switch on while others switch off. This changes the proteins and behaviors the cell can produce next.", cue: "A new identity is built from within." },
    { title: "Progenitor cell", body: "The cell enters an intermediate stage: less flexible than a pluripotent cell, but still able to form a related group of cell types.", cue: "The route narrows and becomes clearer." },
    { title: "Specialized cell", body: "The cell develops structure and function suited to its role, such as signaling, contraction, or protein production.", cue: "Identity, structure, and function align." },
  ];

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
        <motion.div className="fate-panel" {...motionProps}><div className="panel-heading"><div><span>{t.choose}</span><small dir={lang === "fa" ? "rtl" : "ltr"}>{lang === "fa" ? "از خودنوزایی تا سرنوشت سلولی" : "SELF-RENEWAL → FATE"}</small></div><b className="specimen-id">{lang === "fa" ? "نمونه / ۰۴" : "SPECIMEN / 04"}</b></div><div className="fate-visual"><img src={ASSETS.differentiation} alt="" /><div className="visual-coordinate coordinate-a">C-01</div><div className="visual-coordinate coordinate-b">FATE MAP</div><div className="fate-core"><span>{lang === "fa" ? "بنیادی" : "stem"}</span><small>{lang === "fa" ? "هسته‌ی تصمیم" : "decision core"}</small></div>{fates[lang].map((f, i) => <button key={f} className={`fate-node fate-${i + 1} ${selectedFate === i ? "selected" : ""}`} onClick={() => setSelectedFate(i)}><span className="node-dot" /><b>{f}</b><i>↗</i></button>)}</div><AnimatePresence mode="wait"><motion.div key={selectedFate + lang} className="fate-caption fate-detail" initial={reduced ? {} : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><div className="fate-detail-head"><span>↳</span><div><small>{lang === "fa" ? "مشاهده‌ی انتخاب‌شده" : "Selected observation"}</small><b>{fates[lang][selectedFate]}</b></div></div><p>{fateDetails[lang][selectedFate].summary}</p><div className="fate-explainer"><div><span>{lang === "fa" ? "درون سلول چه رخ می‌دهد؟" : "What changes inside the cell?"}</span><p>{fateDetails[lang][selectedFate].mechanism}</p></div><div><span>{lang === "fa" ? "چرا این مسیر مهم است؟" : "Why does this pathway matter?"}</span><p>{fateDetails[lang][selectedFate].importance}</p></div></div><div className="fate-detail-grid"><div><span>{lang === "fa" ? "راهنما" : "Guidance"}</span><b>{fateDetails[lang][selectedFate].signal}</b></div><div><span>{lang === "fa" ? "کارکرد" : "Function"}</span><b>{fateDetails[lang][selectedFate].role}</b></div></div><div className="fate-stage-block"><div className="fate-stage-title"><span>{lang === "fa" ? "نقشه‌ی رشد" : "Development map"}</span><b>{lang === "fa" ? "سه ایستگاه کلیدی" : "Three key checkpoints"}</b></div><div className="fate-stage-flow">{fateDetails[lang][selectedFate].stages.map((stage, i) => <span key={stage}><i>{i + 1}</i>{stage}</span>)}</div></div><div className="fate-research"><span>{lang === "fa" ? "چه چیزی بررسی می‌شود؟" : "What researchers check"}</span><b>{fateDetails[lang][selectedFate].checkpoint}</b><p>{fateDetails[lang][selectedFate].research}</p></div><div className="fate-detail-note"><i />{fateDetails[lang][selectedFate].note}</div></motion.div></AnimatePresence></motion.div>
      </section>

      <section id="differentiation" className="timeline-section"><div className="wide-inner"><SectionTag n="01—A" label={lang === "fa" ? "مسیر تمایز" : "The differentiation path"} /><div className="timeline-intro"><div><h2>{lang === "fa" ? "هویت سلول، یک تصمیم لحظه‌ای نیست." : "Cell identity is not a single moment."}</h2><p>{lang === "fa" ? "محیط، پیام‌ها و برنامه‌های ژنی در طول زمان با هم کار می‌کنند تا یک سلول را تخصصی کنند." : "Environment, signals, and gene programs work together over time to specialize a cell."}</p></div><div className="timeline-signal"><span>{lang === "fa" ? "سیگنال زنده" : "LIVE SIGNAL"}</span><b>{timelineDetails[timelineIndex].cue}</b><i /></div></div><div className="timeline"><div className="timeline-line" />{timelineLabels.map((label, i) => <button key={label} className={`timeline-step ${i === timelineIndex ? "selected" : ""}`} onClick={() => setTimelineIndex(i)} aria-pressed={i === timelineIndex}><span>{String(i + 1).padStart(2, "0")}</span><i /> <b>{label}</b></button>)}</div><AnimatePresence mode="wait"><motion.div key={timelineIndex + lang} className="timeline-detail" initial={reduced ? {} : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .28 }}><div className="timeline-detail-index">0{timelineIndex + 1}</div><div><small>{lang === "fa" ? "ایستگاه انتخاب‌شده" : "SELECTED STATION"}</small><h3>{timelineDetails[timelineIndex].title}</h3><p>{timelineDetails[timelineIndex].body}</p></div><button onClick={() => setTimelineIndex((timelineIndex + 1) % timelineLabels.length)}>{lang === "fa" ? "ایستگاه بعدی" : "Next station"}<ArrowUpRight size={15} /></button></motion.div></AnimatePresence></div></section>

      <section id="two" className="story-section challenges-section"><div className="wide-inner"><motion.div {...motionProps}><SectionTag n="02" label={t.question} /><div className="section-head-row"><div><h2>{t.challengeTitle}</h2><p className="lead">{t.challengeIntro}</p></div><div className="annotation">{lang === "fa" ? "۶ دروازه‌ی مهم" : "06 critical gates"}<span>↓</span></div></div></motion.div><div className="challenge-layout"><div className="challenge-list">{challenges[lang].map((c, i) => <motion.button {...motionProps} transition={{ ...(motionProps.transition as object), delay: i * 0.04 }} key={c[0]} className={`challenge-card ${openChallenge === i ? "open" : ""}`} onClick={() => setOpenChallenge(openChallenge === i ? null : i)}><span className="challenge-number">0{i + 1}</span><span className="challenge-copy"><b>{c[0]}</b><span>{c[1]}</span>{openChallenge === i && <em>{c[2]}</em>}</span><ChevronDown size={18} /></motion.button>)}</div><div className="challenge-visual"><img src={ASSETS.tissue} alt={lang === "fa" ? "نمایش هنری از محیط بافتی در پزشکی بازساختی" : "Artistic visualization of a tissue environment in regenerative medicine"} /><div className="plate-callout callout-a"><i />{lang === "fa" ? "محیط بافتی" : "Tissue context"}</div><div className="plate-callout callout-b"><i />{lang === "fa" ? "ادغام سلولی" : "Cell integration"}</div><div className="visual-stamp"><FlaskConical size={16} /><span>{lang === "fa" ? "از امید تا شواهد" : "Promise to evidence"}</span></div><div className="plate-caption"><span>PLATE 02</span><b>{lang === "fa" ? "بقا، رسانش، عملکرد" : "Survival, delivery, function"}</b></div></div></div><div className="evidence-strip"><div className="evidence-title">{t.gapTitle}</div><div className="evidence-track"><div className="evidence-fill" /><div><span>01</span><b>{t.lab}</b></div><div><span>02</span><b>{t.preclinical}</b></div><div><span>03</span><b>{t.validated}</b></div></div></div></div></section>

      <section id="three" className="ips-section section-grid"><motion.div className="ips-visual" {...motionProps}><img src={ASSETS.ips} alt={lang === "fa" ? "بازبرنامه‌ریزی سلول بالغ به سلول iPS" : "Reprogramming a mature cell into an iPS cell"} /><div className="plate-callout ips-callout"><i />{lang === "fa" ? "بازگشت به حالت پرتوان" : "Return to pluripotency"}</div><div className="ips-label"><span>FIG. 03</span><b>iPS</b><small>{lang === "fa" ? "بازبرنامه‌ریزی سلولی" : "cellular reprogramming"}</small></div><div className="plate-caption"><span>PLATE 03</span><b>{lang === "fa" ? "از سلول بالغ تا امکان تازه" : "From maturity to possibility"}</b></div></motion.div><motion.div className="ips-copy" {...motionProps}><SectionTag n="03" label={t.question} /><h2>{t.ipsTitle}</h2><p className="lead">{t.ipsIntro}</p><p>{t.ipsBody}</p><div className="ips-path">{[lang === "fa" ? "سلول پوستی بالغ" : "Mature skin cell", lang === "fa" ? "بازبرنامه‌ریزی" : "Reprogramming", lang === "fa" ? "سلول iPS" : "iPS cell", lang === "fa" ? "تمایز هدایت‌شده" : "Directed differentiation"].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, "0")}</span><b>{x}</b>{i < 3 && <i>→</i>}</div>)}</div><div className="why-box"><div><span>WHY IT MATTERS</span><h3>{t.why}</h3></div><p>{t.whyBody}</p></div></motion.div></section>

      <section className="quiz-section"><div className="quiz-inner"><SectionTag n="04" label={lang === "fa" ? "ایستگاه یادگیری" : "Learning checkpoint"} /><div className="quiz-heading"><h2>{t.quizTitle}</h2><p>{t.quizIntro}</p></div><div className="quiz-card"><div className="workbook-stamp"><img src={ASSETS.mark} alt="" /><span>{lang === "fa" ? "برگه‌ی بررسی روایت" : "Narrative field check"}</span></div><div className="quiz-meta"><span>{String(quizIndex + 1).padStart(2, "0")} / 03</span><div className="quiz-progress"><i style={{ width: `${((quizIndex + 1) / 3) * 100}%` }} /></div></div><h3>{quiz[lang][quizIndex].q}</h3><div className="quiz-options">{quiz[lang][quizIndex].options.map((option, i) => <button key={option} className={selectedAnswer === i ? (i === quiz[lang][quizIndex].answer ? "right" : "wrong") : ""} onClick={() => setSelectedAnswer(i)}><span>{String.fromCharCode(65 + i)}</span>{option}{selectedAnswer === i && (i === quiz[lang][quizIndex].answer ? <Check size={17} /> : <X size={17} />)}</button>)}</div>{selectedAnswer !== null && <p className={`feedback ${selectedAnswer === quiz[lang][quizIndex].answer ? "good" : ""}`}>{selectedAnswer === quiz[lang][quizIndex].answer ? t.correct : t.almost} {quiz[lang][quizIndex].explain}</p>}<button className="btn-primary" disabled={selectedAnswer === null} onClick={() => { if (quizIndex < 2) { setQuizIndex(quizIndex + 1); setSelectedAnswer(null); } else scrollTo("footer"); }}>{quizIndex === 2 ? t.finish : t.next}<ArrowUpRight size={16} /></button></div></div></section>

      <footer id="footer" className="footer"><div className="footer-top"><div><img src={ASSETS.mark} alt="" className="footer-mark" /><h2>{t.closing}</h2></div><div className="source-list"><h3>{t.sources}</h3><a href="https://www.isscr.org/treatment-guide" target="_blank" rel="noreferrer">ISSCR Guide to Stem Cell Treatments <ArrowUpRight size={13} /></a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4287204/" target="_blank" rel="noreferrer">Induced Pluripotent Stem Cells for Regenerative Medicine <ArrowUpRight size={13} /></a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6873767/" target="_blank" rel="noreferrer">Research and therapy with iPS cells <ArrowUpRight size={13} /></a><a href="https://www.isscr.org/guidelines" target="_blank" rel="noreferrer">ISSCR Guidelines <ArrowUpRight size={13} /></a></div></div><div className="footer-bottom"><span>© 2026 CELL STORY</span><span>{t.footer}</span><button onClick={() => scrollTo("top")} aria-label="Back to top"><ArrowUp size={16} /></button></div></footer>
    </main>
  </div>;
}
