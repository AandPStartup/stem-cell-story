# Cell Story — Design Direction

## Three stylistic approaches

### Theme Name: Bio-Editorial Atlas
Very Brief Intro: A warm, research-journal-inspired visual system that treats stem-cell science as a human story, pairing editorial typography with precise scientific diagrams.
Probability: 0.07

### Theme Name: Night Lab / Living Matter
Very Brief Intro: A dark, cinematic biotech environment with luminous cell pathways, restrained glow, and high-contrast visual storytelling for an immersive scroll narrative.
Probability: 0.03

### Theme Name: Clinical Lightfield
Very Brief Intro: A bright, translucent, museum-like science experience with mineral whites, glass panels, and clean interactive diagrams designed for calm comprehension.
Probability: 0.08

## Selected approach: Bio-Editorial Atlas

### Design Movement
Contemporary scientific editorial design influenced by museum exhibition graphics, academic journals, and premium data visualization. The interface should feel like an interactive field guide rather than a dashboard.

### Core Principles
1. Explain before decorating: every visual element must make the biology easier to understand.
2. Pair organic matter with editorial precision: soft cellular forms sit beside sharp labels, rules, and annotation lines.
3. Use asymmetry to create a reading journey: sections should feel composed, not templated.
4. Treat uncertainty responsibly: visual drama must never imply that experimental work is already a guaranteed treatment.

### Color Philosophy
The signature color is **Aqua Cobalt** (#0F9FB0): a cool, ownable cyan-teal that suggests living systems, evidence, and clarity without defaulting to generic medical blue. Pair it with ink navy (#10233B), mineral ivory (#F5F1E8), algae lime (#B9D36A), and restrained coral (#E86E61). The light mode should feel like a printed research atlas; dark mode should feel like the same atlas viewed under laboratory light.

### Layout Paradigm
Use a vertical narrative spine that travels through the page. Content alternates between left-anchored editorial blocks and right-anchored visual systems, with occasional full-width diagrams. Avoid a repetitive centered-card grid. Let the active section marker and a thin vertical progress line make the page feel like a guided exhibition.

### Signature Elements
1. A thin “cell path” line that appears as a recurring annotation motif and connects sections.
2. Oversized section numbers rendered as quiet typographic specimens.
3. Translucent, softly textured cell-orb visuals with thin scientific callouts.

### Interaction Philosophy
Interactions should feel like turning a page or inspecting a specimen. Hover and tap states reveal one layer of information at a time. Users should always understand what changed and why. Avoid decorative motion that does not clarify a concept.

### Animation
Use 180–320ms ease-out transitions for controls, gentle opacity and translate reveals for sections, and path drawing for the differentiation journey. The hero visual may use an extremely slow breathing scale. Challenge cards should expand with a measured rise rather than a dramatic pop. Respect reduced-motion settings by switching to instant state changes and static diagrams.

### Typography System
Use Vazirmatn for Persian and IBM Plex Sans for English. Large display headlines should be 700 weight with tight but readable line-height. Body text should use 400–450 weight with generous line-height. Labels and scientific annotations should use 600 weight, uppercase Latin or small Persian caps where appropriate, and increased letter spacing only for Latin text.

### Brand Essence
Cell Story is a bilingual interactive field guide for university students who want to understand stem-cell science without losing its complexity. It is different because it turns difficult biology into a visual journey with responsible scientific framing.

Personality adjectives: curious, lucid, responsible.

### Brand Voice
Headlines should be concise, evocative, and grounded. CTAs should invite investigation rather than promise outcomes. Microcopy should sound like a patient scientific guide.

Example lines:
- «از یک سلول، داستانی برای آینده‌ی پزشکی» / “From one cell, a story about the future of medicine.”
- «امید آزمایشگاهی، هنوز درمان تأییدشده نیست.» / “Laboratory promise is not yet validated treatment.”

### Wordmark & Logo
Create a text-free logo mark: a small offset ring intersected by a single branching line, suggesting a cell membrane and a lineage path. It should work as a compact icon in the header and favicon, with Aqua Cobalt as the primary mark color and an ivory reverse version for dark mode.

### Signature Brand Color
Aqua Cobalt — #0F9FB0.

## Implementation reminder

Use this design philosophy in every component and stylesheet. The page should feel like an interactive scientific atlas: editorial, tactile, precise, and humane. When uncertain, ask: “Does this choice make the biology clearer, or does it merely add decoration?”
