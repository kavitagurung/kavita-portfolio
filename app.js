const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const skillsCardsData = document.getElementById("skills-cards-data");
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.getElementById("primary-nav");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const projectCards = [...document.querySelectorAll(".project-card[data-category]")];
const personalStoryRoot = document.getElementById("personal-story-root");

const skillsCategories = [
  { icon: "AI", title: "AI & ML", chips: ["AI", "Machine Learning", "NLP", "Generative AI", "LLM Products", "Prompt Engineering", "AI Product Strategy", "Model Evaluation"] },
  { icon: "PM", title: "Product", chips: ["Product Strategy", "Product Design", "Product Discovery", "Roadmaps", "Stakeholder Management", "UX Thinking", "Cross-Functional Leadership"] },
  { icon: "SA", title: "SaaS", chips: ["Intelligent Automation", "RPA", "AI Test Automation", "Workflow Optimization", "Enterprise SaaS"] },
  { icon: "DT", title: "Data & Analytics", chips: ["Product Analytics", "Experimentation", "KPI Design", "Data Visualization", "SQL"] },
  { icon: "TL", title: "Tools", chips: ["Figma", "Whimsical", "JIRA", "Google Analytics", "CleverTap"] },
  { icon: "LANG", title: "Coding Languages", chips: ["Python", "R"] }
];

function buildChipRow(chips) {
  const row = document.createElement("div");
  row.className = "chip-row";
  chips.forEach((text) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = text;
    row.appendChild(chip);
  });
  return row;
}

function renderSkillsCards() {
  if (!skillsCardsData) return;

  skillsCardsData.replaceChildren();
  skillsCategories.forEach((category) => {
    const card = document.createElement("article");
    card.className = "skill-card";

    const icon = document.createElement("span");
    icon.className = "skill-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = category.icon;

    const title = document.createElement("h3");
    title.textContent = category.title;
    card.append(icon, title, buildChipRow(category.chips));
    skillsCardsData.appendChild(card);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function personalImage(image, className = "") {
  if (image.src) {
    return `<figure class="story-image ${className}"><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy" /><figcaption>${escapeHtml(image.caption || "")}</figcaption></figure>`;
  }
  return `<figure class="story-image story-image-placeholder ${className}" role="img" aria-label="${escapeHtml(image.alt)}"><span>PHOTO PLACEHOLDER</span><strong>${escapeHtml(image.label)}</strong><figcaption>Add a photo in <code>personal-data.js</code></figcaption></figure>`;
}

function personalVideo(video, className = "") {
  return `<figure class="story-video ${className}"><video controls preload="metadata" playsinline aria-label="${escapeHtml(video.alt)}"><source src="${escapeHtml(video.src)}" type="video/mp4" />Your browser does not support video playback.</video><figcaption>${escapeHtml(video.caption || "")}</figcaption></figure>`;
}

function paragraphs(items) {
  return items.map((item) => `<p>${escapeHtml(item)}</p>`).join("");
}

function renderPersonalStory() {
  if (!personalStoryRoot || !window.personalContent) return;
  const content = window.personalContent;
  const { mountains, people, culture, adventure } = content.stories;
  const peopleImages = people.images.map((image, index) => personalImage(image, `people-photo people-photo-${index + 1}`)).join("");
  const cultureImages = culture.images.map((image, index) => personalImage(image, `culture-photo culture-photo-${index + 1}`)).join("");
  const adventures = adventure.activities.map((activity) => `
    <article class="adventure-card" tabindex="0">
      ${personalImage(activity.image, "adventure-image")}
      <div><p class="story-kicker">${escapeHtml(activity.title)}</p><h4>${escapeHtml(activity.title)}</h4><p>${escapeHtml(activity.text)}</p></div>
    </article>`).join("");
  const thoughts = content.questions.map((question, index) => `<span class="thought-bubble bubble-${index + 1}">${escapeHtml(question)}</span>`).join("");
  const astronomy = content.astronomyTopics.map((topic) => `<article class="celestial-topic" tabindex="0"><span aria-hidden="true"></span><h4>${escapeHtml(topic.title)}</h4><p>${escapeHtml(topic.detail)}</p></article>`).join("");
  const hobbies = content.lifeOutsideJira.map((item) => `<article class="hobby-card">${item.video ? personalVideo(item.video, "hobby-video") : item.image ? personalImage(item.image, "hobby-image") : `<span class="hobby-placeholder" aria-hidden="true">${escapeHtml(item.title.slice(0, 1))}</span>`}<p class="story-kicker">${escapeHtml(item.title)}</p><h4>${escapeHtml(item.text)}</h4>${item.label ? `<p class="editable-note">${escapeHtml(item.label)}</p>` : ""}</article>`).join("");
  const learningColumns = [
    ["Learning right now", content.learning.now],
    ["Favorite rabbit holes", content.learning.rabbitHoles],
    ["Want to understand someday", content.learning.someday]
  ].map(([title, items]) => `<article class="learning-column"><h4>${escapeHtml(title)}</h4><div>${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div></article>`).join("");

  personalStoryRoot.innerHTML = `
    <section id="mountains" class="story-chapter mountain-story" aria-labelledby="mountains-title">
      <div class="story-copy"><p class="story-kicker">${escapeHtml(mountains.kicker)}</p><h3 id="mountains-title">${escapeHtml(mountains.title)}</h3><p class="story-subtitle">${escapeHtml(mountains.subtitle)}</p>${paragraphs(mountains.paragraphs)}<p class="story-note">${escapeHtml(mountains.note)}</p></div>
      ${personalImage(mountains.image, "mountain-image")}
    </section>

    <section class="story-chapter people-story" aria-labelledby="people-title">
      <div class="story-copy"><p class="story-kicker">${escapeHtml(people.kicker)}</p><h3 id="people-title">${escapeHtml(people.title)}</h3><p class="story-subtitle">${escapeHtml(people.subtitle)}</p>${paragraphs(people.paragraphs)}</div>
      <div class="people-collage">${peopleImages}<p class="collage-caption">${escapeHtml(people.captions[0])}</p><p class="collage-caption caption-two">${escapeHtml(people.captions[1])}</p></div>
    </section>

    <section class="story-chapter culture-story" aria-labelledby="culture-title">
      <div class="culture-collage">${cultureImages}</div>
      <div class="story-copy"><p class="story-kicker">${escapeHtml(culture.kicker)}</p><h3 id="culture-title">${escapeHtml(culture.title)} <em>${escapeHtml(culture.answer)}</em></h3>${paragraphs(culture.paragraphs)}</div>
    </section>

    <section class="adventure-story" aria-labelledby="adventure-title">
      <div class="story-heading"><p class="story-kicker">${escapeHtml(adventure.kicker)}</p><h3 id="adventure-title">${escapeHtml(adventure.title)}</h3><p class="pink-answer">${escapeHtml(adventure.answer)}</p><p>${escapeHtml(adventure.intro)}</p></div>
      <div class="adventure-grid">${adventures}</div>
    </section>

    <section class="curiosity-story" aria-labelledby="curiosity-title">
      <div class="thought-cloud" aria-hidden="true">${thoughts}</div>
      <div class="curiosity-copy"><p class="story-kicker">CHAPTER 05 · CURIOSITY</p><h3 id="curiosity-title">MY BRAIN RARELY SITS STILL.</h3><p class="story-subtitle">Give me something I don't understand and there's a decent chance I'll disappear down a rabbit hole trying to understand it.</p><p class="curiosity-line">Curiosity is probably the thread connecting everything I do.</p><div class="curiosity-threads" aria-label="Subjects Kavita is curious about"><span>People</span><span>Products</span><span>Technology</span><span>Science</span><span>Culture</span><span>Music</span><span>Space</span><span>Human behaviour</span></div></div>
    </section>

    <section class="astronomy-story" aria-labelledby="astronomy-title">
      <div class="stars" aria-hidden="true"></div><div class="astronomy-copy"><p class="story-kicker">CHAPTER 06 · ASTRONOMY</p><h3 id="astronomy-title">I HAVE ALWAYS LOOKED UP.</h3><p>Stars. The Moon. Planets. Galaxies. The universe has fascinated me for as long as I can remember.</p><p>There is something beautiful about realizing how unbelievably small we are—and how much there still is to understand. Maybe this is where my curiosity started.</p><p class="story-note">Tiny human. Large universe.</p></div><div class="astronomy-panel"><div class="celestial-grid">${astronomy}</div><article class="astronomy-reading">${personalImage(content.astronomyReading, "astronomy-book-image")}<div><p class="story-kicker">ON THE NIGHTSTAND</p><h4>${escapeHtml(content.astronomyReading.title)}</h4><p>${escapeHtml(content.astronomyReading.caption)}</p></div></article></div>
    </section>

    <section class="life-story" aria-labelledby="life-title"><div class="story-heading"><p class="story-kicker">CHAPTER 07 · OFF THE CLOCK</p><h3 id="life-title">THERE IS LIFE OUTSIDE JIRA.</h3></div><div class="hobby-grid">${hobbies}</div></section>

    <section class="brain-gym" aria-labelledby="brain-title"><p class="story-kicker">CHAPTER 08 · THE BRAIN GYM</p><h3 id="brain-title">I LIKE BEING BAD AT THINGS.<br /><em>That's usually where learning starts.</em></h3><p>I genuinely enjoy learning things I don't know. Not because I expect to become an expert in everything. I just like discovering how things work.</p><div class="learning-grid">${learningColumns}</div></section>

    <section class="cv-statement" aria-label="Portfolio statement"><p>My CV will tell you what I've done.</p><h3>This website should tell you <em>who</em> did it.</h3></section>`;
}

function setMenu(open) {
  if (!navToggle || !primaryNav) return;
  navToggle.setAttribute("aria-expanded", String(open));
  primaryNav.classList.toggle("is-open", open);
}

function setupNavigation() {
  navToggle?.addEventListener("click", () => {
    setMenu(navToggle.getAttribute("aria-expanded") !== "true");
  });

  navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    const visibleEntry = entries.find((entry) => entry.isIntersecting);
    if (visibleEntry) setActiveLink(visibleEntry.target.id);
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });

  sections.forEach((section) => observer.observe(section));
  window.addEventListener("scroll", () => {
    document.querySelector(".site-header")?.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });
}

function setupProjectFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      projectCards.forEach((card) => {
        card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
      });
    });
  });
}

function setupReveals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const revealElements = document.querySelectorAll("main > .section, main > .enterprise-section, main > .industry-section, main > .beyond-pm, main > .work-mode-transition, main > .contact");
  document.body.classList.add("has-js");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  revealElements.forEach((element) => observer.observe(element));
}

function setupContactForm() {
  if (!contactForm || !contactStatus) return;
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const reason = (formData.get("reason") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();
    const subject = `Portfolio contact: ${reason || "General"}`;
    const body = `Name: ${name}\nEmail: ${email}\nReason: ${reason}\n\n${message}`;
    const composeUrl = new URL("https://mail.google.com/mail/");
    composeUrl.search = new URLSearchParams({ view: "cm", fs: "1", to: "kavitagurung033@gmail.com", su: subject, body }).toString();

    const composeWindow = window.open(composeUrl.toString(), "_blank");
    if (composeWindow) {
      contactStatus.textContent = "Gmail Compose opened in a new tab with your message ready to send.";
      return;
    }

    contactStatus.replaceChildren("Your browser blocked the Gmail tab. ");
    const fallbackLink = document.createElement("a");
    fallbackLink.href = composeUrl.toString();
    fallbackLink.target = "_blank";
    fallbackLink.rel = "noreferrer";
    fallbackLink.textContent = "Open Gmail Compose";
    contactStatus.append(fallbackLink, ".");
  });
}

renderSkillsCards();
renderPersonalStory();
setupNavigation();
setupProjectFilters();
setupReveals();
setupContactForm();
