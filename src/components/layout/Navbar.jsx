import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX,
  FiSun, FiMoon, FiUser, FiChevronDown, FiArrowRight,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTheme } from "../../context/ThemeContext";
import { products } from "../../data/products";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Collections", href: "#", mega: true,
    columns: [
      { title: "Men",    links: [{ label: "Shalwar Kameez", href: "/shop?category=Men" }, { label: "Sherwani", href: "/shop?category=Men" }, { label: "Waistcoat", href: "/shop?category=Men" }, { label: "Kurta Sets", href: "/shop?category=Men" }] },
      { title: "Women",  links: [{ label: "Kurti", href: "/shop?category=Women" }, { label: "Anarkali", href: "/shop?category=Women" }, { label: "Lehenga", href: "/shop?category=Women" }, { label: "Saree", href: "/shop?category=Women" }] },
      { title: "Bridal", links: [{ label: "Bridal Lehenga", href: "/shop?category=Bridal" }, { label: "Sherwani", href: "/shop?category=Men" }, { label: "Dupatta", href: "/shop?category=Women" }] },
      { title: "More",   links: [{ label: "Kids Wear", href: "/shop?category=Kids" }, { label: "Accessories", href: "/shop?category=Accessories" }, { label: "New Arrivals", href: "/shop" }, { label: "Sale", href: "/shop" }] },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery]           = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [megaOpen, setMegaOpen]     = useState(null);
  const [activeSug, setActiveSug]   = useState(-1);

  const { cartCount }              = useCart();
  const { wishlist }               = useWishlist();
  const { darkMode, toggleTheme }  = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setMegaOpen(null); }, [location]);
  useEffect(() => { if (searchOpen && searchRef.current) searchRef.current.focus(); }, [searchOpen]);

  /* Close search dropdown on outside click */
  useEffect(() => {
    const handler = (e) => { if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) setSuggestions([]); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const runSearch = useCallback((val) => {
    setQuery(val);
    setActiveSug(-1);
    if (!val.trim()) { setSuggestions([]); return; }
    const q = val.toLowerCase();
    const hits = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 5);
    setSuggestions(hits);
  }, []);

  const goSearch = (q) => {
    const term = q || query;
    if (!term.trim()) return;
    setSuggestions([]);
    setSearchOpen(false);
    setQuery("");
    navigate(`/search?q=${encodeURIComponent(term.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown")  { setActiveSug(s => Math.min(s + 1, suggestions.length - 1)); e.preventDefault(); }
    else if (e.key === "ArrowUp") { setActiveSug(s => Math.max(s - 1, -1)); e.preventDefault(); }
    else if (e.key === "Enter") {
      if (activeSug >= 0 && suggestions[activeSug]) {
        navigate(`/product/${suggestions[activeSug].id}`);
        setSuggestions([]); setSearchOpen(false); setQuery("");
      } else { goSearch(); }
    }
    else if (e.key === "Escape") { setSearchOpen(false); setSuggestions([]); }
  };

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
            ? (darkMode ? "rgba(15,23,42,0.97)" : "rgba(248,250,252,0.97)")
            : (darkMode ? "rgba(15,23,42,0.85)" : "rgba(248,250,252,0.85)"),
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.3s",
          boxShadow: scrolled ? "0 1px 20px rgba(15,23,42,0.08)" : "none",
        }}
      >
        <div className="container-luxe" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "10px",
                background: "linear-gradient(135deg, #4F46E5, #06B6D4)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: "0.85rem", fontFamily: "serif" }}>L</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span className="font-serif" style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>LUXE</span>
                <span style={{ fontSize: "0.45rem", letterSpacing: "0.4em", color: "var(--secondary)", fontWeight: 700, textTransform: "uppercase", marginTop: "-1px" }}>Couture</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flex: 1, justifyContent: "center" }} className="desktop-nav">
            {navLinks.map(link => (
              <div key={link.label} style={{ position: "relative" }}
                onMouseEnter={() => link.mega && setMegaOpen(link.label)}
                onMouseLeave={() => setMegaOpen(null)}
              >
                <Link to={link.href} style={{
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: isActive(link.href) ? "var(--secondary)" : "var(--text-muted)",
                  transition: "color 0.2s",
                  display: "flex", alignItems: "center", gap: "3px",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "8px",
                  background: isActive(link.href) ? "var(--indigo-light)" : "transparent",
                }}>
                  {link.label}
                  {link.mega && <FiChevronDown size={11} />}
                </Link>

                {/* Mega Menu */}
                <AnimatePresence>
                  {link.mega && megaOpen === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: "fixed", top: "var(--navbar-height)", left: 0, right: 0,
                        background: "var(--card-bg)",
                        borderTop: "2px solid var(--secondary)",
                        boxShadow: "0 20px 60px rgba(15,23,42,0.12)",
                        padding: "2.5rem 0", zIndex: 999,
                      }}
                    >
                      <div className="container-luxe" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
                        {link.columns.map(col => (
                          <div key={col.title}>
                            <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--secondary)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "6px" }}>
                              <span style={{ width: "16px", height: "2px", background: "linear-gradient(90deg,#4F46E5,#06B6D4)", borderRadius: "1px", display: "inline-block" }} />
                              {col.title}
                            </div>
                            {col.links.map(l => (
                              <Link key={l.label} to={l.href} style={{
                                display: "flex", alignItems: "center", gap: "6px",
                                textDecoration: "none", fontSize: "0.875rem",
                                color: "var(--text-muted)", marginBottom: "0.6rem",
                                transition: "all 0.2s", padding: "0.15rem 0",
                              }}
                                onMouseEnter={e => { e.currentTarget.style.color = "var(--secondary)"; e.currentTarget.style.paddingLeft = "4px"; }}
                                onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.paddingLeft = "0"; }}
                              >
                                <FiArrowRight size={10} style={{ opacity: 0.5 }} />
                                {l.label}
                              </Link>
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>
            <button onClick={() => { setSearchOpen(s => !s); setQuery(""); setSuggestions([]); }}
              style={iconBtnStyle(searchOpen, darkMode)} title="Search">
              {searchOpen ? <FiX size={18} /> : <FiSearch size={18} />}
            </button>
            <button onClick={toggleTheme} style={iconBtnStyle(false, darkMode)} title="Toggle theme">
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <Link to="/wishlist" style={{ ...iconBtnStyle(false, darkMode), textDecoration: "none", position: "relative" }} title="Wishlist">
              <FiHeart size={18} />
              {wishlist.length > 0 && <span style={badgeStyle}>{wishlist.length}</span>}
            </Link>
            <Link to="/cart" style={{ ...iconBtnStyle(false, darkMode), textDecoration: "none", position: "relative" }} title="Cart">
              <FiShoppingBag size={18} />
              {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
            </Link>
            <button style={iconBtnStyle(false, darkMode)} title="Account" className="desktop-only">
              <FiUser size={18} />
            </button>
            <button onClick={() => setMobileOpen(s => !s)} style={iconBtnStyle(false, darkMode)} title="Menu" className="mobile-menu-btn">
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Live Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: "var(--card-bg)",
                borderTop: "1px solid var(--border)",
                overflow: "visible",
                boxShadow: "0 8px 32px rgba(15,23,42,0.1)",
              }}
            >
              <div className="container-luxe" style={{ padding: "1rem 1.5rem" }}>
                <div ref={searchBoxRef} style={{ position: "relative", maxWidth: "640px", margin: "0 auto" }}>
                  <FiSearch size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", zIndex: 1 }} />
                  <input
                    ref={searchRef}
                    value={query}
                    onChange={e => runSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search products, brands, categories..."
                    className="input-luxe"
                    style={{ paddingLeft: "2.75rem", paddingRight: query ? "3rem" : "1rem" }}
                    autoComplete="off"
                  />
                  {query && (
                    <button onClick={() => { setQuery(""); setSuggestions([]); searchRef.current?.focus(); }}
                      style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "2px" }}>
                      <FiX size={14} />
                    </button>
                  )}

                  {/* Suggestions Dropdown */}
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
                          background: "var(--card-bg)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius)",
                          boxShadow: "0 16px 48px rgba(15,23,42,0.15)",
                          overflow: "hidden", zIndex: 2000,
                        }}
                      >
                        {suggestions.map((p, i) => (
                          <div
                            key={p.id}
                            onClick={() => { navigate(`/product/${p.id}`); setSuggestions([]); setSearchOpen(false); setQuery(""); }}
                            style={{
                              display: "flex", alignItems: "center", gap: "12px",
                              padding: "0.75rem 1rem", cursor: "pointer",
                              background: i === activeSug ? "var(--indigo-light)" : "transparent",
                              transition: "background 0.15s",
                              borderBottom: i < suggestions.length - 1 ? "1px solid var(--border)" : "none",
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-secondary)"}
                            onMouseLeave={e => e.currentTarget.style.background = i === activeSug ? "var(--indigo-light)" : "transparent"}
                          >
                            <img src={p.images[0]} alt={p.name}
                              style={{ width: "44px", height: "52px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }}
                              onError={e => e.target.style.display = "none"}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{p.brand} · {p.category}</div>
                              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--secondary)", marginTop: "2px" }}>PKR {p.price.toLocaleString()}</div>
                            </div>
                            <FiArrowRight size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                          </div>
                        ))}
                        <button
                          onClick={() => goSearch()}
                          style={{
                            width: "100%", padding: "0.75rem 1rem", background: "var(--indigo-light)",
                            border: "none", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600,
                            color: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          <FiSearch size={13} /> See all results for "{query}"
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* No results */}
                  <AnimatePresence>
                    {query.length > 1 && suggestions.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        style={{
                          position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
                          background: "var(--card-bg)", border: "1px solid var(--border)",
                          borderRadius: "var(--radius)", padding: "1.5rem", textAlign: "center",
                          boxShadow: "0 16px 48px rgba(15,23,42,0.15)", zIndex: 2000,
                        }}
                      >
                        <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🔍</div>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>No products found for "<strong style={{ color: "var(--text)" }}>{query}</strong>"</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", zIndex: 998, backdropFilter: "blur(4px)" }}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0, width: "min(340px, 92vw)",
                background: "var(--card-bg)", zIndex: 999, overflowY: "auto", padding: "1.5rem",
                boxShadow: "-8px 0 40px rgba(15,23,42,0.15)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,#4F46E5,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontWeight: 800, fontSize: "0.75rem", fontFamily: "serif" }}>L</span>
                  </div>
                  <span className="font-serif" style={{ fontSize: "1.1rem", fontWeight: 800 }}>LUXE Couture</span>
                </div>
                <button onClick={() => setMobileOpen(false)} style={iconBtnStyle(false, darkMode)}><FiX size={20} /></button>
              </div>

              {/* Mobile Search */}
              <div style={{ marginBottom: "1.5rem", position: "relative" }}>
                <FiSearch size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  placeholder="Search products..."
                  className="input-luxe"
                  style={{ paddingLeft: "2.25rem", fontSize: "0.875rem" }}
                  onKeyDown={e => { if (e.key === "Enter" && e.target.value.trim()) { navigate(`/search?q=${encodeURIComponent(e.target.value.trim())}`); setMobileOpen(false); } }}
                />
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
                  {link.mega && link.columns.map(col =>
                    col.links.map(l => (
                      <Link key={l.label} to={l.href} style={{
                        display: "block", padding: "0.4rem 1rem",
                        textDecoration: "none", fontSize: "0.82rem",
                        color: "var(--text-muted)",
                      }}>{l.label}</Link>
                    ))
                  )}
                </div>
              ))}

              <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.75rem" }}>
                <Link to="/wishlist" className="btn-secondary-luxe" style={{ flex: 1, justifyContent: "center", padding: "0.65rem 0.75rem", fontSize: "0.8rem" }}>
                  <FiHeart size={14} /> Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                </Link>
                <Link to="/cart" className="btn-primary-luxe" style={{ flex: 1, justifyContent: "center", padding: "0.65rem 0.75rem", fontSize: "0.8rem" }}>
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

const iconBtnStyle = (active, darkMode) => ({
  background: active ? "var(--indigo-light)" : "none",
  border: "none",
  color: active ? "var(--secondary)" : "var(--text-muted)",
  cursor: "pointer",
  padding: "7px",
  borderRadius: "9px",
  display: "flex", alignItems: "center", justifyContent: "center",
  transition: "all 0.2s",
  position: "relative",
});

const badgeStyle = {
  position: "absolute", top: "-3px", right: "-3px",
  background: "linear-gradient(135deg, #4F46E5, #06B6D4)",
  color: "#fff", borderRadius: "50%", width: "16px", height: "16px",
  fontSize: "0.58rem", fontWeight: 700,
  display: "flex", alignItems: "center", justifyContent: "center",
};

export default Navbar;
