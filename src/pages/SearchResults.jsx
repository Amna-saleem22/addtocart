import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSliders, FiArrowLeft, FiSearch } from "react-icons/fi";
import ProductCard from "../components/ui/ProductCard";
import SEO from "../components/ui/SEO";
import { products } from "../data/products";

const sortOptions = [
  { value: "relevance",  label: "Best Match" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating",    label: "Top Rated" },
  { value: "newest",    label: "Newest" },
];

const priceRanges = [
  { label: "Under PKR 2,000",     min: 0,     max: 2000 },
  { label: "PKR 2,000 – 5,000",  min: 2000,  max: 5000 },
  { label: "PKR 5,000 – 15,000", min: 5000,  max: 15000 },
  { label: "PKR 15,000+",        min: 15000, max: Infinity },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const [sort,         setSort]         = useState("relevance");
  const [priceFilter,  setPriceFilter]  = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filtersOpen,  setFiltersOpen]  = useState(false);

  const categories = [...new Set(products.map(p => p.category))];

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const lower = q.toLowerCase();
    let list = products.filter(p =>
      p.name.toLowerCase().includes(lower) ||
      p.brand.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower) ||
      (p.description && p.description.toLowerCase().includes(lower))
    );
    if (priceFilter) list = list.filter(p => p.price >= priceFilter.min && p.price < priceFilter.max);
    if (categoryFilter) list = list.filter(p => p.category === categoryFilter);
    switch (sort) {
      case "price-asc":  list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating":     list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "newest":     list = [...list].sort((a, b) => b.id - a.id); break;
      default: break;
    }
    return list;
  }, [q, sort, priceFilter, categoryFilter]);

  const clearFilters = () => { setPriceFilter(null); setCategoryFilter(""); setSort("relevance"); };
  const hasFilters = priceFilter || categoryFilter || sort !== "relevance";

  return (
    <div className="page-content">
      <SEO
        title={q ? `Search: "${q}"` : "Search"}
        description={`Search results for "${q}" — Browse premium South Asian fashion at LUXE Couture.`}
        url={`/search?q=${encodeURIComponent(q)}`}
      />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", padding: "3rem 0 2.5rem" }}>
        <div className="container-luxe">
          <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.82rem", marginBottom: "1.25rem", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
          >
            <FiArrowLeft size={14} /> Back to Shop
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#06B6D4", fontWeight: 700, marginBottom: "0.5rem" }}>
                Search Results
              </div>
              <h1 className="font-serif" style={{ color: "#fff", fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
                {q ? <>Results for <span className="text-gradient">"{q}"</span></> : "All Products"}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                {results.length > 0
                  ? `${results.length} product${results.length !== 1 ? "s" : ""} found`
                  : q ? "No products found" : "Enter a search term above"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-luxe" style={{ padding: "2rem 1.5rem" }}>
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setFiltersOpen(s => !s)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "0.6rem 1rem", borderRadius: "10px",
                background: filtersOpen ? "var(--indigo-light)" : "var(--card-bg)",
                border: `1.5px solid ${filtersOpen ? "var(--secondary)" : "var(--border)"}`,
                color: filtersOpen ? "var(--secondary)" : "var(--text)",
                cursor: "pointer", fontFamily: "Inter, sans-serif",
                fontSize: "0.82rem", fontWeight: 600, transition: "all 0.2s",
              }}
            >
              <FiSliders size={14} /> Filters
              {hasFilters && <span style={{ background: "var(--secondary)", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>!</span>}
            </button>
            {hasFilters && (
              <button onClick={clearFilters} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "0.6rem 0.875rem", borderRadius: "10px", background: "none", border: "1.5px solid #EF4444", color: "#EF4444", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "0.8rem", fontWeight: 600 }}>
                <FiX size={13} /> Clear
              </button>
            )}
            {categoryFilter && (
              <span style={{ display: "flex", alignItems: "center", gap: "4px", padding: "0.4rem 0.75rem", borderRadius: "50px", background: "var(--indigo-light)", color: "var(--secondary)", fontSize: "0.78rem", fontWeight: 600 }}>
                {categoryFilter} <FiX size={11} style={{ cursor: "pointer" }} onClick={() => setCategoryFilter("")} />
              </span>
            )}
            {priceFilter && (
              <span style={{ display: "flex", alignItems: "center", gap: "4px", padding: "0.4rem 0.75rem", borderRadius: "50px", background: "var(--cyan-light)", color: "#0891B2", fontSize: "0.78rem", fontWeight: 600 }}>
                {priceFilter.label} <FiX size={11} style={{ cursor: "pointer" }} onClick={() => setPriceFilter(null)} />
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>Sort:</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{ padding: "0.5rem 0.875rem", borderRadius: "10px", border: "1.5px solid var(--border)", background: "var(--card-bg)", color: "var(--text)", fontFamily: "Inter, sans-serif", fontSize: "0.82rem", cursor: "pointer", outline: "none" }}
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: "hidden", marginBottom: "1.5rem" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", padding: "1.5rem", background: "var(--card-bg)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--secondary)", marginBottom: "0.75rem" }}>Category</div>
                  {["", ...categories].map(c => (
                    <button key={c} onClick={() => setCategoryFilter(c)}
                      style={{
                        display: "block", width: "100%", textAlign: "left", padding: "0.4rem 0.75rem", marginBottom: "4px",
                        borderRadius: "8px", background: categoryFilter === c ? "var(--indigo-light)" : "transparent",
                        border: categoryFilter === c ? "1px solid var(--secondary)" : "1px solid transparent",
                        color: categoryFilter === c ? "var(--secondary)" : "var(--text-muted)",
                        cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "0.85rem", fontWeight: 500,
                        transition: "all 0.2s",
                      }}
                    >{c || "All Categories"}</button>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--secondary)", marginBottom: "0.75rem" }}>Price Range</div>
                  {priceRanges.map(r => (
                    <button key={r.label} onClick={() => setPriceFilter(priceFilter?.label === r.label ? null : r)}
                      style={{
                        display: "block", width: "100%", textAlign: "left", padding: "0.4rem 0.75rem", marginBottom: "4px",
                        borderRadius: "8px", background: priceFilter?.label === r.label ? "var(--cyan-light)" : "transparent",
                        border: priceFilter?.label === r.label ? "1px solid #06B6D4" : "1px solid transparent",
                        color: priceFilter?.label === r.label ? "#0891B2" : "var(--text-muted)",
                        cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "0.85rem", fontWeight: 500,
                        transition: "all 0.2s",
                      }}
                    >{r.label}</button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Grid */}
        {!q.trim() ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
            <h2 className="font-serif" style={{ marginBottom: "0.75rem", fontSize: "1.75rem" }}>Start Searching</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Type in the search bar above to find products</p>
            <Link to="/shop" className="btn-primary-luxe">Browse All Products</Link>
          </div>
        ) : results.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>😕</div>
            <h2 className="font-serif" style={{ marginBottom: "0.75rem", fontSize: "1.75rem" }}>No Results Found</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>
              We couldn't find any products matching "<strong>{q}</strong>"
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
              Try different keywords, or browse our full collection.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/shop" className="btn-primary-luxe">Browse All Products</Link>
              <button onClick={clearFilters} className="btn-secondary-luxe">Clear Filters</button>
            </div>
            {/* Suggestions */}
            <div style={{ marginTop: "3rem" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Popular Searches</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                {["Shalwar Kameez", "Lehenga", "Kurti", "Sherwani", "Bridal"].map(s => (
                  <Link key={s} to={`/search?q=${encodeURIComponent(s)}`}
                    style={{ padding: "0.4rem 1rem", borderRadius: "50px", background: "var(--indigo-light)", color: "var(--secondary)", textDecoration: "none", fontSize: "0.82rem", fontWeight: 600, border: "1px solid rgba(79,70,229,0.2)" }}
                  >{s}</Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}
          >
            {results.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
