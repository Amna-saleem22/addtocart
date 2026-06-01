import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock, FiInstagram, FiFacebook, FiTwitter, FiSend } from "react-icons/fi";
import Breadcrumb from "../components/ui/Breadcrumb";
import toast from "react-hot-toast";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }) };

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
  };

  const info = [
    { icon: <FiMapPin size={20} />, title: "Visit Us", lines: ["LUXE Couture Atelier", "123 Fashion District, Gulberg III", "Lahore, Pakistan 54000"] },
    { icon: <FiPhone size={20} />, title: "Call Us", lines: ["+92 300 1234567", "+92 42 1234567", "Mon–Sat: 9am–9pm PKT"] },
    { icon: <FiMail size={20} />, title: "Email Us", lines: ["hello@luxecouture.pk", "orders@luxecouture.pk", "support@luxecouture.pk"] },
    { icon: <FiClock size={20} />, title: "Business Hours", lines: ["Monday – Friday: 9am – 9pm", "Saturday: 10am – 8pm", "Sunday: Closed"] },
  ];

  const faqs = [
    { q: "How long does shipping take?", a: "Standard shipping takes 3–5 business days within Pakistan. International orders may take 7–14 days." },
    { q: "What is your return policy?", a: "We offer a hassle-free 30-day return policy. Items must be unworn and in original packaging with tags attached." },
    { q: "Do you offer custom stitching?", a: "Yes! We offer custom measurement and stitching for select products. Contact us to discuss your requirements." },
    { q: "Is Cash on Delivery available?", a: "Yes, COD is available for all orders within Pakistan. International orders require online payment." },
  ];

  return (
    <div className="page-content">
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="container-luxe"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} /></div>
      </div>

      {/* Hero */}
      <section style={{ background: "var(--bg-secondary)", padding: "4rem 0", textAlign: "center" }}>
        <div className="container-luxe">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="section-tag">Get In Touch</span>
            <h1 className="section-title font-serif" style={{ marginBottom: "1rem" }}>We'd Love to Hear<br />From You</h1>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>Questions, orders, custom requests — our team is here to help you every step of the way.</p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container-luxe">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
            {info.map((item, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}
                className="card-luxe" style={{ padding: "1.75rem", textAlign: "center" }}
              >
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(201,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "var(--secondary)" }}>
                  {item.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem", color: "var(--secondary)" }}>{item.title}</h3>
                {item.lines.map((line, j) => <p key={j} style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{line}</p>)}
              </motion.div>
            ))}
          </div>

          {/* Form + Map */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {/* Form */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="card-luxe" style={{ padding: "2.5rem" }}
            >
              <h2 className="font-serif" style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Send a Message</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "2rem" }}>Fill the form and we'll respond within 24 hours.</p>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "6px" }}>Your Name *</label>
                    <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="John Doe" className="input-luxe" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "6px" }}>Email Address *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" className="input-luxe" />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "6px" }}>Subject *</label>
                  <select required value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} className="input-luxe">
                    <option value="">Select a subject</option>
                    <option>Order Inquiry</option>
                    <option>Product Question</option>
                    <option>Return & Refund</option>
                    <option>Custom Order</option>
                    <option>Wholesale Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "6px" }}>Message *</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us how we can help you..."
                    className="input-luxe" style={{ resize: "vertical", minHeight: "120px" }} />
                </div>
                <button type="submit" disabled={submitting}
                  className="btn-primary-luxe" style={{ justifyContent: "center", opacity: submitting ? 0.7 : 1 }}>
                  <FiSend size={16} /> {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Follow us:</span>
                {[{ icon: <FiInstagram size={16} />, href: "#" }, { icon: <FiFacebook size={16} />, href: "#" }, { icon: <FiTwitter size={16} />, href: "#" }].map((s, i) => (
                  <a key={i} href={s.href} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--secondary)"; e.currentTarget.style.color = "var(--secondary)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                  >{s.icon}</a>
                ))}
              </div>
            </motion.div>

            {/* Map placeholder */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ borderRadius: "16px", overflow: "hidden", background: "var(--bg-secondary)", flex: 1, minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "3rem" }}>🗺️</div>
                <div style={{ fontWeight: 700, fontSize: "1rem" }}>LUXE Couture Atelier</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "center", padding: "0 2rem" }}>123 Fashion District, Gulberg III<br />Lahore, Punjab 54000, Pakistan</div>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-secondary-luxe" style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem" }}>
                  Open in Maps
                </a>
              </div>

              {/* FAQ */}
              <div className="card-luxe" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontWeight: 700, marginBottom: "1.25rem" }}>Frequently Asked</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {faqs.map((faq, i) => (
                    <div key={i} style={{ paddingBottom: "1rem", borderBottom: i < faqs.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: "4px" }}>{faq.q}</div>
                      <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
