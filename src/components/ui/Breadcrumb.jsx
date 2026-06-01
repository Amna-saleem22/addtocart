import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const Breadcrumb = ({ items }) => (
  <nav className="breadcrumb-luxe">
    {items.map((item, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {i > 0 && <FiChevronRight size={12} />}
        {item.href ? (
          <Link to={item.href}>{item.label}</Link>
        ) : (
          <span>{item.label}</span>
        )}
      </div>
    ))}
  </nav>
);

export default Breadcrumb;
