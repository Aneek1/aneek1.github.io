import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PROJECTS, STATUS, CONFIG } from "./data.js";

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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
  </svg>
);
const Moon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null); // selected project for modal
  const d = reduce ? 0 : 22;

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };
  const item = {
    hidden: { opacity: 0, y: d },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 130, damping: 18 } },
  };
  const reveal = {
    initial: { opacity: 0, y: d },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] },
  };

  // close modal on Escape
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => { if (e.key === "Escape") setActive(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [active]);

  const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const footerLinks = [
    CONFIG.email && { href: `mailto:${CONFIG.email}`, label: "Email" },
    { href: CONFIG.github, label: "GitHub" },
    CONFIG.linkedin && { href: CONFIG.linkedin, label: "LinkedIn" },
  ].filter(Boolean);

  return (
    <>
      {/* nav */}
      <nav>
        <div className="wrap">
          <div className="brand">aneek<span className="dot">.</span></div>
          <div className="nav-right">
            <div className="nav-links">
              <a href="#work">Work</a>
              <a href="#stack">Stack</a>
              <a href="#about">About</a>
              <a href={CONFIG.github}>GitHub</a>
            </div>
            <button className="toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </nav>

      {/* hero */}
      <header className="hero">
        <div className="aurora"><span className="a1" /><span className="a2" /></div>
        <motion.div className="wrap" variants={container} initial="hidden" animate="show">
          <motion.div className="eyebrow" variants={item}>AI Engineer</motion.div>
          <motion.h1 variants={item}>I build AI agents<br />that do <span className="grad">real work</span>.</motion.h1>
          <motion.p className="sub" variants={item}>
            I design and ship <b>production automation agents</b> — AI wired into ERP systems, email,
            and document workflows to remove manual, repetitive work end-to-end.
          </motion.p>
          <motion.div className="cta" variants={item}>
            <a className="btn primary" href="#work">View work →</a>
            <a className="btn ghost" href={CONFIG.github}>GitHub</a>
          </motion.div>
          <motion.div className="stats" variants={item}>
            <div className="stat"><div className="n">4+</div><div className="l">production AI agents</div></div>
            <div className="stat"><div className="n">ERP · Email · OCR</div><div className="l">workflows automated</div></div>
            <div className="stat"><div className="n">AI · Full-stack · Robotics</div><div className="l">across the portfolio</div></div>
          </motion.div>
        </motion.div>
      </header>

      {/* terminal */}
      <section style={{ paddingTop: 10 }}>
        <div className="wrap">
          <motion.div className="term" {...reveal}>
            <div className="bar"><i className="r" /><i className="y" /><i className="g" /><span className="t mono">aneek@portfolio: ~</span></div>
            <motion.div className="body mono" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
              {[
                <><span className="p">$</span> <span className="c">whoami</span></>,
                <span className="o">AI engineer. I build automation agents on top of foundation models —</span>,
                <span className="o">prompting, tool use, retrieval, evals, and the unglamorous integration</span>,
                <span className="o">work that makes them reliable in production.</span>,
                <span className="o" style={{ opacity: 0 }}>.</span>,
                <><span className="p">$</span> <span className="c">cat principles.txt</span></>,
                <span className="o">› deterministic lookups before AI &nbsp; › cost &amp; latency are features</span>,
                <span className="o">› log every call &nbsp; › fail loudly &nbsp; › ship, then measure</span>,
              ].map((line, i) => <motion.div key={i} variants={item}>{line}</motion.div>)}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* work */}
      <section id="work">
        <div className="wrap">
          <motion.div className="sec-head" {...reveal}><span className="tag">/ work</span><h2>Selected projects</h2></motion.div>
          <motion.p className="lead" {...reveal}>
            Click any project for the full story. A mix of production AI agents built into a live ERP,
            a full-stack AI product, and robotics / computer-vision work.
          </motion.p>
          <motion.div className="grid" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
            {PROJECTS.map((p, i) => {
              const st = STATUS[p.status] || STATUS.built;
              return (
                <motion.div
                  key={i} className="card" variants={item}
                  whileHover={reduce ? {} : { y: -4 }}
                  onMouseMove={spotlight}
                  onClick={() => setActive(p)}
                  role="button" tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(p); } }}
                >
                  <div className="top"><h3>{p.title}</h3><span className={`badge ${st.cls}`}>{p.statusLabel || st.label}</span></div>
                  <p>{p.desc}</p>
                  <div className="tags">{p.tags.map((t, j) => <span key={j} className="tag-c">{t}</span>)}</div>
                  <span className="more">View details →</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* stack */}
      <section id="stack">
        <div className="wrap">
          <motion.div className="sec-head" {...reveal}><span className="tag">/ stack</span><h2>How I build</h2></motion.div>
          <motion.div className="stack" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
            {[
              ["AI / Agents", ["Anthropic Claude", "OpenAI / Gemini", "Tool use / function calling", "Agentic workflows", "RAG", "Prompt caching", "Vision / OCR", "Computer vision", "Evals", "Cost & usage control"]],
              ["Frontend", ["React", "TypeScript", "Vite", "TailwindCSS", "Framer Motion", "Electron"]],
              ["Backend", ["Python", "Flask", "FastAPI", "Node / Express", "Socket.IO / WebSockets", "SQLite", "MongoDB"]],
              ["Integration & Automation", ["Dynamics 365 Business Central", "OData", "Selenium", "Outlook / Graph", "Document parsing"]],
              ["Robotics & Simulation", ["ROS 2", "Nav2", "Lidar / Depth fusion", "A* path planning", "Digital twins"]],
              ["Cloud & Ops", ["Azure", "Static Web Apps", "Azure SQL", "Entra ID", "Blob Storage", "Docker"]],
            ].map(([h, tags], i) => (
              <motion.div key={i} className="scol" variants={item}>
                <h4>{h}</h4>
                <div className="row">{tags.map((t, j) => <span key={j} className="tag-c">{t}</span>)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* about */}
      <section id="about" className="about">
        <div className="wrap">
          <motion.div className="sec-head" {...reveal}><span className="tag">/ about</span><h2>About</h2></motion.div>
          <motion.p {...reveal}>
            I'm an <b>AI engineer</b> focused on turning foundation models into dependable production
            systems. Most of my work lives <b>above the API line</b>: prompting, retrieval, tool use,
            evals, and the integration and reliability engineering that makes an agent trustworthy
            enough to run a real business process. Alongside that I build full-stack AI products and
            have a background in robotics and computer vision. I currently build automation agents for
            the operations and procurement teams at <b>SP Manufacturing</b>, wiring AI into ERP, email,
            and document workflows.
          </motion.p>
        </div>
      </section>

      {/* footer */}
      <footer>
        <div className="wrap">
          <div className="flinks">{footerLinks.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}</div>
          <div className="fnote">© 2026 Aneek Chattopadhyay · Built with React + Framer Motion</div>
        </div>
      </footer>

      {/* detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="modal-bg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => { if (e.target === e.currentTarget) setActive(null); }}
          >
            <motion.div
              className="modal-panel"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
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
