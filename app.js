/* ══════════════════════════════════════
   MSC DASHBOARD — app.js
   All checklist data, localStorage, nav
══════════════════════════════════════ */

// ── CHECKLIST DATA ──────────────────────────────────────────────
const CHECKLISTS = {
  morning: [
    { id:'m1', label:'Review overnight emails + flag urgent items',      sub:'Reply or escalate to Marketing Lead if needed' },
    { id:'m2', label:'Check shared folder for new briefs',               sub:'Prioritise by deadline and dependency' },
    { id:'m3', label:'Review campaign timelines — deadlines today/tomorrow?', sub:'Notify Marketing Lead of any delay risk' },
    { id:'m4', label:'Check CRM for data issues or pending uploads',     sub:'' },
    { id:'m5', label:'Check event calendar — reminders or RSVPs due?',   sub:'' },
  ],
  core: [
    { id:'c1', label:'Execute approved content updates or email schedules', sub:'Website, platforms, email tool — only after approval' },
    { id:'c2', label:'Update all trackers (campaign, event, contact, asset)', sub:'' },
    { id:'c3', label:'Process pending invoice submissions for approval', sub:'' },
    { id:'c4', label:'Respond to supplier queries using pre-approved briefs', sub:'' },
    { id:'c5', label:'QC any material before it goes to Marketing Lead', sub:'Logo correct? Disclaimer present? On-template?' },
  ],
  eod: [
    { id:'e1', label:'Update all open task statuses and trackers', sub:'' },
    { id:'e2', label:'Flag any blockers or delays to Marketing Lead before EOD', sub:'' },
    { id:'e3', label:'File all approved materials to correct shared folder', sub:'' },
    { id:'e4', label:"Confirm tomorrow's key deadlines and prep templates", sub:'' },
  ],
  campaign_collateral: [
    { id:'cc1', label:'Use approved InDesign template — never recreate from scratch', sub:'' },
    { id:'cc2', label:'Apply correct logo version, fonts, colour palette from brand guide', sub:'' },
    { id:'cc3', label:'All copy approved before placing into layout', sub:'' },
    { id:'cc4', label:'Export PDF to correct spec (press-ready or digital)', sub:'' },
    { id:'cc5', label:'Save source file + export to designated shared folder', sub:'' },
    { id:'cc6', label:'Send to supplier using pre-approved brief if needed', sub:'' },
  ],
  event_setup: [
    { id:'es1', label:'Add event to shared calendar + notify relevant team members', sub:'' },
    { id:'es2', label:'Build invitation list from CRM + get Marketing Lead approval', sub:'' },
    { id:'es3', label:'Prepare and send invitations using approved template', sub:'' },
    { id:'es4', label:'Set up RSVP tracking spreadsheet / CRM record', sub:'' },
    { id:'es5', label:'Schedule reminder emails — 1 week out + 1 day out', sub:'' },
    { id:'es6', label:'Coordinate logistics with supplier via approved brief', sub:'' },
  ],
  event_materials: [
    { id:'em1', label:'Prepare name badges — check spelling against registration list', sub:'Cross-reference confirmed RSVP list' },
    { id:'em2', label:'Prepare signage using approved templates', sub:'' },
    { id:'em3', label:'Prepare printed attendee list (final headcount)', sub:'' },
    { id:'em4', label:'Confirm all supplier deliverables are on track', sub:'AV, catering, venue — confirm 48 hrs prior' },
  ],
  event_post: [
    { id:'ep1', label:'Reconcile final attendance vs RSVP list', sub:'' },
    { id:'ep2', label:'Update CRM with attendance records', sub:'' },
    { id:'ep3', label:'Prepare post-event follow-up list for Marketing Lead', sub:'' },
    { id:'ep4', label:'Submit supplier invoices for approval', sub:'' },
    { id:'ep5', label:'Archive all event materials in shared folder', sub:'' },
  ],
  qc_brand: [
    { id:'qb1', label:'Correct Assetline logo — "Assetline Capital." with full stop, single colour', sub:'No orange dot (retired). No stretch, rotation, or added effects. Downloaded from approved shared folder, not a personal copy.', badge:'critical' },
    { id:'qb2', label:'Brand fonts only — Silvana Text (display) + ABC Diatype (body)', sub:'Type > Find Font — resolve any substituted or missing fonts before exporting. Never use system defaults.' },
    { id:'qb3', label:'Brand colour palette only — #E4572E orange, #191919, #FAFAF2, and Assetline neutrals', sub:'Swatches panel: delete unused swatches. No RGB in print jobs. No off-brand hex values. Check brand guide if unsure.' },
    { id:'qb4', label:'Correct Assetline template used — not a personal copy or old version', sub:'Check master pages match the approved template. Margins, columns, and grid must align. Never work from an emailed or downloaded copy.' },
    { id:'qb5', label:'All paragraph/character styles from Assetline brand style sheet', sub:'No manually overridden text — check for + indicator in Paragraph Styles panel. Clear all overrides before submitting.' },
  ],
  qc_copy: [
    { id:'qc1', label:'All copy matches the approved brief — word for word', sub:'Print the approved copy doc and compare side-by-side. Never proof on screen only. Any copy change must be re-approved.', badge:'critical' },
    { id:'qc2', label:'Required disclaimer(s) present and correctly worded', sub:'Assetline materials require: AFSL number, general advice warning, and any product-specific disclosure. Do not paraphrase.', badge:'critical' },
    { id:'qc3', label:'No spelling or grammatical errors — Australian English', sub:'Edit > Spelling > Check Spelling. Manual read required — spell check misses "form" vs "from", wrong names, wrong rates.' },
    { id:'qc4', label:'No placeholder or dummy text remaining', sub:'Search for "Lorem ipsum", "TBC", "XXX", "[insert", "PLACEHOLDER". Edit > Find/Change. Common miss on deadline-rushed jobs.', badge:'common miss' },
    { id:'qc5', label:'Dates, figures, fund names and rates are correct and current', sub:'Cross-check every number against the approved brief. Rates and performance figures are regulated — wrong numbers are a compliance issue.' },
  ],
  qc_layout: [
    { id:'ql1', label:'No overset text', sub:'Red + indicator on any text frame = text is cut off. Fix before submitting — never hide it.', badge:'critical' },
    { id:'ql2', label:'No unintended text reflow or broken layouts', sub:'Scroll every page. Check nothing jumped or collapsed from a late copy change.' },
    { id:'ql3', label:'Images are linked and up to date — no missing or modified links', sub:'Window > Links panel. All links show no warning icon. Re-link any missing images.', badge:'common miss' },
    { id:'ql4', label:'Images are high resolution — no low-res or pixelated images', sub:'Links panel: Effective PPI 300+ for print, 72–150 for digital. Below 200 PPI for print = flag.' },
    { id:'ql5', label:'Page numbers are correct and sequential', sub:'' },
    { id:'ql6', label:'No visible guides, grids, or artefacts in export preview', sub:'View > Screen Mode > Preview before exporting.' },
  ],
  qc_preflight: [
    { id:'qp1', label:'Run InDesign Preflight — zero errors before export', sub:'Window > Output > Preflight. Resolve all errors (red dot). Warnings reviewed case by case.', badge:'critical' },
    { id:'qp2', label:'Exported using the correct PDF preset', sub:'Print: PDF/X-1a or PDF/X-4 with correct bleed. Digital: High Quality Print or smallest file size.', badge:'common miss' },
    { id:'qp3', label:'Bleed and slug set correctly (print jobs)', sub:'Typically 3mm bleed on all sides. Backgrounds/images must extend into bleed — no white edges.', badge:'print' },
    { id:'qp4', label:'Exported PDF reviewed on screen — every page, every spread', sub:'Open in Acrobat. Scroll through every page. Do not assume the export was clean.' },
    { id:'qp5', label:'File saved and packaged to designated shared folder', sub:'File > Package to collect all links and fonts. Name folder correctly per naming convention.' },
  ],
  compliance_qc: [
    { id:'cq1', label:'Assetline logo — current single-colour version with full stop', sub:'Not the old orange-dot version. Downloaded from approved shared folder. No distortion or recolouring.', badge:'critical' },
    { id:'cq2', label:'Required disclaimer(s) present — AFSL + general advice warning', sub:'For Assetline materials: general advice warning verbatim, AFSL number visible, product-specific disclosures if applicable. Do not paraphrase.', badge:'critical' },
    { id:'cq3', label:'Assetline brand fonts — Silvana Text (display) + ABC Diatype (body)', sub:'No system substitutions. If you don\'t have the fonts, request them from the lead — do not proceed without them.' },
    { id:'cq4', label:'Assetline colour palette only — #E4572E, #191919, #FAFAF2 and approved neutrals', sub:'No off-brand colours. Orange (#E4572E) is the only accent. Check against the brand guide on the Brand & Compliance page.' },
    { id:'cq5', label:'Correct Assetline template from shared folder', sub:'Never use a personal copy, an emailed version, or a file from a previous job. Re-download from source each time.' },
    { id:'cq6', label:'All copy approved in writing before placement in design', sub:'Written sign-off from Marketing Lead before the copy is placed. Chat or verbal "looks fine" does not count.' },
    { id:'cq7', label:'No spelling errors — Australian English, all figures verified', sub:'Rates, product names, fund names, and dates must match the approved brief exactly.' },
    { id:'cq8', label:'Formal written approval recorded before distributing or publishing', sub:'Email or shared doc sign-off only. Document it. Attach to the job file. This is required for every Assetline output.', badge:'critical' },
  ],
};

// ── LOCALSTORAGE ────────────────────────────────────────────────
const STORAGE_KEY = 'msc_checklist_v1';

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getLastReset() {
  return localStorage.getItem('msc_last_reset') || '';
}

function setLastReset() {
  localStorage.setItem('msc_last_reset', new Date().toDateString());
}

// Auto-reset daily checklists each new day
function checkDailyReset() {
  const today = new Date().toDateString();
  if (getLastReset() !== today) {
    const state = loadState();
    ['m1','m2','m3','m4','m5','c1','c2','c3','c4','c5','e1','e2','e3','e4'].forEach(id => {
      delete state[id];
    });
    saveState(state);
    setLastReset();
  }
}

// ── CHECKLIST RENDERING ─────────────────────────────────────────
function renderChecklist(containerId, items, sectionCountId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const state = loadState();
  container.innerHTML = '';

  items.forEach(item => {
    const done = !!state[item.id];
    const div = document.createElement('div');
    div.className = 'check-item' + (done ? ' done' : '');
    div.dataset.id = item.id;

    let badgeHTML = '';
    if (item.badge === 'critical')    badgeHTML = '<span class="ci-badge critical">critical</span>';
    else if (item.badge === 'warn')   badgeHTML = '<span class="ci-badge warn">flag</span>';
    else if (item.badge === 'common miss') badgeHTML = '<span class="ci-badge warn">common miss</span>';
    else if (item.badge === 'print')  badgeHTML = '<span class="ci-badge print">print only</span>';

    div.innerHTML = `
      <div class="check-box">
        <svg viewBox="0 0 12 12"><polyline points="1,6 4.5,10 11,2"/></svg>
      </div>
      <div>
        <div class="ci-label">${item.label}${badgeHTML}</div>
        ${item.sub ? `<div class="ci-sub">${item.sub}</div>` : ''}
      </div>`;

    div.addEventListener('click', () => {
      const s = loadState();
      if (s[item.id]) delete s[item.id];
      else s[item.id] = true;
      saveState(s);
      div.classList.toggle('done');
      if (sectionCountId) updateSectionCount(containerId, items, sectionCountId);
      updateAllStats();
      // refresh page progress bar
      const activePage = document.querySelector('.nav-item.active')?.dataset?.page;
      if (activePage) updatePageProgress(activePage);
    });

    container.appendChild(div);
  });

  if (sectionCountId) updateSectionCount(containerId, items, sectionCountId);
}

function updateSectionCount(containerId, items, countId) {
  const state = loadState();
  const done = items.filter(i => state[i.id]).length;
  const el = document.getElementById(countId);
  if (el) el.textContent = `${done}/${items.length}`;
}

// ── GLOBAL STATS ────────────────────────────────────────────────
function updateAllStats() {
  const state = loadState();

  // Daily ops stats
  const daily = CHECKLISTS.morning.concat(CHECKLISTS.core, CHECKLISTS.eod);
  const dailyDone = daily.filter(i => state[i.id]).length;
  setEl('stat-daily-done', dailyDone);
  setEl('stat-daily-total', daily.length);
  setEl('stat-daily-pct', Math.round(dailyDone / daily.length * 100) + '%');
  setBar('bar-daily', dailyDone / daily.length * 100);

  // QC stats
  const qc = CHECKLISTS.qc_brand.concat(CHECKLISTS.qc_copy, CHECKLISTS.qc_layout, CHECKLISTS.qc_preflight);
  const qcDone = qc.filter(i => state[i.id]).length;
  setEl('stat-qc-done', qcDone);
  setEl('stat-qc-total', qc.length);
  const ready = qcDone === qc.length ? 'Yes ✓' : qcDone === 0 ? 'Not yet' : `${qc.length - qcDone} left`;
  const readyEl = document.getElementById('stat-qc-ready');
  if (readyEl) {
    readyEl.textContent = ready;
    readyEl.className = 'stat-card-value ' + (qcDone === qc.length ? 'green' : qcDone > 0 ? 'amber' : '');
  }
  setBar('bar-qc', qcDone / qc.length * 100);
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function setBar(id, pct) {
  const el = document.getElementById(id);
  if (el) el.style.width = Math.round(pct) + '%';
}

// ── NAVIGATION ──────────────────────────────────────────────────
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');

  const nav = document.querySelector(`[data-page="${pageId}"]`);
  if (nav) nav.classList.add('active');

  // Update topbar title
  // Mistakes and 90-Day now live in right-side drawers
  if (pageId === 'mistakes')    { openMlDrawer();  return; }
  if (pageId === 'ninetydays')  { openNdDrawer();  return; }

  const titles = {
    daily:        ['Daily Ops', 'Morning, core tasks & end-of-day'],
    campaigns:    ['Campaigns', 'Email execution & collateral'],
    events:       ['Events',    'Setup, materials & post-event'],
    brand:        ['Brand & Compliance', 'QC checklist + InDesign preflight'],
    aiwriter:     ['AI Write & QC', 'Draft emails, QC checklists & manager notes'],
    salesforce:   ['Salesforce EDM', 'Designed eDM — build, test & send in Account Engagement'],
    taskbuilder:  ['Task Builder', 'Generate a custom plan for any task'],
    intake:       ['Brief Intake', 'Receive a task — fill this in first'],
    timer:        ['Task Timer', 'Focus mode — Pomodoro timer'],
    tools:        ['Tools & Skills',  'Your tech stack reference'],
    monday:       ['Monday.com', 'Your task management hub'],
    firstweek:    ['First Week Guide', 'Day-by-day remote survival plan'],
    panic:        ['Panic Button 🆘', 'Step-by-step for when things go wrong'],
    templates:    ['Message Templates', 'Ready-to-copy professional messages'],
    timesheet:    ['Timesheet', 'Log work, track hours, backtrack any day'],
    glossary:     ['Finance Glossary', 'Financial services terms explained'],
    goodlooks:    ['What Good Looks Like', 'Pass vs Good vs Impressive'],
    diffcheck:    ['Text Compare', 'Spot differences between two versions of any text'],
  };

  const t = titles[pageId] || ['Dashboard', ''];
  setEl('topbar-title',    t[0]);
  setEl('topbar-subtitle', t[1]);

  // Scroll content to top
  const content = document.querySelector('.content');
  if (content) content.scrollTop = 0;

  // Re-render all checklists for the active page
  renderAll();
  updateAllStats();

  // Init calendar if needed
  if (pageId === 'timesheet')   { setTimeout(initCalendar, 50); }
  if (pageId === 'intake')      { renderIntakeSaved(); }
  if (pageId === 'salesforce')  { setEdmSidebarVisible(true);  renderEdmCampaignCard(); renderEdmPhases(); renderEdmQA(); }
  else                          { setEdmSidebarVisible(false); }
  if (pageId === 'edmreport')   { renderEdmReportPage(); }
  if (pageId === 'plaintext')   { renderPlainTextPage(); }
  if (pageId === 'timer')       { renderTimerTaskList(); }
  if (pageId === 'glossary')    { renderGlossaryList(); }
  if (pageId === 'goodlooks')   { renderGoodLooks(); }
  if (pageId === 'mistakes')    { renderPreloadedMistakes(); renderPersonalMistakes(); }
  if (pageId === 'ninetydays')  { renderNinetyDays(); }

  // Update page-level progress bar
  updatePageProgress(pageId);

  // Re-evaluate chip visibility whenever page changes (chip hides on timer page, shows on others if active)
  updateTopbarTimer();
}

function updatePageProgress(pageId) {
  const state = loadState();
  const bar  = document.getElementById('page-progress-bar');
  const label = document.getElementById('page-progress-label');
  if (!bar || !label) return;

  const pageItems = {
    daily:     [...CHECKLISTS.morning, ...CHECKLISTS.core, ...CHECKLISTS.eod],
    campaigns: [...CHECKLISTS.campaign_collateral],
    events:    [...CHECKLISTS.event_setup, ...CHECKLISTS.event_materials, ...CHECKLISTS.event_post],
    brand:     [...CHECKLISTS.qc_brand, ...CHECKLISTS.qc_copy, ...CHECKLISTS.qc_layout, ...CHECKLISTS.qc_preflight, ...CHECKLISTS.compliance_qc],
  };

  const items = pageItems[pageId];
  if (!items || items.length === 0) {
    bar.style.width = '0%';
    label.textContent = '';
    document.getElementById('page-progress-wrap')?.style.setProperty('display','none');
    return;
  }

  document.getElementById('page-progress-wrap')?.style.removeProperty('display');
  const done = items.filter(i => state[i.id]).length;
  const pct = Math.round(done / items.length * 100);
  bar.style.width = pct + '%';
  label.textContent = `${done} / ${items.length} tasks · ${pct}%`;
}

// ── RENDER ALL ──────────────────────────────────────────────────
function renderAll() {
  renderChecklist('list-morning',    CHECKLISTS.morning,            'count-morning');
  renderChecklist('list-core',       CHECKLISTS.core,               'count-core');
  renderChecklist('list-eod',        CHECKLISTS.eod,                'count-eod');
  renderChecklist('list-collateral', CHECKLISTS.campaign_collateral,'count-collateral');
  renderChecklist('list-ev-setup',   CHECKLISTS.event_setup,        'count-evsetup');
  renderChecklist('list-ev-mat',     CHECKLISTS.event_materials,    'count-evmat');
  renderChecklist('list-ev-post',    CHECKLISTS.event_post,         'count-evpost');
  renderChecklist('list-qc-brand',   CHECKLISTS.qc_brand,           'count-qcbrand');
  renderChecklist('list-qc-copy',    CHECKLISTS.qc_copy,            'count-qccopy');
  renderChecklist('list-qc-layout',  CHECKLISTS.qc_layout,          'count-qclayout');
  renderChecklist('list-qc-preflight', CHECKLISTS.qc_preflight,     'count-qcpreflight');
  renderChecklist('list-compliance', CHECKLISTS.compliance_qc,      'count-compliance');
}

// ── RESET FUNCTIONS ─────────────────────────────────────────────
function resetSection(ids) {
  const state = loadState();
  ids.forEach(id => delete state[id]);
  saveState(state);
  renderAll();
  updateAllStats();
}

function resetDaily() {
  const ids = [...CHECKLISTS.morning, ...CHECKLISTS.core, ...CHECKLISTS.eod].map(i => i.id);
  resetSection(ids);
  setLastReset();
}

function resetQC() {
  const ids = [...CHECKLISTS.qc_brand, ...CHECKLISTS.qc_copy, ...CHECKLISTS.qc_layout, ...CHECKLISTS.qc_preflight].map(i => i.id);
  resetSection(ids);
}

// ── PANIC SCENARIOS ────────────────────────────────────────────
const PANIC_SCENARIOS = {
  urgent: {
    title: '🔥 Multiple urgent tasks — how to triage',
    steps: [
      { title: 'Stop and list everything', desc: 'Write out every "urgent" task in front of you. Do not start any of them yet. Get them all visible in one place.' },
      { title: 'Apply the 3-question filter', desc: '1. Does this have a hard external deadline today (client, supplier, published send time)? → Do first. 2. Is someone blocked until I finish this? → Do second. 3. Is this internal with flexible timing? → Do last.' },
      { title: 'Message your lead — don\'t guess', desc: 'Send: "I have [X], [Y], and [Z] all marked urgent. In my view the order should be X → Y → Z based on [reason]. Does that work for you?" This shows judgment AND confirms priorities.' },
      { title: 'Do one task at a time, fully', desc: 'Close everything else. Finish task 1. Update Monday. Then move to task 2. Context-switching kills quality.' },
      { title: 'Update statuses as you go', desc: 'As you start each task, change Monday status to "In Progress". As you finish, mark Done + attach output. Your lead can see you\'re moving without you messaging them.' },
    ]
  },
  mistake: {
    title: '😱 I made a mistake — what to do right now',
    steps: [
      { title: 'Don\'t panic, don\'t hide it', desc: 'Every experienced person in marketing has sent the wrong file, uploaded to the wrong page, or emailed the wrong list. What separates good coordinators is how they handle it, not that it happened.' },
      { title: 'Assess the actual impact', desc: 'Has it gone public (live on website, email sent, file shared with client)? Or is it still internal? Internal = lower urgency. External/live = act immediately.' },
      { title: 'If it\'s live — flag your lead first, then fix', desc: 'Do not quietly fix it and say nothing. Message your lead: "[Thing] went out with [issue]. I\'m [what you\'re doing to fix it] right now. Flagging so you\'re aware." Then fix it.' },
      { title: 'Use the mistake template', desc: 'Go to Templates tab → "Flagging a mistake or error". Send it. Lead with facts, follow with your fix. One sentence on what happened, one on what you\'re doing. No over-apologising.' },
      { title: 'After it\'s resolved — add it to your personal SOP', desc: 'Write down what happened and what check would have caught it. Add it to your QC checklist mentally. This is how experienced coordinators develop their process.' },
    ]
  },
  silent: {
    title: '🔇 Slack is quiet and I don\'t know if I\'m doing it right',
    steps: [
      { title: 'Silence ≠ problem — understand remote norms', desc: 'In remote teams, silence is normal. Your lead is busy. No news is usually good news. Anxiety about silence is the #1 WFH new-starter trap.' },
      { title: 'Check Monday.com first', desc: 'Are your tasks assigned and active? Are statuses current? If Monday looks healthy, you\'re probably fine. If tasks are overdue or blank, that\'s the issue.' },
      { title: 'Send a proactive check-in — don\'t wait', desc: 'If you\'ve been quiet for more than a day, send: "Hi [Name], just checking in — I\'m currently working on [tasks]. Anything you need from me or any priority shifts?" Short. Professional. Not anxious.' },
      { title: 'Create your own visibility', desc: 'Update Monday tasks. Share a quick EOD message. Ask one clear question. You don\'t need permission to communicate — remote workers who stay visible get the best outcomes.' },
      { title: 'Ask for feedback explicitly in Week 1–2', desc: 'In your first 1:1 or check-in: "Is there anything I should be doing differently or communicating better?" Most leads won\'t say this unprompted. Asking shows maturity.' },
    ]
  },
  deadline: {
    title: '⏰ Deadline today and lead is unavailable',
    steps: [
      { title: 'Check if there\'s a documented approval process', desc: 'Is there a backup approver? A documented process for when your lead is out? Check your onboarding notes, the team handbook, or Monday for any instructions.' },
      { title: 'Send a message anyway — create a record', desc: 'Even if they\'re unavailable, send: "Hi [Name], I have [task] due today at [time]. I\'ve completed it and it\'s ready — [link/file]. Proceeding unless I hear otherwise by [time]." This covers you.' },
      { title: 'Do not miss the external deadline without telling someone', desc: 'If the deadline is with a supplier, client, or platform, contact them directly: "We\'re experiencing an internal approval delay. Can we have [X extra hours]?" Most will say yes if asked proactively.' },
      { title: 'If the task cannot proceed without approval — document and hold', desc: 'Don\'t send unapproved work. Keep it ready. Document that it\'s complete and awaiting approval with a timestamp. When your lead is back, you\'re ready to go in 30 seconds.' },
      { title: 'Learn from it — ask about backup approval process', desc: 'After this resolves, ask your lead: "What\'s the protocol if I need approval and you\'re unavailable?" Having this answer before the next time is what matters.' },
    ]
  },
  approval: {
    title: '⏳ Waiting on approval — it\'s been too long',
    steps: [
      { title: 'How long is too long?', desc: 'Same-day tasks: follow up after 3–4 hours. Multi-day tasks: follow up after 24–48 hours. Urgent/deadline-sensitive: follow up after 1–2 hours with a note about the deadline.' },
      { title: 'Follow up — once, clearly', desc: 'Use the "Following up on an unanswered message" template from the Templates tab. Be factual. State the deadline. Don\'t apologise for following up.' },
      { title: 'Flag the dependency in Monday', desc: 'Add an update comment on the task: "Submitted for approval [date/time]. Awaiting sign-off before proceeding." This documents the delay is not on you.' },
      { title: 'If deadline is imminent — escalate the urgency', desc: 'Use the "Urgent approval" template. Make the deadline visible. "This needs to go out by [time] — can you review in the next [X] minutes?"' },
      { title: 'If you still can\'t get a response — check for backup', desc: 'Is there another person who can approve? A documented backup process? If so, use it and note that you did. If not, document that you held the task pending approval.' },
    ]
  },
  supplier: {
    title: '📦 Supplier sent wrong thing or missed their deadline',
    steps: [
      { title: 'Check the original brief first', desc: 'Before you escalate anything, re-read the brief you sent. Was the error in your brief or theirs? If it was in your brief, own it, correct it, and resend. If it was theirs, proceed.' },
      { title: 'Contact the supplier immediately — be specific', desc: 'Use the "Requesting supplier revision" template from the Templates tab. List exactly what\'s wrong. Not "this doesn\'t look right" — be specific: wrong logo version, incorrect dimensions, missing bleed.' },
      { title: 'Set a firm revised deadline', desc: '"Please resend the corrected file by [specific time]. We have a hard deadline of [date]." Specific > vague. Vague gets deprioritised.' },
      { title: 'Flag your lead immediately with timeline', desc: 'Don\'t absorb the problem quietly. Message: "Supplier [name] delivered [incorrect item]. I\'ve contacted them requesting correction by [time]. Should not impact our deadline, but flagging so you\'re aware."' },
      { title: 'If it will impact your deadline — say so now', desc: 'The earlier you flag a supplier issue, the more options your lead has. Every hour you wait narrows the options. Flag early, always.' },
    ]
  },
  unclear: {
    title: '❓ Brief is unclear — how to get clarity without being annoying',
    steps: [
      { title: 'Attempt the task first — 15 minutes', desc: 'Before asking, spend 15 minutes with what you have. Try to identify specifically what you\'re unclear on. "I don\'t understand this task" is a vague question. "Is the deadline end of day Thursday AEST?" is a good one.' },
      { title: 'Write your specific questions', desc: 'List every blocker as a specific question. Not "what do I do?" but "Should I use template A or template B for this?" and "Is the target audience the same as the last campaign?"' },
      { title: 'Batch them in one message', desc: '"Hi [Name], I\'ve started on [task] and have a couple of quick questions before I go further: [1] [2] [3]. Happy to proceed on my best guess if you\'re tied up — just let me know."' },
      { title: 'State your assumption if you have to move forward', desc: 'If you can\'t wait: "Proceeding with [your assumption] unless I hear otherwise. Please let me know if that\'s not right." This shows initiative and protects you if the assumption is wrong.' },
      { title: 'Document the answer when you get it', desc: 'After you get clarity, note it down. Next time a similar task comes up, you\'ll already know. Over time this becomes your personal SOP.' },
    ]
  },
  feedback: {
    title: '💬 I got negative feedback on my work',
    steps: [
      { title: 'Don\'t respond immediately if you feel defensive', desc: 'Take 5 minutes. Read the feedback again. Your first instinct will be to justify yourself. That instinct is usually wrong. Don\'t send a reactive response.' },
      { title: 'Separate the feedback from your feelings about it', desc: 'Is the feedback about the work or about you? Almost always it\'s the work. "This layout doesn\'t match the template" is not a personal attack. Treat it like a task to fix.' },
      { title: 'Acknowledge, ask, act', desc: 'Respond with: "Thanks for the feedback — understood. To make sure I get this right: [specific clarifying question if needed]. I\'ll have the revised version to you by [time]."' },
      { title: 'Fix it and come back faster than expected', desc: 'If they expected it tomorrow, deliver it today. Recovering well from feedback builds more trust than getting it right the first time. The speed of your recovery matters.' },
      { title: 'Ask what good looks like', desc: 'If feedback is recurring on the same thing, ask: "Can you show me an example of what you\'re looking for?" Most leads will happily show you. Most new starters never ask.' },
    ]
  },
  overwhelmed: {
    title: '🌀 Completely overwhelmed — reset protocol',
    steps: [
      { title: 'Step away for 5 minutes — literally', desc: 'Stand up. Walk away from your screen. Get water. Overwhelm makes everything feel equally urgent and important. It is not. A 5-minute break resets your ability to prioritise.' },
      { title: 'Do a brain dump — write everything down', desc: 'Open a blank doc or grab a piece of paper. Write every task, worry, and open loop in your head. Get it all out. Your brain is trying to hold too many things. Externalise them.' },
      { title: 'Sort into: must do today vs can wait', desc: 'From your list: what genuinely cannot wait until tomorrow? What has a hard external deadline? Circle those. That\'s your actual today list. Everything else waits.' },
      { title: 'Tell your lead — briefly', desc: '"Hi [Name], I want to flag that I have a heavy load today. I\'m prioritising [X and Y] — is that right? Anything I should drop or push?" Most leads will respect this and help you prioritise.' },
      { title: 'Do the hardest or most anxiety-inducing task first', desc: 'The thing you\'re most dreading is probably the source of the overwhelm. Do it first. Not the easiest task — the most important one. Everything else will feel lighter afterwards.' },
    ]
  }
};

// ── PANIC FUNCTIONS ─────────────────────────────────────────────
function showPanic(key) {
  const scenario = PANIC_SCENARIOS[key];
  if (!scenario) return;

  const content = document.getElementById('panic-content');
  content.innerHTML = `
    <div class="section-block">
      <div class="section-block-header" style="background:var(--rust-pale)">
        <span class="sh-title" style="font-size:15px;color:var(--rust)">${scenario.title}</span>
      </div>
      <div class="phase-list">
        ${scenario.steps.map((s, i) => `
          <div class="panic-step">
            <div class="ps-num">${i + 1}</div>
            <div>
              <div class="ps-title">${s.title}</div>
              <div class="ps-desc">${s.desc}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;

  document.getElementById('panic-menu').style.display = 'none';
  document.getElementById('panic-detail').style.display = 'block';
  document.querySelector('.content').scrollTop = 0;
}

function hidePanic() {
  document.getElementById('panic-menu').style.display = 'block';
  document.getElementById('panic-detail').style.display = 'none';
}

// ── TEMPLATE COPY ───────────────────────────────────────────────
function copyTplCard(el, text) {
  const decoded = text.replace(/\\n/g, '\n');
  navigator.clipboard.writeText(decoded).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = decoded;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
  const pill = el.querySelector('.tpl-copy-pill');
  if (pill) { pill.textContent = '✓ Copied'; pill.style.background = 'var(--sage)'; pill.style.color = '#fff'; setTimeout(() => { pill.textContent = 'Copy'; pill.style.background = ''; pill.style.color = ''; }, 2000); }
  const toast = document.getElementById('copy-toast');
  if (toast) { toast.style.display = 'block'; setTimeout(() => toast.style.display = 'none', 2000); }
}

function copyTemplate(el, text) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = el.querySelector('.tpl-copy-btn');
    if (btn) {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 2000);
    }
    const toast = document.getElementById('copy-toast');
    if (toast) {
      toast.style.display = 'block';
      setTimeout(() => toast.style.display = 'none', 2000);
    }
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}
// ── THEME ────────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('msc_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeBtn(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('msc_theme', next);
  updateThemeBtn(next);
}

function updateThemeBtn(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀ Light' : '☾ Dark';
}

// ── DATE / DUAL CLOCK ────────────────────────────────────────────
let clockHourOffset  = 0;
let clockManualMode  = false;
let clockManualTimer = null;

function updateDateTime() {
  const real = new Date();
  const now  = clockManualMode ? new Date(real.getTime() + clockHourOffset * 3600000) : real;
  const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  document.querySelectorAll('.live-date').forEach(el => el.textContent = real.toLocaleDateString('en-AU', opts));

  const manilaTime = now.toLocaleTimeString('en-PH', { hour:'2-digit', minute:'2-digit', timeZone:'Asia/Manila' });
  const sydTime    = now.toLocaleTimeString('en-AU', { hour:'2-digit', minute:'2-digit', timeZone:'Australia/Sydney' });

  document.querySelectorAll('.clock-manila').forEach(el => {
    el.textContent = manilaTime;
    el.style.color = clockManualMode ? '#0078D4' : '';
  });
  document.querySelectorAll('.clock-sydney').forEach(el => {
    el.textContent = sydTime;
    el.style.color = clockManualMode ? '#0078D4' : '';
  });
}

function adjustClockOffset(delta) {
  clockHourOffset += delta;
  clockManualMode  = true;
  resetClockManualTimer();
  updateDateTime();
}

function resetClockManualTimer() {
  if (clockManualTimer) clearTimeout(clockManualTimer);
  clockManualTimer = setTimeout(() => {
    clockHourOffset = 0;
    clockManualMode = false;
    clockManualTimer = null;
    updateDateTime();
  }, 5000);
}

function clockStartEdit(tz) {
  const disp  = document.getElementById('clock-' + tz + '-disp');
  const input = document.getElementById('clock-' + tz + '-input');
  if (!disp || !input) return;
  if (clockManualTimer) { clearTimeout(clockManualTimer); clockManualTimer = null; }
  clockManualMode = true;

  const tzStr = tz === 'mnl' ? 'Asia/Manila' : 'Australia/Sydney';
  const base  = clockManualMode ? new Date(Date.now() + clockHourOffset * 3600000) : new Date();
  const h     = parseInt(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: tzStr }).format(base), 10) % 24;

  disp.style.display  = 'none';
  input.style.display = 'block';
  input.value         = String(h).padStart(2, '0');
  input.select();
  input.focus();
}

function clockInputKey(e, tz) {
  if (e.key === 'Enter')      { e.preventDefault(); clockInputCommit(tz); }
  if (e.key === 'Escape')     { clockInputAbort(tz); }
  if (e.key === 'ArrowUp')    { e.preventDefault(); adjustClockOffset(1);  }
  if (e.key === 'ArrowDown')  { e.preventDefault(); adjustClockOffset(-1); }
}

function clockInputAbort(tz) {
  const disp  = document.getElementById('clock-' + tz + '-disp');
  const input = document.getElementById('clock-' + tz + '-input');
  if (input) input.style.display = 'none';
  if (disp)  disp.style.display  = '';
  resetClockManualTimer();
}

function clockInputCommit(tz) {
  const disp  = document.getElementById('clock-' + tz + '-disp');
  const input = document.getElementById('clock-' + tz + '-input');
  if (!input) return;
  const val = parseInt(input.value, 10);
  input.style.display = 'none';
  if (disp) disp.style.display = '';

  if (!isNaN(val) && val >= 0 && val <= 23) {
    const tzStr = tz === 'mnl' ? 'Asia/Manila' : 'Australia/Sydney';
    const realH = parseInt(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: tzStr }).format(new Date()), 10) % 24;
    clockHourOffset = val - realH;
  }
  clockManualMode = true;
  resetClockManualTimer();
  updateDateTime();
}

// ── TIMESHEET STORAGE ───────────────────────────────────────────
const TS_KEY = 'msc_timesheet_v1';
function loadTimesheet() { try { return JSON.parse(localStorage.getItem(TS_KEY)) || {}; } catch { return {}; } }
function saveTimesheet(d) { localStorage.setItem(TS_KEY, JSON.stringify(d)); }
function tsDateKey(y, m, d) { return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }

let calYear, calMonth, calSelectedDate;

function initCalendar() {
  const now = new Date();
  calYear  = now.getFullYear();
  calMonth = now.getMonth();
  calSelectedDate = tsDateKey(now.getFullYear(), now.getMonth(), now.getDate());
  renderCalendar();
  renderDetail(calSelectedDate);
  renderTsSummary();
}

function renderCalendar() {
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  setEl('cal-month-label', `${MONTHS[calMonth]} ${calYear}`);
  const ts = loadTimesheet();
  const today = new Date();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const daysInPrev  = new Date(calYear, calMonth, 0).getDate();
  const grid = document.getElementById('cal-days-grid');
  if (!grid) return;
  grid.innerHTML = '';

  for (let i = firstDay-1; i >= 0; i--) {
    const d = daysInPrev-i;
    const k = tsDateKey(calYear, calMonth-1, d);
    addCalDay(grid, d, 'other-month', k);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const k = tsDateKey(calYear, calMonth, d);
    const isToday = (d===today.getDate() && calMonth===today.getMonth() && calYear===today.getFullYear());
    addCalDay(grid, d, isToday ? 'today' : '', k);
  }
  const total = firstDay + daysInMonth;
  const rem = total % 7 === 0 ? 0 : 7-(total%7);
  for (let d = 1; d <= rem; d++) {
    const k = tsDateKey(calYear, calMonth+1, d);
    addCalDay(grid, d, 'other-month', k);
  }
}

function addCalDay(grid, d, extra, key) {
  const ts = loadTimesheet();
  const div = document.createElement('div');
  let cls = 'cal-day';
  if (extra) cls += ' ' + extra;
  if (key === calSelectedDate) cls += ' selected';
  if (ts[key]?.length) cls += ' has-entries';
  div.className = cls;
  div.textContent = d;
  div.onclick = () => selectDate(key);
  grid.appendChild(div);
}

function calPrev() { calMonth--; if (calMonth<0){calMonth=11;calYear--;} renderCalendar(); }
function calNext() { calMonth++; if (calMonth>11){calMonth=0;calYear++;} renderCalendar(); }

function selectDate(key) { calSelectedDate = key; renderCalendar(); renderDetail(key); }

function renderDetail(key) {
  const el = document.getElementById('cal-detail-date');
  const sub = document.getElementById('cal-detail-sub');
  if (!el) return;
  const [y,m,d] = key.split('-').map(Number);
  const date = new Date(y, m-1, d);
  const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const MON  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  el.textContent = `${DAYS[date.getDay()]}, ${MON[m-1]} ${d}`;
  const ts = loadTimesheet();
  const entries = ts[key] || [];
  const totalMins = entries.reduce((s,e)=>s+(e.minutes||0),0);
  if (sub) sub.textContent = entries.length ? `${entries.length} entr${entries.length>1?'ies':'y'} · ${fmtMins(totalMins)} logged` : 'No entries yet — add below';
  const list = document.getElementById('cal-entries-list');
  if (!list) return;
  list.innerHTML = '';
  if (!entries.length) { list.innerHTML = '<div class="cal-empty">No work logged for this day.</div>'; return; }
  entries.forEach((entry, idx) => {
    const row = document.createElement('div');
    row.className = 'entry-row';
    row.innerHTML = `
      <div class="entry-cat ${entry.category}">${entry.category}</div>
      <div class="entry-body">
        <div class="entry-title">${entry.title}</div>
        <div class="entry-meta">${fmtMins(entry.minutes||0)}</div>
        ${entry.notes ? `<div class="entry-notes">${entry.notes}</div>` : ''}
      </div>
      <div class="entry-actions">
        <button class="entry-btn delete" title="Delete" onclick="deleteEntry('${key}',${idx})">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>
        </button>
      </div>`;
    list.appendChild(row);
  });
}

function fmtMins(mins) {
  if (!mins) return '0m';
  const h = Math.floor(mins/60), m = mins%60;
  return h ? (m ? `${h}h ${m}m` : `${h}h`) : `${m}m`;
}

function addEntry() {
  const title = document.getElementById('ts-title')?.value?.trim();
  const cat   = document.getElementById('ts-cat')?.value;
  const hrs   = parseInt(document.getElementById('ts-hrs')?.value||'0')||0;
  const mins  = parseInt(document.getElementById('ts-mins')?.value||'0')||0;
  const notes = document.getElementById('ts-notes')?.value?.trim();
  if (!title) { document.getElementById('ts-title')?.focus(); return; }
  const ts = loadTimesheet();
  if (!ts[calSelectedDate]) ts[calSelectedDate] = [];
  ts[calSelectedDate].push({ title, category: cat||'admin', minutes: hrs*60+mins, notes: notes||'' });
  saveTimesheet(ts);
  ['ts-title','ts-notes'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  ['ts-hrs','ts-mins'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  renderDetail(calSelectedDate);
  renderCalendar();
  renderTsSummary();
}

function deleteEntry(key, idx) {
  const ts = loadTimesheet();
  if (ts[key]) { ts[key].splice(idx,1); if(!ts[key].length) delete ts[key]; saveTimesheet(ts); renderDetail(key); renderCalendar(); renderTsSummary(); }
}

function renderTsSummary() {
  const ts = loadTimesheet();
  const now = new Date();
  const dow = now.getDay();
  const mon = new Date(now); mon.setDate(now.getDate()-(dow===0?6:dow-1));
  let weekMins=0, weekDays=0, totalEntries=0, monthMins=0;
  Object.entries(ts).forEach(([key, entries]) => {
    const [y,m,d] = key.split('-').map(Number);
    const date = new Date(y,m-1,d);
    const dayMins = entries.reduce((s,e)=>s+(e.minutes||0),0);
    totalEntries += entries.length;
    if (date>=mon && date<=now) { weekMins+=dayMins; if(dayMins>0) weekDays++; }
    if (date.getFullYear()===now.getFullYear()&&date.getMonth()===now.getMonth()) monthMins+=dayMins;
  });
  setEl('ts-stat-week',    fmtMins(weekMins));
  setEl('ts-stat-days',    weekDays+' days');
  setEl('ts-stat-month',   fmtMins(monthMins));
  setEl('ts-stat-entries', totalEntries);
}

// ── CSV EXPORT ──────────────────────────────────────────────────
function setRange(preset) {
  const now = new Date();
  let from, to;

  if (preset === 'thisweek') {
    const dow = now.getDay();
    from = new Date(now); from.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
    to = new Date(now);
  } else if (preset === 'lastweek') {
    const dow = now.getDay();
    to = new Date(now); to.setDate(now.getDate() - (dow === 0 ? 7 : dow));
    from = new Date(to); from.setDate(to.getDate() - 6);
  } else if (preset === 'thismonth') {
    from = new Date(now.getFullYear(), now.getMonth(), 1);
    to = new Date(now);
  } else if (preset === 'lastmonth') {
    from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    to   = new Date(now.getFullYear(), now.getMonth(), 0);
  } else if (preset === 'all') {
    // Find earliest entry
    const ts = loadTimesheet();
    const keys = Object.keys(ts).sort();
    from = keys.length ? new Date(keys[0]) : new Date(now.getFullYear(), now.getMonth(), 1);
    to   = new Date(now);
  }

  const fmt = d => d.toISOString().split('T')[0];
  const fromEl = document.getElementById('csv-from');
  const toEl   = document.getElementById('csv-to');
  if (fromEl) fromEl.value = fmt(from);
  if (toEl)   toEl.value   = fmt(to);
  updateCsvPreview();
}

function updateCsvPreview() {
  const fromVal = document.getElementById('csv-from')?.value;
  const toVal   = document.getElementById('csv-to')?.value;
  const label   = document.getElementById('csv-preview-label');
  if (!label) return;

  if (!fromVal || !toVal) { label.textContent = 'Select a range to preview'; return; }

  const ts = loadTimesheet();
  const from = new Date(fromVal);
  const to   = new Date(toVal);
  to.setHours(23,59,59);

  let totalEntries = 0, totalMins = 0;
  Object.entries(ts).forEach(([key, entries]) => {
    const [y,m,d] = key.split('-').map(Number);
    const date = new Date(y, m-1, d);
    if (date >= from && date <= to) {
      totalEntries += entries.length;
      totalMins += entries.reduce((s,e) => s + (e.minutes||0), 0);
    }
  });

  if (totalEntries === 0) {
    label.textContent = 'No entries found in this range';
    label.style.color = 'var(--rust)';
  } else {
    label.textContent = `${totalEntries} entr${totalEntries > 1 ? 'ies' : 'y'} · ${fmtMins(totalMins)} total — ready to export`;
    label.style.color = 'var(--sage)';
  }
}

function exportCSV() {
  const fromVal = document.getElementById('csv-from')?.value;
  const toVal   = document.getElementById('csv-to')?.value;

  if (!fromVal || !toVal) {
    const label = document.getElementById('csv-preview-label');
    if (label) { label.textContent = 'Please select a From and To date first'; label.style.color = 'var(--rust)'; }
    return;
  }

  const ts   = loadTimesheet();
  const from = new Date(fromVal);
  const to   = new Date(toVal);
  to.setHours(23,59,59);

  const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const rows = [['Date','Day','Task','Category','Hours','Minutes','Total Hours','Total Decimal','Notes']];

  const keys = Object.keys(ts).sort();
  keys.forEach(key => {
    const [y,m,d] = key.split('-').map(Number);
    const date = new Date(y, m-1, d);
    if (date < from || date > to) return;

    const dayName = DAYS[date.getDay()];
    const entries = ts[key];

    entries.forEach(entry => {
      const hrs  = Math.floor((entry.minutes||0) / 60);
      const mins = (entry.minutes||0) % 60;
      const dec  = ((entry.minutes||0) / 60).toFixed(2);
      const notes = (entry.notes || '').replace(/"/g, '""');
      const task  = (entry.title || '').replace(/"/g, '""');
      rows.push([key, dayName, `"${task}"`, entry.category, hrs, mins, `${hrs}h ${mins}m`, dec, `"${notes}"`]);
    });
  });

  if (rows.length === 1) {
    const label = document.getElementById('csv-preview-label');
    if (label) { label.textContent = 'No entries found in this range'; label.style.color = 'var(--rust)'; }
    return;
  }

  const csvContent = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');

  const fromLabel = fromVal.replace(/-/g,'');
  const toLabel   = toVal.replace(/-/g,'');
  a.href     = url;
  a.download = `timesheet_${fromLabel}_${toLabel}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Feedback
  const label = document.getElementById('csv-preview-label');
  if (label) { label.textContent = `✓ Downloaded timesheet_${fromLabel}_${toLabel}.csv`; label.style.color = 'var(--sage)'; }
}

// Wire up live preview on date input change (called from HTML onchange)
function onCsvDateChange() { updateCsvPreview(); }

// ── TEMPLATES DATA ──────────────────────────────────────────────
const TEMPLATES = [
  {
    id: 'approval',
    badge: 'Approval', badgeStyle: 'background:var(--sage-dim);color:var(--sage)',
    title: 'Standard approval request',
    sub: 'Collateral, emails, event materials, website updates',
    variants: [
      { tone: 'Formal',
        preview: '"I\'ve completed [task] and it\'s ready for your review…"',
        text: "Hi [Name],\n\nI've completed [task/material name] and it's ready for your review.\n\n[Attach file or link here]\n\nPlease let me know if any changes are needed or if I'm good to proceed.\n\nThanks,\n[Your name]" },
      { tone: 'Direct',
        preview: '"[Task] is done — ready for review. Let me know if anything needs adjusting."',
        text: "Hi [Name],\n\n[Task] is done and ready for your review — [link/file attached].\n\nLet me know if anything needs adjusting.\n\n[Your name]" },
      { tone: 'Warm',
        preview: '"Just finished [task] — I think it\'s looking good! Would love your feedback."',
        text: "Hi [Name],\n\nJust finished [task] — I think it's looking good! Would love your feedback before we move forward.\n\n[Link/file attached]\n\nNo rush, but let me know when you've had a chance to look.\n\nThanks,\n[Your name]" },
      { tone: 'Detailed',
        preview: '"Here\'s a quick summary of what was done before you review…"',
        text: "Hi [Name],\n\nI've completed [task] and it's ready for review. Here's a quick summary:\n\n- [Key point 1]\n- [Key point 2]\n\n[Link/file attached]\n\nHappy to walk you through it or make any changes.\n\nThanks,\n[Your name]" },
      { tone: 'Concise',
        preview: '"[Task] ready. [Link]. Approve or flag changes?"',
        text: "[Name] — [task] is ready for review. [Link]. Approve or flag changes?\n\n[Your name]" },
      { tone: 'Slack',
        preview: '"Hey! [task] is done — [link]. Can you give it a quick look?"',
        text: "Hey [Name]!\n\n[Task] is done — [link]. Can you give it a quick look when you have a moment?\n\nLet me know if anything needs changing.\n\n[Your name]" },
      { tone: 'With options',
        preview: '"Happy to adjust [A] or [B] — just let me know which direction works."',
        text: "Hi [Name],\n\n[Task] is ready for your review — [link].\n\nI went with [approach A], but I'm happy to adjust to [option B] if you prefer. Just let me know which direction works better.\n\nThanks,\n[Your name]" },
      { tone: 'New starter',
        preview: '"I want to make sure I\'ve done this correctly — would you mind reviewing?"',
        text: "Hi [Name],\n\nI've completed [task] — [link attached]. I want to make sure I've followed the right process, so I'd really appreciate a review before I move forward.\n\nPlease flag anything I should adjust.\n\nThanks,\n[Your name]" },
      { tone: 'Post-meeting',
        preview: '"Following up from our chat — [task] is now done. Ready for your sign-off."',
        text: "Hi [Name],\n\nFollowing up from our conversation — I've completed [task] as discussed. [Link attached].\n\nReady for your sign-off when you get a chance.\n\nThanks,\n[Your name]" },
      { tone: 'After hours',
        preview: '"No rush on this — just sharing [task] so it\'s ready for you tomorrow."',
        text: "Hi [Name],\n\nNo urgency on this — just sharing [task] so it's waiting in your inbox when you're ready. [Link attached].\n\nHappy to go over it whenever works for you.\n\n[Your name]" },
      { tone: 'Monday comment',
        preview: '"[Task] completed — file attached to this card. Please review and update status."',
        text: "[Task] completed — [link/file] attached to this card.\n\nPlease review and update the status to Approved when signed off, or flag changes in the comments." },
      { tone: 'With deadline context',
        preview: '"Sharing now so we have time for revisions before the [date] deadline."',
        text: "Hi [Name],\n\nSharing [task] now so we have time for any revisions before the [date] deadline. [Link attached].\n\nLet me know your thoughts as soon as you're able.\n\nThanks,\n[Your name]" },
      { tone: 'Reassuring',
        preview: '"I\'ve QC\'d this against the brief — it\'s clean and ready for your final sign-off."',
        text: "Hi [Name],\n\nI've QC'd [task] against the brief and it's clean — no missing elements, all approved copy in place. Ready for your final sign-off. [Link attached].\n\nThanks,\n[Your name]" },
      { tone: 'Cross-team',
        preview: '"Looping you in for approval — [Name from your team] asked me to send this your way."',
        text: "Hi [Name],\n\nLooping you in for approval on [task] — [Name] asked me to run this past you before we proceed. [Link attached].\n\nPlease let me know if you're happy for us to go ahead.\n\nThanks,\n[Your name]" },
      { tone: 'Minimal',
        preview: '"[Task] done. [Link]. Good to proceed?"',
        text: "[Name] — [task] done. [Link]. Good to proceed?" },
      { tone: 'Summary list',
        preview: '"Quick summary before you review: what changed, what stayed the same…"',
        text: "Hi [Name],\n\nQuick summary before you review [task]:\n\n✓ Changed: [what you updated]\n✓ Unchanged: [what stayed the same]\n✓ Flagged: [anything you want to draw attention to]\n\n[Link attached]\n\nLet me know if any adjustments are needed.\n\nThanks,\n[Your name]" },
      { tone: 'Experienced',
        preview: '"[Task] is solid — I\'m confident in the output. Happy for you to just approve."',
        text: "Hi [Name],\n\n[Task] is ready — [link]. I'm confident it meets the brief and has been fully QC'd. Happy for you to sign off without changes, but flag me if anything looks off.\n\n[Your name]" },
      { tone: 'With questions',
        preview: '"Ready for review — I also have two quick questions before final submission."',
        text: "Hi [Name],\n\n[Task] is ready for your review — [link].\n\nWhile I have you, two quick questions:\n1. [Question 1]\n2. [Question 2]\n\nHappy to discuss or just let me know in your reply.\n\nThanks,\n[Your name]" },
      { tone: 'Revision round',
        preview: '"I\'ve updated [task] based on your feedback — changes highlighted."',
        text: "Hi [Name],\n\nI've updated [task] based on your feedback — [link to revised version].\n\nChanges made:\n- [Change 1]\n- [Change 2]\n\nLet me know if this is now good to proceed, or if any further adjustments are needed.\n\nThanks,\n[Your name]" },
      { tone: 'Pre-vacation',
        preview: '"I\'m wrapping up before [date off] — sending [task] now so nothing is held up."',
        text: "Hi [Name],\n\nI'm signing off before [date] and wanted to make sure [task] doesn't hold anything up. [Link attached].\n\nIf you can review before [date], great — if not, [colleague] can follow up on my behalf.\n\nThanks,\n[Your name]" },
    ]
  },
  {
    id: 'urgent',
    badge: 'Urgent', badgeStyle: 'background:var(--rust-dim);color:var(--rust)',
    title: 'Urgent approval — deadline today',
    sub: 'Use when you need a same-day response',
    variants: [
      { tone: 'Standard',
        preview: '"Quick one — I need your sign-off before I can move forward. Deadline: [time]."',
        text: "Hi [Name],\n\nQuick one — I need your sign-off on [task] before I can move forward. Deadline is [date/time].\n\n[Attach file or link]\n\nHappy to jump on a call if easier.\n\nThanks,\n[Your name]" },
      { tone: 'Assertive',
        preview: '"[Task] needs to go out by [time]. File is ready — can you review ASAP?"',
        text: "Hi [Name],\n\n[Task] needs to go out by [time] today and I need your approval to proceed. File is ready — [link].\n\nCan you review in the next [X] minutes?\n\n[Your name]" },
      { tone: 'Calm',
        preview: '"Flagging a time-sensitive one — [task] is due [time] and needs your sign-off."',
        text: "Hi [Name],\n\nFlagging a time-sensitive one — [task] is due [time] and needs your sign-off before I can send/publish.\n\n[Link attached]\n\nEven a quick \"looks good\" works. Thanks!\n\n[Your name]" },
      { tone: 'Collaborative',
        preview: '"Want to make sure we hit the [time] deadline — file is ready, happy to call if faster."',
        text: "Hi [Name],\n\nWant to make sure we hit the [time] deadline on [task]. I've got the file ready — [link].\n\nHappy to jump on a quick call to walk you through it if that's faster than reviewing async.\n\nThanks,\n[Your name]" },
      { tone: 'Brief',
        preview: '"[Task] due [time]. Ready for review: [link]. Need approval to proceed."',
        text: "[Name] — [task] due [time]. Ready for review: [link]. Need your approval to proceed.\n\n[Your name]" },
      { tone: 'Slack',
        preview: '"⚡ Urgent: [task] needs your approval by [time]. [Link] — quick look if you can!"',
        text: "⚡ [Name] — [task] needs your approval by [time]. [Link] — quick look if you can. Even just \"approved\" works!\n\n[Your name]" },
      { tone: 'Escalating',
        preview: '"Following up on [task] — deadline in [X] hours and I still need your sign-off."',
        text: "Hi [Name],\n\nFollowing up on [task] — I sent this earlier but haven't heard back. Deadline is in [X] hours.\n\n[Link]\n\nI need your approval to proceed. Please let me know ASAP.\n\n[Your name]" },
      { tone: 'With backup plan',
        preview: '"Deadline in [X] hours. If I don\'t hear back by [time] I\'ll [backup plan]."',
        text: "Hi [Name],\n\n[Task] is due at [time] and ready for sign-off — [link].\n\nIf I don't hear back by [earlier time], I'll [backup plan, e.g., hold the send / check with [backup approver]]. Just want to make sure we're covered either way.\n\nThanks,\n[Your name]" },
      { tone: 'Phone follow-up',
        preview: '"Just tried calling — leaving this here too. [Task] needs approval by [time]."',
        text: "Hi [Name],\n\nJust tried calling — leaving this here as well. [Task] needs your approval by [time] today.\n\n[Link]\n\nPlease respond as soon as you can.\n\n[Your name]" },
      { tone: 'Minimal',
        preview: '"URGENT: [task] due [time]. Approved? [Link]"',
        text: "URGENT: [task] due [time]. Please approve: [link]\n\n[Your name]" },
      { tone: 'With context',
        preview: '"This is time-sensitive because [reason] — please prioritise if you can."',
        text: "Hi [Name],\n\nThis is time-sensitive — [task] needs to go out by [time] because [reason].\n\nFile is ready: [link]\n\nPlease prioritise if you can — even a quick sign-off is enough.\n\nThanks,\n[Your name]" },
      { tone: 'Two options',
        preview: '"Either approve by [time] or let me know if you need more time — I\'ll adjust."',
        text: "Hi [Name],\n\n[Task] is ready and due at [time] — [link].\n\nTwo options:\n1. Approve by [time] → I'll proceed as planned\n2. Let me know if you need more time → I'll adjust the timeline\n\nJust let me know either way.\n\n[Your name]" },
      { tone: 'Client-facing deadline',
        preview: '"This is going to a client at [time] — need your approval before then."',
        text: "Hi [Name],\n\nImportant one — [task] is going to [client/external party] at [time] and needs your approval before I send it.\n\n[Link attached]\n\nPlease review as soon as you're able.\n\nThanks,\n[Your name]" },
      { tone: 'Confident tone',
        preview: '"Everything\'s in order — just need your green light and I\'ll hit send at [time]."',
        text: "Hi [Name],\n\nEverything's in order on [task] — QC done, copy approved, file ready. Just need your green light and I'll hit send at [time].\n\n[Link]\n\n[Your name]" },
      { tone: 'After hours',
        preview: '"Sending this late because we have a [time] deadline tomorrow — apologies for the timing."',
        text: "Hi [Name],\n\nApologies for the late message — [task] has a [time] deadline tomorrow and I wanted to get it in front of you now.\n\n[Link attached]\n\nNo need to respond tonight — just hoping to catch you first thing.\n\nThanks,\n[Your name]" },
      { tone: 'Team channel',
        preview: '"@[Name] quick action needed: [task] due [time]. [Link]. Approve to unblock."',
        text: "@[Name] quick action needed — [task] due [time] and ready for sign-off. [Link]. Once approved I can proceed immediately.\n\n[Your name]" },
      { tone: 'Reassuring',
        preview: '"It\'s all ready — no changes needed from you, just a formal sign-off."',
        text: "Hi [Name],\n\nNothing complicated here — [task] is fully ready, QC'd, and just needs your formal sign-off before I submit/send. [Link].\n\nDeadline: [time].\n\nThanks,\n[Your name]" },
      { tone: 'Progress update',
        preview: '"Update: [task] is [X]% done. On track for [time] — sign-off needed once I send the final."',
        text: "Hi [Name],\n\nProgress update on [task]: [X]% done, on track for [time] deadline.\n\nI'll send the final for sign-off by [earlier time] — please keep [Y mins] free to review.\n\nThanks,\n[Your name]" },
      { tone: 'Concise Slack',
        preview: '"[task] → needs approval → due [time] → [link]"',
        text: "[task] → ready for approval → due [time] → [link]\n\n@[Name] can you sign off?" },
      { tone: 'Morning brief',
        preview: '"Good morning — first priority today: [task] needs your sign-off before [time]."',
        text: "Good morning [Name],\n\nFirst priority for today: [task] needs your sign-off before [time].\n\n[Link attached]\n\nI'll be standing by — let me know as soon as you've reviewed.\n\nThanks,\n[Your name]" },
    ]
  },
  {
    id: 'delay',
    badge: 'Delay', badgeStyle: 'background:var(--gold-dim);color:var(--gold)',
    title: 'Flagging a delay proactively',
    sub: 'Always send before the deadline, not after',
    variants: [
      { tone: 'Standard',
        preview: '"Heads up — [task] is at risk of missing the [date] deadline. Hold-up: [reason]."',
        text: "Hi [Name],\n\nHeads up — [task] is at risk of missing the [date] deadline. Hold-up: [reason].\n\nI'm currently [action]. Est. resolution: [time].\n\nLet me know if you'd like me to escalate.\n\n[Your name]" },
      { tone: 'Direct',
        preview: '"[Task] is running behind — [reason]. New ETA: [time]. I\'m on it."',
        text: "Hi [Name],\n\n[Task] is running behind — [reason]. Current ETA: [new time].\n\nI'm [what you're doing to fix it] and will update you when resolved.\n\n[Your name]" },
      { tone: 'Proactive',
        preview: '"Flagging early — [task] may be delayed. My plan: [action]. Does that work?"',
        text: "Hi [Name],\n\nFlagging early — [task] may be delayed due to [reason]. I wanted to let you know before it became a problem.\n\nMy plan: [action]. Does that work, or would you prefer a different approach?\n\n[Your name]" },
      { tone: 'Collaborative',
        preview: '"Running into a snag with [task] — flagging while we still have options."',
        text: "Hi [Name],\n\nRunning into a snag with [task] — [brief reason]. I don't think it'll impact the final deadline but I wanted to flag it now while we have options.\n\nI'm thinking [proposed solution] — let me know if you'd prefer a different approach.\n\n[Your name]" },
      { tone: 'Brief',
        preview: '"Heads up on [task]. Delay: [reason]. New ETA: [time]. On it."',
        text: "[Name] — heads up on [task]. Delay: [reason]. New ETA: [time]. On it.\n\n[Your name]" },
      { tone: 'Transparent',
        preview: '"I want to be upfront — [task] is behind and here\'s exactly why."',
        text: "Hi [Name],\n\nI want to be upfront with you — [task] is running behind schedule. Here's exactly what happened: [reason].\n\nHere's my plan to catch up: [steps]. New ETA: [time].\n\nI'll update you as soon as it's resolved.\n\n[Your name]" },
      { tone: 'Minimal',
        preview: '"Delay on [task]. Reason: [X]. New ETA: [time]. Flagging now."',
        text: "[Name] — delay on [task]. Reason: [X]. New ETA: [time]. Flagging so you're aware.\n\n[Your name]" },
      { tone: 'With options',
        preview: '"Two ways we could handle this — happy to go with whatever works for you."',
        text: "Hi [Name],\n\n[Task] is running behind — [reason]. I see two ways we could handle this:\n\nOption A: [action] — delivers by [later date]\nOption B: [action] — delivers by [original date] but [trade-off]\n\nHappy to go with whatever works best for you.\n\n[Your name]" },
      { tone: 'External hold',
        preview: '"The delay is on [supplier/external party] — I\'m chasing it now."',
        text: "Hi [Name],\n\nFlagging a delay on [task] — we're waiting on [supplier/external party] who hasn't delivered [item] yet. Deadline impact: [brief note].\n\nI've already followed up with them and am pushing for [revised date].\n\nI'll let you know as soon as it's resolved.\n\n[Your name]" },
      { tone: 'Internal dependency',
        preview: '"[Task] is held up waiting on [approval/input] — I\'m flagging in case you can unblock it."',
        text: "Hi [Name],\n\n[Task] is currently held up waiting on [approval/content/info] from [person/team]. I've followed up but wanted to flag it in case you can help unblock.\n\nCurrent impact: [minimal/may push deadline].\n\nLet me know if you'd like to step in or if I should keep chasing.\n\n[Your name]" },
      { tone: 'No impact yet',
        preview: '"Early flag — this won\'t affect the final deadline if we address it now."',
        text: "Hi [Name],\n\nEarly flag — [task] has hit a minor snag ([reason]), but it won't affect the final deadline as long as we address it in the next [timeframe].\n\nMy plan: [action].\n\nNo action needed from you right now — just keeping you in the loop.\n\n[Your name]" },
      { tone: 'Will miss deadline',
        preview: '"I need to be honest — [task] will not be ready by [date]. Here\'s why and what I\'m doing."',
        text: "Hi [Name],\n\nI need to be honest with you — [task] will not be ready by the original [date] deadline. [Reason].\n\nMy revised ETA is [new date]. I'm doing [action] to minimise the impact.\n\nI'm sorry for the delay. Let me know how you'd like to handle it.\n\n[Your name]" },
      { tone: 'Slack',
        preview: '"Quick heads up — [task] is going to be a bit late. [Reason]. ETA: [time]."',
        text: "Quick heads up [Name] — [task] is going to be a bit late. [Reason]. New ETA: [time]. I'll send it over as soon as it's ready.\n\n[Your name]" },
      { tone: 'Positive framing',
        preview: '"Good progress on [task] — we\'re nearly there, just need [X] more time."',
        text: "Hi [Name],\n\nGood progress on [task] — nearly there. I just need [X] more time to [reason]. New ETA: [time].\n\nEverything else is on track. I'll have it with you by [time].\n\nThanks for your patience,\n[Your name]" },
      { tone: 'After the fact',
        preview: '"I missed the [date] deadline on [task] — here\'s what happened and the current status."',
        text: "Hi [Name],\n\nI want to flag that I missed the [date] deadline on [task]. [Brief honest reason].\n\nCurrent status: [where it's at]. Expected completion: [new ETA].\n\nI'm sorry for not flagging this sooner. I'll make sure it doesn't happen again.\n\n[Your name]" },
      { tone: 'Cascading impact',
        preview: '"This delay may affect [related task] — here\'s my plan to limit the impact."',
        text: "Hi [Name],\n\nFlagging a delay on [task] — [reason]. Worth noting this may affect [downstream task] if not resolved by [date].\n\nMy plan: [action to limit impact].\n\nWanted to give you full visibility while we can still course-correct.\n\nThanks,\n[Your name]" },
      { tone: 'Request for help',
        preview: '"I\'m stuck on [task] — I\'d like your input before I fall further behind."',
        text: "Hi [Name],\n\nI'm stuck on [task] and wanted to flag it before the delay gets worse. [Brief description of blocker].\n\nI've tried [what you've done]. I'd value your input on the best way to proceed.\n\nThanks,\n[Your name]" },
      { tone: 'Supplier brief',
        preview: '"[Supplier] hasn\'t delivered — I\'m escalating and flagging impact on our timeline."',
        text: "Hi [Name],\n\n[Supplier] hasn't delivered [item] — original deadline was [date]. I've followed up twice with no response.\n\nPotential impact on our timeline: [brief note].\n\nI'm escalating on my end — do you want me to loop you in or continue managing directly?\n\n[Your name]" },
      { tone: 'Revised plan',
        preview: '"New plan attached — I\'ve adjusted timelines so everything still lands on track."',
        text: "Hi [Name],\n\n[Task] has hit a delay — [reason]. I've revised the plan to keep everything on track:\n\n[Updated step 1 — new date]\n[Updated step 2 — new date]\n\nFinal delivery still on target for [date].\n\nLet me know if you'd like to review the revised plan.\n\n[Your name]" },
      { tone: 'Team update',
        preview: '"Team heads up — [task] is behind. Here\'s the updated status for everyone."',
        text: "Team heads up — [task] is running behind schedule. Updated status:\n\n- [What's done]\n- [What's delayed and why]\n- [New ETA]\n\nI'll share the final output as soon as it's ready.\n\n[Your name]" },
    ]
  },
  {
    id: 'error',
    badge: 'Error', badgeStyle: 'background:var(--rust-dim);color:var(--rust)',
    title: 'Flagging a mistake',
    sub: 'Lead with facts, follow with your proposed fix',
    variants: [
      { tone: 'Standard',
        preview: '"I want to flag an issue with [task]. [Factual one sentence]…"',
        text: "Hi [Name],\n\nI want to flag an issue with [task]. [One factual sentence].\n\nI've [action taken]. Suggested next step: [recommendation].\n\nPlease let me know how you'd like to proceed.\n\n[Your name]" },
      { tone: 'Transparent',
        preview: '"I need to flag a mistake on [task]. Here\'s what happened and what I\'ve done."',
        text: "Hi [Name],\n\nI need to flag a mistake on [task]. [What happened — one sentence].\n\nI've already [action taken to fix or contain it]. The impact is [minimal/describe].\n\nHappy to talk through it — let me know how you'd like to handle it.\n\n[Your name]" },
      { tone: 'Direct',
        preview: '"[Issue] — flagging immediately. I\'ve [what you\'ve done]. Next step: [recommendation]."',
        text: "Hi [Name],\n\n[Issue] — flagging immediately. I've [what you've done to address it]. Recommended next step: [recommendation].\n\nSorry for the inconvenience. Let me know how to proceed.\n\n[Your name]" },
      { tone: 'Calm',
        preview: '"Flagging something from [task] I want to make sure we address."',
        text: "Hi [Name],\n\nFlagging something from [task] I want to make sure we address. [What happened].\n\nI'm [what you're doing]. Let me know if you'd like me to handle it differently.\n\nThanks,\n[Your name]" },
      { tone: 'Brief',
        preview: '"Issue with [task]: [one sentence]. Fixed/in progress: [action]. Flagging so you\'re aware."',
        text: "[Name] — issue with [task]: [one sentence]. Fixed/in progress: [action]. Flagging so you're aware.\n\n[Your name]" },
      { tone: 'Already fixed',
        preview: '"I made a mistake on [task] — I\'ve already fixed it. Here\'s what happened."',
        text: "Hi [Name],\n\nI made a mistake on [task] — [what happened]. I've already fixed it: [what you did].\n\nThe corrected [file/version] is here: [link].\n\nFlagging so you're aware — apologies for the error.\n\n[Your name]" },
      { tone: 'Not yet fixed',
        preview: '"There\'s an issue with [task] that needs your input before I can fix it."',
        text: "Hi [Name],\n\nThere's an issue with [task] that I need your input on before I can fix it. [What happened].\n\nI've paused [next step] until I hear from you — I don't want to make the wrong call here.\n\nWhat's your recommended approach?\n\n[Your name]" },
      { tone: 'Public error',
        preview: '"[Task] went live with an error — I\'m fixing it now and flagging immediately."',
        text: "Hi [Name],\n\n[Task] went live with an error — [brief description]. I'm fixing it right now: [action].\n\nFlagging immediately so you're across it. ETA for fix: [time].\n\nSorry for the issue — I'll update you as soon as it's resolved.\n\n[Your name]" },
      { tone: 'Wrong version',
        preview: '"I sent/published the wrong version of [file] — correct version is ready."',
        text: "Hi [Name],\n\nI sent [the wrong version / an outdated file] of [task]. [Brief context].\n\nCorrect version is ready here: [link].\n\nI've already [action taken — e.g., recalled the email, updated the page]. Apologies for the confusion.\n\n[Your name]" },
      { tone: 'Minimal',
        preview: '"Error on [task]: [one line]. Status: [fixed/in progress]. Flagged."',
        text: "[Name] — error on [task]: [one sentence]. Status: [fixed / in progress]. Let me know if you need anything from me.\n\n[Your name]" },
      { tone: 'No blame',
        preview: '"I want to flag something — not pointing fingers, just making sure we fix it."',
        text: "Hi [Name],\n\nI want to flag something on [task] — not pointing fingers, just want to make sure we address it properly. [What happened].\n\nMy recommended fix: [action].\n\nHappy to take ownership of this — just let me know how to proceed.\n\n[Your name]" },
      { tone: 'With root cause',
        preview: '"Here\'s what went wrong and what I\'m doing to make sure it doesn\'t happen again."',
        text: "Hi [Name],\n\nFlagging a mistake on [task]. What went wrong: [brief explanation]. Root cause: [what caused it].\n\nFix: [action]. Already done? [Yes/in progress].\n\nTo prevent recurrence: [process change you're making].\n\nSorry for the error.\n\n[Your name]" },
      { tone: 'Low impact',
        preview: '"Minor issue caught — fixing now. Impact is minimal but wanted you to know."',
        text: "Hi [Name],\n\nMinor issue caught on [task] — [brief description]. Impact is minimal but I wanted to flag it rather than quietly fix it.\n\nI'm correcting it now and it'll be back on track within [timeframe].\n\nThanks,\n[Your name]" },
      { tone: 'Collaborative fix',
        preview: '"I spotted an issue — I think the quickest fix is [X]. Can I go ahead?"',
        text: "Hi [Name],\n\nI've spotted an issue with [task] — [brief description].\n\nI think the quickest fix is [proposed action]. Can I go ahead with that?\n\nAlternatively, if you'd prefer to handle it differently, let me know.\n\n[Your name]" },
      { tone: 'After review',
        preview: '"On reviewing [task] I noticed [issue] — flagging before it causes a problem."',
        text: "Hi [Name],\n\nOn reviewing [task] I noticed [issue] that could cause a problem down the line. Flagging now before it gets further.\n\nProposed fix: [action].\n\nShould I go ahead or would you like to review first?\n\nThanks,\n[Your name]" },
      { tone: 'Proactive audit',
        preview: '"I was double-checking [task] and caught something — good news is it\'s easy to fix."',
        text: "Hi [Name],\n\nI was doing a final check on [task] and caught something — [brief description]. Good news is it's easy to fix.\n\nI'll [action] and have it corrected by [time].\n\nFlagging so you're across it.\n\nThanks,\n[Your name]" },
      { tone: 'Slack',
        preview: '"Hey — spotted an issue on [task]. [One sentence]. Fixing now, will update."',
        text: "Hey [Name] — spotted an issue on [task]. [One sentence description]. Fixing now, will update you shortly.\n\n[Your name]" },
      { tone: 'Formal apology',
        preview: '"I sincerely apologise for the error on [task]. Here is my account and corrective action."',
        text: "Hi [Name],\n\nI sincerely apologise for the error on [task]. Here is my account:\n\nWhat happened: [factual description]\nImpact: [honest assessment]\nCorrective action: [what you've done or will do]\n\nI take full responsibility and will ensure this doesn't happen again.\n\nKind regards,\n[Your name]" },
      { tone: 'Team-facing',
        preview: '"Team — there was an error on [task]. Here\'s the status and what we\'re doing."',
        text: "Team,\n\nThere was an error on [task] — [brief description]. Here's the current status:\n\n- What happened: [one sentence]\n- Impact: [minimal/moderate/significant]\n- Current fix status: [in progress / resolved]\n- ETA: [time]\n\nI'll update this thread when it's resolved.\n\n[Your name]" },
      { tone: 'New starter',
        preview: '"I think I made a mistake and wanted to tell you straight away — here\'s what happened."',
        text: "Hi [Name],\n\nI think I made a mistake and wanted to tell you straight away rather than try to fix it quietly. [What happened].\n\nI'm not sure of the best way to fix it — could you advise?\n\nSorry for the error.\n\n[Your name]" },
    ]
  },
  {
    id: 'followup',
    badge: 'Follow-up', badgeStyle: 'background:var(--lav-dim);color:var(--lavender)',
    title: 'Following up — unanswered message',
    sub: 'Wait 24–48 hrs before sending',
    variants: [
      { tone: 'Standard',
        preview: '"Following up re: [topic] — making sure it didn\'t get buried."',
        text: "Hi [Name],\n\nFollowing up on my message from [date] re: [topic]. Just checking if you've had a chance to review.\n\nNo rush — just want to make sure it didn't get buried.\n\nThanks,\n[Your name]" },
      { tone: 'Friendly',
        preview: '"Just bumping this up in your inbox in case it got lost!"',
        text: "Hi [Name],\n\nJust bumping this up in your inbox in case it got lost! Re: [topic] from [date].\n\nLet me know when you get a chance — no urgency.\n\nThanks,\n[Your name]" },
      { tone: 'Direct',
        preview: '"Following up on [topic] — still waiting on [what you need] before I can move forward."',
        text: "Hi [Name],\n\nFollowing up on [topic] — sent [date]. Still waiting on [what you need] before I can move forward.\n\nLet me know if you need anything from my end.\n\n[Your name]" },
      { tone: 'Contextual',
        preview: '"Circling back on [topic] — flagging because [deadline reason]."',
        text: "Hi [Name],\n\nCircling back on [topic] — I sent this on [date] and wanted to check it wasn't missed. Flagging because [brief reason — e.g., deadline approaching].\n\nHappy to resend or clarify anything if needed.\n\nThanks,\n[Your name]" },
      { tone: 'Concise',
        preview: '"Checking in on [topic] from [date]. Any update?"',
        text: "[Name] — checking in on [topic] from [date]. Any update?\n\n[Your name]" },
      { tone: 'Minimal',
        preview: '"Bump — [topic], sent [date]. Still need [X]."',
        text: "[Name] — bump on [topic] from [date]. Still need [what you need] to move forward.\n\n[Your name]" },
      { tone: 'Third follow-up',
        preview: '"Third and final nudge on [topic] — let me know if this is no longer needed."',
        text: "Hi [Name],\n\nThird and final nudge on [topic] from [date] — let me know if this is no longer needed or if it's been handled elsewhere.\n\nHappy to close it off on my end if so.\n\nThanks,\n[Your name]" },
      { tone: 'Slack',
        preview: '"Hey — just following up on [topic]. Did you get a chance to look?"',
        text: "Hey [Name] — just following up on [topic] I sent on [date]. Did you get a chance to look? No rush, just didn't want it to get lost!\n\n[Your name]" },
      { tone: 'With resend',
        preview: '"Resending this in case it got buried — [topic] from [date]."',
        text: "Hi [Name],\n\nResending this in case it got buried — re: [topic] from [date].\n\n[Brief summary of what you need]\n\nLet me know if you have any questions.\n\nThanks,\n[Your name]" },
      { tone: 'Proactive',
        preview: '"Checking in before the deadline — still waiting on [X] to move [task] forward."',
        text: "Hi [Name],\n\nChecking in before [deadline/date] — I'm still waiting on [what you need] to move [task] forward.\n\nIf you're blocked or the priorities have shifted, let me know and I'll adjust.\n\nThanks,\n[Your name]" },
      { tone: 'With deadline context',
        preview: '"Following up with some urgency — [deadline] is coming up and I need [X]."',
        text: "Hi [Name],\n\nFollowing up on [topic] from [date] — I want to flag that [deadline] is approaching and I still need [what you need] to proceed.\n\nLet me know if you need anything from my end to help move it along.\n\nThanks,\n[Your name]" },
      { tone: 'Alternative channel',
        preview: '"Tried email — following up here in case that\'s easier for you."',
        text: "Hi [Name],\n\nTried email on [date] — following up here in case Slack/Teams is easier. Re: [topic].\n\nI need [what you need] to proceed. Happy to jump on a quick call if that's faster.\n\n[Your name]" },
      { tone: 'Understanding',
        preview: '"I know you\'re busy — just flagging this so [task] stays on track."',
        text: "Hi [Name],\n\nI know you're busy — just flagging [topic] so [task] stays on track. I sent this on [date] and am still waiting on [what you need].\n\nNo pressure, just didn't want it to get lost in the shuffle.\n\nThanks,\n[Your name]" },
      { tone: 'With summary',
        preview: '"Quick recap of what I sent and what I\'m still waiting on."',
        text: "Hi [Name],\n\nQuick recap of where things stand:\n\n📤 Sent: [what you sent, on what date]\n⏳ Still waiting on: [what you need]\n🎯 Impact: [what's blocked until you get it]\n\nLet me know when you get a chance.\n\nThanks,\n[Your name]" },
      { tone: 'Close the loop',
        preview: '"If this has been handled or is no longer needed, just let me know and I\'ll close it."',
        text: "Hi [Name],\n\nFollowing up on [topic] from [date]. If this has been handled elsewhere or is no longer needed, just let me know and I'll close it off on my end.\n\nOtherwise, still waiting on [what you need].\n\nThanks,\n[Your name]" },
      { tone: 'Via Monday',
        preview: '"Updating this card to flag I\'m still waiting on a response — [date sent]."',
        text: "@[Name] — following up on this. I sent [message/approval request] on [date] and haven't heard back yet.\n\nPlease review and update the status or leave a comment so I can move this forward. Thanks!" },
      { tone: 'Formal',
        preview: '"I am writing to follow up on my previous correspondence dated [date]."',
        text: "Dear [Name],\n\nI am writing to follow up on my previous correspondence dated [date], regarding [topic].\n\nI have not yet received a response and would appreciate your guidance on how to proceed.\n\nPlease let me know at your earliest convenience.\n\nKind regards,\n[Your name]" },
      { tone: 'New starter',
        preview: '"I\'m not sure if I\'m following the right process — checking in on [topic]."',
        text: "Hi [Name],\n\nI'm not sure if I've followed the right process here — checking in on [topic] I sent on [date].\n\nPlease let me know if I need to send it differently or if there's a better way to flag things for your review.\n\nThanks,\n[Your name]" },
      { tone: 'No blame',
        preview: '"I\'m sure it just got lost in a busy week — following up on [topic]."',
        text: "Hi [Name],\n\nI'm sure it just got lost in a busy week — following up on [topic] from [date].\n\nNo urgency, just wanted to make sure it's on your radar.\n\nThanks,\n[Your name]" },
      { tone: 'Decision needed',
        preview: '"I need a decision on [topic] to unblock [task] — here are the options."',
        text: "Hi [Name],\n\nFollowing up on [topic] — I need a decision to unblock [task].\n\nHere are the options:\n- [Option A]\n- [Option B]\n\nHappy with either — just let me know which direction to go.\n\n[Your name]" },
    ]
  },
  {
    id: 'chase',
    badge: 'Chase', badgeStyle: 'background:var(--lav-dim);color:var(--lavender)',
    title: 'Chasing a dependency',
    sub: 'Waiting on someone else — professional, not pushy',
    variants: [
      { tone: 'Standard',
        preview: '"Still waiting on this before I can move [next step] forward…"',
        text: "Hi [Name],\n\nJust checking in on [task/approval] — still waiting on this before I can move [next step] forward.\n\nCurrent status: [what's ready, what's blocked].\n\nThanks,\n[Your name]" },
      { tone: 'Direct',
        preview: '"[Next step] is on hold until I have [what you need] from you. ETA?"',
        text: "Hi [Name],\n\n[Next step] is on hold until I have [what you need] from you. Can you give me an ETA?\n\nHappy to help move it along if there's anything blocking you.\n\n[Your name]" },
      { tone: 'Collaborative',
        preview: '"I\'m ready on my end — just need [specific item] from you to proceed."',
        text: "Hi [Name],\n\nI want to keep [project] moving — I'm ready on my end but need [specific item] from you to proceed.\n\nNo pressure, just flagging so it doesn't sneak up on us closer to deadline.\n\nThanks,\n[Your name]" },
      { tone: 'Detailed',
        preview: '"Here\'s where things stand: ✓ Done / ⏳ Waiting on you / → Next step…"',
        text: "Hi [Name],\n\nFollowing up on [task] — here's where things stand:\n\n✓ Done: [what you've completed]\n⏳ Waiting on: [what you need from them]\n→ Next step once received: [what you'll do]\n\nLet me know if there's anything I can do to help move this along.\n\nThanks,\n[Your name]" },
      { tone: 'Concise',
        preview: '"Waiting on [item] to move forward on [task]. Any update on timing?"',
        text: "[Name] — waiting on [item] to move forward on [task]. Any update on timing?\n\n[Your name]" },
      { tone: 'Minimal',
        preview: '"Chasing [item] for [task] — do you have an ETA?"',
        text: "[Name] — chasing [item] for [task]. Do you have an ETA?\n\n[Your name]" },
      { tone: 'With deadline',
        preview: '"Our deadline for [task] is [date] — I need [item] by [date] to stay on track."',
        text: "Hi [Name],\n\nOur deadline for [task] is [date]. To stay on track, I need [item] from you by [earlier date].\n\nCan you confirm whether that's achievable?\n\nThanks,\n[Your name]" },
      { tone: 'Friendly',
        preview: '"Just a gentle nudge — [task] is waiting on [item] from your end!"',
        text: "Hi [Name],\n\nJust a gentle nudge — [task] is waiting on [item] from your end! No urgency yet, but I wanted to flag it before it becomes one.\n\nLet me know if you need anything from me.\n\nThanks,\n[Your name]" },
      { tone: 'Slack',
        preview: '"Hey — still waiting on [item] for [task]. Can you give me an ETA?"',
        text: "Hey [Name] — still waiting on [item] for [task]. Can you give me an ETA? Don't want it to hold things up!\n\n[Your name]" },
      { tone: 'With impact',
        preview: '"Without [item], [next step] can\'t proceed — flagging before it hits the deadline."',
        text: "Hi [Name],\n\nFlagging that [task] can't proceed until I receive [item] from you. Without it, [next step] is blocked.\n\nDeadline impact: [minimal/could push timeline].\n\nCan you give me an ETA so I can plan accordingly?\n\nThanks,\n[Your name]" },
      { tone: 'Upstream dependency',
        preview: '"[Person] needs [item] from me, which I can\'t provide until I have [X] from you."',
        text: "Hi [Name],\n\nJust a heads up — [downstream person/team] needs [item] from me by [date], and I can't provide it until I have [what you need] from you.\n\nCould you share [X] by [earlier date] so I can keep things moving?\n\nThanks,\n[Your name]" },
      { tone: 'Via Monday',
        preview: '"@[Name] — this card is blocked waiting on [item]. Can you update with an ETA?"',
        text: "@[Name] — this task is currently blocked waiting on [item]. Can you update this card with an ETA or leave a comment?\n\nI don't want to miss the [date] deadline." },
      { tone: 'Offer to help',
        preview: '"If there\'s something I can do to speed this along, I\'m happy to help."',
        text: "Hi [Name],\n\nI'm following up on [item] for [task] — still blocked without it. If there's something I can do on my end to speed this along, I'm happy to help.\n\nOtherwise, just an ETA would be great.\n\nThanks,\n[Your name]" },
      { tone: 'Second chase',
        preview: '"Second follow-up on [item] — if it\'s held up, please let me know so I can flag the delay."',
        text: "Hi [Name],\n\nSecond follow-up on [item] for [task]. If there's something holding it up, please let me know so I can flag the potential delay to [Marketing Lead].\n\nI'd rather flag early than miss the deadline.\n\nThanks,\n[Your name]" },
      { tone: 'Formal',
        preview: '"I am writing to request an update on the status of [item], required for [task]."',
        text: "Dear [Name],\n\nI am writing to request an update on the status of [item], which is required for [task] with a deadline of [date].\n\nCould you please advise when I can expect to receive it?\n\nKind regards,\n[Your name]" },
      { tone: 'List of needs',
        preview: '"Here\'s everything I still need from you to wrap up [task]."',
        text: "Hi [Name],\n\nHere's everything I still need from you to wrap up [task]:\n\n1. [Item 1] — needed by [date]\n2. [Item 2] — needed by [date]\n3. [Item 3 if applicable]\n\nHappy to jump on a call if it's easier to run through these together.\n\nThanks,\n[Your name]" },
      { tone: 'With alternatives',
        preview: '"If [item] isn\'t available, I can work with [alternative] as a stopgap."',
        text: "Hi [Name],\n\nStill waiting on [item] for [task]. If it's not available yet, I can work with [alternative] as a stopgap to keep things moving.\n\nJust let me know which works for you.\n\nThanks,\n[Your name]" },
      { tone: 'Polite escalation',
        preview: '"I\'ve reached out a couple of times — would it help if [lead] followed up directly?"',
        text: "Hi [Name],\n\nI've reached out a couple of times about [item] for [task] without a response — I just want to make sure it hasn't been missed.\n\nWould it help if [Marketing Lead/your manager] reached out directly to move it along?\n\nLet me know how you'd like to handle it.\n\nThanks,\n[Your name]" },
      { tone: 'Brief status update',
        preview: '"Quick status: [task] is [X]% done. Still blocked on [item]."',
        text: "Hi [Name],\n\nQuick status update on [task]: [X]% complete.\n\nCurrently blocked on [item] from you. Once I have that, I can have the final output ready by [date].\n\nThanks,\n[Your name]" },
      { tone: 'Gracious',
        preview: '"I appreciate you\'re busy — just flagging [item] when you get a moment."',
        text: "Hi [Name],\n\nI appreciate you're busy — just flagging [item] when you get a moment. I need it to complete [task] and the deadline is [date].\n\nNo rush before then, just wanted it on your radar.\n\nThanks,\n[Your name]" },
    ]
  },
  {
    id: 'eow',
    badge: 'EOW', badgeStyle: 'background:var(--teal-dim);color:var(--teal)',
    title: 'Friday EOW summary',
    sub: 'Send every Friday — builds trust faster than anything else',
    variants: [
      { tone: 'Standard',
        preview: '"Completed: [tasks]. In progress: [tasks]. Waiting on: [items]…"',
        text: "Hi [Name],\n\nEnd-of-week wrap:\n\nCompleted:\n- [task 1]\n- [task 2]\n\nIn progress:\n- [task] on track for [date]\n\nWaiting on:\n- [item from whom]\n\nHave a good weekend,\n[Your name]" },
      { tone: 'Friendly',
        preview: '"Here\'s my wrap for the week — ✅ Done / 🔄 In progress / ⏳ Blocked…"',
        text: "Hi [Name],\n\nHere's my wrap for the week:\n\n✅ Done: [task 1], [task 2]\n🔄 In progress: [task] — on track\n⏳ Blocked/waiting: [item]\n\nAnything you need from me before I sign off? Have a great weekend!\n\n[Your name]" },
      { tone: 'Detailed',
        preview: '"Weekly summary with outcomes, status, dependencies, and next week\'s focus…"',
        text: "Hi [Name],\n\nWeekly summary:\n\nCompleted this week:\n- [Task 1] — [brief outcome]\n- [Task 2] — [brief outcome]\n\nIn progress (carrying to next week):\n- [Task] — [status + ETA]\n\nItems I need from others:\n- [What] from [who] by [when]\n\nFocus for next week:\n- [Priority 1]\n- [Priority 2]\n\nLet me know if you'd like to discuss anything.\n\nHave a great weekend,\n[Your name]" },
      { tone: 'Bullet',
        preview: '"→ Done | → In progress | → Blocked | → Next week priority"',
        text: "Week ending [date]:\n\n→ Done: [task 1] | [task 2] | [task 3]\n→ In progress: [task] (due [date])\n→ Blocked: [item] — waiting on [person]\n→ Next week priority: [task]\n\n[Your name]" },
      { tone: 'Concise',
        preview: '"[Task 1] done, [task 2] done. [Task 3] in progress. Waiting on [item]."',
        text: "EOW — [task 1] done, [task 2] done. [Task 3] in progress, on track for [date]. Waiting on [item] from [person].\n\n[Your name]" },
      { tone: 'Wins-focused',
        preview: '"Big wins this week: [highlights]. Everything else on track."',
        text: "Hi [Name],\n\nBig wins this week:\n- [Win 1]\n- [Win 2]\n\nEverything else on track:\n- [Task] — [status]\n\nWaiting on: [item] from [person]\n\nHave a good weekend!\n\n[Your name]" },
      { tone: 'New starter',
        preview: '"Week [X] wrap — here\'s what I worked on. Would love your feedback."',
        text: "Hi [Name],\n\nWeek [X] wrap:\n\nWhat I worked on:\n- [Task 1] — [status/outcome]\n- [Task 2] — [status/outcome]\n\nQuestions / areas I'd like feedback on:\n- [Question 1]\n\nAnything I should be prioritising differently next week?\n\nThanks and have a great weekend,\n[Your name]" },
      { tone: 'Minimal Slack',
        preview: '"EOW: [task 1] ✓ [task 2] ✓ [task 3] in progress. Have a good one!"',
        text: "EOW: [task 1] ✓ [task 2] ✓ [task 3] in progress (due [date]) — [item] waiting on [person]. Have a good weekend!\n\n[Your name]" },
      { tone: 'With context',
        preview: '"Here\'s what I delivered, what I learned, and what\'s up next week."',
        text: "Hi [Name],\n\nEnd-of-week summary:\n\nDelivered:\n- [Task 1]\n- [Task 2]\n\nNoteworthy: [something you learned or improved]\n\nCarrying forward:\n- [Task] — ETA [date]\n\nNext week priority: [task]\n\nHave a great weekend,\n[Your name]" },
      { tone: 'Challenges',
        preview: '"Good week overall, though I want to flag [challenge] — here\'s how I\'m handling it."',
        text: "Hi [Name],\n\nGood week overall.\n\nCompleted: [task 1], [task 2]\nIn progress: [task] — on track\n\nWant to flag: [challenge or blocker]. My plan: [action].\n\nAnything you'd like me to handle differently?\n\nHave a great weekend,\n[Your name]" },
      { tone: 'Numbers',
        preview: '"This week: [X] tasks completed, [X] in progress, [X] hrs logged."',
        text: "Hi [Name],\n\nThis week:\n- [X] tasks completed\n- [X] tasks in progress\n- [X] hours logged\n\nKey deliverables: [task 1], [task 2]\nWaiting on: [item] from [person]\nNext week focus: [priority]\n\nHave a good weekend,\n[Your name]" },
      { tone: 'Proactive',
        preview: '"Before you sign off — here\'s my status and anything that needs your attention."',
        text: "Hi [Name],\n\nBefore you sign off for the week — here's my status:\n\nCompleted: [tasks]\nIn progress: [tasks]\n\nNeeds your attention next week:\n- [Item 1]\n- [Item 2]\n\nHave a great weekend!\n\n[Your name]" },
      { tone: 'Acknowledgements',
        preview: '"Thanks for your help with [X] this week — here\'s a recap of the week."',
        text: "Hi [Name],\n\nThanks for your help with [item] this week — it made a real difference.\n\nWeek recap:\nCompleted: [task 1], [task 2]\nIn progress: [task] — ETA [date]\nWaiting on: [item]\n\nHave a great weekend,\n[Your name]" },
      { tone: 'Quiet week',
        preview: '"Quieter week — here\'s what I focused on and how I used the time."',
        text: "Hi [Name],\n\nQuieter week — here's what I focused on:\n\n- [Task 1] — [outcome]\n- [Task 2] — [outcome]\n- Used the extra time to [proactive thing, e.g., update trackers, tidy shared folders, review templates]\n\nAvailable next week for anything you'd like to push forward.\n\nHave a good weekend,\n[Your name]" },
      { tone: 'Busy week',
        preview: '"Big week — here\'s everything I moved forward."',
        text: "Hi [Name],\n\nBig week — here's everything I moved forward:\n\n✓ [Task 1]\n✓ [Task 2]\n✓ [Task 3]\n✓ [Task 4]\n\nStill in progress: [task] (on track)\nWaiting on: [item]\n\nHave a great weekend — I need one!\n\n[Your name]" },
      { tone: 'Team channel',
        preview: '"Team EOW: here\'s the collective status across [project/area]."',
        text: "Team EOW — [area/project] status:\n\n✓ Completed this week: [tasks]\n🔄 In progress: [tasks + ETAs]\n⏳ Waiting on: [items from whom]\n🎯 Priority next week: [task]\n\nHave a great weekend everyone!\n\n[Your name]" },
      { tone: 'Forward-looking',
        preview: '"Wrapping up — here\'s what I\'m setting up for a strong start next week."',
        text: "Hi [Name],\n\nWrapping up for the week.\n\nThis week: [task 1] ✓ [task 2] ✓\nIn progress: [task] — resuming Monday\nWaiting on: [item]\n\nReady for next week:\n- [Prepared item 1]\n- [Prepared item 2]\n\nHave a great weekend!\n\n[Your name]" },
      { tone: 'With questions',
        preview: '"EOW wrap + two quick questions for when you\'re back on Monday."',
        text: "Hi [Name],\n\nEOW wrap:\nCompleted: [task 1], [task 2]\nIn progress: [task] — on track\n\nTwo quick questions for Monday:\n1. [Question 1]\n2. [Question 2]\n\nHave a great weekend!\n\n[Your name]" },
      { tone: 'Simple paragraph',
        preview: '"Short and sweet — here\'s the week in a paragraph."',
        text: "Hi [Name],\n\nQuick EOW — completed [task 1] and [task 2] this week. [Task 3] is in progress and on track for [date]. Still waiting on [item] from [person] but nothing blocking for now. Have a great weekend!\n\n[Your name]" },
      { tone: 'Metrics week',
        preview: '"Campaign week: [sends], [open rate], [clicks]. Full report attached."',
        text: "Hi [Name],\n\nEOW — campaign week summary:\n\n- Emails sent: [X]\n- Open rate: [X]%\n- Click rate: [X]%\n- Unsubscribes: [X]\n\nFull report: [link]\n\nNext week: [campaign/task].\n\nHave a great weekend,\n[Your name]" },
    ]
  },
  {
    id: 'supplier',
    badge: 'Supplier', badgeStyle: 'background:var(--sage-dim);color:var(--sage)',
    title: 'Sending a supplier brief',
    sub: 'Attach the file — always use pre-approved briefs',
    variants: [
      { tone: 'Standard',
        preview: '"Brief attached. Deliverable: [X]. Deadline: [date]. Please confirm receipt."',
        text: "Hi [Supplier],\n\nRe: [job name]. Brief attached.\n\nDeliverable: [what]\nSpecs: [format/size/qty]\nDeadline: [date]\n\nPlease confirm receipt and ability to deliver by [date].\n\nThanks,\n[Your name]" },
      { tone: 'Detailed',
        preview: '"Please find attached the brief for [job name]. Summary of key specs inside…"',
        text: "Hi [Supplier],\n\nPlease find attached the brief for [job name].\n\nSummary:\n- Deliverable: [what]\n- Format/specs: [details]\n- Quantity: [if applicable]\n- Deadline: [date]\n\nPlease acknowledge receipt and confirm you can meet the deadline. Flag any concerns by [date] so we have time to adjust.\n\nThanks,\n[Your name]" },
      { tone: 'Direct',
        preview: '"[Job name] brief attached. Confirm you can deliver [deliverable] by [date]."',
        text: "Hi [Supplier],\n\nBrief for [job name] attached. Please review and confirm you can deliver by [date].\n\nKey specs: [format], [size], [qty].\n\nLet me know if you have any questions.\n\n[Your name]" },
      { tone: 'Relationship',
        preview: '"Hope you\'re well — same format as last time. Deadline: [date]."',
        text: "Hi [Supplier],\n\nHope you're well! Brief for [job name] is attached — same format as last time.\n\nDeadline: [date]. Let me know if you have any questions or need anything clarified.\n\nThanks as always,\n[Your name]" },
      { tone: 'Concise',
        preview: '"[Job name] brief attached. Need [deliverable] in [format] by [date]. Confirm?"',
        text: "[Supplier] — [job name] brief attached. Need [deliverable] in [format] by [date]. Please confirm receipt.\n\n[Your name]" },
      { tone: 'First time',
        preview: '"This is our first time working together — here\'s everything you need to know."',
        text: "Hi [Supplier],\n\nThis is our first time working together — welcome! Brief for [job name] is attached along with our brand guidelines.\n\nKey details:\n- Deliverable: [what]\n- Format/specs: [details]\n- Deadline: [date]\n\nPlease confirm receipt, flag any questions, and let me know if you can meet the deadline.\n\nLooking forward to working with you,\n[Your name]" },
      { tone: 'Rush job',
        preview: '"Apologies for the short turnaround — urgent brief attached. Can you deliver by [date]?"',
        text: "Hi [Supplier],\n\nApologies for the short turnaround — we have an urgent requirement.\n\nBrief attached. Can you deliver [deliverable] by [date]?\n\nPlease confirm ASAP so we can make alternative arrangements if needed.\n\nThanks,\n[Your name]" },
      { tone: 'With checklist',
        preview: '"Brief attached. Delivery checklist: format ☐ resolution ☐ deadline ☐ bleed ☐"',
        text: "Hi [Supplier],\n\nBrief for [job name] attached. Please ensure delivery meets the following:\n\n☐ Format: [format]\n☐ Resolution: [resolution]\n☐ Bleed/margins: [if applicable]\n☐ Deadline: [date]\n☐ File naming: [convention]\n\nPlease confirm you can deliver to spec.\n\nThanks,\n[Your name]" },
      { tone: 'Multiple deliverables',
        preview: '"Brief covers [X] deliverables — specs and deadlines differ per item."',
        text: "Hi [Supplier],\n\nBrief for [project name] attached — this covers [X] deliverables:\n\n1. [Deliverable 1] — [specs] — due [date]\n2. [Deliverable 2] — [specs] — due [date]\n3. [Deliverable 3] — [specs] — due [date]\n\nPlease confirm receipt and whether you can meet all deadlines.\n\nThanks,\n[Your name]" },
      { tone: 'Revision round',
        preview: '"Following last week\'s feedback — here\'s the updated brief with the changes noted."',
        text: "Hi [Supplier],\n\nFollowing our last delivery, I'm sending an updated brief for the next round. Changes from the previous version are highlighted in the document.\n\nDeadline for revised output: [date].\n\nPlease confirm receipt.\n\nThanks,\n[Your name]" },
      { tone: 'With brand guide',
        preview: '"Brief + brand guidelines attached — please read both before starting."',
        text: "Hi [Supplier],\n\nBrief for [job name] attached, along with our brand guidelines.\n\nPlease read both before starting — the guidelines cover logo usage, colour palette, and font specifications that must be followed exactly.\n\nDeadline: [date]. Please confirm receipt.\n\nThanks,\n[Your name]" },
      { tone: 'On behalf of',
        preview: '"Sending this on behalf of [Marketing Lead] — please direct any questions to me."',
        text: "Hi [Supplier],\n\nI'm reaching out on behalf of [Marketing Lead/Company] with the brief for [job name]. [Brief/file attached].\n\nI'll be your point of contact for this project — please direct any questions to me rather than [Marketing Lead] directly.\n\nDeadline: [date]. Please confirm receipt.\n\nThanks,\n[Your name]" },
      { tone: 'After a call',
        preview: '"As discussed on our call — brief is now attached with the agreed specs."',
        text: "Hi [Supplier],\n\nAs discussed on our call today — brief for [job name] is now attached with the agreed specs.\n\nJust to confirm what we covered:\n- [Point 1]\n- [Point 2]\n\nDeadline: [date]. Please confirm receipt.\n\nThanks,\n[Your name]" },
      { tone: 'With approval reference',
        preview: '"This brief has been internally approved — please proceed as outlined."',
        text: "Hi [Supplier],\n\nBrief for [job name] attached — this has been internally approved and you can proceed as outlined.\n\nKey specs: [details]\nDeadline: [date]\n\nPlease confirm receipt and delivery timeframe.\n\nThanks,\n[Your name]" },
      { tone: 'Closing confirmation',
        preview: '"Please reply confirming: receipt, ability to deliver, and your key contact for this job."',
        text: "Hi [Supplier],\n\nBrief for [job name] attached.\n\nPlease reply confirming:\n1. Receipt of this brief\n2. Ability to deliver by [date]\n3. Your key contact for this job\n\nOnce confirmed, we'll consider this project underway.\n\nThanks,\n[Your name]" },
      { tone: 'Ongoing supplier',
        preview: '"Monthly [job type] brief attached — same process as always."',
        text: "Hi [Supplier],\n\n[Month] [job type] brief attached — same process as always.\n\nThis month's changes: [brief note on what's different]\n\nDeadline: [date]. Please confirm receipt.\n\nThanks,\n[Your name]" },
      { tone: 'Print job',
        preview: '"Print brief attached — please note bleed, colour mode, and file spec requirements."',
        text: "Hi [Supplier],\n\nPrint brief for [job name] attached.\n\nKey print specs:\n- Dimensions: [W x H mm]\n- Bleed: 3mm all sides\n- Colour mode: CMYK\n- Resolution: 300 DPI minimum\n- File format: PDF/X-1a\n\nDeadline for print-ready file: [date]. Delivery date: [date].\n\nPlease confirm receipt and feasibility.\n\nThanks,\n[Your name]" },
      { tone: 'Digital job',
        preview: '"Digital brief attached — please confirm output specs before starting."',
        text: "Hi [Supplier],\n\nDigital brief for [job name] attached.\n\nKey digital specs:\n- Dimensions: [px]\n- Format: [JPG/PNG/GIF/MP4]\n- Max file size: [size]\n- Colour mode: RGB\n\nDeadline: [date].\n\nPlease confirm you can deliver to these specs.\n\nThanks,\n[Your name]" },
      { tone: 'Minimal',
        preview: '"[Job name] — brief attached. Deadline [date]. Any issues, call me."',
        text: "[Supplier] — [job name] brief attached. Deadline [date]. Any issues, contact me directly at [phone/email].\n\n[Your name]" },
      { tone: 'Post-quote',
        preview: '"Your quote has been approved — we\'re ready to proceed. Brief attached."',
        text: "Hi [Supplier],\n\nGood news — your quote for [job name] has been approved internally. We're ready to proceed.\n\nFull brief attached. Please review and confirm your start date.\n\nDeadline for delivery: [date].\n\nThanks,\n[Your name]" },
    ]
  },
  {
    id: 'revision',
    badge: 'Revision', badgeStyle: 'background:var(--sage-dim);color:var(--sage)',
    title: 'Requesting supplier revision',
    sub: 'Be specific — vague feedback means more rounds',
    variants: [
      { tone: 'Standard',
        preview: '"After review, the following needs to be addressed: [issues]…"',
        text: "Hi [Supplier],\n\nThank you for sending [deliverable]. After review, the following needs to be addressed:\n\n- [Issue 1 — be specific]\n- [Issue 2 if applicable]\n\nPlease revise and resend by [time/date].\n\nThanks,\n[Your name]" },
      { tone: 'Direct',
        preview: '"Reviewed [deliverable] — a few things need fixing before we\'re good."',
        text: "Hi [Supplier],\n\nReviewed [deliverable] — a few things need fixing:\n\n1. [Issue 1]\n2. [Issue 2]\n\nPlease resend revised version by [date].\n\n[Your name]" },
      { tone: 'Firm',
        preview: '"[Deliverable] does not meet brief. Required changes listed — please confirm receipt."',
        text: "Hi [Supplier],\n\n[Deliverable] does not meet brief. Required changes:\n\n- [Issue 1 — specific]\n- [Issue 2 — specific]\n\nWe need the corrected file by [specific time], [date]. Please confirm receipt of this feedback.\n\n[Your name]" },
      { tone: 'Detailed',
        preview: '"Thank you for the [deliverable]. I\'ve reviewed it and have the following feedback…"',
        text: "Hi [Supplier],\n\nThank you for the [deliverable]. I've reviewed it and have the following feedback:\n\n1. [Issue 1] — [specific detail/what's needed]\n2. [Issue 2] — [specific detail/what's needed]\n3. [Issue 3 if applicable]\n\nPlease address all points and resend by [date]. Questions? Reach me at [email].\n\nThanks,\n[Your name]" },
      { tone: 'Collaborative',
        preview: '"Thanks for getting this over — just a couple of tweaks and we\'re good to go."',
        text: "Hi [Supplier],\n\nThanks for getting [deliverable] over. A couple of things to tweak before we're good to go:\n\n- [Issue 1]\n- [Issue 2]\n\nNot major — just need those fixed. Can you turn it around by [date]?\n\nThanks,\n[Your name]" },
      { tone: 'Annotated file',
        preview: '"I\'ve added annotations to the file — please open and address each comment."',
        text: "Hi [Supplier],\n\nThank you for [deliverable]. I've reviewed it and added annotations to the file with specific feedback: [link].\n\nPlease open and address each comment, then resend by [date].\n\nLet me know if anything is unclear.\n\nThanks,\n[Your name]" },
      { tone: 'Wrong version',
        preview: '"It looks like you sent [old/wrong version] — please resend using [correct file]."',
        text: "Hi [Supplier],\n\nIt looks like [deliverable] was created from [wrong/outdated file] rather than the current approved template. Could you please redo this using [correct file/template — link]?\n\nRevised deadline: [date].\n\nThanks,\n[Your name]" },
      { tone: 'Brand issue',
        preview: '"There are brand compliance issues that must be fixed before we can approve this."',
        text: "Hi [Supplier],\n\nThank you for [deliverable]. Before we can approve, there are brand compliance issues that need to be addressed:\n\n- [Issue 1 — e.g., wrong logo version]\n- [Issue 2 — e.g., incorrect colour]\n- [Issue 3 — e.g., missing disclaimer]\n\nPlease refer to the brand guidelines [link] and resend by [date].\n\nThanks,\n[Your name]" },
      { tone: 'Minor tweaks',
        preview: '"Almost there — just two small changes and we\'re done."',
        text: "Hi [Supplier],\n\nAlmost there — just two small changes and we're done:\n\n1. [Change 1 — be specific]\n2. [Change 2 — be specific]\n\nPlease resend when done. No major revision needed — just those two fixes.\n\nThanks,\n[Your name]" },
      { tone: 'Copy error',
        preview: '"There\'s a copy error on [page/section] — the text should read: [correct copy]."',
        text: "Hi [Supplier],\n\nThere's a copy error in [deliverable].\n\nCurrent text: \"[incorrect text]\"\nCorrect text: \"[correct text as per approved brief]\"\n\nPlease correct and resend by [date].\n\nThanks,\n[Your name]" },
      { tone: 'Missed spec',
        preview: '"The file doesn\'t meet the [format/size/colour] spec outlined in the brief."',
        text: "Hi [Supplier],\n\nThe [deliverable] doesn't meet the spec outlined in the brief:\n\nRequired: [spec]\nReceived: [what was delivered]\n\nPlease resubmit to the correct spec by [date]. Brief is attached for reference.\n\nThanks,\n[Your name]" },
      { tone: 'Positive then issue',
        preview: '"The overall design is great — just a few compliance points before we can sign off."',
        text: "Hi [Supplier],\n\nThe overall design for [deliverable] is looking great. Before we can sign off, there are a few compliance points to address:\n\n- [Issue 1]\n- [Issue 2]\n\nThese are mandatory — can't be waived. Please update and resend by [date].\n\nThanks,\n[Your name]" },
      { tone: 'Second round',
        preview: '"Thanks for the revision — still a few outstanding issues from my previous feedback."',
        text: "Hi [Supplier],\n\nThank you for the revised [deliverable]. Still a few outstanding issues from my previous feedback:\n\n- [Issue still present]\n- [Issue still present]\n\nCould you please address these and resend by [date]?\n\nThanks,\n[Your name]" },
      { tone: 'With examples',
        preview: '"Please see the reference image I\'ve attached showing exactly what I\'m looking for."',
        text: "Hi [Supplier],\n\nThank you for [deliverable]. I've attached a reference image showing the specific look we're going for on [element].\n\nChanges needed:\n- [Issue] — see attached reference for guidance\n\nPlease revise and resend by [date].\n\nThanks,\n[Your name]" },
      { tone: 'Urgent revision',
        preview: '"We need this corrected today — the error is visible to [clients/public]."',
        text: "Hi [Supplier],\n\nUrgent — [deliverable] has an error that needs to be corrected today:\n\n- [Error — be specific]\n\nThis is [visible to clients / going to print / due to go live] and needs to be fixed before [time].\n\nPlease prioritise and resend ASAP.\n\n[Your name]" },
      { tone: 'One item only',
        preview: '"One change — [specific item]. Everything else is approved."',
        text: "Hi [Supplier],\n\nOne change needed on [deliverable]:\n\n- [Specific change]\n\nEverything else is approved. Please resend with just this fix by [date].\n\nThanks,\n[Your name]" },
      { tone: 'Numbered list',
        preview: '"Feedback numbered for easy reference — please address each point in order."',
        text: "Hi [Supplier],\n\nFeedback on [deliverable] — numbered for easy reference:\n\n1. [Issue — page/section, what's wrong, what's needed]\n2. [Issue — page/section, what's wrong, what's needed]\n3. [Issue — page/section, what's wrong, what's needed]\n\nPlease address all points and confirm once done. Revised version needed by [date].\n\nThanks,\n[Your name]" },
      { tone: 'With table',
        preview: '"Feedback in table format — column: issue, location, required fix."',
        text: "Hi [Supplier],\n\nFeedback on [deliverable] in table format:\n\nIssue | Location | Required fix\n[Issue 1] | [p.1 / section] | [specific fix]\n[Issue 2] | [p.2 / section] | [specific fix]\n[Issue 3] | [p.3 / section] | [specific fix]\n\nPlease address all items and resend by [date].\n\nThanks,\n[Your name]" },
      { tone: 'No more rounds',
        preview: '"Please address all feedback thoroughly — we don\'t have budget for more rounds."',
        text: "Hi [Supplier],\n\nFeedback on [deliverable]:\n\n- [Issue 1]\n- [Issue 2]\n- [Issue 3]\n\nPlease address all feedback thoroughly in this round — we don't have capacity for additional revision rounds beyond this.\n\nRevised version needed by [date]. Please review carefully before sending.\n\nThanks,\n[Your name]" },
      { tone: 'Minimal',
        preview: '"[Issue]. Please fix and resend by [date]. Thanks."',
        text: "[Supplier] — [specific issue with deliverable]. Please fix and resend by [date].\n\n[Your name]" },
    ]
  },
];

// ── TEMPLATE RENDERING — SHUFFLE ────────────────────────────────
const CARD_DISPLAY = {};

function getRandomIndices(total, count) {
  const indices = Array.from({ length: total }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}

function renderVariants(tplId, indices) {
  const tpl = TEMPLATES.find(t => t.id === tplId);
  if (!tpl) return '';
  return indices.map(i => {
    const v = tpl.variants[i];
    return `<div class="tpl-variant">
      <div class="tpl-variant-left">
        <span class="tpl-variant-tone">${v.tone}</span>
        <div class="tpl-variant-preview">${v.preview}</div>
      </div>
      <button class="tpl-variant-btn" onclick="copyVariant(this,'${tplId}',${i})">Copy</button>
    </div>`;
  }).join('');
}

function shuffleCard(tplId) {
  const tpl = TEMPLATES.find(t => t.id === tplId);
  if (!tpl) return;
  const display = 5;
  let newIdx;
  const current = CARD_DISPLAY[tplId] || [];
  let attempts = 0;
  do {
    newIdx = getRandomIndices(tpl.variants.length, display);
    attempts++;
  } while (attempts < 8 && JSON.stringify(newIdx.sort((a,b)=>a-b)) === JSON.stringify([...current].sort((a,b)=>a-b)));
  CARD_DISPLAY[tplId] = newIdx;
  const container = document.getElementById('tpl-variants-' + tplId);
  if (container) container.innerHTML = renderVariants(tplId, newIdx);
}

function renderTemplates() {
  const grid = document.getElementById('tpl-grid');
  if (!grid) return;
  grid.innerHTML = TEMPLATES.map(tpl => {
    if (!CARD_DISPLAY[tpl.id]) {
      CARD_DISPLAY[tpl.id] = getRandomIndices(tpl.variants.length, Math.min(5, tpl.variants.length));
    }
    const idx = CARD_DISPLAY[tpl.id];
    return `<div class="tpl-card">
      <div class="tpl-card-header">
        <span class="tpl-cat-badge" style="${tpl.badgeStyle}">${tpl.badge}</span>
        <div class="tpl-card-title">${tpl.title}</div>
        <div class="tpl-card-sub">${tpl.sub}</div>
      </div>
      <div class="tpl-variants" id="tpl-variants-${tpl.id}">${renderVariants(tpl.id, idx)}</div>
      <div class="tpl-card-footer">
        <span class="tpl-count-label">Showing 5 of ${tpl.variants.length}</span>
        <button class="tpl-shuffle-btn" onclick="shuffleCard('${tpl.id}')">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" width="11" height="11"><path d="M2 5h8l-2-2m0 4l2-2"/><path d="M12 9H4l2 2m0-4l-2 2"/></svg>
          Shuffle
        </button>
      </div>
    </div>`;
  }).join('');
}

function copyVariant(btn, tplId, variantIdx) {
  const tpl = TEMPLATES.find(t => t.id === tplId);
  if (!tpl) return;
  const text = tpl.variants[variantIdx].text;
  navigator.clipboard.writeText(text).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
  btn.textContent = '✓ Copied';
  btn.classList.add('copied');
  setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  const toast = document.getElementById('copy-toast');
  if (toast) { toast.style.display = 'block'; setTimeout(() => toast.style.display = 'none', 2000); }
}

// ── TASK TYPE MAP ───────────────────────────────────────────────
const TASK_TYPE_MAP = {
  email_campaign: {
    label: 'Email Campaign',
    checklistKeys: ['campaign_collateral', 'compliance_qc'],
    guideSteps: [
      { title: 'Receive approved brief + content', desc: 'Never start without written approval. Confirm: subject line, sender name, send time, list segment.' },
      { title: 'Build list in CRM / email platform', desc: 'Upload contacts, apply segmentation. Check compliance — consent, opt-outs, financial services rules.' },
      { title: 'Set up email using approved template', desc: 'Apply correct logo, disclaimer, formatting. No off-template design decisions.' },
      { title: 'Send test + run QC checklist', desc: 'Broken links? Correct sender? Disclaimer visible? Rendering on mobile? Do not skip this step.' },
      { title: 'Get final sign-off before scheduling', desc: 'Document approval (email or shared doc). Only then schedule the send.' },
      { title: 'Post-send: pull performance report', desc: 'Open rate, clicks, bounces, unsubscribes. Add to tracker. Brief Marketing Lead on results.' },
    ],
    templateIds: ['approval', 'urgent', 'delay'],
  },
  indesign_collateral: {
    label: 'InDesign Collateral',
    checklistKeys: ['qc_brand', 'qc_copy', 'qc_layout', 'qc_preflight'],
    guideSteps: [
      { title: 'Receive approved brief + copy', desc: 'Get written confirmation of: format, dimensions, approved copy, target audience, and delivery date.' },
      { title: 'Open the correct approved template', desc: 'Never recreate from scratch. Open the designated template file and check master pages match.' },
      { title: 'Place approved content only', desc: 'Paste approved copy — no edits without sign-off. Place all images at correct resolution.' },
      { title: 'Apply brand standards throughout', desc: 'Logo version, font, colour palette. Check Swatches panel. No off-brand elements.' },
      { title: 'Run full QC checklist', desc: 'Brand, copy, layout, and preflight sections. Resolve all preflight errors. Zero errors = proceed.' },
      { title: 'Export + send for approval', desc: 'Export PDF to correct spec. Attach to approval request. Get sign-off before sending to supplier or publishing.' },
    ],
    templateIds: ['approval', 'revision'],
  },
  event_setup: {
    label: 'Event Setup',
    checklistKeys: ['event_setup', 'event_materials'],
    guideSteps: [
      { title: 'Confirm event details with Marketing Lead', desc: 'Date, time, venue, expected headcount, guest list source, key message. Get written confirmation.' },
      { title: 'Add to shared calendar + notify team', desc: 'Calendar invite to all relevant team members. Include location, agenda, and lead-time notes.' },
      { title: 'Build and approve invitation list', desc: 'Pull from CRM using agreed criteria. Submit list for Marketing Lead approval before sending anything.' },
      { title: 'Prepare and send invitations', desc: 'Use approved template only. Personalise where required. Send in approved batches.' },
      { title: 'Set up RSVP tracking', desc: 'Create spreadsheet or CRM record. Log all responses. Update daily as RSVPs come in.' },
      { title: 'Coordinate supplier deliverables', desc: 'AV, catering, venue, materials. Confirm all via approved brief. Follow up 48 hrs before event.' },
    ],
    templateIds: ['supplier', 'approval'],
  },
  post_event: {
    label: 'Post-Event',
    checklistKeys: ['event_post'],
    guideSteps: [
      { title: 'Reconcile attendance immediately after event', desc: 'Compare final sign-in list vs confirmed RSVPs. Note no-shows and unexpected attendees.' },
      { title: 'Update CRM within 24 hours', desc: 'Log attendance records. Tag contacts with event attendance. Note any conversations requiring follow-up.' },
      { title: 'Prepare follow-up list for Marketing Lead', desc: 'Flag VIPs, prospects, or contacts requiring action. Include any feedback collected on the day.' },
      { title: 'Submit all supplier invoices for approval', desc: 'Collect all invoices. Match against approved quotes. Submit within 2 business days of event.' },
      { title: 'Archive all event materials', desc: 'Save invitations, signage, badge list, attendance records, photos to designated shared folder. Name correctly.' },
    ],
    templateIds: ['eow', 'followup'],
  },
  supplier_brief: {
    label: 'Supplier Brief',
    checklistKeys: ['compliance_qc'],
    guideSteps: [
      { title: 'Confirm brief is approved before sending', desc: 'Never send a brief to a supplier without written sign-off from Marketing Lead.' },
      { title: 'Prepare brief using approved template', desc: 'Include: deliverable, specs, deadline, contact details. Be specific — vague briefs cause revision rounds.' },
      { title: 'Send brief + request confirmation', desc: 'Email the supplier. Ask them to confirm receipt and ability to deliver by the deadline.' },
      { title: 'Monitor delivery and follow up', desc: 'If no confirmation within 24 hours, follow up. Set a reminder 48 hours before deadline.' },
      { title: 'Review deliverable on receipt', desc: 'Check against brief point-by-point. Use the QC checklist before accepting. Document any issues.' },
      { title: 'Confirm delivery to Marketing Lead', desc: 'Notify lead when supplier deliverable is received and QC\'d. Escalate any issues immediately.' },
    ],
    templateIds: ['supplier', 'revision'],
  },
  website_content: {
    label: 'Website / Content Update',
    checklistKeys: ['compliance_qc', 'campaign_collateral'],
    guideSteps: [
      { title: 'Receive approved content + instructions', desc: 'Get written approval for: copy, images, page location, go-live date. Nothing goes live without sign-off.' },
      { title: 'QC content before uploading', desc: 'Check: copy matches brief, images are correct resolution, no placeholder text, disclaimer present if required.' },
      { title: 'Make update in CMS', desc: 'Apply update per instructions. Screenshot before/after. No design changes without prior approval.' },
      { title: 'QC the live or staging page', desc: 'Check on desktop and mobile. Verify all links, images, and text display correctly. Check for broken layouts.' },
      { title: 'Get approval before going live', desc: 'Send screenshot or staging link for sign-off. Document approval before publishing.' },
      { title: 'Confirm live and update tracker', desc: 'Notify Marketing Lead once live. Add to campaign tracker with publish date and link.' },
    ],
    templateIds: ['approval', 'delay'],
  },
  general_admin: {
    label: 'General Admin',
    checklistKeys: ['compliance_qc'],
    guideSteps: [
      { title: 'Clarify the task scope and deadline', desc: 'If the brief is unclear, ask before starting. Write down: what needs to be done, when it\'s due, who approves it.' },
      { title: 'Check for dependencies', desc: 'Does this task require input or approval from someone else first? Identify blockers early and flag them.' },
      { title: 'Complete the task using approved process', desc: 'Follow the established procedure. If no procedure exists, ask your lead before improvising.' },
      { title: 'QC your own work before submitting', desc: 'Check: correct template used, all required fields complete, no errors, output matches brief.' },
      { title: 'Submit for approval with context', desc: 'Don\'t just send the file — include what was done and what you need from the approver.' },
      { title: 'Update tracker and file output', desc: 'Log completed task in Monday.com. Save all files to the correct shared folder. Mark task as Done.' },
    ],
    templateIds: ['approval', 'followup', 'chase'],
  },
};

const PRIORITY_ITEMS = {
  high: [
    { id: 'p_hi_1', label: 'Notify Marketing Lead of this task immediately', sub: 'Send a quick message: task name, deadline, and your starting point.', badge: 'critical' },
    { id: 'p_hi_2', label: 'Flag any blockers within 1 hour — do not absorb delays silently', sub: 'If anything is unclear or missing, message your lead now, not later.', badge: 'critical' },
  ],
  medium: [],
  low: [],
};

// ── TASK BUILDER STORAGE ────────────────────────────────────────
const TASKS_KEY = 'msc_tasks_v1';
function loadTasks() { try { return JSON.parse(localStorage.getItem(TASKS_KEY)) || {}; } catch { return {}; } }
function saveTasks(data) { localStorage.setItem(TASKS_KEY, JSON.stringify(data)); }

function generateTaskPlan(formData) {
  const { name, type, details, deadline, priority } = formData;
  const map = TASK_TYPE_MAP[type];
  if (!map) return null;

  const priorityItems = (PRIORITY_ITEMS[priority] || []);
  const typeItems = map.checklistKeys.flatMap(key => (CHECKLISTS[key] || []).map(item => ({ ...item })));
  const checklist = [...priorityItems, ...typeItems];

  const task = {
    id: 'task_' + Date.now(),
    name, type, details, deadline, priority,
    createdAt: new Date().toISOString(),
    checklist,
    guideSteps: map.guideSteps,
    templateIds: map.templateIds,
    checkState: {},
    addedToTimesheet: false,
  };

  const tasks = loadTasks();
  tasks[task.id] = task;
  saveTasks(tasks);
  return task;
}

function handleGenerateTask() {
  const name     = document.getElementById('tb-name')?.value?.trim();
  const type     = document.getElementById('tb-type')?.value;
  const priority = document.getElementById('tb-priority')?.value;
  const deadline = document.getElementById('tb-deadline')?.value;
  const details  = document.getElementById('tb-details')?.value?.trim();

  if (!name) { document.getElementById('tb-name')?.focus(); return; }
  if (!type) { document.getElementById('tb-type')?.focus(); return; }

  const task = generateTaskPlan({ name, type, details, deadline, priority: priority || 'medium' });
  if (!task) return;

  ['tb-name', 'tb-details'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  ['tb-type', 'tb-priority'].forEach(id => { const el = document.getElementById(id); if (el) el.selectedIndex = 0; });
  const deadlineEl = document.getElementById('tb-deadline');
  if (deadlineEl) deadlineEl.value = '';

  renderTaskBuilderPage();
  renderTaskDetail(task.id);
}

function toggleTaskItem(taskId, itemId) {
  const tasks = loadTasks();
  if (!tasks[taskId]) return;
  if (tasks[taskId].checkState[itemId]) delete tasks[taskId].checkState[itemId];
  else tasks[taskId].checkState[itemId] = true;
  saveTasks(tasks);

  const el = document.querySelector(`.check-item[data-task-id="${taskId}"][data-item-id="${itemId}"]`);
  if (el) el.classList.toggle('done');
  updateTaskProgress(taskId);
}

function updateTaskProgress(taskId) {
  const tasks = loadTasks();
  const task = tasks[taskId];
  if (!task) return;
  const total = task.checklist.length;
  const done  = task.checklist.filter(i => task.checkState[i.id]).length;
  const pct   = total ? Math.round(done / total * 100) : 0;
  const bar   = document.getElementById('task-progress-bar-' + taskId);
  if (bar) bar.style.width = pct + '%';
  const wrap  = bar?.closest('.task-gen-progress');
  if (wrap) {
    const lbl = wrap.querySelector('.progress-label span:first-child');
    if (lbl) lbl.textContent = done + ' / ' + total + ' checklist items complete';
  }
  const block = document.getElementById('task-checklist-' + taskId)?.closest('.section-block');
  if (block) { const cnt = block.querySelector('.sh-count'); if (cnt) cnt.textContent = done + '/' + total; }
  const saved = document.querySelector('[data-saved-id="' + taskId + '"] .saved-task-meta');
  if (saved) {
    const map = TASK_TYPE_MAP[task.type];
    saved.textContent = (map?.label || task.type) + ' · Due ' + formatDeadline(task.deadline) + ' · ' + done + '/' + total + ' done';
  }
}

function addToTimesheet(taskId) {
  const tasks = loadTasks();
  const task  = tasks[taskId];
  if (!task || task.addedToTimesheet) return;

  // Create a timesheet entry on today's date
  const now = new Date();
  const key = tsDateKey(now.getFullYear(), now.getMonth(), now.getDate());
  const ts  = loadTimesheet();
  if (!ts[key]) ts[key] = [];
  const map = TASK_TYPE_MAP[task.type];
  ts[key].push({
    title:    task.name,
    category: (['event_setup','post_event'].includes(task.type) ? 'events' :
               ['email_campaign','website_content'].includes(task.type) ? 'campaign' :
               ['indesign_collateral'].includes(task.type) ? 'design' :
               ['supplier_brief'].includes(task.type) ? 'admin' : 'admin'),
    minutes:  0,
    notes:    (map?.label || task.type) + (task.deadline ? ' · Due ' + task.deadline : ''),
  });
  saveTimesheet(ts);

  // Mark task as added
  task.addedToTimesheet = true;
  tasks[taskId] = task;
  saveTasks(tasks);

  // Update button in DOM
  const btn = document.getElementById('ts-add-btn-' + taskId);
  if (btn) {
    btn.textContent = '✓ Added to Timesheet';
    btn.classList.add('added');
    btn.disabled = true;
  }
}

function deleteTask(taskId) {
  const tasks = loadTasks();
  delete tasks[taskId];
  saveTasks(tasks);
  document.getElementById('taskbuilder-output').innerHTML = '';
  renderTaskBuilderPage();
}

function openSavedTask(taskId) {
  renderTaskDetail(taskId);
}

function closeTaskDetail() {
  document.getElementById('taskbuilder-output').innerHTML = '';
  document.getElementById('taskbuilder-output').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function formatDeadline(dateStr) {
  if (!dateStr) return 'No deadline';
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return MON[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

// ── TASK BUILDER RENDER ─────────────────────────────────────────
function renderTaskBuilderPage() {
  const saved = document.getElementById('taskbuilder-saved');
  if (!saved) return;

  const tasks = loadTasks();
  const taskList = Object.values(tasks).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (!taskList.length) { saved.innerHTML = ''; return; }

  saved.innerHTML = `
    <div class="tb-saved-header">Saved Task Plans</div>
    <div class="saved-tasks-list">
      ${taskList.map(task => {
        const map  = TASK_TYPE_MAP[task.type];
        const done = task.checklist.filter(i => task.checkState[i.id]).length;
        return `
          <div class="saved-task-card" data-saved-id="${task.id}">
            <div class="saved-task-left" onclick="openSavedTask('${task.id}')">
              <span class="priority-badge ${task.priority}">${task.priority}</span>
              <div>
                <div class="saved-task-name">${task.name}</div>
                <div class="saved-task-meta">${map?.label || task.type} · Due ${formatDeadline(task.deadline)} · ${done}/${task.checklist.length} done</div>
              </div>
            </div>
            <button class="saved-task-delete" onclick="deleteTask('${task.id}')" title="Delete task">
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>
            </button>
          </div>`;
      }).join('')}
    </div>`;
}

function renderTaskDetail(taskId) {
  const tasks = loadTasks();
  const task  = tasks[taskId];
  if (!task) return;
  const output = document.getElementById('taskbuilder-output');
  if (!output) return;

  const map   = TASK_TYPE_MAP[task.type];
  const total = task.checklist.length;
  const done  = task.checklist.filter(i => task.checkState[i.id]).length;
  const pct   = total ? Math.round(done / total * 100) : 0;

  const checklistHTML = task.checklist.map(item => {
    const isDone = !!task.checkState[item.id];
    let badgeHTML = '';
    if (item.badge === 'critical')      badgeHTML = '<span class="ci-badge critical">critical</span>';
    else if (item.badge === 'warn')     badgeHTML = '<span class="ci-badge warn">flag</span>';
    else if (item.badge === 'common miss') badgeHTML = '<span class="ci-badge warn">common miss</span>';
    else if (item.badge === 'print')    badgeHTML = '<span class="ci-badge print">print only</span>';
    return `
      <div class="check-item${isDone ? ' done' : ''}" data-task-id="${taskId}" data-item-id="${item.id}" onclick="toggleTaskItem('${taskId}','${item.id}')">
        <div class="check-box"><svg viewBox="0 0 12 12"><polyline points="1,6 4.5,10 11,2"/></svg></div>
        <div>
          <div class="ci-label">${item.label}${badgeHTML}</div>
          ${item.sub ? `<div class="ci-sub">${item.sub}</div>` : ''}
        </div>
      </div>`;
  }).join('');

  const guideHTML = task.guideSteps.map((step, i) => `
    <div class="phase-row">
      <div class="phase-num">${i + 1}</div>
      <div>
        <div class="phase-title">${step.title}</div>
        <div class="phase-desc">${step.desc}</div>
      </div>
    </div>`).join('');

  const templatesHTML = task.templateIds.map(tplId => {
    const tpl = TEMPLATES.find(t => t.id === tplId);
    if (!tpl) return '';
    return `
      <div class="tpl-card">
        <div class="tpl-card-header">
          <span class="tpl-cat-badge" style="${tpl.badgeStyle}">${tpl.badge}</span>
          <div class="tpl-card-title">${tpl.title}</div>
          <div class="tpl-card-sub">${tpl.sub}</div>
        </div>
        <div class="tpl-variants">
          ${tpl.variants.map((v, i) => `
            <div class="tpl-variant">
              <div class="tpl-variant-left">
                <span class="tpl-variant-tone">${v.tone}</span>
                <div class="tpl-variant-preview">${v.preview}</div>
              </div>
              <button class="tpl-variant-btn" onclick="copyVariant(this,'${tpl.id}',${i})">Copy</button>
            </div>`).join('')}
        </div>
      </div>`;
  }).join('');

  output.innerHTML = `
    <div class="task-gen-output">
      <div class="task-gen-header">
        <div class="task-gen-title-row">
          <span class="priority-badge ${task.priority}">${task.priority}</span>
          <div class="task-gen-name">${task.name}</div>
          <div style="margin-left:auto;display:flex;align-items:center;gap:8px">
            <button id="ts-add-btn-${task.id}" class="btn-add-timesheet${task.addedToTimesheet ? ' added' : ''}"
              onclick="addToTimesheet('${task.id}')" ${task.addedToTimesheet ? 'disabled' : ''}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="3" width="12" height="12" rx="1"/><line x1="5" y1="1" x2="5" y2="5"/><line x1="11" y1="1" x2="11" y2="5"/><line x1="2" y1="8" x2="14" y2="8"/><line x1="8" y1="11" x2="8" y2="14" /><line x1="6.5" y1="12.5" x2="9.5" y2="12.5"/></svg>
              ${task.addedToTimesheet ? '✓ Added to Timesheet' : 'Add to Timesheet'}
            </button>
            <button class="btn-reset" onclick="closeTaskDetail()" style="margin-top:0">← Back</button>
          </div>
        </div>
        <div class="task-gen-meta">${map?.label || task.type} · Due ${formatDeadline(task.deadline)}</div>
        ${task.details ? `<div class="task-gen-details">${task.details}</div>` : ''}
        <div class="task-gen-progress">
          <div class="progress-label"><span>${done} / ${total} checklist items complete</span><span>${pct}%</span></div>
          <div class="progress-bar"><div class="progress-fill" id="task-progress-bar-${taskId}" style="width:${pct}%"></div></div>
        </div>
      </div>
      <div class="section-block task-gen-block">
        <div class="section-block-header">
          <div class="sh-icon green"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="3,8 6,11 13,4"/></svg></div>
          <span class="sh-title">Task Checklist</span>
          <span class="sh-count" id="task-count-${taskId}">${done}/${total}</span>
        </div>
        <div id="task-checklist-${taskId}">${checklistHTML}</div>
      </div>
      <div class="section-block task-gen-block">
        <div class="section-block-header">
          <div class="sh-icon amber"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="8" y1="2" x2="8" y2="14"/><line x1="4" y1="6" x2="12" y2="6"/><line x1="4" y1="10" x2="10" y2="10"/></svg></div>
          <span class="sh-title">Step-by-Step Guide</span>
        </div>
        <div class="phase-list">${guideHTML}</div>
      </div>
      <div class="section-block task-gen-block task-gen-block-last">
        <div class="section-block-header">
          <div class="sh-icon teal"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12v9H2z"/><polyline points="2,4 8,9 14,4"/></svg></div>
          <span class="sh-title">Message Templates</span>
        </div>
        <div class="task-templates-grid">${templatesHTML}</div>
      </div>
    </div>`;

  output.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ══════════════════════════════════════════════════════════════════
// BRIEF INTAKE
// ══════════════════════════════════════════════════════════════════
const BRIEFS_KEY = 'msc_briefs_v1';
function loadBriefs() { try { return JSON.parse(localStorage.getItem(BRIEFS_KEY)) || {}; } catch { return {}; } }
function saveBriefs(d) { localStorage.setItem(BRIEFS_KEY, JSON.stringify(d)); }

function saveBrief() {
  const name = document.getElementById('bi-name')?.value?.trim();
  if (!name) { document.getElementById('bi-name')?.focus(); return; }

  const checks = ['bic1','bic2','bic3','bic4','bic5','bic6'].map(id => document.getElementById(id)?.checked);
  const allChecked = checks.every(Boolean);
  const warn = document.getElementById('bi-warning');
  if (!allChecked) { if (warn) warn.style.display = 'block'; return; }
  if (warn) warn.style.display = 'none';

  const taskType   = document.getElementById('bi-category')?.value || 'general_admin';
  const priority   = document.getElementById('bi-priority')?.value || 'medium';
  const map        = TASK_TYPE_MAP[taskType];
  const priorityItems = PRIORITY_ITEMS[priority] || [];
  const typeItems  = map ? map.checklistKeys.flatMap(key => (CHECKLISTS[key] || []).map(item => ({ ...item }))) : [];
  const checklist  = [...priorityItems, ...typeItems];

  const brief = {
    id:          'brief_' + Date.now(),
    name,
    requestor:   document.getElementById('bi-requestor')?.value?.trim() || '',
    taskType,
    priority,
    deadline:    document.getElementById('bi-deadline')?.value || '',
    description: document.getElementById('bi-description')?.value?.trim() || '',
    status:      'active',
    sessions:    [],
    totalMins:   0,
    createdAt:   new Date().toISOString(),
    checklist,
    checkState:  {},
    guideSteps:  map?.guideSteps || [],
    templateIds: map?.templateIds || [],
    addedToTimesheet: false,
    timerNotes:  [],
  };

  const briefs = loadBriefs();
  briefs[brief.id] = brief;
  saveBriefs(briefs);

  // Reset form
  ['bi-name','bi-requestor','bi-description'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  ['bi-category','bi-priority'].forEach(id => { const el = document.getElementById(id); if (el) el.selectedIndex = 0; });
  const dl = document.getElementById('bi-deadline'); if (dl) dl.value = '';
  ['bic1','bic2','bic3','bic4','bic5','bic6'].forEach(id => { const el = document.getElementById(id); if (el) el.checked = false; });

  renderIntakeSaved();
  // Scroll to newly created card
  setTimeout(() => {
    const card = document.getElementById('ipc-' + brief.id);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

function deleteBrief(id) {
  const briefs = loadBriefs();
  delete briefs[id];
  saveBriefs(briefs);
  renderIntakeSaved();
}

function renderIntakeSaved() {
  const el = document.getElementById('intake-saved');
  if (!el) return;
  const briefs = loadBriefs();
  const list = Object.values(briefs).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (!list.length) { el.innerHTML = ''; return; }

  el.innerHTML = `<div class="tb-saved-header" style="margin-top:24px">Saved Tasks (${list.length})</div>` +
    list.map((b, idx) => {
      const typeKey   = b.taskType || b.category || 'general_admin';
      const map       = TASK_TYPE_MAP[typeKey] || TASK_TYPE_MAP['general_admin'];
      const checklist = b.checklist || [];
      const checkState= b.checkState || {};
      const done      = checklist.filter(i => checkState[i.id]).length;
      const total     = checklist.length;
      const isOpen    = idx === 0;

      const checklistHTML = checklist.map(item => {
        const isDone = !!checkState[item.id];
        let badge = '';
        if (item.badge === 'critical')    badge = '<span class="ci-badge critical">critical</span>';
        else if (item.badge === 'common miss') badge = '<span class="ci-badge warn">common miss</span>';
        return `<div class="check-item${isDone ? ' done' : ''}" data-brief-id="${b.id}" data-item-id="${item.id}" onclick="toggleBriefItem('${b.id}','${item.id}')">
          <div class="check-box"><svg viewBox="0 0 12 12"><polyline points="1,6 4.5,10 11,2"/></svg></div>
          <div><div class="ci-label">${item.label}${badge}</div>${item.sub ? `<div class="ci-sub">${item.sub}</div>` : ''}</div>
        </div>`;
      }).join('');

      const guideHTML = (b.guideSteps || []).map((step, i) => `
        <div class="phase-row">
          <div class="phase-num">${i + 1}</div>
          <div><div class="phase-title">${step.title}</div><div class="phase-desc">${step.desc}</div></div>
        </div>`).join('');

      const tplChips = (b.templateIds || []).map(tplId => {
        const tpl = TEMPLATES.find(t => t.id === tplId);
        if (!tpl) return '';
        const txt = (tpl.variants[0]?.text || '').replace(/'/g, "\\'");
        return `<button class="ipc-tpl-chip" onclick="navigator.clipboard.writeText('${txt}').then(()=>{this.textContent='✓ Copied';setTimeout(()=>{this.textContent='${tpl.title}'},1600)})">${tpl.title}</button>`;
      }).join('');

      const loggedMeta = b.totalMins ? ` · ${fmtMins(b.totalMins)} logged` : '';

      return `
        <div class="intake-plan-card${isOpen ? ' open' : ''}${b.status === 'completed' ? ' completed' : ''}" id="ipc-${b.id}">
          <div class="ipc-header" onclick="toggleIntakeCard('${b.id}')">
            <span class="priority-badge ${b.priority}">${b.priority}</span>
            <div style="flex:1;min-width:0">
              <div class="ipc-name">${b.name}</div>
              <div class="ipc-meta" id="ipc-meta-${b.id}">${map?.label || 'Task'} · ${b.deadline ? formatDeadline(b.deadline) : 'no deadline'} · ${done}/${total} done${loggedMeta}</div>
            </div>
            <div class="ipc-actions">
              <button class="itc-timer-btn" onclick="event.stopPropagation();openTimerFor('${b.id}')">▶ Timer</button>
              <button class="ipc-ts-btn${b.addedToTimesheet ? ' added' : ''}" id="ts-brief-btn-${b.id}" onclick="event.stopPropagation();addToTimesheetFromBrief('${b.id}')" ${b.addedToTimesheet ? 'disabled' : ''}>${b.addedToTimesheet ? '✓ Added' : '+ Timesheet'}</button>
              <button class="ipc-delete" onclick="event.stopPropagation();deleteBrief('${b.id}')" title="Delete">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>
              </button>
            </div>
            <span class="ipc-toggle">▼</span>
          </div>
          <div class="ipc-body">
            ${b.description ? `<div style="padding:10px 16px 0;font-size:12.5px;color:var(--text-2);line-height:1.55;border-left:3px solid var(--teal);margin:0 0 0 0;background:var(--bg-3);padding-top:12px;padding-bottom:12px;padding-right:16px">${b.description}</div>` : ''}
            ${total ? `<div class="section-block" style="border:none;border-radius:0;margin:0;border-top:1px solid var(--border)">
              <div class="section-block-header">
                <div class="sh-icon green"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="3,8 6,11 13,4"/></svg></div>
                <span class="sh-title">Checklist</span>
                <span class="sh-count" id="bi-count-${b.id}">${done}/${total}</span>
              </div>
              <div id="bi-checklist-${b.id}">${checklistHTML}</div>
            </div>` : ''}
            ${guideHTML ? `<div class="section-block" style="border:none;border-radius:0;margin:0;border-top:1px solid var(--border)">
              <div class="section-block-header">
                <div class="sh-icon amber"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="8" y1="2" x2="8" y2="14"/><line x1="4" y1="6" x2="12" y2="6"/><line x1="4" y1="10" x2="10" y2="10"/></svg></div>
                <span class="sh-title">Step-by-Step Guide</span>
              </div>
              <div class="phase-list">${guideHTML}</div>
            </div>` : ''}
            ${tplChips ? `<div style="padding:12px 16px;border-top:1px solid var(--border)">
              <div style="font-family:var(--font-mono);font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-3);margin-bottom:8px">Quick copy templates</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px">${tplChips}</div>
            </div>` : ''}
          </div>
        </div>`;
    }).join('');
}

function toggleIntakeCard(briefId) {
  const card = document.getElementById('ipc-' + briefId);
  if (card) card.classList.toggle('open');
}

function toggleBriefItem(briefId, itemId) {
  const briefs = loadBriefs();
  const brief  = briefs[briefId];
  if (!brief) return;
  if (!brief.checkState) brief.checkState = {};
  if (brief.checkState[itemId]) delete brief.checkState[itemId];
  else brief.checkState[itemId] = true;
  briefs[briefId] = brief;
  saveBriefs(briefs);

  const el = document.querySelector(`.check-item[data-brief-id="${briefId}"][data-item-id="${itemId}"]`);
  if (el) el.classList.toggle('done');

  const checklist = brief.checklist || [];
  const done = checklist.filter(i => brief.checkState[i.id]).length;
  const cnt  = document.getElementById('bi-count-' + briefId);
  if (cnt) cnt.textContent = done + '/' + checklist.length;
  const meta = document.getElementById('ipc-meta-' + briefId);
  if (meta) {
    const typeKey = brief.taskType || brief.category || 'general_admin';
    const map = TASK_TYPE_MAP[typeKey] || TASK_TYPE_MAP['general_admin'];
    const loggedMeta = brief.totalMins ? ` · ${fmtMins(brief.totalMins)} logged` : '';
    meta.textContent = `${map?.label || 'Task'} · ${brief.deadline ? formatDeadline(brief.deadline) : 'no deadline'} · ${done}/${checklist.length} done${loggedMeta}`;
  }
}

function addToTimesheetFromBrief(briefId) {
  const briefs = loadBriefs();
  const brief  = briefs[briefId];
  if (!brief || brief.addedToTimesheet) return;

  const catMap = {
    email_campaign:'campaign', website_content:'campaign',
    event_setup:'events', post_event:'events',
    indesign_collateral:'design',
    supplier_brief:'admin', general_admin:'admin',
  };
  const now = new Date();
  const key = tsDateKey(now.getFullYear(), now.getMonth(), now.getDate());
  const ts  = loadTimesheet();
  if (!ts[key]) ts[key] = [];
  const map = TASK_TYPE_MAP[brief.taskType || 'general_admin'];
  ts[key].push({
    title:    brief.name,
    category: catMap[brief.taskType] || 'admin',
    minutes:  brief.totalMins || 0,
    notes:    (map?.label || brief.taskType || 'Task') + (brief.deadline ? ' · Due ' + brief.deadline : '') + (brief.totalMins ? ' · ' + fmtMins(brief.totalMins) + ' logged' : ''),
  });
  saveTimesheet(ts);

  brief.addedToTimesheet = true;
  briefs[briefId] = brief;
  saveBriefs(briefs);

  const btn = document.getElementById('ts-brief-btn-' + briefId);
  if (btn) { btn.textContent = '✓ Added'; btn.classList.add('added'); btn.disabled = true; }
}

// ══════════════════════════════════════════════════════════════════
// TASK TIMER
// ══════════════════════════════════════════════════════════════════
let timerState = {
  briefId: null, running: false, paused: false,
  totalSecs: 25 * 60, secsLeft: 25 * 60, modeMins: 25,
  sessionStart: null, sessionMins: 0, pomodoroCount: 0,
  interval: null, notes: [],
};
let particleCanvas = null, particleCtx = null, particleAnim = null;
const particles = [];

function renderTimerTaskList() {
  // If a timer is already running/paused, jump straight to focus view
  if ((timerState.running || timerState.paused) && timerState.briefId) {
    const tl = document.getElementById('timer-task-list');
    const tf = document.getElementById('timer-focus');
    if (tl) tl.style.display = 'none';
    if (tf) tf.style.display = 'block';
    return;
  }
  const el = document.getElementById('timer-task-list');
  if (!el) return;
  const briefs = loadBriefs();
  // Only show active (non-completed) tasks in the timer queue
  const all = Object.values(briefs)
    .filter(b => b.status !== 'completed')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (!all.length) {
    el.innerHTML = `
      <div class="section-block" style="margin-bottom:16px">
        <div class="section-block-header">
          <div class="sh-icon amber"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="9" r="5"/><polyline points="8,6 8,9 10,11"/><line x1="6" y1="1" x2="10" y2="1"/></svg></div>
          <span class="sh-title">Your tasks</span>
        </div>
        <div style="padding:24px 18px;text-align:center">
          <div style="font-size:32px;margin-bottom:12px">⏱</div>
          <div style="font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:6px">No tasks waiting to be timed</div>
          <p style="font-size:12.5px;color:var(--text-3);margin:0">Go to <strong style="color:var(--teal)">Brief Intake</strong> in the sidebar, fill in the task details, and click <strong style="color:var(--teal)">Save Task &amp; Send to Timer →</strong> — it'll appear here instantly.</p>
        </div>
      </div>`;
    return;
  }

  const catColors = {
    email_campaign:'var(--gold)', indesign_collateral:'var(--teal)',
    event_setup:'var(--rust)', post_event:'var(--rust)',
    supplier_brief:'var(--lavender)', website_content:'var(--lav)',
    general_admin:'var(--text-3)',
    campaign:'var(--gold)', design:'var(--teal)', events:'var(--rust)',
    admin:'var(--lavender)', crm:'var(--sage)', website:'var(--lav)', other:'var(--text-3)',
  };
  el.innerHTML = `
    <div class="section-block" style="margin-bottom:16px">
      <div class="section-block-header">
        <div class="sh-icon amber"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="9" r="5"/><polyline points="8,6 8,9 10,11"/><line x1="6" y1="1" x2="10" y2="1"/></svg></div>
        <span class="sh-title">Your tasks</span>
        <span class="sh-count">${all.length}</span>
      </div>
      <div style="padding:10px 14px">
        <div class="timer-task-list-header">Click a task to start focusing</div>` +
    all.map(b => {
      const typeKey = b.taskType || b.category || 'general_admin';
      const typeLabel = TASK_TYPE_MAP[typeKey]?.label || b.category || typeKey;
      const col = catColors[typeKey] || 'var(--text-3)';
      return `
      <div class="timer-list-card ${b.status === 'completed' ? 'done-card' : ''}" onclick="openTimerFor('${b.id}')">
        <div class="tlc-icon" style="background:${col}22;color:${col}">
          ${b.status === 'completed' ? '✓' : '▶'}
        </div>
        <div class="tlc-body">
          <div class="tlc-name">${b.name}</div>
          <div class="tlc-meta">
            <span class="priority-badge ${b.priority}" style="margin-right:4px">${b.priority}</span>
            ${typeLabel} · Due ${b.deadline ? formatDeadline(b.deadline) : 'no deadline'} · ${b.totalMins ? fmtMins(b.totalMins) + ' logged' : '0m logged'}
          </div>
        </div>
        <div class="tlc-arrow">›</div>
      </div>`; }).join('') + `</div></div>`;
}

function openTimerFor(briefId) {
  const briefs = loadBriefs();
  const brief = briefs[briefId];
  if (!brief) return;

  // Stop any running timer
  if (timerState.interval) { clearInterval(timerState.interval); timerState.interval = null; }

  timerState.briefId = briefId;
  timerState.running = false;
  timerState.paused  = false;
  timerState.secsLeft = timerState.totalSecs = timerState.modeMins * 60;
  timerState.sessionMins = 0;

  const typeKey = brief.taskType || brief.category || 'general_admin';
  const typeLabel = TASK_TYPE_MAP[typeKey]?.label || brief.category || typeKey;
  setEl('tf-title', brief.name);
  setEl('tf-meta', `${typeLabel} · Due ${brief.deadline ? formatDeadline(brief.deadline) : 'no deadline'}`);
  setEl('tf-desc', brief.description || 'No description provided.');
  timerState.notes = brief.timerNotes ? [...brief.timerNotes] : [];
  updateTimerDisplay();
  updateSessionLabel();
  updateStampHint();
  renderTimerNotes();

  const startBtn = document.getElementById('timer-start-btn');
  if (startBtn) { startBtn.textContent = 'Start'; startBtn.className = 'timer-start-btn'; }

  const ring = document.getElementById('ring-fill');
  if (ring) { ring.className = 'ring-fill'; ring.style.strokeDashoffset = '0'; }

  // Show focus view, hide list
  const tl = document.getElementById('timer-task-list');
  const tf = document.getElementById('timer-focus');
  if (tl) tl.style.display = 'none';
  if (tf) tf.style.display = 'block';

  // Navigate to timer page if not already there
  const activePage = document.querySelector('.nav-item.active')?.dataset?.page;
  if (activePage !== 'timer') navigate('timer');

  initParticles();
  document.querySelector('.content')?.scrollTo(0, 0);
}

function exitFocus() {
  if (timerState.interval) { clearInterval(timerState.interval); timerState.interval = null; timerState.running = false; }
  timerState.paused = false;
  stopParticles();
  const ringWrap = document.querySelector('.timer-ring-wrap');
  if (ringWrap) ringWrap.classList.remove('running');
  document.getElementById('timer-task-list').style.display = 'block';
  document.getElementById('timer-focus').style.display = 'none';
  updateTopbarTimer();
  renderTimerTaskList();
}

function setTimerMode(btn, mins) {
  mins = parseInt(mins) || 25;
  // Sync preset chips
  document.querySelectorAll('.timer-preset-chip').forEach(b => b.classList.toggle('active', parseInt(b.dataset.mins) === mins));
  // Sync duration input
  const durInput = document.getElementById('timer-duration');
  if (durInput) durInput.value = mins;

  timerState.modeMins = mins;
  timerState.totalSecs = mins * 60;
  timerState.secsLeft = mins * 60;
  if (timerState.interval) { clearInterval(timerState.interval); timerState.interval = null; timerState.running = false; timerState.paused = false; }
  const ring = document.getElementById('ring-fill');
  if (ring) { ring.className = 'ring-fill' + (mins < 20 ? ' break-mode' : ''); ring.style.strokeDashoffset = '0'; }
  const startBtn = document.getElementById('timer-start-btn');
  if (startBtn) { startBtn.textContent = 'Start'; startBtn.className = 'timer-start-btn'; }
  const ringWrap = document.querySelector('.timer-ring-wrap');
  if (ringWrap) ringWrap.classList.remove('running');
  stopParticles();
  updateTimerDisplay();
}

function setPresetMins(btn, mins) {
  setTimerMode(btn, mins);
}

function applyCustomDuration(val) {
  const mins = parseInt(val);
  if (!mins || mins < 1 || mins > 300) return;
  setTimerMode(null, mins);
}

function timerToggle() {
  const startBtn = document.getElementById('timer-start-btn');
  if (timerState.running) {
    // Pause
    clearInterval(timerState.interval); timerState.interval = null;
    timerState.running = false; timerState.paused = true;
    if (timerState.sessionStart) {
      const elapsed = Math.round((Date.now() - timerState.sessionStart) / 60000);
      timerState.sessionMins += elapsed;
      timerState.sessionStart = null;
    }
    if (startBtn) { startBtn.textContent = 'Resume'; startBtn.className = 'timer-start-btn paused'; }
    document.querySelector('.timer-ring-wrap')?.classList.remove('running');
    stopParticles();
    updateTopbarTimer();
  } else {
    // Start / Resume
    timerState.running = true; timerState.paused = false;
    timerState.sessionStart = Date.now();
    timerState.interval = setInterval(timerTick, 1000);
    if (startBtn) { startBtn.textContent = 'Pause'; startBtn.className = 'timer-start-btn'; }
    document.querySelector('.timer-ring-wrap')?.classList.add('running');
    startParticles();
    updateTopbarTimer();
  }
}

function timerTick() {
  timerState.secsLeft--;
  updateTimerDisplay();
  updateRingProgress();
  updateStampHint();
  updateTopbarTimer();
  if (timerState.secsLeft <= 0) {
    clearInterval(timerState.interval); timerState.interval = null;
    timerState.running = false;
    timerState.paused  = false;
    // Log session
    if (timerState.sessionStart) {
      timerState.sessionMins += timerState.modeMins;
      timerState.sessionStart = null;
    }
    timerState.pomodoroCount++;
    const ring = document.getElementById('ring-fill');
    if (ring) ring.classList.add('done-ring');
    document.querySelector('.timer-ring-wrap')?.classList.remove('running');
    stopParticles();
    const startBtn = document.getElementById('timer-start-btn');
    if (startBtn) { startBtn.textContent = 'Start Again'; startBtn.className = 'timer-start-btn'; }
    // Reset for next round
    timerState.secsLeft = timerState.totalSecs;
    updateSessionLabel();
    // Hide chip — timer is no longer actively running
    updateTopbarTimer();
    // Try browser notification
    if (Notification.permission === 'granted') new Notification('Timer done!', { body: timerState.modeMins + ' minutes complete.' });
  }
  updateSessionLabel();
}

function updateTimerDisplay() {
  const m = Math.floor(timerState.secsLeft / 60);
  const s = timerState.secsLeft % 60;
  setEl('timer-display', String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0'));
}

function updateRingProgress() {
  const ring = document.getElementById('ring-fill');
  if (!ring) return;
  const pct = timerState.secsLeft / timerState.totalSecs;
  ring.style.strokeDashoffset = String(528 * (1 - pct));
}

function updateTopbarTimer() {
  const chip    = document.getElementById('topbar-timer-chip');
  const display = document.getElementById('topbar-timer-display');
  const dot     = document.getElementById('nav-timer-dot');
  const ttcDot  = document.getElementById('ttc-dot');

  const isRunning = timerState.running;
  const isPaused  = timerState.paused && !timerState.running;
  const isActive  = isRunning || isPaused;  // only running or paused counts as "ongoing"

  const activePage = document.querySelector('.nav-item.active')?.dataset?.page;
  const onTimerPage = activePage === 'timer';

  // Chip only shows when timer is actively running/paused AND user has navigated away
  if (chip) {
    chip.style.display = (isActive && !onTimerPage) ? 'flex' : 'none';
    chip.classList.toggle('paused', isPaused);
    chip.classList.remove('ready');
  }
  // Nav dot follows the same rule — only when active
  if (dot)    dot.style.display    = isActive ? 'inline-block' : 'none';
  if (ttcDot) ttcDot.classList.toggle('paused', isPaused);

  // Update the displayed time while active
  if (isActive && display) {
    const m = Math.floor(timerState.secsLeft / 60);
    const s = timerState.secsLeft % 60;
    display.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }
}

function goToActiveTimer() {
  navigate('timer');
  // If there's an active brief, jump straight to focus view
  if (timerState.briefId) {
    const tl = document.getElementById('timer-task-list');
    const tf = document.getElementById('timer-focus');
    if (tl) tl.style.display = 'none';
    if (tf) tf.style.display = 'block';
  }
}

function updateStampHint() {
  const el = document.getElementById('tns-stamp-hint');
  if (!el) return;
  const now = new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
  const elp = timerState.totalSecs - timerState.secsLeft;
  const sl  = timerState.secsLeft;
  const em  = Math.floor(elp / 60), es = elp % 60;
  const rm  = Math.floor(sl  / 60), rs = sl  % 60;
  el.textContent = `Will stamp: ${now} · ${String(em).padStart(2,'0')}:${String(es).padStart(2,'0')} in · ${String(rm).padStart(2,'0')}:${String(rs).padStart(2,'0')} left`;
}

function updateSessionLabel() {
  const briefId = timerState.briefId;
  const briefs = loadBriefs();
  const brief = briefs[briefId];
  const totalToday = (brief?.totalMins || 0) + timerState.sessionMins;
  setEl('timer-session-label', `Pomodoro ${timerState.pomodoroCount + 1} · ${fmtMins(timerState.sessionMins)} this session · ${fmtMins(totalToday)} total`);
}

function timerFinish() {
  if (timerState.interval) { clearInterval(timerState.interval); timerState.interval = null; }
  if (timerState.sessionStart) {
    const elapsed = Math.ceil((Date.now() - timerState.sessionStart) / 60000);
    timerState.sessionMins += elapsed;
    timerState.sessionStart = null;
  }
  timerState.running = false;

  const catMap = {
    email_campaign: 'campaign', website_content: 'campaign',
    event_setup: 'events',      post_event: 'events',
    indesign_collateral: 'design',
    supplier_brief: 'admin',    general_admin: 'admin',
  };

  const briefId = timerState.briefId;
  const briefs  = loadBriefs();
  const brief   = briefs[briefId];

  if (brief) {
    const mins      = timerState.sessionMins || 0;
    const pomos     = timerState.pomodoroCount;
    const typeLabel = TASK_TYPE_MAP[brief.taskType || 'general_admin']?.label || brief.taskType || 'Task';

    // Build notes from timer comments — "comment text at HH:MM"
    const commentLines = (brief.timerNotes || []).map(n => {
      const t = new Date(n.time).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
      return `${n.text} at ${t}`;
    });
    const noteParts = [
      typeLabel,
      brief.deadline ? 'Due ' + brief.deadline : null,
      pomos ? pomos + ' pomodoro(s)' : null,
      mins  ? fmtMins(mins) + ' logged' : null,
    ].filter(Boolean).join(' · ');
    const notes = commentLines.length
      ? noteParts + '\n' + commentLines.join('\n')
      : noteParts;

    // Push to timesheet
    const now = new Date();
    const key = tsDateKey(now.getFullYear(), now.getMonth(), now.getDate());
    const ts  = loadTimesheet();
    if (!ts[key]) ts[key] = [];
    ts[key].push({
      title:    brief.name,
      category: catMap[brief.taskType] || 'admin',
      minutes:  mins,
      notes,
    });
    saveTimesheet(ts);

    // Remove brief entirely — it's now in the timesheet
    delete briefs[briefId];
    saveBriefs(briefs);
  }

  stopParticles();
  document.querySelector('.timer-ring-wrap')?.classList.remove('running');

  // Clear state so chip hides
  timerState.briefId       = null;
  timerState.running       = false;
  timerState.paused        = false;
  timerState.sessionMins   = 0;
  timerState.pomodoroCount = 0;
  timerState.secsLeft      = timerState.totalSecs;

  updateTopbarTimer();
  navigate('timesheet');
}

function setFaceExpression(type) {
  const mouth = document.getElementById('face-mouth');
  if (!mouth) return;
  if (type === 'focused') mouth.setAttribute('d', 'M 22 40 Q 30 38 38 40');
  else if (type === 'happy') mouth.setAttribute('d', 'M 18 36 Q 30 46 42 36');
  else mouth.setAttribute('d', 'M 20 38 Q 30 44 40 38');
}

// Particles
function initParticles() {
  particleCanvas = document.getElementById('timer-particles');
  if (!particleCanvas) return;
  particleCanvas.width = 220; particleCanvas.height = 220;
  particleCtx = particleCanvas.getContext('2d');
  particles.length = 0;
  for (let i = 0; i < 18; i++) particles.push(newParticle());
}

function newParticle() {
  const angle = Math.random() * Math.PI * 2;
  const r = 60 + Math.random() * 40;
  return { x: 110 + Math.cos(angle) * r, y: 110 + Math.sin(angle) * r, r: 2 + Math.random() * 2.5, opacity: 0.1 + Math.random() * 0.4, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, life: Math.random() };
}

function drawParticles() {
  if (!particleCtx || !particleCanvas) return;
  particleCtx.clearRect(0, 0, 220, 220);
  particles.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy; p.life += 0.005;
    if (p.life > 1) { particles[i] = newParticle(); return; }
    const pulse = 0.5 + 0.5 * Math.sin(p.life * Math.PI * 2);
    particleCtx.beginPath();
    particleCtx.arc(p.x, p.y, p.r * (0.8 + 0.2 * pulse), 0, Math.PI * 2);
    particleCtx.fillStyle = `rgba(58,144,144,${p.opacity * pulse})`;
    particleCtx.fill();
  });
}

function startParticles() {
  if (particleAnim) return;
  function loop() { drawParticles(); particleAnim = requestAnimationFrame(loop); }
  loop();
}

function stopParticles() {
  if (particleAnim) { cancelAnimationFrame(particleAnim); particleAnim = null; }
  if (particleCtx && particleCanvas) particleCtx.clearRect(0, 0, 220, 220);
}

function addTimerNote() {
  const input = document.getElementById('timer-note-input');
  const text = input?.value?.trim();
  if (!text) return;

  // Capture both wall-clock and timer position at moment of submission
  const now      = new Date();
  const secsLeft = timerState.secsLeft;
  const elapsed  = timerState.totalSecs - secsLeft;

  const note = {
    time:      now.toISOString(),   // wall-clock
    secsLeft,                       // timer position (seconds remaining)
    elapsed,                        // seconds elapsed in this session
    modeMins:  timerState.modeMins, // which mode was active (25/5/15)
    text,
  };

  // Persist to brief
  const briefs = loadBriefs();
  const brief  = briefs[timerState.briefId];
  if (brief) {
    if (!brief.timerNotes) brief.timerNotes = [];
    brief.timerNotes.push(note);
    briefs[timerState.briefId] = brief;
    saveBriefs(briefs);
  }

  timerState.notes.push(note);
  input.value = '';
  renderTimerNotes();
}

function renderTimerNotes() {
  const el = document.getElementById('timer-notes-list');
  if (!el) return;
  const notes = timerState.notes || [];
  const cntEl = document.getElementById('timer-notes-count');
  if (cntEl) cntEl.textContent = notes.length ? notes.length + (notes.length === 1 ? ' note' : ' notes') : '';

  if (!notes.length) {
    el.innerHTML = `<div class="tni-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28" style="margin-bottom:6px;opacity:0.3"><path d="M11 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2v-5"/><polyline points="16,2 22,2 22,8"/><line x1="22" y1="2" x2="11" y2="13"/></svg>
      <div>No notes yet</div>
      <div style="font-size:10px;margin-top:3px;opacity:0.6">Log anything while you work — blockers, decisions, updates</div>
    </div>`;
    return;
  }

  el.innerHTML = notes.slice().reverse().map(n => {
    const wallDate = new Date(n.time);
    const wallStr  = wallDate.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });

    const sl  = n.secsLeft != null ? n.secsLeft : null;
    const elp = n.elapsed  != null ? n.elapsed  : null;

    // Badge = elapsed time (how far IN to the session)
    let badgeTop = '--:--', badgeSub = 'in';
    let metaRight = '';
    if (elp != null) {
      const em = Math.floor(elp / 60), es = elp % 60;
      badgeTop = `${String(em).padStart(2,'0')}:${String(es).padStart(2,'0')}`;
    }
    if (sl != null) {
      const rm = Math.floor(sl / 60), rs = sl % 60;
      metaRight = `${String(rm).padStart(2,'0')}:${String(rs).padStart(2,'0')} left`;
    }

    return `
    <div class="timer-note-item">
      <div class="tni-timer-badge">
        <span class="tni-badge-time">${badgeTop}</span>
        <span class="tni-badge-sub">${badgeSub}</span>
      </div>
      <div class="tni-content">
        <div class="tni-text">${n.text}</div>
        <div class="tni-meta">${wallStr}${metaRight ? ' · ' + metaRight : ''}</div>
      </div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════════════════════════════
// FINANCE GLOSSARY
// ══════════════════════════════════════════════════════════════════
const GLOSSARY = [
  { term:'AFSL', tag:'legal', def:'Australian Financial Services Licence. A licence issued by ASIC that allows a company to provide financial services. Your employer holds one — it means all marketing materials must comply with financial services laws before they go out.' },
  { term:'ASIC', tag:'legal', def:'Australian Securities and Investments Commission. The federal regulator overseeing financial services. When in doubt about whether something is compliant, assume ASIC is the reason it can\'t be changed.' },
  { term:'PDS', tag:'legal', def:'Product Disclosure Statement. A mandatory document explaining a financial product (e.g. a managed fund). You\'ll often be asked to link to or reference the PDS in marketing materials. Never change its wording.' },
  { term:'FSG', tag:'legal', def:'Financial Services Guide. Explains what services a company provides and how they get paid. Must be up to date and distributed in specific circumstances. If someone asks you to include it, follow instructions exactly.' },
  { term:'TMD', tag:'legal', def:'Target Market Determination. A document that describes who a financial product is suitable for. Required by ASIC since 2021. Relevant when creating campaign materials — the target audience must align with the TMD.' },
  { term:'General advice', tag:'legal', def:'Financial advice that doesn\'t take a person\'s individual circumstances into account. Most marketing materials contain general advice. Must include the general advice warning: "This is general information only and does not consider your personal objectives, financial situation or needs."' },
  { term:'Personal advice', tag:'legal', def:'Financial advice tailored to someone\'s specific situation. Marketing materials almost never contain personal advice. If a brief suggests content that looks like it could be personal advice, flag it immediately.' },
  { term:'Disclaimer', tag:'legal', def:'Mandatory legal text that must appear on marketing materials in financial services. Varies by product and channel. Never remove, shorten, or reword a disclaimer without explicit Legal/Compliance approval.' },
  { term:'Compliance sign-off', tag:'legal', def:'Written approval from the compliance or legal team before a material is published or sent. In financial services, this is often required in addition to Marketing Lead approval. Do not proceed without it if instructed.' },
  { term:'RG168', tag:'legal', def:'ASIC Regulatory Guide 168 — covers disclosure obligations for financial products marketed to consumers. You won\'t need to read it, but it\'s the reason certain disclosures are non-negotiable on your materials.' },
  { term:'Managed fund', tag:'finance', def:'An investment vehicle where money from multiple investors is pooled and managed by a professional fund manager. Your employer likely manages or distributes managed funds. Rate cards and product brochures usually describe these.' },
  { term:'Rate card', tag:'finance', def:'A document showing current investment returns, fees, or pricing for financial products. Often updated quarterly. One of the most common InDesign tasks for a marketing coordinator — high accuracy required as it contains live financial data.' },
  { term:'ETF', tag:'finance', def:'Exchange-Traded Fund. An investment fund traded on a stock exchange, like shares. If your employer offers ETFs, you may produce marketing materials for them. Lower regulatory overhead than managed funds in some cases.' },
  { term:'LIC', tag:'finance', def:'Listed Investment Company. A company listed on the ASX that holds a portfolio of investments. Similar to an ETF but structured as a company. May appear in your briefs and collateral.' },
  { term:'Benchmark', tag:'finance', def:'A standard index used to measure investment performance (e.g. the ASX 200). Marketing materials often compare a fund\'s performance against its benchmark. Never change these figures — they come from fund managers.' },
  { term:'Portfolio', tag:'finance', def:'A collection of investments held by a fund or individual investor. In your work, you\'ll reference portfolio holdings in marketing materials. Accuracy is critical — these are regulated disclosures.' },
  { term:'Redemption', tag:'finance', def:'The process of an investor withdrawing money from a fund. Relevant when producing materials about fund features or during fund closure communications.' },
  { term:'Prospectus', tag:'finance', def:'A formal legal document issued when a company raises capital from the public. Strictly regulated. If you are ever asked to work on prospectus materials, seek guidance — these have very specific compliance requirements.' },
  { term:'CRM', tag:'data', def:'Customer Relationship Management system. The database where contact records, interactions, and marketing lists live. You\'ll use it to upload contacts, apply segmentation, manage opt-outs, and pull campaign lists. Salesforce is common.' },
  { term:'Segmentation', tag:'data', def:'Dividing a contact list into subgroups based on shared characteristics (e.g. adviser vs retail, state, product interest). You must use the segmentation criteria specified in the brief — wrong segments = wrong audience.' },
  { term:'Opt-out / unsubscribe', tag:'data', def:'When a contact requests not to receive further emails. Legally mandatory under the Spam Act. All email campaigns must include an unsubscribe link and opt-outs must be processed within 5 business days.' },
  { term:'Spam Act', tag:'legal', def:'Australian legislation governing commercial electronic messages. Key rules: you must have consent to send, every email must include an unsubscribe option, and unsubscribes must be honoured promptly. Your email platform handles most of this mechanically.' },
  { term:'Pardot', tag:'data', def:'Salesforce\'s B2B marketing automation platform. Used to build email campaigns, manage lists, track open/click rates, and run automated nurture sequences. Often used alongside Salesforce CRM.' },
  { term:'Open rate', tag:'marketing', def:'The percentage of recipients who opened an email. A key metric in your post-send report. Industry average for financial services is ~20–25%. Report it accurately — don\'t interpret, just provide the number.' },
  { term:'Click-through rate', tag:'marketing', def:'The percentage of email recipients who clicked a link. Shows engagement beyond just opening. Often abbreviated CTR. Pull from your email platform and include in campaign performance reports.' },
  { term:'Bounce', tag:'marketing', def:'An email that couldn\'t be delivered. Hard bounce = permanent delivery failure (bad address). Soft bounce = temporary issue. High bounce rates indicate list quality problems. Flag to your lead if you see a spike.' },
  { term:'Brief', tag:'marketing', def:'A document or instruction from your lead describing a task — what needs to be created, for whom, by when, and in what format. Always read the brief fully before starting. If anything is unclear, ask before you begin.' },
  { term:'Bleed', tag:'design', def:'The area beyond the trim edge of a printed document where background colours and images must extend. Standard bleed is 3mm on all sides. Forgetting bleed on a print file is a common early mistake — check every print export.' },
  { term:'Preflight', tag:'design', def:'A check run before exporting a print file (InDesign: Window → Output → Preflight). Catches errors like overset text, missing links, wrong colour mode, or missing fonts. Zero errors = ready to export. Do not skip.' },
  { term:'Slug', tag:'design', def:'An area outside the bleed used for print instructions, job numbers, or colour bars. Not part of the final printed piece. Set up in InDesign document settings.' },
  { term:'CMYK', tag:'design', def:'Cyan, Magenta, Yellow, Key (Black). The colour mode used for print. All print files must be in CMYK — sending RGB to a printer causes colour shifts. Check your InDesign swatches panel before exporting.' },
  { term:'PDF/X-1a', tag:'design', def:'A PDF standard commonly required by print suppliers. It flattens transparency, embeds fonts, and converts to CMYK. Use the PDF/X-1a export preset in InDesign for press-ready print jobs unless the supplier specifies otherwise.' },
  { term:'Go-live', tag:'marketing', def:'The moment a campaign, webpage, or material is published or sent to its audience. Nothing goes live without written sign-off. Confirm go-live date and time in the brief before scheduling.' },
  { term:'Stakeholder', tag:'marketing', def:'Anyone with an interest in or influence over a project — typically your Marketing Lead, compliance team, fund managers, or external clients. Understanding who the stakeholders are on a task helps you know whose approval you need.' },
  { term:'KPI', tag:'marketing', def:'Key Performance Indicator. A measurable target for a campaign or task (e.g. open rate > 22%, event attendance > 50). You\'ll report against KPIs — pull the data accurately, don\'t interpret unless asked.' },

  // ── Assetline Capital product & company terms ──
  { term:'Assetline Capital', tag:'company', def:'Your employer. A broker-first non-bank lender backed by AltX Financial Group. Specialises in short-term, property-secured lending across five products: Short-Term Capital Lending, Development Finance, Private Lending, Horizon Mortgages, and Bridging Loans. Brand promise: make complex capital feel certain, every deal, every time.' },
  { term:'Non-bank lender', tag:'finance', def:'A lender that provides credit without holding a banking licence. Assetline sits between banks (capital but no agility) and small private lenders (speed but no scale). It offers institutional-grade process at non-bank speed — this distinction is central to all Assetline messaging.' },
  { term:'Short-Term Capital Lending', tag:'product', def:'Assetline\'s flagship product. Property-secured loans up to $40m. Same-day indicative offers, settlement within days of valuation. Designed for borrowers and property professionals who need capital deployed quickly. Language: speed, certainty, fast turnaround.' },
  { term:'Development Finance', tag:'product', def:'Assetline product for funding construction and development projects. Funding is released in milestones as the project progresses. Material metaphor in brand: raw concrete — the substance of construction. Language: milestone, structure, stage funding.' },
  { term:'Private Lending', tag:'product', def:'Assetline product for tight loan structures with clear LVRs. Precision-focused — decisions that hold. Material metaphor: brushed metal. Language: precise, tight, measured, clear LVR.' },
  { term:'Horizon Mortgages', tag:'product', def:'Assetline\'s long-term mortgage product. Designed for stable, long-view financing — purchase, refinance, or equity release with drawdowns. Material metaphor: timber (grown over decades, built to last). Language: long-term, flexible, structured, stable.' },
  { term:'Bridging Loans', tag:'product', def:'Short-term finance that bridges a gap between two property positions — buying before selling, or moving capital between deals. Also covers Bridging Finance and Equity Release products. Material metaphor: stone — literally the oldest bridging material. Language: momentum, speed, connection.' },
  { term:'Equity Release', tag:'product', def:'Assetline bridging product: short-term finance that unlocks equity before a property sale completes. Useful for homeowners, investors, and downsizers who need to access capital before settlement. Part of the Bridging Loans product family.' },
  { term:'LVR', tag:'finance', def:'Loan-to-Value Ratio. The loan amount expressed as a percentage of the property value. Central to Assetline\'s Private Lending product — "tight LVRs, decisions that hold." If a brief mentions LVR, it refers to the ratio of the loan to the assessed or purchase price of the security property.' },
  { term:'Indicative offer', tag:'finance', def:'A non-binding initial loan offer Assetline provides to brokers — often same day. It gives the broker (and their client) confidence that the deal is workable before formal assessment begins. Key brand differentiator: speed of indicative offer vs bank timelines.' },
  { term:'Broker-first', tag:'company', def:'Assetline\'s operating philosophy. Brokers are the primary channel — they place deals, their reputation is on the line, and everything Assetline does is built to serve them. Marketing communications always lead with broker benefit, not product features.' },
  { term:'AltX Financial Group', tag:'company', def:'The parent/backing entity of Assetline Capital. Provides funding depth and operational scale. Assetline operates with its own credit culture and market position within the AltX group — brokers get institutional backing with non-bank directness.' },
  { term:'Settlement', tag:'finance', def:'The legal completion of a property transaction or loan. Assetline\'s promise for Short-Term Capital Lending is settlement within days of valuation — this speed is a core brand differentiator and appears frequently in broker communications.' },
];

function filterGlossary() {
  const q = (document.getElementById('glossary-search')?.value || '').toLowerCase();
  renderGlossaryList(q);
}

function renderGlossaryList(q = '') {
  const el = document.getElementById('glossary-list');
  if (!el) return;
  const filtered = q ? GLOSSARY.filter(g => g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q)) : GLOSSARY;
  if (!filtered.length) { el.innerHTML = `<div class="section-block"><div class="glossary-empty">No terms match "${q}"</div></div>`; return; }

  // Group by first letter
  const groups = {};
  filtered.forEach(g => {
    const letter = g.term[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(g);
  });

  el.innerHTML = Object.keys(groups).sort().map(letter => `
    <div class="section-block" style="margin-bottom:12px">
      <div class="section-block-header">
        <span class="sh-title" style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.15em">${letter}</span>
      </div>
      ${groups[letter].map(g => `
        <div class="glossary-item">
          <div class="glossary-term">${g.term}</div>
          <div class="glossary-body">
            <div><span class="glossary-tag ${g.tag}">${g.tag}</span></div>
            <div class="glossary-def">${g.def}</div>
          </div>
        </div>`).join('')}
    </div>`).join('');
}

// ══════════════════════════════════════════════════════════════════
// WHAT GOOD LOOKS LIKE
// ══════════════════════════════════════════════════════════════════
const GOOD_LOOKS = [
  {
    type: 'Salesforce EDM',
    tab: 'salesforce',
    tabLabel: 'Salesforce EDM',
    icon: '📧',
    pass: ['HTML file uploaded correctly in Account Engagement', 'Test send completed before scheduling', 'Unsubscribe link present and functional', 'Correct list / prospect list applied', 'Approval documented before scheduling'],
    good: ['Test email reviewed on mobile AND desktop before requesting approval', 'Sender name and reply-to address verified against brief', 'All merge fields tested with real data — no {{FirstName}} showing in test', 'Scheduled send time confirmed with Marketing Lead in writing', 'Bounces and unsubscribes logged within 24 hours of send'],
    impressive: ['Sends a preflight screenshot alongside the approval request', 'Performance report delivered to Marketing Lead within 24 hours with brief commentary', 'Notes anomalies proactively — high bounce = flags possible list issue, not just reports number', 'Compares open/click rate to previous EDM in the same report', 'Archives the sent HTML file and approval email with the campaign send date in the file name'],
  },
  {
    type: 'CRM & List Management',
    tab: 'salesforce',
    tabLabel: 'Salesforce EDM',
    icon: '📊',
    pass: ['List uploaded correctly', 'Correct segment / prospect list applied', 'Opt-outs and suppressions checked before send', 'No obvious data errors in preview'],
    good: ['Cross-references upload against source file before confirming count', 'Flags any contacts missing consent flags before proceeding', 'Checks for duplicate records before upload', 'Confirms final list count with Marketing Lead before campaign is scheduled', 'Documents where the list came from and when it was last cleaned'],
    impressive: ['Proactively checks that the list aligns with the TMD for the product being promoted', 'Reports unsubscribe and bounce count post-campaign alongside open/click rates', 'Flags unusual patterns — spike in hard bounces = flags possible outdated list', 'Keeps a simple log of list sizes over time to monitor data decay', 'Asks whether contacts require re-consent if list is older than 12 months'],
  },
  {
    type: 'EDM Performance Report',
    tab: 'salesforce',
    tabLabel: 'Salesforce EDM',
    icon: '📈',
    pass: ['Open rate, clicks and bounces pulled from Account Engagement', 'Report sent to Marketing Lead', 'Unsubscribe count included'],
    good: ['Delivered within 24 hours of campaign close', 'Compares to previous EDM or industry benchmark', 'Includes context — was send time different? Was subject line changed?', 'Notes any deliverability issues (bounces, suppressions)', 'Formatted as a document or structured email, not a screenshot'],
    impressive: ['One-paragraph narrative: what worked, what didn\'t, what to consider next EDM', 'Flags any compliance issues discovered post-send', 'Suggests one testable change for the next send', 'Keeps a running EDM log so patterns emerge over time', 'Includes a comparison chart if multiple EDMs have been sent'],
  },
  {
    type: 'Brand QC — InDesign Collateral',
    tab: 'brand',
    tabLabel: 'Brand & Compliance',
    icon: '🖨',
    pass: ['Correct template used', 'Assetline logo present in correct version', 'Disclaimer included', 'No spelling errors', 'PDF exported and sent for approval'],
    good: ['Preflight run with zero errors before export (Window → Output → Preflight)', 'Correct colour mode — CMYK for print, RGB for digital', 'Links panel checked — no missing or modified links', 'File named correctly with version number per naming convention', 'Source file saved and packaged alongside the PDF'],
    impressive: ['Zooms to 100% and reads every word before submitting', 'Includes a QC checklist screenshot with the approval request', 'Notes any brand deviations spotted and flagged before submitting', 'Packages file with fonts and links, named to convention, uploaded to correct folder', 'States the bleed spec used in the approval request for print jobs'],
  },
  {
    type: 'Compliance Check',
    tab: 'brand',
    tabLabel: 'Brand & Compliance',
    icon: '🛡',
    pass: ['Assetline logo in correct approved version', 'Disclaimer present and unmodified', 'No unapproved performance claims or rate figures', 'Correct Assetline fonts used (Silvana Text + ABC Diatype)', 'Approved colour palette only (#E4572E, #191919, #FAFAF2)'],
    good: ['Cross-checks every rate or figure against the approved brief — never assumes', 'Flags any claim that could be read as a performance guarantee', 'Confirms disclaimer wording matches the approved legal template, not a paraphrase', 'Notes any brand deviation in writing before submitting — does not silently fix and move on', 'Checks that the correct TMD product scope is reflected in any product-specific material'],
    impressive: ['Treats every compliance flag as a blocker — does not proceed or self-approve', 'Documents the compliance check as a separate step in the approval chain', 'Proactively asks: "does this material need compliance sign-off beyond Marketing Lead?"', 'Keeps a log of any compliance flags raised per job for reference', 'Reads the disclaimer out loud to catch readability issues, not just legal completeness'],
  },
  {
    type: 'Supplier Management',
    tab: 'brand',
    tabLabel: 'Brand & Compliance',
    icon: '📦',
    pass: ['Brief sent with approved content only', 'Receipt confirmed by supplier', 'File delivered on time', 'Basic QC done before accepting deliverable'],
    good: ['Brief includes all specs — format, dimensions, bleed, colour mode, deadline', 'Asks supplier to confirm receipt and ability to meet the deadline in writing', 'Reviews deliverable against brief point by point, not at a glance', 'Raises issues specifically — e.g. "logo version is incorrect, should be white reversed on dark"', 'Follows up 48 hours before deadline if no confirmation received'],
    impressive: ['Maintains a simple supplier log: name, contact, past jobs, turnaround reliability', 'Flags lead time issues proactively — "if we need this by Friday, brief must go Tuesday"', 'Checks supplier output against the brand guide, not just the brief', 'Escalates supplier issues to Marketing Lead with a proposed resolution — not just a problem', 'Notes any spec corrections on the file itself before archiving for future reference'],
  },
];

function renderGoodLooks(activeFilter) {
  const el = document.getElementById('goodlooks-content');
  if (!el) return;
  const filter = activeFilter || 'all';
  const filtered = filter === 'all' ? GOOD_LOOKS : GOOD_LOOKS.filter(i => i.tab === filter);

  const tabColors = {
    salesforce: 'var(--lavender)',
    brand: 'var(--teal)',
  };

  el.innerHTML = `
    <div class="wgl-filter-bar">
      <button class="wgl-filter-btn${filter === 'all' ? ' active' : ''}" onclick="renderGoodLooks('all')">All tasks</button>
      <button class="wgl-filter-btn${filter === 'salesforce' ? ' active' : ''}" onclick="renderGoodLooks('salesforce')">Salesforce EDM</button>
      <button class="wgl-filter-btn${filter === 'brand' ? ' active' : ''}" onclick="renderGoodLooks('brand')">Brand &amp; Compliance</button>
    </div>` +
  filtered.map(item => `
    <div class="wgl-card open" onclick="this.classList.toggle('open')">
      <div class="wgl-card-header">
        <span style="font-size:18px;flex-shrink:0">${item.icon}</span>
        <span class="wgl-card-title">${item.type}</span>
        <span class="wgl-tab-badge" style="background:${tabColors[item.tab]}">${item.tabLabel}</span>
        <span class="wgl-toggle">▼</span>
      </div>
      <div class="wgl-levels">
        <div class="wgl-level pass">
          <div class="wgl-level-label"><span class="wgl-level-dot"></span>Pass</div>
          ${item.pass.map(t => `<div class="wgl-item">${t}</div>`).join('')}
        </div>
        <div class="wgl-level good">
          <div class="wgl-level-label"><span class="wgl-level-dot"></span>Good</div>
          ${item.good.map(t => `<div class="wgl-item">${t}</div>`).join('')}
        </div>
        <div class="wgl-level impressive">
          <div class="wgl-level-label"><span class="wgl-level-dot"></span>Impressive</div>
          ${item.impressive.map(t => `<div class="wgl-item">${t}</div>`).join('')}
        </div>
      </div>
    </div>`).join('');
}

// ══════════════════════════════════════════════════════════════════
// MISTAKES LOG
// ══════════════════════════════════════════════════════════════════
const PRELOADED_MISTAKES = [
  { task:'Email campaign', what:'Used an old template that had the previous disclaimer', fix:'Always open templates from the approved shared folder, not a recent personal copy' },
  { task:'Email campaign', what:'Sent to the wrong list segment', fix:'Print or screenshot the segment criteria and compare to brief before scheduling' },
  { task:'Email campaign', what:'Didn\'t test the email on mobile — layout broke', fix:'Always send a test to yourself and check on your phone before approval request' },
  { task:'Email campaign', what:'Scheduled before final approval was received', fix:'Written approval = email or shared doc. Never schedule on a verbal or Slack "yeah looks fine"' },
  { task:'InDesign collateral', what:'Exported in RGB instead of CMYK for a print job', fix:'Check the Swatches panel and export preset before every print export' },
  { task:'InDesign collateral', what:'Submitted with overset text — copy was cut off on page 3', fix:'Run Preflight (Window → Output → Preflight) and resolve all errors before exporting' },
  { task:'InDesign collateral', what:'Used the wrong logo version (reversed when it should have been full colour)', fix:'The brand guide specifies which version goes on which background — check it every time' },
  { task:'InDesign collateral', what:'Sent to print without bleed — white edges appeared on the final product', fix:'3mm bleed on all sides, every print job. Check Document Setup before exporting' },
  { task:'Event coordination', what:'Name badges printed with a misspelled attendee name', fix:'Cross-reference name badges against the confirmed RSVP list, not the invitation list' },
  { task:'Event coordination', what:'Didn\'t send a reminder — attendance was lower than expected', fix:'Schedule 1-week and 1-day reminders at the same time you send the invitation' },
  { task:'Event coordination', what:'Supplier confirmed verbally but there was no written confirmation', fix:'Always ask for written confirmation — "Can you reply confirming you\'ll deliver by [date]?"' },
  { task:'CRM / data', what:'Uploaded a list without checking for opt-outs first', fix:'Check opt-out and suppression lists before every upload, not after' },
  { task:'CRM / data', what:'Sent a campaign to a list that included contacts in a different state', fix:'Segment criteria must be verified against the brief before the list is locked' },
  { task:'Website update', what:'Published to the live site instead of staging for review', fix:'Always preview on staging and screenshot before going live. Approval = sign-off on the staging version' },
  { task:'Website update', what:'Updated live copy without a current backup', fix:'Check that the CMS has a version history or take a screenshot before making changes' },
  { task:'General', what:'Went silent when stuck — 2 hours passed and the deadline moved', fix:'Flag blockers within the hour, not at EOD. A one-liner is enough: "I\'m stuck on X — guidance needed"' },
  { task:'General', what:'Sent a deliverable without QC\'ing it — the logo was missing', fix:'QC against the brief as a checklist, not a glance. Every item on the brief = one check' },
  { task:'General', what:'Didn\'t update Monday.com — lead thought the task hadn\'t been started', fix:'Change status to "In Progress" when you start. Don\'t wait until it\'s done' },
  { task:'General', what:'Sent the wrong file version to the supplier', fix:'File naming convention + version numbers. Open the file before attaching to confirm it\'s the right one' },
  { task:'General', what:'Missed a deadline without flagging it early', fix:'If a deadline is at risk, say so at least 3–4 hours before it hits — not after it passes' },
];

const MISTAKES_KEY = 'msc_mistakes_v1';
function loadPersonalMistakes() { try { return JSON.parse(localStorage.getItem(MISTAKES_KEY)) || []; } catch { return []; } }
function savePersonalMistakes(d) { localStorage.setItem(MISTAKES_KEY, JSON.stringify(d)); }

function renderPreloadedMistakes() {
  const el = document.getElementById('mistakes-preloaded');
  if (!el) return;
  el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(3,1fr);padding:10px 14px;background:var(--bg-3);border-bottom:1px solid var(--border)">
    <div class="mi-col-label">Task type</div><div class="mi-col-label">What went wrong</div><div class="mi-col-label">What would have caught it</div>
  </div>` + PRELOADED_MISTAKES.map((m, i) => `
    <div class="mistake-item">
      <div><div class="mi-col-val" style="color:var(--text-3);font-size:11px">#${i+1} · ${m.task}</div></div>
      <div><div class="mi-col-val" style="color:var(--rust)">${m.what}</div></div>
      <div><div class="mi-col-val" style="color:var(--sage)">${m.fix}</div></div>
    </div>`).join('');
}

function renderPersonalMistakes() {
  const el = document.getElementById('mistakes-personal');
  if (!el) return;
  const list = loadPersonalMistakes();
  if (!list.length) { el.innerHTML = '<div style="padding:16px 18px;font-size:12px;color:var(--text-3);font-family:var(--font-mono)">No personal entries yet — they\'ll appear here as you add them.</div>'; return; }
  el.innerHTML = list.map((m, i) => `
    <div class="personal-mistake-row">
      <div class="pm-body">
        <div class="pm-task">${m.task}</div>
        <div class="pm-mistake">✗ ${m.mistake}</div>
        <div class="pm-fix">→ ${m.fix}</div>
      </div>
      <button class="pm-delete" onclick="deletePersonalMistake(${i})">
        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/></svg>
      </button>
    </div>`).join('');
}

function deletePersonalMistake(idx) {
  const list = loadPersonalMistakes();
  list.splice(idx, 1);
  savePersonalMistakes(list);
  renderPersonalMistakes();
}

// ══════════════════════════════════════════════════════════════════
// 90-DAY TRACKER
// ══════════════════════════════════════════════════════════════════
const ND_KEY = 'msc_ninetydays_v1';
function loadND() { try { return JSON.parse(localStorage.getItem(ND_KEY)) || { startDate: '', wins: [], skills: [], feedback: [], unclear: [] }; } catch { return { startDate: '', wins: [], skills: [], feedback: [], unclear: [] }; } }
function saveND(d) { localStorage.setItem(ND_KEY, JSON.stringify(d)); }

function saveNdStartDate() {
  const val = document.getElementById('nd-start-date')?.value;
  const nd = loadND();
  nd.startDate = val;
  saveND(nd);
  renderNdStats();
}

function renderNdStats() {
  const nd = loadND();
  if (nd.startDate) {
    const start = new Date(nd.startDate);
    const days  = Math.max(0, Math.floor((Date.now() - start.getTime()) / 86400000));
    setEl('nd-days', days);
    const el = document.getElementById('nd-start-date'); if (el) el.value = nd.startDate;
  }
  setEl('nd-wins-count',     nd.wins.length);
  setEl('nd-skills-count',   nd.skills.length);
  setEl('nd-feedback-count', nd.feedback.length);
}

function renderNdList(type) {
  const nd = loadND();
  const ids = { wins: 'nd-wins-list', skills: 'nd-skills-list', feedback: 'nd-feedback-list', unclear: 'nd-unclear-list' };
  const el = document.getElementById(ids[type]);
  if (!el) return;
  const list = nd[type] || [];
  if (!list.length) { el.innerHTML = '<div class="nd-empty">Nothing here yet.</div>'; return; }
  el.innerHTML = list.map((item, i) => `
    <div class="nd-entry">
      <div style="flex:1">
        <div class="nd-entry-text">${item.text}</div>
        <div class="nd-entry-date">${new Date(item.date).toLocaleDateString('en-AU',{day:'numeric',month:'short'})}</div>
      </div>
      <button class="nd-delete" onclick="deleteNdEntry('${type}',${i})">
        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/></svg>
      </button>
    </div>`).join('');
}

function addNdEntry(type) {
  const inputIds = { wins: 'nd-win-input', skills: 'nd-skill-input', feedback: 'nd-feedback-input', unclear: 'nd-unclear-input' };
  const el = document.getElementById(inputIds[type]);
  const text = el?.value?.trim();
  if (!text) return;
  const nd = loadND();
  if (!nd[type]) nd[type] = [];
  nd[type].unshift({ text, date: new Date().toISOString() });
  saveND(nd);
  el.value = '';
  renderNdList(type);
  renderNdStats();
}

function deleteNdEntry(type, idx) {
  const nd = loadND();
  nd[type].splice(idx, 1);
  saveND(nd);
  renderNdList(type);
  renderNdStats();
}

function renderNinetyDays() {
  renderNdStats();
  ['wins','skills','feedback','unclear'].forEach(renderNdList);
}

// ══════════════════════════════════════════════════════════════════
// AI / CLAUDE API
// ══════════════════════════════════════════════════════════════════

const AI_KEY_STORAGE = 'msc_claude_key';

function getAiKey() {
  return localStorage.getItem(AI_KEY_STORAGE) || '';
}

function saveAiKey() {
  const inp = document.getElementById('ai-key-input');
  const val = inp?.value?.trim();
  // Don't save if user is looking at the masked dots (i.e. hasn't typed a new key)
  if (!val || /^•+$/.test(val)) return;
  localStorage.setItem(AI_KEY_STORAGE, val);
  if (inp) inp.value = '';
  const btn = document.getElementById('ai-key-save');
  if (btn) { btn.textContent = 'Saved ✓'; setTimeout(() => { btn.textContent = 'Save key'; }, 2200); }
  const link = document.getElementById('ai-key-toggle-label');
  if (link) link.textContent = 'AI Settings ✓';
}

function clearAiKey() {
  localStorage.removeItem(AI_KEY_STORAGE);
  const inp = document.getElementById('ai-key-input');
  if (inp) inp.value = '';
  const link = document.getElementById('ai-key-toggle-label');
  if (link) link.textContent = 'AI Settings';
}

function toggleAiKeyPanel() {
  const panel = document.getElementById('ai-key-panel');
  if (!panel) return;
  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
    // Show placeholder dots if key already saved
    const inp = document.getElementById('ai-key-input');
    if (inp) inp.placeholder = getAiKey() ? 'Key saved — paste new key to replace' : 'gsk_…';
    inp.value = '';
    renderAiMeter();
  }
}

// ── Usage tracking ───────────────────────────────────────────────
const AI_USAGE_KEY   = 'msc_groq_usage';
const DAILY_TOKEN_LIMIT   = 100000;
const DAILY_REQUEST_LIMIT = 1000;

function getTodayStr() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function loadAiUsage() {
  try {
    const raw = JSON.parse(localStorage.getItem(AI_USAGE_KEY));
    if (raw?.date === getTodayStr()) return raw;
  } catch {}
  return { date: getTodayStr(), tokens: 0, requests: 0 };
}

function saveAiUsage(u) {
  localStorage.setItem(AI_USAGE_KEY, JSON.stringify(u));
}

function trackAiUsage(tokensUsed) {
  const u = loadAiUsage();
  u.tokens   += tokensUsed;
  u.requests += 1;
  saveAiUsage(u);
  renderAiMeter();
}

function renderAiMeter() {
  const u        = loadAiUsage();
  const tPct     = Math.min(100, (u.tokens   / DAILY_TOKEN_LIMIT)   * 100);
  const rPct     = Math.min(100, (u.requests / DAILY_REQUEST_LIMIT) * 100);
  const tLeft    = Math.max(0, DAILY_TOKEN_LIMIT   - u.tokens);
  const rLeft    = Math.max(0, DAILY_REQUEST_LIMIT - u.requests);

  // colour: green → amber → red
  const colour = tPct < 60 ? 'var(--accent)' : tPct < 85 ? 'var(--gold)' : 'var(--rust)';

  const el = document.getElementById('ai-usage-meter');
  if (!el) return;

  el.innerHTML = `
    <div class="ai-meter-row">
      <span class="ai-meter-label">Tokens today</span>
      <span class="ai-meter-val">${u.tokens.toLocaleString()} <span class="ai-meter-dim">/ ${DAILY_TOKEN_LIMIT.toLocaleString()}</span></span>
    </div>
    <div class="ai-meter-track"><div class="ai-meter-fill" style="width:${tPct}%;background:${colour}"></div></div>
    <div class="ai-meter-row" style="margin-top:8px">
      <span class="ai-meter-label">Requests today</span>
      <span class="ai-meter-val">${u.requests} <span class="ai-meter-dim">/ ${DAILY_REQUEST_LIMIT}</span></span>
    </div>
    <div class="ai-meter-track"><div class="ai-meter-fill" style="width:${rPct}%;background:${colour}"></div></div>
    <div class="ai-meter-footer">
      ~${tLeft.toLocaleString()} tokens · ${rLeft} requests left today · resets midnight UTC
    </div>`;
}

// ── Core API helper ──────────────────────────────────────────────
async function callClaude(systemPrompt, userMessage) {
  const key = getAiKey();
  if (!key) throw new Error('NO_KEY');
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userMessage }
      ]
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }
  const data = await res.json();
  // Track usage from response
  const used = data.usage?.total_tokens || 0;
  if (used) trackAiUsage(used);
  return data.choices?.[0]?.message?.content ?? 'No response received.';
}

// ── Shared UI helpers ────────────────────────────────────────────
function copyAiOutput(textareaId) {
  const el = document.getElementById(textareaId);
  if (!el || !el.value) return;
  navigator.clipboard.writeText(el.value).then(() => showAiToast('✓ Copied to clipboard'));
}

function showAiToast(msg) {
  const t = document.getElementById('copy-toast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => { t.style.display = 'none'; }, 2200);
}

function aiSetBtn(btnId, loading, defaultLabel, loadingLabel) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.textContent = loading ? loadingLabel : defaultLabel;
  btn.disabled = loading;
}

function aiNoKey(featureName) {
  alert(`No API key set.\n\nClick "AI Settings" in the sidebar, paste your Groq API key, and click Save.\n\nGet a free key at: console.groq.com → API Keys (no credit card needed).`);
}

// ── Feature 1: AI Email Drafter ──────────────────────────────────
async function draftBrokerEmail() {
  const bullets = document.getElementById('email-bullets')?.value?.trim();
  const tone    = document.getElementById('email-tone')?.value;
  if (!bullets) { alert('Please enter your bullet points first.'); return; }
  if (!getAiKey()) { aiNoKey(); return; }
  aiSetBtn('email-draft-btn', true, 'Draft email →', 'Drafting…');
  try {
    const system = `You are a professional marketing coordinator at Assetline Capital — a broker-first non-bank lender based in Australia. Assetline specialises in short-term capital lending (up to $40m secured against property), development finance, private lending, Horizon Mortgages, bridging loans, and equity release. The brand voice is: confident, commercial, direct — broker-first. Write broker update emails that are clear, compliant, and well-structured. Always include a subject line at the top formatted as:\nSubject: [subject line here]\n\nThen write the full email body. No jargon, no fluff. Use Australian English spelling. Never include legal advice.`;
    const prompt = `Write a ${tone} broker update email for Assetline Capital based on these bullet points:\n${bullets}`;
    const result = await callClaude(system, prompt);
    const out = document.getElementById('email-output');
    document.getElementById('email-result').value = result;
    if (out) out.hidden = false;
    out?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (e) {
    alert('Claude API error: ' + e.message);
  }
  aiSetBtn('email-draft-btn', false, 'Draft email →', 'Drafting…');
}

// ── Feature 2: Pre-Send Test Email QC ────────────────────────────
function updateTestQC() {
  const all     = document.querySelectorAll('[data-qc="test"]');
  const checked = document.querySelectorAll('[data-qc="test"]:checked');
  const n = checked.length, total = all.length;
  const status = document.getElementById('test-qc-status');
  const count  = document.getElementById('test-qc-count');
  const btn    = document.getElementById('test-qc-pass-btn');
  if (status) status.textContent = `${n} / ${total} checked`;
  if (count)  count.textContent  = `${n} / ${total}`;
  if (btn) {
    btn.disabled = n < total;
    if (n === total) btn.classList.add('qc-ready');
    else btn.classList.remove('qc-ready');
  }
}

function markTestQCPassed() {
  const btn = document.getElementById('test-qc-pass-btn');
  if (btn) { btn.textContent = '✓ QC Passed — ready for sign-off'; btn.disabled = true; btn.classList.add('qc-done'); }
  showAiToast('✓ Test email QC passed — forward to manager for sign-off');
}

// ── Feature 3: Manager Cover Note Generator ───────────────────────
async function generateCoverNote() {
  const campaign = document.getElementById('cn-campaign')?.value?.trim();
  const senddate = document.getElementById('cn-senddate')?.value;
  const audience = document.getElementById('cn-audience')?.value?.trim();
  const notes    = document.getElementById('cn-notes')?.value?.trim();
  if (!campaign) { alert('Please enter the campaign name.'); return; }
  if (!getAiKey()) { aiNoKey(); return; }
  aiSetBtn('cover-note-btn', true, 'Generate cover note →', 'Generating…');
  try {
    const system = `You are a marketing coordinator at Assetline Capital — a broker-first non-bank lender. Write a brief, professional internal cover note to accompany a test email forwarded for manager approval. Assetline's voice is confident, commercial, and direct. Keep it to 4–6 sentences. Use Australian English. Tone: professional and clear. Do not write "Dear" — start directly with context. Never use unnecessary jargon or filler phrases.`;
    const prompt = `Write a manager cover note for the following test email submission:\nCampaign: ${campaign}\nPlanned send date: ${senddate || 'TBC'}\nAudience: ${audience || 'TBC'}\nAdditional notes: ${notes || 'None'}`;
    const result = await callClaude(system, prompt);
    const out = document.getElementById('cover-note-output');
    document.getElementById('cover-note-result').value = result;
    if (out) out.hidden = false;
    out?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (e) {
    alert('Claude API error: ' + e.message);
  }
  aiSetBtn('cover-note-btn', false, 'Generate cover note →', 'Generating…');
}

// ── Feature 4: EOD / EOW Summary Writer ──────────────────────────
async function generateEODSummary() {
  const type       = document.getElementById('eod-type')?.value;
  const recipient  = document.getElementById('eod-recipient')?.value?.trim() || 'my manager';
  const completed  = document.getElementById('eod-completed')?.value?.trim();
  const inprogress = document.getElementById('eod-inprogress')?.value?.trim();
  const blockers   = document.getElementById('eod-blockers')?.value?.trim();
  if (!completed) { alert('Please enter what you completed today.'); return; }
  if (!getAiKey()) { aiNoKey(); return; }
  aiSetBtn('eod-btn', true, 'Write summary →', 'Writing…');
  try {
    const system = `You are Seph Albino, a marketing coordinator at Assetline Capital. Write a casual, human ${type} sign-off message to your manager.

TONE & VOICE:
- Casual but professional — friendly, not stiff. Write like a real person talking to a colleague, not a corporate report.
- First-person, conversational — use "I've", "I'm", "I'll". Never "I was able to" or "I have completed" or "I have commenced".
- Direct and brief. No filler, no over-explanation. Contractions encouraged.
- Minor grammar imperfections are fine. Do not over-polish.

STRUCTURE:
1. Open with exactly: "Hey ${recipient}, I'm now signing off."
2. Body: 2–3 short paragraphs. One topic per paragraph. Lead with what was completed, then what's remaining or next.
3. For incomplete tasks, end with what happens next — "will continue tomorrow", "picking this up tomorrow", etc.
4. Only mention blockers if they actually exist. If no blockers, do not mention them at all — omitting is cleaner.
5. No closing statement. End on the last task update.

BANNED PHRASES — never use these:
"I was able to", "I have commenced", "at this stage", "I do not have any blockers", "I look forward to providing a further update", "with all necessary tools and resources available", "including creating necessary folders"

LENGTH: 60–120 words. Never exceed 150 words. Australian English.`;

    const promptParts = [`Write my ${type} sign-off message.`, `Completed: ${completed}`];
    if (inprogress) promptParts.push(`In progress: ${inprogress}`);
    if (blockers)   promptParts.push(`Blockers: ${blockers}`);
    const prompt = promptParts.join('\n');
    const result = await callClaude(system, prompt);
    const out = document.getElementById('eod-output');
    document.getElementById('eod-result').value = result;
    if (out) out.hidden = false;
    out?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (e) {
    alert('Claude API error: ' + e.message);
  }
  aiSetBtn('eod-btn', false, 'Write summary →', 'Writing…');
}

// ── Feature 5: Message Reply Writer ──────────────────────────────
async function generateMessageReply() {
  const msg    = document.getElementById('reply-msg')?.value?.trim();
  const intent = document.getElementById('reply-intent')?.value?.trim();
  const sender = document.getElementById('reply-sender')?.value?.trim() || 'someone';
  if (!msg) { alert('Paste the message you want to reply to first.'); return; }
  const key = getAiKey();
  if (!key) { aiNoKey('Message Reply Writer'); return; }
  aiSetBtn('reply-btn', true, 'Write reply →', 'Writing…');
  const system = `You write casual, natural message replies for a marketing coordinator at a financial company.

VOICE:
- Conversational and warm — like texting or messaging a colleague you're comfortable with
- Not stiff, not corporate — no "I hope this finds you well", no "Please do not hesitate"
- Direct, get to the point fast
- Match the energy of the original message — if it's short and casual, keep it short and casual
- First person, written as the user
- Short is almost always better — don't pad it out

RULES:
- Output ONLY the reply text — no labels, no "Here is your reply:", no quotes around it
- No sign-off unless the original message had one
- If intent/key points are provided, cover those naturally within the reply`;

  const userMsg = `Message from ${sender}:\n${msg}${intent ? `\n\nWhat I want to say / key points:\n${intent}` : ''}`;
  try {
    const result = await callClaude(system, userMsg);
    document.getElementById('reply-output').hidden = false;
    document.getElementById('reply-result').value  = result.trim();
  } catch (e) {
    if (e.message === 'NO_KEY') aiNoKey('Message Reply Writer');
    else alert('Error: ' + e.message);
  }
  aiSetBtn('reply-btn', false, 'Write reply →', 'Writing…');
}

// ── Feature 6: EDM Filename Generator ────────────────────────────
async function generateEdmFilename() {
  const content = document.getElementById('fn-content')?.value?.trim();
  const datePrefix = document.getElementById('fn-date')?.value?.trim();
  if (!content) { alert('Paste the email content first.'); return; }
  const key = getAiKey();
  if (!key) { aiNoKey('EDM Filename Generator'); return; }
  aiSetBtn('fn-btn', true, 'Generate filename →', 'Analysing…');

  const system = `You generate filenames for email marketing files following strict rules.

Extract exactly 3 components from the email content:

1. HEADLINE PHRASE — the short lead-in from the main banner/heading text (before any colon or dollar figure). Take only 2–4 descriptive words. Drop numbers, currency symbols, punctuation.

2. PRODUCT CATEGORY — read it from the email content. Must be exactly one of these four options:
   - "Horizon Mortgages" — for residential/owner-occupier or long-term mortgage products
   - "Private Lending" — for private credit, short-term property-secured loans, or where the sender is a Private Lending team member
   - "Development Finance" — for construction, land development, or property development funding
   - "Bridging" — for bridging loans, short-term gap finance between property transactions
   Identify from: explicit product name in the email body or subject, sender's role/team in the signature, or the loan type described. Do NOT default to Private Lending — read the content carefully. If genuinely uncertain, set confidence to "low" and describe what you found in notes.

3. TOPIC KEYWORD — the most repeated subject/theme in the body copy (appears 2+ times). 1–3 words only. Examples: "ATO Debt", "Cashflow Relief", "Bridging Finance", "Land Subdivision".

FORMATTING RULES:
- Title Case each word
- Underscores only — no spaces, no hyphens
- Strip all punctuation and numbers
- Order: Headline_Product_Topic

Return ONLY valid JSON, no other text. Example format (values are illustrative only — always derive from the actual email):
{
  "headline": "New Rates Available",
  "product": "Development Finance",
  "topic": "Land Subdivision",
  "filename": "New_Rates_Available_Development_Finance_Land_Subdivision",
  "confidence": "high",
  "notes": ""
}`;

  try {
    const raw = await callClaude(system, content);
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Could not parse AI response — try again.');
    const r = JSON.parse(match[0]);
    const prefix = datePrefix ? datePrefix + '_' : '';
    const full   = prefix + r.filename;
    window._fnCurrentFilename = full;

    document.getElementById('fn-output').hidden = false;
    document.getElementById('fn-result').innerHTML = `
      <div class="fn-filename">${escapeHtml(full)}</div>
      <div class="fn-breakdown">
        <span class="fn-part fn-part-headline" title="Headline phrase">${escapeHtml(r.headline)}</span>
        <span class="fn-sep">+</span>
        <span class="fn-part fn-part-product" title="Product category">${escapeHtml(r.product)}</span>
        <span class="fn-sep">+</span>
        <span class="fn-part fn-part-topic" title="Topic keyword">${escapeHtml(r.topic)}</span>
      </div>
      ${r.notes ? `<div class="fn-notes">${escapeHtml(r.notes)}</div>` : ''}
      <div class="fn-confidence">Confidence: <strong class="fn-conf-${escapeHtml(r.confidence)}">${escapeHtml(r.confidence)}</strong></div>`;
  } catch (e) {
    alert('Error: ' + e.message);
  }
  aiSetBtn('fn-btn', false, 'Generate filename →', 'Analysing…');
}

function copyFnResult() {
  if (!window._fnCurrentFilename) return;
  navigator.clipboard.writeText(window._fnCurrentFilename)
    .then(() => showAiToast('✓ Filename copied'));
}

// ══════════════════════════════════════════════════════════════════
// QUICK NOTES DRAWER
// ══════════════════════════════════════════════════════════════════

const NOTES_KEYS = {
  daily: 'msc_notes_daily_v1',
  clips: 'msc_notes_clips_v1',
  week:  'msc_notes_week_v1'
};
const NOTES_HINTS = {
  daily: 'Clears automatically each day at midnight.',
  clips: 'Saved until you delete them — great for reusable phrases.',
  week:  'Clears automatically each Monday.'
};

let notesActiveTab = 'daily';

function loadNotes(tab) {
  try {
    const raw = JSON.parse(localStorage.getItem(NOTES_KEYS[tab])) || [];
    if (tab === 'daily') {
      const today = getTodayStr();
      return raw.filter(n => n.date === today);
    }
    if (tab === 'week') {
      const weekStart = getWeekStartStr();
      return raw.filter(n => n.week === weekStart);
    }
    return raw; // clips persist
  } catch { return []; }
}

function saveNotes(tab, list) {
  localStorage.setItem(NOTES_KEYS[tab], JSON.stringify(list));
}

function getWeekStartStr() {
  const d = new Date();
  const day = d.getDay(); // 0=Sun
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Mon
  const mon = new Date(d.setDate(diff));
  return mon.toISOString().slice(0, 10);
}

function switchNotesTab(tab) {
  notesActiveTab = tab;
  document.querySelectorAll('.notes-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  const hint = document.getElementById('notes-tab-hint');
  if (hint) hint.textContent = NOTES_HINTS[tab];
  const inp = document.getElementById('notes-input');
  if (inp) {
    inp.placeholder = tab === 'clips'
      ? 'Save a reusable phrase, campaign name, or audience description…'
      : 'Type a note and press Add… (Ctrl+Enter)';
    inp.value = '';
    inp.focus();
  }
  renderNotesList();
}

function addNote() {
  const inp  = document.getElementById('notes-input');
  const text = inp?.value?.trim();
  if (!text) return;
  const list = loadNotes(notesActiveTab);
  const note = {
    id:   Date.now(),
    text,
    date: getTodayStr(),
    week: getWeekStartStr(),
    time: new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })
  };
  list.unshift(note);
  saveNotes(notesActiveTab, list);
  inp.value = '';
  inp.focus();
  renderNotesList();
}

function deleteNote(tab, id) {
  const list = loadNotes(tab).filter(n => n.id !== id);
  // For daily/week we need to reload ALL (not just today's filtered)
  const raw = (() => { try { return JSON.parse(localStorage.getItem(NOTES_KEYS[tab])) || []; } catch { return []; } })();
  saveNotes(tab, raw.filter(n => n.id !== id));
  renderNotesList();
}

function copyNote(text) {
  navigator.clipboard.writeText(text).then(() => showAiToast('✓ Copied — paste into any field'));
}

function renderNotesList() {
  const el   = document.getElementById('notes-list');
  const hint = document.getElementById('notes-tab-hint');
  if (!el) return;
  if (hint) hint.textContent = NOTES_HINTS[notesActiveTab];

  const list = loadNotes(notesActiveTab);
  if (!list.length) {
    el.innerHTML = `<div class="notes-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:28px;height:28px;opacity:0.2;margin-bottom:8px"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
      <div>No notes yet</div>
      <div style="font-size:11px;margin-top:3px">${NOTES_HINTS[notesActiveTab]}</div>
    </div>`;
    return;
  }

  el.innerHTML = list.map(n => `
    <div class="note-card">
      <div class="note-text">${escapeHtml(n.text)}</div>
      <div class="note-footer">
        <span class="note-time">${n.time || ''}</span>
        <div class="note-actions">
          <button class="note-copy-btn" onclick="copyNote(${JSON.stringify(n.text)})" title="Copy to clipboard">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="5" width="9" height="9" rx="1"/><path d="M3 11H2a1 1 0 01-1-1V2a1 1 0 011-1h8a1 1 0 011 1v1"/></svg>
            Copy
          </button>
          <button class="note-delete-btn" onclick="deleteNote('${notesActiveTab}', ${n.id})" title="Delete">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
          </button>
        </div>
      </div>
    </div>`).join('');
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ══════════════════════════════════════════════════════════════════
// SALESFORCE EDM — Final QA Checklist
// ══════════════════════════════════════════════════════════════════

const EDM_QA_ITEMS = [
  { id:'eq1', label:'Subject line is correct — matches Petro\'s brief exactly', sub:'Check the Chrome tab title of index.html was typed accurately. Spelling and capitalisation matter.', badge:'critical' },
  { id:'eq2', label:'HTML version looks correct in the editor — all pages reviewed', sub:'Scroll through every section. Check wording, layout, and that no content is missing or duplicated.' },
  { id:'eq3', label:'Plain text version added and roughly matches the HTML content', sub:'Text tab should have the plain text pasted in. No need to be perfect, but major content should match.' },
  { id:'eq4', label:'All links work — every clickable element tested', sub:'Click every link in the test email. CTAs, banners, social icons, footer links. Dead links are a compliance risk.' },
  { id:'eq5', label:'LinkedIn icon URL added manually — linkedin.com/company/assetline-capital', sub:'This icon frequently comes through without a URL from Figma. Always check and add manually.', badge:'common miss' },
  { id:'eq6', label:'Merge fields verified in Preview tab — first name renders correctly', sub:'Preview tab → select a sample prospect (e.g. Billy). Merge fields don\'t show in test emails — only here.' },
  { id:'eq7', label:'All 4 recipient lists selected', sub:'All Brokers (Leads + Contacts) · James Green Database · Assetline Team Managerial/Executive · State Managers. All 4, every time.', badge:'critical' },
  { id:'eq8', label:'Sender is "Assetline Capital" / apply@assetline.com.au — reply-to matches', sub:'Sending tab: Sender name = Assetline Capital · Sender email = apply@assetline.com.au · Reply-to = apply@assetline.com.au', badge:'critical' },
];

// ── Phase Cards data ─────────────────────────────────────────────
// ── Tab name + Save helpers (used in step desc HTML) ─────────────
const T = s => `<span class="edm-tab-name">${s}</span>`;   // bold green tab label
const S = `<span class="edm-save-word">Save</span>`;        // red bold Save

const EDM_PHASES = [
  { id:'ph1', num:1, title:'Receive & Open Files', steps:[
    { id:'ph1s1', num:1, title:'Receive the ZIP from Petro via Teams', badge:null,
      tab: null, links: [], save: null,
      desc:'Petro sends a Teams message with a ZIP file. Check his message for: the HTML file, campaign name, send date and time — all in the message. Update the <strong>Campaign Details</strong> card at the top with the campaign name and any sender changes Petro specifies.' },
    { id:'ph1s2', num:2, title:'Extract and open both files in Chrome', badge:null,
      tab: null, links: [], save: null,
      desc:`Open the date-named folder. Find <code class="edm-code">index.html</code> and <code class="edm-code">plain-text-version.txt</code> — right-click each → <strong>Open with Google Chrome</strong>. Keep both Chrome tabs open throughout the whole process.` },
  ]},
  { id:'ph2', num:2, title:'Create the Template', steps:[
    { id:'ph2s3', num:3, title:'Create new template in Account Engagement', badge:null,
      tab: 'Account Engagement Email → Templates → New',
      links: [],
      save: 'Click Save after entering name, campaign, and tracker domain',
      desc:`Navigate to ${T('Account Engagement Email')} → ${T('Templates')} → <strong>New</strong>.<br>
            • <strong>Name:</strong> <code class="edm-code">YYMMDD_Description</code><br>
            • <strong>Campaign:</strong> use exactly what Petro sent (copy from Campaign Details card)<br>
            • <strong>Tracker domain:</strong> <code class="edm-code">go.assetline.com.au</code> (confirm default)<br>
            Click ${S}.` },
    { id:'ph2s4', num:4, title:'Skip the layout step', badge:null,
      tab: 'Layout screen — skip it (next screen after creating template)',
      links: [], save: null,
      desc:'On the next screen, <strong>skip the layout step entirely</strong>. The HTML already contains the full email structure — no layout template is needed.' },
    { id:'ph2s5', num:5, title:'Build the email — subject, HTML, plain text', badge:null,
      tab: 'Subject field → HTML tab → Text tab',
      links: [],
      save: 'Save after pasting HTML · Save after pasting plain text',
      desc:`<strong>Subject line:</strong> Chrome tab title of <code class="edm-code">index.html</code> — type exactly, check spelling.<br><br>
            ${T('HTML tab')}: Chrome → click in body → View Page Source → Select All → Copy → go to ${T('HTML tab')} in Salesforce → Delete existing → Paste → ${S}.<br><br>
            ${T('Text tab')}: Chrome plain-text tab → Select All → Copy → go to ${T('Text tab')} → Paste → ${S}.` },
  ]},
  { id:'ph3', num:3, title:'Review & Fix', steps:[
    { id:'ph3s6', num:6, title:'Check in the Editor tab', badge:null,
      tab: 'Editor tab', links: [], save: null,
      desc:`Go to the ${T('Editor tab')} — the email should appear. Check wording, content accuracy, and layout. <em>Minor spacing glitches in the editor are normal and won't appear in the sent email — don't worry about these.</em>` },
    { id:'ph3s7', num:7, title:'Add missing links — especially LinkedIn', badge:'warn',
      tab: 'Editor tab → click each link icon to edit URL',
      links: [{ label: 'Assetline LinkedIn', url: 'https://linkedin.com/company/assetline-capital' }],
      save: null,
      desc:'Check <strong>every</strong> clickable icon for missing URLs. The <strong>LinkedIn icon frequently comes through without a URL</strong> — add <code class="edm-code">linkedin.com/company/assetline-capital</code> manually every single time.' },
    { id:'ph3s8', num:8, title:'Verify merge fields in Preview tab', badge:null,
      tab: 'Preview tab',
      links: [],
      save: 'Click Save after verifying merge fields',
      desc:`Go to the ${T('Preview tab')} → select a sample prospect (e.g. Billy) → confirm the first name merge field renders correctly. Merge fields won\'t display in test emails — ${T('Preview tab')} is the only way to verify. ${S}.` },
  ]},
  { id:'ph4', num:4, title:'Sender Setup', steps:[
    { id:'ph4s9', num:9, title:'Set sender details in the Sending tab', badge:'critical',
      tab: 'Sending tab',
      links: [],
      save: 'Save after Sender name · Save after Sender email · Save after Reply-to',
      desc:`Go to the ${T('Sending tab')}. Copy the values from the <strong>Campaign Details</strong> card at the top of this page — Petro provides these for each send.<br>
            • <strong>Sender name:</strong> as provided<br>
            • <strong>Sender email:</strong> as provided → ${S}<br>
            • <strong>Reply-to:</strong> as provided → ${S}` },
  ]},
  { id:'ph5', num:5, title:'Test & Publish', steps:[
    { id:'ph5s10', num:10, title:'Send test email to YOURSELF only', badge:null,
      petroSelf: true,
      tab: 'Template → Send Test Email button',
      links: [], save: null,
      desc:`In the ${T('Template')}, send a test email to <strong>yourself only</strong>.<br>
            Check: design and layout, all links work, wording correct, merge fields visible, no errors.<br><br>
            <strong>⚠ Do not send to Petro yet</strong> — you will notify Petro <em>only after</em> you have applied the template to a Send in Phase 6.` },
    { id:'ph5s11', num:11, title:'Publish the template — does NOT send it', badge:'warn',
      tab: 'Editor tab → Publish button',
      links: [],
      save: 'Click Publish (not Save) — this activates the template for Sends',
      desc:`Once you are happy with your own test, click <strong>Publish</strong> from the ${T('Editor tab')}.<br>
            <strong>Publishing does NOT send the email</strong> — it only makes the template available to build a Send from. Nothing goes to recipients yet.` },
  ]},
  { id:'ph6', num:6, title:'Build the Send', steps:[
    { id:'ph6s12', num:12, title:'Create a new Send in the Sends tab', badge:null,
      tab: 'Sends tab → New Send',
      links: [],
      save: 'Click Save after entering Send name and campaign',
      desc:`Go to ${T('Sends tab')} → <strong>New Send</strong>.<br>
            • <strong>Name:</strong> <code class="edm-code">YYMMDD_Description</code> (same as the template)<br>
            • <strong>Campaign:</strong> same campaign from Campaign Details card<br>
            Leave tracker domain — it inherits from the template. ${S}.` },
    { id:'ph6s13', num:13, title:'Apply template — then notify Petro for his test review', badge:null,
      petroMsg: true,
      tab: 'Send → Template field (search by name)',
      links: [], save: null,
      desc:`In the ${T('Send')}, search for the template by name (paste the name). Select it and apply. Subject, HTML, text, and sender details all carry over automatically.<br><br>
            <strong>Now send a test email to Petro</strong> — this is the first time Petro sees it. Use a message from the widget below, copy it, and send it in Teams or email.` },
    { id:'ph6s14', num:14, title:'Add all 4 recipient lists', badge:'critical',
      tab: 'Send → Recipients section',
      links: [], save: null,
      desc:'Add: <strong>All Brokers (Leads + Contacts)</strong> + <strong>James Green Database</strong> + <strong>Assetline Team Managerial/Executive</strong> + <strong>State Managers</strong>. All 4 — every time. Do not skip any.' },
    { id:'ph6s15', num:15, title:'Run Final QA — use the checklist below', badge:null,
      tab: 'Final QA checklist (scroll down below phases)',
      links: [], save: null,
      desc:'Complete the Final QA checklist below before sending or scheduling. All 8 items must be confirmed.' },
  ]},
  { id:'ph7', num:7, title:'Send or Schedule', steps:[
    { id:'ph7s16', num:16, title:'Send now or schedule', badge:'critical',
      tab: 'Send → Send Now or Schedule button',
      links: [], save: null,
      desc:`<strong>Send now</strong> — sends immediately.<br>
            <strong>Schedule</strong> — use when Petro specifies a date and time.<br><br>
            <span class="ci-badge critical">timezone</span> Scheduling uses <strong>your local timezone</strong>. If the email goes at 9 AM Sydney time and you\'re in the Philippines, subtract 3 hours → schedule at 6 AM your time. <strong>Confirm with Petro when scheduling for the first time.</strong>` },
  ]},
];

// ── Petro notification messages (Step 13 — template applied to Send) ──
const EDM_PETRO_TEST_MSGS = [
  "Hi Petro, sending you the [templateName] test now — let me know when you've had a chance to review.",
  "Hey Petro, [templateName] test is in your inbox. Let me know if anything needs adjusting.",
  "Hi Petro, the [templateName] test is heading your way. Let me know once you've had a look.",
  "Petro — [templateName] test is ready and sent. Waiting on your thumbs up.",
  "Hi Petro, I've sent you through the [templateName] test — let me know if you're happy for me to proceed.",
  "Hey Petro, just sent the [templateName] test. Let me know once you've reviewed.",
  "Hi Petro, [templateName] test is with you now. Let me know if you'd like any changes.",
  "Petro, [templateName] test sent — let me know once you've had a look.",
  "Hi Petro, sending through the [templateName] test for your sign-off.",
  "Hey Petro, [templateName] is ready — test email on its way to you now.",
];

// ── Ready-to-send messages (after Final QA — notify Petro) ──────
const EDM_SEND_MSGS = [
  "Hi Petro, [templateName] is ready to go. What time would you like me to schedule the send?",
  "Hey Petro, [templateName] is all set and ready. Please confirm the send time.",
  "Hi Petro, [templateName] is good to go. Do you want me to send now or schedule for a specific time?",
  "Petro, [templateName] is ready. Can you confirm the send time?",
  "Hi Petro, all done on [templateName] and ready to send. What's the timing?",
  "Hey Petro — [templateName] is set. Do you want it sent now or scheduled?",
  "Hi Petro, [templateName] is ready to go live. Please confirm timing and I'll get it done.",
  "Hey Petro, [templateName] is done and ready. Send now or at a specific time?",
  "Hi Petro, [templateName] is ready and waiting on your instruction. Now or schedule?",
  "Petro, [templateName] is ready to send. Just say the word.",
];

let edmPetroMsgIdx = 0;
let edmSendMsgIdx  = 0;

function getEdmTemplateName() {
  // Read from live DOM first so message previews update as you type
  const dom = document.getElementById('edm-camp-name')?.value?.trim();
  if (dom) return dom;
  return loadEdmCampaign().campaign?.trim() || 'this send';
}

function fillEdmMsg(raw) {
  return raw.replace(/\[templateName\]/g, getEdmTemplateName());
}

function shuffleEdmMsg(type) {
  if (type === 'test') {
    edmPetroMsgIdx = Math.floor(Math.random() * EDM_PETRO_TEST_MSGS.length);
    const el      = document.getElementById('edm-petro-msg-text');
    const counter = document.getElementById('edm-petro-msg-counter');
    if (el)      el.textContent = fillEdmMsg(EDM_PETRO_TEST_MSGS[edmPetroMsgIdx]);
    if (counter) counter.textContent = `${edmPetroMsgIdx + 1} of ${EDM_PETRO_TEST_MSGS.length}`;
  } else {
    edmSendMsgIdx = Math.floor(Math.random() * EDM_SEND_MSGS.length);
    const el      = document.getElementById('edm-send-msg-text');
    const counter = document.getElementById('edm-send-msg-counter');
    if (el)      el.textContent = fillEdmMsg(EDM_SEND_MSGS[edmSendMsgIdx]);
    if (counter) counter.textContent = `${edmSendMsgIdx + 1} of ${EDM_SEND_MSGS.length}`;
  }
}

function copyEdmMsg(type) {
  const msgs = type === 'test' ? EDM_PETRO_TEST_MSGS : EDM_SEND_MSGS;
  const idx  = type === 'test' ? edmPetroMsgIdx : edmSendMsgIdx;
  const text = fillEdmMsg(msgs[idx]);
  navigator.clipboard.writeText(text).then(() => showAiToast('✓ Copied — paste into Teams'));
}

// ── Campaign Details card (changes per send — provided by Petro) ─
const EDM_CAMPAIGN_KEY = 'msc_edm_campaign_v1';
const EDM_CAMPAIGN_DEFAULT = { campaign:'', senderName:'Assetline Capital', senderEmail:'apply@assetline.com.au', replyTo:'apply@assetline.com.au' };

function loadEdmCampaign() { try { return { ...EDM_CAMPAIGN_DEFAULT, ...JSON.parse(localStorage.getItem(EDM_CAMPAIGN_KEY)) }; } catch { return { ...EDM_CAMPAIGN_DEFAULT }; } }
function saveEdmCampaignData(d) { localStorage.setItem(EDM_CAMPAIGN_KEY, JSON.stringify(d)); }

function saveEdmCampaignEdit() {
  const d = {
    campaign:    document.getElementById('edm-camp-name')?.value?.trim()  || '',
    campaignLib: document.getElementById('edm-camp-lib')?.value?.trim()   || '',
    senderName:  document.getElementById('edm-camp-sndr')?.value?.trim()  || 'Assetline Capital',
    senderEmail: document.getElementById('edm-camp-email')?.value?.trim() || 'apply@assetline.com.au',
    replyTo:     document.getElementById('edm-camp-reply')?.value?.trim() || 'apply@assetline.com.au',
  };
  saveEdmCampaignData(d);
}

function clearEdmCampaign() {
  saveEdmCampaignData({ ...EDM_CAMPAIGN_DEFAULT, campaign:'' });
  renderEdmCampaignCard();
  showAiToast('Campaign details cleared — ready for next send');
}

function renderEdmCampaignCard() {
  const el = document.getElementById('edm-campaign-card');
  if (!el) return;
  const d = loadEdmCampaign();
  el.innerHTML = `
    <div class="section-block edm-campaign-block">
      <div class="section-block-header">
        <div class="sh-icon" style="background:var(--gold-dim);color:var(--gold)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12v9H2z"/><polyline points="2,4 8,9 14,4"/></svg>
        </div>
        <span class="sh-title">This Send's Details <span style="font-weight:400;font-size:11px;color:var(--text-3)">(Petro provides all — update every time)</span></span>
        <button onclick="clearEdmCampaign()" style="margin-left:auto;background:none;border:1px solid var(--border);border-radius:6px;color:var(--text-3);font-size:10.5px;padding:3px 9px;cursor:pointer;font-family:var(--font-body)">Clear for next send</button>
      </div>
      <div class="edm-campaign-grid">
        <div class="edm-camp-field">
          <label class="edm-camp-label">Template name <span class="edm-camp-required">*</span><span style="font-weight:400;color:var(--text-3)"> — from the HTML filename Petro sends</span></label>
          <input class="form-input" id="edm-camp-name" value="${escapeHtml(d.campaign)}" placeholder="e.g. 260610_SMSF  (date + underscore + name from Petro)" oninput="saveEdmCampaignEdit(); refreshEdmMsgPreviews()"/>
        </div>
        <div class="edm-camp-field">
          <label class="edm-camp-label">Campaign library <span class="edm-camp-required">*</span><span style="font-weight:400;color:var(--text-3)"> — Salesforce campaign bucket</span></label>
          <input class="form-input" id="edm-camp-lib" value="${escapeHtml(d.campaignLib||'')}" placeholder="e.g. Broker eDM 2026 — exact name from Petro" oninput="saveEdmCampaignEdit()"/>
        </div>
        <div class="edm-camp-field">
          <label class="edm-camp-label">Sender name <span class="edm-camp-required">*</span></label>
          <input class="form-input" id="edm-camp-sndr" value="${escapeHtml(d.senderName)}" placeholder="e.g. Assetline Capital" oninput="saveEdmCampaignEdit()"/>
        </div>
        <div class="edm-camp-field">
          <label class="edm-camp-label">Sender email <span class="edm-camp-required">*</span></label>
          <input class="form-input" id="edm-camp-email" value="${escapeHtml(d.senderEmail)}" placeholder="e.g. apply@assetline.com.au" oninput="saveEdmCampaignEdit()"/>
        </div>
        <div class="edm-camp-field" style="grid-column:1/-1">
          <label class="edm-camp-label">Reply-to email <span class="edm-camp-required">*</span></label>
          <input class="form-input" id="edm-camp-reply" value="${escapeHtml(d.replyTo)}" placeholder="e.g. apply@assetline.com.au" oninput="saveEdmCampaignEdit()"/>
        </div>
      </div>
      <div class="edm-camp-footer">
        <div class="edm-camp-note">All values provided by Petro in Teams each time. Auto-saves as you type. Template name fills your Petro messages automatically.</div>
        <button class="edm-start-timer-btn" onclick="addEdmToTimer()" title="Add this EDM as a task in the Task Timer">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="9" r="5"/><polyline points="8,6 8,9 10,11"/><line x1="6" y1="1" x2="10" y2="1"/></svg>
          Add to Timer →
        </button>
      </div>
    </div>`;
}

function refreshEdmMsgPreviews() {
  const el  = document.getElementById('edm-petro-msg-text');
  if (el)  el.textContent  = fillEdmMsg(EDM_PETRO_TEST_MSGS[edmPetroMsgIdx]);
  const el2 = document.getElementById('edm-send-msg-text');
  if (el2) el2.textContent = fillEdmMsg(EDM_SEND_MSGS[edmSendMsgIdx]);
}

function addEdmToTimer() {
  const d = loadEdmCampaign();
  const name = d.campaign?.trim() || 'EDM Send';
  if (!name || name === 'this send') {
    showAiToast('Enter the Template name first, then add to timer');
    document.getElementById('edm-camp-name')?.focus();
    return;
  }

  // Build brief like Brief Intake does
  const taskType = 'email_campaign';
  const map      = TASK_TYPE_MAP[taskType];
  const checklist = [
    ...(PRIORITY_ITEMS.high || []),
    ...(map?.checklistKeys?.flatMap(key => (CHECKLISTS[key] || []).map(i => ({ ...i }))) || []),
  ];

  const brief = {
    id:          'brief_' + Date.now(),
    name,
    requestor:   'Petro',
    taskType,
    priority:    'high',
    deadline:    new Date().toISOString().slice(0,10),
    description: `Salesforce EDM send${d.campaignLib ? ' — ' + d.campaignLib : ''}. Sender: ${d.senderName} <${d.senderEmail}>`,
    status:      'active',
    sessions:    [],
    totalMins:   0,
    createdAt:   new Date().toISOString(),
    checklist,
    checkState:  {},
    guideSteps:  map?.guideSteps || [],
    templateIds: map?.templateIds || [],
    addedToTimesheet: false,
    timerNotes:  [],
  };

  const briefs = loadBriefs();
  briefs[brief.id] = brief;
  saveBriefs(briefs);

  showAiToast('✓ "' + name + '" added to Task Timer');
  setTimeout(() => navigate('timer'), 800);
}

// ── Recipient Lists (editable) ───────────────────────────────────
const EDM_LISTS_KEY = 'msc_edm_lists_v1';
const EDM_LISTS_DEFAULT = [
  { id:'el1', name:'All Brokers — Leads and Contacts', type:'Customer · Brokers', count:'15,210' },
  { id:'el2', name:'James Green Database',             type:'Customer · Brokers', count:'6,355' },
  { id:'el3', name:'Assetline Team — Managerial / Executive', type:'Internal',    count:'4' },
  { id:'el4', name:'Assetline Team — State Managers',  type:'Internal',           count:'2' },
];
function loadEdmLists() { try { const r=JSON.parse(localStorage.getItem(EDM_LISTS_KEY)); return r?.length?r:[...EDM_LISTS_DEFAULT]; } catch { return [...EDM_LISTS_DEFAULT]; } }
function saveEdmLists(d) { localStorage.setItem(EDM_LISTS_KEY, JSON.stringify(d)); }

let edmListsOpen   = false;
let edmListsEditing = false;

function toggleEdmLists() {
  edmListsOpen = !edmListsOpen;
  if (!edmListsOpen) edmListsEditing = false;
  renderEdmLists();
}

function startEdmListsEdit() {
  edmListsEditing = true;
  renderEdmLists();
  // focus first input
  setTimeout(() => document.querySelector('.edm-list-edit-name')?.focus(), 50);
}

function saveEdmListsEdit() {
  const rows = document.querySelectorAll('.edm-list-edit-row');
  const lists = [];
  rows.forEach((row, i) => {
    const def = EDM_LISTS_DEFAULT[i] || {};
    lists.push({
      id:   def.id || 'el' + (i+1),
      name: row.querySelector('.edm-list-edit-name')?.value?.trim() || def.name,
      type: row.querySelector('.edm-list-edit-type')?.value?.trim() || def.type,
      count:row.querySelector('.edm-list-edit-count')?.value?.trim() || def.count,
    });
  });
  saveEdmLists(lists);
  edmListsEditing = false;
  renderEdmLists();
  showAiToast('✓ Recipient lists updated');
}

function cancelEdmListsEdit() {
  edmListsEditing = false;
  renderEdmLists();
}

function renderEdmLists() {
  const el = document.getElementById('edm-lists-card');
  if (!el) return;
  const lists = loadEdmLists();

  if (!edmListsOpen) {
    el.innerHTML = `
      <div class="edm-lists-collapsed" onclick="toggleEdmLists()">
        <div class="sh-icon green" style="width:28px;height:28px;flex-shrink:0">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12v9H2z"/><polyline points="2,4 8,9 14,4"/></svg>
        </div>
        <div style="flex:1">
          <div style="font-family:var(--font-display);font-size:13px;font-weight:700;color:var(--text-1)">Recipient Lists</div>
          <div style="font-size:11px;color:var(--text-3);margin-top:2px">${lists.length} lists · always add all of them · click to expand</div>
        </div>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;color:var(--text-3)"><polyline points="4,6 8,10 12,6"/></svg>
      </div>`;
    return;
  }

  if (edmListsEditing) {
    el.innerHTML = `
      <div class="section-block" style="border:1px solid var(--border-md)">
        <div class="section-block-header">
          <div class="sh-icon green"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12v9H2z"/><polyline points="2,4 8,9 14,4"/></svg></div>
          <span class="sh-title">Recipient Lists — Edit</span>
          <button class="btn-add" style="width:auto;padding:5px 12px;font-size:11px;margin-left:auto" onclick="saveEdmListsEdit()">Save changes</button>
          <button onclick="cancelEdmListsEdit()" style="margin-left:6px;background:none;border:1px solid var(--border);border-radius:6px;color:var(--text-3);font-size:11px;padding:5px 10px;cursor:pointer">Cancel</button>
        </div>
        <div style="padding:12px 16px;display:flex;flex-direction:column;gap:10px">
          ${lists.map((l,i) => `
          <div class="edm-list-edit-row">
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--accent);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px">List ${i+1}</div>
            <div style="display:grid;grid-template-columns:1fr auto auto;gap:6px;align-items:center">
              <input class="form-input edm-list-edit-name" value="${escapeHtml(l.name)}" placeholder="List name" style="font-size:12px"/>
              <input class="form-input edm-list-edit-type" value="${escapeHtml(l.type)}" placeholder="Type" style="width:130px;font-size:12px"/>
              <input class="form-input edm-list-edit-count" value="${escapeHtml(l.count)}" placeholder="Count" style="width:70px;font-size:12px;text-align:right"/>
            </div>
          </div>`).join('')}
        </div>
      </div>`;
    return;
  }

  // Expanded view mode
  el.innerHTML = `
    <div class="section-block" style="border:1px solid var(--border-md)">
      <div class="section-block-header">
        <div class="sh-icon green"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12v9H2z"/><polyline points="2,4 8,9 14,4"/></svg></div>
        <span class="sh-title">Recipient Lists — always add all ${lists.length}</span>
        <button onclick="startEdmListsEdit()" style="margin-left:auto;background:none;border:1px solid var(--border-md);border-radius:6px;color:var(--text-3);font-size:11px;padding:4px 10px;cursor:pointer;font-family:var(--font-body)">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" style="width:11px;height:11px"><path d="M9 2l3 3-7 7H2v-3l7-7z"/></svg> Edit
        </button>
        <button onclick="toggleEdmLists()" style="margin-left:6px;background:none;border:none;color:var(--text-3);font-size:18px;cursor:pointer;padding:2px 6px;line-height:1" title="Collapse">×</button>
      </div>
      <div style="font-size:11.5px;color:var(--text-3);font-style:italic;padding:8px 16px;border-bottom:1px solid var(--border)">Add all ${lists.length} lists every time you send a designed marketing eDM. Do not skip any.</div>
      ${lists.map(l => `
      <div class="edm-list-item">
        <div class="edm-list-left">
          <div class="edm-list-name">${escapeHtml(l.name)}</div>
          <span class="edm-list-type">${escapeHtml(l.type)}</span>
        </div>
        <div class="edm-list-count">${escapeHtml(l.count)}</div>
      </div>`).join('')}
      <div class="edm-list-total"><span>Total reach</span><span>~${calcEdmTotal(lists)}</span></div>
    </div>`;
}

function calcEdmTotal(lists) {
  const n = lists.reduce((sum, l) => {
    const num = parseInt((l.count || '').replace(/,/g,''), 10);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);
  return n.toLocaleString();
}

// ── Phase Cards ──────────────────────────────────────────────────
const EDM_STEPS_KEY = 'msc_edm_steps_v1';
function loadEdmSteps()  { try { return JSON.parse(localStorage.getItem(EDM_STEPS_KEY)) || {}; } catch { return {}; } }
function saveEdmSteps(d) { localStorage.setItem(EDM_STEPS_KEY, JSON.stringify(d)); }

// ── Phases checklist state ───────────────────────────────────────
let edmSelectedStep = null;
let edmDoneOpen     = false;

function renderEdmPhases() {
  const el = document.getElementById('edm-phases-container');
  if (!el) return;
  const state = loadEdmSteps();

  // Flatten all steps with phase reference
  const allSteps = EDM_PHASES.flatMap(phase => phase.steps.map(s => ({ ...s, phase })));
  const doneSteps   = allSteps.filter(s =>  state[s.id]);
  const activeSteps = allSteps.filter(s => !state[s.id]);

  // Default selection: first unchecked step (only if nothing selected yet)
  if (!edmSelectedStep && activeSteps.length) edmSelectedStep = activeSteps[0].id;

  // ── Done zone ──────────────────────────────────────────────────
  const doneCount = doneSteps.length;
  const doneZoneHtml = doneCount ? `
    <div class="edm-done-zone">
      <button class="edm-done-toggle" onclick="toggleEdmDoneZone()">
        <svg viewBox="0 0 16 16" fill="none" stroke="var(--sage)" stroke-width="1.8" style="width:13px;height:13px;flex-shrink:0"><polyline points="2,5 6,9 14,2"/></svg>
        <span class="edm-done-label">${doneCount} step${doneCount > 1 ? 's' : ''} completed</span>
        <svg id="edm-done-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" style="width:12px;height:12px;margin-left:auto;flex-shrink:0;transition:transform 0.2s;transform:${edmDoneOpen ? 'rotate(180deg)' : ''}"><polyline points="4,6 8,10 12,6"/></svg>
      </button>
      <div id="edm-done-list" style="display:${edmDoneOpen ? 'block' : 'none'}">
        ${doneSteps.map(s => edmStepRow(s, true)).join('')}
      </div>
    </div>` : '';

  // ── Active steps grouped by phase ─────────────────────────────
  let activeHtml = '';
  let anyActive = false;
  EDM_PHASES.forEach(phase => {
    const phaseActive = phase.steps.filter(s => !state[s.id]);
    if (!phaseActive.length) return;
    anyActive = true;
    const total    = phase.steps.length;
    const done     = phase.steps.filter(s => state[s.id]).length;
    const complete = done === total;
    activeHtml += `
      <div class="edm-phase-group">
        <div class="edm-phase-group-header${complete ? ' complete' : ''}">
          <span class="edm-pg-num">Phase ${phase.num}</span>
          <span class="edm-pg-title">${phase.title}</span>
          <span class="edm-pg-count${complete ? ' done' : ''}">${complete ? '✓ Done' : done + '/' + total}</span>
        </div>
        ${phaseActive.map(s => edmStepRow({ ...s, phase }, false)).join('')}
      </div>`;
  });

  if (!anyActive) {
    activeHtml = `<div class="edm-all-done">
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--sage)" stroke-width="1.5" style="width:30px;height:30px"><polyline points="20,6 9,17 4,12"/></svg>
      All 16 steps complete
    </div>`;
  }

  // ── Detail card ────────────────────────────────────────────────
  el.innerHTML = `
    <div class="edm-phases-layout">
      <div class="edm-phases-left">
        ${doneZoneHtml}
        <div class="edm-active-steps">${activeHtml}</div>
        <div style="padding:10px 14px">
          <button class="btn-reset" onclick="resetEdmPhases()" style="margin-top:0">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8a6 6 0 106-6H4m0 0L2 4m2-2v4"/></svg>
            Reset all phase steps
          </button>
        </div>
      </div>
      <div class="edm-phases-right">
        <div class="edm-detail-card" id="edm-detail-card">
          ${edmDetailCard()}
        </div>
      </div>
    </div>`;
}

function edmStepRow(step, isDone) {
  const selected = step.id === edmSelectedStep;
  const badge = step.badge === 'critical' ? ' <span class="ci-badge critical">critical</span>'
              : step.badge === 'warn'     ? ' <span class="ci-badge warn">note</span>' : '';
  return `
    <div class="edm-step-row${isDone ? ' done' : ''}${selected ? ' selected' : ''}" id="esr-${step.id}"
         onclick="selectEdmStep('${step.id}')">
      <div class="edm-step-row-check" onclick="event.stopPropagation();toggleEdmStep('${step.id}','${step.phase.id}')">
        <div class="check-box"><svg viewBox="0 0 12 12"><polyline points="1,6 4.5,10 11,2"/></svg></div>
      </div>
      <div class="edm-step-row-body">
        <span class="edm-step-num">Step ${step.num}</span>
        <span class="edm-step-row-title">${step.title}</span>${badge}
      </div>
    </div>`;
}

function edmDetailCard() {
  if (!edmSelectedStep) return `
    <div class="edm-detail-empty">
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2" style="width:36px;height:36px;opacity:0.2"><path d="M6 40V12a2 2 0 012-2h32a2 2 0 012 2v28l-8-4-8 4-8-4-8 4z"/><line x1="14" y1="20" x2="34" y2="20"/><line x1="14" y1="27" x2="26" y2="27"/></svg>
      <div class="edm-detail-empty-title">Select a step</div>
      <div class="edm-detail-empty-sub">Click any step on the left to see its full instructions here.</div>
    </div>`;

  let foundStep = null, foundPhase = null;
  for (const phase of EDM_PHASES) {
    const s = phase.steps.find(s => s.id === edmSelectedStep);
    if (s) { foundStep = s; foundPhase = phase; break; }
  }
  if (!foundStep) return '';

  const badge = foundStep.badge === 'critical' ? ' <span class="ci-badge critical">critical</span>'
              : foundStep.badge === 'warn'     ? ' <span class="ci-badge warn">note</span>' : '';

  const petroWidget = foundStep.petroMsg ? `
    <div class="edm-msg-widget">
      <div class="edm-msg-widget-label">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" style="width:12px;height:12px"><path d="M14 9a6 6 0 01-6 6H2L4 13a5 5 0 01-1-3A6 6 0 018 4h0a6 6 0 016 5z"/></svg>
        Message to send to Petro in Teams
      </div>
      <div class="edm-msg-text" id="edm-petro-msg-text">${fillEdmMsg(EDM_PETRO_TEST_MSGS[edmPetroMsgIdx])}</div>
      <div class="edm-msg-actions">
        <span class="edm-msg-counter" id="edm-petro-msg-counter">${edmPetroMsgIdx + 1} of ${EDM_PETRO_TEST_MSGS.length}</span>
        <button class="edm-shuffle-btn" onclick="shuffleEdmMsg('test')">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h9l3 4-3 4H2"/><path d="M14 4l-3 4 3 4"/></svg> Shuffle
        </button>
        <button class="edm-copy-msg-btn" onclick="copyEdmMsg('test')">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="5" width="9" height="9" rx="1"/><path d="M3 11H2a1 1 0 01-1-1V2a1 1 0 011-1h8a1 1 0 011 1v1"/></svg> Copy
        </button>
      </div>
    </div>` : '';

  const summaryRows = [];
  if (foundStep.tab) {
    summaryRows.push(`<div class="edm-summary-row"><span class="edm-summary-label">Tab</span><span class="edm-summary-value">${foundStep.tab}</span></div>`);
  }
  if (foundStep.links && foundStep.links.length) {
    const linkItems = foundStep.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="edm-summary-link">${l.label}</a>`).join('');
    summaryRows.push(`<div class="edm-summary-row"><span class="edm-summary-label">Links</span><span class="edm-summary-value">${linkItems}</span></div>`);
  }
  if (foundStep.save) {
    summaryRows.push(`<div class="edm-summary-row"><span class="edm-summary-label">Save</span><span class="edm-summary-value">${foundStep.save}</span></div>`);
  }
  const summaryBlock = summaryRows.length ? `<div class="edm-detail-summary">${summaryRows.join('')}</div>` : '';

  return `
    <div class="edm-detail-header">
      <div class="edm-detail-phase-tag">Phase ${foundPhase.num} — ${foundPhase.title}</div>
      <div class="edm-detail-title">Step ${foundStep.num}: ${foundStep.title}${badge}</div>
    </div>
    <div class="edm-detail-body">
      <div class="edm-detail-desc">${foundStep.desc}</div>
      ${petroWidget}
      ${summaryBlock}
    </div>`;
}

function selectEdmStep(stepId) {
  edmSelectedStep = stepId;
  // Highlight the row
  document.querySelectorAll('.edm-step-row').forEach(r => r.classList.remove('selected'));
  const row = document.getElementById('esr-' + stepId);
  if (row) row.classList.add('selected');
  // Update detail panel only
  const card = document.getElementById('edm-detail-card');
  if (card) card.innerHTML = edmDetailCard();
}

function toggleEdmStep(stepId, phaseId) {
  const state = loadEdmSteps();
  if (state[stepId]) delete state[stepId]; else state[stepId] = true;
  saveEdmSteps(state);

  // If the checked step was selected, advance selection to next unchecked
  if (state[stepId] && stepId === edmSelectedStep) {
    const allSteps = EDM_PHASES.flatMap(p => p.steps);
    const idx  = allSteps.findIndex(s => s.id === stepId);
    const next = allSteps.slice(idx + 1).find(s => !state[s.id]);
    edmSelectedStep = next?.id || null;
  }

  renderEdmPhases();
}

function toggleEdmDoneZone() {
  edmDoneOpen = !edmDoneOpen;
  const list    = document.getElementById('edm-done-list');
  const chevron = document.getElementById('edm-done-chevron');
  if (list)    list.style.display        = edmDoneOpen ? 'block' : 'none';
  if (chevron) chevron.style.transform   = edmDoneOpen ? 'rotate(180deg)' : '';
}

function resetEdmPhases() {
  saveEdmSteps({});
  edmSelectedStep = null;
  edmDoneOpen     = false;
  renderEdmPhases();
}

// ── Floating EDM Notes ───────────────────────────────────────────
const EDM_NOTES_KEY = 'msc_edm_floatnotes_v1';
let edmNotesOpen = false;

function loadEdmFloatingNotes() { return localStorage.getItem(EDM_NOTES_KEY) || ''; }
function saveEdmFloatingNotes(text) { localStorage.setItem(EDM_NOTES_KEY, text); }

function showEdmFloatingNotes(show) {
  const w = document.getElementById('edm-floating-notes');
  if (w) w.style.display = show ? 'block' : 'none';
  if (show) {
    const ta = document.getElementById('edm-fn-textarea');
    if (ta) ta.value = loadEdmFloatingNotes();
  }
}

function toggleEdmNotes() {
  edmNotesOpen = !edmNotesOpen;
  const body    = document.getElementById('edm-fn-body');
  const chevron = document.getElementById('edm-fn-chevron');
  const label   = document.getElementById('edm-fn-label');
  if (body)    body.style.display = edmNotesOpen ? 'flex' : 'none';
  if (chevron) chevron.style.transform = edmNotesOpen ? 'rotate(180deg)' : '';
  if (label)   label.textContent = edmNotesOpen ? 'EDM Notes' : 'EDM Notes';
  if (edmNotesOpen) {
    const ta = document.getElementById('edm-fn-textarea');
    if (ta) { ta.value = loadEdmFloatingNotes(); ta.focus(); }
  }
}

function clearEdmFloatingNotes() {
  saveEdmFloatingNotes('');
  const ta = document.getElementById('edm-fn-textarea');
  if (ta) ta.value = '';
  showAiToast('EDM notes cleared');
}

const EDM_QA_KEY = 'msc_edm_qa_v1';

function loadEdmQA()  { try { return JSON.parse(localStorage.getItem(EDM_QA_KEY)) || {}; } catch { return {}; } }
function saveEdmQA(d) { localStorage.setItem(EDM_QA_KEY, JSON.stringify(d)); }

function renderEdmQA() {
  const el    = document.getElementById('list-edm-qa');
  const count = document.getElementById('count-edm-qa');
  const status = document.getElementById('edm-qa-status');
  const btn   = document.getElementById('edm-qa-btn');
  if (!el) return;

  const state  = loadEdmQA();
  const total  = EDM_QA_ITEMS.length;
  const done   = EDM_QA_ITEMS.filter(i => state[i.id]).length;

  el.innerHTML = EDM_QA_ITEMS.map(item => {
    const isDone = !!state[item.id];
    let badge = '';
    if (item.badge === 'critical')    badge = '<span class="ci-badge critical">critical</span>';
    else if (item.badge === 'common miss') badge = '<span class="ci-badge warn">common miss</span>';
    return `
      <div class="check-item${isDone ? ' done' : ''}" data-edm-id="${item.id}" onclick="toggleEdmQAItem('${item.id}')">
        <div class="check-box"><svg viewBox="0 0 12 12"><polyline points="1,6 4.5,10 11,2"/></svg></div>
        <div>
          <div class="ci-label">${item.label}${badge}</div>
          ${item.sub ? `<div class="ci-sub">${item.sub}</div>` : ''}
        </div>
      </div>`;
  }).join('');

  if (count)  count.textContent  = `${done}/${total}`;
  if (status) status.textContent = `${done} / ${total} checked`;
  if (btn) {
    btn.disabled = done < total;
    btn.classList.toggle('qc-ready', done === total);
  }
}

function toggleEdmQAItem(id) {
  const state = loadEdmQA();
  if (state[id]) delete state[id]; else state[id] = true;
  saveEdmQA(state);
  const el = document.querySelector(`[data-edm-id="${id}"]`);
  if (el) el.classList.toggle('done');
  // Update counter/button without full re-render
  const done  = EDM_QA_ITEMS.filter(i => state[i.id]).length;
  const total = EDM_QA_ITEMS.length;
  const count  = document.getElementById('count-edm-qa');
  const status = document.getElementById('edm-qa-status');
  const btn    = document.getElementById('edm-qa-btn');
  if (count)  count.textContent  = `${done}/${total}`;
  if (status) status.textContent = `${done} / ${total} checked`;
  if (btn) { btn.disabled = done < total; btn.classList.toggle('qc-ready', done === total); }
}

function markEdmQADone() {
  const btn = document.getElementById('edm-qa-btn');
  if (btn) { btn.textContent = '✓ QA complete — ready to send'; btn.disabled = true; btn.classList.add('qc-done'); }
  showEdmSendModal();
}

function showEdmSendModal() {
  const modal = document.getElementById('edm-send-modal');
  if (!modal) return;
  edmSendMsgIdx = Math.floor(Math.random() * EDM_SEND_MSGS.length);
  const msgEl = document.getElementById('edm-send-msg-text');
  const cntEl = document.getElementById('edm-send-msg-counter');
  if (msgEl) msgEl.textContent = fillEdmMsg(EDM_SEND_MSGS[edmSendMsgIdx]);
  if (cntEl) cntEl.textContent = `${edmSendMsgIdx + 1} of ${EDM_SEND_MSGS.length}`;
  modal.style.display = 'flex';
}

// ── EDM Sidebar notes collapsible (inner textarea only) ─────────
let edmSbNotesOpen = true;
function toggleEdmSbNotes() {
  edmSbNotesOpen = !edmSbNotesOpen;
  const body    = document.getElementById('edm-sb-notes-body');
  const chevron = document.getElementById('edm-sb-notes-chevron');
  if (body)    body.style.display      = edmSbNotesOpen ? 'block' : 'none';
  if (chevron) chevron.style.transform = edmSbNotesOpen ? '' : 'rotate(-90deg)';
}

// ── EDM Sidebar full collapse / expand ──────────────────────────
let edmSidebarCollapsed = false;

function collapseEdmSidebar() {
  edmSidebarCollapsed = true;
  const sidebar  = document.getElementById('edm-sidebar');
  const tab      = document.getElementById('edm-sidebar-reopen-tab');
  const content  = document.querySelector('.content');
  if (sidebar)  sidebar.classList.add('edm-sidebar-collapsed');
  if (content)  content.classList.remove('edm-sidebar-open');
  // Show re-open tab after slide animation
  setTimeout(() => {
    if (tab && edmSidebarCollapsed) tab.style.display = 'flex';
  }, 280);
}

function expandEdmSidebar() {
  edmSidebarCollapsed = false;
  const sidebar = document.getElementById('edm-sidebar');
  const tab     = document.getElementById('edm-sidebar-reopen-tab');
  const content = document.querySelector('.content');
  if (tab)     tab.style.display = 'none';
  if (sidebar) sidebar.classList.remove('edm-sidebar-collapsed');
  if (content) content.classList.add('edm-sidebar-open');
}

// ── EDM Sidebar show/hide ────────────────────────────────────────
function setEdmSidebarVisible(visible) {
  const sidebar   = document.getElementById('edm-sidebar');
  const content   = document.querySelector('.content');
  const rightTabs = document.querySelector('.right-tabs-stack');
  const tab       = document.getElementById('edm-sidebar-reopen-tab');

  if (!visible) {
    // Leaving salesforce tab — hide everything, restore hub tabs
    if (sidebar)   { sidebar.style.display = 'none'; sidebar.classList.remove('edm-sidebar-collapsed'); }
    if (content)   content.classList.remove('edm-sidebar-open');
    if (rightTabs) rightTabs.style.display = 'flex';
    if (tab)       tab.style.display = 'none';
    edmSidebarCollapsed = false;
    return;
  }

  // Entering salesforce tab
  if (rightTabs) rightTabs.style.display = 'none';

  if (edmSidebarCollapsed) {
    // Sidebar was collapsed before — keep it collapsed, just show reopen tab
    if (sidebar) sidebar.style.display = 'flex';
    if (tab)     tab.style.display = 'flex';
    if (content) content.classList.remove('edm-sidebar-open');
  } else {
    if (sidebar) { sidebar.style.display = 'flex'; sidebar.classList.remove('edm-sidebar-collapsed'); }
    if (content) content.classList.add('edm-sidebar-open');
    if (tab)     tab.style.display = 'none';
    const ta = document.getElementById('edm-fn-textarea');
    if (ta) ta.value = loadEdmFloatingNotes();
    renderEdmLists();
  }
}

function closeEdmSendModal() {
  const modal = document.getElementById('edm-send-modal');
  if (modal) modal.style.display = 'none';
}

function resetEdmQA() {
  saveEdmQA({});
  renderEdmQA();
  const btn = document.getElementById('edm-qa-btn');
  if (btn) { btn.textContent = 'Ready to Send ✓'; btn.classList.remove('qc-done', 'qc-ready'); btn.disabled = true; }
}

function copyEdmRef(text, el) {
  navigator.clipboard.writeText(text).then(() => {
    showAiToast('✓ Copied — ' + text);
    if (el) {
      const orig = el.dataset.orig || el.textContent;
      el.dataset.orig = orig;
      el.textContent = '✓ Copied!';
      setTimeout(() => { el.textContent = orig; }, 1600);
    }
  });
}

// ══════════════════════════════════════════════════════════════════
// TEXT COMPARE — Diff Checker
// ══════════════════════════════════════════════════════════════════

function computeLineDiff(a, b) {
  const m = a.length, n = b.length;
  // DP table — use flat array for speed
  const dp = new Int32Array((m+1) * (n+1));
  const idx = (i,j) => i*(n+1)+j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[idx(i,j)] = a[i-1] === b[j-1]
        ? dp[idx(i-1,j-1)] + 1
        : Math.max(dp[idx(i-1,j)], dp[idx(i,j-1)]);
    }
  }
  // Iterative backtrack
  const ops = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i-1] === b[j-1]) {
      ops.unshift({ t:'eq', l:a[i-1], r:b[j-1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[idx(i,j-1)] >= dp[idx(i-1,j)])) {
      ops.unshift({ t:'add', r:b[j-1] });
      j--;
    } else {
      ops.unshift({ t:'del', l:a[i-1] });
      i--;
    }
  }
  // Pair adjacent del+add as 'mod'
  const out = [];
  for (let k = 0; k < ops.length; k++) {
    if (ops[k].t === 'del' && k+1 < ops.length && ops[k+1].t === 'add') {
      out.push({ t:'mod', l:ops[k].l, r:ops[k+1].r });
      k++;
    } else {
      out.push(ops[k]);
    }
  }
  return out;
}

function computeWordDiff(left, right) {
  // Tokenise into words + whitespace runs
  const tok = s => s.match(/\S+|\s+/g) || [''];
  const a = tok(left), b = tok(right);
  const m = a.length, n = b.length;
  const dp = new Int32Array((m+1)*(n+1));
  const idx = (i,j) => i*(n+1)+j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[idx(i,j)] = a[i-1] === b[j-1] ? dp[idx(i-1,j-1)]+1 : Math.max(dp[idx(i-1,j)], dp[idx(i,j-1)]);
  const ops = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i-1] === b[j-1]) { ops.unshift({t:'eq',v:a[i-1]}); i--; j--; }
    else if (j > 0 && (i === 0 || dp[idx(i,j-1)] >= dp[idx(i-1,j)])) { ops.unshift({t:'add',v:b[j-1]}); j--; }
    else { ops.unshift({t:'del',v:a[i-1]}); i--; }
  }
  let lHtml = '', rHtml = '';
  for (const op of ops) {
    const v = dEsc(op.v);
    if (op.t === 'eq')  { lHtml += v; rHtml += v; }
    else if (op.t === 'del') lHtml += `<mark class="diff-word-del">${v}</mark>`;
    else                     rHtml += `<mark class="diff-word-add">${v}</mark>`;
  }
  return [lHtml, rHtml];
}

// HTML-escape for diff output
function dEsc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function runDiffCheck() {
  const t1 = document.getElementById('diff-left')?.value  ?? '';
  const t2 = document.getElementById('diff-right')?.value ?? '';
  if (!t1.trim() && !t2.trim()) { showAiToast('Paste text into both panels first'); return; }

  const lines1 = t1.split('\n');
  const lines2 = t2.split('\n');

  if (lines1.length > 3000 || lines2.length > 3000) {
    showAiToast('Text is very long — results may be slow');
  }

  const hunks = computeLineDiff(lines1, lines2);

  let added = 0, removed = 0, modified = 0, equal = 0;
  let lHtmlAll = '', rHtmlAll = '';
  let lNum = 1, rNum = 1;

  for (const h of hunks) {
    if (h.t === 'eq') {
      const v = dEsc(h.l);
      lHtmlAll += `<div class="diff-line diff-eq"><span class="diff-ln">${lNum++}</span><span class="diff-ct">${v}</span></div>`;
      rHtmlAll += `<div class="diff-line diff-eq"><span class="diff-ln">${rNum++}</span><span class="diff-ct">${v}</span></div>`;
      equal++;
    } else if (h.t === 'del') {
      lHtmlAll += `<div class="diff-line diff-del"><span class="diff-ln">${lNum++}</span><span class="diff-ct">${dEsc(h.l)}</span></div>`;
      rHtmlAll += `<div class="diff-line diff-empty"><span class="diff-ln"></span><span class="diff-ct"></span></div>`;
      removed++;
    } else if (h.t === 'add') {
      lHtmlAll += `<div class="diff-line diff-empty"><span class="diff-ln"></span><span class="diff-ct"></span></div>`;
      rHtmlAll += `<div class="diff-line diff-add"><span class="diff-ln">${rNum++}</span><span class="diff-ct">${dEsc(h.r)}</span></div>`;
      added++;
    } else { // mod
      const [lW, rW] = computeWordDiff(h.l, h.r);
      lHtmlAll += `<div class="diff-line diff-mod-del"><span class="diff-ln">${lNum++}</span><span class="diff-ct">${lW}</span></div>`;
      rHtmlAll += `<div class="diff-line diff-mod-add"><span class="diff-ln">${rNum++}</span><span class="diff-ct">${rW}</span></div>`;
      modified++;
    }
  }

  document.getElementById('diff-panel-left').innerHTML  = lHtmlAll || '<div class="diff-empty-state">No content</div>';
  document.getElementById('diff-panel-right').innerHTML = rHtmlAll || '<div class="diff-empty-state">No content</div>';

  // Stats
  const noChange = added === 0 && removed === 0 && modified === 0;
  const statsEl = document.getElementById('diff-stats');
  statsEl.style.display = 'flex';
  statsEl.innerHTML = noChange
    ? `<span class="diff-stat diff-stat-eq">✓ No differences found — texts are identical</span>`
    : [
        added    ? `<span class="diff-stat diff-stat-add">+${added} added</span>` : '',
        removed  ? `<span class="diff-stat diff-stat-del">−${removed} removed</span>` : '',
        modified ? `<span class="diff-stat diff-stat-mod">~ ${modified} modified</span>` : '',
        `<span class="diff-stat diff-stat-eq">${equal} unchanged</span>`,
      ].filter(Boolean).join('');

  document.getElementById('diff-output').style.display = 'block';
  document.getElementById('diff-output').scrollIntoView({ behavior:'smooth', block:'start' });
}

function clearDiffOutput() {
  document.getElementById('diff-output').style.display = 'none';
  document.getElementById('diff-stats').style.display  = 'none';
}
function clearDiffSide(side) {
  document.getElementById(side === 'left' ? 'diff-left' : 'diff-right').value = '';
  clearDiffOutput();
}
function clearAllDiff() {
  document.getElementById('diff-left').value  = '';
  document.getElementById('diff-right').value = '';
  clearDiffOutput();
}

// ══════════════════════════════════════════════════════════════════
// DIFF MODE SWITCHER
// ══════════════════════════════════════════════════════════════════
function switchDiffMode(mode) {
  const textSection  = document.getElementById('diff-text-section');
  const imageSection = document.getElementById('diff-image-section');
  const btnText      = document.getElementById('diff-mode-text');
  const btnImage     = document.getElementById('diff-mode-image');
  if (!textSection || !imageSection) return;
  const isText = mode === 'text';
  textSection.style.display  = isText ? '' : 'none';
  imageSection.style.display = isText ? 'none' : '';
  btnText.classList.toggle('active',  isText);
  btnImage.classList.toggle('active', !isText);
}

// ══════════════════════════════════════════════════════════════════
// IMAGE COMPARE
// ══════════════════════════════════════════════════════════════════
const imgState = { left: null, right: null };

function imgDragOver(e) { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }

function imgDrop(e, side) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadImgFile(file, side);
}

function imgFileLoad(e, side) {
  const file = e.target.files[0];
  if (file) loadImgFile(file, side);
}

function loadImgFile(file, side) {
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      imgState[side] = img;
      const preview = document.getElementById('img-preview-' + side);
      if (preview) {
        preview.innerHTML = `<img src="${ev.target.result}" style="max-width:100%;max-height:200px;border-radius:8px;object-fit:contain">
          <div class="img-zone-label" style="margin-top:8px">${side === 'left' ? 'Original' : 'Modified'}</div>
          <div class="img-zone-sub" style="color:var(--sage)">${file.name} · ${img.width}×${img.height}</div>`;
      }
      // Auto-show actions when both images are loaded
      if (imgState.left && imgState.right) {
        const actions = document.getElementById('img-diff-actions');
        if (actions) actions.style.display = 'flex';
      }
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function runImageDiff() {
  const imgL = imgState.left, imgR = imgState.right;
  if (!imgL || !imgR) return;

  const W = Math.max(imgL.width,  imgR.width);
  const H = Math.max(imgL.height, imgR.height);

  // Draw both images onto offscreen canvases at common size
  function drawToCanvas(img) {
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    c.getContext('2d').drawImage(img, 0, 0, W, H);
    return c.getContext('2d').getImageData(0, 0, W, H);
  }
  const dataL = drawToCanvas(imgL);
  const dataR = drawToCanvas(imgR);

  // Compute diff
  const diffCanvas = document.getElementById('img-diff-canvas');
  diffCanvas.width  = W;
  diffCanvas.height = H;
  const ctx  = diffCanvas.getContext('2d');
  const out  = ctx.createImageData(W, H);
  const THRESHOLD = 20;
  let diffPixels = 0;
  const total = W * H;

  for (let i = 0; i < dataL.data.length; i += 4) {
    const dr = Math.abs(dataL.data[i]   - dataR.data[i]);
    const dg = Math.abs(dataL.data[i+1] - dataR.data[i+1]);
    const db = Math.abs(dataL.data[i+2] - dataR.data[i+2]);
    const diff = (dr + dg + db) / 3;
    if (diff > THRESHOLD) {
      // Highlight in accent orange
      out.data[i]   = 228;
      out.data[i+1] = 87;
      out.data[i+2] = 46;
      out.data[i+3] = Math.min(255, 80 + diff * 1.5);
      diffPixels++;
    } else {
      // Greyscale of original
      const g = Math.round((dataL.data[i] * 0.299 + dataL.data[i+1] * 0.587 + dataL.data[i+2] * 0.114) * 0.35);
      out.data[i] = out.data[i+1] = out.data[i+2] = g;
      out.data[i+3] = dataL.data[i+3];
    }
  }
  ctx.putImageData(out, 0, 0);

  const pct = ((total - diffPixels) / total * 100).toFixed(1);
  const diffPct = (diffPixels / total * 100).toFixed(1);

  // Populate side-by-side and slider
  const srcL = imgL.src, srcR = imgR.src;
  ['img-result-left','img-slider-left'].forEach(id => { const el = document.getElementById(id); if (el) el.src = srcL; });
  ['img-result-right','img-slider-right'].forEach(id => { const el = document.getElementById(id); if (el) el.src = srcR; });

  // Stats
  const statsEl = document.getElementById('img-diff-stats');
  if (statsEl) {
    statsEl.innerHTML = `
      <span class="diff-stat-item match"><strong>${pct}%</strong> identical pixels</span>
      <span class="diff-stat-item del"><strong>${diffPct}%</strong> changed pixels</span>
      <span class="diff-stat-item">${W}×${H} · ${diffPixels.toLocaleString()} of ${total.toLocaleString()} pixels differ</span>`;
    statsEl.style.display = 'flex';
  }

  document.getElementById('img-diff-result').style.display = 'block';
  setImgView('side');
  initSlider();
}

function setImgView(view) {
  ['side','slider','diff'].forEach(v => {
    const btn   = document.getElementById('img-view-' + v);
    const panel = document.getElementById('img-view-' + v + '-panel');
    const active = v === view;
    if (btn)   btn.classList.toggle('active', active);
    if (panel) panel.style.display = active ? '' : 'none';
  });
}

function clearImageDiff() {
  imgState.left = imgState.right = null;
  ['left','right'].forEach(side => {
    const preview = document.getElementById('img-preview-' + side);
    if (preview) preview.innerHTML = `
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" style="width:40px;height:40px;opacity:0.3"><rect x="4" y="8" width="40" height="32" rx="3"/><polyline points="4,32 16,20 24,28 32,18 44,32"/><circle cx="16" cy="18" r="4"/></svg>
      <div class="img-zone-label">${side === 'left' ? 'Original' : 'Modified'}</div>
      <div class="img-zone-sub">Click or drag an image here</div>`;
    const input = document.getElementById('img-input-' + side);
    if (input) input.value = '';
  });
  const actions = document.getElementById('img-diff-actions');
  if (actions) actions.style.display = 'none';
  const result = document.getElementById('img-diff-result');
  if (result) result.style.display = 'none';
}

// Swipe slider drag
function initSlider() {
  const container = document.getElementById('img-slider-container');
  const handle    = document.getElementById('img-slider-handle');
  const overlay   = document.getElementById('img-slider-overlay');
  if (!container || !handle || !overlay) return;

  function setPos(x) {
    const rect = container.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
    handle.style.left  = (pct * 100) + '%';
    overlay.style.width = (pct * 100) + '%';
  }

  setPos(container.getBoundingClientRect().left + container.getBoundingClientRect().width / 2);

  let dragging = false;
  handle.addEventListener('mousedown',  e => { dragging = true; e.preventDefault(); });
  handle.addEventListener('touchstart', e => { dragging = true; e.preventDefault(); }, { passive: false });
  document.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
  document.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
  document.addEventListener('mouseup',  () => dragging = false);
  document.addEventListener('touchend', () => dragging = false);
  container.addEventListener('click', e => setPos(e.clientX));
}

// ══════════════════════════════════════════════════════════════════
// RIGHT-SIDE DRAWERS — 90-Day Tracker + Mistakes Log
// ══════════════════════════════════════════════════════════════════

// ── Helpers ─────────────────────────────────────────────────────
function closeAllDrawers() {
  ['nd-drawer','ml-drawer','notes-drawer'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
  });
  ['nd-drawer-tab','ml-drawer-tab','notes-toggle-btn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
}

// ── 90-Day Tracker Drawer ────────────────────────────────────────
let ndActiveTab = 'wins';

function openNdDrawer() {
  closeAllDrawers();
  const drawer = document.getElementById('nd-drawer');
  const btn    = document.getElementById('nd-drawer-tab');
  if (!drawer) return;
  drawer.classList.add('open');
  if (btn) btn.classList.add('active');
  renderNinetyDays();
  switchNdTab(ndActiveTab);
}

function toggleNdDrawer() {
  const drawer = document.getElementById('nd-drawer');
  if (!drawer) return;
  if (drawer.classList.contains('open')) { closeAllDrawers(); }
  else { openNdDrawer(); }
}

function switchNdTab(tab) {
  ndActiveTab = tab;
  document.querySelectorAll('.nd-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.ndtab === tab);
  });
  const inp = document.getElementById('nd-drawer-input');
  const placeholders = {
    wins: 'Add a win…',
    skills: 'Add a skill learned…',
    feedback: 'Add feedback received…',
    unclear: 'Something still unclear…',
  };
  if (inp) inp.placeholder = placeholders[tab] || 'Add entry…';
  renderNdDrawerList();
}

function renderNdDrawerList() {
  const nd   = loadND();
  const list = nd[ndActiveTab] || [];
  const el   = document.getElementById('nd-active-list');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<div class="nd-drawer-empty">Nothing here yet — add your first entry above.</div>';
    return;
  }
  el.innerHTML = list.map((item, i) => `
    <div class="nd-drawer-entry">
      <div class="nd-drawer-entry-text">${escapeHtml(item.text)}</div>
      <div class="nd-drawer-entry-meta">
        <span>${new Date(item.date).toLocaleDateString('en-AU',{day:'numeric',month:'short'})}</span>
        <button class="nd-drawer-del" onclick="deleteNdDrawerEntry(${i})" title="Delete">
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/></svg>
        </button>
      </div>
    </div>`).join('');
}

function addNdDrawerEntry() {
  const inp  = document.getElementById('nd-drawer-input');
  const text = inp?.value?.trim();
  if (!text) return;
  const nd = loadND();
  if (!nd[ndActiveTab]) nd[ndActiveTab] = [];
  nd[ndActiveTab].unshift({ text, date: new Date().toISOString() });
  saveND(nd);
  if (inp) inp.value = '';
  renderNdDrawerList();
  renderNdStats();
}

function deleteNdDrawerEntry(idx) {
  const nd = loadND();
  nd[ndActiveTab].splice(idx, 1);
  saveND(nd);
  renderNdDrawerList();
  renderNdStats();
}

// ── Mistakes Log Drawer ──────────────────────────────────────────
let mlActiveTab = 'personal';

function openMlDrawer() {
  closeAllDrawers();
  const drawer = document.getElementById('ml-drawer');
  const btn    = document.getElementById('ml-drawer-tab');
  if (!drawer) return;
  drawer.classList.add('open');
  if (btn) btn.classList.add('active');
  switchMlTab(mlActiveTab);
}

function toggleMlDrawer() {
  const drawer = document.getElementById('ml-drawer');
  if (!drawer) return;
  if (drawer.classList.contains('open')) { closeAllDrawers(); }
  else { openMlDrawer(); }
}

function switchMlTab(tab) {
  mlActiveTab = tab;
  document.querySelectorAll('[data-mltab]').forEach(t => {
    t.classList.toggle('active', t.dataset.mltab === tab);
  });
  const form = document.getElementById('ml-personal-form');
  const list = document.getElementById('ml-drawer-list');
  if (tab === 'personal') {
    if (form) form.style.display = 'block';
    renderMlPersonalList();
  } else {
    if (form) form.style.display = 'none';
    renderMlCommonList();
  }
}

function renderMlPersonalList() {
  const el   = document.getElementById('ml-drawer-list');
  if (!el) return;
  const list = loadPersonalMistakes();
  if (!list.length) {
    el.innerHTML = '<div class="nd-drawer-empty">No personal entries yet. Add your first above.</div>';
    return;
  }
  el.innerHTML = list.map((m, i) => `
    <div class="ml-drawer-entry">
      <div class="ml-entry-task">${escapeHtml(m.task)}</div>
      <div class="ml-entry-what">✗ ${escapeHtml(m.mistake)}</div>
      <div class="ml-entry-fix">→ ${escapeHtml(m.fix)}</div>
      <button class="nd-drawer-del" onclick="deleteMlDrawerEntry(${i})" style="margin-top:6px" title="Delete">
        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/></svg>
      </button>
    </div>`).join('');
}

function renderMlCommonList() {
  const el = document.getElementById('ml-drawer-list');
  if (!el) return;
  el.innerHTML = PRELOADED_MISTAKES.map((m, i) => `
    <div class="ml-drawer-entry">
      <div class="ml-entry-num">#${i+1} · ${m.task}</div>
      <div class="ml-entry-what">✗ ${m.what}</div>
      <div class="ml-entry-fix">→ ${m.fix}</div>
    </div>`).join('');
}

function deleteMlDrawerEntry(idx) {
  const list = loadPersonalMistakes();
  list.splice(idx, 1);
  savePersonalMistakes(list);
  renderMlPersonalList();
  renderPersonalMistakes(); // sync main page if ever visible
}

function addMistake() {
  const task    = document.getElementById('ml-what')?.value?.trim();
  const mistake = document.getElementById('ml-mistake')?.value?.trim();
  const fix     = document.getElementById('ml-fix')?.value?.trim();
  if (!task || !mistake || !fix) return;
  const list = loadPersonalMistakes();
  list.unshift({ task, mistake, fix, date: new Date().toISOString() });
  savePersonalMistakes(list);
  ['ml-what','ml-mistake','ml-fix'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  renderMlPersonalList();
}

// ── Notes Drawer (override toggle to close others) ───────────────
function toggleNotesDrawer() {
  const drawer = document.getElementById('notes-drawer');
  const btn    = document.getElementById('notes-toggle-btn');
  if (!drawer) return;
  if (drawer.classList.contains('open')) {
    closeAllDrawers();
  } else {
    closeAllDrawers();
    drawer.classList.add('open');
    if (btn) btn.classList.add('active');
    renderNotesList();
  }
}


// ── INIT ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  checkDailyReset();
  updateDateTime();
  setInterval(updateDateTime, 10000);
  renderTemplates();

  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => navigate(item.dataset.page));
  });

  // Reflect saved API key state in sidebar label
  if (getAiKey()) {
    const link = document.getElementById('ai-key-toggle-label');
    if (link) link.textContent = 'AI Settings ✓';
  }
  renderAiMeter();

  navigate('daily');
});

// ── EDM REPORTING ────────────────────────────────────────────────
const EDM_REPORT_KEY   = 'msc_edm_report_v1';
const EDM_SAVES_KEY    = 'msc_edm_report_saves';

function loadEdmReportData() {
  try {
    const d = JSON.parse(localStorage.getItem(EDM_REPORT_KEY));
    if (d && d.entries) {
      if (!d.start_month) d.start_month = d.month || new Date().toISOString().slice(0, 7);
      if (!d.end_month)   d.end_month   = '';
      return d;
    }
  } catch {}
  return { start_month: new Date().toISOString().slice(0, 7), end_month: '', entries: [] };
}

function computeMonthLabel(d) {
  function fmt(ym) {
    if (!ym) return '';
    const [y, m] = ym.split('-');
    return new Date(+y, +m - 1, 1).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
  }
  if (d.end_month && d.end_month !== d.start_month) {
    return fmt(d.start_month) + ' – ' + fmt(d.end_month);
  }
  return fmt(d.start_month);
}

// ── Snapshots ────────────────────────────────────────────────────
function listEdmSnapshots() {
  try { return JSON.parse(localStorage.getItem(EDM_SAVES_KEY)) || []; } catch { return []; }
}

function saveEdmSnapshot() {
  const name = prompt('Save report as:');
  if (!name || !name.trim()) return;
  const d    = loadEdmReportData();
  const id   = 'snap_' + Date.now();
  const list = listEdmSnapshots();
  list.push({ id, name: name.trim(), savedAt: new Date().toISOString() });
  localStorage.setItem(EDM_SAVES_KEY, JSON.stringify(list));
  localStorage.setItem('msc_edm_report_save_' + id, JSON.stringify(d));
  renderEdmSnapshotPanel();
  showAiToast('✓ Report saved as "' + name.trim() + '"');
}

function loadEdmSnapshot(id) {
  if (!confirm('Load this save? Unsaved changes to the current report will be replaced.')) return;
  try {
    const d = JSON.parse(localStorage.getItem('msc_edm_report_save_' + id));
    if (d && d.entries) {
      saveEdmReportData(d);
      renderEdmReportPage();
    }
  } catch { showAiToast('Could not load save.'); }
}

function deleteEdmSnapshot(id) {
  if (!confirm('Delete this saved report?')) return;
  const list = listEdmSnapshots().filter(s => s.id !== id);
  localStorage.setItem(EDM_SAVES_KEY, JSON.stringify(list));
  localStorage.removeItem('msc_edm_report_save_' + id);
  renderEdmSnapshotPanel();
}

function renderEdmSnapshotPanel() {
  const el = document.getElementById('edr-snapshot-panel');
  if (!el) return;
  const list = listEdmSnapshots();
  if (!list.length) {
    el.innerHTML = '<span class="edr-snap-empty">No saved reports</span>';
    return;
  }
  el.innerHTML = list.slice().reverse().map(s => {
    const dt = new Date(s.savedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
    return `<div class="edr-snap-row">
      <div class="edr-snap-info">
        <span class="edr-snap-name">${escapeHtml(s.name)}</span>
        <span class="edr-snap-date">${dt}</span>
      </div>
      <div class="edr-snap-actions">
        <button class="edr-snap-load-btn" onclick="loadEdmSnapshot('${s.id}')">Load</button>
        <button class="edr-snap-del-btn" onclick="deleteEdmSnapshot('${s.id}')">✕</button>
      </div>
    </div>`;
  }).join('');
}

function computeEdmMonthlyAverages(entries) {
  const fields = [
    { src: 'html_open_rate',      dst: 'avg_html_open_rate' },
    { src: 'unique_ctr',          dst: 'avg_unique_ctr' },
    { src: 'click_to_open_ratio', dst: 'avg_click_to_open' },
  ];
  const result = {};
  fields.forEach(({ src, dst }) => {
    const vals = entries.map(e => parseFloat(e[src])).filter(v => !isNaN(v));
    result[dst] = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : '';
  });
  return result;
}

function saveEdmReportData(d) {
  localStorage.setItem(EDM_REPORT_KEY, JSON.stringify(d));
}

function addEdmReportEntry() {
  const d = loadEdmReportData();
  d.entries.push({
    id: 'edr_' + Date.now(),
    email_name: '', report_link: '', subject: '', started_at: '',
    html_open_rate: '', click_to_open_ratio: '',
    total_delivered: '', total_clicks: '', total_ctr: '',
    unique_clicks: '', unique_ctr: '',
    total_opt_outs: '', opt_out_rate: '',
    total_spam: '', spam_rate: '',
    read_rate: '', skim_rate: '',
    click_map_image: null, click_map_html: null, click_map_tab: 'image', open: true,
  });
  saveEdmReportData(d);
  renderEdmReportEntries();
  updateEdmReportPreview();
}

function deleteEdmReportEntry(id) {
  const d = loadEdmReportData();
  d.entries = d.entries.filter(e => e.id !== id);
  saveEdmReportData(d);
  renderEdmReportEntries();
  updateEdmReportPreview();
}

function toggleEdmReportEntry(id) {
  const d = loadEdmReportData();
  const e = d.entries.find(e => e.id === id);
  if (e) { e.open = !e.open; saveEdmReportData(d); }
  const card = document.getElementById('edr-card-' + id);
  if (card) card.classList.toggle('open', !!e?.open);
}

function saveEdmReportField(id, field, value) {
  const pctFields = ['html_open_rate','click_to_open_ratio','total_ctr','unique_ctr','opt_out_rate','spam_rate','read_rate','skim_rate'];
  if (pctFields.includes(field)) value = value.replace(/%/g, '').trim();
  const d = loadEdmReportData();
  const e = d.entries.find(e => e.id === id);
  if (e) e[field] = value;
  saveEdmReportData(d);
  updateEdmReportPreview();
}

function saveEdmReportStartMonth(value) {
  const d = loadEdmReportData();
  d.start_month = value;
  if (d.end_month && d.end_month < value) d.end_month = '';
  saveEdmReportData(d);
  const em = document.getElementById('edr-end-month');
  if (em) { em.min = value; if (d.end_month === '') em.value = ''; }
  updateEdmReportPreview();
}

function saveEdmReportEndMonth(value) {
  const d = loadEdmReportData();
  d.end_month = value;
  saveEdmReportData(d);
  updateEdmReportPreview();
}

function toggleEdmSpan(checked) {
  const endRow = document.getElementById('edr-end-month-row');
  if (endRow) endRow.style.display = checked ? 'flex' : 'none';
  if (!checked) {
    const d = loadEdmReportData();
    d.end_month = '';
    saveEdmReportData(d);
    const em = document.getElementById('edr-end-month');
    if (em) em.value = '';
    updateEdmReportPreview();
  }
}


function clearEdmReport() {
  if (!confirm('Clear all eDM report data? This cannot be undone — save first if needed.')) return;
  saveEdmReportData({ start_month: new Date().toISOString().slice(0, 7), end_month: '', entries: [] });
  renderEdmReportPage();
}

function handleEdmClickMap(id, file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const d = loadEdmReportData();
    const entry = d.entries.find(e => e.id === id);
    if (entry) {
      entry.click_map_image = ev.target.result;
      saveEdmReportData(d);
    }
    const zone = document.getElementById('edr-clickmap-zone-' + id);
    if (zone) {
      zone.innerHTML = `<img src="${ev.target.result}" alt="Click map" class="edr-clickmap-preview"/>
        <button class="edr-remove-img-btn" onclick="event.stopPropagation();removeEdmClickMap('${id}')">Remove</button>`;
    }
    updateEdmReportPreview();
  };
  reader.readAsDataURL(file);
}

function removeEdmClickMap(id) {
  const d = loadEdmReportData();
  const e = d.entries.find(e => e.id === id);
  if (e) { e.click_map_image = null; saveEdmReportData(d); }
  const zone = document.getElementById('edr-clickmap-zone-' + id);
  if (zone) zone.innerHTML = edrClickMapPrompt(id);
  updateEdmReportPreview();
}

function saveEdmClickMapHtml(id, html) {
  const d = loadEdmReportData();
  const e = d.entries.find(e => e.id === id);
  if (!e) return;
  e.click_map_html = html.trim() || null;
  saveEdmReportData(d);
  const has = !!e.click_map_html;
  const badge = document.getElementById('edr-html-badge-' + id);
  if (badge) badge.style.display = has ? 'inline-flex' : 'none';
  const btn = document.getElementById('edr-preview-btn-' + id);
  if (btn) btn.disabled = !has;
  const previewBox = document.getElementById('edr-html-preview-box-' + id);
  if (previewBox) previewBox.style.display = has ? 'block' : 'none';
  const previewIframe = document.getElementById('edr-html-preview-iframe-' + id);
  if (previewIframe && e.click_map_html) previewIframe.srcdoc = e.click_map_html;
  updateEdmReportPreview();
}

function openEdmHtmlPreview(id) {
  const d = loadEdmReportData();
  const e = d.entries.find(e => e.id === id);
  if (!e || !e.click_map_html) return;
  const w = window.open('', '_blank', 'width=800,height=900');
  w.document.open();
  w.document.write(e.click_map_html);
  w.document.close();
}

function printEdmReport() {
  const d = loadEdmReportData();
  if (!d.entries.length) return;

  const monthLabel = computeMonthLabel(d);
  const mo = computeEdmMonthlyAverages(d.entries);

  function statVal(v) { return v ? escapeHtml(String(v)) : '—'; }

  function fmtStatValHtml(val) {
    let str = String(val);
    const numPart = str.replace(/%$/, '');
    const n = Number(numPart.replace(/,/g, ''));
    if (!isNaN(n) && str.indexOf('/') === -1) {
      str = n.toLocaleString('en-AU') + (str.endsWith('%') ? '%' : '');
    }
    const S = `style="font-size:19pt"`;
    // Has decimal — everything from the dot onwards is small (covers ".78%" case)
    const dotIdx = str.indexOf('.');
    if (dotIdx !== -1) {
      return escapeHtml(str.slice(0, dotIdx)) + `<span ${S}>${escapeHtml(str.slice(dotIdx))}</span>`;
    }
    // No decimal but ends with % — reduce % sign only
    if (str.endsWith('%')) {
      return escapeHtml(str.slice(0, -1)) + `<span ${S}>%</span>`;
    }
    return escapeHtml(str);
  }

  function statGroup(color, label, stats) {
    const cells = stats.filter(s => s[1]).map(([lbl, val]) =>
      `<div class="stat"><div class="stat-val" style="color:${color}">${fmtStatValHtml(val)}</div><div class="stat-lbl">${lbl}</div></div>`
    ).join('');
    if (!cells) return '';
    return `<div class="stat-group" style="--gc:${color}">
      <div class="stat-group-label">${label}</div>
      <div class="stats-grid">${cells}</div>
    </div>`;
  }

  // Title page (with monthly averages)
  const now = new Date();
  const titleDate = now.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
  const titlePage = `<div class="page page-title">
    <div class="title-pg-inner">
      <div class="title-pg-label">eDM Performance Report</div>
      <div class="title-pg-month">${escapeHtml(monthLabel || titleDate)}</div>
      <div class="title-pg-date">Generated ${escapeHtml(titleDate)}</div>
      <div class="title-pg-rule"></div>
      <div class="title-pg-count">${d.entries.length} eDM${d.entries.length !== 1 ? 's' : ''} reviewed</div>
      <div class="cover-avgs">
        <div class="cover-avgs-title">Monthly Averages${monthLabel ? ' — ' + escapeHtml(monthLabel) : ''}</div>
        <div class="cover-avgs-grid">
          <div class="cover-avg"><div class="cover-avg-val">${mo.avg_html_open_rate ? mo.avg_html_open_rate + '%' : '—'}</div><div class="cover-avg-lbl">Avg HTML Open Rate</div></div>
          <div class="cover-avg"><div class="cover-avg-val">${mo.avg_unique_ctr ? mo.avg_unique_ctr + '%' : '—'}</div><div class="cover-avg-lbl">Avg Unique CTR</div></div>
          <div class="cover-avg"><div class="cover-avg-val">${mo.avg_click_to_open ? mo.avg_click_to_open + '%' : '—'}</div><div class="cover-avg-lbl">Avg Click-to-Open</div></div>
        </div>
      </div>
    </div>
  </div>`;

  const pages = d.entries.map((e, i) => {
    const name = e.email_name || `Email ${i + 1}`;

    const imgCol = e.click_map_image
      ? `<img src="${e.click_map_image}" style="width:100%;height:auto;max-height:9in;object-fit:contain;object-position:top left;display:block;">`
      : e.click_map_html
      ? `<div style="width:700px;zoom:0.42;transform-origin:top left;background:#fff;">${e.click_map_html}</div>`
      : `<div style="border:1.5px dashed #ddd;border-radius:5px;height:200px;display:flex;align-items:center;justify-content:center;color:#aaa;font-size:11px;">No click map</div>`;

    const hasClicks = e.total_clicks || e.unique_clicks || e.total_ctr || e.unique_ctr || e.read_rate || e.skim_rate;

    const statsCol = [
      statGroup('#E4572E', 'Key Metrics', [
        ['HTML Open Rate', e.html_open_rate ? e.html_open_rate + '%' : ''],
        ['Click-to-Open Ratio', e.click_to_open_ratio ? e.click_to_open_ratio + '%' : ''],
      ]),
      statGroup('#404040', 'Volume', [
        ['Total Delivered', e.total_delivered],
        ['Unique Opens', e.unique_opens],
      ]),
      hasClicks ? statGroup('#333333', 'Clicks', [
        ['Total Clicks', e.total_clicks],
        ['Total CTR', e.total_ctr ? e.total_ctr + '%' : ''],
        ['Unique Clicks', e.unique_clicks],
        ['Unique CTR', e.unique_ctr ? e.unique_ctr + '%' : ''],
        ['Read Rate', e.read_rate ? e.read_rate + '%' : ''],
        ['Skim Rate', e.skim_rate ? e.skim_rate + '%' : ''],
      ]) : '',
      statGroup('#292929', 'Opt-outs & Spam', [
        ['Total Opt-outs', e.total_opt_outs],
        ['Opt-out Rate', e.opt_out_rate ? e.opt_out_rate + '%' : ''],
        ['Total Spam', e.total_spam],
        ['Spam Rate', e.spam_rate ? e.spam_rate + '%' : ''],
      ]),
    ].filter(Boolean).join('');

    return `<div class="page">
      <div class="page-header">
        <div class="page-meta">
          <span class="page-num">${String(i + 1).padStart(2, '0')}</span>
          <div>
            <div class="page-name">${e.report_link ? `<a href="${escapeHtml(e.report_link)}" style="color:inherit;text-decoration:underline;text-decoration-color:#E4572E;text-underline-offset:3px">${escapeHtml(name)}</a>` : escapeHtml(name)}</div>
            ${e.subject ? `<div class="page-sub"><span class="page-field-lbl">Subject:</span> ${escapeHtml(e.subject)}</div>` : ''}
          </div>
        </div>
        ${e.started_at ? `<div class="page-date-block"><div class="page-date-lbl">Started date</div><div class="page-date-val">${edrDate(e.started_at)}</div></div>` : ''}
      </div>
      <div class="page-body">
        <div class="img-col">${imgCol}</div>
        <div class="stats-col">${statsCol}</div>
      </div>
    </div>`;
  });


  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>eDM Report${monthLabel ? ' — ' + monthLabel : ''}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
<style>
@page { size: A4 portrait; margin: 0.75in 0.5in 0.35in 0.5in; }
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',system-ui,sans-serif;color:#191919;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;font-size:12px}
.page{min-height:calc(297mm - 1.1in);page-break-after:always;display:flex;flex-direction:column;gap:32px}
.page:last-child{page-break-after:avoid}
.page-header{display:flex;align-items:flex-start;justify-content:space-between;padding-bottom:10px;border-bottom:1px solid #e8e8e4}
.page-meta{display:flex;align-items:flex-start;gap:10px}
.page-num{font-size:11px;font-weight:700;color:#fff;background:#E4572E;border-radius:4px;padding:2px 7px;flex-shrink:0;margin-top:3px;letter-spacing:0.04em}
.page-name{font-family:'Playfair Display',Georgia,serif;font-size:19px;font-weight:700;color:#191919;line-height:1.2;margin-bottom:2mm}
.page-sub{font-size:12px;color:#888;margin-top:0;line-height:1.5}
.page-field-lbl{font-weight:600;color:#555}
.page-date-block{text-align:right;flex-shrink:0}
.page-date-lbl{font-size:8pt;font-weight:600;color:#888;letter-spacing:0.04em;text-transform:uppercase;line-height:1.3}
.page-date-val{font-size:11px;color:#aaa;line-height:1.4}
.page-body{display:grid;grid-template-columns:42% 1fr;gap:36px;align-items:start;flex:1}
.img-col{overflow:hidden;max-height:calc(297mm - 1.8in)}
.stats-col{display:flex;flex-direction:column;gap:44px}
.stat-group{display:flex;flex-direction:column;gap:6px}
.stat-group-label{font-size:10pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--gc);border-bottom:1px solid var(--gc);padding-bottom:3px;margin-bottom:2px}
.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.stat{display:flex;flex-direction:column;gap:2px}
.stat-val{font-size:25pt;font-weight:700;letter-spacing:-0.03em;line-height:1}
.stat-lbl{font-size:8pt;color:#888}
.page-monthly{min-height:auto}
.mo-badge{background:#E4572E}
.mo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding:24px 0}
.mo-stat{display:flex;flex-direction:column;gap:4px;border-left:3px solid #E4572E;padding-left:12px}
.mo-val{font-size:32px;font-weight:700;color:#E4572E;letter-spacing:-0.04em}
.mo-lbl{font-size:9px;color:#888;text-transform:uppercase;letter-spacing:0.08em}
.mo-count{font-size:10px;color:#aaa}
.page-title{display:flex;align-items:flex-start;justify-content:flex-start;min-height:calc(297mm - 1in);padding-top:1.4in;position:relative}
.title-pg-inner{display:flex;flex-direction:column;align-items:flex-start;gap:6px;width:100%}
.title-pg-label{font-size:22px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#E4572E}
.title-pg-month{font-family:'Playfair Display',Georgia,serif;font-size:64px;font-weight:700;color:#191919;line-height:1.05;margin-top:6px}
.title-pg-date{font-size:11px;color:#aaa;margin-top:2px}
.title-pg-rule{width:48px;height:3px;background:#E4572E;margin:18px 0 12px}
.title-pg-count{font-size:12px;color:#666}
.delivery-grid{grid-template-columns:repeat(2,1fr)}
.page-footer{position:fixed;bottom:0.12in;left:0;right:0;border-top:1px solid #e8e8e4}
.page-footer-inner{padding:5px 0.5in 0;font-size:8pt;color:#bbb;letter-spacing:0.03em}
.cover-avgs{width:100%;margin-top:auto;padding-top:28px;border-top:1px solid #e8e8e4;position:absolute;bottom:0.5in;left:0.5in;right:0.5in}
.cover-avgs-title{font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#aaa;margin-bottom:14px}
.cover-avgs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.cover-avg{display:flex;flex-direction:column;gap:5px;border-left:3px solid #E4572E;padding-left:14px}
.cover-avg-val{font-size:26pt;font-weight:700;color:#E4572E;letter-spacing:-0.04em;line-height:1}
.cover-avg-lbl{font-size:8pt;color:#888;text-transform:uppercase;letter-spacing:0.06em}
</style>
</head>
<body>
<div class="page-footer"><div class="page-footer-inner">eDM Performance Report${monthLabel ? ' | ' + escapeHtml(monthLabel) : ''}</div></div>
${titlePage}
${pages.join('\n')}
<script>window.onload=function(){window.print();}<\/script>
</body>
</html>`;

  const w = window.open('', '_blank');
  w.document.open();
  w.document.write(html);
  w.document.close();
}

function switchEdmClickMapTab(id, tab) {
  const imgPanel = document.getElementById('edr-cmap-img-' + id);
  const htmlPanel = document.getElementById('edr-cmap-html-' + id);
  if (imgPanel)  imgPanel.style.display  = tab === 'image' ? 'flex' : 'none';
  if (htmlPanel) htmlPanel.style.display = tab === 'html'  ? 'block' : 'none';
  document.querySelectorAll(`[data-cmap-for="${id}"]`).forEach(btn =>
    btn.classList.toggle('active', btn.dataset.cmapTab === tab));
  const d = loadEdmReportData();
  const e = d.entries.find(e => e.id === id);
  if (e) { e.click_map_tab = tab; saveEdmReportData(d); }
}

function edrClickMapPrompt(id) {
  return `<input type="file" id="edr-file-${id}" accept=".png,.jpg,.jpeg,.webp" style="display:none"
    onchange="handleEdmClickMap('${id}',this.files[0])"/>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:22px;height:22px;opacity:0.35"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
  <span class="edr-upload-text">Upload click map screenshot</span>
  <span class="edr-upload-hint">.png · .jpg · .webp</span>`;
}

function edrPct(v) { return (v === '' || v == null) ? '—' : v + '%'; }
function edrNum(v) { return (v === '' || v == null) ? '—' : Number(v).toLocaleString(); }
function edrDate(v) {
  if (!v) return '—';
  const d = new Date(v);
  if (!isNaN(d.getTime())) return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
  return v;
}

// ── Paste parser ────────────────────────────────────────────────
const EDR_FIELD_MAP = {
  'Subject':                    { key: 'subject',           type: 'text' },
  'Campaign':                   { key: 'campaign',          type: 'text' },
  'Started At':                 { key: 'started_at',        type: 'date' },
  'Sent To':                    { key: 'sent_to',           type: 'text' },
  'Total Sent':                 { key: 'total_sent',        type: 'num'  },
  'Total Delivered':            { key: 'total_delivered',   type: 'num'  },
  'Total Bounced':              { key: 'total_bounced',     type: 'text' },
  'Delivery Rate':              { key: 'delivery_rate',     type: 'pct'  },
  'Total HTML Opens':           { key: 'total_html_opens',  type: 'num'  },
  'Unique HTML Opens':          { key: 'unique_html_opens', type: 'num'  },
  'HTML Open Rate':             { key: 'html_open_rate',    type: 'pct'  },
  'Total Clicks':               { key: 'total_clicks',      type: 'num'  },
  'Total Click Through Rate':   { key: 'total_ctr',         type: 'pct'  },
  'Unique Clicks':              { key: 'unique_clicks',     type: 'num'  },
  'Unique Click Through Rate':  { key: 'unique_ctr',        type: 'pct'  },
  'Click to Open Ratio':        { key: 'click_to_open_ratio', type: 'pct' },
  'Total Opt Outs':             { key: 'total_opt_outs',    type: 'num'  },
  'Opt Out Rate':               { key: 'opt_out_rate',      type: 'pct'  },
  'Total Spam Complaints':      { key: 'total_spam',        type: 'num'  },
  'Spam Complaint Rate':        { key: 'spam_rate',         type: 'pct'  },
};

function parseEdmPaste(text) {
  const result = {};
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const tabIdx = line.indexOf('\t');
    if (tabIdx === -1) continue;
    const label = line.slice(0, tabIdx).trim();
    let value   = line.slice(tabIdx + 1).trim();
    const def   = EDR_FIELD_MAP[label];
    if (!def || !value) continue;
    if (def.type === 'pct') value = value.replace(/%/g, '').trim();
    if (def.type === 'num') value = value.replace(/,/g, '').trim();
    if (def.type === 'date') {
      // e.g. "Jun 11, 2026 8:30 AM" → "11 Jun 2026"
      const d = new Date(value);
      if (!isNaN(d.getTime())) value = d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    result[def.key] = value;
  }
  return result;
}

function applyEdmParse(entryId) {
  const ta = document.getElementById('edr-paste-' + entryId);
  if (!ta) return;
  const parsed = parseEdmPaste(ta.value);
  const d = loadEdmReportData();
  const entry = d.entries.find(e => e.id === entryId);
  if (!entry) return;
  Object.assign(entry, parsed);
  entry.raw_paste = ta.value;
  saveEdmReportData(d);
  renderEdmReportEntries();
  updateEdmReportPreview();
  showAiToast('✓ Parsed — ' + Object.keys(parsed).length + ' fields extracted');
}

function edrStat(val, label) {
  return `<div class="edr-stat">
    <div class="edr-stat-val">${val}</div>
    <hr class="edr-stat-sep"/>
    <div class="edr-stat-lbl">${label}</div>
  </div>`;
}

function buildEdmReportHtml(d) {
  if (!d.entries.length) {
    return `<div class="edr-preview-empty">
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2" style="width:38px;height:38px;opacity:0.18"><path d="M6 40V12a2 2 0 012-2h32a2 2 0 012 2v28l-8-4-8 4-8-4-8 4z"/><line x1="14" y1="20" x2="34" y2="20"/><line x1="14" y1="27" x2="26" y2="27"/></svg>
      <div style="font-size:12.5px;color:var(--text-3);margin-top:10px;line-height:1.5">Paste Salesforce data and click Parse —<br>the report generates here automatically.</div>
    </div>`;
  }
  const monthLabel = computeMonthLabel(d);
  let html = `<div class="edr-report-doc">
    <div class="edr-report-doc-title">eDM Performance Report${monthLabel ? ' · ' + monthLabel : ''}</div>`;

  d.entries.forEach((e, i) => {
    const name = e.email_name || `Email ${i + 1}`;
    html += `<div class="edr-report-block">
      <div class="edr-report-block-header">
        <div class="edr-report-block-meta">
          <span class="edr-report-block-num">${String(i + 1).padStart(2, '0')}</span>
          <div>
            <div class="edr-report-block-name">${e.report_link ? `<a href="${escapeHtml(e.report_link)}" target="_blank" class="edr-report-block-link">${escapeHtml(name)}</a>` : escapeHtml(name)}</div>
            ${e.subject   ? `<div class="edr-report-block-subject">${escapeHtml(e.subject)}</div>` : ''}
            ${e.campaign  ? `<div class="edr-report-block-campaign">Campaign: ${escapeHtml(e.campaign)}</div>` : ''}
          </div>
        </div>
        ${e.started_at ? `<div class="edr-report-block-date">${edrDate(e.started_at)}</div>` : ''}
      </div>

      <div class="edr-report-body">
        ${e.click_map_image
          ? `<div class="edr-report-img-col"><img src="${e.click_map_image}" alt="Click-Through Rate Map" class="edr-report-img"/></div>`
          : e.click_map_html
          ? `<div class="edr-report-img-col">
              <div class="edr-report-iframe-wrapper">
                <iframe class="edr-report-iframe" srcdoc="${escapeHtml(e.click_map_html)}" scrolling="no" sandbox="allow-same-origin" onload="(function(f){try{var h=f.contentDocument.body.scrollHeight;f.style.height=h+'px';var z=Math.min(0.52,600/h);f.style.zoom=z;f.parentElement.style.height=Math.ceil(h*z)+'px'}catch(e){}})(this)"></iframe>
              </div>
              <div class="edr-print-clone" data-entry-id="${e.id}"></div>
             </div>`
          : `<div class="edr-report-img-col edr-report-img-empty"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2" style="width:28px;height:28px;opacity:0.2"><rect x="2" y="5" width="28" height="22" rx="2"/><circle cx="10" cy="13" r="3"/><polyline points="2,27 10,18 16,24 22,16 30,27"/></svg><span style="font-size:10px;color:var(--text-3)">No click map provided</span></div>`}
        <div class="edr-report-stats-col">
          <div class="edr-stats-group" style="--sg-color:#E4572E">
            <div class="edr-stats-group-label">Key Metrics</div>
            <div class="edr-stats-grid">
              ${edrStat(edrPct(e.html_open_rate),      'HTML Open Rate')}
              ${edrStat(edrPct(e.unique_ctr),           'Unique CTR')}
              ${edrStat(edrPct(e.click_to_open_ratio),  'Click-to-Open')}
            </div>
          </div>
          <div class="edr-stats-group" style="--sg-color:#191919">
            <div class="edr-stats-group-label">Volume</div>
            <div class="edr-stats-grid">
              ${edrStat(edrNum(e.total_delivered),           'Delivered')}
              ${edrStat(edrNum(e.unique_html_opens || ''),   'Unique Opens')}
              ${edrStat(edrNum(e.unique_clicks),             'Unique Clicks')}
              ${edrStat(edrPct(e.total_ctr),                 'Total CTR')}
              ${edrStat(edrNum(e.total_clicks),              'Total Clicks')}
            </div>
          </div>
          ${e.read_rate || e.skim_rate ? `<div class="edr-stats-group" style="--sg-color:#404040">
            <div class="edr-stats-group-label">Interaction</div>
            <div class="edr-stats-grid">
              ${e.read_rate ? edrStat(edrPct(e.read_rate), 'Read Rate') : ''}
              ${e.skim_rate ? edrStat(edrPct(e.skim_rate), 'Skim Rate') : ''}
            </div>
          </div>` : ''}
          <div class="edr-stats-group" style="--sg-color:#292929">
            <div class="edr-stats-group-label">Opt-outs &amp; Spam</div>
            <div class="edr-stats-grid">
              ${edrStat(edrNum(e.total_opt_outs), 'Opt-outs')}
              ${edrStat(edrPct(e.opt_out_rate),   'Opt-out Rate')}
              ${edrStat(edrNum(e.total_spam),     'Spam')}
              ${edrStat(edrPct(e.spam_rate),      'Spam Rate')}
            </div>
          </div>
          ${e.delivery_rate || e.total_sent ? `<div class="edr-stats-group" style="--sg-color:#8c8a85">
            <div class="edr-stats-group-label">Delivery</div>
            <div class="edr-stats-grid">
              ${e.delivery_rate ? edrStat(edrPct(e.delivery_rate), 'Delivery Rate') : ''}
              ${e.total_sent    ? edrStat(edrNum(e.total_sent),    'Total Sent') : ''}
            </div>
            ${e.total_bounced ? `<div class="edr-delivery-bounced">
              <div class="edr-bounced-lbl">Bounced</div>
              <div class="edr-bounced-val">${escapeHtml(e.total_bounced)}</div>
            </div>` : ''}
          </div>` : ''}
        </div>
      </div>
    </div>`;
  });

  const mo = computeEdmMonthlyAverages(d.entries);
  if (mo.avg_html_open_rate || mo.avg_unique_ctr || mo.avg_click_to_open) {
    html += `<div class="edr-report-monthly">
      <div class="edr-report-monthly-label">Monthly Averages${monthLabel ? ' — ' + monthLabel : ''}</div>
      <div class="edr-stats-grid edr-stats-monthly" style="--sg-color:#E4572E">
        ${mo.avg_html_open_rate ? edrStat(edrPct(mo.avg_html_open_rate), 'Avg HTML Open Rate') : ''}
        ${mo.avg_unique_ctr     ? edrStat(edrPct(mo.avg_unique_ctr),     'Avg Unique CTR') : ''}
        ${mo.avg_click_to_open  ? edrStat(edrPct(mo.avg_click_to_open),  'Avg Click-to-Open') : ''}
      </div>
    </div>`;
  }

  html += '</div>';
  return html;
}

function updateEdmMonthlyDisplay() {
  const el = document.getElementById('edr-monthly-display');
  if (!el) return;
  const d = loadEdmReportData();
  const mo = computeEdmMonthlyAverages(d.entries);
  const count = d.entries.filter(e => parseFloat(e.html_open_rate) >= 0).length;
  if (!count) {
    el.innerHTML = `<div class="edr-monthly-empty">Add and parse eDM entries — averages appear here automatically</div>`;
    return;
  }
  el.innerHTML = `
    <div class="edr-monthly-stats">
      <div class="edr-monthly-stat">
        <div class="edr-monthly-val">${mo.avg_html_open_rate ? mo.avg_html_open_rate + '%' : '—'}</div>
        <div class="edr-monthly-lbl">Avg HTML Open Rate</div>
      </div>
      <div class="edr-monthly-stat">
        <div class="edr-monthly-val">${mo.avg_unique_ctr ? mo.avg_unique_ctr + '%' : '—'}</div>
        <div class="edr-monthly-lbl">Avg Unique CTR</div>
      </div>
      <div class="edr-monthly-stat">
        <div class="edr-monthly-val">${mo.avg_click_to_open ? mo.avg_click_to_open + '%' : '—'}</div>
        <div class="edr-monthly-lbl">Avg Click-to-Open</div>
      </div>
    </div>
    <div class="edr-monthly-count">Based on ${count} eDM${count !== 1 ? 's' : ''} this month</div>`;
}

function updateEdmReportPreview() {
  const el = document.getElementById('edr-report-preview');
  if (!el) return;
  const d = loadEdmReportData();
  el.innerHTML = buildEdmReportHtml(d);
  // Populate print clone divs via JS (safe: avoids raw HTML in template strings breaking parent structure)
  el.querySelectorAll('.edr-print-clone[data-entry-id]').forEach(clone => {
    const entry = d.entries.find(e => e.id === clone.dataset.entryId);
    if (entry && entry.click_map_html) clone.innerHTML = entry.click_map_html;
  });
  updateEdmMonthlyDisplay();
}

function renderEdmReportEntries() {
  const el = document.getElementById('edr-entries-list');
  if (!el) return;
  const d = loadEdmReportData();
  if (!d.entries.length) {
    el.innerHTML = `<div class="edr-empty-state">
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2" style="width:34px;height:34px;opacity:0.2"><path d="M6 40V12a2 2 0 012-2h32a2 2 0 012 2v28l-8-4-8 4-8-4-8 4z"/></svg>
      <div>No eDM entries yet — click <strong>+ Add eDM</strong> to get started</div>
    </div>`;
    return;
  }
  el.innerHTML = d.entries.map((e, i) => renderEdmEntryCard(e, i)).join('');
  // Restore uploaded images
  d.entries.forEach(e => {
    if (e.click_map_image) {
      const zone = document.getElementById('edr-clickmap-zone-' + e.id);
      if (zone) zone.innerHTML = `<img src="${e.click_map_image}" alt="Click map" class="edr-clickmap-preview"/>
        <button class="edr-remove-img-btn" onclick="event.stopPropagation();removeEdmClickMap('${e.id}')">Remove</button>`;
    }
  });
}

function renderEdmEntryCard(e, i) {
  const name = escapeHtml(e.email_name) || `New eDM ${i + 1}`;
  const parsedSummary = e.subject || e.started_at
    ? `<span class="edr-entry-parsed">${[e.subject ? escapeHtml(e.subject.slice(0,40)) + (e.subject.length > 40 ? '…' : '') : '', e.started_at ? escapeHtml(e.started_at) : ''].filter(Boolean).join(' · ')}</span>`
    : '';

  return `<div class="edr-entry-card${e.open ? ' open' : ''}" id="edr-card-${e.id}">
    <div class="edr-entry-header" onclick="toggleEdmReportEntry('${e.id}')">
      <span class="edr-entry-num">${String(i + 1).padStart(2, '0')}</span>
      <div class="edr-entry-title-col">
        <span class="edr-entry-name" id="edr-name-${e.id}">${name}</span>
        ${parsedSummary}
      </div>
      <button class="edr-entry-del" onclick="event.stopPropagation();deleteEdmReportEntry('${e.id}')" title="Remove">
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>
      </button>
      <svg class="edr-entry-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="4,6 8,10 12,6"/></svg>
    </div>
    <div class="edr-entry-body">

      <!-- Step 1: Email Name -->
      <div class="edr-subsection-label">
        <span class="edr-step-badge">1</span> Email Name
        <span class="edr-source">Copy from the top of the Salesforce record — not in the paste block</span>
      </div>
      <input class="form-input" type="text" value="${escapeHtml(e.email_name || '')}" placeholder="e.g. 260610_SMSF"
        oninput="saveEdmReportField('${e.id}','email_name',this.value);const nl=document.getElementById('edr-name-${e.id}');if(nl)nl.textContent=this.value||'New eDM ${i + 1}'"/>
      <input class="form-input edr-link-input" type="url" value="${escapeHtml(e.report_link || '')}" placeholder="Salesforce record link (makes email name clickable)"
        oninput="saveEdmReportField('${e.id}','report_link',this.value)" style="margin-top:6px"/>

      <!-- Step 2: Raw paste -->
      <div class="edr-subsection-label" style="margin-top:14px">
        <span class="edr-step-badge">2</span> Salesforce Report Tab — Paste Raw Data
        <span class="edr-source">Select All on the Report tab page, copy, paste below</span>
      </div>
      <textarea class="edr-paste-area" id="edr-paste-${e.id}" placeholder="Paste the full text from Salesforce Report tab here…">${escapeHtml(e.raw_paste || '')}</textarea>
      <button class="edr-parse-btn" onclick="applyEdmParse('${e.id}')">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" style="width:13px;height:13px"><polyline points="4,8 7,11 12,5"/><circle cx="8" cy="8" r="6"/></svg>
        Parse Data
      </button>
      ${e.subject || e.html_open_rate ? `<div class="edr-parsed-badge">✓ Parsed — ${e.subject ? escapeHtml(e.subject.slice(0,50)) : ''}</div>` : ''}

      <!-- Step 3: Interaction tab -->
      <div class="edr-subsection-label" style="margin-top:14px">
        <span class="edr-step-badge">3</span> Interaction Tab — Manual Entry
        <span class="edr-source">Switch to Interaction tab in Salesforce and enter values below</span>
      </div>
      <div class="edr-field-grid">
        <div class="edr-field">
          <label class="edr-field-label">Read Rate <span class="edr-pct-hint">%</span></label>
          <input class="form-input" value="${escapeHtml(String(e.read_rate || ''))}" placeholder="e.g. 38.5"
            oninput="saveEdmReportField('${e.id}','read_rate',this.value)"/>
        </div>
        <div class="edr-field">
          <label class="edr-field-label">Skim Rate <span class="edr-pct-hint">%</span></label>
          <input class="form-input" value="${escapeHtml(String(e.skim_rate || ''))}" placeholder="e.g. 15.2"
            oninput="saveEdmReportField('${e.id}','skim_rate',this.value)"/>
        </div>
      </div>

      <!-- Step 4: Click-Through Rate Map -->
      <div class="edr-subsection-label" style="margin-top:14px">
        <span class="edr-step-badge">4</span> Click-Through Rate Report Tab
        <span class="edr-source">Upload a screenshot or paste the email outerHTML from DevTools Console</span>
      </div>
      <div class="edr-cmap-tabs">
        <button class="edr-cmap-tab${(e.click_map_tab||'image')==='image'?' active':''}"
          data-cmap-tab="image" data-cmap-for="${e.id}"
          onclick="switchEdmClickMapTab('${e.id}','image')">Upload Image</button>
        <button class="edr-cmap-tab${(e.click_map_tab||'image')==='html'?' active':''}"
          data-cmap-tab="html" data-cmap-for="${e.id}"
          onclick="switchEdmClickMapTab('${e.id}','html')">Paste HTML</button>
      </div>
      <div id="edr-cmap-img-${e.id}" style="display:${(e.click_map_tab||'image')==='image'?'flex':'none'};flex-direction:column">
        <div class="edr-clickmap-zone" id="edr-clickmap-zone-${e.id}"
             onclick="document.getElementById('edr-file-${e.id}')?.click()">
          ${edrClickMapPrompt(e.id)}
        </div>
      </div>
      <div id="edr-cmap-html-${e.id}" style="display:${(e.click_map_tab||'image')==='html'?'block':'none'}">
        <textarea class="edr-paste-area edr-html-paste" id="edr-html-paste-${e.id}"
          placeholder="Paste outerHTML from browser Console here…"
          oninput="saveEdmClickMapHtml('${e.id}',this.value)">${escapeHtml(e.click_map_html||'')}</textarea>
        <div class="edr-html-actions">
          <div id="edr-html-badge-${e.id}" class="edr-parsed-badge" style="display:${e.click_map_html?'inline-flex':'none'}">✓ HTML saved</div>
          <button class="edr-open-preview-btn" onclick="openEdmHtmlPreview('${e.id}')" ${e.click_map_html?'':'disabled'} id="edr-preview-btn-${e.id}">↗ Open Full Preview</button>
        </div>
        <div id="edr-html-preview-box-${e.id}" class="edr-html-preview-box" style="display:${e.click_map_html?'block':'none'}">
          <iframe id="edr-html-preview-iframe-${e.id}" class="edr-html-preview-iframe"
            srcdoc="${escapeHtml(e.click_map_html||'')}"
            scrolling="no" sandbox="allow-same-origin"
            onload="(function(f){try{var h=f.contentDocument.body.scrollHeight;f.style.height=h+'px';var z=Math.min(0.48,560/h);f.style.zoom=z;f.parentElement.style.height=Math.ceil(h*z)+'px'}catch(err){}})(this)"></iframe>
        </div>
        <div class="edr-html-hint">In DevTools Console — select the element that wraps the email <strong>AND</strong> comment bubbles, then run: <code>copy($0.outerHTML)</code><br>To include comment lines: go one level up from the email div until comment bubbles appear in the highlight.</div>
      </div>
    </div>
  </div>`;
}

function renderPlainTextPage() {
  const root = document.getElementById('pt-root');
  if (!root || root.dataset.rendered) return;
  root.dataset.rendered = '1';

  function step(num, title, badge, body) {
    const badgeHtml = badge ? `<span class="pt-badge pt-badge-${badge.type}">${badge.label}</span>` : '';
    return `<div class="pt-step">
      <div class="pt-step-num">${num}</div>
      <div class="pt-step-body">
        <div class="pt-step-title">${title}${badgeHtml}</div>
        <div class="pt-step-desc">${body}</div>
      </div>
    </div>`;
  }

  function section(title, content) {
    return `<div class="pt-section"><div class="pt-section-title">${title}</div>${content}</div>`;
  }

  function pill(text) { return `<span class="pt-pill">${text}</span>`; }
  function code(text) { return `<code class="edm-code">${text}</code>`; }
  function note(text) { return `<div class="pt-note">${text}</div>`; }

  root.innerHTML = `
  <div class="page-header-block">
    <div class="page-title-row">
      <h1 class="page-h1">Plain Text Email</h1>
      <span class="page-subtitle">Salesforce Account Engagement (Pardot) — Workflow Guide</span>
    </div>
  </div>

  <div class="pt-layout">
    <div class="pt-main">

      ${section('Overview', `
        <p class="pt-para">Plain text emails are sent through <strong>Email Content</strong> (not Account Engagement Email). They are used for <strong>broker outreach</strong> and appear as if they are coming directly from a specific person (e.g. Laura Stanley, National Director – Private Lending). They are simpler than designed emails — no HTML blocks, no formatting — just body copy and a signature populated via merge fields.</p>
        <p class="pt-para">The customer only receives the HTML version. The plain text body is for <strong>internal Salesforce records only</strong> — it shows up on contact records so you can quickly see what was sent without loading the full HTML.</p>
      `)}

      ${section('Step-by-Step Workflow', `
        <div class="pt-phase-label">Phase 1 — Clone</div>
        ${step(1, 'Clone the Previous Email', null, `
          Go to <strong>Account Engagement → Content → Email Content</strong>.<br>
          Find the most recent email for the same product. Click the <strong>dropdown arrow</strong> next to it → select <strong>Clone</strong>.<br>
          Enter the new name following the naming convention, then click <strong>Save</strong>.
        `)}

        <div class="pt-phase-label">Phase 2 — Edit</div>
        ${step(2, 'Update the Subject Line', null, `
          Open the cloned email → click <strong>Edit</strong> → select <strong>New Email Experience</strong> (pre-selected — just click through).<br>
          Click the edit icon on the subject line field — it will scroll you to the subject field at the bottom.<br>
          Copy the subject line from the Word document provided → paste it in → click <strong>Save</strong>.
        `)}
        ${step(3, 'Update the Email Body', {type:'warn', label:'body only'}, `
          Edit <strong>only the first block</strong> — the body copy. Everything below (sender name, title, email, phone) is pre-coded with merge fields — <strong>do not touch these</strong>.<br>
          Delete the old body copy → paste the new body copy from the Word document → fix spacing as needed.<br>
          The email typically ends at <em>"chat soon"</em> or similar — don't duplicate if it's already in the template. Click <strong>Save</strong>.
        `)}
        ${step(4, 'Sync the Plain Text Body', {type:'key', label:'required'}, `
          In the email view, find the <strong>Text Body</strong> section → click the <strong>pencil icon</strong>.<br>
          Click <strong>Sync from HTML</strong> → Confirm the sync → click <strong>Save</strong>.<br>
          This makes the internal plain text record match the email body. The customer never sees this — it's for internal contact record viewing only.
        `)}

        <div class="pt-phase-label">Phase 3 — Notify</div>
        ${step(5, 'Notify for Sending', null, `
          Copy the link to the email record and let the sender know the email is ready to send.<br>
          You do not send the email yourself — the sender (e.g. Laura) handles activation and sending.
        `)}
      `)}

      ${section('How Sending Works (For Reference)', `
        <p class="pt-para" style="color:var(--text-3);font-style:italic;font-size:12px;">You don't need to do this yet — context only.</p>
        <ol class="pt-list pt-list-ol">
          <li><strong>Activate for Automation</strong> — sets the primary sender and links the campaign</li>
          <li><strong>Set Primary Sender</strong> — find the person's record, set as primary sender and reply-to user</li>
          <li><strong>Activate</strong></li>
          <li><strong>Go to Send</strong> — set campaign, tracker domain (always ${code('assetline')}), select recipient lists: All Brokers (leads and contacts) + any additional specific lists</li>
          <li><strong>Send Test first</strong> — send to internal test list to verify before full send</li>
        </ol>
      `)}

    </div>

    <div class="pt-sidebar">

      ${section('When to Use This', `
        <div class="pt-use-row">
          <div class="pt-use-type">Use <strong>Email Content</strong> (plain text) for:</div>
          <ul class="pt-list">
            <li>Broker outreach emails that look like they come from a real person</li>
            <li>Emails that don't require designed HTML layout</li>
          </ul>
        </div>
        <div class="pt-use-row" style="margin-top:10px">
          <div class="pt-use-type">Use <strong>Account Engagement Email</strong> for:</div>
          <ul class="pt-list">
            <li>Designed HTML emails with blocks, images, and branding</li>
          </ul>
        </div>
      `)}

      ${section('Naming Convention', `
        <div class="pt-formula">[Product] [Subject Line]</div>
        <div class="pt-formula-example">e.g. ${code('Private Lending Let\'s have a private chat')}</div>
        ${note('No date needed in the name.')}
      `)}

      ${section('Campaign Convention', `
        <div class="pt-formula">[Product] Push</div>
        <div class="pt-formula-example">e.g. ${code('Private Lending Push')}</div>
        ${note('This groups all emails per product in Salesforce reporting.')}
      `)}

      ${section('The 4 Core Products', `
        <div class="pt-products">
          ${pill('Horizon Mortgages')}
          ${pill('Private Lending')}
          ${pill('Development Finance')}
          ${pill('Bridging')}
        </div>
        <p class="pt-para" style="margin-top:10px;font-size:12px">Always lead with the product name — it drives reporting, dashboards, and Salesforce automation.</p>
        <p class="pt-para" style="font-size:12px;color:var(--text-3)">To identify the product: look for "private" → <em>Private Lending</em>. Check who the email is from (Laura Stanley = Private Lending). Ask if unsure.</p>
      `)}

      ${section('Key Reminders', `
        <ul class="pt-list pt-reminders">
          <li><strong>Email Content</strong> = plain text — broker emails from a person</li>
          <li><strong>Account Engagement Email</strong> = designed HTML — branded campaigns</li>
          <li>Always <strong>clone</strong> the previous email — never build from scratch</li>
          <li>Only edit the <strong>body copy</strong> — leave merge fields and signature blocks untouched</li>
          <li>Always <strong>sync plain text from HTML</strong> after editing</li>
          <li>Naming: <code class="edm-code">[Product] [Subject Line]</code> — no date</li>
          <li>Campaign: <code class="edm-code">[Product] Push</code></li>
        </ul>
      `)}

    </div>
  </div>`;
}

function renderEdmReportPage() {
  const root = document.getElementById('edr-root');
  if (!root) return;
  const d = loadEdmReportData();

  const hasSpan = !!(d.end_month && d.end_month !== d.start_month);

  root.innerHTML = `
    <div class="edr-page-header">
      <div class="edr-page-title">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" style="width:18px;height:18px;flex-shrink:0"><rect x="2" y="2" width="12" height="12" rx="1"/><polyline points="5,6 8,9 11,5"/><line x1="5" y1="11" x2="11" y2="11"/></svg>
        eDM Reporting
      </div>
      <div class="edr-page-controls">
        <div class="edr-month-group">
          <label class="edr-month-label">Month</label>
          <input type="month" id="edr-start-month" class="edr-month-input" value="${d.start_month || ''}"
            onchange="saveEdmReportStartMonth(this.value)"/>
          <label class="edr-span-toggle" title="Select a date range">
            <input type="checkbox" ${hasSpan ? 'checked' : ''} onchange="toggleEdmSpan(this.checked)"/>
            <span>to</span>
          </label>
          <div id="edr-end-month-row" style="display:${hasSpan ? 'flex' : 'none'};align-items:center;gap:6px">
            <input type="month" id="edr-end-month" class="edr-month-input" value="${d.end_month || ''}"
              min="${d.start_month || ''}" onchange="saveEdmReportEndMonth(this.value)"/>
          </div>
        </div>
        <button class="btn-add" onclick="addEdmReportEntry()">+ Add eDM</button>
        <button class="edr-save-snap-btn" onclick="saveEdmSnapshot()" title="Save report">↓ Save</button>
        <button class="edr-clear-btn" onclick="clearEdmReport()">Clear</button>
      </div>
    </div>

    <div class="edr-saves-bar">
      <span class="edr-saves-label">Saved reports</span>
      <div id="edr-snapshot-panel" class="edr-snapshot-panel"></div>
    </div>

    <div class="edr-layout">
      <div class="edr-left">
        <div id="edr-entries-list"></div>

        <div class="section-block edr-monthly-block">
          <div class="section-block-header">
            <div class="sh-icon" style="background:rgba(120,104,184,0.14);color:var(--lavender)">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="2,12 6,7 9,10 13,4"/><circle cx="13" cy="4" r="1.5" fill="currentColor" stroke="none"/></svg>
            </div>
            <span class="sh-title">Monthly Aggregate</span>
            <span class="edr-monthly-hint">Auto-calculated from parsed entries</span>
          </div>
          <div id="edr-monthly-display"></div>
        </div>
      </div>

      <div class="edr-right">
        <div class="edr-preview-header">
          <span class="edr-preview-title">Generated Report</span>
          <button class="edr-print-btn" onclick="printEdmReport()" title="Print report">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" style="width:13px;height:13px"><path d="M4 6V2h8v4M4 11H2V7h12v4h-2M4 11v3h8v-3H4z"/></svg>
            Print
          </button>
        </div>
        <div id="edr-report-preview"></div>
      </div>
    </div>`;

  renderEdmReportEntries();
  updateEdmReportPreview();
  renderEdmSnapshotPanel();
}
