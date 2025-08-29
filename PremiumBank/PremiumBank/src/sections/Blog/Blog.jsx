import "./Blog.scss";
import { CiCreditCard2 } from "react-icons/ci";
import { HiCurrencyDollar } from "react-icons/hi";
import { LuSmartphoneNfc } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";

const defaultPost = [
  {
    id: "kredi-karti-rehberi",
    category: "Kredi Kartı Rehberi",
    categoryKey: "guide",
    icon: <CiCreditCard2 />,
    title: "Kredi Kartı Seçerken Dikkat Edilmesi Gerekenler",
    excerpt:
      "Doğru kredi kartını seçmek için faiz oranları, yıllık ücretler ve avantajların karşılaştırılmasının önemi...",
    date: "2024-12-15",
    href: "#",
  },
  {
    id: "borc-yonetimi",
    category: "Finansal İpuçları",
    categoryKey: "tips",
    icon: <HiCurrencyDollar />,
    title: "Kredi Kartı Borcunu Nasıl Yönetirsiniz?",
    excerpt:
      "Kredi kartı borcunuzu kontrol altında tutmak ve faiz yükünden kurtulmak için pratik stratejiler...",
    date: "2024-12-12",
    href: "#",
  },
  {
    id: "temassiz-odeme-guvenligi",
    category: "Teknoloji",
    categoryKey: "tech",
    icon: <LuSmartphoneNfc />,
    title: "Temassız Ödeme Güvenliği",
    excerpt:
      "NFC teknolojisi ile yapılan temassız ödemelerin güvenlik özellikleri ve kullanım ipuçları...",
    date: "2024-12-10",
    href: "#",
  }

]

function Blog() {
  return (


    <div className="blog">

      <div className="blog__header">
        <h1>Finansal Rehber</h1>
        <p>
          Kredi kartları ve kişisel finans hakkında faydalı bilgiler ve güncel
          haberler.
        </p>

      </div>

      <div className="blog__content">
        {defaultPost.map((x) => (

          <div className="blog-card" key={x.id}>

            <div className={`blog-card__top is-${x.categoryKey}`}>
              {x.icon}
              <p>{x.category}</p>
            </div>

            <div className="blog-card__bottom">

              <h3>{x.title}</h3>
              <p>{x.excerpt}</p>

              <div className="blog-card__bottom__footer">
                <p>{x.date}</p>
                <a href={x.href} >Devamını Oku <FaArrowRight /></a>
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>



  );
}

export default Blog;

