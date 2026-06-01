import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiEye, FiStar } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const badgeColor = (badge) => {
  if (!badge) return null;
  const map = {
    "Bestseller":   "badge-gold",
    "New Arrival":  "badge-cyan",
    "Premium":      "badge-indigo",
    "Exclusive":    "badge-indigo",
    "Sale":         "badge-red",
    "Trending":     "badge-gold",
    "Kids":         "badge-green",
  };
  return map[badge] || "badge-gold";
};

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart }              = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate                   = useNavigate();
  const [imgError, setImgError]    = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0] || "", product.colors?.[0] || "");
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none", display: "block" }}>
        <article
          className="card-shine"
          style={{
            background: "var(--card-bg)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            cursor: "pointer",
            transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
            position: "relative",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow = "var(--shadow-hover)";
            e.currentTarget.style.borderColor = "rgba(79,70,229,0.25)";
            e.currentTarget.querySelector(".pc-actions").style.opacity = "1";
            e.currentTarget.querySelector(".pc-actions").style.transform = "translateX(0)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow)";
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.querySelector(".pc-actions").style.opacity = "0";
            e.currentTarget.querySelector(".pc-actions").style.transform = "translateX(8px)";
          }}
        >
          {/* Image */}
          <div className="img-zoom-wrapper" style={{ position: "relative", aspectRatio: "3/4", background: "var(--bg-secondary)" }}>
            <img
              src={imgError
                ? `https://via.placeholder.com/400x530/F1F5F9/94A3B8?text=${encodeURIComponent(product.name)}`
                : product.images[0]}
              alt={product.name}
              onError={() => setImgError(true)}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />

            {/* Badges */}
            <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", flexDirection: "column", gap: "5px", zIndex: 2 }}>
              {product.badge && <span className={`badge-luxe ${badgeColor(product.badge)}`}>{product.badge}</span>}
              {product.discount > 0 && <span className="badge-luxe badge-red">−{product.discount}%</span>}
            </div>

            {/* Hover Actions */}
            <div className="pc-actions" style={{
              position: "absolute", top: "10px", right: "10px",
              display: "flex", flexDirection: "column", gap: "7px",
              opacity: 0, transform: "translateX(8px)",
              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
              zIndex: 2,
            }}>
              <button onClick={handleWishlist} title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", backdropFilter: "blur(8px)",
                  color: wishlisted ? "#EF4444" : "#334155",
                  boxShadow: "0 2px 10px rgba(15,23,42,0.15)",
                  transition: "all 0.2s",
                }}
              >
                {wishlisted ? <FaHeart size={13} /> : <FiHeart size={13} />}
              </button>
              <button
                onClick={e => { e.preventDefault(); e.stopPropagation(); navigate(`/product/${product.id}`); }}
                title="Quick view"
                style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", backdropFilter: "blur(8px)",
                  color: "#334155", boxShadow: "0 2px 10px rgba(15,23,42,0.15)",
                  transition: "all 0.2s",
                }}
              >
                <FiEye size={13} />
              </button>
            </div>

            {/* Out of stock overlay */}
            {!product.inStock && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(15,23,42,0.6)", padding: "6px 14px", borderRadius: "6px", backdropFilter: "blur(4px)" }}>
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ padding: "1rem 1rem 1.1rem" }}>
            <div style={{ fontSize: "0.68rem", color: "var(--secondary)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
              {product.brand}
            </div>
            <div style={{ fontWeight: 600, fontSize: "0.925rem", color: "var(--text)", marginBottom: "8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.4 }}>
              {product.name}
            </div>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
              <div style={{ display: "flex", gap: "1px" }}>
                {[1,2,3,4,5].map(s => (
                  <FiStar key={s} size={11}
                    fill={s <= Math.round(product.rating) ? "#F59E0B" : "none"}
                    stroke="#F59E0B"
                  />
                ))}
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>({product.reviews})</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>
                PKR {product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textDecoration: "line-through" }}>
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.discount > 0 && (
                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#10B981", marginLeft: "auto" }}>
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              style={{
                width: "100%", padding: "0.6rem",
                background: product.inStock
                  ? "linear-gradient(135deg, #4F46E5, #06B6D4)"
                  : "var(--border)",
                color: product.inStock ? "#fff" : "var(--text-muted)",
                border: "none", borderRadius: "10px",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.78rem", fontWeight: 600,
                letterSpacing: "0.04em",
                cursor: product.inStock ? "pointer" : "not-allowed",
                transition: "all 0.25s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                boxShadow: product.inStock ? "0 2px 12px rgba(79,70,229,0.25)" : "none",
              }}
              onMouseEnter={e => { if (product.inStock) { e.currentTarget.style.filter = "brightness(1.08)"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
              onMouseLeave={e => { e.currentTarget.style.filter = "none"; e.currentTarget.style.transform = "none"; }}
            >
              <FiShoppingBag size={13} />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
