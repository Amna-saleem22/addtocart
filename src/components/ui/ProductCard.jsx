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
    "Bestseller": "badge-gold",
    "New Arrival": "badge-green",
    "Premium": "badge-dark",
    "Exclusive": "badge-dark",
    "Sale": "badge-red",
    "Trending": "badge-gold",
    "Kids": "badge-green",
  };
  return map[badge] || "badge-gold";
};

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none", display: "block" }}>
        <div className="card-luxe" style={{ cursor: "pointer" }}>
          {/* Image */}
          <div className="img-zoom-wrapper" style={{ position: "relative", aspectRatio: "3/4", background: "var(--bg-secondary)" }}>
            <img
              src={imgError ? `https://via.placeholder.com/400x530/f4f4f2/9ca3af?text=${encodeURIComponent(product.name)}` : product.images[0]}
              alt={product.name}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Badges */}
            <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
              {product.badge && (
                <span className={`badge-luxe ${badgeColor(product.badge)}`}>{product.badge}</span>
              )}
              {product.discount > 0 && (
                <span className="badge-luxe badge-red">-{product.discount}%</span>
              )}
            </div>
            {/* Actions */}
            <div style={{
              position: "absolute", top: "12px", right: "12px",
              display: "flex", flexDirection: "column", gap: "8px",
              opacity: 0, transition: "opacity 0.3s",
            }} className="product-actions">
              <button
                onClick={handleWishlist}
                title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s", backdropFilter: "blur(4px)",
                  color: wishlisted ? "#e74c3c" : "#1a1a1a",
                }}
              >
                {wishlisted ? <FaHeart size={14} /> : <FiHeart size={14} />}
              </button>
              <button
                onClick={e => { e.preventDefault(); e.stopPropagation(); navigate(`/product/${product.id}`); }}
                title="Quick view"
                style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s", backdropFilter: "blur(4px)",
                  color: "#1a1a1a",
                }}
              >
                <FiEye size={14} />
              </button>
            </div>
            {/* Out of stock overlay */}
            {!product.inStock && (
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,0.45)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ padding: "1rem" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
              {product.brand}
            </div>
            <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text)", marginBottom: "8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {product.name}
            </div>
            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
              <div className="stars" style={{ display: "flex", gap: "2px" }}>
                {[1,2,3,4,5].map(s => (
                  <FiStar key={s} size={12} fill={s <= Math.round(product.rating) ? "#f59e0b" : "none"} stroke="#f59e0b" />
                ))}
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>({product.reviews})</span>
            </div>
            {/* Price */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>
                PKR {product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textDecoration: "line-through" }}>
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              style={{
                width: "100%", padding: "0.65rem", background: product.inStock ? "var(--primary)" : "var(--border)",
                color: product.inStock ? "#fff" : "var(--text-muted)",
                border: "none", borderRadius: "8px", fontFamily: "Inter, sans-serif",
                fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
                cursor: product.inStock ? "pointer" : "not-allowed",
                transition: "all 0.25s", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              }}
              onMouseEnter={e => { if(product.inStock) e.currentTarget.style.background = "var(--secondary)"; }}
              onMouseLeave={e => { if(product.inStock) e.currentTarget.style.background = "var(--primary)"; }}
            >
              <FiShoppingBag size={14} />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </Link>

      <style>{`
        .card-luxe:hover .product-actions { opacity: 1 !important; }
      `}</style>
    </motion.div>
  );
};

export default ProductCard;
