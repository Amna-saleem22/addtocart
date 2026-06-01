import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiStar, FiTruck, FiRefreshCw, FiShield, FiShare2, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getProductById, getRelatedProducts } from "../data/products";
import ProductCard from "../components/ui/ProductCard";
import Breadcrumb from "../components/ui/Breadcrumb";
import SEO from "../components/ui/SEO";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [imgError, setImgError] = useState(false);

  if (!product) return (
    <div className="page-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh", flexDirection: "column", gap: "1rem" }}>
      <div style={{ fontSize: "4rem" }}>😕</div>
      <h2 className="font-serif">Product not found</h2>
      <Link to="/shop" className="btn-primary-luxe">Browse Shop</Link>
    </div>
  );

  const related = getRelatedProducts(product);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) { toast.error("Please select a size"); return; }
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  const reviews = [
    { name: "Fatima A.", rating: 5, date: "2 days ago", text: "Absolutely gorgeous! The fabric quality is premium and it fits perfectly. Highly recommend!", avatar: "https://i.pravatar.cc/40?img=47" },
    { name: "Hassan K.", rating: 4, date: "1 week ago", text: "Really happy with the purchase. Delivery was fast and packaging was beautiful.", avatar: "https://i.pravatar.cc/40?img=53" },
    { name: "Zara M.", rating: 5, date: "2 weeks ago", text: "Exceeded expectations! The color in person is even more vibrant than in photos.", avatar: "https://i.pravatar.cc/40?img=44" },
  ];

  return (
    <div className="page-content">
      <SEO
        title={`${product.name} by ${product.brand}`}
        description={product.description || `Buy ${product.name} by ${product.brand}. PKR ${product.price.toLocaleString()}. ${product.inStock ? "In Stock" : "Out of Stock"}.`}
        image={product.images[0]}
        url={`/product/${product.id}`}
        type="product"
        keywords={`${product.name}, ${product.brand}, ${product.category}, buy online Pakistan`}
        product={product}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: product.category, href: `/shop?category=${product.category}` }, { label: product.name, href: `/product/${product.id}` }]}
      />
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="container-luxe">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: product.category, href: `/shop?category=${product.category}` }, { label: product.name }]} />
        </div>
      </div>

      <div className="container-luxe" style={{ padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start" }}>
          {/* Gallery */}
          <div>
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "3/4", background: "var(--bg-secondary)", marginBottom: "1rem" }}>
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={imgError ? `https://via.placeholder.com/600x800/f4f4f2/9ca3af?text=${encodeURIComponent(product.name)}` : product.images[selectedImage]}
                alt={product.name}
                onError={() => setImgError(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {product.images.length > 1 && (
                <>
                  <button onClick={() => setSelectedImage(i => (i - 1 + product.images.length) % product.images.length)}
                    style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <FiChevronLeft size={16} />
                  </button>
                  <button onClick={() => setSelectedImage(i => (i + 1) % product.images.length)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <FiChevronRight size={16} />
                  </button>
                </>
              )}
              <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {product.badge && <span className={`badge-luxe badge-gold`}>{product.badge}</span>}
                {product.discount > 0 && <span className="badge-luxe badge-red">-{product.discount}%</span>}
              </div>
            </div>
            {product.images.length > 1 && (
              <div style={{ display: "flex", gap: "10px" }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    style={{ flex: 1, borderRadius: "10px", overflow: "hidden", border: "2px solid " + (selectedImage === i ? "var(--secondary)" : "transparent"), cursor: "pointer", background: "none", padding: 0, aspectRatio: "3/4" }}>
                    <img src={img} alt={`view ${i + 1}`} onError={() => {}} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
              <div>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--secondary)" }}>{product.brand}</span>
                <h1 className="font-serif" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--text)", lineHeight: 1.2, marginTop: "4px" }}>{product.name}</h1>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => toggleWishlist(product)} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1.5px solid var(--border)", background: "var(--card-bg)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: wishlisted ? "#e74c3c" : "var(--text)", transition: "all 0.2s" }}>
                  {wishlisted ? <FaHeart size={16} /> : <FiHeart size={16} />}
                </button>
                <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success("Link copied!"); }} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1.5px solid var(--border)", background: "var(--card-bg)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text)" }}>
                  <FiShare2 size={16} />
                </button>
              </div>
            </div>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", gap: "3px" }}>
                {[1,2,3,4,5].map(s => <FiStar key={s} size={16} fill={s <= Math.round(product.rating) ? "#f59e0b" : "none"} stroke="#f59e0b" />)}
              </div>
              <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{product.rating}</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", padding: "1rem", background: "var(--bg-secondary)", borderRadius: "12px" }}>
              <span className="font-serif" style={{ fontSize: "2rem", fontWeight: 700 }}>PKR {product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <>
                  <span style={{ fontSize: "1.1rem", textDecoration: "line-through", color: "var(--text-muted)" }}>PKR {product.originalPrice.toLocaleString()}</span>
                  <span className="badge-luxe badge-red">Save {product.discount}%</span>
                </>
              )}
            </div>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  Color {selectedColor && <span style={{ color: "var(--text-muted)", fontWeight: 400, textTransform: "none" }}>— Selected</span>}
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {product.colors.map((color, i) => (
                    <button key={i} onClick={() => setSelectedColor(color)}
                      title={color}
                      style={{ width: "32px", height: "32px", borderRadius: "50%", background: color, border: "3px solid " + (selectedColor === color ? "var(--secondary)" : "transparent"), outline: "2px solid " + (selectedColor === color ? "var(--secondary)" : "var(--border)"), cursor: "pointer", transition: "all 0.2s" }} />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  Size {selectedSize && <span style={{ color: "var(--secondary)", fontWeight: 700 }}>— {selectedSize}</span>}
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      style={{ minWidth: "48px", padding: "0.5rem 0.75rem", borderRadius: "8px", border: "1.5px solid " + (selectedSize === size ? "var(--primary)" : "var(--border)"), background: selectedSize === size ? "var(--primary)" : "transparent", color: selectedSize === size ? "#fff" : "var(--text)", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, fontFamily: "Inter, sans-serif", transition: "all 0.2s" }}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Quantity</div>
              <div style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ width: "44px", height: "44px", background: "transparent", border: "none", cursor: "pointer", fontSize: "1.25rem", color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ padding: "0 1.25rem", fontWeight: 700, minWidth: "50px", textAlign: "center" }}>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} style={{ width: "44px", height: "44px", background: "transparent", border: "none", cursor: "pointer", fontSize: "1.25rem", color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <button onClick={handleAddToCart} disabled={!product.inStock}
                className="btn-secondary-luxe" style={{ flex: 1, minWidth: "140px", justifyContent: "center", opacity: product.inStock ? 1 : 0.5, cursor: product.inStock ? "pointer" : "not-allowed" }}>
                <FiShoppingBag size={16} /> Add to Cart
              </button>
              <Link to="/checkout" onClick={handleBuyNow}
                className="btn-primary-luxe" style={{ flex: 1, minWidth: "140px", justifyContent: "center" }}>
                Buy Now
              </Link>
            </div>

            {/* Trust Badges */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
              {[{ icon: <FiTruck size={16} />, text: "Free Shipping" }, { icon: <FiRefreshCw size={16} />, text: "Easy Returns" }, { icon: <FiShield size={16} />, text: "Authentic" }].map((b, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "0.75rem", background: "var(--bg-secondary)", borderRadius: "10px", textAlign: "center" }}>
                  <span style={{ color: "var(--secondary)" }}>{b.icon}</span>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600 }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginTop: "4rem" }}>
          <div style={{ display: "flex", gap: "0", borderBottom: "2px solid var(--border)", marginBottom: "2rem", overflowX: "auto" }}>
            {["description", "specs", "reviews"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: "0.875rem 1.75rem", background: "transparent", border: "none", borderBottom: "2px solid " + (activeTab === tab ? "var(--secondary)" : "transparent"), marginBottom: "-2px", color: activeTab === tab ? "var(--secondary)" : "var(--text-muted)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}>
                {tab === "reviews" ? `Reviews (${product.reviews})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: "720px" }}>
              <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "var(--text-muted)" }}>{product.description}</p>
              <div style={{ marginTop: "1.5rem", padding: "1.5rem", background: "var(--bg-secondary)", borderRadius: "12px", borderLeft: "3px solid var(--secondary)" }}>
                <p style={{ fontSize: "0.875rem", fontStyle: "italic", color: "var(--text-muted)" }}>
                  "Every piece in the LUXE Couture collection is handpicked for its craftsmanship, quality, and cultural authenticity. We believe fashion is a form of storytelling."
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "specs" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: "480px" }}>
              <div className="card-luxe" style={{ overflow: "hidden" }}>
                {Object.entries(product.specs).map(([key, val], i) => (
                  <div key={key} style={{ display: "flex", padding: "1rem 1.25rem", background: i % 2 === 0 ? "var(--bg-secondary)" : "transparent", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.85rem", width: "120px", flexShrink: 0, textTransform: "capitalize", color: "var(--text-muted)" }}>{key}</span>
                    <span style={{ fontSize: "0.875rem" }}>{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: "680px" }}>
              <div style={{ display: "flex", gap: "2rem", alignItems: "center", marginBottom: "2rem", padding: "1.5rem", background: "var(--bg-secondary)", borderRadius: "16px", flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <div className="font-serif" style={{ fontSize: "4rem", fontWeight: 700, lineHeight: 1 }}>{product.rating}</div>
                  <div style={{ display: "flex", gap: "3px", justifyContent: "center", margin: "4px 0" }}>
                    {[1,2,3,4,5].map(s => <FiStar key={s} size={16} fill={s <= Math.round(product.rating) ? "#f59e0b" : "none"} stroke="#f59e0b" />)}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{product.reviews} reviews</div>
                </div>
                <div style={{ flex: 1 }}>
                  {[5,4,3,2,1].map(star => {
                    const pct = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : 2;
                    return (
                      <div key={star} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                        <span style={{ fontSize: "0.75rem", width: "8px" }}>{star}</span>
                        <FiStar size={10} fill="#f59e0b" stroke="#f59e0b" />
                        <div style={{ flex: 1, height: "6px", background: "var(--border)", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: "#f59e0b", borderRadius: "3px" }} />
                        </div>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", width: "28px" }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {reviews.map((r, i) => (
                  <div key={i} className="card-luxe" style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <img src={r.avatar} alt={r.name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                          <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{r.name}</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{r.date}</span>
                        </div>
                        <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
                          {[1,2,3,4,5].map(s => <FiStar key={s} size={12} fill={s <= r.rating ? "#f59e0b" : "none"} stroke="#f59e0b" />)}
                        </div>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{r.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: "5rem" }}>
            <div style={{ marginBottom: "2rem" }}>
              <span className="section-tag">You May Also Like</span>
              <h2 className="section-title">Related Products</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
