import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Breadcrumb from "../components/ui/Breadcrumb";
import SEO from "../components/ui/SEO";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }) };

const team = [
  { name: "Aisha Rahman", role: "Founder & Creative Director", img: "https://i.pravatar.cc/200?img=47", bio: "A visionary designer with 15+ years in South Asian haute couture." },
  { name: "Bilal Khan", role: "Head of Product Design", img: "https://i.pravatar.cc/200?img=53", bio: "Passionate about blending traditional craftsmanship with modern aesthetics." },
  { name: "Sara Ahmed", role: "Brand & Marketing Lead", img: "https://i.pravatar.cc/200?img=44", bio: "Storyteller and brand architect behind LUXE Couture's identity." },
  { name: "Omar Farooq", role: "Operations Director", img: "https://i.pravatar.cc/200?img=68", bio: "Ensures every order leaves with care, precision, and speed." },
];

const stats = [
  { num: "2020", label: "Founded" },
  { num: "50K+", label: "Customers Served" },
  { num: "500+", label: "Products Designed" },
  { num: "15+", label: "Brand Partners" },
];

const values = [
  { emoji: "✨", title: "Excellence", desc: "We settle for nothing less than extraordinary in every stitch, every fabric, every detail." },
  { emoji: "🌿", title: "Sustainability", desc: "Responsibly sourced fabrics and ethical production are at the heart of every collection." },
  { emoji: "🎨", title: "Creativity", desc: "Where tradition meets innovation — we push boundaries while honoring heritage." },
  { emoji: "❤️", title: "Community", desc: "Celebrating South Asian culture and empowering artisans across Pakistan." },
];

const About = () => (
  <div className="page-content">
    <SEO title="Our Story" description="Born in Lahore, LUXE Couture was founded to bring world-class South Asian fashion to every doorstep. Learn our story." url="/about" keywords="LUXE Couture brand story, South Asian fashion brand Pakistan" />
    <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
      <div className="container-luxe"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} /></div>
    </div>

    {/* Hero */}
    <section style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d1a0a 100%)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
      <div className="container-luxe" style={{ position: "relative", textAlign: "center" }}>
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <span className="section-tag" style={{ color: "#c9a96e" }}>Our Story</span>
          <h1 className="font-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "1.5rem" }}>
            Crafting Elegance,<br />
            <span style={{ color: "#c9a96e" }}>Celebrating Heritage</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.1rem", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>
            Born in Lahore, LUXE Couture was founded with a singular purpose — to bring world-class South Asian fashion to every doorstep.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section style={{ background: "var(--secondary)", padding: "2.5rem 0" }}>
      <div className="container-luxe">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", textAlign: "center" }}>
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}>
              <div className="font-serif" style={{ fontSize: "2.5rem", fontWeight: 800, color: "#fff" }}>{s.num}</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Story */}
    <section style={{ padding: "6rem 0" }}>
      <div className="container-luxe">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="section-tag">Who We Are</span>
            <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>More Than Fashion —<br />It's a Legacy</h2>
            <p className="section-subtitle" style={{ marginBottom: "1.25rem" }}>
              LUXE Couture started as a dream shared between a mother and daughter — to make premium traditional fashion accessible to everyone, not just the privileged few.
            </p>
            <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
              From our flagship atelier in Lahore to customers across 15+ countries, we've grown into a brand that stands for authenticity, quality, and the timeless beauty of South Asian craftsmanship.
            </p>
            <Link to="/shop" className="btn-primary-luxe">Explore Collection <FiArrowRight size={16} /></Link>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
            <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "4/5" }} className="img-zoom-wrapper">
              <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&q=80" alt="Our story" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section style={{ padding: "6rem 0", background: "var(--bg-secondary)" }}>
      <div className="container-luxe">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-tag">Our Purpose</span>
          <h2 className="section-title">Mission & Vision</h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {[
            { icon: "🎯", title: "Our Mission", text: "To democratize luxury South Asian fashion by combining traditional artisanship with modern e-commerce, making premium clothing accessible to everyone who appreciates heritage and quality." },
            { icon: "🔭", title: "Our Vision", text: "To become the most trusted global platform for South Asian fashion — where every shopper, from Karachi to California, can access authentic, handcrafted clothing that tells a story." },
            { icon: "💎", title: "Our Promise", text: "Every piece in our collection passes through rigorous quality checks. We promise authentic materials, honest pricing, and a shopping experience that respects your time and trust." },
          ].map((card, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}
              className="card-luxe" style={{ padding: "2rem", textAlign: "center" }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{card.icon}</div>
              <h3 className="font-serif" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>{card.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.8 }}>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section style={{ padding: "6rem 0" }}>
      <div className="container-luxe">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-tag">What Drives Us</span>
          <h2 className="section-title">Our Core Values</h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {values.map((v, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}
              className="card-luxe" style={{ padding: "2rem" }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{v.emoji}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>{v.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section style={{ padding: "6rem 0", background: "var(--bg-secondary)" }}>
      <div className="container-luxe">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-tag">The Visionaries</span>
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle" style={{ margin: "1rem auto 0" }}>The passionate people behind every beautiful piece</p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {team.map((member, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}
              className="card-luxe" style={{ overflow: "hidden", textAlign: "center" }}
            >
              <div style={{ aspectRatio: "1", overflow: "hidden" }} className="img-zoom-wrapper">
                <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "4px" }}>{member.name}</h3>
                <div style={{ fontSize: "0.75rem", color: "var(--secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>{member.role}</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ padding: "6rem 0" }}>
      <div className="container-luxe" style={{ textAlign: "center" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="section-title font-serif" style={{ marginBottom: "1rem" }}>Ready to Experience LUXE?</h2>
          <p className="section-subtitle" style={{ margin: "0 auto 2rem" }}>Join 50,000+ happy customers who trust LUXE Couture for their fashion needs.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/shop" className="btn-primary-luxe">Shop Now <FiArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-secondary-luxe">Get in Touch</Link>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default About;
