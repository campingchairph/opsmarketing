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
    { id:'qb1', label:'Correct logo version used', sub:'Right colour variant. No stretch or distortion. Minimum clear space respected.', badge:'critical' },
    { id:'qb2', label:'Brand fonts only — no substitutions or missing fonts', sub:'Type > Find Font — check for any non-brand or missing fonts.' },
    { id:'qb3', label:'Brand colour palette — no off-spec swatches', sub:'Open Swatches panel. Delete unused swatches. No RGB colours in a print job.' },
    { id:'qb4', label:'Correct document template was used — not a rogue copy', sub:'Check master pages match approved template. Margins and columns correct.' },
    { id:'qb5', label:'All paragraph/character styles match brand style sheet', sub:'No manually overridden text — check for + indicator in Paragraph Styles panel.' },
  ],
  qc_copy: [
    { id:'qc1', label:'All copy matches the approved brief — word for word', sub:'Print the approved copy doc and compare side-by-side. Never proof on screen only.', badge:'critical' },
    { id:'qc2', label:'Required disclaimer(s) present and correctly worded', sub:'For financial services: AFSL number, general advice warning, or other mandated copy.', badge:'critical' },
    { id:'qc3', label:'No spelling or grammatical errors', sub:'Edit > Spelling > Check Spelling. Also do a manual read — spell check misses "form" vs "from".' },
    { id:'qc4', label:'No placeholder or dummy text remaining', sub:'Search "Lorem ipsum", "TBC", "XXX", "[insert". Edit > Find/Change.', badge:'common miss' },
    { id:'qc5', label:'Dates, figures, and names are correct and current', sub:'Cross-check against brief. Especially event dates, rates, fund names, contact details.' },
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
    { id:'cq1', label:'Correct logo version used', sub:'', badge:'critical' },
    { id:'cq2', label:'Required disclaimer(s) present and correctly worded', sub:'', badge:'critical' },
    { id:'cq3', label:'Brand fonts only', sub:'' },
    { id:'cq4', label:'Brand colour palette — no off-brand hex values', sub:'' },
    { id:'cq5', label:'Correct template version used', sub:'' },
    { id:'cq6', label:'All copy approved before design placement', sub:'' },
    { id:'cq7', label:'No spelling or grammatical errors', sub:'' },
    { id:'cq8', label:'Approval recorded before sending / publishing', sub:'', badge:'critical' },
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
  const titles = {
    daily:      ['Daily Ops', 'Morning, core tasks & end-of-day'],
    campaigns:  ['Campaigns', 'Email execution & collateral'],
    events:     ['Events',    'Setup, materials & post-event'],
    brand:      ['Brand & Compliance', 'QC checklist + InDesign preflight'],
    tools:      ['Tools & Skills',  'Your tech stack reference'],
    monday:     ['Monday.com', 'Your task management hub'],
    firstweek:  ['First Week Guide', 'Day-by-day remote survival plan'],
    panic:      ['Panic Button 🆘', 'Step-by-step for when things go wrong'],
    templates:  ['Message Templates', 'Ready-to-copy professional messages'],
    timesheet:  ['Timesheet', 'Log work, track hours, backtrack any day'],
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
  if (pageId === 'timesheet') { setTimeout(initCalendar, 50); }

  // Update page-level progress bar
  updatePageProgress(pageId);
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
function updateDateTime() {
  const now = new Date();
  const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  const dateStr = now.toLocaleDateString('en-AU', opts);
  document.querySelectorAll('.live-date').forEach(el => el.textContent = dateStr);

  // Manila — Asia/Manila (UTC+8)
  const manilaTime = now.toLocaleTimeString('en-PH', { hour:'2-digit', minute:'2-digit', timeZone:'Asia/Manila' });
  // Sydney — Australia/Sydney (UTC+10/11)
  const sydTime = now.toLocaleTimeString('en-AU', { hour:'2-digit', minute:'2-digit', timeZone:'Australia/Sydney' });

  document.querySelectorAll('.clock-manila').forEach(el => el.textContent = manilaTime);
  document.querySelectorAll('.clock-sydney').forEach(el => el.textContent = sydTime);
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
    ]
  },
];

// ── TEMPLATE RENDERING ──────────────────────────────────────────
function renderTemplates() {
  const grid = document.getElementById('tpl-grid');
  if (!grid) return;
  grid.innerHTML = TEMPLATES.map(tpl => `
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
    </div>`).join('');
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

  navigate('daily');
});
