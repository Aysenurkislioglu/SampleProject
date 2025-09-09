import useFilters from "../hooks/UseFilters";

const CATS = [
  { slug: "concert",  label: "KONSER"  },
  { slug: "theatre",  label: "TİYATRO" },
  { slug: "festival", label: "FESTİVAL"},
  { slug: "standup",  label: "STAND UP"},
];

export default function Categories() {
  const { filters, update } = useFilters();
  return (
    <ul className="categories__list">
      {CATS.map(c => (
        <li key={c.slug}>
          <button
            className={`category ${filters.category === c.slug ? "is-active" : ""}`}
            onClick={() => update({ category: c.slug })}
          >
            <span>{c.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
