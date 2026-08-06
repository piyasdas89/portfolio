const expertise = [
  { area: "abap", title: "ABAP Development & Enhancements", body: "Object-oriented ABAP across the enhancement framework: User Exits, Customer Exits, BAdIs, ALV reports, Module Pool, Smartforms and DDIC.", tags: ["OO-ABAP", "RICEFW", "BAdIs", "ALV Reports"], wide: true },
  { area: "workflow", title: "Workflow & Process Automation", body: "End-to-end SAP Workflows built for IS-U processes, with agent determination, deadline monitoring and production-grade error handling.", tags: ["SWDD", "SWIA", "Deadline Monitoring"], wide: false },
  { area: "integration", title: "Cross-Application Integration", body: "IDoc structures, ALE interfaces, tRFC configuration and custom BAPIs for reliable cross-system exchange and OData replication.", tags: ["IDocs/ALE", "BAPI", "OData", "tRFC"], wide: false },
  { area: "isu", title: "IS-U Utility Domain", body: "Hands-on ownership of Move-In, Move-Out, Switch-In/Out, Internal Start/Stop and Start/End of Supply business processes.", tags: ["SAP IS-U", "Contract Lifecycle"], wide: true },
  { area: "abap", title: "Modern ABAP & SAP Platforms", body: "SAP IS-U, SAP CRM and S/4HANA experience with CDS Views, AMDP, SAP BTP, ABAP Cloud and Fiori readiness.", tags: ["S/4HANA", "CDS Views", "AMDP", "SAP BTP"], wide: true },
  { area: "crm", title: "SAP CRM Expertise", body: "CRM WEBUI enhancements, CRM Workbench configuration, One Order Framework customisation and master-data management.", tags: ["CRM WEBUI", "CRM Workbench", "One Order"], wide: false }
];

const grid = document.querySelector("#expertise-grid");
const renderExpertise = (filter = "all") => {
  grid.innerHTML = expertise.filter((item) => filter === "all" || item.area === filter).map((item) => `
    <article class="skill-card ${item.wide ? "wide" : ""}">
      <p class="eyebrow">${item.area}</p><h3>${item.title}</h3><p>${item.body}</p>
      <div class="tags">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    </article>`).join("");
};
renderExpertise();

document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
  document.querySelector(".filters .is-active").classList.remove("is-active");
  button.classList.add("is-active");
  renderExpertise(button.dataset.filter);
}));

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#primary-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "Close" : "Menu";
});
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "Menu";
}));

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
  const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
  window.location.href = `mailto:piyasdas89@gmail.com?subject=${subject}&body=${body}`;
  document.querySelector("#form-note").textContent = "Your email app should now be open. If it did not open, email piyasdas89@gmail.com directly.";
});

document.querySelector("#year").textContent = new Date().getFullYear();
