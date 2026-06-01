import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiShoppingBag, FiHeart } from "react-icons/fi";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/ui/Breadcrumb";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) return (
    <div className="page-content">
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="container-luxe"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} /></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "1.5rem", textAlign: "center", padding: "2rem" }}>
        <FiHeart size={64} style={{ color: "var(--border)" }} />
        <h2 className="font-serif" style={{ fontSize: "2rem" }}>Your wishlist is empty</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "400px" }}>Save items you love by clicking the heart icon on any product.</p>
        <Link to="/shop" className="btn-primary-luxe">Explore Collection</Link>
      </div>
    </div>
  );

  return (
    <div className="page-content">
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="container-luxe"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} /></div>
      </div>
      <div className="container-luxe" style={{ padding: "3rem 1.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span className="section-tag">Saved Items</span>
          <h1 className="section-title font-serif">My Wishlist <span style={{ color: "var(--text-muted)", fontSize: "1.5rem", fontFamily: "Inter, sans-serif", fontWeight: 400 }}>({wishlist.length} items)</span></h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          <AnimatePresence>
            {wishlist.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}
                className="card-luxe"
              >
                <Link to={`/product/${item.id}`} style={{ textDecoration: "none", display: "block" }}>
                  <div className="img-zoom-wrapper" style={{ aspectRatio: "3/4", background: "var(--bg-secondary)", position: "relative" }}>
                    <img src={item.images?.[0] || item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {item.discount > 0 && <span className="badge-luxe badge-red" style={{ position: "absolute", top: "12px", left: "12px" }}>-{item.discount}%</span>}
                  </div>
                </Link>
                <div style={{ padding: "1rem" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{item.brand}</div>
                  <Link to={`/product/${item.id}`} style={{ textDecoration: "none", fontWeight: 700, fontSize: "0.95rem", color: "var(--text)", display: "block", marginBottom: "8px" }}>{item.name}</Link>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span style={{ fontWeight: 700 }}>PKR {item.price.toLocaleString()}</span>
                    {item.originalPrice > item.price && <span style={{ fontSize: "0.8rem", textDecoration: "line-through", color: "var(--text-muted)" }}>PKR {item.originalPrice.toLocaleString()}</span>}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => addToCart(item, 1, item.sizes?.[0] || "")}
                      className="btn-primary-luxe" style={{ flex: 1, justifyContent: "center", padding: "0.625rem", fontSize: "0.78rem" }}>
                      <FiShoppingBag size={13} /> Add to Cart
                    </button>
                    <button onClick={() => removeFromWishlist(item.id)}
                      style={{ width: "38px", border: "1.5px solid #fee2e2", background: "#fee2e2", color: "#e74c3c", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
