import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get old orders from localStorage
    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Add new order
    const updatedOrders = [...oldOrders, formData];

    // Save to localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Redirect to confirmation page
    navigate("/confirmation");
  };

  return (
    <>
  


<div className="container py-5">
  <div
    className="card shadow-lg border-0 mx-auto rounded-4"
    style={{ maxWidth: "520px" }}
  >


    {/* Card Header */}
    <div className="bg-primary text-white text-center rounded-top-4 py-4">
      <h2 className="h3 fw-bold mb-1">Secure Checkout</h2>
      <p className="mb-0 small opacity-75">
        Please fill in your details to complete your purchase
      </p>
    </div>

    {/* Card Body */}
    <div className="card-body p-4 p-md-5">
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-semibold">
            <i className="bi bi-person-fill me-2"></i> Full Name
          </label>
          <input
            type="text"
            className="form-control form-control-lg rounded-3 border-primary-subtle"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          <div className="invalid-feedback">Please enter your full name.</div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">
            <i className="bi bi-envelope-fill me-2"></i> Email Address
          </label>
          <input
            type="email"
            className="form-control form-control-lg rounded-3 border-primary-subtle"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
          />
          <div className="invalid-feedback">Please enter a valid email.</div>
        </div>

        {/* Address */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label fw-semibold">
            <i className="bi bi-house-fill me-2"></i> Address
          </label>
          <input
            type="text"
            className="form-control form-control-lg rounded-3 border-primary-subtle"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St"
          />
          <div className="invalid-feedback">Please enter your address.</div>
        </div>

        {/* City */}
        <div className="mb-3">
          <label htmlFor="city" className="form-label fw-semibold">
            <i className="bi bi-geo-alt-fill me-2"></i> City
          </label>
          <input
            type="text"
            className="form-control form-control-lg rounded-3 border-primary-subtle"
            id="city"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            placeholder="New York"
          />
          <div className="invalid-feedback">Please enter your city.</div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="form-label fw-semibold">
            <i className="bi bi-telephone-fill me-2"></i> Phone Number
          </label>
          <input
            type="tel"
            className="form-control form-control-lg rounded-3 border-primary-subtle"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />
          <div className="invalid-feedback">Please enter your phone number.</div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-success w-100 py-3 fw-bold rounded-3 shadow-sm"
          style={{ background: 'linear-gradient(90deg, #28a745, #218838)' }}
        >
          <i className="bi bi-lock-fill me-2"></i> Place Secure Order
        </button>
      </form>
    </div>

    {/* Footer */}
    <div className="text-center py-3 small text-muted border-top">
      <i className="bi bi-shield-lock me-1"></i> Your payment is safe with us
    </div>
  </div>
</div>





    </>
  );
};

export default Checkout;
