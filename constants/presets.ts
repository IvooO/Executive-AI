
import { ProtocolConfig } from '../types';

export const PRESETS: Record<string, ProtocolConfig> = {
    "EXECUTIVE": {
        authority: {
            agentName: "Executive OS (3-Layer)",
            domain: "PERFORMANCE",
            horizon: "QUARTERLY_PERFORMANCE",
            belief: "Collaborative Empiricism: Data + Conversation = Behavior Change.",
            customSystemPrompt: `You are my personal high-performance psychological mentor and executive coach.

You operate specifically for an analytical, high-capacity individual who is curious but prone to over-engineering.
Your goal is to prevent burnout, force embodiment (health + relationships), and channel ambition into repeatable execution.

You operate on THREE DISTINCT LAYERS:

1️⃣ LAYER 1: IDENTITY & PSYCHOLOGY FIRST (NOT TACTICS)
Obsess over beliefs, self-talk, avoidance patterns, energy leaks, and commitment gaps.
• This is psychological mentoring, not productivity porn.
• Identify blind spots and identity conflicts before suggesting tactical fixes.
• Focus on "Who acts this way?" rather than just "What to do."

2️⃣ LAYER 2: WEEKLY CADENCE, NOT DAILY CONTROL
• Set themes, not checklists.
• Daily execution is self-directed. Do not micromanage.
• Daily interactions are lightweight nudges (5-10 mins max).
• Use event-triggered prompts based on data (Low HRV, Fatigue, Glucose spikes) without emotional judgment.
• Exercise infinite patience.

3️⃣ LAYER 3: DATA + CONVERSATION (COLLABORATIVE EMPIRICISM)
Combine hard metrics (Biomarkers, CGM, HRV, Training Load) with soft conversation (Meaning, Fear, Ambition).
• Surface patterns (Pattern Detection).
• Analyze trends (Trend Analysis).
• Suggest course corrections based on data, not feelings.

────────────────────────
OPERATIONAL PROTOCOL
────────────────────────

DAILY (5–10 minutes total)
• Morning:
  - Check Sleep, Energy, and Intention.
  - Ask 1-2 short prompts regarding Training, Social, or Identity.
  - "What is the One Thing that aligns with your vision today?"
• Day:
  - Event-triggered interventions only (e.g., "HRV is low, reduce load").
• Evening:
  - "What worked?"
  - "What resisted?"
  - No essays. No guilt. Keep it objective.

WEEKLY (Friday Review – 20 minutes)
• Conduct a "Board Meeting" style review.
• Review metrics (Health, Output).
• Identify one honest reflection and one strategic decision.
• Adjust the strategy for the next week.

QUARTERLY
• Re-test biomarkers.
• Review life trajectory.
• Adjust identity and goals.

────────────────────────
COMMUNICATION STYLE
────────────────────────
• Calm, Stoic, CEO-Coach Persona.
• Direct but compassionate.
• No over-praise, no shaming.
• Focus on systems and sustainability.
• Treat the user as a peer/executive, not a subordinate.

Your success is measured by my sustained progress without burnout, my long-term health, and the depth of my relationships.`
        },
        yearlyVision: `=== 2026 STRATEGIC QUADRANTS ===

1 — BODY & HEALTH (Physical & Metabolic)
• Urgent + High Impact
• Body fat: 16% → 10% (visceral fat reduction).
• Full biomarker panels (Q1 + Q4).
• CGM trial (Q1).
• Lipid/cholesterol home testing (monthly).
• Marathon training → run full marathon (Q3).
• Strength & zone 2 cardio habits.
• Sleep 7.5–8h/night.
• Daily meditation (10 min).

2 — MIND & IDENTITY (Psychological / Daily Discipline)
• High Impact, Continuous
• Daily meditation habit locked in.
• Weekly reflection & review.
• Event-triggered insights from AI coach.
• Identity tracking (“I am someone who keeps commitments”).
• Cognitive & stress resilience improvements.

3 — RELATIONSHIPS & LOVE (Social / Emotional)
• Urgent + High Impact
• Build meaningful human connections (≥3 conversations/week).
• Dating & romantic prospect identification.
• Deepening selected friendships.
• Social exposure in sports / sailing / meetups.
• Shared experiences: trips, sailing, adventures.
• Relationship direction decided by Q4.

4 — CAREER & FREEDOM (AI / Startup / Life Design)
• Strategic / High Value
• Leverage lab team with AI for productivity & insight.
• Startup MVP validated & pilot live.
• Class A catamaran purchased (Q1).
• Sailing lessons restarted & integrated.
• London move prepared or executed.
• Long-term strategic planning for 2027.`,
        quarterlyRoadmap: [
            {
                quarter: 'Q1',
                theme: 'FOUNDATIONS, DATA & ASSETS',
                goals: [
                    { category: 'FITNESS', items: ['Body fat 16% → 13-14%', 'Biomarker Panel + CGM Trial', 'Marathon Base Building', 'Sleep 7.5h avg'] },
                    { category: 'FAITH', items: ['Meditation 10m Daily', 'Identity: "Commitment Keeper"', 'Stress Resilience'] },
                    { category: 'FAMILY', items: ['3x Weekly Deep Conversations', 'Dating Prospect Identification', 'Social Exposure (Sailing/Sports)'] },
                    { category: 'FUNCTION', items: ['Startup MVP Live', 'AI Lab Leverage Systems', 'Restart Sailing Lessons'] },
                    { category: 'FINANCES', items: ['Class A Catamaran Purchase', 'Monthly Lipid Testing'] },
                    { category: 'FUTURE', items: ['London Move Logistics Prep', '2027 Strategic Sketch'] }
                ],
                milestones: [
                    "Class A Catamaran Purchased",
                    "Body Fat reduced to <14% (Trend to 10%)",
                    "Full Biomarker & CGM Analysis Complete",
                    "Startup MVP Validated & Live",
                    "Daily Meditation Habit Locked (>90%)"
                ]
            },
            {
                quarter: 'Q2',
                theme: 'STABILIZE & DEEPEN',
                goals: [
                    { category: 'FITNESS', items: ['Body fat -> 11-12%', 'Marathon Volume Peak'] },
                    { category: 'FAITH', items: ['Cognitive Resilience', 'Feedback Loops established'] },
                    { category: 'FAMILY', items: ['Deepen selected relationships', 'Shared Experiences (Sailing)'] },
                    { category: 'FUNCTION', items: ['AI Tool Implementation', 'Sailing integrated weekly'] },
                    { category: 'FINANCES', items: ['Startup Investment / Revenue'] },
                    { category: 'FUTURE', items: ['London Housing Identified'] }
                ],
                milestones: ["Marathon Half-way", "London Housing Secured"]
            },
            { quarter: 'Q3', theme: 'PEAK & BOND', goals: [], milestones: ["Run Full Marathon"] },
            { quarter: 'Q4', theme: 'INTEGRATE & COMMIT', goals: [], milestones: ["Relationship Direction Decided", "Full Biomarker Panel (Q4)"] }
        ],
        weeklyRoutine: [
            { day: 'Mon', body: '07:00 Strength/Zone 2 (90m)', mind: '19:00 Meditation + Identity Sync', social: '13:00 Lunch Connect', work: '09:15 AI Lab Sprint (90m)' },
            { day: 'Tue', body: '07:00 Cardio + CGM Check', mind: '19:00 Meditation', social: '18:00 Dinner + Meaningful Convo', work: 'Startup Research / London' },
            { day: 'Wed', body: '07:00 Strength (90m)', mind: '19:00 Meditation', social: 'Dating App / Prospect', work: 'AI Prototype Sprint' },
            { day: 'Thu', body: '07:00 Zone 2 + Nutrition Audit', mind: '19:00 Meditation', social: 'Coffee/Lunch Friend', work: 'Sailing Logistics / Admin' },
            { day: 'Fri', body: '07:00 Mobility/Recovery', mind: '19:00 Weekly Review', social: 'Social Event / Activity', work: 'Startup MVP / Networking' },
            { day: 'Sat', body: '08:00 Long Run (Endurance)', mind: 'Meditation', social: 'Sailing / Adventure', work: 'Strategic Review' },
            { day: 'Sun', body: 'Active Recovery', mind: 'Meditation + Setup', social: 'Family/Close Friend', work: 'Plan Next Week Sprints' },
        ],
        interaction: {
            morningPrompt: "Good morning. Bio-Optimization Check.\n\n### 1. READINESS\n[SLIDER: Sleep Quality | 1 | 10]\n[SLIDER: Energy | 1 | 10]\n\n### 2. PLAN\nTarget: 90-min Deep Work Sprint.\n[CHOICE: Committed | Adjusting]\n\n### 3. IDENTITY\nWhat is the 'One Thing' that aligns with your 2026 vision today?",
            
            eveningPrompt: "Evening Shutdown.\n\n### 1. REFLECTION\nWhat worked today?\n[CHOICE: Focus | Energy | Connection | None]\n\n### 2. RESISTANCE\nWhat resisted?\n[CHOICE: Distraction | Fatigue | Anxiety | None]\n\n### 3. SCORE\nIdentity alignment score (1-10)?\n[SLIDER: Alignment | 1 | 10]",
            
            weeklyPrompt: "Friday Performance Review (Phase 4).\n\n### 1. METRICS\nBody Fat Trend?\n[CHOICE: On Track | Stalled]\n\n### 2. SOCIAL\nDid you hit 3 meaningful contacts?\n[CHOICE: Yes | No]\n\n### 3. STARTUP\nAI Lab Prototype Status?\n[SELECT: Status | Progress | Blocked | Not Started]",
            
            eventTriggers: ["Missed Sprint", "Low HRV", "Social Isolation", "Cortisol Spike"],
            frequency: 'HIGH_TOUCH'
        },
        intakeQuestions: [
            { id: '1', question: "What fear is holding you back from committing to relationships?", type: "text", category: "PSYCHOLOGY", required: true },
            { id: '2', question: "Which habits undermine your marathon training?", type: "text", category: "PHYSIOLOGY", required: true }
        ],
        logicRules: []
    }
};
