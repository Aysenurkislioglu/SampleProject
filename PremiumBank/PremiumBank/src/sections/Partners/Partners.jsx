import "./Partners.scss";
import PartnerCard from "./PartnerCard/PartnerCard.jsx";

const partners = [
  {
    name: "VISA",
    description: "Güvenli Ödeme",
    logo: "/partners_logo/visa_logo.png",
  },
  {
    name: "Mastercard",
    description: "Mastercard",
    logo: "/partners_logo/mastercard_logo.svg",
  },
  {
    name: "AMEX",
    description: "Premium",
    logo: "/partners_logo/amex_logo.png",
  },
  {
    name: "Apple Pay",
    description: "Mobil Ödeme",
    logo: "/partners_logo/applepay_logo.png",
  },
  {
    name: "G Pay",
    description: "Dijital Cüzdan",
    logo: "/partners_logo/gpay_logo.webp",
  },
  {
    name: "S Pay",
    description: "Temassız",
    logo: "/partners_logo/spay_logo.png",
  },
];

function Partners() {
  return (
    <section id="partners" className="partners-section">
      <h2 className="partners-title">Güvenilir Ortaklarımız</h2>
      <p className="partners-desc">
        Dünya çapında tanınmış markalarla işbirliği yaparak size en iyi hizmeti
        sunuyoruz.
      </p>
      <div className="partners-list">
        {partners.map((partner) => (
          <PartnerCard key={partner.name} {...partner} />
        ))}
      </div>
    </section>
  );
}

export default Partners;
