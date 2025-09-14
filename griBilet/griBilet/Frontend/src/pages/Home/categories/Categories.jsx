import useFilters from "../hooks/UseFilters";
import "../categories/Categories.scss"

import konserIcon from "../Media/konser.avif"
import tiyatroIcon from "../Media/tiyatro.avif"
import festivalIcon from "../Media/festival.avif"
import standupIcon from "../Media/stand-up.avif"



const cats = [
  { slug: "konser", label: "KONSER", icon: konserIcon },
  { slug: "tiyatro", label: "TİYATRO", icon: tiyatroIcon },
  { slug: "festival", label: "FESTİVAL", icon: festivalIcon },
  { slug: "standup", label: "STAND UP", icon: standupIcon }
]

export default function Categories() {

  const { filters, update } = useFilters();

  function toggleCategory(e) {

    if (filters.category == e.slug) {
      update({ category: null })
    } else {
      update({ category: e.slug })
    }

  }


  const makeToggle = (e) => () => toggleCategory(e) // referans olarak verdik toggleCategory fonkunu



  return (
    <div className="categories">

      <ul className="categoryList">
        {cats.map((e) => (
          <li key={e.slug}>
            <button
              className={`category ${filters.category === e.slug ? "is-active" : ""}`}
              onClick={makeToggle(e)}
            >
              <img src={e.icon} />
              <p> {e.label} </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 