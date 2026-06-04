import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiStar, FiTruck, FiRefreshCw, FiShield, FiHeadphones } from "react-icons/fi";
import ProductCard from "../components/ui/ProductCard";
import { SkeletonGrid } from "../components/ui/SkeletonCard";
import SEO from "../components/ui/SEO";
import { getFeaturedProducts, getNewArrivals, getBestSellers, getTrendingProducts, categories } from "../data/products";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }) };

const testimonials = [
  { name: "Ayesha K.", rating: 5, text: "Absolutely stunning quality. The embroidery on my Kurti was even more beautiful in person. LUXE Couture never disappoints!", avatar: "https://i.pravatar.cc/60?img=47" },
  { name: "Tariq M.", rating: 5, text: "Bought a Sherwani for my brother's wedding — everyone was asking where it was from. Premium fabric, perfect fit. 10/10.", avatar: "https://i.pravatar.cc/60?img=53" },
  { name: "Sana R.", rating: 5, text: "Fast shipping, gorgeous packaging, and the Anarkali is exactly as pictured. Will definitely order again!", avatar: "https://i.pravatar.cc/60?img=44" },
  { name: "Ahmed Z.", rating: 4, text: "Great selection of traditional wear with a modern touch. The waistcoat I ordered fits perfectly and looks amazing.", avatar: "https://i.pravatar.cc/60?img=68" },
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();
  const trending = getTrendingProducts();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filteredProducts = activeCategory === "All"
    ? featured
    : featured.filter(p => p.category === activeCategory);

  return (
    <div className="page-content">
      <SEO
        title="Home"
        description="LUXE Couture — Where tradition meets elegance. Shop premium South Asian fashion: Shalwar Kameez, Lehenga, Kurti, Sherwani & more."
        url="/"
        keywords="luxury fashion Pakistan, South Asian clothing, Shalwar Kameez, Lehenga, Kurti, Sherwani, bridal wear"
      />
      {/* ── Hero ── */}
      <section style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.25 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.6) 100%)" }} />
        <div className="container-luxe" style={{ position: "relative", zIndex: 1, paddingTop: "2rem", paddingBottom: "4rem" }}>
          <div style={{ maxWidth: "680px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="section-tag" style={{ color: "#06B6D4" }}>New Collection 2024</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: "1.5rem" }}
            >
              Where Tradition<br />
              <span style={{ color: "#06B6D4" }}>Meets Elegance</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "500px" }}
            >
              Discover our curated collection of premium South Asian fashion — from timeless Shalwar Kameez to breathtaking Bridal Lehengas.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <Link to="/shop" className="btn-gold" style={{ fontSize: "0.875rem" }}>
                Shop Now <FiArrowRight size={16} />
              </Link>
              <Link to="/about" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.875rem 2rem", border: "2px solid rgba(255,255,255,0.3)",
                color: "#fff", borderRadius: "12px", textDecoration: "none",
                fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "transparent"; }}
              >
                Our Story
              </Link>
            </motion.div>
          </div>
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: "flex", gap: "3rem", marginTop: "4rem", flexWrap: "wrap" }}
          >
            {[{ num: "50K+", label: "Happy Customers" }, { num: "500+", label: "Premium Products" }, { num: "15+", label: "Brand Partners" }, { num: "98%", label: "Satisfaction Rate" }].map(s => (
              <div key={s.label}>
                <div className="font-serif" style={{ fontSize: "2rem", fontWeight: 700, color: "#06B6D4" }}>{s.num}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.1em" }}
        >
          SCROLL
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }} />
        </motion.div>
      </section>

      {/* ── Features Bar ── */}
      <section style={{ background: "var(--secondary)", padding: "1.25rem 0" }}>
        <div className="container-luxe">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
             gap: "1rem" }}>
            {[
              { icon: <FiTruck size={18} />, text: "Free Shipping over PKR 5000" },
              { icon: <FiRefreshCw size={18} />, text: "Easy 30-Day Returns" },
              { icon: <FiShield size={18} />, text: "100% Authentic Products" },
              { icon: <FiHeadphones size={18} />, text: "24/7 Customer Support" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#fff", justifyContent: "center" }}>
                {f.icon}
                <span style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Collections ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container-luxe">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {[
              { title: "Men's Collection", sub: "Shalwar Kameez, Sherwani & more", href: "/shop?category=Men", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", span: 1 },
              { title: "Women's Collection", sub: "Kurti, Lehenga, Anarkali & more", href: "/shop?category=Women", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80", span: 1 },
              { title: "Bridal Couture", sub: "For the most special day", href: "/shop?category=Bridal", img: "https://www.ammarakhan.com/cdn/shop/files/17_714dc8d2-e63c-436a-8a25-aff18f714f44.jpg?format=webp&v=1752764765&width=320", span: 1 },
            ].map((c, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}>
                <Link to={c.href} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ borderRadius: "16px", overflow: "hidden", position: "relative", aspectRatio: "4/5", cursor: "pointer" }}
                    className="img-zoom-wrapper"
                  >
                    <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
                    <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", color: "#fff" }}>
                      <div className="font-serif" style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "4px" }}>{c.title}</div>
                      <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)" }}>{c.sub}</div>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "10px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#06B6D4" }}>
                        Shop Now <FiArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending Products ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-secondary)" }}>
        <div className="container-luxe">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-tag">Hot Right Now</span>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>Trending This Season</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>Discover what fashion-forward shoppers are loving right now</p>
          </motion.div>
          {loading ? <SkeletonGrid count={4} /> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container-luxe">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{
              borderRadius: "20px", overflow: "hidden", position: "relative",
              background: "linear-gradient(135deg, #1a1a1a 0%, #2d1a0a 100%)",
              padding: "4rem 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem",
            }}
          >
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "45%", backgroundImage: "url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.3 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#06B6D4", display: "block", marginBottom: "0.75rem" }}>
                Limited Time Offer
              </span>
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "1rem" }}>
                Up to <span style={{ color: "#06B6D4" }}>30% OFF</span><br />on Bridal Collections
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "420px", marginBottom: "2rem" }}>
                Celebrate the most beautiful day in life with our exquisite bridal couture. Handcrafted with love, designed to last forever.
              </p>
              <Link to="/shop?category=Bridal" className="btn-gold">Shop Bridal <FiArrowRight size={16} /></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── All Products with Filter ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-secondary)" }}>
        <div className="container-luxe">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-tag">Our Products</span>
            <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>Shop by Category</h2>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  padding: "0.5rem 1.25rem", borderRadius: "50px", fontSize: "0.8rem", fontWeight: 600,
                  letterSpacing: "0.05em", cursor: "pointer", transition: "all 0.25s",
                  background: activeCategory === cat ? "var(--primary)" : "transparent",
                  color: activeCategory === cat ? "#fff" : "var(--text-muted)",
                  border: activeCategory === cat ? "2px solid var(--primary)" : "2px solid var(--border)",
                  fontFamily: "Inter, sans-serif",
                }}>
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
          {loading ? <SkeletonGrid count={8} /> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {filteredProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/shop" className="btn-secondary-luxe">View All Products <FiArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container-luxe">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-tag">Customer Favorites</span>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>Best Sellers</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>The pieces our community loves most — bestsellers never disappoint</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {bestSellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-secondary)" }}>
        <div className="container-luxe">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className="section-tag">Just Dropped</span>
              <h2 className="section-title">New Arrivals</h2>
            </div>
            <Link to="/shop" className="btn-secondary-luxe" style={{ padding: "0.625rem 1.5rem", fontSize: "0.8rem" }}>
              See All <FiArrowRight size={14} />
            </Link>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container-luxe">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-tag">Reviews</span>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>What Our Customers Say</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>Real experiences from real fashionistas across Pakistan</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}
                className="card-luxe"
                style={{ padding: "1.75rem" }}
              >
                <div style={{ display: "flex", gap: "4px", marginBottom: "1rem" }}>
                  {[1,2,3,4,5].map(s => <FiStar key={s} size={14} fill={s <= t.rating ? "#f59e0b" : "none"} stroke="#f59e0b" />)}
                </div>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img src={t.avatar} alt={t.name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--secondary)" }}>Verified Buyer</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section style={{ padding: "5rem 0", background: "var(--primary)" }}>
        <div className="container-luxe" style={{ textAlign: "center" }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--secondary)", display: "block", marginBottom: "1rem" }}>Newsletter</span>
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
              Be the First to Know
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
              Get early access to new collections, exclusive deals, and style inspiration.
            </p>
            <form onSubmit={e => { e.preventDefault(); import("react-hot-toast").then(m => m.default.success("Subscribed successfully!")); }}
              style={{ display: "flex", maxWidth: "500px", margin: "0 auto", gap: "0.75rem", flexWrap: "wrap" }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                style={{
                  flex: 1, minWidth: "200px", padding: "1rem 1.25rem",
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "12px", color: "#fff", fontSize: "0.9rem", fontFamily: "Inter, sans-serif", outline: "none",
                }}
              />
              <button type="submit" className="btn-gold" style={{ flexShrink: 0 }}>Subscribe <FiArrowRight size={16} /></button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
