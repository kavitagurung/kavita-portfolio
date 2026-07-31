const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const skillsCardsData = document.getElementById("skills-cards-data");

const skillsCategories = [
  {
    icon: "AI",
    title: "AI & ML",
    subtitle: "Core intelligence stack",
    chips: [
      "AI",
      "Machine Learning",
      "NLP",
      "Generative AI",
      "LLM Products",
      "Prompt Engineering",
      "AI Product Strategy",
      "Model Evaluation"
    ]
  },
  {
    icon: "PM",
    title: "Product",
    subtitle: "Discovery to delivery",
    chips: [
      "Product Strategy",
      "Product Design",
      "Product Discovery",
      "Roadmaps",
      "Stakeholder Management",
      "UX Thinking",
      "Cross-Functional Leadership"
    ]
  },
  {
    icon: "SA",
    title: "SaaS",
    subtitle: "Automation systems",
    chips: [
      "Intelligent Automation",
      "RPA",
      "AI Test Automation",
      "Workflow Optimization",
      "Enterprise SaaS"
    ]
  },
  {
    icon: "DT",
    title: "Data & Analytics",
    subtitle: "Measurement and insight",
    chips: [
      "Product Analytics",
      "Experimentation",
      "KPI Design",
      "Data Visualization",
      "SQL"
    ]
  },
  {
    icon: "TL",
    title: "Tools",
    subtitle: "Daily product toolkit",
    chips: [
      "Figma",
      "Whimsical",
      "JIRA",
      "Google Analytics",
      "CleverTap"
    ]
  },
  {
    icon: "LANG",
    title: "Coding Languages",
    subtitle: "Technical fluency",
    chips: [
      "Python",
      "R"
    ]
  }
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
  if (!skillsCardsData) {
    return;
  }

  skillsCardsData.innerHTML = "";
  skillsCategories.forEach((category) => {
    const card = document.createElement("article");
    card.className = "skill-card";

    const icon = document.createElement("span");
    icon.className = "skill-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = category.icon;

    const title = document.createElement("h3");
    title.textContent = category.title;

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(buildChipRow(category.chips));
    skillsCardsData.appendChild(card);
  });
}

if (skillsCardsData) {
  renderSkillsCards();
}

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const reason = (formData.get("reason") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();
    const subject = encodeURIComponent("Portfolio contact: " + (reason || "General"));
    const body = encodeURIComponent(
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Reason: " + reason + "\n\n" +
      message
    );

    window.location.href = "mailto:kavitagurung033@gmail.com?subject=" + subject + "&body=" + body;
    contactStatus.textContent = "Your email app should open with a pre-filled message.";
  });
}
