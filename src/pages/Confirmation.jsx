import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiPackage, FiTruck, FiHome, FiArrowRight } from "react-icons/fi";

const Confirmation = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("luxe_orders") || "[]");
    if (orders.length > 0) setOrder(orders[orders.length - 1]);
  }, []);

  const steps = [
    { icon: <FiCheckCircle size={20} />, label: "Order Placed", desc: "Confirmed", active: true },
    { icon: <FiPackage size={20} />, label: "Processing", desc: "1-2 days", active: false },
    { icon: <FiTruck size={20} />, label: "On the Way", desc: "3-5 days", active: false },
    { icon: <FiHome size={20} />, label: "Delivered", desc: "At your door", active: false },
  ];

  return (
    <div className="page-content">
      <div className="container-luxe" style={{ padding: "4rem 1.5rem", maxWidth: "700px" }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #27ae60, #2ecc71)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#fff" }}
          >
            <FiCheckCircle size={40} />
          </motion.div>
          <span className="section-tag">Order Confirmed!</span>
          <h1 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "0.75rem" }}>Thank You!</h1>
          {order && (
            <>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: "0.5rem" }}>
                Hi <strong>{order.firstName}</strong>, your order has been successfully placed.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "0.5rem 1.25rem", background: "var(--bg-secondary)", borderRadius: "50px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Order ID: <span style={{ color: "var(--secondary)" }}>{order.orderId}</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>A confirmation will be sent to <strong>{order.email}</strong></p>
            </>
          )}
        </motion.div>

        {/* Tracking Steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="card-luxe" style={{ padding: "2rem", marginBottom: "2rem" }}
        >
          <h3 className="font-serif" style={{ marginBottom: "1.75rem", textAlign: "center" }}>Order Tracking</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div style={{ position: "absolute", top: "20px", left: "10%", right: "10%", height: "2px", background: "var(--border)", zIndex: 0 }} />
            {steps.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 1, flex: 1 }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: s.active ? "var(--secondary)" : "var(--bg-secondary)", border: "2px solid " + (s.active ? "var(--secondary)" : "var(--border)"), display: "flex", alignItems: "center", justifyContent: "center", color: s.active ? "#fff" : "var(--text-muted)", transition: "all 0.3s" }}>
                  {s.icon}
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: s.active ? "var(--text)" : "var(--text-muted)" }}>{s.label}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Order Details */}
        {order && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="card-luxe" style={{ padding: "1.75rem", marginBottom: "2rem" }}
          >
            <h3 className="font-serif" style={{ marginBottom: "1.25rem" }}>Delivery Details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ padding: "1rem", background: "var(--bg-secondary)", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--secondary)", marginBottom: "6px" }}>Ship To</div>
                <div style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
                  {order.firstName} {order.lastName}<br />
                  {order.address}, {order.city}<br />
                  {order.state}, {order.country}
                </div>
              </div>
              <div style={{ padding: "1rem", background: "var(--bg-secondary)", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--secondary)", marginBottom: "6px" }}>Estimated Delivery</div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                  3–5 business days<br />
                  You'll receive tracking<br />info via email
                </div>
              </div>
            </div>
            {order.items && (
              <div style={{ marginTop: "1.25rem" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Items Ordered</div>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", padding: "0.375rem 0", borderBottom: "1px solid var(--border)" }}>
                    <span>{item.name} × {item.quantity}</span>
                    <span style={{ fontWeight: 700 }}>PKR {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, paddingTop: "0.75rem" }}>
                  <span className="font-serif">Total Paid</span>
                  <span className="font-serif" style={{ color: "var(--secondary)" }}>PKR {order.total?.toLocaleString()}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link to="/" className="btn-secondary-luxe">← Back to Home</Link>
          <Link to="/shop" className="btn-primary-luxe">Continue Shopping <FiArrowRight size={16} /></Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Confirmation;
