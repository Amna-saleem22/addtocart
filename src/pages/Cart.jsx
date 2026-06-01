import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiShoppingBag, FiTag, FiArrowRight, FiPlus, FiMinus } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/ui/Breadcrumb";
import SEO from "../components/ui/SEO";
import toast from "react-hot-toast";

const COUPONS = { "LUXE20": 20, "WELCOME10": 10, "SALE15": 15 };

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  const discount = appliedCoupon ? Math.round(cartTotal * (COUPONS[appliedCoupon] / 100)) : 0;
  const shipping = cartTotal > 5000 ? 0 : 299;
  const total = cartTotal - discount + shipping;

  const applyCoupon = () => {
    const code = coupon.toUpperCase();
    if (COUPONS[code]) { setAppliedCoupon(code); toast.success(`Coupon applied! ${COUPONS[code]}% off`); }
    else toast.error("Invalid coupon code");
  };

  if (cart.length === 0) return (
    <div className="page-content">
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="container-luxe"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} /></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "1.5rem", textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "5rem" }}>🛍️</div>
        <h2 className="font-serif" style={{ fontSize: "2rem" }}>Your cart is empty</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "400px" }}>Looks like you haven't added anything yet. Discover our premium collection and find something you love.</p>
        <Link to="/shop" className="btn-primary-luxe">Start Shopping <FiArrowRight size={16} /></Link>
      </div>
    </div>
  );

  return (
    <div className="page-content">
      <SEO title="My Cart" description="Review your selected items and proceed to checkout. Free delivery on orders over PKR 5,000." url="/cart" />
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="container-luxe"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} /></div>
      </div>

      <div className="container-luxe" style={{ padding: "3rem 1.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span className="section-tag">Your Bag</span>
          <h1 className="section-title font-serif">Shopping Cart <span style={{ color: "var(--text-muted)", fontSize: "1.5rem", fontFamily: "Inter, sans-serif", fontWeight: 400 }}>({cart.length} items)</span></h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr min(360px, 100%)", gap: "2rem", alignItems: "start" }}>
          {/* Cart Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <AnimatePresence>
              {cart.map(item => (
                <motion.div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }}
                  className="card-luxe"
                  style={{ display: "flex", gap: "1.25rem", padding: "1.25rem", alignItems: "flex-start" }}
                >
                  <Link to={`/product/${item.id}`} style={{ flexShrink: 0 }}>
                    <div style={{ width: "90px", height: "110px", borderRadius: "10px", overflow: "hidden", background: "var(--bg-secondary)" }}>
                      <img
                        src={imgErrors[item.id] ? `https://via.placeholder.com/90x110/f4f4f2/9ca3af?text=${encodeURIComponent(item.name[0])}` : item.images?.[0] || item.image}
                        alt={item.name}
                        onError={() => setImgErrors(e => ({ ...e, [item.id]: true }))}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.5rem" }}>
                      <div>
                        <div style={{ fontSize: "0.7rem", color: "var(--secondary)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.brand}</div>
                        <Link to={`/product/${item.id}`} style={{ textDecoration: "none", fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>{item.name}</Link>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        style={{ color: "#e74c3c", background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "6px", flexShrink: 0 }}>
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    {(item.selectedSize || item.selectedColor) && (
                      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
                        {item.selectedSize && <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Size: <b>{item.selectedSize}</b></span>}
                        {item.selectedColor && (
                          <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            Color: <span style={{ width: "14px", height: "14px", borderRadius: "50%", background: item.selectedColor, border: "1px solid var(--border)", display: "inline-block" }} />
                          </span>
                        )}
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid var(--border)", borderRadius: "10px", overflow: "hidden" }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)} disabled={item.quantity <= 1}
                          style={{ width: "36px", height: "36px", background: "transparent", border: "none", cursor: item.quantity <= 1 ? "not-allowed" : "pointer", color: item.quantity <= 1 ? "var(--border)" : "var(--text)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <FiMinus size={12} />
                        </button>
                        <span style={{ padding: "0 0.875rem", fontWeight: 700, fontSize: "0.9rem" }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                          style={{ width: "36px", height: "36px", background: "transparent", border: "none", cursor: "pointer", color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <FiPlus size={12} />
                        </button>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>PKR {(item.price * item.quantity).toLocaleString()}</div>
                        {item.quantity > 1 && <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>PKR {item.price.toLocaleString()} each</div>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div style={{ display: "flex", justifyContent: "flex-start", paddingTop: "0.5rem" }}>
              <Link to="/shop" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--secondary)", textDecoration: "none", fontWeight: 600 }}>
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="card-luxe" style={{ padding: "1.75rem", position: "sticky", top: "calc(var(--navbar-height) + 1rem)" }}>
            <h3 className="font-serif" style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Order Summary</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Subtotal ({cart.length} items)</span>
                <span style={{ fontWeight: 600 }}>PKR {cartTotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                  <span style={{ color: "#27ae60" }}>Discount ({COUPONS[appliedCoupon]}%)</span>
                  <span style={{ color: "#27ae60", fontWeight: 600 }}>−PKR {discount.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Shipping</span>
                <span style={{ fontWeight: 600, color: shipping === 0 ? "#27ae60" : "var(--text)" }}>
                  {shipping === 0 ? "FREE" : `PKR ${shipping}`}
                </span>
              </div>
              {shipping > 0 && <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Free shipping on orders over PKR 5,000</p>}
            </div>

            <div className="divider" style={{ marginBottom: "1.25rem" }} />

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <span className="font-serif" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Total</span>
              <span className="font-serif" style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--secondary)" }}>PKR {total.toLocaleString()}</span>
            </div>

            {/* Coupon */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <FiTag size={14} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    disabled={!!appliedCoupon}
                    className="input-luxe"
                    style={{ paddingLeft: "2.5rem", paddingTop: "0.625rem", paddingBottom: "0.625rem", fontSize: "0.85rem" }}
                  />
                </div>
                {appliedCoupon ? (
                  <button onClick={() => { setAppliedCoupon(null); setCoupon(""); }} style={{ padding: "0.625rem 1rem", background: "#fee2e2", color: "#e74c3c", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "0.8rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Remove</button>
                ) : (
                  <button onClick={applyCoupon} className="btn-gold" style={{ padding: "0.625rem 1rem", fontSize: "0.8rem" }}>Apply</button>
                )}
              </div>
              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "6px" }}>Try: LUXE20, WELCOME10, SALE15</p>
            </div>

            <Link to="/checkout" className="btn-primary-luxe" style={{ width: "100%", justifyContent: "center", padding: "1rem" }}>
              <FiShoppingBag size={16} /> Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
