import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { SkeletonGrid } from "./components/ui/SkeletonCard";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

const PageLoader = () => (
  <div className="page-content" style={{ padding: "3rem 0" }}>
    <div className="container-luxe"><SkeletonGrid count={4} /></div>
  </div>
);

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "0.875rem",
            borderRadius: "10px",
            padding: "0.875rem 1.25rem",
          },
          success: { iconTheme: { primary: "#c9a96e", secondary: "#fff" } },
        }}
      />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={
            <div className="page-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", gap: "1.5rem", textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "5rem", fontFamily: "serif" }}>404</div>
              <h1 className="font-serif" style={{ fontSize: "2.5rem" }}>Page Not Found</h1>
              <p style={{ color: "var(--text-muted)" }}>The page you're looking for doesn't exist.</p>
              <a href="/" className="btn-primary-luxe">Go Home</a>
            </div>
          } />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
