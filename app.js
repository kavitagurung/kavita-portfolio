const $ = (selector, root = document) => root.querySelector(selector);

const cards = [
  { id: "experience", label: "EXPERIENCE", caption: "6+ years across fintech, healthtech, AI, and enterprise SaaS.", kind: "experience" },
  { id: "work", label: "SELECTED WORK", caption: "AI, enterprise systems, and difficult workflows.", kind: "work" },
  { id: "life", label: "LIFE", caption: "Mountains, people, and unfamiliar places.", kind: "life", image: "assets/personal/mountain-summit.jpg", alt: "Kavita seated on a mountain ridge with a wide view of the surrounding hills." }
];
let activeIndex = 0;
let drag = null;
let didDrag = false;

function cardVisual(card) {
  if (card.kind === "experience") return `<div class="deck-card__visual deck-card__visual--experience" aria-hidden="true"><span>PRODUCT</span><i></i><span>DISCOVERY</span><i></i><span>DELIVERY</span><i></i><span>LEARNING</span></div>`;
  if (card.kind === "work") return `<div class="deck-card__visual deck-card__visual--flow" aria-hidden="true"><div class="flow-line"><span>CAPTURE</span><i></i><span>RUN</span></div><div class="flow-line"><span>OBSERVE</span><i></i><span>DECIDE</span></div><div class="flow-line"><span>VALIDATE</span><i></i><span>IMPROVE</span></div></div>`;
  return `<div class="deck-card__visual"><img src="${card.image}" alt="${card.alt}" /></div>`;
}
function renderDeck() {
  const deck = $("#deck");
  deck.innerHTML = cards.map((card, index) => {
    const offset = (index - activeIndex + cards.length) % cards.length;
    return `<article class="deck-card deck-card--${card.kind} ${offset === 0 ? "is-active" : ""}" data-index="${index}" style="--x:${offset * 14}px;--y:${offset * 11}px;--r:${offset * 2.1 - 2}deg" tabindex="${offset === 0 ? "0" : "-1"}" role="button" aria-label="${card.label}. ${card.caption}. Press Enter to open."><div class="deck-card__top"><span>${String(index + 1).padStart(2, "0")}</span><span class="deck-card__number">${card.label}</span></div>${cardVisual(card)}<span class="open-label" aria-hidden="true">Open ↗</span><h2 class="deck-card__title">${card.label === "SELECTED WORK" ? "Selected <em>work</em>" : card.label[0] + card.label.slice(1).toLowerCase()}</h2><p class="deck-card__caption">${card.caption}</p></article>`;
  }).join("");
  $("#deck-count").textContent = `${String(activeIndex + 1).padStart(2, "0")} / 03`;
  bindCard();
}
function moveDeck(direction) { activeIndex = (activeIndex + direction + cards.length) % cards.length; renderDeck(); $(".deck-card.is-active")?.focus({ preventScroll: true }); }
function bindCard() {
  const card = $(".deck-card.is-active"); if (!card) return;
  const reset = () => { card.style.transform = ""; card.classList.remove("is-dragging"); };
  card.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    card.setPointerCapture(event.pointerId);
    drag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, at: performance.now() }; didDrag = false; card.classList.add("is-dragging");
  });
  card.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (Math.hypot(dx, dy) >= 8) didDrag = true;
    card.style.transform = `translate(${dx}px, ${dy * .34}px) rotate(${dx * .045}deg)`;
  });
  card.addEventListener("pointerup", (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const dx = event.clientX - drag.x, elapsed = Math.max(performance.now() - drag.at, 1), quickSwipe = Math.abs(dx / elapsed) > .72 && Math.abs(dx) > 42;
    drag = null;
    if (Math.abs(dx) > 110 || quickSwipe) { const direction = dx > 0 ? -1 : 1; card.classList.add("is-leaving"); card.style.transform = `translate(${dx > 0 ? 1200 : -1200}px, ${dx * .13}px) rotate(${dx > 0 ? 16 : -16}deg)`; window.setTimeout(() => moveDeck(direction), 210); }
    else reset();
  });
  card.addEventListener("pointercancel", () => { drag = null; reset(); });
  card.addEventListener("pointermove", (event) => { if (drag) return; const box = card.getBoundingClientRect(), rx = (event.clientX - box.left) / box.width - .5, ry = (event.clientY - box.top) / box.height - .5; card.style.transform = `translate(${rx * 4}px, ${ry * 4 - 10}px) rotate(${rx * 1.2}deg)`; });
  card.addEventListener("pointerleave", () => { if (!drag) reset(); });
  card.addEventListener("click", () => { if (!didDrag) openView(cards[activeIndex].id); didDrag = false; });
  card.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); openView(cards[activeIndex].id); } if (event.key === "ArrowRight") { event.preventDefault(); moveDeck(1); } if (event.key === "ArrowLeft") { event.preventDefault(); moveDeck(-1); } });
}

const experience = [
  ["2025 — now", "Ziplyne · Associate Product Manager", "Co-owning strategy and execution for an AI-powered enterprise test automation platform; defining AI testing and release-management workflows."],
  ["2024 — 2025", "Indegene · Product Analyst", "Product discovery, roadmap planning, PRDs, and cross-functional delivery for enterprise healthcare SaaS and collaboration workflows."],
  ["2022 — 2024", "Paytm · Associate Product Manager", "Customer analytics and marketing-intelligence product work across requirements, workflows, analytics modules, and reporting."],
  ["2021 — 2022", "Robofied · Associate Business Analyst", "AI-powered enterprise product work spanning NLP, speech recognition, machine learning, predictive analytics, and process automation."]
];
const work = [
  { title: "AI Test Automation Platform", problem: "Enterprise UI testing needed a more resilient, usable workflow.", role: "Product discovery, workflow definition, and AI testing direction.", approach: "Capture → run → observe → validate.", outcome: "A clearer operating model for automated test execution and validation.", href: "case-study-1.html" },
  { title: "AI Quality Gates / CI-CD", problem: "Automated results needed to support release-confidence decisions.", role: "Quality-gate and API-testing workflow definition.", approach: "Results → policy → decision.", outcome: "Execution signals structured for a meaningful release decision.", href: "case-study-4.html" },
  { title: "Predictive Retention Engine", problem: "Teams needed earlier context on meaningful behavioural changes.", role: "Requirements, dashboard/workflow definition, and stakeholder alignment.", approach: "Signal → segment → intervention.", outcome: "Behavioural data and recommendation touchpoints connected in one decision workflow.", href: "case-study-2.html" }
];
function experienceView() { return `<section class="view-shell"><button class="back-deck" type="button">← Back to deck</button><p class="view-kicker">01 / EXPERIENCE</p><h1 class="view-title">Experience</h1><p class="view-intro">Product work across enterprise software, analytics, automation, and AI-enabled workflows.</p><ol class="experience-timeline">${experience.map(([date, title, text]) => `<li><p>${date}</p><div><h2>${title}</h2><p>${text}</p></div></li>`).join("")}</ol></section>`; }
function workView() { return `<section class="view-shell"><button class="back-deck" type="button">← Back to deck</button><p class="view-kicker">02 / SELECTED WORK</p><h1 class="view-title">Selected <em>work.</em></h1><p class="view-intro">A few systems shaped around better product decisions and dependable delivery.</p><div class="case-accordion">${work.map((item, index) => `<details ${index === 0 ? "open" : ""}><summary><span>${String(index + 1).padStart(2, "0")}</span><strong>${item.title}</strong><b>+</b></summary><div class="case-body"><p><b>Problem</b>${item.problem}</p><p><b>Role</b>${item.role}</p><p><b>Approach</b>${item.approach}</p><p><b>Outcome</b>${item.outcome}</p><a href="${item.href}">Read case file ↗</a></div></details>`).join("")}</div></section>`; }
function lifeView() { return `<section class="view-shell"><button class="back-deck" type="button">← Back to deck</button><p class="view-kicker">03 / LIFE</p><h1 class="view-title">Life</h1><p class="view-intro">Mountains, people, unfamiliar places, and the questions that survive the trip home.</p><div class="life-grid"><figure><img src="assets/personal/mountain-summit.jpg" alt="Kavita seated on a mountain ridge." /><figcaption>For the uphill part.</figcaption></figure><figure><img src="assets/personal/culture-red-tradition.jpg" alt="Kavita in traditional dress." /><figcaption>Culture, up close.</figcaption></figure><figure><img src="assets/personal/astronomy-book-emc2.jpg" alt="A copy of Why Does E=mc²?" /><figcaption>Astronomy is still a rabbit hole.</figcaption></figure></div><div class="life-notes"><span>Physics · Geopolitics · Philosophy</span><span>Guitar · Badminton</span></div></section>`; }
function openView(id) { const view = $("#deck-view"); view.innerHTML = ({ experience: experienceView, work: workView, life: lifeView })[id](); view.classList.add("is-open"); view.setAttribute("aria-hidden", "false"); $(".back-deck", view).focus(); $(".back-deck", view).addEventListener("click", closeView); }
function closeView() { const view = $("#deck-view"); view.classList.remove("is-open"); view.setAttribute("aria-hidden", "true"); window.setTimeout(() => { view.innerHTML = ""; $(".deck-card.is-active")?.focus({ preventScroll: true }); }, 180); }
$("#next-card")?.addEventListener("click", () => moveDeck(1)); $("#previous-card")?.addEventListener("click", () => moveDeck(-1));
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && $("#deck-view").classList.contains("is-open")) closeView(); });
renderDeck();
