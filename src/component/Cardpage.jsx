import { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

// import { useNavigate } from "react-router-dom"; // ✅ sahi import// Ensure you have react-router-dom installed
const Cardpage = () => {
  const { cart, setCart } = useContext(CartContext);
  // const navigate = useNavigate();

  const updateQuantity = (id, qty) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>


<div className="container mt-5 mb-5">
  <div className="card shadow-lg">
    <div className="card-header bg-info text-white">
      <h1 className="mb-0 text-center text-uppercase fw-bold">Your Shopping Cart</h1>
    </div>
    
    <div className="card-body p-4">
      {cart.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-cart-x fs-1 text-muted"></i>
          <p className="fs-4 text-muted mt-3">Your cart is empty</p>
        </div>
      ) : (
        <div className="row g-4">
          {cart.map(item => (
            <div className="col-md-6" key={item.id}>
              <div className="card h-100 border-0 shadow-sm hover-shadow">
                <div className="card-body d-flex flex-column align-items-center">
                  <img 
                    src={item.image} 
                    className="img-fluid rounded mb-3" 
                    alt={item.name} 
                    style={{maxHeight: "120px", objectFit: "contain"}} 
                  />
                  
                  <h3 className="h5 text-capitalize fw-bold text-center fw-italic">{item.name}</h3>
                 <p className="text-color text-center" style={{
  fontSize: '14px',
  color: '#555',
  lineHeight: '1.6',
  maxWidth: '300px',
  margin: '10px auto',
  fontStyle: 'italic'
}}>
  {item.description}
</p>
                  <div className="d-flex justify-content-between w-100 mt-2">
                    <span className="text-muted">Price:</span>
                    <span className="fw-bold">${item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between w-100 mt-2">
                    <span className="text-muted">Quantity:</span>
                    <span className="fw-bold">{item.quantity}</span>
                  </div>
                  
                  <div className="d-flex gap-2 mt-4 w-100 justify-content-center">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                      className="btn btn-outline-secondary btn-lg"
                      disabled={item.quantity <= 1}
                    >
                    -
                    </button>
                    
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                      className="btn btn-outline-secondary btn-lg"
                    >
                    +
                    </button>
                    
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="btn btn-outline-danger btn-lg fw-bold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    
    {cart.length > 0 && (
      <div className="card-footer bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0 fw-bold">Total: <span className="text-info">${total.toFixed(2)}</span></h2>
          
          <Link to="/Checkout" className="btn btn-info px-4 py-2 text-uppercase fw-bold">
            Proceed to Checkout <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    )}
  </div>
</div>
</>
  );
};

export default Cardpage;
