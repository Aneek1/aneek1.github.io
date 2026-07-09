// Edit this file to maintain the portfolio.
//  · Add a project → add one object to PROJECTS (top = shown first).
//  · status        → "deployed" | "uat" | "built" | "progress" | "oss"
//  · desc          → short blurb shown in the list.  detail → in-depth HTML shown on click.
//  · link          → repo/live URL (optional; shows a button in the detail view).
//  · Links         → CONFIG. Leave email/linkedin "" to hide them.

export const CONFIG = {
  github: "https://github.com/Aneek1",
  email: "chattopadhyaya70@gmail.com", // leave "" to hide
  linkedin: "https://www.linkedin.com/in/aneek-chattopadhyay-1a253020a/",
};

export const STATUS = {
  deployed: { label: "Deployed", cls: "b-dep" },
  uat:      { label: "In UAT", cls: "b-uat" },
  built:    { label: "Built", cls: "b-built" },
  progress: { label: "In progress", cls: "b-built" },
  oss:      { label: "Open source", cls: "b-oss" },
};

export const EXPERIENCE = [
  {
    role: "AI Engineer",
    org: "SP Manufacturing",
    where: "Singapore",
    when: "2025 — Present",
    blurb:
      "Building production automation agents for operations and procurement — AI wired into Dynamics 365 Business Central, Outlook, and document workflows.",
  },
  {
    role: "AI & Hardware Engineering Intern",
    org: "TicTag",
    where: "Singapore",
    when: "2025",
    blurb:
      "Edge AI on NVIDIA Jetson — perception-to-action pipelines, custom PCB sensor integration, and low-latency embedded inference.",
  },
  {
    role: "Robotics Research Assistant",
    org: "SUTD",
    where: "Singapore",
    when: "2024 — 2025",
    blurb:
      "Modular multi-sensor system architectures, Python data pipelines, and automated validation workflows for real-world deployment.",
  },
  {
    role: "Summer Research Intern",
    org: "University of Manchester",
    where: "UK",
    when: "2023",
    blurb:
      "Pressure-sensitive paint experiments — designed a precision acoustic resonance chamber and validated data against analytical models.",
  },
];

export const PROJECTS = [
  {
    title: "PO Agent — Vendor Follow-up", status: "uat",
    desc: "Autonomous agent that chases vendors for missing committed delivery dates on purchase orders — and stops the moment a vendor responds.",
    tags: ["Python", "Claude API", "BC OData", "Selenium", "Outlook", "SQLite"],
    detail: `<p><b>The problem.</b> Buyers spend hours each week manually emailing vendors to confirm delivery dates on open purchase orders, and re-chasing the ones that haven't replied.</p>
      <p><b>What it does.</b> The agent reads released purchase orders from <b>Microsoft Dynamics 365 Business Central</b> over OData and, for any line still missing a vendor-committed date, emails the vendor a follow-up — escalating through a tiered ladder (gentle reminder → urgent → escalation) as time passes, with the official PO PDF attached.</p>
      <p><b>Why it's reliable.</b> Before every send it re-reads the live ERP record, so a PO the vendor has already answered is never chased. Every send is logged and de-duplicated.</p>
      <p><b>Tech.</b> Python · Anthropic Claude · Business Central OData · Selenium · Outlook · SQLite. <b>Status:</b> in UAT with buyers.</p>`,
  },
  {
    title: "SO Agent — Sales Order Entry", status: "deployed",
    desc: "Turns incoming customer POs (PDF / Excel / email) into Sales Orders in the ERP after a quick operator review.",
    tags: ["Python", "Flask + Socket.IO", "Claude API", "Doc parsing", "BC OData"],
    detail: `<p><b>The problem.</b> Customer purchase orders arrive as PDFs, spreadsheets, and emails — and get re-typed into the ERP by hand, slowly and with errors.</p>
      <p><b>What it does.</b> It ingests the document, uses AI to parse the line items, then matches each item and the customer against <b>live ERP master data</b> — including revision lookup and in-stock substitutes — and creates the Sales Order after a quick operator review.</p>
      <p><b>Why it's reliable.</b> Nothing is written to the ERP until the operator approves. Order creation is fully browserless via OData and resilient to the ERP's number-series configuration.</p>
      <p><b>Tech.</b> Python · Flask + Socket.IO · Anthropic Claude · document parsing · Business Central OData. <b>Status:</b> deployed and verified end-to-end.</p>`,
  },
  {
    title: "OCR Agent — Document Extraction", status: "deployed",
    desc: "LAN-hosted OCR that pulls structured data out of supplier invoices and delivery orders — share one URL, nothing to install.",
    tags: ["Python", "Flask", "Claude Vision", "PDF", "Cost control"],
    detail: `<p><b>The problem.</b> An earlier browser-only OCR tool had to be emailed to each user and couldn't be centrally controlled or cost-capped.</p>
      <p><b>What it does.</b> A LAN-hosted service that extracts structured fields from supplier invoices and delivery orders, shared through a single URL — users need only a browser.</p>
      <p><b>How it's built well.</b> The API key stays <b>server-side</b>, with per-user daily token caps and full per-call usage logging. Inference is cost-optimised: it reads the PDF's text layer first, falls back to a lean vision model only when needed, and caches by file hash.</p>
      <p><b>Tech.</b> Python · Flask · Claude (vision) · PDF processing. <b>Status:</b> deployed.</p>`,
  },
  {
    title: "VCD Updater — Bulk ERP Write-back", status: "built",
    desc: "The write-back companion to the follow-up agent — pushes vendor-committed dates back into the ERP in bulk.",
    tags: ["Python", "BC OData", "Batch automation"],
    detail: `<p><b>What it does.</b> Once vendors reply with their committed dates, this service writes them back into the matching purchase orders in <b>Business Central in bulk over OData</b> — eliminating manual re-keying and closing the loop the PO Agent opens.</p>
      <p><b>Where it fits.</b> Together with the PO Agent it forms a full read → chase → write-back cycle on purchase-order delivery dates, sharing the same ERP integration layer.</p>
      <p><b>Tech.</b> Python · Business Central OData · batch automation. <b>Status:</b> built; OData write-back verified.</p>`,
  },
  {
    title: "Cloud Migration & Agent Suite", status: "progress",
    desc: "Consolidated the agents and architected a multi-user Azure deployment with company SSO and an audit trail.",
    tags: ["Azure", "Azure SQL", "Entra ID", "FastAPI", "Worker queue"],
    detail: `<p><b>The goal.</b> Single-user, per-laptop deployments are a bottleneck — teams across sites need access without each installing the tools.</p>
      <p><b>What it does.</b> Consolidated the separate agents behind one service, then architected a <b>multi-user Azure deployment</b>: a Static Web App UI, Azure SQL for shared state, and a local automation worker that pulls jobs from the cloud and posts results back — with company SSO (Entra ID) and an audit trail.</p>
      <p><b>Tech.</b> Azure (Static Web Apps, Azure SQL, Blob Storage, Entra ID) · FastAPI / Flask · worker-queue pattern. <b>Status:</b> in progress.</p>`,
  },
  {
    title: "Workflow Apps — NCMR / MR & LMS", status: "deployed",
    desc: "Turned internal prototypes into real apps — document workflows and a learning / presentation platform.",
    tags: ["Flask", "SQLite", "JavaScript", "Azure"],
    detail: `<p><b>What it does.</b> Productised internal tools. Two document-workflow prototypes (non-conformance reports and material requests) were ported from standalone HTML into a single <b>Flask + SQLite</b> app with server-side persistence — preserving the original interface via a localStorage→server shim so users saw no disruption.</p>
      <p>Also built a learning / presentation platform running on shared cloud infrastructure.</p>
      <p><b>Tech.</b> Flask · SQLite · JavaScript · Azure. <b>Status:</b> deployed.</p>`,
  },
  // ── open-source / personal projects (public on GitHub) ──
  {
    title: "AIApplyMate", status: "oss", link: "https://github.com/Aneek1/aiapplymate",
    desc: "Full-stack AI web app that tailors résumés to a job description and writes matching cover letters, with ATS scoring.",
    tags: ["React", "TypeScript", "Node / Express", "MongoDB", "Gemini API", "Vite"],
    detail: `<p><b>What it is.</b> A free, open-source, self-hostable web app that customises a résumé to a specific job description and generates a matching cover letter.</p>
      <p><b>Features.</b> ATS-compatibility scoring with keyword injection, multi-format input parsing (PDF / DOCX / TXT), a saved document history, polished PDF export, and fully anonymous use with no account.</p>
      <p><b>Tech.</b> React 19 + TypeScript + Vite + TailwindCSS + shadcn/ui front end; Node / Express + MongoDB back end; Google Gemini for generation; Puppeteer for PDF; pdfjs &amp; mammoth for parsing. MIT licensed.</p>`,
  },
  {
    title: "mTrack — AI PCBA Inspection", status: "oss", link: "https://github.com/Aneek1/mTrack_SP",
    desc: "An LLM-driven gantry that inspects circuit-board assemblies inside a real-time 2D digital twin.",
    tags: ["Python", "FastAPI", "WebSockets", "React", "Electron", "Computer vision"],
    detail: `<p><b>What it is.</b> An LLM-powered AI gantry that inspects printed-circuit-board assemblies (PCBAs) inside a real-time <b>2D digital-twin simulation</b> — a demonstration of autonomous robot-inspection workflows for high-mix manufacturing lines.</p>
      <p><b>How it works.</b> A test-case generator creates random boards with configurable defects; the gantry navigates with <b>A* obstacle-aware path planning</b>; a vision pipeline provides perception (with optional YOLO); and multiple LLM providers (<b>Anthropic, OpenAI, Gemini</b>) drive inspection decisions — streamed live at 20 Hz with full session analytics.</p>
      <p><b>Tech.</b> Python 3.9+ / FastAPI / WebSocket backend · TypeScript / React / Electron / Vite frontend.</p>`,
  },
  {
    title: "Automated Wheelchair", status: "oss", link: "https://github.com/Aneek1/Automated-Wheelchair",
    desc: "An autonomous wheelchair built on ROS 2 — Nav2 navigation, sensor fusion, and autonomous exploration.",
    tags: ["Python", "ROS 2", "Nav2", "Lidar / Depth", "Robotics"],
    detail: `<p><b>What it is.</b> An autonomous wheelchair system built on <b>ROS 2</b>.</p>
      <p><b>How it works.</b> It uses the Nav2 navigation stack for path planning, fuses lidar and depth-sensor data for perception, and performs autonomous exploration. Includes a Blender simulation, 3D-printable STL hardware models, and a technical report.</p>
      <p><b>Tech.</b> Python · ROS 2 · Nav2 · lidar / depth sensors.</p>`,
  },
  {
    title: "Soft-Robotics Chatbot", status: "oss", link: "https://github.com/Aneek1/ai-chatbot-softrobotics",
    desc: "A retrieval chatbot that answers soft-robotics fabrication questions from a curated dataset.",
    tags: ["Python", "Gemini API", "spaCy", "RAG", "GUI"],
    detail: `<p><b>What it is.</b> An intelligent chatbot that answers questions about soft-robotics fabrication methods.</p>
      <p><b>How it works.</b> It retrieves from a curated CSV knowledge base and uses Google Gemini to compose answers — an early retrieval-augmented assistant, with spaCy NLP and a cross-platform desktop GUI.</p>
      <p><b>Tech.</b> Python · Google Gemini · spaCy · CSV retrieval.</p>`,
  },
];
