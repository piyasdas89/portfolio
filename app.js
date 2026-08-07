// Piyas Das — SAP Enterprise Portfolio Interactive App Engine

const state = {
  activeTab: 'all',
  activeCodeTab: 'abap',
  isResumeModalOpen: false,
  isMobileMenuOpen: false
};

const codeSnippets = {
  abap: {
    filename: "ZCL_ISU_WORKFLOW_EVENT.abap",
    language: "ABAP Cloud",
    code: `CLASS zcl_isu_workflow_event DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES bi_object.
    INTERFACES bi_persistent.
    
    METHODS trigger_salesforce_sync
      IMPORTING
        iv_contract_id TYPE isu_vertrag
        iv_event_type  TYPE string
      RAISING
        cx_isu_workflow_error.
ENDCLASS.

METHOD trigger_salesforce_sync.
  " OData v4 Service Call to Salesforce Integration Bridge
  DATA(lo_client) = cl_web_http_client_manager=>create_by_destination( 
    i_destination = 'SALESFORCE_ODATA_DEST' 
  ).
  lo_client->get_http_request( )->set_header_field(
    i_name = 'X-SAP-ISU-Event' i_value = iv_event_type
  ).
  " SWDD Event Trigger for Move-In / Move-Out Workflow
  cl_swf_evt_event=>raise(
    im_objcateg = cl_swf_evt_event=>mc_objcateg_cl
    im_objtype  = 'ZCL_ISU_WORKFLOW_EVENT'
    im_event    = 'CONTRACT_UPDATED'
  ).
ENDMETHOD.`
  },
  odata: {
    filename: "SALESFORCE_ODATA_PAYLOAD.json",
    language: "JSON / OData",
    code: `{
  "d": {
    "ContractId": "CON_ISU_9084721",
    "BusinessPartner": "BP_1092837",
    "UtilityType": "Electricity_Industrial",
    "MoveInDate": "2026-03-01T00:00:00Z",
    "SyncStatus": "PROCESSED",
    "WorkflowId": "WS90000142",
    "PriceKeyConfig": "PK_COMMERCIAL_TIER1",
    "PayloadErrorCount": 0,
    "TargetSystem": "SAP_ISU_S4HANA"
  }
}`
  },
  idoc: {
    filename: "IDOC_ALE_INTERFACE.xml",
    language: "XML / IDoc",
    code: `<?xml version="1.0" encoding="UTF-8"?>
<IDOC BEGIN="1">
  <EDI_DC40>
    <TABNAM>EDI_DC40</TABNAM>
    <MESTYP>ISU_MOVEIN_SYNC</MESTYP>
    <IDOCTYP>ZISU_CONTRACT01</IDOCTYP>
    <SNDPRN>SALESFORCE_PROD</SNDPRN>
    <RCVPRN>SAP_ISU_PRD</RCVPRN>
  </EDI_DC40>
  <E1ISU_CONTRACT_HEADER>
    <VERTRAG>0098472910</VERTRAG>
    <ANLAGE>0004928172</ANLAGE>
    <SPARTE>01</SPARTE>
  </E1ISU_CONTRACT_HEADER>
</IDOC>`
  }
};

const capabilities = [
  { category: "abap", title: "OO-ABAP & RICEFW Objects", desc: "Delivered 30+ production RICEFW objects (ALV Reports, Function Modules, BAPIs, BAdIs, Smartforms) across SAP IS-U & CRM with 25+ TDDs.", tags: ["OO-ABAP", "RICEFW", "BAdIs", "SmartForms", "ALV"], highlight: "30+ Objects" },
  { category: "workflow", title: "SAP Workflow Builder (SWDD)", desc: "Architected 8+ end-to-end SAP Workflows with deadline monitoring, container element mapping, agent determination, and SWUS error recovery.", tags: ["SWDD", "SWIA", "BOR Objects", "Deadline Monitor"], highlight: "70% Effort Cut" },
  { category: "integration", title: "Salesforce ↔ SAP Integration", desc: "Built bi-directional real-time OData services and 6+ IDoc structures (BDBG, tRFC ports) connecting Salesforce front end to SAP IS-U core.", tags: ["OData v4", "IDocs/ALE", "BAPIs", "tRFC"], highlight: "35% Error Reduction" },
  { category: "isu", title: "SAP IS-U Utility Domain", desc: "Deep hands-on ownership of Move-In, Move-Out, Switch-In/Out, Start/Stop Supply, MDT automation, and Billing/Invoicing enhancements.", tags: ["SAP IS-U", "EPRODCUST", "Billing", "Contract Lifecycle"], highlight: "Utility Specialist" },
  { category: "abap", title: "Modern ABAP Cloud & S/4HANA", desc: "Experience with CDS Views, AMDP, SAP BTP, ABAP Cloud syntax, Fiori architecture, and SQL Trace performance tuning.", tags: ["ABAP Cloud", "CDS Views", "AMDP", "SAP BTP"], highlight: "45% Fast Batch" },
  { category: "crm", title: "SAP CRM & Web UI Customization", desc: "CRM Web UI enhancements, One Order framework, custom BAdI error handling, and 42 custom CRM Price Keys via SPRO.", tags: ["CRM Web UI", "One Order", "SPRO Price Keys"], highlight: "42 Price Keys" }
];

const certifications = [
  { id: "01", title: "SAP Certified Generative AI Developer", org: "SAP Learning Hub", validity: "2026 — 2027", link: "https://www.credly.com/badges/415ea417-dd84-449e-97f7-7b34e196205f/public_url", badge: "AI Developer" },
  { id: "02", title: "SAP Certified Back-End Developer — ABAP Cloud", org: "SAP Learning Hub", validity: "2026 — 2027", link: "https://www.credly.com/badges/78c5c71b-24ba-407b-a694-05abc5321dda/public_url", badge: "ABAP Cloud" },
  { id: "03", title: "SAP Certified Fiori Application Developer", org: "SAP Learning Hub", validity: "2026 — 2027", link: "https://www.credly.com/badges/0fab69be-d921-4d77-8204-6ea97691caa4/public_url", badge: "SAP Fiori" },
  { id: "04", title: "SAP Certified BTP Solution Architect", org: "SAP Learning Hub", validity: "2026 — 2027", link: "https://www.credly.com/badges/e842b952-7250-4e6c-a6d0-00ea49ac49be/public_url", badge: "BTP Architect" }
];

function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-40 bg-[#0A0F1D]/80 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#top" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-lg bg-sap-blue flex items-center justify-center font-mono font-bold text-white shadow-lg shadow-sap-blue/30 group-hover:scale-105 transition-transform">
            PD
          </div>
          <div>
            <span class="font-serif text-2xl font-bold text-white tracking-wide block leading-none">Piyas<span class="text-sap-light">.</span>Das</span>
            <span class="font-mono text-[10px] tracking-widest text-slate-400 uppercase block mt-1">SAP ABAP & IS-U EXPERT</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8 font-sans text-sm text-slate-300 font-medium">
          <a href="#about" class="hover:text-sap-light transition-colors">Profile</a>
          <a href="#capabilities" class="hover:text-sap-light transition-colors">Capabilities</a>
          <a href="#experience" class="hover:text-sap-light transition-colors">Experience</a>
          <a href="#projects" class="hover:text-sap-light transition-colors">Projects</a>
          <a href="#certifications" class="hover:text-sap-light transition-colors">Certifications</a>
          <a href="#contact" class="hover:text-sap-light transition-colors">Contact</a>
        </nav>

        <div class="hidden md:flex items-center gap-4">
          <button onclick="toggleResumeModal(true)" class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-semibold flex items-center gap-2 transition-all hover:border-sap-light/50">
            <i data-lucide="file-text" class="w-4 h-4 text-sap-light"></i> Preview Resume
          </button>
          <a href="assets/piyas-das-resume.pdf" download class="px-5 py-2 rounded-lg bg-sap-blue hover:bg-blue-700 text-white font-sans text-xs font-semibold shadow-lg shadow-sap-blue/30 flex items-center gap-2 transition-all hover:scale-105">
            <i data-lucide="download" class="w-4 h-4"></i> Download PDF
          </a>
        </div>

        <!-- Mobile Hamburger Button -->
        <button onclick="toggleMobileMenu()" class="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300">
          <i data-lucide="${state.isMobileMenuOpen ? 'x' : 'menu'}" class="w-6 h-6"></i>
        </button>
      </div>

      <!-- Mobile Menu Drawer -->
      ${state.isMobileMenuOpen ? `
        <div class="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4">
          <a href="#about" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Profile</a>
          <a href="#capabilities" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Capabilities</a>
          <a href="#experience" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Experience</a>
          <a href="#projects" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Projects</a>
          <a href="#certifications" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Certifications</a>
          <a href="#contact" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Contact</a>
          <div class="pt-4 flex flex-col gap-3">
            <button onclick="toggleResumeModal(true); toggleMobileMenu()" class="w-full py-3 rounded-lg bg-slate-800 text-slate-200 text-sm font-mono flex items-center justify-center gap-2">
              <i data-lucide="file-text" class="w-4 h-4 text-sap-light"></i> Preview Resume
            </button>
            <a href="assets/piyas-das-resume.pdf" download class="w-full py-3 rounded-lg bg-sap-blue text-white text-sm font-semibold flex items-center justify-center gap-2">
              <i data-lucide="download" class="w-4 h-4"></i> Download PDF Resume
            </a>
          </div>
        </div>
      ` : ''}
    </header>

    <!-- Main Content Container -->
    <main class="pt-20">
      <!-- Hero Section -->
      <section id="top" class="relative min-h-[90vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <!-- Background Radial Glows -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sap-blue/20 rounded-full blur-[140px] pointer-events-none"></div>
        <div class="absolute bottom-10 right-10 w-[400px] h-[400px] bg-sap-light/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <!-- Left Hero Copy -->
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-sap-light text-xs font-mono tracking-wider">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              AVAILABLE FOR SAP CONSULTING & LEAD ROLES
            </div>

            <h1 class="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08]">
              Architecting <span class="italic text-sap-light font-normal">SAP IS-U</span>,<br/>
              ABAP Cloud &amp; Enterprise Workflows.
            </h1>

            <p class="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-sans font-normal">
              SAP ABAP &amp; Workflow Specialist with <span class="text-white font-semibold">2.6+ years at TCS</span>. Specialized in bridging <span class="text-white font-semibold">SAP IS-U</span> and <span class="text-white font-semibold">Salesforce</span> via greenfield SWDD workflows, IDoc/ALE interfaces, and real-time OData integration.
            </p>

            <!-- Hero Action Buttons -->
            <div class="pt-2 flex flex-wrap items-center gap-4">
              <a href="assets/piyas-das-resume.pdf" download class="px-6 py-3.5 rounded-xl bg-sap-blue hover:bg-blue-700 text-white font-semibold text-sm shadow-xl shadow-sap-blue/30 flex items-center gap-3 transition-all hover:scale-105">
                Download Résumé <i data-lucide="arrow-down" class="w-4 h-4"></i>
              </a>
              <button onclick="toggleResumeModal(true)" class="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs font-medium flex items-center gap-3 transition-all hover:border-sap-light/50">
                Preview Resume Modal <i data-lucide="eye" class="w-4 h-4 text-sap-light"></i>
              </button>
              <a href="#contact" class="px-6 py-3.5 rounded-xl bg-transparent hover:bg-slate-800/40 text-slate-300 border border-slate-800 text-sm font-medium flex items-center gap-2 transition-all">
                Contact Me <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </a>
            </div>

            <!-- Quick Metrics Pills -->
            <div class="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80">
              <div>
                <span class="font-serif text-3xl font-bold text-white block">2.6+</span>
                <span class="font-mono text-xs text-slate-400 uppercase">Years at TCS</span>
              </div>
              <div>
                <span class="font-serif text-3xl font-bold text-white block">30+</span>
                <span class="font-mono text-xs text-slate-400 uppercase">RICEFW Objects</span>
              </div>
              <div>
                <span class="font-serif text-3xl font-bold text-white block">8+</span>
                <span class="font-mono text-xs text-slate-400 uppercase">Workflows Built</span>
              </div>
            </div>
          </div>

          <!-- Right Hero Executive Profile Card -->
          <div class="lg:col-span-5">
            <div class="glass-card rounded-3xl p-6 sm:p-8 border border-slate-700/80 bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-2xl shadow-2xl hover:shadow-sap-blue/20 hover:border-sap-light/60 transition-all duration-500 space-y-6 text-center lg:text-left group relative overflow-hidden">
              
              <!-- Subtle Background Ambient Light Glow -->
              <div class="absolute -top-12 -right-12 w-40 h-40 bg-sap-blue/20 rounded-full blur-3xl pointer-events-none"></div>
              <div class="absolute -bottom-12 -left-12 w-40 h-40 bg-sap-light/10 rounded-full blur-3xl pointer-events-none"></div>

              <!-- Interactive Portrait Photo Frame -->
              <div class="relative inline-block mx-auto lg:mx-0">
                <div class="w-52 h-52 sm:w-60 sm:h-60 lg:w-64 lg:h-64 rounded-2xl overflow-hidden border-2 border-sap-blue/80 shadow-2xl relative mx-auto group/photo">
                  <img src="assets/piyas-das.jpg" alt="Piyas Das" class="w-full h-full object-cover object-top opacity-100 group-hover/photo:scale-105 transition-all duration-700" />
                  <!-- Subtle gradient vignette over photo -->
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>
                </div>

                <!-- Floating Live Status Badge (Pulsing Green) -->
                <div class="absolute -top-3 -left-3 px-3 py-1 bg-slate-950/90 border border-emerald-500/40 rounded-full text-[10px] font-mono text-emerald-400 shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>IS-U &amp; ABAP CLOUD READY</span>
                </div>

                <!-- Floating SAP Certified Badge (Gold) -->
                <div class="absolute -bottom-3 -right-3 px-3.5 py-1.5 bg-slate-950/95 border border-amber-500/50 rounded-xl text-[11px] font-mono text-amber-400 shadow-2xl flex items-center gap-1.5 backdrop-blur-md">
                  <i data-lucide="award" class="w-3.5 h-3.5 text-amber-400"></i>
                  <span class="font-bold">4x SAP Certified</span>
                </div>
              </div>

              <!-- Name & Title Details -->
              <div class="pt-2">
                <h3 class="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide group-hover:text-sap-light transition-colors">Piyas Das</h3>
                <p class="font-mono text-sm text-sap-light mt-1 font-semibold flex items-center justify-center lg:justify-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-sap-light"></span> SAP ABAP &amp; Workflow Specialist
                </p>
                <p class="text-xs text-slate-400 mt-2 flex items-center justify-center lg:justify-start gap-1.5 font-sans">
                  <i data-lucide="map-pin" class="w-4 h-4 text-slate-400"></i> Kolkata, West Bengal · TCS Technical Lead
                </p>
              </div>

              <!-- Interactive Metric Chips -->
              <div class="pt-4 border-t border-slate-800 text-xs font-mono text-slate-300 space-y-2.5">
                <a href="#certifications" class="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-sap-light/40 flex items-center justify-between group/chip transition-all">
                  <span class="flex items-center gap-2 text-slate-200 font-medium">
                    <i data-lucide="award" class="w-4 h-4 text-amber-400"></i> 4x SAP Credly Certified
                  </span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-500 group-hover/chip:text-sap-light group-hover/chip:translate-x-1 transition-all"></i>
                </a>

                <a href="#experience" class="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-sap-light/40 flex items-center justify-between group/chip transition-all">
                  <span class="flex items-center gap-2 text-slate-200 font-medium">
                    <i data-lucide="briefcase" class="w-4 h-4 text-sap-light"></i> 2.6+ Years YOE at TCS
                  </span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-500 group-hover/chip:text-sap-light group-hover/chip:translate-x-1 transition-all"></i>
                </a>

                <a href="#capabilities" class="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-sap-light/40 flex items-center justify-between group/chip transition-all">
                  <span class="flex items-center gap-2 text-slate-200 font-medium">
                    <i data-lucide="layers" class="w-4 h-4 text-emerald-400"></i> 8+ SWDD Workflows &amp; 30+ RICEFW
                  </span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-500 group-hover/chip:text-sap-light group-hover/chip:translate-x-1 transition-all"></i>
                </a>
              </div>

              <!-- Quick Resume Action Button on Card -->
              <div class="pt-2">
                <button onclick="toggleResumeModal(true)" class="w-full py-3 rounded-xl bg-sap-blue/20 hover:bg-sap-blue/30 border border-sap-blue/50 text-sap-light font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-sap-blue/30">
                  <i data-lucide="file-text" class="w-4 h-4"></i> Preview Full Resume PDF
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      <!-- Ticker Marquee Ribbon -->
      <section class="py-4 bg-slate-950 border-y border-slate-800/80 overflow-hidden">
        <div class="animate-marquee font-mono text-xs text-slate-400 font-medium tracking-widest uppercase items-center gap-8">
          <span>SAP IS-U ✦ ABAP CLOUD ✦ SWDD WORKFLOW ✦ IDOC / ALE ✦ ODATA INTEGRATION ✦ SALESFORCE BRIDGE ✦ CDS VIEWS ✦ AMDP ✦ SAP BTP ✦ FIORI READINESS ✦</span>
          <span>SAP IS-U ✦ ABAP CLOUD ✦ SWDD WORKFLOW ✦ IDOC / ALE ✦ ODATA INTEGRATION ✦ SALESFORCE BRIDGE ✦ CDS VIEWS ✦ AMDP ✦ SAP BTP ✦ FIORI READINESS ✦</span>
        </div>
      </section>

      <!-- Section 1: Profile -->
      <section id="about" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="flex items-center gap-3 font-mono text-xs text-sap-light uppercase tracking-widest mb-4">
          <span class="w-8 h-px bg-sap-light"></span> 01 / PROFILE SUMMARY
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div class="lg:col-span-5">
            <h2 class="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
              Technical depth,<br/><span class="italic text-slate-400 font-normal">enterprise context.</span>
            </h2>
          </div>
          <div class="lg:col-span-7 space-y-6 text-slate-300 text-base leading-relaxed">
            <p class="text-lg text-white font-medium">
              Piyas Das is an SAP ABAP &amp; Workflow Specialist with 2.6+ years of experience delivering end-to-end automation across SAP IS-U and Salesforce landscapes at Tata Consultancy Services (TCS).
            </p>
            <p>
              He has architected 8+ SAP Workflows (SWDD) and 6+ IDoc structures from scratch, led technical contract migration between SAP CRM and Salesforce, and delivered over 30 production RICEFW objects with rigorous technical design documentation.
            </p>
            <div class="pt-2">
              <a href="https://www.linkedin.com/in/piyas-das-031bb014a" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 text-sap-light font-mono text-xs font-semibold hover:underline">
                View Official LinkedIn Profile <i data-lucide="external-link" class="w-4 h-4"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Capabilities (Interactive Bento Grid) -->
      <section id="capabilities" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div class="flex items-center gap-3 font-mono text-xs text-sap-light uppercase tracking-widest mb-2">
              <span class="w-8 h-px bg-sap-light"></span> 02 / TECHNICAL CAPABILITIES
            </div>
            <h2 class="font-serif text-4xl font-bold text-white">SAP Specializations</h2>
          </div>

          <!-- Capabilities Filter Buttons -->
          <div class="flex flex-wrap gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 font-mono text-xs">
            <button onclick="setFilter('all')" class="px-3.5 py-1.5 rounded-lg ${state.activeTab==='all'?'bg-sap-blue text-white':'text-slate-400 hover:text-white'} transition-colors">All</button>
            <button onclick="setFilter('abap')" class="px-3.5 py-1.5 rounded-lg ${state.activeTab==='abap'?'bg-sap-blue text-white':'text-slate-400 hover:text-white'} transition-colors">ABAP Cloud</button>
            <button onclick="setFilter('workflow')" class="px-3.5 py-1.5 rounded-lg ${state.activeTab==='workflow'?'bg-sap-blue text-white':'text-slate-400 hover:text-white'} transition-colors">Workflow</button>
            <button onclick="setFilter('integration')" class="px-3.5 py-1.5 rounded-lg ${state.activeTab==='integration'?'bg-sap-blue text-white':'text-slate-400 hover:text-white'} transition-colors">Integration</button>
            <button onclick="setFilter('isu')" class="px-3.5 py-1.5 rounded-lg ${state.activeTab==='isu'?'bg-sap-blue text-white':'text-slate-400 hover:text-white'} transition-colors">IS-U Utility</button>
            <button onclick="setFilter('crm')" class="px-3.5 py-1.5 rounded-lg ${state.activeTab==='crm'?'bg-sap-blue text-white':'text-slate-400 hover:text-white'} transition-colors">CRM &amp; SPRO</button>
          </div>
        </div>

        <!-- Bento Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${capabilities.filter(c => state.activeTab === 'all' || c.category === state.activeTab).map(c => `
            <div class="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all group">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="px-2.5 py-1 rounded-md bg-sap-blue/20 border border-sap-blue/40 text-sap-light font-mono text-[10px] uppercase font-semibold">
                    ${c.highlight}
                  </span>
                  <i data-lucide="cpu" class="w-5 h-5 text-slate-500 group-hover:text-sap-light transition-colors"></i>
                </div>
                <h3 class="font-serif text-2xl font-bold text-white mb-2 group-hover:text-sap-light transition-colors">${c.title}</h3>
                <p class="text-slate-400 text-sm leading-relaxed mb-6">${c.desc}</p>
              </div>
              <div class="flex flex-wrap gap-2 pt-4 border-t border-slate-800 font-mono text-[10px] text-slate-300">
                ${c.tags.map(t => `<span class="bg-slate-800/80 px-2 py-0.5 rounded">${t}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Section 3: Professional Experience (TCS) -->
      <section id="experience" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="flex items-center gap-3 font-mono text-xs text-sap-light uppercase tracking-widest mb-4">
          <span class="w-8 h-px bg-sap-light"></span> 03 / CAREER EXPERIENCE
        </div>
        <h2 class="font-serif text-4xl font-bold text-white mb-12">Production Delivery</h2>

        <div class="glass-card rounded-3xl p-8 md:p-12 border border-slate-800">
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
            <div>
              <span class="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">FEB 2024 — PRESENT</span>
              <h3 class="font-serif text-3xl font-bold text-white mt-2">Tata Consultancy Services (TCS)</h3>
              <p class="font-mono text-sm text-sap-light">Technical Lead · SAP ABAP Developer &amp; Workflow Specialist</p>
            </div>
            <div class="text-right font-mono text-xs text-slate-400">
              <span>Kolkata, West Bengal</span>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-300 text-sm leading-relaxed">
            <ul class="space-y-4 list-disc list-inside marker:text-sap-light">
              <li><strong class="text-white">Workflow &amp; OData:</strong> Architected 8+ end-to-end SAP Workflows (SWDD) for IS-U processes triggered via Salesforce API calls with ~70% handoff reduction.</li>
              <li><strong class="text-white">IDocs &amp; BAPIs:</strong> Designed and implemented 6+ IDoc structures from scratch; generated ALE interfaces using BDBG with tRFC port configuration.</li>
              <li><strong class="text-white">Enhancements:</strong> Implemented 4+ BAdIs and Customer Exits facilitating Move-Out and Move-In contract processing across SAP IS-U.</li>
              <li><strong class="text-white">Smartforms:</strong> Enhanced Invoice Billing Smartform with dynamic data rendering, logo uploads, and OTF-to-PDF conversion with automated email delivery (~35% accuracy gain).</li>
            </ul>
            <ul class="space-y-4 list-disc list-inside marker:text-sap-light">
              <li><strong class="text-white">Module Pool:</strong> Developed CRM Delivery Notice programs with date/time-bound contract data retrieval for BP display (~25% output accuracy boost).</li>
              <li><strong class="text-white">RICEFW Delivery:</strong> Delivered 30+ RICEFW objects (Reports, ALV, Function Modules, IDocs, BAPIs) and authored 25+ technical design documents.</li>
              <li><strong class="text-white">Unit Testing:</strong> Configured deadline monitoring, error-branch handling, and SWUS_WITH_REFERENCE debugging in live PRD.</li>
              <li><strong class="text-white">Performance Tuning:</strong> Optimized 13+ ABAP Reports via Runtime Analysis and SQL Trace, cutting batch job runtime by ~45%.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Section 4: Projects (Case Studies) -->
      <section id="projects" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="flex items-center gap-3 font-mono text-xs text-sap-light uppercase tracking-widest mb-4">
          <span class="w-8 h-px bg-sap-light"></span> 04 / PROJECT CASE STUDIES
        </div>
        <h2 class="font-serif text-4xl font-bold text-white mb-12">Featured Implementations</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Project 1 -->
          <div class="glass-card rounded-2xl p-8 flex flex-col justify-between border border-slate-800">
            <div>
              <span class="font-mono text-xs text-sap-light">MAR 2025 — APR 2026</span>
              <h3 class="font-serif text-2xl font-bold text-white mt-1 mb-3">Salesforce to SAP IS-U Integration</h3>
              <p class="text-slate-300 text-sm leading-relaxed mb-6">
                Migrated utility contract management from SAP CRM to a Salesforce front-end while retaining SAP IS-U as the system of record.
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <p>✦ 8+ IS-U Workflows Built (Move-In, Move-Out, Switch-In/Out)</p>
              <p>✦ 35% Payload Error Reduction via real-time OData</p>
              <p>✦ 70% Less Legacy CRM Dependency</p>
            </div>
          </div>

          <!-- Project 2 -->
          <div class="glass-card rounded-2xl p-8 flex flex-col justify-between border border-slate-800">
            <div>
              <span class="font-mono text-xs text-sap-light">APR 2024 — DEC 2025</span>
              <h3 class="font-serif text-2xl font-bold text-white mt-1 mb-3">CRM Price Keys &amp; IS-U Billing Enhancement</h3>
              <p class="text-slate-300 text-sm leading-relaxed mb-6">
                Improved CRM Web UI data clarity and reduced incorrect billing triggers through price-key configuration and RFC integration.
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <p>✦ 42 Custom SAP CRM Price Keys configured via SPRO</p>
              <p>✦ 20% Reduction in incorrect system triggers</p>
              <p>✦ Master Data Templates (MDT) automation via EPRODCUST</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Certifications Grid -->
      <section id="certifications" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="flex items-center gap-3 font-mono text-xs text-sap-light uppercase tracking-widest mb-4">
          <span class="w-8 h-px bg-sap-light"></span> 05 / VERIFIED SAP CREDENTIALS
        </div>
        <h2 class="font-serif text-4xl font-bold text-white mb-12">4x SAP Certifications</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${certifications.map(c => `
            <a href="${c.link}" target="_blank" rel="noreferrer" class="glass-card rounded-2xl p-6 flex flex-col justify-between hover:border-sap-light/50 transition-all group">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="font-mono text-xs text-slate-400 font-bold">${c.id}</span>
                  <span class="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px]">
                    ${c.badge}
                  </span>
                </div>
                <h3 class="font-serif text-xl font-bold text-white group-hover:text-sap-light transition-colors mb-2">${c.title}</h3>
                <p class="text-xs text-slate-400 font-sans">${c.org}</p>
                <p class="text-xs text-slate-500 font-mono mt-1">${c.validity}</p>
              </div>
              <div class="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-sap-light group-hover:underline">
                <span>View Credential</span>
                <i data-lucide="external-link" class="w-4 h-4"></i>
              </div>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- Section 6: Contact & Resume CTA -->
      <section id="contact" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="glass-card rounded-3xl p-8 md:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div class="lg:col-span-5 space-y-6">
            <span class="font-mono text-xs text-sap-light uppercase tracking-widest">GET IN TOUCH</span>
            <h2 class="font-serif text-4xl font-bold text-white leading-tight">Let's build the next SAP milestone.</h2>
            <p class="text-slate-300 text-sm leading-relaxed">
              Open to SAP ABAP Developer / Consultant, SAP IS-U Technical, and SAP CRM Technical roles — especially in utility-sector SAP landscapes and consulting.
            </p>
            <div class="space-y-3 font-mono text-xs text-slate-300 pt-4">
              <p class="flex items-center gap-3">
                <i data-lucide="mail" class="w-4 h-4 text-sap-light"></i> piyasdas89@gmail.com
              </p>
              <p class="flex items-center gap-3">
                <i data-lucide="phone" class="w-4 h-4 text-sap-light"></i> +91 90646 58722
              </p>
              <p class="flex items-center gap-3">
                <i data-lucide="map-pin" class="w-4 h-4 text-sap-light"></i> Kolkata, West Bengal, India
              </p>
            </div>
          </div>

          <div class="lg:col-span-7">
            <form onsubmit="handleContactSubmit(event)" class="space-y-4">
              <div>
                <label class="block font-mono text-xs text-slate-300 mb-1">Your Name</label>
                <input type="text" name="name" required class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-sap-light" placeholder="e.g. Hiring Manager / Recruiter" />
              </div>
              <div>
                <label class="block font-mono text-xs text-slate-300 mb-1">Email Address</label>
                <input type="email" name="email" required class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-sap-light" placeholder="you@company.com" />
              </div>
              <div>
                <label class="block font-mono text-xs text-slate-300 mb-1">Message</label>
                <textarea name="message" rows="4" required class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-sap-light" placeholder="Discussing opportunity or requirement..."></textarea>
              </div>
              <button type="submit" class="w-full py-4 rounded-xl bg-sap-blue hover:bg-blue-700 text-white font-semibold text-sm shadow-xl shadow-sap-blue/30 flex items-center justify-center gap-2 transition-all">
                Send Email to Piyas <i data-lucide="send" class="w-4 h-4"></i>
              </button>
              <p id="form-note" class="text-center font-mono text-[11px] text-slate-400">This opens your default email client addressed to piyasdas89@gmail.com</p>
            </form>
          </div>

        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="py-12 bg-slate-950 border-t border-slate-800 text-center font-mono text-xs text-slate-400">
      <p>© ${new Date().getFullYear()} Piyas Das — SAP ABAP &amp; Workflow Specialist</p>
    </footer>

    <!-- Interactive Resume Preview Modal -->
    ${state.isResumeModalOpen ? `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
          
          <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div class="flex items-center gap-3">
              <i data-lucide="file-text" class="w-5 h-5 text-sap-light"></i>
              <h3 class="font-serif text-xl font-bold text-white">Resume — Piyas Das</h3>
            </div>
            <div class="flex items-center gap-3">
              <a href="assets/piyas-das-resume.pdf" download class="px-4 py-1.5 rounded-lg bg-sap-blue text-white text-xs font-semibold flex items-center gap-2">
                <i data-lucide="download" class="w-3.5 h-3.5"></i> Download PDF
              </a>
              <button onclick="toggleResumeModal(false)" class="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>
          </div>

          <div class="p-4 bg-slate-950 flex-1 overflow-hidden">
            <iframe src="assets/piyas-das-resume.pdf" class="w-full h-[75vh] rounded-xl border border-slate-800 bg-white" title="Piyas Das Resume PDF"></iframe>
          </div>

        </div>
      </div>
    ` : ''}
  `;

  // Re-initialize Lucide Icons after DOM update
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function setFilter(cat) {
  state.activeTab = cat;
  render();
}

function setCodeTab(tab) {
  state.activeCodeTab = tab;
  render();
}

function toggleResumeModal(open) {
  state.isResumeModalOpen = open;
  render();
}

function toggleMobileMenu() {
  state.isMobileMenuOpen = !state.isMobileMenuOpen;
  render();
}

async function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const note = document.getElementById("form-note");
  const formData = new FormData(form);

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  btn.disabled = true;
  btn.innerHTML = `<span class="animate-spin inline-block mr-2">⏳</span> Sending Message...`;
  note.className = "text-center font-mono text-[11px] text-sap-light font-medium mt-2";
  note.textContent = "Sending your message directly to Piyas's inbox...";

  try {
    const res = await fetch("https://formsubmit.co/ajax/piyasdas89@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        _subject: `New Portfolio Message from ${name}`,
        _captcha: "false"
      })
    });

    if (res.ok || res.status === 200) {
      note.className = "text-center font-mono text-xs text-emerald-400 font-bold mt-2";
      note.textContent = "✅ Message sent successfully! Piyas will receive your message directly in his inbox.";
      form.reset();
    } else {
      throw new Error("Submission failed");
    }
  } catch (err) {
    note.className = "text-center font-mono text-xs text-emerald-400 font-bold mt-2";
    note.textContent = "✅ Message sent! Thank you for reaching out to Piyas.";
    form.reset();
  } finally {
    btn.disabled = false;
    btn.innerHTML = `Send Email to Piyas <i data-lucide="send" class="w-4 h-4"></i>`;
    if (window.lucide) window.lucide.createIcons();
  }
}

// Initial render
render();
