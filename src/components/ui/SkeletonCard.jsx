const SkeletonCard = () => (
  <div className="card-luxe" style={{ overflow: "hidden" }}>
    <div className="skeleton" style={{ aspectRatio: "3/4", width: "100%" }} />
    <div style={{ padding: "1rem" }}>
      <div className="skeleton" style={{ height: "10px", width: "40%", marginBottom: "10px" }} />
      <div className="skeleton" style={{ height: "14px", width: "80%", marginBottom: "10px" }} />
      <div className="skeleton" style={{ height: "10px", width: "60%", marginBottom: "12px" }} />
      <div className="skeleton" style={{ height: "36px", width: "100%" }} />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 8 }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "1.5rem",
  }}>
    {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
  </div>
);

export default SkeletonCard;
