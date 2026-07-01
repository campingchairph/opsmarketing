# Assetline Capital — Marketing Hub: Skills & Workflow Guide

> **Who this is for:** Someone being onboarded to the marketing coordinator role at Assetline Capital. This guide covers every tool, workflow, and skill embedded in the Marketing Hub dashboard — what it does, when to use it, and what to watch out for.

---

## Table of Contents

1. [What the App Is](#1-what-the-app-is)
2. [How to Navigate](#2-how-to-navigate)
3. [Daily Ops](#3-daily-ops)
4. [Salesforce EDM — Designed Email Send](#4-salesforce-edm--designed-email-send)
5. [EDM Reporting](#5-edm-reporting)
6. [Plain Text Email](#6-plain-text-email)
7. [Brand & Compliance](#7-brand--compliance)
8. [Brief Intake](#8-brief-intake)
9. [AI Write & QC](#9-ai-write--qc)
10. [Analyze Tab](#10-analyze-tab)
11. [Skills AI Chat](#11-skills-ai-chat)
12. [Text Compare](#12-text-compare)
13. [Survival Kit](#13-survival-kit)
14. [Right-Side Drawers](#14-right-side-drawers)
15. [AI Settings & Key](#15-ai-settings--key)
16. [Task Reminder Panel](#16-task-reminder-panel)

---

## 1. What the App Is

The Marketing Hub is an internal web app built specifically for the Assetline Capital marketing coordinator role. It is **not** a generic project management tool — every page, checklist, and workflow is designed around the actual tasks this role does day-to-day.

The app runs in the browser from a local file. No login required. Data is saved in your browser's localStorage — it stays on your machine.

**What it covers:**
- Step-by-step guided workflows for every major task
- QC checklists for brand, compliance, copy, and layout
- AI writing and analysis tools (powered by Groq — free)
- Campaign classification and instruction analysis
- A personal mistakes log with AI-powered task reminders
- Timesheet logging, message templates, and quick notes

**Key people you'll interact with:**
- **Petro** — Marketing Lead. Sends briefs, reviews test emails, gives final approval for all EDM sends. All deliverables go to Petro first.
- **Laura Stanley** — National Director, Private Lending. Sender of plain text broker outreach emails.

---

## 2. How to Navigate

The sidebar has four sections — you can **drag and drop** tabs within each section to reorder them based on how often you use them. Your order is saved automatically.

| Section | What's in it |
|---|---|
| **Workflow** | Daily Ops, Salesforce EDM, EDM Reporting, Plain Text Email |
| **Brand Tools** | Brand & Compliance, Brief Intake, AI Write & QC, Analyze |
| **Reference** | Skills AI, Tools, Monday.com, Glossary, What Good Looks Like, Text Compare |
| **Survival Kit** | First Week Guide, Message Templates, Timesheet |

The **header** shows two clocks — Manila time and Sydney time. You can manually adjust either hour by hovering over the time and using the up/down arrows (auto-resets to live time after 5 seconds). Blue clock = manual mode. Useful when Petro says "send it at 9 AM Sydney" — you can instantly see what time that is for you.

---

## 3. Daily Ops

**Where:** Sidebar → Workflow → Daily Ops

Three checklists to run through every working day:

### Morning Routine
1. Review overnight emails — flag anything urgent, escalate to Petro if needed
2. Check the shared folder for new briefs — prioritise by deadline
3. Review campaign timelines — flag any risk of missing a deadline today or tomorrow
4. Check the CRM for data issues or pending uploads
5. Check the event calendar — any reminders or RSVPs due today?

### Core Tasks (during the day)
1. Execute approved content updates or email schedules — website, platforms, email tool
2. Update all trackers: campaign, event, contact, and asset trackers
3. Process pending invoice submissions
4. Respond to supplier queries using pre-approved briefs
5. QC any material before it goes to Petro — logo correct? Disclaimer present? On-template?

### End of Day
1. Update all open task statuses and trackers
2. Flag any blockers or delays to Petro **before** EOD — not after
3. File all approved materials to the correct shared folder
4. Confirm tomorrow's key deadlines and prep templates

> **Key rule:** If a deadline is at risk, say so at least 3–4 hours before it hits. A one-liner is fine: "I'm stuck on X — guidance needed."

---

## 4. Salesforce EDM — Designed Email Send

**Where:** Sidebar → Workflow → Salesforce EDM

This is the most important workflow. It covers the full process of taking a designed HTML email from Petro and getting it sent to the broker database through Salesforce Account Engagement (formerly Pardot).

There are 16 steps across 7 phases. A **right-side panel** shows step-by-step instructions as you click each phase step. You can also add personal notes per step — these are saved and persist between sessions.

---

### Phase 1 — Receive & Open Files

**Step 1 — Receive the ZIP from Petro via Teams**
- Petro sends a Teams message with a ZIP file
- The message includes: the HTML file, campaign name, send date and time
- Update the **Campaign Details** card at the top of the page with the campaign name and any sender changes Petro specifies

**Step 2 — Extract and open both files in Chrome**
- Open the date-named folder inside the ZIP
- Find `index.html` and `plain-text-version.txt`
- Right-click each → **Open with Google Chrome**
- Keep both Chrome tabs open throughout the entire process

---

### Phase 2 — Create the Template

**Step 3 — Create new template in Account Engagement**
- Navigate: Account Engagement → Email → Templates → New
- **Name:** `YYMMDD_Description`
- **Campaign:** copy exactly from the Campaign Details card
- **Tracker domain:** `go.assetline.com.au` (confirm it's the default)
- Click Save

**Step 4 — Skip the layout step**
- On the next screen after creating the template, skip the layout step entirely
- The HTML already contains the full email structure — no layout template is needed

**Step 5 — Build the email: subject, HTML, plain text**
- **Subject line:** use the Chrome tab title of `index.html` — type it exactly, check spelling
- **HTML tab:** Chrome → click in the email body → View Page Source → Select All → Copy → go to the HTML tab in Salesforce → delete existing content → paste → Save
- **Text tab:** Chrome plain-text tab → Select All → Copy → go to the Text tab → paste → Save

---

### Phase 3 — Review & Fix

**Step 6 — Check in the Editor tab**
- Go to the Editor tab — the email should appear
- Check wording, content accuracy, and layout
- Minor spacing glitches in the editor are normal and won't appear in the actual sent email

**Step 7 — Add missing links (especially LinkedIn)** ⚠
- Check **every** clickable icon for missing URLs
- The **LinkedIn icon frequently comes through without a URL** — add `linkedin.com/company/assetline-capital` manually every single time
- Do not assume any icon has its link intact — check them all

**Step 8 — Verify merge fields in the Preview tab**
- Go to the Preview tab → select a sample prospect (e.g. Billy)
- Confirm the first name merge field renders correctly
- Merge fields won't display in test emails — the Preview tab is the only way to verify them
- Save

---

### Phase 4 — Sender Setup

**Step 9 — Set sender details in the Sending tab** 🔴 Critical
- Go to the Sending tab
- Copy values from the Campaign Details card at the top of the page — Petro provides these for each send
- Set: Sender name → Save / Sender email → Save / Reply-to → Save
- These details change campaign to campaign — always read from the card, never assume

---

### Phase 5 — Test & Publish

**Step 10 — Send test email to YOURSELF only**
- Send a test email to yourself only — **do not send to Petro yet**
- Check: design and layout, all links work, wording is correct, merge fields visible, no errors

**Step 11 — Publish the template**
- Once you're happy with your own test, click **Publish** from the Editor tab
- **Publishing does NOT send the email** — it only makes the template available to use in a Send
- Nothing goes to recipients at this point

---

### Phase 6 — Build the Send

**Step 12 — Create a new Send in the Sends tab**
- Navigate: Sends tab → New Send
- **Name:** `YYMMDD_Description` (same as the template)
- **Campaign:** same campaign from the Campaign Details card
- Save

**Step 13 — Apply template, then notify Petro for his test review**
- In the Send, search for the template by name, select it, and apply
- Subject, HTML, text, and sender details all carry over automatically
- **Now** send a test email to Petro — this is the first time Petro sees it
- Use a message from the notification widget on the page and send it in Teams

**Step 14 — Add all 4 recipient lists** 🔴 Critical
Add ALL four of these, every single time:
1. All Brokers (Leads + Contacts)
2. James Green Database
3. Assetline Team Managerial/Executive
4. State Managers

Do not skip any. All 4 — every send.

**Step 15 — Run Final QA using the checklist on the page**
- The page has a QA checklist — all items must be confirmed before sending or scheduling

---

### Phase 7 — Send or Schedule

**Step 16 — Send now or schedule** 🔴 Critical
- **Send now** — sends immediately
- **Schedule** — use when Petro specifies a date and time
- ⚠ **Timezone:** Salesforce uses your local timezone. If the email goes at 9 AM Sydney time and you're in the Philippines, subtract 3 hours → schedule at 6 AM your time
- Confirm the timezone offset with Petro when scheduling for the first time

---

### EDM Filename Generator (AI)

At the top of the Salesforce EDM page is an AI tool: **EDM Filename Generator**.
- Paste the raw email content (HTML or plain text)
- The AI extracts: the headline phrase, the product category (Horizon Mortgages / Private Lending / Development Finance / Bridging), and the topic keyword
- Outputs a ready-to-use filename in the correct naming convention
- Also shows a breakdown of each filename part with confidence indicators

---

## 5. EDM Reporting

**Where:** Sidebar → Workflow → eDM Reporting

Used after an email campaign is sent. This page lets you build a campaign performance report.

**What to fill in:**
- Report period (start and end month)
- Per-campaign entries: campaign name, send date, subject line, opens, clicks, unsubscribes, bounces, click map image

**Features:**
- Saves all entries to localStorage — data persists between sessions
- Export the report as a formatted view
- Load previously saved reports using the save/load system
- Upload a click map image per campaign (drag and drop)

**When Petro asks for results:** fill in the metrics from Salesforce, export, and share.

---

## 6. Plain Text Email

**Where:** Sidebar → Workflow → Plain Text Email

Plain text emails are sent through **Email Content** (not Account Engagement Email). They are for **broker outreach** and appear as if they come directly from a specific person — e.g. Laura Stanley, National Director – Private Lending. No HTML blocks, no designed layout — just body copy and a signature via merge fields.

> The customer receives only the HTML. The plain text body is for **internal Salesforce records only** — it shows on contact records so you can see what was sent without loading the full HTML.

### Workflow (5 steps)

**Step 1 — Clone the previous email**
- Account Engagement → Content → Email Content
- Find the most recent email for the same product
- Click the dropdown arrow → Clone
- Enter the new name (naming convention) → Save

**Step 2 — Update the subject line**
- Open the cloned email → Edit → New Email Experience (pre-selected, just click through)
- Click the edit icon on the subject line field
- Copy the subject from the Word document provided → paste → Save

**Step 3 — Update the email body** ⚠ body only
- Edit **only the first block** — the body copy
- Everything below (sender name, title, email, phone) uses merge fields — **do not touch these**
- Delete old body copy → paste new body copy from the Word document → fix spacing → Save
- The email typically ends at "chat soon" or similar — don't duplicate if it's already in the template

**Step 4 — Sync the plain text body** (required)
- In the email view → Text Body section → click the pencil icon
- Click **Sync from HTML** → Confirm → Save
- This makes the internal plain text record match the email body

**Step 5 — Notify for sending**
- Copy the link to the email record and let the sender know it's ready
- You do not send the email yourself — the sender (e.g. Laura) handles activation and sending

---

## 7. Brand & Compliance

**Where:** Sidebar → Brand Tools → Brand & Compliance

A full QC checklist covering every brand and compliance requirement for Assetline materials. Run through this before submitting any deliverable to Petro.

### Brand Checklist

| Check | What to look for |
|---|---|
| Logo | Current single-colour version with full stop. **No orange dot** (retired). No stretch, rotation, or effects. Downloaded from the approved shared folder — never from a previous job or email. |
| Fonts | Silvana Text (display) + ABC Diatype (body) only. Type → Find Font — resolve any substituted fonts before exporting. |
| Colours | #E4572E orange, #191919, #FAFAF2, and approved neutrals only. No RGB in print jobs. Delete unused swatches. |
| Template | Correct Assetline template from the shared folder. Never use a personal copy, an old version, or an emailed file. |
| Paragraph styles | All text must use styles from the Assetline style sheet. No manually overridden text (look for the + indicator in the Paragraph Styles panel). |

### Copy Checklist

| Check | What to look for |
|---|---|
| Copy matches brief | Word-for-word match. Print the approved copy doc and compare side-by-side. Any copy change must be re-approved. |
| Disclaimers present | AFSL number, general advice warning, and any product-specific disclosure — verbatim, not paraphrased. |
| Spelling/grammar | Australian English. Spell check + manual read — spell check misses "form" vs "from", wrong names, wrong rates. |
| No placeholder text | Search for "Lorem ipsum", "TBC", "XXX", "[insert", "PLACEHOLDER". Common miss on deadline-rushed jobs. |
| Dates, figures, rates | Cross-check every number against the brief. Wrong rates are a compliance issue. |

### Layout Checklist

| Check | What to look for |
|---|---|
| No overset text | Red + indicator on any text frame = text is cut off. Fix before submitting. |
| No reflow or broken layouts | Scroll every page — check nothing jumped from a late copy change. |
| Images linked and current | Window → Links panel — no warning icons. Re-link any missing images. |
| Image resolution | Effective PPI 300+ for print. Below 200 PPI = flag. |
| Page numbers | Correct and sequential. |
| No guides or artefacts | View → Screen Mode → Preview before exporting. |

### Preflight & Export Checklist

| Check | What to look for |
|---|---|
| InDesign Preflight = zero errors | Window → Output → Preflight. Resolve all errors (red dot). |
| Correct PDF preset | Print: PDF/X-1a or PDF/X-4 with correct bleed. Digital: High Quality Print. |
| Bleed set correctly (print) | 3mm on all sides. Backgrounds/images must extend into bleed. |
| Exported PDF reviewed | Open in Acrobat. Scroll every page. Never assume the export was clean. |
| File saved and packaged | File → Package. Name folder correctly per naming convention. |

### Compliance QC

Specific items required for every Assetline output:
- Current logo (single-colour, full stop, from shared folder)
- General advice warning — verbatim
- AFSL number visible
- Correct brand fonts
- Correct colour palette
- Template from shared folder (not a personal copy)
- Written copy approval from Petro before placing in design
- Written sign-off recorded before distributing or publishing — email or shared doc only

---

## 8. Brief Intake

**Where:** Sidebar → Brand Tools → Brief Intake

Use this **every time you receive a new task**. It captures all the information you need before starting work so nothing gets missed.

Fill in:
- Task type and description
- Who assigned it (Petro or other)
- Deadline
- Deliverable format
- Any special notes or constraints

Saved entries appear below the form. You can review past briefs directly on the page.

> **Rule:** Fill this in before you start any task, not after. It takes 2 minutes and prevents the "I didn't realise that was needed" problem.

---

## 9. AI Write & QC

**Where:** Sidebar → Brand Tools → AI Write & QC

Requires a Groq API key (free at console.groq.com). Set it via the **AI Settings** button in the sidebar footer.

Five AI-powered tools:

### EDM Filename Generator
- Paste full email content (HTML or plain text)
- AI extracts the headline phrase, product category, and topic keyword
- Outputs a correctly formatted filename + breakdown of each part
- Product categories: Horizon Mortgages / Private Lending / Development Finance / Bridging

### EOD Wrap Generator
- Describe what you did today in plain language
- AI writes your end-of-day sign-off message in a casual, natural tone
- Copies to clipboard

### Broker Email Writer
- Paste your bullet points or notes
- AI writes a full broker email with subject line
- Output is editable

### Test Email Writer (QC Manager Note)
- Fill in the template name, test date, and any QC notes
- AI writes the short message to attach when forwarding a test email to Petro for sign-off
- Copies to clipboard

### Message Reply Writer
- Paste a message you received
- Optionally add your intent / key points you want to convey
- Add who sent it (e.g. "Petro, my manager")
- AI writes a natural, casual reply — not corporate, just how you'd actually talk

---

## 10. Analyze Tab

**Where:** Sidebar → Brand Tools → Analyze

Two tools in one tab, switched with the sub-tab bar at the top.

### Instruction Analyzer

Paste any instruction, task brief, email, or Teams message. The AI reads it and extracts:

- **Job type** — what kind of task is this?
- **Summary** — 2–3 sentence plain-English explanation of what's being asked
- **Deadline** — extracted from the text if mentioned
- **Priority** — inferred from urgency language (high / medium / low)
- **From** — who sent or assigned it
- **Links & files** — any URLs or file paths mentioned
- **Key information** — every concrete detail: campaign name, send date, file names, audience, product, format specs, approval contact
- **Watch out for** — anything unclear, missing, or that needs clarification before starting
- **Suggested reply** — a short, casual acknowledgment you can send back, with a natural question if anything is missing

Use this whenever you receive a long or complicated instruction and want to make sure you've understood everything before starting.

### Campaign Classifier

Paste either:
- **Plain text email copy** (from a Word doc or Teams message)
- **Full HTML EDM source** (paste the entire HTML file content)

The AI classifies which of the four Assetline campaign pushes the email belongs to:

| Campaign | Description |
|---|---|
| **Horizon Mortgages** | Long-term property-backed lending for self-employed borrowers, trusts, SMSFs, complex income |
| **Development Finance** | Ground-up builds, construction, site acquisition to completion |
| **Private Lending** | Short-term capital $500k–$40m secured against property — fast deployment |
| **Bridging Loans** | Buy before you sell / Equity Release — individual borrowers making life decisions |

**Output includes:**
- Campaign name (colour-coded)
- Sub-product if applicable
- Confidence score (0–100%)
- Signals — what copy cues pointed to that campaign
- Misalignments — anything that's off-tone for the campaign
- Suggested fix — one sentence on how to tighten the alignment

For HTML EDMs: the tool strips the HTML, extracts Pardot region text blocks, subject line, and preheader automatically before classifying.

---

## 11. Skills AI Chat

**Where:** Sidebar → Reference → Skills

A chatbot that knows everything in the app — all Salesforce EDM steps, the plain text email workflow, brand checklist items, compliance requirements, saved notes, timesheet history, and any skill guides you've added to the Skill Library.

**Use it for quick questions like:**
- "What do I do after I publish the template?"
- "What lists do I add to the Send?"
- "What's the LinkedIn URL for Assetline?"
- "What does the brand guide say about font usage?"

### Skill Library
Below the chat is a **Skill Library** — a personal log where you can paste in any workflow guide, checklist, or reference material you want the AI to know about. Add a title + paste the content. The AI can reference it in its answers.

---

## 12. Text Compare

**Where:** Sidebar → Reference → Text Compare

Three comparison modes:

### Text Compare
- Paste two versions of any text — email copy, disclaimers, rate card data
- Highlights line-by-line changes, with word-by-word diff on modified lines
- Use when checking if the copy you've been given matches what's already live

### Doc / PDF Compare
- Upload two Word (.docx) or PDF files
- Text is extracted from each file in-browser (no upload to any server)
- Runs the same diff on extracted text
- Good for comparing two versions of a rate card or T&C document

### Image Compare
- Upload two images
- Three views: side by side, swipe comparison, pixel difference overlay
- Use for spotting layout shifts or artwork changes between versions

---

## 13. Survival Kit

### First Week Guide
**Where:** Sidebar → Survival Kit → First Week Guide

A day-by-day guide for the first week in the role — what to focus on each day, who to meet, what to set up, and what to avoid in the early days.

### Message Templates
**Where:** Sidebar → Survival Kit → Message Templates

Ready-to-copy professional messages for common situations:
- Requesting approval
- Flagging a blocker
- Sending a deliverable
- Following up on feedback
- Acknowledging a brief
- Notifying of a delay

Copy any template directly from the page and customise the placeholder details.

### Timesheet
**Where:** Sidebar → Survival Kit → Timesheet

Log hours worked each day using the calendar view. Click any date to add or adjust time. The app tracks running totals by day and week. The Skills AI also has access to your recent timesheet data.

---

## 14. Right-Side Drawers

Three drawers accessible from the right edge of the screen at any time.

### Quick Notes
Tab labelled **Notes** on the right edge. Three note pads:
- **Today** — quick notes for the current day
- **Clips** — copy snippets, URLs, anything you want to paste later
- **This Week** — running list for the week

All notes auto-save as you type.

### Mistakes Log
Tab labelled **Mistakes** on the right edge.

Contains two sections:
1. **Preloaded mistakes** — a set of common marketing coordinator mistakes and their fixes (covering email campaigns, InDesign, events, CRM data, website, and general work habits)
2. **Personal mistakes** — your own entries. Add them as you encounter real situations on the job.

**Format for each entry:**
- What task were you doing?
- What went wrong?
- What would have caught it?

The mistakes log feeds directly into the **Task Reminder Panel** (see below).

### 90-Day Tracker
Tab labelled **90 Days** on the right edge. A progress tracker for your first 90 days in the role — by week, with milestones and checkpoints.

---

## 15. AI Settings & Key

**Where:** Sidebar footer → AI Settings button

The app uses **Groq** for all AI features. Groq is free and fast.

1. Go to [console.groq.com](https://console.groq.com) and create a free account
2. Generate an API key
3. Paste it in the AI Settings panel in the app
4. The key is stored locally in your browser — it's never sent anywhere except to Groq when you use an AI feature

All AI features show an **AI** badge and are clearly labelled. If the key isn't set, the feature will prompt you to add it.

---

## 16. Task Reminder Panel

A floating panel that appears in the bottom-right corner when you navigate to one of three task pages: **Salesforce EDM**, **EDM Reporting**, or **Plain Text Email**.

**What it does:**
- Reads all entries from your Mistakes Log (both preloaded and personal)
- Uses Groq to identify which mistakes are relevant to the specific task you're working on
- Converts them into short, actionable "watch for" reminders specific to that task
- Displays them as a compact floating checklist while you work

**Behaviour:**
- Results are cached — instant on return visits
- If you add a new mistake to the Mistakes Log, the panel automatically re-analyzes
- Use the **Refresh** button to force a new analysis at any time
- Click the panel header to collapse it if it's in the way

**Example:** If you log a mistake that says "the Word doc for plain text had two pages and I only checked the first one," next time you're on the Plain Text Email page the reminder panel will show something like: *"Check the Word doc has all pages — not just page 1."*

---

## Quick Reference: Key Rules

| Rule | Detail |
|---|---|
| **All Petro approval first** | No material goes live without written sign-off from Petro |
| **LinkedIn link always missing** | Manually add it every single EDM send — Step 7 |
| **4 recipient lists always** | All Brokers + James Green + Assetline Executive + State Managers |
| **Timezone for scheduling** | Salesforce uses local time — subtract 3 hours from Sydney time if in Manila |
| **Plain text body = internal only** | The customer doesn't see it — Sync from HTML, it's for CRM records |
| **Never use personal copies** | Always re-download logo, templates, and assets from the shared folder |
| **Flag blockers early** | Say something 3–4 hours before a deadline — not after |
| **Written approval only** | Verbal or Slack "looks fine" is not approval for any Assetline output |

---

*Last updated: June 2026 — reflects Marketing Hub app version as of this date.*
