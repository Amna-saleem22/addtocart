import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiMail, FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer style={{ background: "#0f0f0f", color: "#e5e7eb", paddingTop: "4rem" }}>
      <div className="container-luxe">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3rem", paddingBottom: "3rem", borderBottom: "1px solid #2a2a2a" }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "1.25rem" }}>
              <div className="font-serif" style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>LUXE</div>
              <div style={{ fontSize: "0.55rem", letterSpacing: "0.35em", color: "#c9a96e", fontWeight: 700, textTransform: "uppercase" }}>Couture</div>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "#9ca3af", marginBottom: "1.5rem", maxWidth: "260px" }}>
              Redefining South Asian fashion with premium quality, timeless designs, and unparalleled craftsmanship since 2020.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { icon: <FiInstagram size={16} />, href: "#" },
                { icon: <FiFacebook size={16} />, href: "#" },
                { icon: <FiTwitter size={16} />, href: "#" },
                { icon: <FiYoutube size={16} />, href: "#" },
              ].map((s, i) => (
                <a key={i} href={s.href} style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  border: "1px solid #2a2a2a", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#9ca3af", textDecoration: "none", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#c9a96e"; e.currentTarget.style.color = "#c9a96e"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#9ca3af"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "1.25rem" }}>Quick Links</h4>
            {[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "About Us", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "Cart", href: "/cart" }, { label: "Wishlist", href: "/wishlist" }].map(l => (
              <Link key={l.label} to={l.href} style={{
                display: "flex", alignItems: "center", gap: "6px",
                textDecoration: "none", color: "#9ca3af", fontSize: "0.875rem",
                marginBottom: "0.625rem", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
                onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
              >
                <FiArrowRight size={12} /> {l.label}
              </Link>
            ))}
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "1.25rem" }}>Categories</h4>
            {["Men's Collection", "Women's Collection", "Bridal Wear", "Kids Wear", "Accessories", "Sale Items"].map(c => (
              <Link key={c} to="/shop" style={{
                display: "flex", alignItems: "center", gap: "6px",
                textDecoration: "none", color: "#9ca3af", fontSize: "0.875rem",
                marginBottom: "0.625rem", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
                onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
              >
                <FiArrowRight size={12} /> {c}
              </Link>
            ))}
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "1.25rem" }}>Stay Connected</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {[
                { icon: <FiMapPin size={14} />, text: "123 Fashion St, Lahore, Pakistan" },
                { icon: <FiPhone size={14} />, text: "+92 300 1234567" },
                { icon: <FiMail size={14} />, text: "hello@luxecouture.pk" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", color: "#9ca3af", fontSize: "0.875rem" }}>
                  <span style={{ color: "#c9a96e", marginTop: "2px", flexShrink: 0 }}>{c.icon}</span> {c.text}
                </div>
              ))}
            </div>

            <p style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.75rem" }}>Subscribe for exclusive offers & new arrivals</p>
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                style={{
                  flex: 1, padding: "0.625rem 0.875rem", background: "#1a1a1a",
                  border: "1px solid #2a2a2a", borderRadius: "8px",
                  color: "#fff", fontSize: "0.8rem", fontFamily: "Inter, sans-serif", outline: "none",
                }}
              />
              <button type="submit" style={{
                padding: "0.625rem 1rem", background: "#c9a96e", border: "none",
                borderRadius: "8px", color: "#fff", cursor: "pointer", transition: "opacity 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <FiArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 0", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>© 2024 LUXE Couture. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(l => (
              <button key={l} style={{ fontSize: "0.8rem", color: "#6b7280", textDecoration: "none", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "Inter, sans-serif", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#4F46E5"}
                onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
              >{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
