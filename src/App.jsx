import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PROJECTS, STATUS, CONFIG, EXPERIENCE } from "./data.js";

/* ---------- theme ---------- */
function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "dark"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch { /* ignore */ }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

const Sun = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
  </svg>
);
const Moon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

/* ---------- shared reveal ---------- */
const EASE = [0.22, 0.72, 0.18, 1];

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null); // selected project for modal
  const d = reduce ? 0 : 18;

  const reveal = {
    initial: { opacity: 0, y: d },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.7, ease: EASE },
  };
  const heroItem = (i) => ({
    initial: { opacity: 0, y: d },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.08 * i, ease: EASE },
  });

  // close modal on Escape
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => { if (e.key === "Escape") setActive(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [active]);

  const contactLinks = [
    CONFIG.email && { href: `mailto:${CONFIG.email}`, label: "Email" },
    { href: CONFIG.github, label: "GitHub" },
    CONFIG.linkedin && { href: CONFIG.linkedin, label: "LinkedIn" },
  ].filter(Boolean);

  return (
    <>
      {/* nav */}
      <nav>
        <div className="wrap nav-in">
          <a className="brand" href="#top">Aneek Chattopadhyay</a>
          <div className="nav-right">
            <div className="nav-links">
              <a href="#work">Work</a>
              <a href="#experience">Experience</a>
              <a href="#stack">Stack</a>
              <a href="#contact">Contact</a>
            </div>
            <button className="toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </nav>

      {/* hero */}
      <header className="hero" id="top">
        <div className="wrap">
          <motion.p className="kicker" {...heroItem(0)}>
            <span className="pulse" /> AI Engineer · Singapore
          </motion.p>
          <motion.h1 {...heroItem(1)}>
            I build AI agents<br />
            that do <em>real work</em>.
          </motion.h1>
          <motion.p className="sub" {...heroItem(2)}>
            Production automation agents — AI wired into ERP systems, email, and document
            workflows to remove manual, repetitive work end-to-end.
          </motion.p>

          <motion.div className="hero-meta" {...heroItem(3)}>
            <div className="meta-col">
              <h5>Focus</h5>
              <ul>
                <li>Automation agents</li>
                <li>ERP &amp; document workflows</li>
                <li>Full-stack AI products</li>
                <li>Multilingual NLP &amp; on-device AI</li>
                <li>Robotics &amp; computer vision</li>
              </ul>
            </div>
            <div className="meta-col">
              <h5>Currently</h5>
              <ul>
                <li>AI Engineer at SP Manufacturing</li>
                <li>4+ agents in production / UAT</li>
                <li>Migrating the suite to Azure</li>
              </ul>
            </div>
            <div className="meta-col">
              <h5>Contact</h5>
              <ul>
                {contactLinks.map((l, i) => (
                  <li key={i}><a href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a></li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </header>

      {/* terminal strip */}
      <section className="term-sec" aria-label="About in brief">
        <div className="wrap">
          <motion.div className="term mono" {...reveal}>
            <div className="line"><span className="p">$</span> whoami</div>
            <div className="line o">AI engineer. I build automation agents on top of foundation models —</div>
            <div className="line o">prompting, tool use, retrieval, evals, and the unglamorous integration</div>
            <div className="line o">work that makes them reliable in production.</div>
            <div className="line gap"><span className="p">$</span> cat principles.txt</div>
            <div className="line o">› deterministic lookups before AI · cost &amp; latency are features</div>
            <div className="line o">› log every call · fail loudly · ship, then measure</div>
          </motion.div>
        </div>
      </section>

      {/* work */}
      <section id="work">
        <div className="wrap">
          <motion.div className="sec-head" {...reveal}>
            <h2>Selected <em>work</em></h2>
            <p className="lead">
              Production AI agents built into a live ERP, a full-stack AI product, and
              robotics / computer-vision work. Select a project for the full story.
            </p>
          </motion.div>

          <div className="plist" role="list">
            {PROJECTS.map((p, i) => {
              const st = STATUS[p.status] || STATUS.built;
              return (
                <motion.article
                  key={i} className="prow" role="listitem" tabIndex={0}
                  onClick={() => setActive(p)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(p); } }}
                  initial={{ opacity: 0, y: d }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: reduce ? 0 : 0.03 * (i % 4), ease: EASE }}
                >
                  <span className="pnum mono">{String(i + 1).padStart(2, "0")}</span>
                  <div className="pmain">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="tags">{p.tags.map((t, j) => <span key={j} className="tag-c">{t}</span>)}</div>
                  </div>
                  <div className="pside">
                    <span className={`badge ${st.cls}`}>{p.statusLabel || st.label}</span>
                    <span className="arrow" aria-hidden="true">→</span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* experience */}
      <section id="experience">
        <div className="wrap">
          <motion.div className="sec-head" {...reveal}>
            <h2>Experience</h2>
          </motion.div>
          <div className="xlist">
            {EXPERIENCE.map((x, i) => (
              <motion.div key={i} className="xrow" {...reveal}>
                <div className="xwhen mono">{x.when}</div>
                <div className="xbody">
                  <h3>{x.role} <span className="xorg">· {x.org}, {x.where}</span></h3>
                  <p>{x.blurb}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="edu" {...reveal}>
            <div className="xrow">
              <div className="xwhen mono">2024 — 2025</div>
              <div className="xbody">
                <h3>MSc Technology &amp; Design (Robotics &amp; Automation) <span className="xorg">· SUTD</span></h3>
                <p>CGPA 3.94 / 4.5 · Singapore University of Technology and Design</p>
              </div>
            </div>
            <div className="xrow">
              <div className="xwhen mono">2021 — 2024</div>
              <div className="xbody">
                <h3>BEng (Hons) Mechanical Engineering <span className="xorg">· University of Manchester</span></h3>
                <p>United Kingdom</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* stack */}
      <section id="stack">
        <div className="wrap">
          <motion.div className="sec-head" {...reveal}>
            <h2>How I <em>build</em></h2>
          </motion.div>
          <div className="slist">
            {[
              ["AI / Agents", ["Anthropic Claude", "OpenAI / Gemini", "Tool use", "Agentic workflows", "RAG", "Prompt caching", "Vision / OCR", "Computer vision", "Evals", "On-device LLMs (llama.cpp, Ollama)", "JSON-schema constrained decoding", "Cost & usage control"]],
              ["Language & NLP", ["Language identification", "GlotLID / fastText", "Script detection & Unicode normalization", "Simplified / Traditional Chinese (OpenCC)", "Multilingual embeddings (e5)", "Script-aware chunking", "Vector search (Qdrant)", "Citation checking", "Model quantization"]],
              ["Linux & OS Dev", ["Linux From Scratch", "Kernel configuration", "C / GTK3", "Wayland (wlroots, labwc)", "systemd", "Mesa GPU drivers", "UEFI / GRUB", "squashfs / overlayfs", "Bash build pipelines", "QEMU / VirtualBox"]],
              ["Frontend", ["React", "TypeScript", "Vite", "TailwindCSS", "Framer Motion", "Electron"]],
              ["Backend", ["Python", "Flask", "FastAPI", "Node / Express", "Socket.IO / WebSockets", "SQLite", "MongoDB"]],
              ["Integration & Automation", ["Dynamics 365 Business Central", "OData", "Selenium", "Outlook / Graph", "Document parsing"]],
              ["Robotics & Simulation", ["ROS 2", "Nav2", "Lidar / Depth fusion", "A* path planning", "Digital twins"]],
              ["Cloud & Ops", ["Azure", "Static Web Apps", "Azure SQL", "Entra ID", "Blob Storage", "Docker"]],
            ].map(([h, tags], i) => (
              <motion.div key={i} className="srow" {...reveal}>
                <h4>{h}</h4>
                <div className="row">{tags.map((t, j) => <span key={j} className="tag-c">{t}</span>)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* contact / footer */}
      <footer id="contact">
        <div className="wrap">
          <motion.h2 className="f-big" {...reveal}>
            Let's build something<br /><em>that ships.</em>
          </motion.h2>
          {CONFIG.email && (
            <motion.a className="f-mail" href={`mailto:${CONFIG.email}`} {...reveal}>
              {CONFIG.email}
            </motion.a>
          )}
          <div className="f-bottom">
            <div className="flinks">
              {contactLinks.map((l, i) => (
                <a key={i} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
              ))}
            </div>
            <div className="fnote">© 2026 Aneek Chattopadhyay</div>
          </div>
        </div>
      </footer>

      {/* detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="modal-bg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => { if (e.target === e.currentTarget) setActive(null); }}
          >
            <motion.div
              className="modal-panel"
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.985 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
            >
              <button className="modal-x" onClick={() => setActive(null)} aria-label="Close">×</button>
              <span className={`badge ${(STATUS[active.status] || STATUS.built).cls}`}>
                {active.statusLabel || (STATUS[active.status] || STATUS.built).label}
              </span>
              <h3>{active.title}</h3>
              <div className="m-detail" dangerouslySetInnerHTML={{ __html: active.detail || `<p>${active.desc}</p>` }} />
              <div className="tags m-tags">{active.tags.map((t, j) => <span key={j} className="tag-c">{t}</span>)}</div>
              {active.link && <a className="m-repo" href={active.link} target="_blank" rel="noopener noreferrer">View code on GitHub ↗</a>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
