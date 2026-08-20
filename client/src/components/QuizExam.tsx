import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Award, Check, Flame, RotateCcw, Sparkles, Trophy, X } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Lang = "fa" | "en";
type Difficulty = "easy" | "medium" | "hard";
type Phase = "idle" | "playing" | "results";
type TopicKey = "identity" | "differentiation" | "clinical" | "ips";
type FeedbackMode = "full" | "mark";
type AutoAdvance = "off" | "fast" | "normal" | "slow";
type TimerMode = "off" | "20" | "30" | "45";

type BankQuestion = {
  id: string;
  difficulty: Difficulty;
  topicKey: TopicKey;
  topic: { fa: string; en: string };
  q: { fa: string; en: string };
  correct: { fa: string; en: string };
  distractors: { fa: string; en: string }[];
  explain: { fa: string; en: string };
};

type PlayQuestion = {
  id: string;
  difficulty: Difficulty;
  topic: string;
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

type SessionConfig = {
  difficulty: Difficulty | "mixed";
  topics: TopicKey[];
  optionCount: number;
  questionCount: number | "all";
  feedbackMode: FeedbackMode;
  autoAdvance: AutoAdvance;
  timerMode: TimerMode;
  shuffleOptions: boolean;
};

const ALL_TOPICS: TopicKey[] = ["identity", "differentiation", "clinical", "ips"];

const TOPIC_META: Record<TopicKey, { fa: string; en: string }> = {
  identity: { fa: "هویت سلول", en: "Cell identity" },
  differentiation: { fa: "تمایز", en: "Differentiation" },
  clinical: { fa: "ترجمه بالینی", en: "Clinical translation" },
  ips: { fa: "iPS", en: "iPS cells" },
};

const AUTO_DELAY_MS: Record<Exclude<AutoAdvance, "off">, number> = {
  fast: 900,
  normal: 1600,
  slow: 2800,
};

const BANK: BankQuestion[] = [
  {
    id: "stem-def",
    difficulty: "easy",
    topicKey: "identity",
    topic: TOPIC_META.identity,
    q: {
      fa: "کدام عبارت سلول بنیادی را بهتر توصیف می‌کند؟",
      en: "Which statement best describes a stem cell?",
    },
    correct: {
      fa: "سلولی با توان خودنوزایی و تولید سلول‌های تخصصی‌تر",
      en: "A cell with self-renewal and the ability to form more specialized cells",
    },
    distractors: [
      { fa: "سلولی که همیشه همه‌چیز می‌شود", en: "A cell that always becomes everything" },
      { fa: "سلولی که فقط در جنین وجود دارد", en: "A cell found only in embryos" },
      { fa: "هر سلولی که سریع تقسیم شود", en: "Any cell that divides quickly" },
    ],
    explain: {
      fa: "تعریف استاندارد بر دو ویژگی استوار است: خودنوزایی و توان تمایز در شرایط مناسب.",
      en: "The standard definition rests on two traits: self-renewal and the capacity to differentiate under the right conditions.",
    },
  },
  {
    id: "potency",
    difficulty: "easy",
    topicKey: "identity",
    topic: TOPIC_META.identity,
    q: {
      fa: "پرتوانی به‌طور ساده یعنی چه؟",
      en: "What does pluripotency mean in simple terms?",
    },
    correct: {
      fa: "توان ورود به چند رده‌ی سلولی مختلف",
      en: "The ability to enter several different cell lineages",
    },
    distractors: [
      { fa: "توان ساختن فقط یک نوع سلول", en: "The ability to make only one cell type" },
      { fa: "توان تبدیل‌شدن به بافت مرده", en: "The ability to become dead tissue" },
      { fa: "توان توقف کامل تقسیم", en: "The ability to stop dividing completely" },
    ],
    explain: {
      fa: "سلول پرتوان می‌تواند به رده‌های متعددی هدایت شود، نه فقط یک مسیر ثابت.",
      en: "A pluripotent cell can be guided into multiple lineages, not only one fixed path.",
    },
  },
  {
    id: "self-renew",
    difficulty: "easy",
    topicKey: "identity",
    topic: TOPIC_META.identity,
    q: {
      fa: "چرا خودنوزایی برای سلول بنیادی مهم است؟",
      en: "Why is self-renewal important for stem cells?",
    },
    correct: {
      fa: "چون منبع سلولی را برای ادامه رشد و پژوهش حفظ می‌کند",
      en: "Because it preserves a renewable cell source for growth and research",
    },
    distractors: [
      { fa: "چون سلول را فوراً به نورون تبدیل می‌کند", en: "Because it instantly turns the cell into a neuron" },
      { fa: "چون نیاز به نشانگر ژنی را حذف می‌کند", en: "Because it removes the need for gene markers" },
      { fa: "چون ایمنی بدن را کامل می‌کند", en: "Because it fully completes immune protection" },
    ],
    explain: {
      fa: "بدون خودنوزایی، منبع سلول سریع تمام می‌شود و کنترل پژوهش دشوار می‌گردد.",
      en: "Without self-renewal, the source is quickly exhausted and controlled research becomes harder.",
    },
  },
  {
    id: "signals",
    difficulty: "medium",
    topicKey: "differentiation",
    topic: TOPIC_META.differentiation,
    q: {
      fa: "پیام‌های محیطی در تمایز چه نقشی دارند؟",
      en: "What role do environmental signals play in differentiation?",
    },
    correct: {
      fa: "مسیرهای ممکن را جهت می‌دهند و بعضی گزینه‌ها را محتمل‌تر می‌کنند",
      en: "They bias possible routes and make some options more likely",
    },
    distractors: [
      { fa: "ژنوم سلول را برای همیشه پاک می‌کنند", en: "They permanently erase the cell genome" },
      { fa: "فقط رنگ سلول را عوض می‌کنند", en: "They only change cell color" },
      { fa: "هیچ اثری بر سرنوشت سلول ندارند", en: "They have no effect on cell fate" },
    ],
    explain: {
      fa: "فاکتورهای رشد، تماس سلولی و ماتریکس بافتی انتخاب مسیر را سوگیری می‌کنند.",
      en: "Growth factors, cell contact, and tissue matrix bias pathway choice.",
    },
  },
  {
    id: "gene-program",
    difficulty: "medium",
    topicKey: "differentiation",
    topic: TOPIC_META.differentiation,
    q: {
      fa: "برنامه‌ی ژنی در تمایز عمدتاً چه کاری می‌کند؟",
      en: "What does a gene program mainly do during differentiation?",
    },
    correct: {
      fa: "شبکه‌ای از ژن‌ها را روشن/خاموش می‌کند تا هویت تازه ساخته شود",
      en: "It switches gene networks on/off to build a new identity",
    },
    distractors: [
      { fa: "فقط اندازه سلول را افزایش می‌دهد", en: "It only increases cell size" },
      { fa: "همه‌ی کروموزوم‌ها را حذف می‌کند", en: "It deletes all chromosomes" },
      { fa: "سلول را از محیط جدا می‌کند", en: "It isolates the cell from its environment" },
    ],
    explain: {
      fa: "هویت سلولی از بازآرایی بیان ژن و پایداری مدارهای رونویسی ساخته می‌شود.",
      en: "Cell identity emerges from rewired gene expression and stabilized transcriptional circuits.",
    },
  },
  {
    id: "progenitor",
    difficulty: "medium",
    topicKey: "differentiation",
    topic: TOPIC_META.differentiation,
    q: {
      fa: "سلول پیش‌ساز در کجای مسیر تمایز قرار دارد؟",
      en: "Where does a progenitor sit on the differentiation path?",
    },
    correct: {
      fa: "بین پرتوانی و سلول تخصصی؛ انعطاف کمتر، ولی مسیر مشخص‌تر",
      en: "Between pluripotency and a specialized cell; less flexible, clearer route",
    },
    distractors: [
      { fa: "همیشه قبل از تشکیل جنین", en: "Always before an embryo forms" },
      { fa: "فقط پس از درمان بالینی", en: "Only after clinical treatment" },
      { fa: "خارج از هر مسیر زیستی", en: "Outside any biological pathway" },
    ],
    explain: {
      fa: "پیش‌سازها اغلب قابل تکثیرند و پلی میان منبع پرتوان و سلول بالغ می‌سازند.",
      en: "Progenitors are often proliferative and bridge pluripotent sources with mature cells.",
    },
  },
  {
    id: "translation",
    difficulty: "medium",
    topicKey: "clinical",
    topic: TOPIC_META.clinical,
    q: {
      fa: "چرا ساخت سلول هدف به‌تنهایی درمان را تضمین نمی‌کند؟",
      en: "Why does making the desired cell not guarantee a treatment?",
    },
    correct: {
      fa: "چون ایمنی، بقا، کیفیت ساخت و شواهد انسانی هم باید بررسی شوند",
      en: "Because safety, survival, manufacturing quality, and human evidence must also be checked",
    },
    distractors: [
      { fa: "چون سلول‌ها هرگز قابل استفاده نیستند", en: "Because cells can never be used" },
      { fa: "چون آزمایشگاه عین بدن انسان است", en: "Because a lab is identical to the human body" },
      { fa: "چون فقط رنگ‌آمیزی کافی است", en: "Because staining alone is enough" },
    ],
    explain: {
      fa: "ترجمه‌ی درمان نیازمند ایمنی، عملکرد پایدار، تولید استاندارد و داده‌ی بالینی است.",
      en: "Translation requires safety, durable function, standardized production, and clinical data.",
    },
  },
  {
    id: "ips-concept",
    difficulty: "medium",
    topicKey: "ips",
    topic: TOPIC_META.ips,
    q: {
      fa: "اهمیت مفهومی سلول‌های iPS چیست؟",
      en: "What is the conceptual importance of iPS cells?",
    },
    correct: {
      fa: "سلول بالغ را به منبعی انعطاف‌پذیر برای پژوهش تبدیل می‌کنند",
      en: "They turn mature cells into a flexible research resource",
    },
    distractors: [
      { fa: "همه‌ی بیماری‌ها را درمان کرده‌اند", en: "They have already cured every disease" },
      { fa: "جایگزین کامل کارآزمایی بالینی هستند", en: "They fully replace clinical trials" },
      { fa: "فقط در گیاهان یافت می‌شوند", en: "They are found only in plants" },
    ],
    explain: {
      fa: "iPSها امکان مدل‌سازی بیماری، آزمون دارو و مطالعه‌ی تمایز هدایت‌شده را گسترش می‌دهند.",
      en: "iPS cells expand disease modelling, drug testing, and study of directed differentiation.",
    },
  },
  {
    id: "tumor-risk",
    difficulty: "hard",
    topicKey: "clinical",
    topic: TOPIC_META.clinical,
    q: {
      fa: "چرا سلول‌های پرتوان باقی‌مانده در محصول نهایی نگران‌کننده‌اند؟",
      en: "Why are residual pluripotent cells in a final product concerning?",
    },
    correct: {
      fa: "چون می‌توانند خطر تومورزایی ایجاد کنند",
      en: "Because they can create a tumorigenic risk",
    },
    distractors: [
      { fa: "چون سرعت رشد را همیشه کم می‌کنند", en: "Because they always slow growth" },
      { fa: "چون فقط رنگ محیط کشت را عوض می‌کنند", en: "Because they only change media color" },
      { fa: "چون هیچ پیامد ایمنی ندارند", en: "Because they have no safety consequence" },
    ],
    explain: {
      fa: "جمعیت‌های پرتوان ناخواسته ممکن است رشد کنترل‌نشده داشته باشند؛ خالص‌سازی و آزمون ایمنی ضروری است.",
      en: "Unwanted pluripotent populations may grow uncontrollably; purification and safety testing are essential.",
    },
  },
  {
    id: "function-vs-looks",
    difficulty: "hard",
    topicKey: "differentiation",
    topic: TOPIC_META.differentiation,
    q: {
      fa: "کدام معیار برای بلوغ سلول تخصصی معتبرتر است؟",
      en: "Which criterion is more valid for specialized-cell maturity?",
    },
    correct: {
      fa: "آزمون عملکردی همراه با نشانگرهای هویتی",
      en: "Functional assays together with identity markers",
    },
    distractors: [
      { fa: "فقط شباهت ظاهری زیر میکروسکوپ", en: "Microscopic appearance alone" },
      { fa: "فقط سرعت تقسیم سلول", en: "Division speed alone" },
      { fa: "فقط دمای محیط کشت", en: "Culture temperature alone" },
    ],
    explain: {
      fa: "شباهت ظاهری کافی نیست؛ سلول باید نقش زیستی مورد انتظار را نشان دهد.",
      en: "Looks are not enough; the cell must show the expected biological role.",
    },
  },
  {
    id: "immune",
    difficulty: "hard",
    topicKey: "clinical",
    topic: TOPIC_META.clinical,
    q: {
      fa: "در پیوند سلولی، یکی از چالش‌های اصلی ایمنی چیست؟",
      en: "In cell transplantation, what is a main immune challenge?",
    },
    correct: {
      fa: "احتمال شناسایی سلول‌ها به‌عنوان بیگانه و رد شدن آن‌ها",
      en: "Cells may be recognized as foreign and rejected",
    },
    distractors: [
      { fa: "حذف کامل نیاز به پایش بیمار", en: "Completely removing the need for patient monitoring" },
      { fa: "تبدیل خودکار همه‌ی سلول‌ها به گلبول قرمز", en: "Automatically converting all cells into red blood cells" },
      { fa: "توقف دائمی بیان ژن", en: "Permanently stopping gene expression" },
    ],
    explain: {
      fa: "سازگاری ایمنی، منبع سلول و پایش طولانی‌مدت بخشی از مسیر ترجمه‌اند.",
      en: "Immune compatibility, cell source, and long-term monitoring are part of translation.",
    },
  },
  {
    id: "ips-not-cure",
    difficulty: "hard",
    topicKey: "ips",
    topic: TOPIC_META.ips,
    q: {
      fa: "کدام ادعا درباره‌ی iPS دقیق‌تر است؟",
      en: "Which claim about iPS cells is more accurate?",
    },
    correct: {
      fa: "یک امکان پژوهشی و درمانی بالقوه می‌سازند، نه درمان تضمین‌شده",
      en: "They create a research and potential therapeutic possibility, not a guaranteed cure",
    },
    distractors: [
      { fa: "هر بیماری را بدون کارآزمایی درمان می‌کنند", en: "They cure every disease without trials" },
      { fa: "جایگزین کامل سیستم ایمنی‌اند", en: "They fully replace the immune system" },
      { fa: "فقط برای گیاهان مفیدند", en: "They are useful only for plants" },
    ],
    explain: {
      fa: "iPS افق پژوهش را باز می‌کند، اما کاربرد بالینی نیازمند شواهد، ایمنی و نظارت است.",
      en: "iPS cells open research horizons, but clinical use still needs evidence, safety, and oversight.",
    },
  },
];

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function filterPool(difficulty: Difficulty | "mixed", topics: TopicKey[]): BankQuestion[] {
  const topicSet = new Set(topics.length ? topics : ALL_TOPICS);
  return BANK.filter((q) => {
    const diffOk = difficulty === "mixed" || q.difficulty === difficulty;
    const topicOk = topicSet.has(q.topicKey);
    return diffOk && topicOk;
  });
}

function buildSession(lang: Lang, config: SessionConfig): PlayQuestion[] {
  const pool = filterPool(config.difficulty, config.topics);
  const limit = config.questionCount === "all" ? pool.length : Math.min(config.questionCount, pool.length);
  const picked = shuffle(pool).slice(0, limit);

  return picked.map((item) => {
    const distractorPool = shuffle(item.distractors);
    const needed = Math.max(1, config.optionCount - 1);
    const chosen = distractorPool.slice(0, Math.min(needed, distractorPool.length));
    const raw = config.shuffleOptions ? shuffle([item.correct, ...chosen]) : [item.correct, ...chosen];
    const options = raw.map((o) => o[lang]);
    const answer = options.indexOf(item.correct[lang]);
    return {
      id: item.id,
      difficulty: item.difficulty,
      topic: item.topic[lang],
      q: item.q[lang],
      options,
      answer,
      explain: item.explain[lang],
    };
  });
}

const FIXED_SESSION: SessionConfig = {
  difficulty: "mixed",
  topics: ALL_TOPICS,
  optionCount: 4,
  questionCount: 8,
  feedbackMode: "full",
  autoAdvance: "off",
  timerMode: "off",
  shuffleOptions: true,
};

const ui = {
  fa: {
    idlePrompt: "می خواهی خودتو امتحان کنی؟",
    idleBody: "بزن بریم",
    start: "شروع آزمون",
    back: "قبلی",
    end: "پایان",
    next: "پرسش بعدی",
    finish: "مشاهده نتیجه",
    correct: "درست",
    wrong: "نادرست",
    why: "چرا این پاسخ درست است؟",
    rightAnswer: "پاسخ درست:",
    score: "نمره شما",
    of: "از",
    insight: "تحلیل عملکرد",
    byTopic: "درستی بر اساس موضوع",
    outcome: "نتیجه‌ی پاسخ‌ها",
    restart: "آزمون دوباره",
    accuracy: "دقت",
    timeUp: "زمان تمام شد",
    seconds: "ثانیه",
  },
  en: {
    idlePrompt: "Want to test yourself?",
    idleBody: "Let's go",
    start: "Start quiz",
    back: "Back",
    end: "End",
    next: "Next question",
    finish: "See results",
    correct: "Correct",
    wrong: "Incorrect",
    why: "Why this answer is correct",
    rightAnswer: "Correct answer:",
    score: "Your score",
    of: "of",
    insight: "Performance insight",
    byTopic: "Accuracy by topic",
    outcome: "Answer outcomes",
    restart: "Retake quiz",
    accuracy: "Accuracy",
    timeUp: "Time's up",
    seconds: "sec",
  },
} as const;

const HIGH_SCORE_CHEERS = {
  fa: {
    81: "۸۱٪؛ شروع درخشان یک ذهن کنجکاو.",
    82: "۸۲٪؛ استدلالت دارد شکل علمی می‌گیرد.",
    83: "۸۳٪؛ داری مثل یک پژوهشگر دقیق فکر می‌کنی.",
    84: "۸۴٪؛ مسیر سلول را خوب دنبال کردی.",
    85: "۸۵٪؛ عالی؛ تمایز را با دقت دیدی.",
    86: "۸۶٪؛ شواهد را هوشمندانه وزن کردی.",
    87: "۸۷٪؛ نزدیک قله‌ی درک علمی هستی.",
    88: "۸۸٪؛ روایت سلول‌ها را خیلی خوب خواندی.",
    89: "۸۹٪؛ یک قدم تا درخشش کامل.",
    90: "۹۰٪؛ نمره‌ی درخشان؛ مثل آزمایشگاه فکر کردی.",
    91: "۹۱٪؛ دقتت کمیاب و قابل احترام است.",
    92: "۹۲٪؛ مفاهیم سخت را نرم و درست فهمیدی.",
    93: "۹۳٪؛ ذهن تحلیلی‌ات روشن کار می‌کند.",
    94: "۹۴٪؛ تقریباً بی‌نقص؛ فقط یک نفس تا اوج.",
    95: "۹۵٪؛ عملکرد سطح پژوهشی؛ فوق‌العاده.",
    96: "۹۶٪؛ تسلطت بر داستان سلول چشمگیر است.",
    97: "۹۷٪؛ نزدیک کمال؛ استدلالت برق می‌زند.",
    98: "۹۸٪؛ کم‌نظیر؛ دقت و سرعت با هم آمدند.",
    99: "۹۹٪؛ یک ذره تا افسانه؛ حیرت‌انگیز.",
    100: "۱۰۰٪؛ بی‌نقص؛ روایت سلول‌های بنیادی مال توست.",
  },
  en: {
    81: "81% — a sharp start for a curious mind.",
    82: "82% — your reasoning is taking scientific shape.",
    83: "83% — you're thinking with researcher precision.",
    84: "84% — you tracked the cell pathway cleanly.",
    85: "85% — strong work spotting differentiation.",
    86: "86% — you weighed the evidence smartly.",
    87: "87% — close to a peak scientific read.",
    88: "88% — you read the cell story very well.",
    89: "89% — one step from full brilliance.",
    90: "90% — brilliant score; lab-level thinking.",
    91: "91% — rare precision. Respect.",
    92: "92% — hard ideas, clean understanding.",
    93: "93% — your analytical mind is lit.",
    94: "94% — nearly flawless; breath from the top.",
    95: "95% — research-grade performance.",
    96: "96% — your grip on the cell story is striking.",
    97: "97% — near perfection; sharp reasoning.",
    98: "98% — rare combo of speed and accuracy.",
    99: "99% — one speck from legend. Wild.",
    100: "100% — perfect. The stem-cell story is yours.",
  },
} as const;

function getHighScoreCheer(pct: number, lang: Lang) {
  if (pct <= 80) return null;
  const key = Math.min(100, Math.max(81, Math.round(pct))) as keyof (typeof HIGH_SCORE_CHEERS)["en"];
  const text = HIGH_SCORE_CHEERS[lang][key];
  if (pct >= 100) return { text, Icon: Award, tier: "perfect" as const };
  if (pct >= 95) return { text, Icon: Trophy, tier: "elite" as const };
  if (pct >= 90) return { text, Icon: Flame, tier: "great" as const };
  return { text, Icon: Sparkles, tier: "strong" as const };
}

const PIE_COLORS = ["#0e9aa8", "#e06b5c", "#9fc45a"];
const BAR_COLORS = ["#0e9aa8", "#7fd7df", "#9fc45a", "#f0b27a"];

function ChartTooltip({
  active,
  payload,
  label,
  unit = "",
  lang,
}: {
  active?: boolean;
  payload?: { value?: number; name?: string; color?: string }[];
  label?: string;
  unit?: string;
  lang: Lang;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0];
  return (
    <div className="quiz-chart-tooltip" dir={lang === "fa" ? "rtl" : "ltr"}>
      <span>{label || row.name}</span>
      <strong>
        {row.value}
        {unit}
      </strong>
    </div>
  );
}

function wrapTopicLabel(label: string, maxChars: number): string[] {
  const text = label.trim();
  if (text.length <= maxChars) return [text];

  const spaceIdx = text.lastIndexOf(" ", maxChars);
  if (spaceIdx > 3) {
    return [text.slice(0, spaceIdx), text.slice(spaceIdx + 1)].filter(Boolean).slice(0, 2);
  }

  // Persian compounds often lack a useful mid-break; keep one clipped line.
  return [text.slice(0, Math.max(4, maxChars - 1)) + "…"];
}

function TopicAxisTick({
  x = 0,
  y = 0,
  payload,
  lang,
}: {
  x?: number;
  y?: number;
  payload?: { value?: string };
  lang: Lang;
}) {
  // Keep FA labels in the Y-axis gutter; SVG direction="rtl" was flipping them into the plot/numbers.
  const lines = wrapTopicLabel(String(payload?.value ?? ""), lang === "fa" ? 12 : 14);
  const lineHeight = 13;
  const startY = y - ((lines.length - 1) * lineHeight) / 2;

  return (
    <g transform={`translate(${x},${startY})`}>
      {lines.map((line, i) => (
        <text
          key={`${line}-${i}`}
          className="quiz-axis-tick"
          x={lang === "fa" ? -12 : -8}
          y={i * lineHeight}
          dy={4}
          textAnchor="end"
          fontSize={11}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function TopicValueLabel({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  value,
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: number;
}) {
  if (value == null) return null;
  const inside = width >= 44;
  const labelX = inside ? x + width - 8 : x + width + 8;
  return (
    <text
      className={inside ? "quiz-bar-value inside" : "quiz-bar-value"}
      x={labelX}
      y={y + height / 2}
      dy={4}
      textAnchor={inside ? "end" : "start"}
      fontSize={11}
      fontWeight={700}
    >
      {value}%
    </text>
  );
}

export default function QuizExam({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const [phase, setPhase] = useState<Phase>("idle");
  const feedbackMode: FeedbackMode = FIXED_SESSION.feedbackMode;
  const autoAdvance: AutoAdvance = FIXED_SESSION.autoAdvance;
  const timerMode: TimerMode = FIXED_SESSION.timerMode;
  const [session, setSession] = useState<PlayQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [results, setResults] = useState<{ id: string; topic: string; difficulty: Difficulty; correct: boolean }[]>([]);
  const [pieHover, setPieHover] = useState<{ name: string; value: number; color: string } | null>(null);

  const current = session[index];
  const progress = session.length ? ((index + (locked ? 1 : 0)) / session.length) * 100 : 0;
  const timerTotal = timerMode === "off" ? 0 : Number(timerMode);
  const timerRatio = timerTotal > 0 && secondsLeft !== null ? Math.max(0, Math.min(1, secondsLeft / timerTotal)) : 0;
  const timerRadius = 18;
  const timerCircumference = 2 * Math.PI * timerRadius;

  const score = useMemo(() => results.filter((r) => r.correct).length, [results]);
  const accuracyPct = results.length ? Math.round((score / results.length) * 100) : 0;

  const topicChart = useMemo(() => {
    const map = new Map<string, { topic: string; correct: number; total: number }>();
    results.forEach((r) => {
      const row = map.get(r.topic) || { topic: r.topic, correct: 0, total: 0 };
      row.total += 1;
      if (r.correct) row.correct += 1;
      map.set(r.topic, row);
    });
    return Array.from(map.values()).map((row) => ({
      topic: row.topic,
      accuracy: Math.round((row.correct / row.total) * 100),
    }));
  }, [results]);

  const outcomeChart = useMemo(
    () => [
      { name: t.correct, value: results.filter((r) => r.correct).length },
      { name: t.wrong, value: results.filter((r) => !r.correct).length },
    ],
    [results, t.correct, t.wrong],
  );

  const startQuiz = () => {
    const built = buildSession(lang, FIXED_SESSION);
    if (built.length === 0) return;
    setSession(built);
    setIndex(0);
    setSelected(null);
    setLocked(false);
    setTimedOut(false);
    setSecondsLeft(null);
    setResults([]);
    setPieHover(null);
    setPhase("playing");
  };

  const choose = (i: number | null) => {
    if (locked || !current) return;
    const pick = i;
    const isCorrect = pick !== null && pick === current.answer;
    setSelected(pick);
    setLocked(true);
    setTimedOut(pick === null);
    setResults((prev) => {
      const next = prev.filter((r) => r.id !== current.id);
      return [
        ...next,
        {
          id: current.id,
          topic: current.topic,
          difficulty: current.difficulty,
          correct: isCorrect,
        },
      ];
    });
  };

  const goNext = () => {
    if (index >= session.length - 1) {
      setPhase("results");
      return;
    }
    setIndex((v) => v + 1);
    setSelected(null);
    setLocked(false);
    setTimedOut(false);
    setSecondsLeft(null);
  };

  const goBack = () => {
    if (index <= 0) return;
    const prevQ = session[index - 1];
    setIndex((v) => v - 1);
    setResults((prev) => prev.filter((r) => r.id !== prevQ.id && r.id !== current?.id));
    setSelected(null);
    setLocked(false);
    setTimedOut(false);
    setSecondsLeft(null);
  };

  const endQuiz = () => {
    setPhase("idle");
    setSession([]);
    setIndex(0);
    setSelected(null);
    setLocked(false);
    setTimedOut(false);
    setSecondsLeft(null);
    setResults([]);
    setPieHover(null);
  };

  useEffect(() => {
    if (!locked || phase !== "playing" || autoAdvance === "off") return;
    const base = AUTO_DELAY_MS[autoAdvance];
    const delay = feedbackMode === "full" && selected !== current?.answer ? base + 600 : base;
    const id = window.setTimeout(() => {
      goNext();
    }, delay);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked, index, phase, selected, current?.answer, autoAdvance, feedbackMode]);

  useEffect(() => {
    if (phase !== "playing" || locked || timerMode === "off" || secondsLeft === null) return;
    if (secondsLeft <= 0) {
      choose(null);
      return;
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => (s === null ? null : s - 1)), 1000);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, locked, timerMode, secondsLeft, index]);

  const restart = () => {
    endQuiz();
  };

  return (
    <div className="quiz-card exam">
      {phase === "idle" && (
        <div className="quiz-idle">
          <h3>{t.idlePrompt}</h3>
          <p>{t.idleBody}</p>
          <button className="btn-primary" type="button" onClick={startQuiz}>
            {t.start}
            <ArrowUpRight size={16} />
          </button>
        </div>
      )}

      {phase === "playing" && current && (
        <>
          <div className="quiz-meta">
            <span>
              {String(index + 1).padStart(2, "0")} / {String(session.length).padStart(2, "0")}
            </span>
            <div className="quiz-progress">
              <i style={{ width: `${progress}%` }} />
            </div>
            {secondsLeft !== null && (
              <em
                className={`quiz-timer ${secondsLeft <= 5 ? "urgent" : ""}`}
                aria-label={`${secondsLeft} ${t.seconds}`}
              >
                <svg viewBox="0 0 44 44" aria-hidden="true">
                  <circle className="quiz-timer-track" cx="22" cy="22" r={timerRadius} />
                  <circle
                    className="quiz-timer-progress"
                    cx="22"
                    cy="22"
                    r={timerRadius}
                    strokeDasharray={timerCircumference}
                    strokeDashoffset={timerCircumference * (1 - timerRatio)}
                    transform="rotate(-90 22 22)"
                  />
                </svg>
                <span>{secondsLeft}</span>
              </em>
            )}
            <em className="quiz-topic">{current.topic}</em>
          </div>
          <h3>{current.q}</h3>
          <div className={`quiz-options ${locked ? "is-locked" : ""}`}>
            {current.options.map((option, i) => {
              let cls = "";
              if (locked) {
                if (i === current.answer) cls = "right";
                else if (selected !== null && i === selected) cls = "wrong";
                else cls = "dimmed";
              } else if (selected === i) cls = "picked";
              return (
                <button
                  key={option}
                  type="button"
                  className={cls}
                  onClick={() => choose(i)}
                  disabled={locked}
                  aria-disabled={locked}
                >
                  <span>{String.fromCharCode(65 + i)}</span>
                  {option}
                  {locked && i === current.answer && <Check size={17} />}
                  {locked && selected !== null && i === selected && i !== current.answer && <X size={17} />}
                </button>
              );
            })}
          </div>
          {locked && (
            <div className={`quiz-explain ${selected === current.answer ? "good" : "bad"}`}>
              <b>{timedOut ? t.timeUp : selected === current.answer ? t.correct : t.wrong}</b>
              {feedbackMode === "full" && (
                <>
                  {selected !== current.answer && (
                    <p>
                      {t.rightAnswer} <strong>{current.options[current.answer]}</strong>
                    </p>
                  )}
                  <p>
                    <span>{t.why}</span> {current.explain}
                  </p>
                </>
              )}
            </div>
          )}
          <div className="quiz-nav">
            <button className="btn-quiet" type="button" onClick={goBack} disabled={index === 0}>
              {t.back}
            </button>
            <button className="btn-quiet quiz-end" type="button" onClick={endQuiz}>
              {t.end}
            </button>
            <button className="btn-primary" type="button" disabled={!locked} onClick={goNext}>
              {index >= session.length - 1 ? t.finish : t.next}
              <ArrowUpRight size={16} />
            </button>
          </div>
        </>
      )}

      {phase === "results" && (
        <div className="quiz-results">
          <div className={`quiz-scoreboard ${accuracyPct > 80 ? "high-score" : ""}`}>
            <span>{t.score}</span>
            <strong>
              {score} {t.of} {results.length}
            </strong>
            <em>
              {t.accuracy}: {accuracyPct}%
            </em>
            {(() => {
              const cheer = getHighScoreCheer(accuracyPct, lang);
              if (!cheer) return null;
              const { Icon, text, tier } = cheer;
              return (
                <p className={`quiz-cheer tier-${tier}`}>
                  <Icon size={18} aria-hidden="true" />
                  <span>{text}</span>
                </p>
              );
            })()}
          </div>
          <h3>{t.insight}</h3>
          <div className="quiz-charts">
            <div className="quiz-chart-panel">
              <h4>{t.outcome}</h4>
              <div className="quiz-chart-box has-pie-metric" dir="ltr">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart margin={{ top: 12, right: 12, bottom: 12, left: 12 }}>
                    <Pie
                      data={outcomeChart}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={48}
                      outerRadius={72}
                      paddingAngle={3}
                      onMouseEnter={(_, pieIndex) => {
                        const row = outcomeChart[pieIndex];
                        if (!row) return;
                        setPieHover({
                          name: row.name,
                          value: row.value,
                          color: PIE_COLORS[pieIndex % PIE_COLORS.length],
                        });
                      }}
                      onMouseLeave={() => setPieHover(null)}
                    >
                      {outcomeChart.map((entry, i) => (
                        <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="rgba(7,17,29,0.35)" strokeWidth={1} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="quiz-pie-metric" aria-hidden="true">
                  <strong>{accuracyPct}%</strong>
                  <span>{t.accuracy}</span>
                </div>
                {pieHover && (
                  <div className="quiz-pie-hover-tip" dir={lang === "fa" ? "rtl" : "ltr"}>
                    <i style={{ background: pieHover.color }} />
                    <span>{pieHover.name}</span>
                    <strong>{pieHover.value}</strong>
                  </div>
                )}
              </div>
              <div className="quiz-legend">
                {outcomeChart.map((row, i) => (
                  <span key={row.name}>
                    <i style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                    {row.name}: {row.value}
                  </span>
                ))}
              </div>
            </div>
            <div className="quiz-chart-panel">
              <h4>{t.byTopic}</h4>
              <div className="quiz-chart-box topic-bars" dir="ltr">
                <ResponsiveContainer width="100%" height={Math.max(220, topicChart.length * 58 + 52)}>
                  <BarChart
                    data={topicChart}
                    layout="vertical"
                    margin={{
                      top: 10,
                      right: 56,
                      left: lang === "fa" ? 10 : 8,
                      bottom: 8,
                    }}
                    barCategoryGap="34%"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--panel-border)" horizontal={false} />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      ticks={[0, 50, 100]}
                      tick={{ fill: "currentColor", fontSize: 11 }}
                      tickFormatter={(v) => `${v}%`}
                      axisLine={{ stroke: "currentColor", opacity: 0.2 }}
                      tickLine={false}
                      height={28}
                      className="quiz-axis"
                    />
                    <YAxis
                      type="category"
                      dataKey="topic"
                      width={lang === "fa" ? 152 : 124}
                      tick={<TopicAxisTick lang={lang} />}
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                      mirror={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(127, 215, 223, 0.08)", radius: 8 }}
                      content={<ChartTooltip lang={lang} unit="%" />}
                      wrapperStyle={{ outline: "none" }}
                    />
                    <Bar
                      dataKey="accuracy"
                      name={t.accuracy}
                      radius={[0, 9, 9, 0]}
                      barSize={22}
                      activeBar={{ fill: "#7fd7df", stroke: "rgba(127, 215, 223, 0.35)", strokeWidth: 1 }}
                    >
                      {topicChart.map((entry, i) => (
                        <Cell key={entry.topic} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                      ))}
                      <LabelList dataKey="accuracy" content={<TopicValueLabel />} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <button className="btn-primary" type="button" onClick={restart}>
            {t.restart}
            <RotateCcw size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
