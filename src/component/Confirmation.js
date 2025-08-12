import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Confirmation = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <>
    
  <div className="container my-5">
  <div className="card shadow-sm border-0" style={{maxWidth: "800px", margin: "0 auto"}}>
    <div className="card-body p-4 p-md-5">
      {/* Order Confirmation Header */}
      <div className="text-center mb-5">
        <div className="bg-success bg-opacity-10 d-inline-flex p-3 rounded-circle mb-3">
          <i className="bi bi-check-circle-fill text-success" style={{fontSize: "2.5rem"}}></i>
        </div>
        <h1 className="h2 fw-bold mb-2 fw-italic">Order Confirmed!</h1>
        <p className="text-muted fw-italic">Thank you for your purchase. We've sent a confirmation to your email.</p>
      </div>

      {/* Previous Orders Section */}
      <div className="mb-4">
        <h2 className="h4 fw-bold d-flex align-items-center gap-2 mb-4">
          <i className="bi bi-receipt fw-italic"></i> Order History
        </h2>
        
        {orders.length === 0 ? (
          <div className="text-center py-4 bg-light rounded">
            <i className="bi bi-inbox text-muted" style={{fontSize: "2rem"}}></i>
            <p className="text-muted mt-2 mb-0 fw-italic">No previous orders found</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Order #</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td className="fw-bold">#{index + 1}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Continue Shopping Button */}
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-primary px-4 py-2">
          <i className="bi bi-arrow-left-short me-2"></i> Continue Shopping
        </Link>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default Confirmation;
