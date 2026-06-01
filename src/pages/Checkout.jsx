import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiMapPin, FiPhone, FiCreditCard, FiShield, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/ui/Breadcrumb";

const steps = ["Shipping", "Payment", "Review"];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "Pakistan",
    cardNumber: "", cardExpiry: "", cardCvv: "", cardName: "",
  });
  const [errors, setErrors] = useState({});

  const shipping = cartTotal > 5000 ? 0 : 299;
  const total = cartTotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 0) {
      if (!formData.firstName) newErrors.firstName = "Required";
      if (!formData.lastName) newErrors.lastName = "Required";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email required";
      if (!formData.phone) newErrors.phone = "Required";
      if (!formData.address) newErrors.address = "Required";
      if (!formData.city) newErrors.city = "Required";
    }
    if (step === 1 && paymentMethod === "card") {
      if (!formData.cardName) newErrors.cardName = "Required";
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length < 16) newErrors.cardNumber = "Valid 16-digit number required";
      if (!formData.cardExpiry) newErrors.cardExpiry = "Required";
      if (!formData.cardCvv || formData.cardCvv.length < 3) newErrors.cardCvv = "3-4 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validateStep()) setStep(s => s + 1); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orders = JSON.parse(localStorage.getItem("luxe_orders") || "[]");
    orders.push({ ...formData, items: cart, total, orderDate: new Date().toISOString(), orderId: `LX${Date.now()}` });
    localStorage.setItem("luxe_orders", JSON.stringify(orders));
    clearCart();
    navigate("/confirmation");
  };

  const formatCardNumber = (val) => val.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  const formatExpiry = (val) => val.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5);

  const FieldGroup = ({ label, icon, name, type = "text", placeholder, value, onChange, half, style = {} }) => (
    <div style={{ gridColumn: half ? "span 1" : "span 2", ...style }}>
      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "6px" }}>
        {icon && <span style={{ marginRight: "6px" }}>{icon}</span>}{label}
      </label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className="input-luxe"
        style={{ borderColor: errors[name] ? "#e74c3c" : undefined }}
      />
      {errors[name] && <span style={{ fontSize: "0.72rem", color: "#e74c3c", marginTop: "4px", display: "block" }}>{errors[name]}</span>}
    </div>
  );

  return (
    <div className="page-content">
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="container-luxe"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} /></div>
      </div>

      <div className="container-luxe" style={{ padding: "3rem 1.5rem" }}>
        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "3rem", gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: i <= step ? "var(--primary)" : "var(--border)", color: i <= step ? "#fff" : "var(--text-muted)", fontWeight: 700, fontSize: "0.85rem", transition: "all 0.3s", cursor: i < step ? "pointer" : "default" }}
                  onClick={() => { if (i < step) setStep(i); }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: "0.7rem", fontWeight: 600, color: i === step ? "var(--text)" : "var(--text-muted)", whiteSpace: "nowrap" }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: "80px", height: "2px", background: i < step ? "var(--primary)" : "var(--border)", margin: "0 8px", marginBottom: "22px", transition: "background 0.3s" }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr min(380px, 100%)", gap: "2rem", alignItems: "start" }}>
          {/* Form */}
          <div className="card-luxe" style={{ padding: "2rem" }}>
            <form onSubmit={handleSubmit}>
              {/* Step 0: Shipping */}
              {step === 0 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="font-serif" style={{ fontSize: "1.5rem", marginBottom: "1.75rem" }}>Shipping Information</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <FieldGroup label="First Name" icon={<FiUser size={12} />} name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} half />
                    <FieldGroup label="Last Name" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} half />
                    <FieldGroup label="Email" icon={<FiMail size={12} />} name="email" type="email" placeholder="john@email.com" value={formData.email} onChange={handleChange} />
                    <FieldGroup label="Phone" icon={<FiPhone size={12} />} name="phone" placeholder="+92 300 1234567" value={formData.phone} onChange={handleChange} />
                    <FieldGroup label="Street Address" icon={<FiMapPin size={12} />} name="address" placeholder="123 Main St" value={formData.address} onChange={handleChange} />
                    <FieldGroup label="City" name="city" placeholder="Lahore" value={formData.city} onChange={handleChange} half />
                    <FieldGroup label="State/Province" name="state" placeholder="Punjab" value={formData.state} onChange={handleChange} half />
                    <FieldGroup label="ZIP / Postal Code" name="zip" placeholder="54000" value={formData.zip} onChange={handleChange} half />
                    <div style={{ gridColumn: "span 1" }}>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "6px" }}>Country</label>
                      <select name="country" value={formData.country} onChange={handleChange} className="input-luxe">
                        <option>Pakistan</option><option>UAE</option><option>UK</option><option>USA</option><option>Canada</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Payment */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="font-serif" style={{ fontSize: "1.5rem", marginBottom: "1.75rem" }}>Payment Method</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.75rem" }}>
                    {[{ id: "card", label: "Credit / Debit Card", icon: "💳" }, { id: "cod", label: "Cash on Delivery", icon: "💵" }, { id: "bank", label: "Bank Transfer", icon: "🏦" }].map(m => (
                      <label key={m.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "1rem 1.25rem", border: "1.5px solid " + (paymentMethod === m.id ? "var(--secondary)" : "var(--border)"), borderRadius: "12px", cursor: "pointer", background: paymentMethod === m.id ? "rgba(201,169,110,0.06)" : "transparent", transition: "all 0.2s" }}>
                        <input type="radio" name="payment" value={m.id} checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} style={{ accentColor: "var(--secondary)" }} />
                        <span style={{ fontSize: "1.25rem" }}>{m.icon}</span>
                        <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{m.label}</span>
                      </label>
                    ))}
                  </div>
                  {paymentMethod === "card" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <FieldGroup label="Cardholder Name" icon={<FiUser size={12} />} name="cardName" placeholder="John Doe" value={formData.cardName} onChange={handleChange} />
                      <FieldGroup label="Card Number" icon={<FiCreditCard size={12} />} name="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={e => setFormData(p => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))} />
                      <FieldGroup label="Expiry Date" name="cardExpiry" placeholder="MM/YY" value={formData.cardExpiry} onChange={e => setFormData(p => ({ ...p, cardExpiry: formatExpiry(e.target.value) }))} half />
                      <FieldGroup label="CVV" name="cardCvv" placeholder="•••" value={formData.cardCvv} onChange={e => setFormData(p => ({ ...p, cardCvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))} half />
                    </div>
                  )}
                  {paymentMethod === "cod" && (
                    <div style={{ padding: "1.25rem", background: "var(--bg-secondary)", borderRadius: "12px", fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                      💵 Pay in cash when your order arrives. A PKR 50 COD fee may apply. Our delivery partner will contact you before delivery.
                    </div>
                  )}
                  {paymentMethod === "bank" && (
                    <div style={{ padding: "1.25rem", background: "var(--bg-secondary)", borderRadius: "12px", fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                      🏦 <b>Bank: HBL Pakistan</b><br />Account Title: LUXE Couture (Pvt.) Ltd.<br />Account #: 0123-4567890-001<br />IBAN: PK00HBLO0000001234567890<br />
                      <br />Send transfer confirmation to: accounts@luxecouture.pk
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Review */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="font-serif" style={{ fontSize: "1.5rem", marginBottom: "1.75rem" }}>Review Your Order</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.5rem" }}>
                    <div className="card-luxe" style={{ padding: "1.25rem" }}>
                      <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--secondary)", marginBottom: "0.75rem" }}>Ship To</div>
                      <div style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}, {formData.city}<br />
                        {formData.state} {formData.zip}, {formData.country}<br />
                        {formData.phone}
                      </div>
                    </div>
                    <div className="card-luxe" style={{ padding: "1.25rem" }}>
                      <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--secondary)", marginBottom: "0.75rem" }}>Payment</div>
                      <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                        {paymentMethod === "card" ? `💳 Card ending ****${formData.cardNumber.slice(-4)}` : paymentMethod === "cod" ? "💵 Cash on Delivery" : "🏦 Bank Transfer"}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "1rem", background: "linear-gradient(135deg, rgba(201,169,110,0.08), rgba(201,169,110,0.03))", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    <FiShield size={16} style={{ color: "var(--secondary)" }} />
                    Your order is protected by LUXE Couture's buyer guarantee. 30-day hassle-free returns.
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", gap: "1rem" }}>
                {step > 0 ? (
                  <button type="button" onClick={() => setStep(s => s - 1)} className="btn-secondary-luxe" style={{ padding: "0.875rem 1.5rem" }}>← Back</button>
                ) : (
                  <Link to="/cart" className="btn-secondary-luxe" style={{ padding: "0.875rem 1.5rem" }}>← Cart</Link>
                )}
                {step < 2 ? (
                  <button type="button" onClick={handleNext} className="btn-primary-luxe" style={{ padding: "0.875rem 1.75rem" }}>Continue →</button>
                ) : (
                  <button type="submit" className="btn-gold" style={{ padding: "0.875rem 1.75rem" }}>
                    <FiShield size={16} /> Place Order
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card-luxe" style={{ overflow: "hidden" }}>
              <button onClick={() => setOrderSummaryOpen(s => !s)}
                style={{ width: "100%", padding: "1.25rem 1.5rem", background: "var(--bg-secondary)", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Inter, sans-serif", color: "var(--text)", fontWeight: 700, fontSize: "0.9rem" }}>
                <span>Order Summary ({cart.length} items)</span>
                {orderSummaryOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
              </button>

              {orderSummaryOpen && (
                <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--border)", maxHeight: "280px", overflowY: "auto" }}>
                  {cart.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`} style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "1rem" }}>
                      <div style={{ width: "48px", height: "60px", borderRadius: "8px", overflow: "hidden", background: "var(--bg-secondary)", flexShrink: 0 }}>
                        <img src={item.images?.[0] || item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: "2px" }}>{item.name}</div>
                        {item.selectedSize && <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Size: {item.selectedSize}</div>}
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Qty: {item.quantity}</div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>PKR {(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ padding: "1.25rem 1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
                    <span>PKR {cartTotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Shipping</span>
                    <span style={{ color: shipping === 0 ? "#27ae60" : "var(--text)" }}>{shipping === 0 ? "FREE" : `PKR ${shipping}`}</span>
                  </div>
                  <div className="divider" />
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                    <span className="font-serif" style={{ fontSize: "1rem" }}>Total</span>
                    <span className="font-serif" style={{ fontSize: "1.1rem", color: "var(--secondary)" }}>PKR {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
