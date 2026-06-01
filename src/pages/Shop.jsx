import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSearch, FiSliders } from "react-icons/fi";
import ProductCard from "../components/ui/ProductCard";
import { SkeletonGrid } from "../components/ui/SkeletonCard";
import Breadcrumb from "../components/ui/Breadcrumb";
import { products, categories, brands } from "../data/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest First" },
  { value: "discount", label: "Best Discount" },
];

const priceRanges = [
  { label: "Under PKR 2,000", min: 0, max: 2000 },
  { label: "PKR 2,000 – 5,000", min: 2000, max: 5000 },
  { label: "PKR 5,000 – 15,000", min: 5000, max: 15000 },
  { label: "PKR 15,000+", min: 15000, max: Infinity },
];

const ITEMS_PER_PAGE = 8;

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sort, setSort] = useState("featured");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const search = searchParams.get("search");
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    setPage(1);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== "All") result = result.filter(p => p.category === selectedCategory);
    if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand));
    if (selectedPrice) result = result.filter(p => p.price >= selectedPrice.min && p.price <= selectedPrice.max);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)));
    }
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => b.id - a.id); break;
      case "discount": result.sort((a, b) => b.discount - a.discount); break;
      default: break;
    }
    return result;
  }, [selectedCategory, selectedBrands, selectedPrice, searchQuery, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const activeFiltersCount = (selectedCategory !== "All" ? 1 : 0) + selectedBrands.length + (selectedPrice ? 1 : 0);

  const clearFilters = () => { setSelectedCategory("All"); setSelectedBrands([]); setSelectedPrice(null); setSearchQuery(""); setPage(1); };

  const FilterPanel = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Category */}
      <div>
        <h4 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text)", marginBottom: "1rem" }}>Category</h4>
        {categories.map(cat => (
          <button key={cat} onClick={() => { setSelectedCategory(cat); setPage(1); }}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "0.5rem 0.75rem", background: selectedCategory === cat ? "var(--primary)" : "transparent", color: selectedCategory === cat ? "#fff" : "var(--text)", border: "1px solid " + (selectedCategory === cat ? "var(--primary)" : "var(--border)"), borderRadius: "8px", marginBottom: "6px", cursor: "pointer", fontSize: "0.85rem", fontFamily: "Inter, sans-serif", transition: "all 0.2s", textAlign: "left" }}>
            {cat}
            <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>{cat === "All" ? products.length : products.filter(p => p.category === cat).length}</span>
          </button>
        ))}
      </div>

      {/* Brands */}
      <div>
        <h4 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text)", marginBottom: "1rem" }}>Brand</h4>
        {brands.map(brand => (
          <label key={brand} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.4rem 0", cursor: "pointer", fontSize: "0.875rem", color: "var(--text)" }}>
            <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)}
              style={{ width: "16px", height: "16px", accentColor: "var(--secondary)", cursor: "pointer" }} />
            {brand}
          </label>
        ))}
      </div>

      {/* Price */}
      <div>
        <h4 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text)", marginBottom: "1rem" }}>Price Range</h4>
        {priceRanges.map((range, i) => (
          <button key={i} onClick={() => { setSelectedPrice(selectedPrice?.label === range.label ? null : range); setPage(1); }}
            style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", textAlign: "left", background: selectedPrice?.label === range.label ? "var(--secondary)" : "transparent", color: selectedPrice?.label === range.label ? "#fff" : "var(--text-muted)", border: "1px solid " + (selectedPrice?.label === range.label ? "var(--secondary)" : "var(--border)"), borderRadius: "8px", marginBottom: "6px", cursor: "pointer", fontSize: "0.82rem", fontFamily: "Inter, sans-serif", transition: "all 0.2s" }}>
            {range.label}
          </button>
        ))}
      </div>

      {activeFiltersCount > 0 && (
        <button onClick={clearFilters} style={{ padding: "0.625rem", background: "transparent", border: "1px solid #e74c3c", color: "#e74c3c", borderRadius: "8px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <FiX size={14} /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="page-content">
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)", padding: "0 0 0.5rem" }}>
        <div className="container-luxe">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
        </div>
      </div>

      <div style={{ background: "var(--bg-secondary)", padding: "3rem 0 2rem" }}>
        <div className="container-luxe" style={{ textAlign: "center" }}>
          <h1 className="section-title font-serif">Our Collection</h1>
          <p className="section-subtitle" style={{ margin: "0.75rem auto 0" }}>Explore {products.length}+ premium fashion pieces curated for you</p>
        </div>
      </div>

      <div className="container-luxe" style={{ padding: "2rem 1.5rem" }}>
        {/* Toolbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <button onClick={() => setFilterOpen(s => !s)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0.625rem 1.25rem", background: filterOpen ? "var(--primary)" : "transparent", color: filterOpen ? "#fff" : "var(--text)", border: "1.5px solid var(--border)", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, fontFamily: "Inter, sans-serif", transition: "all 0.2s" }}>
              <FiSliders size={14} /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <FiSearch size={14} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setPage(1); }} placeholder="Search products..."
                className="input-luxe" style={{ paddingLeft: "2.5rem", paddingTop: "0.625rem", paddingBottom: "0.625rem", width: "220px" }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{filteredProducts.length} products</span>
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ padding: "0.625rem 1rem", background: "var(--card-bg)", border: "1.5px solid var(--border)", borderRadius: "8px", color: "var(--text)", fontSize: "0.82rem", fontFamily: "Inter, sans-serif", cursor: "pointer", outline: "none" }}>
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: filterOpen ? "260px 1fr" : "1fr", gap: "2rem", alignItems: "start" }}>
          {/* Filter Sidebar */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                className="card-luxe" style={{ padding: "1.5rem", position: "sticky", top: "calc(var(--navbar-height) + 1rem)" }}>
                <FilterPanel />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div>
            {loading ? <SkeletonGrid count={8} /> : paginatedProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
                <h3 className="font-serif" style={{ marginBottom: "0.5rem" }}>No products found</h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Try adjusting your filters or search term</p>
                <button onClick={clearFilters} className="btn-primary-luxe">Clear Filters</button>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
                  {paginatedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "3rem", flexWrap: "wrap" }}>
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                      style={{ padding: "0.5rem 1rem", borderRadius: "8px", border: "1.5px solid var(--border)", background: "transparent", color: page === 1 ? "var(--border)" : "var(--text)", cursor: page === 1 ? "not-allowed" : "pointer", fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                      <button key={n} onClick={() => setPage(n)}
                        style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1.5px solid " + (page === n ? "var(--primary)" : "var(--border)"), background: page === n ? "var(--primary)" : "transparent", color: page === n ? "#fff" : "var(--text)", cursor: "pointer", fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>
                        {n}
                      </button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                      style={{ padding: "0.5rem 1rem", borderRadius: "8px", border: "1.5px solid var(--border)", background: "transparent", color: page === totalPages ? "var(--border)" : "var(--text)", cursor: page === totalPages ? "not-allowed" : "pointer", fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
