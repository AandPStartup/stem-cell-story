import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpRight, Check, ChevronDown, Globe2, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ASSETS = {
  hero: "/images/hero-stem-cell.jpg",
  differentiation: "/images/differentiation-pathways.jpg",
  ips: "/images/ips-reprogramming.jpg",
  tissue: "/images/tissue-regeneration.jpg",
  mark: "/images/cell-mark.jpg",
};

type Lang = "fa" | "en";

const copy = {
  fa: {
    eyebrow: "راهنمای تعاملی سلول‌های بنیادی",
    title: "علم را بکاوید؛\nروایتگر آن باشید.",
    subtitle: "از یک سلول، داستانی برای آینده‌ی پزشکی",
    begin: "شروع روایت",
    journey: "مسیر تمایز",
    question: "پرسش",
    simple: "توضیح ساده",
    stemTitle: "سلول بنیادی چیست؟",
    stemIntro: "یک سلول؛ دو توانایی کلیدی",
    stemBody:
      "سلول بنیادی هم می‌تواند نسخه‌های بیشتری از خودش بسازد و هم، وقتی پیام‌های درست را دریافت می‌کند، به سلول‌هایی با وظایف تخصصی تبدیل شود.",
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
    gapTitle: "فاصله‌ی میان امید و درمان",
    lab: "امید آزمایشگاهی",
    preclinical: "شواهد پیش‌بالینی",
    validated: "درمان تأییدشده",
    ipsTitle: "وقتی یک سلول بالغ، فرصت بازگشت پیدا می‌کند",
    ipsIntro: "iPSها انعطاف‌پذیری را به سلول‌های انسانی بازمی‌گردانند.",
    ipsBody:
      "پژوهشگران می‌توانند یک سلول بالغ، مانند سلول پوست، را به حالت پرتوان القایی بازبرنامه‌ریزی کنند؛ سپس آن را برای ساخت مدل بیماری، آزمون دارو و پژوهش درباره‌ی سلول‌های جایگزین هدایت کنند.",
    why: "چرا مهم است؟",
    whyBody:
      "کار بهاروند و همکارانش در مسیر تثبیت و پیشبرد پژوهش سلول‌های iPS انسانی در ایران اهمیت داشت: این کار نشان داد که می‌توان از سلول‌های بالغ انسانی به یک منبع انعطاف‌پذیر برای مطالعه و تمایز سلولی رسید. این دستاورد یک امکان پژوهشی و درمانی ساخت، نه یک درمان تضمین‌شده.",
    quizTitle: "روایت را خودتان تعریف کنید",
    quizIntro: "سه پرسش کوتاه برای اینکه ببینیم ایده‌ی اصلی را گرفته‌اید.",
    next: "پرسش بعدی",
    finish: "پایان روایت",
    sources: "منابع و مسیر مطالعه",
    closing: "علم فقط پاسخ نیست؛ راهی است برای پرسیدن بهتر، آزمودن دقیق‌تر و امید بستن مسئولانه.",
    footer: "یک روایت تعاملی برای فهم بهتر زیست‌شناسی سلول‌های بنیادی",
    correct: "آفرین؛ دلیلش این است:",
    almost: "نزدیک بود؛ نکته‌ی مهم این است:",
    simpleMode: "ساده",
    deepMode: "عمیق‌تر",
  },
  en: {
    eyebrow: "An interactive field guide to stem cells",
    title: "Explore science.\nTell its story.",
    subtitle: "From one cell, a story about the future of medicine",
    begin: "Begin the story",
    journey: "Differentiation path",
    question: "Question",
    simple: "Simple explanation",
    stemTitle: "What is a stem cell?",
    stemIntro: "One cell; two defining abilities",
    stemBody:
      "A stem cell can make more copies of itself and, when it receives the right signals, become cells with specialized functions.",
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
    gapTitle: "The distance between promise and treatment",
    lab: "Laboratory promise",
    preclinical: "Preclinical evidence",
    validated: "Validated treatment",
    ipsTitle: "When a mature cell gets a chance to return",
    ipsIntro: "iPS cells return flexibility to human cells.",
    ipsBody:
      "Researchers can reprogram a mature cell, such as a skin cell, into an induced pluripotent state, then guide it toward disease models, drug testing, and research on replacement cells.",
    why: "Why it matters",
    whyBody:
      "Baharvand and colleagues’ work helped establish and advance human iPS-cell research in Iran. It showed the value of turning accessible adult cells into a flexible resource for studying and directing cell fate. That created a research and therapeutic possibility—not a guaranteed treatment.",
    quizTitle: "Tell the story yourself",
    quizIntro: "Three short questions to check the core ideas.",
    next: "Next question",
    finish: "Finish the story",
    sources: "Sources for further reading",
    closing: "Science is not only about answers; it is a way to ask better questions, test more carefully, and hope responsibly.",
    footer: "An interactive story for understanding stem-cell biology",
    correct: "Correct — here is why:",
    almost: "Almost — the important point is:",
    simpleMode: "Simple",
    deepMode: "Deeper",
  },
} as const;

const fates = {
  fa: ["سلول عصبی", "سلول عضلانی", "سلول خونی", "سلول کبدی"],
  en: ["Neuron", "Muscle cell", "Blood cell", "Liver cell"],
};

const fateDetails = {
  fa: [
    {
      summary:
        "مسیر عصبی معمولاً از یک مرحله‌ی پیش‌ساز عصبی می‌گذرد. در این مسیر، ترکیب پیام‌های محیطی و فعال‌شدن ژن‌های مرتبط با شبکه‌ی عصبی، شکل سلول، اتصال‌ها و توانایی انتقال پیام را تغییر می‌دهد.",
      signal: "پیام‌های عصبی و تماس با بافت",
      role: "پردازش و انتقال پیام",
      note: "ساخت یک نورون کافی نیست؛ اتصال درست آن به شبکه نیز اهمیت دارد.",
      stages: [
        {
          name: "سلول پرتوان",
          body: "در این ایستگاه، سلول هنوز چند مسیر تخصصی را همزمان باز نگه می‌دارد و می‌تواند خود را نوسازی کند. هویت نهایی هنوز تثبیت نشده است.",
          focus: "حفظ انعطاف و توان خودنوزایی",
        },
        {
          name: "پیش‌ساز عصبی",
          body: "سلول وارد مسیر عصبی می‌شود: برنامه‌های ژنی مرتبط با شبکه عصبی فعال می‌شوند و گزینه‌های غیرعصبی محدودتر می‌گردند، بدون اینکه هنوز نورون بالغ باشد.",
          focus: "تعهد اولیه به مسیر عصبی",
        },
        {
          name: "نورون در حال بلوغ",
          body: "زائده‌های شبیه آکسون و دندریت شکل می‌گیرند و توانایی دریافت و فرستادن پیام تقویت می‌شود. پژوهشگر باید هویت، جهت رشد و ظرفیت سیناپس را بسنجد.",
          focus: "ساختار، اتصال و رفتار سیگنالی",
        },
      ],
      checkpoint: "هویت سلولی، جهت رشد زائده‌ها و توانایی تشکیل سیناپس بررسی می‌شود.",
      research:
        "پژوهشگران با نشانگرهای ژنی، آزمون‌های الکتریکی و الگوی اتصال بررسی می‌کنند که سلول فقط شبیه نورون نباشد، بلکه رفتار مورد انتظار را نیز نشان دهد.",
      mechanism:
        "درون سلول، بعضی ژن‌ها خاموش و بعضی فعال می‌شوند. اسکلت سلولی دوباره سازمان می‌یابد تا زائده‌هایی شبیه آکسون و دندریت شکل بگیرند.",
      importance:
        "مدل‌های عصبیِ مشتق از سلول‌های بنیادی می‌توانند به مطالعه‌ی بیماری‌های عصبی و بررسی اثر داروها کمک کنند.",
    },
    {
      summary:
        "برای رسیدن به سلول عضلانی، سلول ابتدا برنامه‌های ژنی مربوط به انقباض و سازمان‌دهی رشته‌های پروتئینی را فعال می‌کند.",
      signal: "برنامه‌های رشد و حرکت",
      role: "انقباض و تولید نیرو",
      note: "در بافت زنده، نظم رشته‌ها و ارتباط با عصب و خون‌رسانی نیز مهم است.",
      stages: [
        {
          name: "سلول پرتوان",
          body: "سلول هنوز می‌تواند مسیرهای تخصصی گوناگون را انتخاب کند. در این مرحله، هدف حفظ کیفیت منبع سلولی و آمادگی برای هدایت کنترل‌شده است.",
          focus: "منبع باز و قابل هدایت",
        },
        {
          name: "پیش‌ساز عضلانی",
          body: "برنامه‌های مرتبط با انقباض آغاز می‌شوند و سلول به سمت هویت عضلانی حرکت می‌کند، اما هنوز فیبر بالغ با آرایش کامل رشته‌ها نیست.",
          focus: "فعال‌سازی مسیر انقباضی",
        },
        {
          name: "فیبر عضلانی",
          body: "پروتئین‌های انقباضی در آرایش منظم قرار می‌گیرند و توان تولید نیرو افزایش می‌یابد. بلوغ واقعی با سنجش انقباض و پاسخ به تحریک مشخص می‌شود.",
          focus: "ساختار رشته‌ای و توان نیرو",
        },
      ],
      checkpoint: "فعال‌شدن ژن‌های انقباضی و هم‌ترازی رشته‌های پروتئینی کنترل می‌شود.",
      research: "علاوه بر شکل ظاهری، پژوهشگران توان انقباض و بلوغ فیبرها را می‌سنجند.",
      mechanism: "سلول پروتئین‌های انقباضی بیشتری می‌سازد و رشته‌های آن‌ها را در آرایش منظم قرار می‌دهد.",
      importance: "این مدل‌ها برای مطالعه‌ی بیماری‌های عضلانی و آزمون سمیت داروها ارزشمندند.",
    },
    {
      summary:
        "خون‌سازی یک شاخه‌ی واحد نیست: پیش‌سازهای خونی می‌توانند به سلول‌هایی با نقش‌های متفاوت، مانند حمل اکسیژن یا دفاع ایمنی، تبدیل شوند.",
      signal: "سیگنال‌های خونساز و ریزمحیط",
      role: "انتقال اکسیژن یا دفاع",
      note: "کنترل دقیق نوع سلول و توان تکثیر آن برای کاربرد درمانی ضروری است.",
      stages: [
        {
          name: "سلول پرتوان",
          body: "سلول می‌تواند به شاخه‌های خونی گوناگون نزدیک شود. کنترل دقیق پیام‌ها در همین نقطه، از تشکیل جمعیت ناخواسته جلوگیری می‌کند.",
          focus: "باز بودن چند شاخه‌ی خونی",
        },
        {
          name: "پیش‌ساز خونی",
          body: "سلول به ریزمحیط خون‌ساز پاسخ می‌دهد و مسیرهایی مانند گلبول قرمز یا سلول ایمنی را جدی‌تر دنبال می‌کند، بدون تعهد نهایی کامل.",
          focus: "انتخاب شاخه بر اساس پیام‌ها",
        },
        {
          name: "سلول خونی تخصصی",
          body: "هویت نهایی تثبیت می‌شود و کارکرد مشخص—مثل حمل اکسیژن یا دفاع—ظهور می‌کند. خلوص جمعیت و پایداری رشد در این مرحله حیاتی است.",
          focus: "هویت نهایی و کارکرد تخصصی",
        },
      ],
      checkpoint: "نوع دقیق سلول، توان رشد و نبود جمعیت‌های ناخواسته بررسی می‌شود.",
      research: "مدل‌های خون‌سازی به مطالعه‌ی اثر داروها و اختلال‌های ژنتیکی کمک می‌کنند.",
      mechanism: "پیش‌ساز خونی به پیام‌های ریزمحیط خود پاسخ می‌دهد و مجموعه‌ی متفاوتی از ژن‌ها را فعال می‌کند.",
      importance: "این مدل‌ها برای فهم کم‌خونی‌ها و اختلال‌های خونی مفیدند.",
    },
    {
      summary:
        "مسیر کبدی اغلب از مراحل شبیه بافت درون‌پوست آغاز می‌شود. با تغییر مرحله‌ای پیام‌ها، سلول ویژگی‌های لازم برای سوخت‌وساز و سم‌زدایی را به دست می‌آورد.",
      signal: "مراحل رشد شبیه کبد",
      role: "سوخت‌وساز و سم‌زدایی",
      note: "برای عملکرد واقعی، سلول باید با معماری و رگ‌رسانی بافت کبد هماهنگ شود.",
      stages: [
        {
          name: "سلول پرتوان",
          body: "سلول هنوز چند مسیر درون‌پوستی و غیرآن را پیش رو دارد. هدایت مرحله‌ای پیام‌ها از همین نقطه آغاز می‌شود.",
          focus: "آمادگی برای مسیر درون‌پوست",
        },
        {
          name: "پیش‌ساز درون‌پوست",
          body: "سلول ویژگی‌های لایه‌ی درون‌پوست را پیدا می‌کند و به مسیرهای نزدیک به کبد نزدیک‌تر می‌شود، اما هنوز سلول بالغ کبدی نیست.",
          focus: "تعهد به مسیر درون‌پوست",
        },
        {
          name: "سلول شبیه کبد",
          body: "آنزیم‌ها و پروتئین‌های مرتبط با سوخت‌وساز و سم‌زدایی فعال می‌شوند. پژوهشگر باید بلوغ عملکردی را، نه فقط شباهت ظاهری، بسنجد.",
          focus: "سوخت‌وساز و سم‌زدایی",
        },
      ],
      checkpoint: "فعالیت‌های سوخت‌وسازی و تولید پروتئین‌های کبدی اندازه‌گیری می‌شود.",
      research: "این مدل‌ها برای بررسی سمیت داروها و بیماری‌های کبدی مفیدند.",
      mechanism: "سلول ابتدا ویژگی‌های لایه‌ی درون‌پوست را به دست می‌آورد و سپس آنزیم‌ها و پروتئین‌های کبدی را تولید می‌کند.",
      importance: "سلول‌های شبیه کبد برای بررسی ایمنی داروها کاربرد پژوهشی مهمی دارند.",
    },
  ],
  en: [
    {
      summary:
        "The neural route usually passes through a neural progenitor stage. Environmental cues and neural gene programs then reshape the cell, its connections, and its capacity to transmit signals.",
      signal: "Neural cues and tissue contact",
      role: "Signal processing and transmission",
      note: "Making a neuron is not enough; it must also connect appropriately within a network.",
      stages: [
        {
          name: "Pluripotent cell",
          body: "At this station the cell keeps several specialized routes open and can renew itself. Final identity is not fixed yet.",
          focus: "Flexibility and self-renewal",
        },
        {
          name: "Neural progenitor",
          body: "The cell commits toward the neural route: neural gene programs rise and non-neural options narrow, without becoming a mature neuron yet.",
          focus: "Early neural commitment",
        },
        {
          name: "Maturing neuron",
          body: "Axon- and dendrite-like projections form and signaling capacity increases. Researchers check identity, growth direction, and synapse potential.",
          focus: "Structure, connectivity, and signaling",
        },
      ],
      checkpoint: "Cell identity, neurite direction, and synapse-forming capacity are checked.",
      research:
        "Researchers combine gene markers, electrical tests, and connection patterns to ask whether a cell merely looks like a neuron or also behaves as one.",
      mechanism:
        "Inside the cell, some genes switch off while neural programs switch on. The cellular skeleton reorganizes to form axon- and dendrite-like projections.",
      importance:
        "Stem-cell-derived neural models can support research into neurological disease and drug effects.",
    },
    {
      summary:
        "To become a muscle cell, the cell activates gene programs for contraction and protein-filament organization.",
      signal: "Growth and movement programs",
      role: "Contraction and force generation",
      note: "In living tissue, fiber alignment, nerve input, and blood supply also matter.",
      stages: [
        {
          name: "Pluripotent cell",
          body: "The cell can still take multiple specialized routes. Here the priority is keeping a high-quality source ready for controlled guidance.",
          focus: "Open, guidable source",
        },
        {
          name: "Muscle progenitor",
          body: "Contraction-related programs begin and the cell moves toward a muscle identity, but it is not yet a mature fiber with aligned filaments.",
          focus: "Starting the contractile path",
        },
        {
          name: "Muscle fiber",
          body: "Contractile proteins arrange into orderly filaments and force capacity rises. True maturity is judged by contraction and response to stimulation.",
          focus: "Filament structure and force",
        },
      ],
      checkpoint: "Activation of contraction genes and alignment of protein filaments are monitored.",
      research: "Beyond appearance, researchers measure contraction and fiber maturation.",
      mechanism: "The cell makes more contractile proteins and arranges their filaments in an orderly pattern.",
      importance: "These models are useful for studying muscle disorders and drug toxicity.",
    },
    {
      summary:
        "Blood formation is not a single route: blood progenitors can become cells with different roles, such as oxygen transport or immune defense.",
      signal: "Blood-forming cues and niche",
      role: "Oxygen transport or defense",
      note: "For treatment, the exact cell type and its growth behavior must be controlled carefully.",
      stages: [
        {
          name: "Pluripotent cell",
          body: "Several blood lineages remain possible. Careful signal control at this point helps prevent unwanted populations.",
          focus: "Multiple blood options remain open",
        },
        {
          name: "Blood progenitor",
          body: "The cell responds to blood-forming niches and leans toward routes such as red cells or immune cells, without full final commitment.",
          focus: "Branch choice guided by cues",
        },
        {
          name: "Specialized blood cell",
          body: "Final identity stabilizes and a clear role—oxygen transport or defense—emerges. Population purity and growth stability matter here.",
          focus: "Final identity and specialized role",
        },
      ],
      checkpoint: "The exact cell identity, growth capacity, and absence of unwanted populations are checked.",
      research: "Blood-forming models help researchers study drug effects and genetic disorders.",
      mechanism: "A blood progenitor responds to its local niche and activates different sets of genes.",
      importance: "These models can support research into anemia and blood disorders.",
    },
    {
      summary:
        "The liver route often begins with endoderm-like stages. By changing signals step by step, a cell gains features needed for metabolism and detoxification.",
      signal: "Stage-specific liver cues",
      role: "Metabolism and detoxification",
      note: "For real function, the cell must coordinate with liver structure and blood flow.",
      stages: [
        {
          name: "Pluripotent cell",
          body: "Several endoderm and non-endoderm routes remain open. Staged cues begin guiding the cell from this point.",
          focus: "Readiness for an endoderm route",
        },
        {
          name: "Endoderm progenitor",
          body: "The cell gains endoderm-like traits and moves closer to liver-related paths, without yet becoming a mature liver-like cell.",
          focus: "Endoderm commitment",
        },
        {
          name: "Liver-like cell",
          body: "Metabolism- and detoxification-related enzymes and proteins become active. Researchers must measure functional maturity, not appearance alone.",
          focus: "Metabolism and detoxification",
        },
      ],
      checkpoint: "Metabolic activity and liver-protein production are measured across stages.",
      research: "These models can help study drug toxicity and liver disease.",
      mechanism: "The cell first gains endoderm-like traits, then turns on liver enzymes and proteins.",
      importance: "Liver-like cells are particularly useful for drug-safety studies.",
    },
  ],
};

const challenges = {
  fa: [
    ["کنترل تمایز", "باید سلول هدف را به‌طور قابل اعتماد تولید کرد و سلول‌های ناخواسته را به حداقل رساند.", "تغییر کوچک در پیام‌های محیطی می‌تواند مسیر سلول را عوض کند.", "برای ارزیابی، نشانگرهای هویتی، درصد خلوص و رفتار سلول بررسی می‌شود."],
    ["ایمنی و رد پیوند", "سیستم ایمنی ممکن است سلول‌های پیوندشده را بیگانه بداند.", "سازگاری ایمنی و پایش طولانی‌مدت بخشی از مسیر ارزیابی است.", "منبع سلول و وضعیت گیرنده می‌توانند پاسخ ایمنی را تغییر دهند."],
    ["خطر تومورزایی", "سلول‌های پرتوان باقی‌مانده می‌توانند خطر ایجاد تومور داشته باشند.", "خالص‌سازی و کنترل کیفیت برای کاهش این خطر لازم‌اند.", "پایداری ژنتیکی و رفتار پس از انتقال باید بررسی شود."],
    ["بقا و ادغام", "سلول‌های منتقل‌شده باید زنده بمانند و با بافت اطراف ارتباط برقرار کنند.", "رسیدن به بافت فقط آغاز پرسش است؛ عملکرد پایدار اهمیت دارد.", "خون‌رسانی و پیام‌های بافتی تعیین می‌کنند اثر کوتاه‌مدت بماند یا پایدار شود."],
    ["مقیاس‌پذیری و کیفیت", "تولید باید استریل، قابل تکرار و از یک دسته به دسته‌ی دیگر سازگار باشد.", "آنچه در آزمایش کوچک کار می‌کند لزوماً در مقیاس درمانی پایدار نیست.", "مستندسازی و آزمون آزادسازی برای هر دسته ضروری است."],
    ["شواهد بالینی و اخلاق", "نتیجه‌ی آزمایشگاهی با درمان اثبات‌شده یکی نیست.", "اعتماد علمی با شفافیت و پیگیری طولانی‌مدت ساخته می‌شود.", "فایده باید از خطرها بیشتر باشد؛ پاسخ از داده‌ی انسانی می‌آید."],
  ],
  en: [
    ["Controlled differentiation", "Researchers must reliably produce the intended cell type and minimize unwanted cells.", "Small changes in signals can redirect a cell, so control matters.", "Identity markers, purity, and behavior are checked across stages."],
    ["Immunity and rejection", "The immune system may attack transplanted cells.", "Immune compatibility and long-term monitoring are part of translation.", "Cell source and the recipient’s biology can change the immune response."],
    ["Tumor risk", "Remaining pluripotent or abnormal cells may create a tumor risk.", "Purification and quality control are essential.", "Genetic stability and post-transplant behavior must be assessed."],
    ["Survival and integration", "Transplanted cells must survive and connect with surrounding tissue.", "Reaching a tissue is only the beginning; durable function matters.", "Blood supply and tissue cues help determine whether an effect becomes stable."],
    ["Scale and quality", "Manufacturing must be sterile, reproducible, and consistent across batches.", "What works in a small experiment may not remain stable at clinical scale.", "Documentation and release testing are needed for every batch."],
    ["Clinical evidence and ethics", "A promising laboratory result is not a proven treatment.", "Scientific trust is built through transparency and follow-up.", "Potential benefit must outweigh risk, based on human data."],
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
  return (
    <div className="section-tag">
      <img src={ASSETS.mark} alt="" width={16} height={16} />
      <span>{n}</span>
      <i />
      {label}
    </div>
  );
}

function AppHeader({
  lang,
  setLang,
  theme,
  toggleTheme,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <header className="topbar">
      <a
        href="#top"
        className={`brand ${lang === "fa" ? "brand-fa" : "brand-en"}`}
        aria-label={lang === "fa" ? "خانه روایت سلول" : "Cell Story home"}
      >
        <img src={ASSETS.mark} alt="" width={40} height={40} />
        <span>
          {lang === "fa" ? (
            <>
              <b>روایت</b>
              <br />
              سلول
            </>
          ) : (
            <>
              cell
              <br />
              <b>story</b>
            </>
          )}
        </span>
      </a>
      <div className="topbar-actions">
        <button className="control-pill" onClick={() => setLang(lang === "fa" ? "en" : "fa")} aria-label="Change language">
          <Globe2 size={15} />
          <span>{lang === "fa" ? "English" : "فارسی"}</span>
        </button>
        <button
          className="icon-control"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("cell-story-lang") as Lang) || "fa");
  const { theme, toggleTheme } = useTheme();
  const [selectedFate, setSelectedFate] = useState(0);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [deep, setDeep] = useState(false);
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [openChallenge, setOpenChallenge] = useState<number | null>(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const t = copy[lang];
  const direction = lang === "fa" ? "rtl" : "ltr";
  const fade = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-12% 0px" },
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  useEffect(() => {
    localStorage.setItem("cell-story-lang", lang);
    document.documentElement.lang = lang === "fa" ? "fa" : "en";
    document.documentElement.dir = direction;
    setSelectedStage(null);
  }, [lang, direction]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });

  const timelineLabels = [t.simple, t.signals, t.genes, t.precursor, t.specialized];
  const timelineDetails =
    lang === "fa"
      ? [
          { title: "پتانسیل باز", body: "سلول هنوز چند مسیر تخصصی را پیش روی خود دارد و می‌تواند با حفظ توان پرتوانی، نسخه‌های بیشتری از خود بسازد.", cue: "هنوز چند امکان هم‌زمان باز است." },
          { title: "پیام‌های محیطی", body: "مولکول‌های پیام‌رسان، تماس با سلول‌های اطراف و ماتریکس بافتی مسیر را جهت می‌دهند.", cue: "محیط، انتخاب‌ها را جهت می‌دهد." },
          { title: "برنامه‌ی ژنی", body: "برخی ژن‌ها فعال و برخی خاموش می‌شوند و هویت آینده‌ی سلول را شکل می‌دهند.", cue: "هویت تازه از درون سلول ساخته می‌شود." },
          { title: "سلول پیش‌ساز", body: "سلول وارد مرحله‌ی میانی می‌شود؛ انعطاف کمتر، اما مسیر مشخص‌تر.", cue: "مسیر محدودتر، اما مشخص‌تر می‌شود." },
          { title: "سلول تخصصی", body: "ساختار و عملکرد با نقش نهایی هم‌راستا می‌شوند.", cue: "هویت، ساختار و عملکرد هم‌راستا می‌شوند." },
        ]
      : [
          { title: "Open potential", body: "The cell still has several possible specialized routes and can keep renewing itself.", cue: "Several possibilities remain open." },
          { title: "Environmental signals", body: "Molecules, neighboring cells, and the tissue matrix help steer the route.", cue: "Context gives the choice a direction." },
          { title: "Gene program", body: "Some genes switch on while others switch off, shaping future identity.", cue: "A new identity is built from within." },
          { title: "Progenitor cell", body: "An intermediate stage: less flexible, but clearer in direction.", cue: "The route narrows and becomes clearer." },
          { title: "Specialized cell", body: "Structure and function align with the final role.", cue: "Identity, structure, and function align." },
        ];

  return (
    <div id="top" className="site-shell" dir={direction}>
      <AppHeader lang={lang} setLang={setLang} theme={theme} toggleTheme={() => toggleTheme?.()} />
      <main>
        <section className="hero">
          <img
            className="hero-media"
            src={ASSETS.hero}
            alt={lang === "fa" ? "کلونی سلول بنیادی زیر میکروسکوپ" : "Stem cell colony under the microscope"}
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-veil" />
          <div className="hero-copy">
            <p className="brand-signal">
              <img src={ASSETS.mark} alt="" width={28} height={28} />
              {lang === "fa" ? "روایت سلول" : "Cell Story"}
            </p>
            <h1>
              {t.title.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="hero-subtitle">{t.subtitle}</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollTo("one")}>
                {t.begin}
                <ArrowDown size={16} />
              </button>
              <button className="btn-quiet" onClick={() => scrollTo("differentiation")}>
                {t.journey}
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section id="one" className="story-section">
          <motion.div className="wide-inner stem-flow" {...fade}>
            <header className="stem-head">
              <SectionTag n="01" label={t.question} />
              <h2>{t.stemTitle}</h2>
              <p className="lead">{t.stemIntro}</p>
              <p className="stem-body">{t.stemBody}</p>
            </header>

            <div className="ability-list ability-row">
              <div>
                <strong>01</strong>
                <div>
                  <h3>{t.selfRenew}</h3>
                  <p>{t.selfRenewBody}</p>
                </div>
              </div>
              <div>
                <strong>02</strong>
                <div>
                  <h3>{t.differentiate}</h3>
                  <p>{t.differentiateBody}</p>
                </div>
              </div>
            </div>

            <button className="text-button" onClick={() => setDeep(!deep)}>
              {deep ? t.simpleMode : t.deepMode}
              <ChevronDown size={15} className={deep ? "rotate-180" : ""} />
            </button>
            {deep && (
              <div className="deep-note">
                {lang === "fa"
                  ? "تمایز به زمینه وابسته است: پیام‌های مولکولی، تماس با سلول‌های همسایه، ماتریکس بافت و تنظیم بیان ژن‌ها همگی در تعیین سرنوشت سلول نقش دارند."
                  : "Differentiation is context-dependent: molecular signals, neighboring cells, the tissue matrix, and gene regulation all influence cell fate."}
              </div>
            )}

            <div className="fate-block">
              <div className="fate-block-label">
                <span>{t.choose}</span>
                <small>{lang === "fa" ? "از خودنوزایی تا سرنوشت سلولی" : "Self-renewal → fate"}</small>
              </div>
              <div className="fate-visual">
                <img src={ASSETS.differentiation} alt="" loading="lazy" decoding="async" width={1400} height={1050} />
                <div className="fate-core">
                  <span>{lang === "fa" ? "بنیادی" : "stem"}</span>
                </div>
                {fates[lang].map((f, i) => (
                  <button
                    key={f}
                    className={`fate-node fate-${i + 1} ${selectedFate === i ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedFate(i);
                      setSelectedStage(null);
                    }}
                  >
                    <span className="node-dot" />
                    <b>{f}</b>
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFate + lang}
                  className="fate-detail"
                  initial={reduced ? {} : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="fate-detail-head">
                    <b>{fates[lang][selectedFate]}</b>
                  </div>
                  <p>{fateDetails[lang][selectedFate].summary}</p>
                  <div className="fate-detail-grid">
                    <div>
                      <span>{lang === "fa" ? "راهنما" : "Guidance"}</span>
                      <b>{fateDetails[lang][selectedFate].signal}</b>
                    </div>
                    <div>
                      <span>{lang === "fa" ? "کارکرد" : "Function"}</span>
                      <b>{fateDetails[lang][selectedFate].role}</b>
                    </div>
                  </div>
                  <div className="fate-stage-flow">
                    {fateDetails[lang][selectedFate].stages.map((stage, i) => (
                      <button
                        key={stage.name}
                        type="button"
                        className={`fate-stage ${selectedStage === i ? "open" : ""}`}
                        aria-expanded={selectedStage === i}
                        onClick={() => setSelectedStage(selectedStage === i ? null : i)}
                      >
                        <i>{i + 1}</i>
                        <b>{stage.name}</b>
                        <ChevronDown size={14} className={selectedStage === i ? "rotate-180" : ""} />
                      </button>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    {selectedStage !== null && (
                      <motion.div
                        key={`${selectedFate}-${selectedStage}-${lang}`}
                        className="stage-explain"
                        initial={reduced ? {} : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={reduced ? undefined : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.24 }}
                      >
                        <div className="stage-explain-inner">
                          <span>
                            {lang === "fa" ? "ایستگاه" : "Station"} 0{selectedStage + 1}
                          </span>
                          <h4>{fateDetails[lang][selectedFate].stages[selectedStage].name}</h4>
                          <p>{fateDetails[lang][selectedFate].stages[selectedStage].body}</p>
                          <div className="stage-focus">
                            <small>{lang === "fa" ? "تمرکز پژوهشی" : "Research focus"}</small>
                            <b>{fateDetails[lang][selectedFate].stages[selectedStage].focus}</b>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <p className="fate-detail-note">{fateDetails[lang][selectedFate].note}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        <section id="differentiation" className="timeline-section">
          <div className="wide-inner">
            <SectionTag n="02" label={lang === "fa" ? "مسیر تمایز" : "Differentiation path"} />
            <div className="timeline-intro">
              <div>
                <h2>{lang === "fa" ? "هویت سلول، یک تصمیم لحظه‌ای نیست." : "Cell identity is not a single moment."}</h2>
                <p>
                  {lang === "fa"
                    ? "محیط، پیام‌ها و برنامه‌های ژنی در طول زمان با هم کار می‌کنند تا یک سلول را تخصصی کنند."
                    : "Environment, signals, and gene programs work together over time to specialize a cell."}
                </p>
              </div>
              <div className="timeline-signal">
                <span>{lang === "fa" ? "سیگنال زنده" : "Live signal"}</span>
                <b>{timelineDetails[timelineIndex].cue}</b>
              </div>
            </div>
            <div className="timeline">
              <div className="timeline-line" />
              {timelineLabels.map((label, i) => (
                <button
                  key={label}
                  className={`timeline-step ${i === timelineIndex ? "selected" : ""}`}
                  onClick={() => setTimelineIndex(i)}
                  aria-pressed={i === timelineIndex}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <i />
                  <b>{label}</b>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={timelineIndex + lang}
                className="timeline-detail"
                initial={reduced ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                <div className="timeline-detail-index">0{timelineIndex + 1}</div>
                <div>
                  <h3>{timelineDetails[timelineIndex].title}</h3>
                  <p>{timelineDetails[timelineIndex].body}</p>
                </div>
                <button onClick={() => setTimelineIndex((timelineIndex + 1) % timelineLabels.length)}>
                  {lang === "fa" ? "ایستگاه بعدی" : "Next station"}
                  <ArrowUpRight size={15} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section id="two" className="challenges-section">
          <div className="wide-inner">
            <motion.div {...fade}>
              <SectionTag n="03" label={t.question} />
              <h2>{t.challengeTitle}</h2>
              <p className="lead">{t.challengeIntro}</p>
            </motion.div>
            <div className="challenge-layout">
              <div className="challenge-list">
                {challenges[lang].map((c, i) => (
                  <button
                    key={c[0]}
                    className={`challenge-row ${openChallenge === i ? "open" : ""}`}
                    onClick={() => setOpenChallenge(openChallenge === i ? null : i)}
                  >
                    <span className="challenge-number">0{i + 1}</span>
                    <span className="challenge-copy">
                      <b>{c[0]}</b>
                      <span>{c[1]}</span>
                      {openChallenge === i && (
                        <>
                          <em>{c[2]}</em>
                          <small>{c[3]}</small>
                        </>
                      )}
                    </span>
                    <ChevronDown size={18} />
                  </button>
                ))}
              </div>
              <div className="challenge-visual">
                <img
                  src={ASSETS.tissue}
                  alt={lang === "fa" ? "محیط بافتی در پزشکی بازساختی" : "Tissue environment in regenerative medicine"}
                  loading="lazy"
                  decoding="async"
                  width={1400}
                  height={1050}
                />
              </div>
            </div>
            <div className="evidence-strip">
              <h3>{t.gapTitle}</h3>
              <div className="evidence-track">
                {(lang === "fa"
                  ? [
                      [t.lab, "ایده و امکان"],
                      [t.preclinical, "آزمون و ایمنی"],
                      [t.validated, "شواهد انسانی"],
                    ]
                  : [
                      [t.lab, "Idea and possibility"],
                      [t.preclinical, "Testing and safety"],
                      [t.validated, "Human evidence"],
                    ]
                ).map(([label, note], i) => (
                  <div key={label} className="evidence-stage">
                    <span>0{i + 1}</span>
                    <b>{label}</b>
                    <small>{note}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="three" className="ips-section">
          <div className="section-grid">
            <motion.div className="ips-visual" {...fade}>
              <img
                src={ASSETS.ips}
                alt={lang === "fa" ? "بازبرنامه‌ریزی سلول بالغ به سلول iPS" : "Reprogramming a mature cell into an iPS cell"}
                loading="lazy"
                decoding="async"
                width={1400}
                height={1050}
              />
            </motion.div>
            <motion.div className="ips-copy" {...fade}>
              <SectionTag n="04" label={t.question} />
              <h2>{t.ipsTitle}</h2>
              <p className="lead">{t.ipsIntro}</p>
              <p>{t.ipsBody}</p>
              <div className="ips-path">
                {(lang === "fa"
                  ? ["سلول پوستی بالغ", "بازبرنامه‌ریزی", "سلول iPS", "تمایز هدایت‌شده"]
                  : ["Mature skin cell", "Reprogramming", "iPS cell", "Directed differentiation"]
                ).map((x, i, arr) => (
                  <div key={x}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <b>{x}</b>
                    {i < arr.length - 1 && <i>→</i>}
                  </div>
                ))}
              </div>
              <div className="why-box">
                <h3>{t.why}</h3>
                <p>{t.whyBody}</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="quiz-section">
          <div className="quiz-inner">
            <SectionTag n="05" label={lang === "fa" ? "ایستگاه یادگیری" : "Learning checkpoint"} />
            <div className="quiz-heading">
              <h2>{t.quizTitle}</h2>
              <p>{t.quizIntro}</p>
            </div>
            <div className="quiz-card">
              <div className="quiz-meta">
                <span>
                  {String(quizIndex + 1).padStart(2, "0")} / 03
                </span>
                <div className="quiz-progress">
                  <i style={{ width: `${((quizIndex + 1) / 3) * 100}%` }} />
                </div>
              </div>
              <h3>{quiz[lang][quizIndex].q}</h3>
              <div className="quiz-options">
                {quiz[lang][quizIndex].options.map((option, i) => (
                  <button
                    key={option}
                    className={
                      selectedAnswer === i ? (i === quiz[lang][quizIndex].answer ? "right" : "wrong") : ""
                    }
                    onClick={() => setSelectedAnswer(i)}
                  >
                    <span>{String.fromCharCode(65 + i)}</span>
                    {option}
                    {selectedAnswer === i &&
                      (i === quiz[lang][quizIndex].answer ? <Check size={17} /> : <X size={17} />)}
                  </button>
                ))}
              </div>
              {selectedAnswer !== null && (
                <p className={`feedback ${selectedAnswer === quiz[lang][quizIndex].answer ? "good" : ""}`}>
                  {selectedAnswer === quiz[lang][quizIndex].answer ? t.correct : t.almost}{" "}
                  {quiz[lang][quizIndex].explain}
                </p>
              )}
              <button
                className="btn-primary"
                disabled={selectedAnswer === null}
                onClick={() => {
                  if (quizIndex < 2) {
                    setQuizIndex(quizIndex + 1);
                    setSelectedAnswer(null);
                  } else scrollTo("footer");
                }}
              >
                {quizIndex === 2 ? t.finish : t.next}
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <footer id="footer" className="footer">
          <div className="footer-top">
            <div>
              <img src={ASSETS.mark} alt="" className="footer-mark" width={42} height={42} />
              <h2>{t.closing}</h2>
            </div>
            <div className="source-list">
              <h3>{t.sources}</h3>
              <a href="https://www.isscr.org/treatment-guide" target="_blank" rel="noreferrer">
                ISSCR Guide to Stem Cell Treatments <ArrowUpRight size={13} />
              </a>
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4287204/" target="_blank" rel="noreferrer">
                Induced Pluripotent Stem Cells for Regenerative Medicine <ArrowUpRight size={13} />
              </a>
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6873767/" target="_blank" rel="noreferrer">
                Research and therapy with iPS cells <ArrowUpRight size={13} />
              </a>
              <a href="https://www.isscr.org/guidelines" target="_blank" rel="noreferrer">
                ISSCR Guidelines <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 CELL STORY</span>
            <span>{t.footer}</span>
            <button onClick={() => scrollTo("top")} aria-label="Back to top">
              <ArrowUp size={16} />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
