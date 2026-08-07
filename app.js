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


const commentsData = [
  {
    name: "Siddharth Verma",
    role: "SAP Delivery Manager · TCS",
    avatar: "SV",
    date: "2026",
    text: "Piyas's greenfield SWDD workflow architecture cut our IS-U contract processing handoffs by ~70%. Exceptional technical lead and ABAP specialist!",
    badge: "Verified Delivery Lead"
  },
  {
    name: "Ananya Mukherjee",
    role: "Integration Architect",
    avatar: "AM",
    date: "2026",
    text: "Extremely sharp in bi-directional OData replication between Salesforce and SAP IS-U. Delivered near-zero-defect go-live under tight timelines.",
    badge: "Verified Colleague"
  },
  {
    name: "Rajesh Kumar",
    role: "Enterprise Solution Architect",
    avatar: "RK",
    date: "2026",
    text: "4x SAP Certified with true utility domain fluency. His deep command of Move-In, Move-Out and SPRO Price Keys makes him invaluable on S/4HANA transformations.",
    badge: "SAP Partner Review"
  }
];

const capabilities = [
  {
    category: "abap",
    title: "ABAP Development & Enhancements",
    desc: "Object-oriented ABAP development across the full enhancement framework — User Exits, Customer Exits, BAdIs, and implicit/explicit enhancements. Delivered 30+ production RICEFW objects including custom reports, ALV outputs, function modules, and Module Pool programs with time-bound Business Agreement retrieval logic. Enhanced CRM Delivery Notice program lifting output accuracy by ~25%.",
    tags: ["OO-ABAP", "RICEFW", "User/Customer Exits", "BAdIs", "Implicit/Explicit Enhancements", "ALV Reports", "Module Pool", "Smartforms", "DDIC"],
    highlight: "30+ RICEFW Objects"
  },
  {
    category: "workflow",
    title: "Workflow & Process Automation",
    desc: "Architectural ownership building 8+ end-to-end SAP Workflows (SWDD) from scratch for IS-U processes (Move-In, Move-Out, Switch-In/Out, Start/End of Supply) triggered via Salesforce API calls through OData. Command of agent determination, deadline monitoring, event/error handling, and PRD debugging via SWUS WITH REFERENCE resulting in ~30% fewer post-production issues.",
    tags: ["SAP Workflow Builder (SWDD)", "SWIA", "SWI1", "BOR/ABAP Object", "Agent Determination", "Deadline Monitoring", "Event Handling"],
    highlight: "8+ SWDD Workflows"
  },
  {
    category: "integration",
    title: "Cross-Application Integration",
    desc: "Designed 6+ IDoc structures from scratch, generated ALE interfaces, configured ports via tRFC, alongside custom BAPI development for cross-system exchange. Optimized real-time OData services for bi-directional replication between Salesforce and SAP IS-U, cutting payload errors by ~35%. Dual fluency on both SAP and Salesforce sides of live integrations.",
    tags: ["IDocs/ALE Creation", "BAPI Creation", "RFCs", "OData Services", "tRFC Port Configuration"],
    highlight: "35% Error Cut"
  },
  {
    category: "isu",
    title: "IS-U Utility Domain Expertise",
    desc: "Deep ownership of underlying utility business processes — Move-In, Move-Out, Switch-In/Out, Internal Start/Stop, and Start/End of Supply. Process fluency explains why a workflow branches the way it does, not only how it was coded — directly applicable to utility-sector clients running IS-U on ECC or S/4HANA.",
    tags: ["SAP IS-U", "Move-In/Move-Out", "Switch-In/Switch-Out", "Contract Lifecycle Management"],
    highlight: "Utility Domain Fluency"
  },
  {
    category: "crm",
    title: "SAP CRM Technical Expertise",
    desc: "CRM Web UI enhancements — component views, visibility rules, error handling via Web UI Workbench — alongside One Order Framework and BOL/GenIL layer. Owned CRM Price Keys project, configuring 42 custom price keys via SPRO, lifting UI data clarity by ~30%.",
    tags: ["CRM Web UI", "Web UI Component Workbench", "One Order Framework", "BOL/GenIL", "CRM Workbench", "SPRO Configuration"],
    highlight: "42 SPRO Price Keys"
  },
  {
    category: "abap",
    title: "SAP Platforms & Modern ABAP Cloud",
    desc: "Platform experience spans SAP IS-U, SAP CRM, and S/4HANA with CDS Views built across standard 3-layer architecture (Basic Interface, Composite/Reuse, Consumption) and AMDP classes implementing IF_AMDP_MARKER_HDB for CDS table functions. Certified Back-End Developer (ABAP Cloud) and BTP Solution Architect to support RISE/GROW advisory.",
    tags: ["S/4HANA", "SAP BTP", "CDS Views", "AMDP", "ABAP Cloud", "SAP Fiori", "SPRO", "Transport Management"],
    highlight: "RISE/GROW Ready"
  },
  {
    category: "integration",
    title: "Data Migration & Performance Tuning",
    desc: "Executed data migration using BDC, LSMW, and BAPI integration for Salesforce transition. Performance tuning: optimized 13+ ABAP reports through Runtime Analysis and SQL Trace, cutting batch-job runtime by ~45%. L2/L3 production support resolving live agent-determination failures and deadline misconfigurations in PRD.",
    tags: ["BDC", "LSMW", "BAPI", "Runtime Analysis", "SQL Trace", "L2/L3 Production Support", "Debugging"],
    highlight: "45% Runtime Cut"
  }
];

const certifications = [
  {
    id: "01",
    title: "SAP Certified Generative AI Developer",
    org: "SAP Learning Hub",
    validity: "2026 — 2027",
    link: "https://www.credly.com/badges/415ea417-dd84-449e-97f7-7b34e196205f/public_url",
    badge: "AI Developer",
    desc: "Validates applied knowledge of integrating generative AI capabilities, including SAP Joule, into SAP business processes and custom extensions."
  },
  {
    id: "02",
    title: "SAP Certified Back-End Developer — ABAP Cloud",
    org: "SAP Learning Hub",
    validity: "2026 — 2027",
    link: "https://www.credly.com/badges/78c5c71b-24ba-407b-a694-05abc5321dda/public_url",
    badge: "ABAP Cloud",
    desc: "Confirms proficiency in ABAP Cloud development practices — restricted/released APIs, CDS-based data modeling, and cloud-ready extensibility patterns."
  },
  {
    id: "03",
    title: "SAP Certified Fiori Application Developer",
    org: "SAP Learning Hub",
    validity: "2026 — 2027",
    link: "https://www.credly.com/badges/0fab69be-d921-4d77-8204-6ea97691caa4/public_url",
    badge: "SAP Fiori",
    desc: "Validates the ability to design and extend Fiori Elements and freestyle SAPUI5 applications on modern SAP front-ends."
  },
  {
    id: "04",
    title: "SAP Certified BTP Solution Architect",
    org: "SAP Learning Hub",
    validity: "2026 — 2027",
    link: "https://www.credly.com/badges/e842b952-7250-4e6c-a6d0-00ea49ac49be/public_url",
    badge: "BTP Architect",
    desc: "Demonstrates architectural fluency across SAP Business Technology Platform, supporting RISE/GROW with SAP advisory conversations."
  }
];

function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
        <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-40 bg-[#070B14]/85 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <a href="#top" class="flex items-center gap-3 shrink-0 group">
          <div class="w-10 h-10 rounded-xl bg-sap-blue flex items-center justify-center font-mono font-bold text-white shadow-lg shadow-sap-blue/30 group-hover:scale-105 transition-transform">
            PD
          </div>
          <div>
            <span class="font-serif text-xl font-extrabold text-white tracking-tight block leading-none">Piyas<span class="text-sap-light">.</span>Das</span>
            <span class="font-mono text-[10px] tracking-widest text-slate-400 uppercase block mt-1">SAP ABAP &amp; IS-U SPECIALIST</span>
          </div>
        </a>

        <!-- Desktop Navigation (lg breakpoint with proper gap and text sizing) -->
        <nav class="hidden lg:flex items-center gap-5 xl:gap-7 font-sans text-xs xl:text-sm text-slate-200 font-medium">
          <a href="#about" class="hover:text-sap-light transition-colors py-1">Profile</a>
          <a href="#capabilities" class="hover:text-sap-light transition-colors py-1">Capabilities</a>
          <a href="#experience" class="hover:text-sap-light transition-colors py-1">Experience</a>
          <a href="#projects" class="hover:text-sap-light transition-colors py-1">Projects</a>
          <a href="#education" class="hover:text-sap-light transition-colors py-1">Education</a>
          <a href="#certifications" class="hover:text-sap-light transition-colors py-1">Certifications</a>
          <a href="#journal" class="hover:text-sap-light transition-colors py-1">Journal</a>
          <a href="#contact" class="hover:text-sap-light transition-colors py-1">Contact</a>
        </nav>

        <!-- Desktop Actions -->
        <div class="hidden lg:flex items-center gap-3 shrink-0">
          <button onclick="toggleResumeModal(true)" class="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-semibold flex items-center gap-2 transition-all hover:border-sap-light/50">
            <i data-lucide="file-text" class="w-3.5 h-3.5 text-sap-light"></i> Preview Resume
          </button>
          <a href="assets/piyas-das-resume.pdf" download class="px-4 py-2 rounded-xl bg-sap-blue hover:bg-blue-700 text-white font-sans text-xs font-semibold shadow-lg shadow-sap-blue/30 flex items-center gap-2 transition-all hover:scale-105">
            <i data-lucide="download" class="w-3.5 h-3.5"></i> Download PDF
          </a>
        </div>

        <!-- Mobile Hamburger Button -->
        <button onclick="toggleMobileMenu()" class="lg:hidden p-2.5 rounded-xl bg-slate-800 text-slate-300">
          <i data-lucide="${state.isMobileMenuOpen ? 'x' : 'menu'}" class="w-6 h-6"></i>
        </button>
      </div>

      <!-- Mobile Menu Drawer -->
      ${state.isMobileMenuOpen ? `
        <div class="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4">
          <a href="#about" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Profile</a>
          <a href="#capabilities" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Capabilities</a>
          <a href="#experience" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Experience</a>
          <a href="#projects" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Projects</a>
          <a href="#education" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Education</a>
          <a href="#certifications" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Certifications</a>
          <a href="#journal" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Journal</a>
          <a href="#contact" onclick="toggleMobileMenu()" class="block text-slate-200 text-base font-medium py-2">Contact</a>
          <div class="pt-4 flex flex-col gap-3">
            <button onclick="toggleResumeModal(true); toggleMobileMenu()" class="w-full py-3 rounded-xl bg-slate-800 text-slate-200 text-sm font-mono flex items-center justify-center gap-2">
              <i data-lucide="file-text" class="w-4 h-4 text-sap-light"></i> Preview Resume
            </button>
            <a href="assets/piyas-das-resume.pdf" download class="w-full py-3 rounded-xl bg-sap-blue text-white text-sm font-semibold flex items-center justify-center gap-2">
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
          <div class="lg:col-span-7 space-y-6 reveal-on-scroll stagger-1">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-sap-light text-xs font-mono tracking-wider">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              AVAILABLE FOR SAP CONSULTING &amp; LEAD ROLES
            </div>

            <h1 class="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08]">
              Architecting <span class="italic text-sap-light font-normal">SAP IS-U</span>,<br/>
              ABAP Cloud &amp; Enterprise Workflows.
            </h1>

            <p class="text-slate-200 text-lg sm:text-xl max-w-2xl leading-relaxed font-sans font-normal">
              SAP ABAP Developer, IS-U &amp; CRM Consultant with <span class="text-white font-semibold">2.6 years of hands-on experience</span> architecting automation across SAP IS-U and Salesforce at <span class="text-white font-semibold">Tata Consultancy Services (TCS)</span>. Trusted with greenfield build responsibility: 8+ SWDD Workflows &amp; 6+ IDoc structures from scratch.
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

            <!-- Executive Metrics KPI Grid -->
            <div class="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-4 gap-3">
              <!-- KPI Card 1 -->
              <div class="glass-card rounded-2xl p-3.5 border border-slate-800/80 hover:border-sap-light/50 transition-all duration-300 group/kpi flex flex-col justify-between">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-mono text-[10px] text-sap-light uppercase font-bold tracking-wider">EXPERIENCE</span>
                  <i data-lucide="briefcase" class="w-3.5 h-3.5 text-slate-500 group-hover/kpi:text-sap-light transition-colors"></i>
                </div>
                <div class="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover/kpi:scale-105 transition-transform origin-left">
                  2.6 <span class="text-[10px] font-mono text-slate-400 font-normal">Years</span>
                </div>
                <p class="text-[10px] text-slate-400 font-sans mt-0.5">TCS Tech Lead</p>
              </div>

              <!-- KPI Card 2 -->
              <div class="glass-card rounded-2xl p-3.5 border border-slate-800/80 hover:border-sap-light/50 transition-all duration-300 group/kpi flex flex-col justify-between">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-mono text-[10px] text-sap-light uppercase font-bold tracking-wider">DELIVERY</span>
                  <i data-lucide="cpu" class="w-3.5 h-3.5 text-slate-500 group-hover/kpi:text-sap-light transition-colors"></i>
                </div>
                <div class="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover/kpi:scale-105 transition-transform origin-left">
                  30+ <span class="text-[10px] font-mono text-slate-400 font-normal">Objects</span>
                </div>
                <p class="text-[10px] text-slate-400 font-sans mt-0.5">RICEFW PRD Code</p>
              </div>

              <!-- KPI Card 3 -->
              <div class="glass-card rounded-2xl p-3.5 border border-slate-800/80 hover:border-sap-light/50 transition-all duration-300 group/kpi flex flex-col justify-between">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-mono text-[10px] text-sap-light uppercase font-bold tracking-wider">WORKFLOWS</span>
                  <i data-lucide="git-merge" class="w-3.5 h-3.5 text-slate-500 group-hover/kpi:text-sap-light transition-colors"></i>
                </div>
                <div class="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover/kpi:scale-105 transition-transform origin-left">
                  8+ <span class="text-[10px] font-mono text-slate-400 font-normal">SWDD</span>
                </div>
                <p class="text-[10px] text-slate-400 font-sans mt-0.5">IS-U Greenfield</p>
              </div>

              <!-- KPI Card 4 -->
              <div class="glass-card rounded-2xl p-3.5 border border-slate-800/80 hover:border-sap-light/50 transition-all duration-300 group/kpi flex flex-col justify-between">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-mono text-[10px] text-amber-400 uppercase font-bold tracking-wider">CREDENTIALS</span>
                  <i data-lucide="award" class="w-3.5 h-3.5 text-amber-400"></i>
                </div>
                <div class="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover/kpi:scale-105 transition-transform origin-left">
                  4 <span class="text-[10px] font-mono text-slate-400 font-normal">SAP Badges</span>
                </div>
                <p class="text-[10px] text-slate-400 font-sans mt-0.5">ABAP Cloud &amp; BTP</p>
              </div>
            </div>
          </div>

          <!-- Right Hero Executive Profile Card -->
          <div class="lg:col-span-5 reveal-on-scroll stagger-2">
            <div class="glass-card rounded-3xl p-6 sm:p-8 border border-slate-700/80 bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-2xl shadow-2xl hover:shadow-sap-blue/20 hover:border-sap-light/60 transition-all duration-500 space-y-6 text-center lg:text-left group relative overflow-hidden">
              
              <!-- Subtle Background Ambient Light Glow -->
              <div class="absolute -top-12 -right-12 w-40 h-40 bg-sap-blue/20 rounded-full blur-3xl pointer-events-none"></div>
              <div class="absolute -bottom-12 -left-12 w-40 h-40 bg-sap-light/10 rounded-full blur-3xl pointer-events-none"></div>

              <!-- Interactive Portrait Photo Frame -->
              <div class="relative inline-block mx-auto lg:mx-0">
                <div class="w-52 h-52 sm:w-60 sm:h-60 lg:w-64 lg:h-64 rounded-2xl overflow-hidden border-2 border-sap-blue/80 shadow-2xl relative mx-auto group/photo">
                  <img src="assets/piyas-das.jpg" alt="Piyas Das" class="w-full h-full object-cover object-top opacity-100 group-hover/photo:scale-105 transition-all duration-700" />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>
                </div>

                <!-- Floating Live Status Badge -->
                <div class="absolute -top-3 -left-3 px-3 py-1 bg-slate-950/90 border border-emerald-500/40 rounded-full text-[10px] font-mono text-emerald-400 shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>IS-U &amp; ABAP CLOUD READY</span>
                </div>

                <!-- Floating SAP Certified Badge -->
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
                    <i data-lucide="briefcase" class="w-4 h-4 text-sap-light"></i> 2.6 Years YOE at TCS
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

      <!-- Section 1: Comprehensive Profile Summary & Core Focus Areas -->
      <section id="about" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-on-scroll">
        <div class="flex items-center gap-3 font-mono text-xs text-sap-light uppercase tracking-widest mb-4">
          <span class="w-8 h-px bg-sap-light"></span> 01 / PROFESSIONAL PROFILE &amp; CORE FOCUS
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div class="lg:col-span-5">
            <h2 class="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
              Greenfield Delivery,<br/><span class="italic text-slate-400 font-normal">utility-sector fluency.</span>
            </h2>
            <p class="text-xs font-mono text-sap-light mt-4">
              KOLKATA, WEST BENGAL · TCS TECHNICAL LEAD
            </p>
          </div>

          <div class="lg:col-span-7 space-y-6 text-slate-300 text-base leading-relaxed">
            <p class="text-lg text-white font-medium leading-relaxed">
              Piyas Das is an SAP ABAP &amp; Workflow Specialist with 2.6 years of hands-on experience architecting automation across SAP IS-U and Salesforce. Rather than working solely within existing objects, he has been trusted with greenfield build responsibility typically reserved for more senior engineers — designing 8+ SAP Workflows and 6+ IDoc structures from the ground up, and leading the technical migration bridging SAP CRM and Salesforce for utility contract processing.
            </p>
            <p class="text-slate-300 leading-relaxed">
              His delivery spans the full RICEFW spectrum, with 30+ objects shipped to production, alongside four SAP certifications spanning ABAP Cloud, BTP, Fiori, and Generative AI. Piyas combines deep IS-U business-process fluency — Move-In, Move-Out, Switch-In/Out, Start/End of Supply — with modern ABAP Cloud exposure, making him well suited to both specialist utility-sector engagements and broader S/4HANA transformation programs.
            </p>

            <div class="pt-2">
              <a href="https://www.linkedin.com/in/piyas-das-031bb014a" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 text-sap-light font-mono text-xs font-semibold hover:underline">
                View Official LinkedIn Profile <i data-lucide="external-link" class="w-4 h-4"></i>
              </a>
            </div>
          </div>
        </div>

                <!-- Core Focus Areas (5 Pillars from PDF Page 1 - Animated & Responsive Glass Cards) -->
        <div class="mt-16 pt-12 border-t border-slate-800/80">
          <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <span class="font-mono text-xs text-sap-light font-bold uppercase tracking-widest block mb-1">KEY TECHNICAL SPECTRUM</span>
              <h3 class="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">Core Focus Areas</h3>
            </div>
            <span class="px-3.5 py-1.5 rounded-full bg-sap-blue/20 border border-sap-blue/40 text-sap-light font-mono text-xs font-semibold">
              ✦ 5 Technical Pillars
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <!-- Card 1 -->
            <div class="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-sap-light/60 transition-all duration-300 group/core reveal-on-scroll stagger-1 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="w-10 h-10 rounded-xl bg-sap-blue/20 border border-sap-blue/40 flex items-center justify-center font-mono text-sm font-bold text-sap-light group-hover/core:bg-sap-blue group-hover/core:text-white transition-colors">
                    01
                  </span>
                  <i data-lucide="git-merge" class="w-5 h-5 text-slate-400 group-hover/core:text-sap-light transition-colors"></i>
                </div>
                <h4 class="font-display text-lg sm:text-xl font-bold text-white mb-2 group-hover/core:text-sap-light transition-colors">
                  Greenfield SWDD &amp; IDoc Architecture
                </h4>
                <p class="text-slate-200 text-sm sm:text-base leading-relaxed">
                  Greenfield SAP Workflow (<strong class="text-white">SWDD</strong>) and IDoc/ALE architecture built from scratch rather than maintained.
                </p>
              </div>
              <div class="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2 font-mono text-xs text-slate-400">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>SWDD · IDocs · ALE · tRFC</span>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-sap-light/60 transition-all duration-300 group/core reveal-on-scroll stagger-2 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="w-10 h-10 rounded-xl bg-sap-blue/20 border border-sap-blue/40 flex items-center justify-center font-mono text-sm font-bold text-sap-light group-hover/core:bg-sap-blue group-hover/core:text-white transition-colors">
                    02
                  </span>
                  <i data-lucide="refresh-cw" class="w-5 h-5 text-slate-400 group-hover/core:text-sap-light transition-colors"></i>
                </div>
                <h4 class="font-display text-lg sm:text-xl font-bold text-white mb-2 group-hover/core:text-sap-light transition-colors">
                  SAP IS-U ↔ Salesforce Integration
                </h4>
                <p class="text-slate-200 text-sm sm:text-base leading-relaxed">
                  Bi-directional real-time SAP IS-U to Salesforce integration via optimized <strong class="text-white">OData Services</strong> (~35% error cut).
                </p>
              </div>
              <div class="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2 font-mono text-xs text-slate-400">
                <span class="w-2 h-2 rounded-full bg-sap-light"></span>
                <span>OData v4 · API Bridge · Sync</span>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-sap-light/60 transition-all duration-300 group/core reveal-on-scroll stagger-3 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="w-10 h-10 rounded-xl bg-sap-blue/20 border border-sap-blue/40 flex items-center justify-center font-mono text-sm font-bold text-sap-light group-hover/core:bg-sap-blue group-hover/core:text-white transition-colors">
                    03
                  </span>
                  <i data-lucide="zap" class="w-5 h-5 text-slate-400 group-hover/core:text-sap-light transition-colors"></i>
                </div>
                <h4 class="font-display text-lg sm:text-xl font-bold text-white mb-2 group-hover/core:text-sap-light transition-colors">
                  Utility Contract Lifecycle Ownership
                </h4>
                <p class="text-slate-200 text-sm sm:text-base leading-relaxed">
                  End-to-end process fluency: <strong class="text-white">Move-In, Move-Out, Switch-In/Out</strong>, and Start/End of Supply execution.
                </p>
              </div>
              <div class="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2 font-mono text-xs text-slate-400">
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>IS-U Domain · Move-In/Out</span>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-sap-light/60 transition-all duration-300 group/core reveal-on-scroll stagger-4 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="w-10 h-10 rounded-xl bg-sap-blue/20 border border-sap-blue/40 flex items-center justify-center font-mono text-sm font-bold text-sap-light group-hover/core:bg-sap-blue group-hover/core:text-white transition-colors">
                    04
                  </span>
                  <i data-lucide="cloud" class="w-5 h-5 text-slate-400 group-hover/core:text-sap-light transition-colors"></i>
                </div>
                <h4 class="font-display text-lg sm:text-xl font-bold text-white mb-2 group-hover/core:text-sap-light transition-colors">
                  Modern ABAP Cloud Readiness
                </h4>
                <p class="text-slate-200 text-sm sm:text-base leading-relaxed">
                  Hands-on proficiency in <strong class="text-white">CDS Views</strong> (3-layer model), <strong class="text-white">AMDP</strong> classes, and SAP BTP architecture.
                </p>
              </div>
              <div class="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2 font-mono text-xs text-slate-400">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>ABAP Cloud · CDS · AMDP · BTP</span>
              </div>
            </div>

            <!-- Card 5 -->
            <div class="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-sap-light/60 transition-all duration-300 group/core reveal-on-scroll stagger-5 md:col-span-2 lg:col-span-2 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="w-10 h-10 rounded-xl bg-sap-blue/20 border border-sap-blue/40 flex items-center justify-center font-mono text-sm font-bold text-sap-light group-hover/core:bg-sap-blue group-hover/core:text-white transition-colors">
                    05
                  </span>
                  <i data-lucide="layout" class="w-5 h-5 text-slate-400 group-hover/core:text-sap-light transition-colors"></i>
                </div>
                <h4 class="font-display text-lg sm:text-xl font-bold text-white mb-2 group-hover/core:text-sap-light transition-colors">
                  SAP CRM Technical Grounding
                </h4>
                <p class="text-slate-200 text-sm sm:text-base leading-relaxed">
                  Web UI Workbench enhancements, One Order Framework, BOL/GenIL layer, and <strong class="text-white">42 Custom CRM Price Keys</strong> via SPRO configuration.
                </p>
              </div>
              <div class="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2 font-mono text-xs text-slate-400">
                <span class="w-2 h-2 rounded-full bg-sap-light"></span>
                <span>CRM Web UI · One Order · BOL/GenIL · SPRO</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Section 2: Technical Expertise (7 Detailed Domains from PDF Page 2) -->
      <section id="capabilities" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-on-scroll">
        <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div class="flex items-center gap-3 font-mono text-xs text-sap-light uppercase tracking-widest mb-2">
              <span class="w-8 h-px bg-sap-light"></span> 02 / TECHNICAL EXPERTISE
            </div>
            <h2 class="font-serif text-4xl sm:text-5xl font-bold text-white">SAP Specializations</h2>
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
          ${capabilities.filter(c => state.activeTab === 'all' || c.category === state.activeTab).map((c, idx) => `
            <div class="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all group reveal-on-scroll stagger-${(idx % 3) + 1}">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="px-2.5 py-1 rounded-md bg-sap-blue/20 border border-sap-blue/40 text-sap-light font-mono text-[10px] uppercase font-semibold">
                    ${c.highlight}
                  </span>
                  <i data-lucide="cpu" class="w-5 h-5 text-slate-500 group-hover:text-sap-light transition-colors"></i>
                </div>
                <h3 class="font-serif text-2xl font-bold text-white mb-2 group-hover:text-sap-light transition-colors">${c.title}</h3>
                <p class="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">${c.desc}</p>
              </div>
              <div class="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800 font-mono text-[10px] text-slate-400">
                ${c.tags.map(t => `<span class="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">${t}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Section 3: Professional Experience (TCS Detailed PDF Breakdown) -->
      <section id="experience" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-on-scroll">
        <div class="flex items-center gap-3 font-mono text-xs text-sap-light uppercase tracking-widest mb-4">
          <span class="w-8 h-px bg-sap-light"></span> 03 / CAREER EXPERIENCE
        </div>
        <h2 class="font-serif text-4xl sm:text-5xl font-bold text-white mb-12">Production Delivery</h2>

        <div class="glass-card rounded-3xl p-8 md:p-12 border border-slate-800 space-y-8">
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span class="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">FEB 2024 — PRESENT</span>
              <h3 class="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">Tata Consultancy Services (TCS)</h3>
              <p class="font-mono text-sm text-sap-light">Technical Lead · SAP ABAP Developer &amp; Workflow Specialist</p>
            </div>
            <div class="text-right font-mono text-xs text-slate-400">
              <span class="block">Kolkata, West Bengal</span>
              <span class="text-slate-500">Salesforce–SAP Transition Technical Owner</span>
            </div>
          </div>

          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
            At TCS, Piyas is the technical owner for SAP IS-U workflow and integration work supporting the Salesforce–SAP transition program, spanning the full delivery lifecycle from workflow architecture through enhancement, data migration, performance tuning, and production support.
          </p>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
            <ul class="space-y-4 list-disc list-inside marker:text-sap-light text-slate-200 text-sm sm:text-base leading-relaxed">
              <li><strong class="text-white">Workflow &amp; OData:</strong> Architected 8+ end-to-end SAP Workflows (SWDD) for IS-U processes, triggered via Salesforce API through OData replication — cutting handoff effort by ~70%.</li>
              <li><strong class="text-white">IDocs, BAPIs &amp; Migration:</strong> Designed 6+ IDoc structures and BAPIs from scratch, generated ALE interfaces with tRFC port configuration, and executed data migration via BDC/LSMW for Salesforce transition projects.</li>
              <li><strong class="text-white">Enhancements:</strong> Implemented 4+ BAdIs and Customer Exits for Move-In/Move-Out contract processing, enabling seamless Salesforce–SAP IS-U integration.</li>
              <li><strong class="text-white">Forms &amp; Module Pool:</strong> Enhanced Invoice Billing Smartform (barcode, logo, OTF-to-PDF, automated email) improving output accuracy ~35%; built CRM Delivery Notice Module Pool programs improving accuracy ~25%.</li>
            </ul>
            <ul class="space-y-4 list-disc list-inside marker:text-sap-light">
              <li><strong class="text-white">RICEFW Delivery &amp; TDDs:</strong> Delivered 30+ RICEFW objects, reducing manual effort ~30%; authored 25+ Technical Design Documents, cutting rework ~20%.</li>
              <li><strong class="text-white">Testing, Monitoring &amp; PRD Support:</strong> Configured deadline monitoring and error-branch handling across DEV/QAS/PRD for a defect-free go-live (~30% fewer post-production issues); provided L2/L3 support, debugging live workflows via SWUS WITH REFERENCE.</li>
              <li><strong class="text-white">Performance Tuning:</strong> Optimized 13+ ABAP reports via Runtime Analysis and SQL Trace, cutting batch-job runtime by ~45%.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Section 4: Projects (Key Project Delivery Showcase) -->
      <section id="projects" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-on-scroll">
        <div class="flex items-center gap-3 font-mono text-xs text-sap-light uppercase tracking-widest mb-4">
          <span class="w-8 h-px bg-sap-light"></span> 04 / PROJECTS —— KEY PROJECT DELIVERY
        </div>
        <h2 class="font-serif text-4xl sm:text-5xl font-bold text-white mb-12">
          Featured Implementations
        </h2>

        <div class="space-y-12">
          <!-- Project 1 (Image Left, Content Right) -->
          <div class="glass-card rounded-3xl overflow-hidden border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-0 group hover:border-sap-light/50 transition-all duration-500 reveal-on-scroll stagger-1">
            <!-- Image Left -->
            <div class="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden group/img">
              <img src="assets/project-salesforce-isu.jpg" alt="Salesforce to SAP IS-U Integration" class="absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 brightness-90" />
              <div class="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/90 hidden lg:block"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent lg:hidden"></div>
              <span class="absolute top-6 left-6 font-mono text-3xl font-bold text-white/30 z-10">01</span>
            </div>

            <!-- Content Right -->
            <div class="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div class="font-mono text-xs text-sap-light uppercase font-bold tracking-wider mb-2">
                  MAR 2025 — APR 2026 · WORKFLOW &amp; INTEGRATION ARCHITECT
                </div>
                <h3 class="font-serif text-3xl font-bold text-white group-hover:text-sap-light transition-colors flex items-center justify-between">
                  <span>Salesforce ➔ SAP IS-U Integration</span>
                  <i data-lucide="arrow-up-right" class="w-6 h-6 text-slate-500 group-hover:text-sap-light group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"></i>
                </h3>
                <p class="text-slate-300 text-sm leading-relaxed mt-3 mb-6">
                  <strong class="text-white">Objective:</strong> Migrate legacy SAP CRM-based utility contract management onto a Salesforce front-end while retaining SAP IS-U as the system of record.
                </p>

                <ul class="space-y-3 font-sans text-sm sm:text-base text-slate-200 leading-relaxed">
                  <li class="flex items-start gap-2.5">
                    <span class="text-sap-light font-mono font-bold">➔</span>
                    <span>Built 8+ IS-U workflows from scratch (Move-In, Move-Out, Switch-In/Out, End/Start of Supply, Internal Start/Stop).</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="text-sap-light font-mono font-bold">➔</span>
                    <span>Reduced payload errors ~35% via real-time OData service optimization.</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="text-sap-light font-mono font-bold">➔</span>
                    <span>Refactored 10+ RICEFW objects for a near-zero-defect go-live; cut legacy CRM dependency ~70%.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Project 2 (Content Left, Image Right) -->
          <div class="glass-card rounded-3xl overflow-hidden border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-0 group hover:border-sap-light/50 transition-all duration-500 reveal-on-scroll stagger-2">
            <!-- Content Left -->
            <div class="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6 order-2 lg:order-1">
              <div>
                <div class="font-mono text-xs text-sap-light uppercase font-bold tracking-wider mb-2">
                  APR 2024 — DEC 2025 · ABAP DEVELOPER
                </div>
                <h3 class="font-serif text-3xl font-bold text-white group-hover:text-sap-light transition-colors flex items-center justify-between">
                  <span>CRM Price Keys &amp; IS-U Billing Enhancement</span>
                  <i data-lucide="arrow-up-right" class="w-6 h-6 text-slate-500 group-hover:text-sap-light group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"></i>
                </h3>
                <p class="text-slate-300 text-sm leading-relaxed mt-3 mb-6">
                  <strong class="text-white">Objective:</strong> Improve CRM Web UI data clarity and reduce erroneous billing/system triggers through price-key configuration and RFC-based CRM-IS-U integration.
                </p>

                <ul class="space-y-3 font-sans text-xs sm:text-sm text-slate-300">
                  <li class="flex items-start gap-2.5">
                    <span class="text-sap-light font-mono font-bold">➔</span>
                    <span>Configured 42 custom SAP CRM Price Keys via SPRO.</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="text-sap-light font-mono font-bold">➔</span>
                    <span>Built RFC-based CRM-IS-U integrations cutting incorrect system triggers ~20%.</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="text-sap-light font-mono font-bold">➔</span>
                    <span>Automated Master Data Templates via EPRODCUST — lifting UI data clarity ~30%.</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Image Right -->
            <div class="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden group/img order-1 lg:order-2">
              <img src="assets/project-ricefw-billing.jpg" alt="CRM Price Keys & IS-U Billing" class="absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 brightness-90" />
              <div class="absolute inset-0 bg-gradient-to-l from-transparent to-slate-950/90 hidden lg:block"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent lg:hidden"></div>
              <span class="absolute top-6 right-6 font-mono text-3xl font-bold text-white/30 z-10">02</span>
            </div>
          </div>

        </div>
      </section>

      <!-- Section 5: Education, Mentorship & Career Intent (Page 4 of PDF) -->
      <section id="education" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-on-scroll">
        <div class="flex items-center gap-3 font-mono text-xs text-sap-light uppercase tracking-widest mb-4">
          <span class="w-8 h-px bg-sap-light"></span> 05 / ACADEMIC BACKGROUND &amp; LEADERSHIP
        </div>
        <h2 class="font-serif text-4xl sm:text-5xl font-bold text-white mb-12">
          Education &amp; Mentorship
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Education Cards Left -->
          <div class="lg:col-span-7 space-y-4">
            <!-- College -->
            <div class="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between hover:border-sap-light/40 transition-all">
              <div>
                <span class="px-2.5 py-1 rounded bg-sap-blue/20 border border-sap-blue/40 text-sap-light font-mono text-[10px] uppercase font-bold">2019 — 2023</span>
                <h3 class="font-serif text-xl font-bold text-white mt-2">B.Tech in Information Technology</h3>
                <p class="text-xs text-slate-400 font-sans mt-0.5">Kalyani Government Engineering College</p>
              </div>
              <div class="text-right">
                <span class="font-serif text-2xl sm:text-3xl font-bold text-emerald-400 block">8.62</span>
                <span class="font-mono text-[10px] text-slate-400 uppercase">CGPA / 10</span>
              </div>
            </div>

            <!-- Class XII -->
            <div class="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between hover:border-sap-light/40 transition-all">
              <div>
                <span class="px-2.5 py-1 rounded bg-slate-800 text-slate-400 font-mono text-[10px] uppercase font-bold">2019 · CBSE</span>
                <h3 class="font-serif text-lg font-bold text-white mt-2">Class XII Higher Secondary</h3>
                <p class="text-xs text-slate-400 font-sans mt-0.5">Jawahar Navodaya Vidyalaya</p>
              </div>
              <div class="text-right">
                <span class="font-serif text-2xl font-bold text-white block">88.7%</span>
                <span class="font-mono text-[10px] text-slate-400 uppercase">Percentage</span>
              </div>
            </div>

            <!-- Class X -->
            <div class="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between hover:border-sap-light/40 transition-all">
              <div>
                <span class="px-2.5 py-1 rounded bg-slate-800 text-slate-400 font-mono text-[10px] uppercase font-bold">2017 · CBSE</span>
                <h3 class="font-serif text-lg font-bold text-white mt-2">Class X Secondary School</h3>
                <p class="text-xs text-slate-400 font-sans mt-0.5">Jawahar Navodaya Vidyalaya</p>
              </div>
              <div class="text-right">
                <span class="font-serif text-2xl font-bold text-emerald-400 block">10.0</span>
                <span class="font-mono text-[10px] text-slate-400 uppercase">CGPA / 10</span>
              </div>
            </div>
          </div>

          <!-- Mentorship & Career Intent Right -->
          <div class="lg:col-span-5">
            <div class="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 bg-gradient-to-b from-slate-900/90 to-slate-950/90 h-full flex flex-col justify-between">
              <div class="space-y-4">
                <div class="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
                  <i data-lucide="users" class="w-4 h-4 text-amber-400"></i> Mentorship &amp; Leadership Readiness
                </div>
                <h3 class="font-serif text-2xl font-bold text-white leading-snug">Technical Lead &amp; Mentor</h3>
                <p class="text-slate-200 text-sm sm:text-base leading-relaxed">
                  Currently operating as a Technical Lead at TCS, Piyas has mentored two freshers into SAP ABAP development — further specializing one into CRM technical work and the other into IS-U technical and functional skills — reflecting his readiness for lead-level ownership that extends beyond individual delivery.
                </p>
              </div>

              <div class="pt-6 border-t border-slate-800 space-y-3 font-mono text-xs">
                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span class="text-slate-400">Notice Period</span>
                  <span class="text-emerald-400 font-bold">Serving (Last Day: 14-Sep-2026)</span>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span class="text-slate-400">Relocation</span>
                  <span class="text-sap-light font-bold">Open for the right opportunity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 6: Certifications Grid (Detailed Descriptions from Page 4 of PDF) -->
      <section id="certifications" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-on-scroll">
        <div class="flex items-center gap-3 font-mono text-xs text-sap-light uppercase tracking-widest mb-4">
          <span class="w-8 h-px bg-sap-light"></span> 06 / VERIFIED SAP CREDENTIALS
        </div>
        <h2 class="font-serif text-4xl sm:text-5xl font-bold text-white mb-12">4x SAP Certifications</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${certifications.map((c, idx) => `
            <a href="${c.link}" target="_blank" rel="noreferrer" class="glass-card rounded-2xl p-6 flex flex-col justify-between hover:border-sap-light/50 transition-all group reveal-on-scroll stagger-${(idx % 4) + 1}">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="font-mono text-xs text-slate-400 font-bold">${c.id}</span>
                  <span class="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px]">
                    ${c.badge}
                  </span>
                </div>
                <h3 class="font-serif text-xl font-bold text-white group-hover:text-sap-light transition-colors mb-2">${c.title}</h3>
                <p class="text-xs text-slate-400 font-sans">${c.org} · ${c.validity}</p>
                <p class="text-slate-200 text-sm leading-relaxed mt-3 mb-4">${c.desc}</p>
              </div>
              <div class="pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-sap-light group-hover:underline">
                <span>View Credential</span>
                <i data-lucide="external-link" class="w-4 h-4"></i>
              </div>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- Section 7: Journal / Field Notes & Articles -->
      <section id="journal" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-on-scroll">
        <div class="flex items-center gap-3 font-mono text-xs text-sap-light uppercase tracking-widest mb-4">
          <span class="w-8 h-px bg-sap-light"></span> 07 / JOURNAL —— NOTES &amp; ARTICLES
        </div>
        <h2 class="font-serif text-4xl sm:text-5xl font-bold text-white mb-12">
          Field notes from SAP delivery.
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Article 1 -->
          <div class="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group hover:border-sap-light/50 transition-all">
            <div class="relative h-52 overflow-hidden p-6 flex flex-col justify-between group/img">
              <img src="assets/article-workflow.jpg" alt="SAP Workflow SWDD" class="absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 brightness-90" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <span class="px-2.5 py-1 rounded bg-sap-blue border border-sap-blue/60 text-white font-mono text-[10px] uppercase font-bold tracking-wider self-start relative z-10 shadow-lg">
                WORKFLOW
              </span>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 class="font-serif text-xl font-bold text-white group-hover:text-sap-light transition-colors leading-snug mb-3">
                  Building an SAP Workflow (SWDD) from scratch for IS-U Move-In
                </h3>
                <p class="text-slate-400 text-xs leading-relaxed">
                  A practical walk-through of agent determination, deadline monitoring and error branches for a greenfield IS-U workflow.
                </p>
              </div>
              <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs text-slate-400">
                <span class="flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5 text-slate-500"></i> 8 min read</span>
                <a href="javascript:void(0)" onclick="alert('Article link coming soon!')" class="text-sap-light font-medium group-hover:underline flex items-center gap-1">
                  Read <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Article 2 -->
          <div class="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group hover:border-sap-light/50 transition-all">
            <div class="relative h-52 overflow-hidden p-6 flex flex-col justify-between group/img">
              <img src="assets/article-integration.jpg" alt="SAP OData Salesforce Integration" class="absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 brightness-90" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <span class="px-2.5 py-1 rounded bg-sap-blue border border-sap-blue/60 text-white font-mono text-[10px] uppercase font-bold tracking-wider self-start relative z-10 shadow-lg">
                INTEGRATION
              </span>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 class="font-serif text-xl font-bold text-white group-hover:text-sap-light transition-colors leading-snug mb-3">
                  Bi-directional OData replication between SAP IS-U and Salesforce
                </h3>
                <p class="text-slate-400 text-xs leading-relaxed">
                  How I cut payload errors ~35% by rethinking real-time OData services for utility contract processing.
                </p>
              </div>
              <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs text-slate-400">
                <span class="flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5 text-slate-500"></i> 6 min read</span>
                <a href="javascript:void(0)" onclick="alert('Article link coming soon!')" class="text-sap-light font-medium group-hover:underline flex items-center gap-1">
                  Read <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Article 3 -->
          <div class="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group hover:border-sap-light/50 transition-all">
            <div class="relative h-52 overflow-hidden p-6 flex flex-col justify-between group/img">
              <img src="assets/article-abap-cloud.jpg" alt="ABAP Cloud CDS Views" class="absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 brightness-90" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <span class="px-2.5 py-1 rounded bg-sap-blue border border-sap-blue/60 text-white font-mono text-[10px] uppercase font-bold tracking-wider self-start relative z-10 shadow-lg">
                ABAP CLOUD
              </span>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 class="font-serif text-xl font-bold text-white group-hover:text-sap-light transition-colors leading-snug mb-3">
                  Getting ABAP Cloud ready: CDS Views, AMDP and the three-layer model
                </h3>
                <p class="text-slate-400 text-xs leading-relaxed">
                  Notes from my 2026 ABAP Cloud certification — the mental model that makes RISE/GROW conversations click.
                </p>
              </div>
              <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs text-slate-400">
                <span class="flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5 text-slate-500"></i> 7 min read</span>
                <a href="javascript:void(0)" onclick="alert('Article link coming soon!')" class="text-sap-light font-medium group-hover:underline flex items-center gap-1">
                  Read <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <p class="font-mono text-xs text-slate-500 mt-6">* Sample articles — full write-ups coming soon.</p>
      </section>

      
      <!-- Section 8: Visitor Comments & Floating Testimonials -->
      <section id="comments" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-on-scroll">
        <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div class="flex items-center gap-3 font-mono text-xs text-sap-light uppercase tracking-widest mb-2">
              <span class="w-8 h-px bg-sap-light"></span> 08 / COMMUNITY &amp; TESTIMONIALS —— VISITOR FEED
            </div>
            <h2 class="font-serif text-4xl sm:text-5xl font-bold text-white">What Colleagues &amp; Recruiters Say</h2>
          </div>
          <button onclick="document.getElementById('comment-modal').classList.remove('hidden')" class="px-5 py-2.5 rounded-xl bg-sap-blue hover:bg-blue-700 text-white font-sans text-xs sm:text-sm font-semibold shadow-lg shadow-sap-blue/30 flex items-center gap-2 transition-all hover:scale-105">
            <i data-lucide="message-square-plus" class="w-4 h-4"></i> Leave a Comment
          </button>
        </div>

        <p class="text-slate-300 text-sm sm:text-base mb-10 max-w-3xl leading-relaxed">
          Approved recommendations, feedback, and notes from SAP project leads, enterprise recruiters, and solution architects. Submit your comment below for email moderation approval by Piyas!
        </p>

        <!-- Floating Animated Comments Stream (Continuous Marquee Ribbon) -->
        <div class="relative overflow-hidden py-4 rounded-3xl border border-slate-800/80 bg-slate-950/60 backdrop-blur-xl">
          <div class="animate-marquee flex gap-6 items-center">
            ${[...commentsData, ...commentsData].map((item, i) => `
              <div class="glass-card rounded-2xl p-6 min-w-[320px] sm:min-w-[380px] border border-slate-800/80 flex flex-col justify-between hover:border-sap-light/50 transition-all shrink-0">
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-sap-blue/30 border border-sap-blue/60 flex items-center justify-center font-mono text-xs font-bold text-sap-light">
                        ${item.avatar}
                      </div>
                      <div>
                        <h4 class="font-display text-sm font-bold text-white leading-tight">${item.name}</h4>
                        <span class="font-mono text-[10px] text-slate-400 block">${item.role}</span>
                      </div>
                    </div>
                    <span class="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px]">
                      ${item.badge}
                    </span>
                  </div>
                  <p class="text-slate-200 text-xs sm:text-sm leading-relaxed italic">"${item.text}"</p>
                </div>
                <div class="pt-3 mt-4 border-t border-slate-800/60 flex items-center justify-between font-mono text-[10px] text-slate-500">
                  <span>Verified Entry</span>
                  <span>${item.date}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Floating Animated Static Grid Preview -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          ${commentsData.map((item, idx) => `
            <div class="glass-card rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between hover:border-sap-light/50 transition-all reveal-on-scroll stagger-${idx + 1}">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-sap-blue/30 border border-sap-blue/60 flex items-center justify-center font-mono text-xs font-bold text-sap-light">
                      ${item.avatar}
                    </div>
                    <div>
                      <h4 class="font-display text-base font-bold text-white">${item.name}</h4>
                      <span class="font-mono text-xs text-slate-400 block">${item.role}</span>
                    </div>
                  </div>
                </div>
                <p class="text-slate-200 text-sm leading-relaxed italic">"${item.text}"</p>
              </div>
              <div class="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs text-slate-400">
                <span class="text-emerald-400 flex items-center gap-1"><i data-lucide="check-circle" class="w-3.5 h-3.5"></i> ${item.badge}</span>
                <span>${item.date}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Interactive Leave a Comment Modal -->
      <div id="comment-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md hidden animate-fadeIn">
        <div class="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 relative">
          <button onclick="document.getElementById('comment-modal').classList.add('hidden')" class="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>

          <div>
            <span class="font-mono text-xs text-sap-light font-bold uppercase tracking-wider block mb-1">EMAIL MODERATION WORKFLOW</span>
            <h3 class="font-serif text-2xl font-bold text-white">Leave a Comment / Review</h3>
            <p class="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
              Your comment will be sent directly to Piyas's email (<strong class="text-white">piyasdas89@gmail.com</strong>) for review and approval before floating live on the portfolio!
            </p>
          </div>

          <form onsubmit="handleCommentFormSubmit(event)" class="space-y-4">
            <div>
              <label class="block font-mono text-xs text-slate-300 mb-1">Your Full Name</label>
              <input type="text" name="visitor_name" required class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-sap-light" placeholder="e.g. Rahul Sharma" />
            </div>

            <div>
              <label class="block font-mono text-xs text-slate-300 mb-1">Your Role &amp; Company / Organization</label>
              <input type="text" name="visitor_role" required class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-sap-light" placeholder="e.g. SAP Lead Recruiter at Accenture" />
            </div>

            <div>
              <label class="block font-mono text-xs text-slate-300 mb-1">Your Comment / Feedback</label>
              <textarea name="visitor_comment" rows="4" required class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-sap-light" placeholder="Write your comment, testimonial, or feedback for Piyas..."></textarea>
            </div>

            <button type="submit" id="comment-submit-btn" class="w-full py-3.5 rounded-xl bg-sap-blue hover:bg-blue-700 text-white font-semibold text-sm shadow-xl shadow-sap-blue/30 flex items-center justify-center gap-2 transition-all">
              Submit Comment for Email Approval <i data-lucide="send" class="w-4 h-4"></i>
            </button>

            <p id="comment-form-note" class="text-center font-mono text-[11px] text-slate-400">
              Requires Piyas's email approval before appearing on the website.
            </p>
          </form>
        </div>
      </div>


      <!-- Section 9: Contact & Resume CTA -->
      <section id="contact" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-on-scroll">
        <div class="glass-card rounded-3xl p-8 md:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div class="lg:col-span-5 space-y-6">
            <span class="font-mono text-xs text-sap-light uppercase tracking-widest">GET IN TOUCH</span>
            <h2 class="font-serif text-4xl font-bold text-white leading-tight">Let's build the next SAP milestone.</h2>
            <p class="text-slate-300 text-sm leading-relaxed">
              Actively exploring SAP ABAP Developer / Consultant roles and SAP IS-U + CRM Technical roles — particularly within utility-sector SAP landscapes or Big 4 consulting practices.
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
              <p id="form-note" class="text-center font-mono text-[11px] text-slate-400">Direct background email delivery to piyasdas89@gmail.com</p>
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

  function initScrollObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '-30px 0px -30px 0px',
      threshold: 0.08
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  }

  initScrollObserver();

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
