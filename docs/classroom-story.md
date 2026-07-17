# SLAI Prototype — Classroom Story

**This is the single source of truth for all mock data in the SLAI prototype.**
Before changing any student name, session name, quote, WIDA score, CCSS verdict,
participation value, action prompt, or insight text in any mock data file — update
this file first.

---

## The Classroom

| Field    | Value |
|----------|-------|
| Teacher  | Ms. Carter |
| School   | Jefferson Elementary, San Jose, CA |
| Class    | Grade 3/4 split |
| Language | English only — does not speak Spanish or Mandarin |
| Context  | Title I public school, high multilingual population |
| Note     | Ms. Carter relies on SLAI to understand what her Spanish and Mandarin speaking students are reasoning through in their home languages. |

---

## The Students

| Name  | Grade | Home Language | WIDA Level | Background |
|-------|-------|---------------|------------|------------|
| Liam  | 3     | English       | Native     | Quick with numbers, answers fast, leaves little room for others. Not an ELL. Quick procedural answers in every session — CCSS Not Yet across all sessions because he has never independently explained a concept. |
| Rosa  | 4     | Spanish       | 4.1        | Second-generation Mexican-American. Bilingual and confident. Natural explainer. Uses family context to anchor math concepts. |
| Diego | 3     | Spanish       | 2.8        | Immigrated from Guadalajara 10 months ago. Strong math background — CCSS Met across all sessions. Very low English production — WIDA Not Yet throughout — often silent in mixed groups even when he knows the answer. |
| Sofia | 4     | Spanish       | 4.3        | Born in San Jose to immigrant parents. Heritage Spanish speaker. Strong in both languages. Naturally scaffolds peers. |
| Mei   | 3     | Mandarin      | 2.6        | Immigrated from Shenzhen 14 months ago. Excellent mathematical intuition. Nearly silent in class. |
| Kevin | 4     | Mandarin      | 3.5        | Immigrated from Beijing 3 years ago. Comfortable code-switching. Acts as an informal bridge for Mei. |

**Removed from prototype:** Fatima (formerly session 3 only — fully removed).

---

## The Sessions

### Session 1 — Equal Groups | Mon Week 1
- **Group:** Liam, Mei, Diego
- **Standard:** 3.OA.A.1
- **Languages:** English, Mandarin, Spanish
- **Source ID:** `s1-equal-groups`

**What happens:** Liam answers every question immediately, leaving Mei and Diego invisible. Diego whispers the correct answer in Spanish — CCSS Met, but WIDA Not Yet (no English production). Mei draws a correct array but says nothing. Liam answers correctly but cannot explain what the numbers represent — CCSS Not Yet despite a confident delivery.

**What Ms. Carter learns:** Her two quietest students may understand more than they can show in English. Her most vocal student may know less than his answers suggest.

---

### Session 2 — Equal Sharing | Wed Week 1
- **Group:** Rosa, Diego, Sofia
- **Standard:** 3.OA.A.2
- **Languages:** Spanish only (monolingual group — intentional)
- **Source ID:** `s2-equal-sharing`
- **Special:** Monolingual callout — Ms. Carter cannot understand this conversation in real time. SLAI translated and analyzed the full discussion.

**What happens:** Diego leads for the first time. Uses his grandmother dividing tamales as an anchor. Sofia challenges and sharpens the explanation. Rosa connects it to the formal definition. Ms. Carter cannot understand any of it in real time.

**What Ms. Carter learns:** Diego is not a struggling math student. He is a fluent math thinker who has been misread as low-ability because he cannot yet express himself in English.

---

### Session 3 — Division 12÷3 | Fri Week 1
- **Group:** Mei, Liam, Rosa, Kevin
- **Standard:** 3.OA.A.2
- **Languages:** Mandarin, English, Spanish
- **Source ID:** `mock-source-5`

**What happens:** Rosa explains equal sharing using tortilla-making. Mei says only "四。" (Four). Liam answers procedurally. Kevin restates Rosa's explanation formally ("12 divided by 3 means splitting 12 into 3 equal groups — each group gets 4.").

**What Ms. Carter learns:** Individual WIDA and CCSS breakdowns per student. Cultural connections surface reasoning she would have missed.

---

### Session 4 — Division with Remainders | Mon Week 2
- **Group:** Mei, Kevin, Diego
- **Standard:** 3.OA.A.2 extended
- **Languages:** Mandarin, Spanish
- **Source ID:** `s4-div-remainders`

**What happens:** Kevin bridges between Mei and Diego in real time — speaks Mandarin to check Mei's understanding, restates in English. Diego produces his first English academic language ("Three groups... each group has four."). Mei explains remainders correctly in Mandarin.

**What Ms. Carter learns:** Peer scaffolding across languages reaches students she cannot. Removing Liam from the group changed the dynamic entirely.

---

### Session 5 — Multiplication & Division | Wed Week 2
- **Group:** Liam, Rosa, Diego, Mei, Kevin, Sofia (all 6)
- **Standard:** 3.OA.B.6
- **Languages:** English, Spanish, Mandarin
- **Source ID:** `s5-mult-div`

**What happens:** Ms. Carter acts on every prior action prompt. Mei uses an English sentence frame for the first time ("I divided 28 into 4 equal groups, so each group has 7."). Diego builds on Rosa unprompted — CCSS Met again, WIDA still Not Yet (English production is emerging but below threshold). Participation is the most balanced of any session. Liam answers correctly but still cannot explain the concept — CCSS Not Yet for the third consecutive session.

**What Ms. Carter learns:** Every intervention worked. Her quietest students are blossoming. And her most confident student has never independently demonstrated conceptual understanding.

---

## The Through-Line

| Session | Core Insight |
|---------|-------------|
| Session 1 | Her quietest students understand more than they can show |
| Session 2 | Diego is not struggling at math — he is struggling at English |
| Session 3 | Individual WIDA and CCSS breakdowns per student |
| Session 4 | Peer scaffolding across languages reaches students she cannot |
| Session 5 | Her interventions worked — and her most confident student has never independently met CCSS |

---

## Key Product Moments

These are the moments to highlight during a demo:

- **Session 2 monolingual callout** — Ms. Carter cannot understand this conversation in real time. SLAI translates and surfaces the insights.
- **Diego's Session 1 whisper** — correct answer in Spanish, invisible without SLAI.
- **Mei's Session 5 sentence frame** — first English academic production, traceable to a prior action prompt.
- **Kevin's real-time bridging in Session 4** — peer scaffold across two languages.
- **Liam's persistent CCSS gap** — correct answers in every session, CCSS Not Yet in every session. The surprise ending of the story.

---

## Data File Map

| File | Contents |
|------|----------|
| `lib/mock/student-progress-data.ts` | Student longitudinal data, SESSION_LABELS, STUDENT_ORDER |
| `lib/mock/data.ts` | MOCK_SOURCES, MOCK_TRANSCRIPTS, MOCK_SUMMARIES, MOCK_GOALS, MOCK_SPEAKERS |
| `lib/mock/chat.ts` | mockChat() for Q&A tab |
| `lib/mock/vidyamap-data.ts` | VidyaMap concept graph data (not classroom story data) |