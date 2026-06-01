import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX,
  FiSun, FiMoon, FiUser, FiChevronDown
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Collections", href: "#", mega: true,
    columns: [
      { title: "Men", links: [{ label: "Shalwar Kameez", href: "/shop?category=Men" }, { label: "Sherwani", href: "/shop?category=Men" }, { label: "Waistcoat", href: "/shop?category=Men" }, { label: "Kurta Sets", href: "/shop?category=Men" }] },
      { title: "Women", links: [{ label: "Kurti", href: "/shop?category=Women" }, { label: "Anarkali", href: "/shop?category=Women" }, { label: "Lehenga", href: "/shop?category=Women" }, { label: "Saree", href: "/shop?category=Women" }] },
      { title: "Bridal", links: [{ label: "Bridal Lehenga", href: "/shop?category=Bridal" }, { label: "Sherwani", href: "/shop?category=Men" }, { label: "Dupatta", href: "/shop?category=Women" }] },
      { title: "Kids & More", links: [{ label: "Kids Wear", href: "/shop?category=Kids" }, { label: "Accessories", href: "/shop?category=Accessories" }, { label: "New Arrivals", href: "/shop" }, { label: "Sale", href: "/shop" }] },
    ]
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [megaOpen, setMegaOpen] = useState(null);
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(null);
  }, [location]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const isActive = (href) => location.pathname === href;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          height: "var(--navbar-height)",
          background: scrolled
            ? (darkMode ? "rgba(15,15,15,0.96)" : "rgba(250,250,250,0.96)")
            : (darkMode ? "rgba(15,15,15,0.85)" : "rgba(250,250,250,0.85)"),
          backdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.3s",
        }}
      >
        <div className="container-luxe" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span className="font-serif" style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>LUXE</span>
              <span style={{ fontSize: "0.5rem", letterSpacing: "0.35em", color: "var(--secondary)", fontWeight: 700, textTransform: "uppercase", marginTop: "-2px" }}>Couture</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flex: 1, justifyContent: "center" }} className="desktop-nav">
            {navLinks.map(link => (
              <div key={link.label} style={{ position: "relative" }}
                onMouseEnter={() => link.mega && setMegaOpen(link.label)}
                onMouseLeave={() => setMegaOpen(null)}
              >
                <Link to={link.href} style={{
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: isActive(link.href) ? "var(--secondary)" : "var(--text)",
                  transition: "color 0.2s",
                  display: "flex", alignItems: "center", gap: "4px",
                  paddingBottom: "2px",
                  borderBottom: isActive(link.href) ? "2px solid var(--secondary)" : "2px solid transparent",
                }}>
                  {link.label}
                  {link.mega && <FiChevronDown size={12} />}
                </Link>

                {/* Mega Menu */}
                <AnimatePresence>
                  {link.mega && megaOpen === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: "fixed", top: "var(--navbar-height)", left: 0, right: 0,
                        background: "var(--card-bg)",
                        borderTop: "1px solid var(--border)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                        padding: "2rem 0", zIndex: 999,
                      }}
                    >
                      <div className="container-luxe" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
                        {link.columns.map(col => (
                          <div key={col.title}>
                            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--secondary)", marginBottom: "1rem" }}>{col.title}</div>
                            {col.links.map(l => (
                              <Link key={l.label} to={l.href} style={{ display: "block", textDecoration: "none", fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem", transition: "color 0.2s" }}
                                onMouseEnter={e => e.target.style.color = "var(--secondary)"}
                                onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
                              >{l.label}</Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
            <button onClick={() => setSearchOpen(s => !s)} style={iconBtnStyle} title="Search">
              {searchOpen ? <FiX size={18} /> : <FiSearch size={18} />}
            </button>
            <button onClick={toggleTheme} style={iconBtnStyle} title="Toggle theme">
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <Link to="/wishlist" style={{ ...iconBtnStyle, textDecoration: "none", position: "relative" }} title="Wishlist">
              <FiHeart size={18} />
              {wishlist.length > 0 && <span style={badgeStyle}>{wishlist.length}</span>}
            </Link>
            <Link to="/cart" style={{ ...iconBtnStyle, textDecoration: "none", position: "relative" }} title="Cart">
              <FiShoppingBag size={18} />
              {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
            </Link>
            <button style={iconBtnStyle} title="Account" className="desktop-only">
              <FiUser size={18} />
            </button>
            <button onClick={() => setMobileOpen(s => !s)} style={{ ...iconBtnStyle }} title="Menu" className="mobile-menu-btn">
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ background: "var(--card-bg)", borderTop: "1px solid var(--border)", overflow: "hidden" }}
            >
              <div className="container-luxe" style={{ padding: "1rem 1.5rem" }}>
                <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
                  <FiSearch size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    ref={searchRef}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && searchQuery.trim()) { window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`; setSearchOpen(false); } }}
                    placeholder="Search for products, brands, categories..."
                    className="input-luxe"
                    style={{ paddingLeft: "2.75rem", paddingRight: "1rem" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 998 }}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0, width: "min(320px, 90vw)",
                background: "var(--card-bg)", zIndex: 999, overflowY: "auto",
                padding: "1.5rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <span className="font-serif" style={{ fontSize: "1.25rem", fontWeight: 800 }}>LUXE Couture</span>
                <button onClick={() => setMobileOpen(false)} style={iconBtnStyle}><FiX size={20} /></button>
              </div>
              {navLinks.map(link => (
                <div key={link.label}>
                  <Link to={link.href} style={{
                    display: "block", padding: "0.875rem 0",
                    textDecoration: "none", fontWeight: 600, fontSize: "0.9rem",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    color: isActive(link.href) ? "var(--secondary)" : "var(--text)",
                    borderBottom: "1px solid var(--border)",
                  }}>{link.label}</Link>
                  {link.mega && link.columns.map(col => (
                    col.links.map(l => (
                      <Link key={l.label} to={l.href} style={{
                        display: "block", padding: "0.5rem 1rem",
                        textDecoration: "none", fontSize: "0.85rem",
                        color: "var(--text-muted)",
                      }}>{l.label}</Link>
                    ))
                  ))}
                </div>
              ))}
              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
                <Link to="/wishlist" className="btn-secondary-luxe" style={{ flex: 1, justifyContent: "center", padding: "0.75rem" }}>
                  <FiHeart size={14} /> Wishlist
                </Link>
                <Link to="/cart" className="btn-primary-luxe" style={{ flex: 1, justifyContent: "center", padding: "0.75rem" }}>
                  <FiShoppingBag size={14} /> Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) { .desktop-nav { display: none !important; } .desktop-only { display: none !important; } }
        @media (min-width: 901px) { .mobile-menu-btn { display: none !important; } }
      `}</style>
    </>
  );
};

const iconBtnStyle = {
  background: "none", border: "none", color: "var(--text)",
  cursor: "pointer", padding: "6px", borderRadius: "8px",
  display: "flex", alignItems: "center", justifyContent: "center",
  transition: "all 0.2s", position: "relative",
};
const badgeStyle = {
  position: "absolute", top: "-4px", right: "-4px",
  background: "var(--secondary)", color: "#fff",
  borderRadius: "50%", width: "16px", height: "16px",
  fontSize: "0.6rem", fontWeight: 700,
  display: "flex", alignItems: "center", justifyContent: "center",
};

export default Navbar;
