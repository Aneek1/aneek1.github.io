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
    desc: "Chases vendors for missing delivery dates on purchase orders, sending as each buyer from their own mailbox. 19 buyers live; 1,206 vendor emails in the two weeks to 8 Oct 2026.",
    tags: ["Python", "Claude API", "BC OData", "SOAP web services", "SMTP", "SQL Server"],
    detail: `<p><b>The problem.</b> Buyers spend hours each week emailing vendors to confirm delivery dates on open purchase orders, and re-chasing the ones that don't reply.</p>
      <p><b>What it does.</b> Twice a day the agent reads newly released purchase orders from <b>Microsoft Dynamics 365 Business Central</b> over OData and emails the vendor the official PO PDF. Lines still missing a vendor-committed date are chased on a business-day ladder (reminder, urgent, escalation with management copied). Each email goes out as the buyer who owns the PO, from their own mailbox and under their own ERP login, so there is no shared account that can lock everyone out.</p>
      <p><b>Knowing what not to send.</b> Before every send it re-reads the live ERP record, and it skips POs that reach the vendor another way: EDI transmissions, orders placed on a vendor's website (an ERP toggle the purchasing team added), excluded vendors, and a do-not-email list buyers manage themselves.</p>
      <p><b>A failure I had to find.</b> Vendor records hold several addresses in one field. Passed to the mail server as a single recipient they were refused, and because the buyer's own copy was accepted the mail library reported success. From 17 Jul to 3 Aug 2026, 46 of 54 vendor emails were never delivered while the logs looked clean; it surfaced only when a vendor said they had not received a PO. The fix splits the addresses, records which recipients the server actually accepted, and alerts when no vendor address got through. Delivery is now measured, not assumed.</p>
      <p><b>Running it.</b> Each buyer gets a short plain-language email in the morning, only when something needs them: a PO that couldn't be sent, a vendor with no date after the final reminder, a login the ERP rejected. A watchdog checks the agent every 10 minutes. Changes go to a separate UAT instance first, and every release is versioned with its test evidence attached.</p>
      <p><b>Numbers.</b> 24 Sep to 8 Oct 2026: 1,206 vendor emails accepted by the mail server (655 first sends, 551 reminders) across 694 POs and 252 vendors. Source: the agent's send ledger.</p>
      <p><b>Tech.</b> Python · Anthropic Claude · Business Central OData + SOAP codeunit · SMTP/IMAP · SQL Server. <b>Status:</b> in production since July 2026, rolled out buyer by buyer.</p>`,
  },
  {
    title: "SO Agent — Sales Order Entry", status: "deployed",
    desc: "Turns customer purchase orders (PDF, Excel, email) into ERP sales orders after a planner reviews them. Each planner pushes orders under their own ERP login.",
    tags: ["Python", "Flask + Socket.IO", "Claude API", "Doc parsing", "BC OData"],
    detail: `<p><b>The problem.</b> Customer purchase orders arrive as PDFs, spreadsheets and emails, and get re-typed into the ERP by hand, slowly and with errors.</p>
      <p><b>What it does.</b> It reads the document, uses AI to extract the line items (a vision model for scanned PDFs with no text layer), then matches the customer and each item against <b>live ERP master data</b>, including revisions and in-stock substitutes. Nothing is written until the planner has reviewed the lines; it then creates the sales orders over OData and lists each one with a link into the ERP.</p>
      <p><b>The ERP is the authority.</b> When a document disagrees with the ERP on a description, location or item code, the ERP value wins, and a part number that only partly matches is flagged for the planner rather than accepted. Some customers print their own material number with the manufacturer's part number beside it. The agent reads both; when the customer's number isn't in the ERP it looks the item up by the manufacturer's part number, split into base part and revision, under the same exact-match rule, and remembers the match for the next order.</p>
      <p><b>Multi-user.</b> One server, many planners. Each planner sees only their own orders and pushes them under their own ERP login, so the ERP's audit trail shows who created what. Customer-specific readers handle the formats general extraction gets wrong, with regression tests built from real documents.</p>
      <p><b>Tech.</b> Python · Flask + Socket.IO · Anthropic Claude · document parsing · Business Central OData. <b>Status:</b> in production with planning teams at two manufacturing sites.</p>`,
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
    desc: "Internal LMS where AI builds the deck, quiz and translations. When a quality procedure is revised, it works out exactly what changed and trains people on that.",
    tags: ["Python", "React", "Claude API", "Google Forms API", "SQL Server", "SMTP"],
    detail: `<p><b>What it does.</b> Trainers upload source material (or have AI draft a deck from a topic), and the system produces the slides, a quiz with the size and pass mark the trainer sets, and <b>translations (English, Chinese, Indonesian)</b> of both, so each trainee learns and is assessed in their own language.</p>
      <p><b>Procedure revisions.</b> When a quality procedure or work instruction moves to a new revision, staff need training on what changed, not a re-read of the whole document. QA uploads the old and new versions. A <b>deterministic clause-by-clause comparison</b> decides what was added, removed, reworded or moved, including images; AI only explains each change in plain language. QA reviews the list, and the approved change report becomes the training material and the source of the quiz. The training stays a draft until it is published, then goes to the people chosen during review. QA can hand a finished training to department heads: each gets their own copy to assign to their team and is named as the trainer on those staff's records.</p>
      <p><b>The loop is automated.</b> Assigning a training emails a deep link, the deadline and a <b>Google Form version of the quiz with a QR code</b>, built per language through the Forms API and rebuilt when the quiz changes. Responses are merged with portal attempts. Reminders and overdue escalations run hourly, and offline classes get printed quiz sheets with CSV re-import.</p>
      <p><b>Roles and records.</b> Trainee, trainer, department head, HR and admin roles with scoped access, recorded classroom sessions, and training records generated in the company's controlled form layout.</p>
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
      <p><b>How the model was chosen.</b> I wrote a 73-case test set (40 tool requests, 33 chat and power prompts that must not trigger an action) and ran each candidate three times on CPU. Averaged, Qwen2.5-1.5B picked the right tool on <b>81.7%</b> of requests against <b>58.3%</b> for the previous Llama-3.2-1B, within a 2× latency budget. On its own the model still tries an action on about 40% of the prompts that shouldn't trigger one, so a gate decides what actually runs. Every run, with its caveats, is in the repo README.</p>
      <p><b>Then I measured what the gate was costing.</b> Requests that reached the desktop succeeded only <b>70.8%</b> of the time against the model's own 81.7% — the gap was my own keyword filter discarding correct commands, because phrases like "how much battery is left" contain no action word. Reading the stored runs showed half the remaining errors were the model naming a tool that doesn't exist while its intent was right. Mapping those names onto real tools and rewriting the gate took commands that actually run to <b>90.8%</b> across three runs, with false actions no worse than before. The honest reading: this repaired the pipeline around the model, not the model, which is why the pipeline now scores higher than the model does.</p>
      <p><b>Confirmed on a booted system.</b> Numbers from a test harness are not the same as software that works, so I built an ISO, installed it to disk in a VM and drove Aura by chat. "Open a terminal" opened one; "how much battery is left" reported 96% read from the hardware rather than invented; "what is a terminal?" was explained without opening anything; "shut down" returned a confirmation and ran nothing. What was not tested is written down too.</p>
      <p><b>Safety.</b> The model has no power tool. Typing "shut down" shows <b>Power off / Cancel</b> buttons and nothing happens without a click, and the system daemon refuses requests a web page could send, so a browser tab can't trigger actions.</p>
      <p><b>The hard parts.</b> Building hardware graphics drivers for <b>AMD (radeonsi), NVIDIA (nouveau) and Intel (iris)</b> in Mesa — the Intel path needing clang, SPIR-V and libclc built first; an <b>install-to-disk</b> path (GPT + ext4 + UEFI GRUB) that turns the live squashfs into a real system; persistent storage via an overlay upper-dir; and an app store that extracts and runs packages from a plain catalogue. Targets <b>x86_64 and aarch64</b>.</p>
      <p><b>Tech.</b> Linux From Scratch · C / GTK3 / gtk-layer-shell · labwc / Wayland · llama.cpp · Python · Bash · kernel configuration · Mesa. <b>Status:</b> open source; boots in VirtualBox and installs to disk, with the assistant verified working on the installed system. Real-hardware support (USB boot, firmware, Wi-Fi and audio on a current laptop) is designed and not yet tested.</p>`,
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
    desc: "A multilingual RAG assistant for soft-robotics questions, with a language-ID model I trained and published.",
    tags: ["Python", "FastAPI", "React", "RAG", "Language ID", "ONNX", "Docker"],
    detail: `<p><b>What it is.</b> A rebuild of an earlier chatbot into a multilingual retrieval-augmented assistant: it identifies the language of a question, retrieves passages from a licence-tracked knowledge base, and answers with citations. A private mode keeps everything on-device and writes no history.</p>
      <p><b>The part I care about: language identification.</b> Off-the-shelf detectors fail exactly where this application needs them — Malay vs Indonesian, Simplified vs Traditional Chinese, romanized Hindi vs Urdu vs English. I trained three specialists to sit behind GlotLID as a second stage and measured them on FLORES-200 devtest (206,448 sentences). The fine-tuned <code>multilingual-e5-small</code> reaches <b>0.925 macro-F1</b> against GlotLID's 0.939 alone, and the two-stage arrangement reaches <b>0.942</b>. The honest reading: the overall gain is small. The real wins are short and code-mixed input — on single romanized words GlotLID scores 0.142 and fastText's <code>lid.176</code> scores 0.003, while the fine-tuned model reaches <b>0.675</b> — and speed, where a 1.9 MB fastText specialist does 14,577 sentences/s at 0.882 macro-F1 versus GlotLID's 1,538/s from 1.69 GB.</p>
      <p><b>Measured properly.</b> Training data was de-contaminated against every held-out set: 7,543 lines removed, and the final check found 0 rows overlapping any evaluation line. Data provenance (OpenLID, Dakshina, FLORES-200) and every model licence are recorded in the repo. Published on Hugging Face with a model card that states the limitations, including that several test splits are hash splits rather than source-disjoint, so those scores are likely optimistic.</p>
      <p><b>What is not finished.</b> The React workspace UI is a skeleton, and the RAG-side evaluation is partly built. The README says so too — I would rather it be accurate than look complete.</p>
      <p><b>Tech.</b> Python · FastAPI · React + TypeScript · PyTorch → ONNX · fastText · Docker (amd64 + arm64) · GitHub Actions across Linux, Windows and macOS.</p>
      <p><a href="https://huggingface.co/AneekC/lid-specialists-9plus1" target="_blank" rel="noreferrer">Model on Hugging Face →</a></p>`,
  },
];
