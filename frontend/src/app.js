import { useState } from "react";
import "./app.css";
import axios from "axios";
import { ArrowRight, ArrowUpRight, Check, Clock3, Globe2, Linkedin, Menu, MoveUpRight, ShieldCheck, Sparkles, X } from "lucide-react";
import { Toaster, toast } from "sonner";
import "./theme.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const services = [
  { no: "01", title: "Advisory & strategy", text: "Navigate complex risk, transformation and growth decisions with structured advisory." , tag: "Risk Guard"},
  { no: "02", title: "Secure technology", text: "Build resilient digital foundations with technology-led thinking and practical delivery." , tag: "Joint capability"},
  { no: "03", title: "Consulting & assurance", text: "Turn standards and frameworks into repeatable ways of working across the enterprise." , tag: "Risk Guard"},
];
const industries = ["BFSI", "Healthcare", "Manufacturing", "Government", "Retail", "Technology"];

function Logo({ company, accent }) { return <div className="logo-mark" data-testid={`${company}-logo`}><span style={{ color: accent }}>◒</span><div><b>{company}</b><small>PRIVATE LIMITED</small></div></div>; }

const SectionIntro = ({ eyebrow, title, children }) => <div className="section-intro"><span className="eyebrow" data-testid={`${eyebrow.toLowerCase().replaceAll(" ", "-")}-eyebrow`}>{eyebrow}</span><h2 data-testid={`${eyebrow.toLowerCase().replaceAll(" ", "-")}-heading`}>{title}</h2>{children && <p>{children}</p>}</div>;

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", service: "", message: "" });
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const submit = async (event) => {
    event.preventDefault(); setSending(true);
    try { const response = await axios.post(`${API}/enquiries`, form); setSent(true); toast.success(`Enquiry received · Ref ${response.data.reference}`); setForm({ name: "", company: "", email: "", phone: "", service: "", message: "" }); }
    catch { toast.error("We could not submit your enquiry. Please try again."); }
    finally { setSending(false); }
  };
  return <div className="site-shell"><Toaster theme="light" position="bottom-right" />
    <header className="nav" data-testid="site-header"><div className="nav-inner"><a className="brand-lockup" href="#top" data-testid="home-logo-link"><Logo company="TD X RGES" accent="#2f65d9" /><span className="connector">×</span><Logo company="RISK GUARD" accent="#7188ad" /></a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} data-testid="mobile-menu-button" aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button><nav className={menuOpen ? "nav-links open" : "nav-links"} data-testid="main-navigation">{[["About", "about"], ["Services", "services"], ["Industries", "industries"], ["Team", "team"]].map(([label,id]) => <button key={id} onClick={() => go(id)} data-testid={`nav-${id}-link`}>{label}</button>)}<button className="nav-cta" onClick={() => go("contact")} data-testid="nav-contact-button">Start a conversation <ArrowUpRight size={15} /></button></nav></div></header>
    <main id="top">
      <section className="hero section-pad"><div className="hero-grid"><div className="hero-copy"><div className="status-line" data-testid="hero-status"><span className="pulse-dot" /> STRATEGIC COLLABORATION · HYDERABAD</div><h1 data-testid="hero-heading">Two organizations.<br /><em>One clear</em> vision.</h1><p className="hero-lede" data-testid="hero-description">A focused collaboration between technology capability and cyber resilience — helping ambitious organizations move forward with confidence.</p><div className="hero-actions"><button className="button button-primary" onClick={() => go("services")} data-testid="hero-services-button">Explore our capabilities <ArrowRight size={17} /></button><button className="text-link" onClick={() => go("about")} data-testid="hero-about-button">Why this collaboration <MoveUpRight size={16} /></button></div></div><div className="hero-art"><div className="orb orb-one" /><div className="orb orb-two" /><div className="hero-image"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=85&w=1600&auto=format&fit=crop" alt="Colleagues working together in a meeting" /></div><div className="hero-note"><span>STRATEGIC PARTNERSHIP</span><strong>Capability, connected.</strong><small>Independent expertise. Shared ambition.</small></div></div></div><div className="hero-footer"><span>Scroll to explore</span><div className="scroll-line" /><span>01 — 06</span></div></section>
      <section className="proof-strip"><div><span className="proof-value">30<span>+</span></span><span className="proof-label">Years experience claimed by<br />Risk Guard</span></div><div><span className="proof-value">06</span><span className="proof-label">Industries with<br />deep expertise</span></div><div><span className="proof-value">24<span>/7</span></span><span className="proof-label">Managed security<br />service capability</span></div><div className="proof-caption">A stronger point of view<br />for what comes next <ArrowUpRight size={17} /></div></section>
      <section id="about" className="section-pad about-section"><SectionIntro eyebrow="The premise" title={<>Separate strengths.<br /><span>Shared direction.</span></>}><span>Two established organizations working together without losing what makes each one distinct. This is a strategic collaboration designed to give clients a more complete perspective.</span></SectionIntro><div className="about-layout"><div className="about-image"><img src="https://images.unsplash.com/photo-1638262052640-82e94d64664a?q=85&w=1200&auto=format&fit=crop" alt="Business leaders collaborating" /><div className="image-stamp"><Sparkles size={17} /><span>Built for<br />what&apos;s next</span></div></div><div className="about-content"><p className="large-copy">The right technology only creates value when it is trusted, resilient and built around the reality of your business.</p><div className="principles">{["Technology with intent", "Security by design", "Value that endures"].map((t,i) => <div className="principle" key={t}><span>0{i+1}</span><div><h3>{t}</h3><p>{["Practical, purposeful solutions that support better decisions and meaningful progress.", "Risk-aware thinking woven into every layer of your digital environment.", "A long-term perspective that keeps people, performance and trust in view."][i]}</p></div></div>)}</div></div></div></section>
      <section id="services" className="section-pad services-section"><div className="section-topline"><SectionIntro eyebrow="Combined capabilities" title={<>What we bring<br /><span>to the table.</span></>} /><p className="side-note">From strategic advisory to hands-on security and technology, our combined perspective is built to meet complexity with clarity.</p></div><div className="service-grid">{services.map((service) => <article className="service-card" key={service.no} data-testid={`service-card-${service.no}`}><div className="service-meta"><span>{service.no}</span><span className="service-tag">{service.tag}</span></div><div className="service-icon"><ShieldCheck size={28} /></div><h3>{service.title}</h3><p>{service.text}</p><button onClick={() => go("contact")} data-testid={`service-enquire-${service.no}`}>Discuss this capability <ArrowUpRight size={15} /></button></article>)}</div></section>
      <section id="industries" className="dark-band section-pad"><div className="section-topline"><SectionIntro eyebrow="Where we work" title={<>Built for the<br /><span>real world.</span></>} /><p className="side-note">Risk Guard brings verified expertise across sectors where trust, continuity and compliance matter most.</p></div><div className="industry-list">{industries.map((industry, i) => <div className="industry-row" key={industry} data-testid={`industry-${industry.toLowerCase()}`}><span>0{i+1}</span><h3>{industry}</h3><p>{["Risk-aware transformation for financial ecosystems.", "Protecting sensitive care and health data.", "Resilient operations for connected production.", "Secure, accountable public infrastructure.", "Trust-led digital experiences at scale.", "Security and technology for ambitious teams."][i]}</p><ArrowUpRight size={20} /></div>)}</div></section>
      <section id="team" className="section-pad team-section"><div className="section-topline"><SectionIntro eyebrow="The people" title={<>Experience with<br /><span>perspective.</span></>} /><p className="side-note">Leadership profiles and team expertise will be added as the collaboration is formally introduced.</p></div><div className="team-grid"><div className="team-card team-primary"><div className="avatar-placeholder">TD</div><div><span>TD X RGES</span><h3>Leadership profile</h3><p>Profile and areas of expertise to be confirmed.</p></div><ArrowUpRight size={19} /></div><div className="team-card"><div className="avatar-placeholder blue">RG</div><div><span>RISK GUARD</span><h3>Leadership profile</h3><p>Profile and areas of expertise to be confirmed.</p></div><ArrowUpRight size={19} /></div></div></section>
      <section id="contact" className="contact-section"><div className="contact-intro"><span className="eyebrow">Start a conversation</span><h2>Let’s make the<br /><em>next move</em> count.</h2><p>Tell us what you are working toward. We’ll bring the right people and perspective to the conversation.</p><div className="contact-details"><span><Globe2 size={17} /> Hyderabad · India</span><span><Clock3 size={17} /> Response within one business day</span></div></div><div className="form-wrap">{sent ? <div className="success-state" data-testid="enquiry-success"><div className="success-icon"><Check /></div><span className="eyebrow">Message received</span><h3>Thank you for reaching out.</h3><p>Your enquiry is safely with the team. We’ll be in touch shortly.</p><button className="text-link" onClick={() => setSent(false)} data-testid="send-another-button">Send another enquiry <ArrowRight size={16} /></button></div> : <form onSubmit={submit} data-testid="enquiry-form"><div className="form-grid"><label>Name<input required value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Your full name" data-testid="enquiry-name-input" /></label><label>Company<input required value={form.company} onChange={e => setForm({...form,company:e.target.value})} placeholder="Organization" data-testid="enquiry-company-input" /></label><label>Email<input required type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="you@company.com" data-testid="enquiry-email-input" /></label><label>Phone <span>(optional)</span><input value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="+91" data-testid="enquiry-phone-input" /></label></div><label>What can we help with?<select required value={form.service} onChange={e => setForm({...form,service:e.target.value})} data-testid="enquiry-service-select"><option value="">Select a capability</option><option>Advisory & strategy</option><option>Secure technology</option><option>Consulting & assurance</option><option>Other / not sure yet</option></select></label><label>Message<textarea required minLength="10" value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder="Tell us a little about what you are looking to solve..." data-testid="enquiry-message-input" /></label><button className="button button-primary submit-button" disabled={sending} data-testid="enquiry-submit-button">{sending ? "Sending..." : "Submit enquiry"} <ArrowUpRight size={17} /></button><p className="form-footnote">Your information is used only to respond to this enquiry.</p></form>}</div></section>
    </main>
    <footer className="footer">
      <div className="footer-top">
        <div>
          <a className="brand-lockup" href="#top" data-testid="footer-logo-link">
            <Logo company="TD X RGES" accent="#2f65d9" />
            <span className="connector">×</span>
            <Logo company="RISK GUARD" accent="#7188ad" />
          </a>
          <p className="footer-tagline">Two organizations. One vision.<br />Greater possibilities.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>Explore</span>
            <button onClick={() => go("about")} data-testid="footer-about-link">About</button>
            <button onClick={() => go("services")} data-testid="footer-services-link">Services</button>
            <button onClick={() => go("team")} data-testid="footer-team-link">Team</button>
          </div>
          <div>
            <span>Connect</span>
            <a href="https://www.riskguardcyberservices.in/" target="_blank" rel="noreferrer" data-testid="riskguard-website-link">Risk Guard website <ArrowUpRight size={13} /></a>
            <a href="#contact" data-testid="footer-contact-link">Get in touch <ArrowUpRight size={13} /></a>
            <a href="#top" data-testid="footer-linkedin-link"><Linkedin size={14} /> LinkedIn <ArrowUpRight size={13} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Strategic collaboration. All rights reserved.</span>
        <span>Designed for trust, built for progress.</span>
      </div>
    </footer>
  </div>;
}

function App() {
  return <Home />;
}

export default App;
