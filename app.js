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
    crm:        ['CRM',        'Salesforce & contact management'],
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

// ── DATE/TIME ───────────────────────────────────────────────────
function updateDateTime() {
  const now = new Date();
  const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  const dateStr = now.toLocaleDateString('en-AU', opts);
  const timeStr = now.toLocaleTimeString('en-AU', { hour:'2-digit', minute:'2-digit' });

  document.querySelectorAll('.live-date').forEach(el => el.textContent = dateStr);
  document.querySelectorAll('.live-time').forEach(el => el.textContent = timeStr);
}

// ── INIT ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  checkDailyReset();
  updateDateTime();
  setInterval(updateDateTime, 60000);

  // Wire nav clicks
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => navigate(item.dataset.page));
  });

  // Default page
  navigate('daily');
});
