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
    title: "PO Agent — Vendor Follow-up", status: "deployed",
    desc: "Autonomous agent that chases vendors for missing committed delivery dates on purchase orders — live in production, chasing daily.",
    tags: ["Python", "Claude API", "BC OData", "SOAP web services", "Outlook", "SQLite"],
    detail: `<p><b>The problem.</b> Buyers spend hours each week manually emailing vendors to confirm delivery dates on open purchase orders, and re-chasing the ones that haven't replied.</p>
      <p><b>What it does.</b> The agent reads released purchase orders from <b>Microsoft Dynamics 365 Business Central</b> over OData and, for any line still missing a vendor-committed date, emails the vendor a follow-up — escalating through a tiered business-day ladder (reminder → urgent → escalation with management CC'd) as time passes, with the official PO PDF attached.</p>
      <p><b>Why it's reliable.</b> Before every send it re-reads the live ERP record, so a PO the vendor has already answered is never chased. Every send is logged with retry/backoff and de-duplicated; failures alert the maintainer rather than dying silently. PO PDFs are generated server-side through a custom ERP web service — no browser in the loop.</p>
      <p><b>Tech.</b> Python · Anthropic Claude · Business Central OData + SOAP codeunit · Outlook · SQLite. <b>Status:</b> live in production, running scheduled scans and chases daily.</p>`,
  },
  {
    title: "SO Agent — Sales Order Entry", status: "deployed",
    desc: "Turns incoming customer POs (PDF / Excel / email) into Sales Orders in the ERP after a quick operator review — piloting across two sites.",
    tags: ["Python", "Flask + Socket.IO", "Claude API", "Doc parsing", "BC OData"],
    detail: `<p><b>The problem.</b> Customer purchase orders arrive as PDFs, spreadsheets, and emails — and get re-typed into the ERP by hand, slowly and with errors.</p>
      <p><b>What it does.</b> It ingests the document, uses AI to parse the line items (vision models for scanned image-only PDFs), then matches each item and the customer against <b>live ERP master data</b> — including revision lookup and in-stock substitutes — and creates the Sales Order after a quick operator review.</p>
      <p><b>Why it's reliable.</b> Nothing is written to the ERP until the operator approves. Order creation is fully browserless via OData, and the whole agent ships as a <b>single self-contained EXE</b> — copy, double-click, pick your name, go.</p>
      <p><b>Tech.</b> Python · Flask + Socket.IO · Anthropic Claude · document parsing · Business Central OData. <b>Status:</b> deployed; piloting with planning teams across two manufacturing sites.</p>`,
  },
  {
    title: "PCN Agent — Part Change Notices", status: "deployed",
    desc: "Reads supplier part-change / end-of-life notices from email and finds which of ~28,000 ERP parts are actually affected.",
    tags: ["Python", "Claude API", "IMAP", "BC OData", "PDF/XLSX parsing", "SQL Server"],
    detail: `<p><b>The problem.</b> Suppliers announce part changes and end-of-life notices in wildly different formats — PDFs, spreadsheets, plain-email digests, links. Sourcing manually cross-checked each one against the item master: ~2 hours per 50-part notice, with real misses.</p>
      <p><b>What it does.</b> Monitors the PCN mailbox, parses each notice with a registry of <b>per-vendor deterministic readers</b> (falling back to AI extraction for unknown formats), then matches every announced part against the live ERP item master — including <b>family and wildcard patterns</b> ("PIC18F2xx") and separator-insensitive part-number matching — and produces the affected-parts table, department email draft, and master-list rows.</p>
      <p><b>Why it's reliable.</b> The document's own content outranks the email envelope when routing to a parser; cover letters that say "see the attached Excel" automatically fall through to the spreadsheet; and failed parses surface as visible error cards instead of vanishing. It has repeatedly caught affected parts human review missed.</p>
      <p><b>Tech.</b> Python · Anthropic Claude · IMAP · Business Central OData · PDF/XLSX parsing · SQL Server. <b>Status:</b> deployed; validated against Sourcing's hand-matched gold standard.</p>`,
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
    title: "LearnLoop — AI Learning Management System", status: "deployed",
    desc: "Full LMS where AI builds the training deck, quiz, and translations — trainees learn and get assessed in their own language.",
    tags: ["Python", "React", "Claude API", "Google Forms API", "SQL Server", "SMTP"],
    detail: `<p><b>What it does.</b> A complete internal LMS: trainers upload source material (or let AI generate a deck from a topic), and the system produces the presentation, a configurable quiz, and <b>full translations (English / Chinese / Indonesian)</b> — slides and quiz both — so a trainee sees everything in the language their trainer assigned.</p>
      <p><b>The whole loop is automated.</b> Assigning a training emails the trainee a deep link, deadline, and a <b>Google Form version of the quiz with a QR code</b> — auto-built per language via the Forms API, and auto-rebuilt whenever the quiz changes. Responses are pulled back and merged with portal attempts under a best-score-before-deadline policy. Reminders and overdue escalations run hourly; offline classes get printed quiz sheets with CSV re-import and AI answer-sheet matching.</p>
      <p><b>Roles &amp; records.</b> Trainee / Trainer / HOD / Admin roles with scoped access, HOD team assignment, and generated training records matching the company's controlled form.</p>
      <p><b>Tech.</b> Python · React · Anthropic Claude · Google Forms API · SQL Server · SMTP. <b>Status:</b> deployed and in daily use.</p>`,
  },
  {
    title: "Workflow Apps — NCMR / MR", status: "deployed",
    desc: "Turned internal document-workflow prototypes into real multi-user apps with server-side persistence.",
    tags: ["Flask", "SQLite", "JavaScript"],
    detail: `<p><b>What it does.</b> Productised internal tools. Two document-workflow prototypes (non-conformance reports and material requests) were ported from standalone HTML into a single <b>Flask + SQLite</b> app with server-side persistence — preserving the original interface via a localStorage→server shim so users saw no disruption.</p>
      <p><b>Tech.</b> Flask · SQLite · JavaScript. <b>Status:</b> deployed.</p>`,
  },
  // ── open-source / personal projects (public on GitHub) ──
  {
    title: "DaybreakOS — Linux distro with on-device AI", status: "oss",
    link: "https://github.com/Aneek1/daybreakos",
    desc: "A Linux distribution built from source, with a desktop environment written from scratch in C and an LLM assistant that runs entirely offline.",
    tags: ["Linux From Scratch", "C / GTK3", "Wayland", "llama.cpp", "LLM evaluation", "Bash", "Kernel config"],
    detail: `<p><b>What it is.</b> A complete Linux distribution built from source with <b>Linux From Scratch 12.3 (systemd)</b> — toolchain, kernel and userland compiled from upstream tarballs by 26 numbered build scripts. It boots into <b>Aurora Shell</b>: a desktop environment I wrote in <b>C with GTK3 and gtk-layer-shell</b> over the <code>labwc</code> Wayland compositor. Not a browser kiosk and not a re-skinned desktop — the top bar, dock, launcher, control centre, notifications, lock screen and wallpaper are all its own code.</p>
      <p><b>The AI part.</b> <b>Aura</b> is an on-device assistant (llama.cpp running <b>Qwen2.5-1.5B-Instruct</b>, Q4_K_M, Apache-2.0) that both answers questions and <i>operates the desktop</i> — "open a terminal", "system status", "set brightness to 40" — through a small system-bridge daemon. It runs <b>entirely offline</b>: no cloud, no account, no telemetry.</p>
      <p><b>How the model was chosen.</b> I wrote a 73-case test set (40 tool requests, 33 chat and power prompts that must not trigger an action) and ran each candidate three times on CPU. Averaged, Qwen2.5-1.5B picked the right tool on <b>81.7%</b> of requests against <b>58.3%</b> for the previous Llama-3.2-1B, within a 2× latency budget. On its own the model still tries an action on about 40% of the prompts that shouldn't trigger one; Aura's keyword gate stops all but 1 of 33. Every run, with its caveats, is in the repo README.</p>
      <p><b>Safety.</b> The model has no power tool. Typing "shut down" shows <b>Power off / Cancel</b> buttons and nothing happens without a click, and the system daemon refuses requests a web page could send, so a browser tab can't trigger actions.</p>
      <p><b>The hard parts.</b> Building hardware graphics drivers for <b>AMD (radeonsi), NVIDIA (nouveau) and Intel (iris)</b> in Mesa — the Intel path needing clang, SPIR-V and libclc built first; an <b>install-to-disk</b> path (GPT + ext4 + UEFI GRUB) that turns the live squashfs into a real system; persistent storage via an overlay upper-dir; and an app store that extracts and runs packages from a plain catalogue. Targets <b>x86_64 and aarch64</b>.</p>
      <p><b>Tech.</b> Linux From Scratch · C / GTK3 / gtk-layer-shell · labwc / Wayland · llama.cpp · Python · Bash · kernel configuration · Mesa. <b>Status:</b> open source; boots in VirtualBox. Real-hardware support (USB boot, firmware, Wi-Fi and audio on a current laptop) is designed and not yet tested.</p>`,
  },
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
