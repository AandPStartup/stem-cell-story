import { useEffect, useRef, useState, type ElementType } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpRight, ChevronDown, Globe2, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import QuizExam from "@/components/QuizExam";
import FadeCarousel from "@/components/FadeCarousel";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const ASSETS = {
  hero: asset("images/hero-stem-cell.jpg"),
  differentiation: asset("images/differentiation-pathways.jpg"),
  ips: asset("images/ips-reprogramming.jpg"),
  ipsFactors: asset("images/ips-factors.jpg"),
  ipsModeling: asset("images/ips-modeling.jpg"),
  ipsDirected: asset("images/ips-directed.jpg"),
  tissue: asset("images/tissue-regeneration.jpg"),
  challengeIntegration: asset("images/challenge-integration.jpg"),
  challengeImmunity: asset("images/challenge-immunity.jpg"),
  challengePurity: asset("images/challenge-purity.jpg"),
  challengeTumor: asset("images/challenge-tumor-risk.jpg"),
  challengeScale: asset("images/challenge-scale.jpg"),
  evidenceLab: asset("images/evidence-lab.jpg"),
  evidencePreclinical: asset("images/evidence-preclinical.jpg"),
  evidenceClinical: asset("images/evidence-clinical.jpg"),
  mark: asset("images/cell-mark.jpg"),
};

type Lang = "fa" | "en";

const copy = {
  fa: {
    eyebrow: "راهنمای تعاملی سلول‌های بنیادی",
    title: "سفری به گذشته یک سلول",
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
    gapIntro:
      "هر ایده‌ی سلولی باید از سه ایستگاه عبور کند: امکان آزمایشگاهی، شواهد ایمنی پیش‌بالینی، و تأیید انسانی. پرش از این مسیر، امید را به ادعا تبدیل می‌کند نه درمان.",
    lab: "امید آزمایشگاهی",
    preclinical: "شواهد پیش‌بالینی",
    validated: "درمان تأییدشده",
    gapNoteTitle: "نکته‌ی کلیدی مسیر ترجمه",
    gapNote:
      "بیشتر شکست‌ها در همین فاصله رخ می‌دهد: سلول در ظرف کشت خوب کار می‌کند، اما در بدن بیمار باید زنده بماند، ایمن باشد، ادغام شود و اثر پایدار نشان دهد.",
    ipsTitle: "وقتی یک سلول بالغ، فرصت بازگشت پیدا می‌کند",
    ipsIntro: "iPSها انعطاف‌پذیری را به سلول‌های انسانی بازمی‌گردانند.",
    ipsBody:
      "پژوهشگران می‌توانند یک سلول بالغ، مانند سلول پوست، را به حالت پرتوان القایی بازبرنامه‌ریزی کنند؛ سپس آن را برای ساخت مدل بیماری، آزمون دارو و پژوهش درباره‌ی سلول‌های جایگزین هدایت کنند.",
    ipsHowTitle: "بازبرنامه‌ریزی چگونه کار می‌کند؟",
    ipsHowIntro: "ایده‌ی اصلی ساده است: چند فاکتور کلیدی، برنامه‌ی ژنی سلول بالغ را به حالت پرتوان بازمی‌گردانند.",
    ipsUsesTitle: "iPSها چه کارهایی می‌کنند؟",
    ipsUsesIntro: "کاربردشان بیش از یک تصویر آزمایشگاهی است؛ سه مسیر پژوهشی اصلی دارند.",
    why: "چرا مهم است؟",
    whyBody:
      "کار بهاروند و همکارانش در مسیر تثبیت و پیشبرد پژوهش سلول‌های iPS انسانی در ایران از این نظر اهمیت داشت که این کار نشان داد می‌توان از سلول‌های بالغ انسانی به یک منبع انعطاف‌پذیر برای مطالعه و تمایز سلولی رسید. این دستاورد یک امکان پژوهشی و درمانی ساخت، نه یک درمان تضمین‌شده.",
    quizTitle: "می خواهی خودتو امتحان کنی؟",
    quizIntro: "هشت پرسش تصادفی از موضوعات این روایت؛ در پایان نتیجه و تحلیل کوتاه می‌بینی.",
    sources: "منابع و مسیر مطالعه",
    closing: "علم فقط پاسخ نیست؛ راهی است برای پرسیدن بهتر، آزمودن دقیق‌تر و امید بستن مسئولانه.",
    footer: "یک روایت تعاملی برای فهم بهتر زیست‌شناسی سلول‌های بنیادی",
    createdByPrefix: "ساخته‌شده توسط",
    createdByAnd: "و",
    nameArshia: "عرشیا فراهانی",
    nameParsa: "پارسا خسروانی",
    correct: "آفرین؛ دلیلش این است:",
    almost: "نزدیک بود؛ نکته‌ی مهم این است:",
    simpleMode: "ساده",
    deepMode: "عمیق‌تر",
  },
  en: {
    eyebrow: "An interactive field guide to stem cells",
    title: "A journey into a cell’s past",
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
    gapIntro:
      "Every cell idea must pass three stations: lab possibility, preclinical safety evidence, and human validation. Skipping that path turns hope into a claim, not a therapy.",
    lab: "Laboratory promise",
    preclinical: "Preclinical evidence",
    validated: "Validated treatment",
    gapNoteTitle: "Key translation insight",
    gapNote:
      "Most failures happen in this gap: a cell works in culture, but in a patient it must survive, stay safe, integrate, and show durable benefit.",
    ipsTitle: "When a mature cell gets a chance to return",
    ipsIntro: "iPS cells return flexibility to human cells.",
    ipsBody:
      "Researchers can reprogram a mature cell, such as a skin cell, into an induced pluripotent state, then guide it toward disease models, drug testing, and research on replacement cells.",
    ipsHowTitle: "How does reprogramming work?",
    ipsHowIntro: "The core idea is clear: a few key factors reset an adult cell’s gene program toward pluripotency.",
    ipsUsesTitle: "What do iPS cells do?",
    ipsUsesIntro: "Their value goes beyond a lab image; three research routes stand out.",
    why: "Why it matters",
    whyBody:
      "Baharvand and colleagues’ work helped establish and advance human iPS-cell research in Iran. It showed the value of turning accessible adult cells into a flexible resource for studying and directing cell fate. That created a research and therapeutic possibility—not a guaranteed treatment.",
    quizTitle: "Want to test yourself?",
    quizIntro: "Eight randomized questions from this story; see your score and a short insight at the end.",
    sources: "Sources for further reading",
    closing: "Science is not only about answers; it is a way to ask better questions, test more carefully, and hope responsibly.",
    footer: "An interactive story for understanding stem-cell biology",
    createdByPrefix: "Created by",
    createdByAnd: "and",
    nameArshia: "Arshia Farahani",
    nameParsa: "Parsa Khosravani",
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
    {
      title: "کنترل تمایز",
      summary: "باید سلول هدف را به‌طور قابل اعتماد تولید کرد و سلول‌های ناخواسته را به حداقل رساند.",
      why: "چرا این دروازه مهم است؟",
      whyBody: "تمایز یک مسیر خطی ساده نیست. پیام‌های مولکولی، زمان‌بندی، تراکم سلولی و ترکیب محیط کشت می‌توانند خروجی را عوض کنند.",
      mechanism: "درون سلول چه رخ می‌دهد؟",
      mechanismBody: "شبکه‌های ژنی رقیب برای هویت‌های مختلف فعال می‌شوند. اگر کنترل ناقص باشد، مخلوطی از سلول‌های درست و نادرست شکل می‌گیرد.",
      checksTitle: "چه چیزهایی باید سنجیده شود؟",
      checks: [
        "نشانگرهای هویت سلول هدف و نبود نشانگرهای ناخواسته",
        "درصد خلوص جمعیت نهایی",
        "پایداری فنوتیپ در چند نقطه زمانی",
        "آزمون عملکرد مرتبط با نقش زیستی هدف",
      ],
      takeaway: "یک تصویر زیبا کافی نیست؛ کنترل تمایز یعنی تکرارپذیری + خلوص + عملکرد.",
    },
    {
      title: "ایمنی و رد پیوند",
      summary: "سیستم ایمنی ممکن است سلول‌های پیوندشده را بیگانه بداند.",
      why: "چرا این دروازه مهم است؟",
      whyBody: "حتی اگر سلول‌ها در ظرف آزمایشگاهی عالی کار کنند، بدن گیرنده ممکن است آن‌ها را مهاجم تشخیص دهد و حذف کند.",
      mechanism: "پاسخ ایمنی چگونه شکل می‌گیرد؟",
      mechanismBody: "مولکول‌های سطحی، منبع سلول (اتولوگ یا آلوژنیک)، التهاب موضعی و وضعیت ایمنی بیمار همگی شدت رد را تغییر می‌دهند.",
      checksTitle: "چه چیزهایی باید سنجیده شود؟",
      checks: [
        "سازگاری ایمنی میان سلول و گیرنده",
        "نیاز یا عدم نیاز به سرکوب ایمنی",
        "پایش طولانی‌مدت بقا و التهاب",
        "خطر واکنش‌های ایمنی پیش‌بینی‌نشده",
      ],
      takeaway: "منبع سلول و وضعیت گیرنده می‌توانند پاسخ ایمنی را تغییر دهند؛ بدون پایش، اثر کوتاه‌مدت گمراه‌کننده است.",
    },
    {
      title: "خطر تومورزایی",
      summary: "سلول‌های پرتوان باقی‌مانده می‌توانند خطر ایجاد تومور داشته باشند.",
      why: "چرا این دروازه مهم است؟",
      whyBody: "توان رشد و انعطاف سلول‌های پرتوان، همان ویژگی مفیدی است که اگر کنترل نشود به رشد ناخواسته منجر می‌شود.",
      mechanism: "ریشه خطر کجاست؟",
      mechanismBody: "باقی‌ماندن سلول‌های پرتوان، ناپایداری ژنتیکی، یا جمعیت‌های غیرطبیعی می‌توانند پس از انتقال رشد کنترل‌نشده ایجاد کنند.",
      checksTitle: "چه چیزهایی باید سنجیده شود؟",
      checks: [
        "حذف یا خالص‌سازی سلول‌های پرتوان ناخواسته",
        "آزمون‌های پایداری کروموزومی و ژنتیکی",
        "بررسی رفتار رشد پس از پیوند در مدل‌های ایمنی",
        "معیارهای آزادسازی محصول قبل از کاربرد انسانی",
      ],
      takeaway: "ایمنی یعنی لایه‌های متعدد کنترل؛ یک آزمون تکی جایگزین پایش چندمرحله‌ای نیست.",
    },
    {
      title: "بقا و ادغام",
      summary: "سلول‌های منتقل‌شده باید زنده بمانند و با بافت اطراف ارتباط برقرار کنند.",
      why: "چرا این دروازه مهم است؟",
      whyBody: "رساندن سلول به محل هدف فقط آغاز کار است. بدون بقا و اتصال عملکردی، اثر درمانی پایدار شکل نمی‌گیرد.",
      mechanism: "چه عواملی بقا را تعیین می‌کنند؟",
      mechanismBody: "خون‌رسانی، هیپوکسی، التهاب، پیام‌های ماتریکس و ارتباط با سلول‌های همسایه تعیین می‌کنند سلول فقط زنده بماند یا واقعاً ادغام شود.",
      checksTitle: "چه چیزهایی باید سنجیده شود؟",
      checks: [
        "نرخ بقای سلول پس از انتقال",
        "جایگیری درست در بافت هدف",
        "برقراری ارتباط ساختاری یا سیگنالی با محیط",
        "دوام عملکرد در بازه‌های زمانی طولانی‌تر",
      ],
      takeaway: "اثر کوتاه‌مدت با عملکرد پایدار یکی نیست؛ ادغام بافتی معیار اصلی است.",
    },
    {
      title: "مقیاس‌پذیری و کیفیت",
      summary: "تولید باید استریل، قابل تکرار و از یک دسته به دسته‌ی دیگر سازگار باشد.",
      why: "چرا این دروازه مهم است؟",
      whyBody: "موفقیت در مقیاس آزمایشگاهی کوچک لزوماً در تولید انبوه تکرار نمی‌شود؛ تغییر مواد، زمان و تجهیزات کیفیت را جابه‌جا می‌کند.",
      mechanism: "در مقیاس بزرگ چه عوض می‌شود؟",
      mechanismBody: "تفاوت بچه‌مواد اولیه، شرایط بیورآکتور، زمان کشت و مراحل انجماد می‌تواند خلوص و عملکرد را تغییر دهد.",
      checksTitle: "چه چیزهایی باید سنجیده شود؟",
      checks: [
        "استانداردسازی پروتکل تولید",
        "مستندسازی کامل هر دسته",
        "آزمون آزادسازی هویت، خلوص و ایمنی",
        "پایداری محصول در نگهداری و حمل",
      ],
      takeaway: "درمان قابل اعتماد به تولید قابل ردیابی نیاز دارد، نه فقط یک آزمایش موفق.",
    },
    {
      title: "شواهد بالینی و اخلاق",
      summary: "نتیجه‌ی آزمایشگاهی با درمان اثبات‌شده یکی نیست.",
      why: "چرا این دروازه مهم است؟",
      whyBody: "امید علمی باید از مسیر کارآزمایی، رضایت آگاهانه، نظارت مستقل و گزارش شفاف عبور کند تا به اعتماد عمومی برسد.",
      mechanism: "چه پرسشی باید پاسخ داده شود؟",
      mechanismBody: "آیا فایده‌ی احتمالی از خطرها بیشتر است؟ پاسخ فقط با داده‌ی انسانی، معیارهای ازپیش‌تعیین‌شده و پیگیری بلندمدت معتبر می‌شود.",
      checksTitle: "چه چیزهایی باید سنجیده شود؟",
      checks: [
        "طراحی کارآزمایی با پیامدهای مشخص",
        "فرآیند رضایت آگاهانه و حمایت از شرکت‌کننده",
        "نظارت اخلاقی و گزارش عوارض",
        "شفافیت نتایج مثبت و منفی",
      ],
      takeaway: "اعتماد علمی با شفافیت ساخته می‌شود؛ ادعا بدون شواهد، ترجمه‌ی مسئولانه نیست.",
    },
  ],
  en: [
    {
      title: "Controlled differentiation",
      summary: "Researchers must reliably produce the intended cell type and minimize unwanted cells.",
      why: "Why this gate matters",
      whyBody: "Differentiation is not a simple straight line. Molecular cues, timing, density, and media composition can change the outcome.",
      mechanism: "What happens inside the process?",
      mechanismBody: "Competing gene networks for different identities become active. Incomplete control yields a mix of desired and undesired cells.",
      checksTitle: "What must be measured?",
      checks: [
        "Identity markers for the target cell and absence of unwanted markers",
        "Final population purity",
        "Phenotype stability across timepoints",
        "Functional assays linked to the intended biological role",
      ],
      takeaway: "A beautiful image is not enough; control means reproducibility + purity + function.",
    },
    {
      title: "Immunity and rejection",
      summary: "The immune system may attack transplanted cells.",
      why: "Why this gate matters",
      whyBody: "Even excellent lab-made cells can be recognized as foreign and cleared by the recipient’s immune system.",
      mechanism: "How does the immune response form?",
      mechanismBody: "Surface molecules, cell source (autologous vs allogeneic), local inflammation, and patient immune status all shape rejection risk.",
      checksTitle: "What must be measured?",
      checks: [
        "Immune compatibility between cells and recipient",
        "Need for immunosuppression or not",
        "Long-term monitoring of survival and inflammation",
        "Risk of unexpected immune reactions",
      ],
      takeaway: "Cell source and recipient biology can change immune response; without follow-up, short-term effects mislead.",
    },
    {
      title: "Tumor risk",
      summary: "Remaining pluripotent or abnormal cells may create a tumor risk.",
      why: "Why this gate matters",
      whyBody: "The same growth flexibility that makes pluripotent cells useful can become dangerous if leftover cells persist.",
      mechanism: "Where does the risk come from?",
      mechanismBody: "Residual pluripotent cells, genetic instability, or abnormal populations can grow uncontrollably after transfer.",
      checksTitle: "What must be measured?",
      checks: [
        "Removal or purification of unwanted pluripotent cells",
        "Chromosomal and genetic stability tests",
        "Post-transplant growth behavior in safety models",
        "Product release criteria before human use",
      ],
      takeaway: "Safety needs layered checks; one test cannot replace multi-step monitoring.",
    },
    {
      title: "Survival and integration",
      summary: "Transplanted cells must survive and connect with surrounding tissue.",
      why: "Why this gate matters",
      whyBody: "Delivering cells to a target site is only the start. Without survival and functional connection, durable benefit does not form.",
      mechanism: "What determines survival?",
      mechanismBody: "Blood supply, hypoxia, inflammation, matrix cues, and neighbor-cell contact decide whether cells merely persist or truly integrate.",
      checksTitle: "What must be measured?",
      checks: [
        "Post-transfer cell survival rate",
        "Correct localization in target tissue",
        "Structural or signaling connection with the niche",
        "Durable function over longer time windows",
      ],
      takeaway: "A short-lived effect is not durable function; tissue integration is the key criterion.",
    },
    {
      title: "Scale and quality",
      summary: "Manufacturing must be sterile, reproducible, and consistent across batches.",
      why: "Why this gate matters",
      whyBody: "Success in a small lab culture does not automatically scale; materials, timing, and equipment introduce variation.",
      mechanism: "What changes at larger scale?",
      mechanismBody: "Lot-to-lot materials, bioreactor conditions, culture duration, and freezing steps can alter purity and performance.",
      checksTitle: "What must be measured?",
      checks: [
        "Standardized manufacturing protocols",
        "Full documentation for every batch",
        "Release testing for identity, purity, and safety",
        "Product stability during storage and transport",
      ],
      takeaway: "Trusted treatment needs traceable production, not only one successful experiment.",
    },
    {
      title: "Clinical evidence and ethics",
      summary: "A promising laboratory result is not a proven treatment.",
      why: "Why this gate matters",
      whyBody: "Scientific hope must pass through trials, informed consent, independent oversight, and transparent reporting to earn public trust.",
      mechanism: "What question must be answered?",
      mechanismBody: "Does likely benefit outweigh risk? That answer is credible only with human data, predefined endpoints, and long-term follow-up.",
      checksTitle: "What must be measured?",
      checks: [
        "Trial design with clear outcomes",
        "Informed-consent process and participant protection",
        "Ethical oversight and adverse-event reporting",
        "Transparency for both positive and negative results",
      ],
      takeaway: "Scientific trust is built through transparency; claims without evidence are not responsible translation.",
    },
  ],
};

const evidenceStages = {
  fa: [
    {
      title: "امید آزمایشگاهی",
      focus: "ایده و امکان",
      body: "در این مرحله پژوهشگر نشان می‌دهد که ساخت یا هدایت سلول هدف از نظر زیستی ممکن است: نشانگرهای هویت، شکل کلنی، و رفتار اولیه‌ی تمایز ثبت می‌شود.",
      checks: ["تعریف دقیق جمعیت سلولی", "اثبات خودنوزایی یا تمایز هدایت‌شده", "مستندسازی روش و تکرارپذیری"],
      img: ASSETS.evidenceLab,
      alt: "پژوهش آزمایشگاهی روی کشت سلول‌های بنیادی",
    },
    {
      title: "شواهد پیش‌بالینی",
      focus: "آزمون و ایمنی",
      body: "اینجا سؤال عوض می‌شود: آیا محصول در مدل‌های حیوانی یا سامانه‌های معادل، ایمن و تا حدی مؤثر است؟ خلوص، دوز، و ریسک رشد کنترل‌نشده بررسی می‌شود.",
      checks: ["آزمون سمیت و تومورزایی", "ارزیابی بقا و عملکرد در بافت هدف", "کنترل کیفیت ساخت و خلوص"],
      img: ASSETS.evidencePreclinical,
      alt: "آزمون‌های ایمنی و کیفیت پیش‌بالینی",
    },
    {
      title: "درمان تأییدشده",
      focus: "شواهد انسانی",
      body: "تنها پس از کارآزمایی‌های طراحی‌شده، پایش عوارض، و تأیید نظارتی می‌توان از درمان صحبت کرد؛ نه فقط از امید علمی یا تصویر آزمایشگاهی.",
      checks: ["کارآزمایی با نقاط پایانی مشخص", "پیگیری بلندمدت ایمنی و اثربخشی", "شفافیت نتایج مثبت و منفی"],
      img: ASSETS.evidenceClinical,
      alt: "مسیر بالینی و پزشکی بازساختی",
    },
  ],
  en: [
    {
      title: "Laboratory promise",
      focus: "Idea and possibility",
      body: "Researchers first show that making or guiding the target cell is biologically possible: identity markers, colony behavior, and early differentiation are documented.",
      checks: ["Define the cell population clearly", "Show self-renewal or directed differentiation", "Document methods and reproducibility"],
      img: ASSETS.evidenceLab,
      alt: "Laboratory research with stem-cell cultures",
    },
    {
      title: "Preclinical evidence",
      focus: "Testing and safety",
      body: "The question shifts: is the product reasonably safe and partly effective in animal or equivalent models? Purity, dose, and uncontrolled-growth risk are examined.",
      checks: ["Toxicity and tumorigenicity assays", "Survival and function in target tissue", "Manufacturing quality and purity controls"],
      img: ASSETS.evidencePreclinical,
      alt: "Preclinical safety and quality testing",
    },
    {
      title: "Validated treatment",
      focus: "Human evidence",
      body: "Only after designed trials, adverse-event monitoring, and regulatory approval can we speak of therapy—not merely of scientific hope or a lab image.",
      checks: ["Trials with predefined endpoints", "Long-term safety and efficacy follow-up", "Transparent positive and negative results"],
      img: ASSETS.evidenceClinical,
      alt: "Clinical regenerative-medicine pathway",
    },
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
        aria-label={lang === "fa" ? "خانه سفری به گذشته یک سلول" : "A journey into a cell’s past — home"}
      >
        <img src={ASSETS.mark} alt="" width={40} height={40} />
        <span>
          {lang === "fa" ? (
            <>
              <b>سفری به گذشته</b>
              <br />
              یک سلول
            </>
          ) : (
            <>
              a cell’s
              <br />
              <b>past</b>
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

function TypeFadeText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  speed = 34,
  showCaret = true,
  active = true,
  onDone,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  speed?: number;
  showCaret?: boolean;
  active?: boolean;
  onDone?: () => void;
}) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced || !active ? text.length : 0);
  const done = count >= text.length;
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    if (reduced) {
      setCount(text.length);
      onDoneRef.current?.();
      return;
    }

    setCount(0);
    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setCount(index);
        if (index >= text.length) {
          clearInterval(intervalId);
          onDoneRef.current?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay, speed, reduced, active]);

  return (
    <Tag className={className} aria-label={text}>
      {text.slice(0, count).split("").map((char, i) => (
        <span key={`${text}-${i}`} className="type-char">
          {char}
        </span>
      ))}
      {showCaret && active && !done && !reduced && <span className="type-caret" aria-hidden />}
    </Tag>
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
  const [heroPhase, setHeroPhase] = useState(1);
  const reduced = useReducedMotion();
  const t = copy[lang];
  const direction = lang === "fa" ? "rtl" : "ltr";
  const titleLines = t.title.split("\n");
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
    setHeroPhase(1);
  }, [lang, direction]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });

  const timelineLabels = [t.simple, t.signals, t.genes, t.precursor, t.specialized];
  const timelineDetails =
    lang === "fa"
      ? [
          {
            title: "پتانسیل باز",
            body: "در این ایستگاه، سلول هنوز هویت نهایی ندارد؛ هم می‌تواند خود را نوسازی کند و هم چند مسیر تمایز را باز نگه دارد.",
            cue: "هنوز چند امکان هم‌زمان باز است.",
            points: [
              "پرتوانی یعنی سلول می‌تواند به رده‌های سلولی متعددی وارد شود، نه فقط یک مسیر ثابت.",
              "خودنوزایی، ذخیره سلولی را حفظ می‌کند تا منبع پژوهش یا درمان تمام نشود.",
              "نشانگرهای پرتوانی و ریخت‌شناسی کلونی برای تأیید این مرحله ضروری‌اند.",
              "هر هدایت بعدی باید کنترل‌شده باشد؛ در غیر این صورت مسیرهای ناخواسته فعال می‌شوند.",
            ],
          },
          {
            title: "پیام‌های محیطی",
            body: "محیط بیرون از هسته—مولکول‌ها، تماس سلولی و ماتریکس—به سلول می‌گوید کدام مسیر را جدی‌تر دنبال کند.",
            cue: "محیط، انتخاب‌ها را جهت می‌دهد.",
            points: [
              "سیگنال‌های پاراکرین و اندوکرین (مثل فاکتورهای رشد) مسیر تمایز را سوگیری می‌کنند.",
              "تماس سلول-سلول و اتصالات پیوندگاهی اطلاعات موضعی محیط را منتقل می‌کنند.",
              "سختی و ترکیب ماتریکس خارج‌سلولی بر رفتار مکانیکی و سرنوشت سلول اثر می‌گذارد.",
              "در آزمایشگاه، تغییر غلظت یا زمان‌بندی پیام‌ها می‌تواند خروجی تمایز را عوض کند.",
            ],
          },
          {
            title: "برنامه‌ی ژنی",
            body: "هویت تازه عمدتاً از بازآرایی بیان ژن ساخته می‌شود: بعضی شبکه‌ها روشن و بعضی خاموش می‌شوند.",
            cue: "هویت تازه از درون سلول ساخته می‌شود.",
            points: [
              "فاکتورهای رونویسی کلیدی، مدارهای ژنی مربوط به یک رده سلولی را پایدار می‌کنند.",
              "تغییرات اپی‌ژنتیکی (مثل متیلاسیون و اصلاح هیستون) دسترسی به ژن‌ها را تنظیم می‌کنند.",
              "پروتئین‌ها و مسیرهای سیگنالی پایین‌دست، رفتار و ریخت سلول را تغییر می‌دهند.",
              "سنجش نشانگرهای ژنی و پروتئینی نشان می‌دهد برنامه واقعاً فعال شده است یا فقط ظاهر شبیه شده.",
            ],
          },
          {
            title: "سلول پیش‌ساز",
            body: "سلول دیگر کاملاً پرتوان نیست، اما هنوز می‌تواند به چند نوع نزدیک و مرتبط تبدیل شود؛ مسیر باریک‌تر و مشخص‌تر است.",
            cue: "مسیر محدودتر، اما مشخص‌تر می‌شود.",
            points: [
              "پیش‌سازها اغلب توان تکثیر دارند و پلی میان پرتوانی و سلول بالغ‌اند.",
              "تعهد نسبی به یک رده (مثل عصبی یا خونی) ایجاد شده، ولی بلوغ کامل رخ نداده است.",
              "این مرحله برای مقیاس‌پذیری تولید سلولی مهم است؛ چون می‌توان جمعیت را گسترش داد.",
              "کنترل خلوص در اینجا حیاتی است تا سلول‌های پرتوان باقی‌مانده وارد محصول نهایی نشوند.",
            ],
          },
          {
            title: "سلول تخصصی",
            body: "در پایان مسیر، ساختار، نشانگرها و عملکرد باید با نقش زیستی هدف هم‌راستا شوند؛ شباهت ظاهری کافی نیست.",
            cue: "هویت، ساختار و عملکرد هم‌راستا می‌شوند.",
            points: [
              "سلول تخصصی معمولاً تکثیر محدودتری دارد و وظیفه‌ای مشخص (سیگنال، انقباض، سوخت‌وساز و…) انجام می‌دهد.",
              "آزمون عملکردی—نه فقط رنگ‌آمیزی نشانگر—معیار اصلی بلوغ است.",
              "ادغام با بافت، خون‌رسانی و ایمنی بدن، چالش ترجمه‌ی آزمایشگاه به درمان است.",
              "برای کاربرد بالینی باید ایمنی، پایداری ژنتیکی و نبود جمعیت ناخواسته مستند شود.",
            ],
          },
        ]
      : [
          {
            title: "Open potential",
            body: "At this station the cell has no final identity yet: it can renew itself while keeping several differentiation routes open.",
            cue: "Several possibilities remain open.",
            points: [
              "Pluripotency means the cell can enter multiple lineages, not one fixed path.",
              "Self-renewal preserves the cell source so research or therapeutic material is not exhausted.",
              "Pluripotency markers and colony morphology help confirm this stage.",
              "Later guidance must be controlled; otherwise unwanted routes can activate.",
            ],
          },
          {
            title: "Environmental signals",
            body: "The outside context—molecules, cell contact, and matrix—biases which route the cell takes more seriously.",
            cue: "Context gives the choice a direction.",
            points: [
              "Paracrine and endocrine cues (such as growth factors) steer differentiation.",
              "Cell–cell contact and junction signaling transmit local niche information.",
              "Extracellular-matrix stiffness and composition influence mechanical behavior and fate.",
              "In culture, changing dose or timing of signals can alter the differentiation outcome.",
            ],
          },
          {
            title: "Gene program",
            body: "New identity is built largely by rewiring gene expression: some networks switch on while others switch off.",
            cue: "A new identity is built from within.",
            points: [
              "Key transcription factors stabilize lineage-specific gene circuits.",
              "Epigenetic changes (such as methylation and histone marks) regulate gene accessibility.",
              "Downstream proteins and signaling pathways reshape cell form and behavior.",
              "Gene and protein markers show whether a program is truly active, not merely similar in appearance.",
            ],
          },
          {
            title: "Progenitor cell",
            body: "The cell is no longer fully pluripotent, but can still form a related set of cell types; the route is narrower and clearer.",
            cue: "The route narrows and becomes clearer.",
            points: [
              "Progenitors often retain proliferative capacity and bridge pluripotency and maturity.",
              "Relative lineage commitment (for example neural or blood) exists, but full maturation has not occurred.",
              "This stage matters for scalable manufacturing because the population can still expand.",
              "Purity control is critical so residual pluripotent cells do not enter the final product.",
            ],
          },
          {
            title: "Specialized cell",
            body: "At the end of the path, structure, markers, and function should align with the target biological role; looks alone are not enough.",
            cue: "Identity, structure, and function align.",
            points: [
              "Specialized cells usually proliferate less and perform a defined role (signaling, contraction, metabolism, and so on).",
              "Functional assays—not marker staining alone—are the main maturity criterion.",
              "Tissue integration, blood supply, and immunity are central translation challenges.",
              "Clinical use requires documented safety, genetic stability, and absence of unwanted populations.",
            ],
          },
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
            </p>
            <h1>
              {titleLines.map((line, i) => (
                <TypeFadeText
                  key={`title-${lang}-${i}`}
                  as="span"
                  className={i === titleLines.length - 1 ? "hero-line accent" : "hero-line"}
                  text={line}
                  active={heroPhase >= i + 1}
                  speed={36}
                  delay={120}
                  showCaret={heroPhase === i + 1}
                  onDone={() => setHeroPhase((phase) => Math.max(phase, i + 2))}
                />
              ))}
            </h1>
            <TypeFadeText
              key={`sub-${lang}`}
              as="p"
              className="hero-subtitle"
              text={t.subtitle}
              active={heroPhase >= titleLines.length + 1}
              speed={28}
              delay={160}
              showCaret={heroPhase === titleLines.length + 1}
              onDone={() => setHeroPhase((phase) => Math.max(phase, titleLines.length + 2))}
            />
            <div className={`hero-actions ${heroPhase >= titleLines.length + 2 || reduced ? "is-visible" : ""}`}>
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
                  className={`timeline-step stage-${i + 1} ${i === timelineIndex ? "selected" : ""}`}
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
                className={`timeline-detail stage-${timelineIndex + 1}`}
                initial={reduced ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                <div className="timeline-detail-index">0{timelineIndex + 1}</div>
                <div className="timeline-detail-copy">
                  <h3>{timelineDetails[timelineIndex].title}</h3>
                  <p>{timelineDetails[timelineIndex].body}</p>
                  <ol className="timeline-points">
                    {timelineDetails[timelineIndex].points.map((point, i) => (
                      <li key={point}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        <p>{point}</p>
                      </li>
                    ))}
                  </ol>
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
                  <div key={c.title} className={`challenge-item ${openChallenge === i ? "open" : ""}`}>
                    <button
                      type="button"
                      className="challenge-row"
                      onClick={() => setOpenChallenge(openChallenge === i ? null : i)}
                      aria-expanded={openChallenge === i}
                    >
                      <span className="challenge-number">0{i + 1}</span>
                      <span className="challenge-copy">
                        <b>{c.title}</b>
                        <span>{c.summary}</span>
                      </span>
                      <ChevronDown size={18} />
                    </button>
                    <AnimatePresence initial={false}>
                      {openChallenge === i && (
                        <motion.div
                          className="challenge-panel"
                          initial={reduced ? undefined : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={reduced ? undefined : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.28 }}
                        >
                          <div className="challenge-panel-inner">
                            <div className="challenge-block why">
                              <h4>{c.why}</h4>
                              <p>{c.whyBody}</p>
                            </div>
                            <div className="challenge-block mechanism">
                              <h4>{c.mechanism}</h4>
                              <p>{c.mechanismBody}</p>
                            </div>
                            <div className="challenge-block checks">
                              <h4>{c.checksTitle}</h4>
                              <ol>
                                {c.checks.map((item, idx) => (
                                  <li key={item}>
                                    <span>{String(idx + 1).padStart(2, "0")}</span>
                                    <p>{item}</p>
                                  </li>
                                ))}
                              </ol>
                            </div>
                            <div className="challenge-takeaway">
                              <span>{lang === "fa" ? "جمع‌بندی" : "Takeaway"}</span>
                              <p>{c.takeaway}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              <div className="challenge-visual">
                <FadeCarousel
                  intervalMs={2000}
                  fadeMs={200}
                  slides={
                    lang === "fa"
                      ? [
                          {
                            src: ASSETS.challengeIntegration,
                            alt: "ادغام سلولی در محیط بافتی",
                            caption: "بقا و ادغام در بافت",
                          },
                          {
                            src: ASSETS.challengeImmunity,
                            alt: "پایش ایمنی پیرامون سلول‌های پیوندی",
                            caption: "ایمنی و رد پیوند",
                          },
                          {
                            src: ASSETS.challengePurity,
                            alt: "کنترل کیفیت و خلوص جمعیت سلولی",
                            caption: "کنترل تمایز و خلوص",
                          },
                          {
                            src: ASSETS.challengeTumor,
                            alt: "ریسک رشد غیرطبیعی سلولی",
                            caption: "خطر تومورزایی",
                          },
                          {
                            src: ASSETS.challengeScale,
                            alt: "تولید کنترل‌شده در مقیاس درمانی",
                            caption: "مقیاس‌پذیری و کیفیت",
                          },
                          {
                            src: ASSETS.tissue,
                            alt: "محیط بافتی در پزشکی بازساختی",
                            caption: "زمینه بافتی درمان",
                          },
                        ]
                      : [
                          {
                            src: ASSETS.challengeIntegration,
                            alt: "Cell integration in a tissue environment",
                            caption: "Survival and tissue integration",
                          },
                          {
                            src: ASSETS.challengeImmunity,
                            alt: "Immune surveillance around transplanted cells",
                            caption: "Immunity and rejection",
                          },
                          {
                            src: ASSETS.challengePurity,
                            alt: "Quality control and cell-population purity",
                            caption: "Differentiation control and purity",
                          },
                          {
                            src: ASSETS.challengeTumor,
                            alt: "Risk of abnormal cell overgrowth",
                            caption: "Tumor risk",
                          },
                          {
                            src: ASSETS.challengeScale,
                            alt: "Controlled biomanufacturing at clinical scale",
                            caption: "Scale and quality",
                          },
                          {
                            src: ASSETS.tissue,
                            alt: "Tissue environment in regenerative medicine",
                            caption: "Tissue context for therapy",
                          },
                        ]
                  }
                />
              </div>
            </div>
            <div className="evidence-strip">
              <div className="evidence-head">
                <div>
                  <h3>{t.gapTitle}</h3>
                  <p>{t.gapIntro}</p>
                </div>
                <div className="evidence-flow-legend" aria-hidden="true">
                  <span>01</span>
                  <i />
                  <span>02</span>
                  <i />
                  <span>03</span>
                </div>
              </div>

              <div className="evidence-track">
                {evidenceStages[lang].map((stage, i) => (
                  <article key={stage.title} className={`evidence-stage stage-${i + 1}`}>
                    <div className="evidence-media">
                      <img src={stage.img} alt={stage.alt} loading="lazy" decoding="async" width={1600} height={900} />
                      <span className="evidence-step">0{i + 1}</span>
                    </div>
                    <div className="evidence-copy">
                      <small>{stage.focus}</small>
                      <b>{stage.title}</b>
                      <p>{stage.body}</p>
                      <ul>
                        {stage.checks.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="evidence-note">
                <span>{t.gapNoteTitle}</span>
                <p>{t.gapNote}</p>
              </aside>
            </div>
          </div>
        </section>

        <section id="three" className="ips-section">
          <div className="wide-inner ips-flow">
            <motion.div className="ips-intro" {...fade}>
              <SectionTag n="04" label={t.question} />
              <h2>{t.ipsTitle}</h2>
              <p className="lead">{t.ipsIntro}</p>
              <p>{t.ipsBody}</p>
            </motion.div>

            <motion.div className="ips-hero-panel" {...fade}>
              <img
                src={ASSETS.ips}
                alt={lang === "fa" ? "بازبرنامه‌ریزی سلول بالغ به سلول iPS" : "Reprogramming a mature cell into an iPS cell"}
                loading="lazy"
                decoding="async"
                width={1400}
                height={1050}
              />
              <div className="ips-path-row">
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
            </motion.div>

            <motion.div className="ips-block" {...fade}>
              <h3>{t.ipsHowTitle}</h3>
              <p>{t.ipsHowIntro}</p>
              <div className="ips-steps">
                {(lang === "fa"
                  ? [
                      {
                        img: ASSETS.ipsFactors,
                        title: "ورود فاکتورهای بازبرنامه‌ریزی",
                        body: "مجموعه‌ای از فاکتورهای رونویسی (مانند عوامل یاماناکا) بیان ژن‌های پرتوانی را فعال و برنامه‌های هویت بالغ را عقب می‌رانند.",
                        points: [
                          "هدف، بازنشانی مدارهای ژنی است نه تخریب سلول.",
                          "کارایی و ایمنی روش انتقال فاکتورها باید کنترل شود.",
                        ],
                      },
                      {
                        img: ASSETS.ips,
                        title: "ظهور کلونی‌های پرتوان القایی",
                        body: "پس از بازتنظیم هویت، سلول‌ها می‌توانند خودنوزایی کنند و نشانگرهای پرتوانی را نشان دهند؛ این مرحله نیازمند تأیید آزمایشگاهی دقیق است.",
                        points: [
                          "ریخت‌شناسی کلونی و نشانگرها اولین شواهدند.",
                          "پایداری ژنتیکی و اپی‌ژنتیکی باید پایش شود.",
                        ],
                      },
                      {
                        img: ASSETS.ipsDirected,
                        title: "تمایز هدایت‌شده به سلول هدف",
                        body: "با پیام‌های مرحله‌ای، iPS را می‌توان به سمت نورون، سلول قلبی، سلول کبدی یا رده‌های دیگر هدایت کرد تا مدل یا ماده‌ی پژوهشی ساخته شود.",
                        points: [
                          "هر مسیر، زمان‌بندی و سیگنال مخصوص خود را دارد.",
                          "بلوغ واقعی با آزمون عملکرد سنجیده می‌شود، نه فقط ظاهر.",
                        ],
                      },
                    ]
                  : [
                      {
                        img: ASSETS.ipsFactors,
                        title: "Reprogramming factors enter",
                        body: "A set of transcription factors (such as Yamanaka factors) activates pluripotency networks and pushes adult identity programs back.",
                        points: [
                          "The aim is to reset gene circuits, not destroy the cell.",
                          "Delivery method efficiency and safety must be controlled.",
                        ],
                      },
                      {
                        img: ASSETS.ips,
                        title: "Induced pluripotent colonies emerge",
                        body: "After identity reset, cells can self-renew and display pluripotency markers; this stage needs careful laboratory confirmation.",
                        points: [
                          "Colony morphology and markers are early evidence.",
                          "Genetic and epigenetic stability should be monitored.",
                        ],
                      },
                      {
                        img: ASSETS.ipsDirected,
                        title: "Directed differentiation to a target",
                        body: "With staged cues, iPS cells can be guided toward neurons, heart cells, liver-like cells, or other lineages for models or research material.",
                        points: [
                          "Each route needs its own timing and signals.",
                          "True maturity is judged by function, not appearance alone.",
                        ],
                      },
                    ]
                ).map((step, i) => (
                  <article key={step.title} className="ips-step">
                    <div className="ips-step-media">
                      <img src={step.img} alt="" loading="lazy" decoding="async" width={1400} height={1050} />
                      <span>0{i + 1}</span>
                    </div>
                    <div className="ips-step-copy">
                      <h4>{step.title}</h4>
                      <p>{step.body}</p>
                      <ul>
                        {step.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>

            <motion.div className="ips-block" {...fade}>
              <h3>{t.ipsUsesTitle}</h3>
              <p>{t.ipsUsesIntro}</p>
              <div className="ips-uses">
                {(lang === "fa"
                  ? [
                      {
                        img: ASSETS.ipsModeling,
                        title: "مدل‌سازی بیماری",
                        body: "از سلول بیمار می‌توان iPS ساخت و بیماری را در ظرف آزمایشگاهی بازسازی کرد تا سازوکارها روشن‌تر شوند.",
                      },
                      {
                        img: ASSETS.ipsDirected,
                        title: "آزمون دارو و سمیت",
                        body: "سلول‌های مشتق از iPS کمک می‌کنند اثر و ایمنی داروها روی بافت‌های شبیه انسان دقیق‌تر بررسی شود.",
                      },
                      {
                        img: ASSETS.ipsFactors,
                        title: "پژوهش سلول جایگزین",
                        body: "iPS مسیری برای مطالعه‌ی تولید کنترل‌شده‌ی سلول‌های تخصصی می‌گشاید؛ کاربرد بالینی هنوز نیازمند شواهد و ایمنی است.",
                      },
                    ]
                  : [
                      {
                        img: ASSETS.ipsModeling,
                        title: "Disease modelling",
                        body: "Patient cells can be turned into iPS lines so disease mechanisms can be studied in a controlled lab setting.",
                      },
                      {
                        img: ASSETS.ipsDirected,
                        title: "Drug and toxicity testing",
                        body: "iPS-derived cells help researchers examine drug effects and safety on more human-relevant cell types.",
                      },
                      {
                        img: ASSETS.ipsFactors,
                        title: "Replacement-cell research",
                        body: "iPS cells open a route to study controlled production of specialized cells; clinical use still needs evidence and safety.",
                      },
                    ]
                ).map((use) => (
                  <article key={use.title} className="ips-use">
                    <img src={use.img} alt="" loading="lazy" decoding="async" width={1400} height={1050} />
                    <div>
                      <h4>{use.title}</h4>
                      <p>{use.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>

            <motion.div className="why-box" {...fade}>
              <h3>{t.why}</h3>
              <p>{t.whyBody}</p>
            </motion.div>
          </div>
        </section>

        <section className="quiz-section">
          <div className="quiz-inner">
            <SectionTag n="05" label={lang === "fa" ? "ایستگاه یادگیری" : "Learning checkpoint"} />
            <QuizExam lang={lang} />
          </div>
        </section>

        <footer id="footer" className="footer">
          <div className="footer-top">
            <div>
              <img src={ASSETS.mark} alt="" className="footer-mark" width={42} height={42} />
              <h2 className="footer-closing" aria-label={t.closing}>
                {t.closing.split(/\s+/).filter(Boolean).map((word, i) => (
                  <span key={`${word}-${i}`} className={`closing-word fx-${i % 6}`}>
                    {word}
                  </span>
                ))}
              </h2>
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
            <span className="footer-credit">
              {t.createdByPrefix}{" "}
              <b className="credit-name credit-arshia">{t.nameArshia}</b>{" "}
              {t.createdByAnd}{" "}
              <b className="credit-name credit-parsa">{t.nameParsa}</b>
            </span>
            <span className="footer-tagline">{t.footer}</span>
            <div className="footer-end">
              <span className="footer-copy" dir="ltr">
                © 2026 CELL STORY
              </span>
              <button onClick={() => scrollTo("top")} aria-label="Back to top">
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
