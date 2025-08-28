import React from "react";
import "./Cards.scss";

const cardData = [
  {
    title: "Gold Kart",
    desc: "Yüksek limit, düşük faiz ve özel avantajlarla premium deneyim. ",
    features: [
      "50.000 TL'ye kadar limit",
      "%1.99 aylık faiz",
      "Havalimanı lounge erişimi",
      "Ücretsiz yıllık aidat",
    ],
    color: "gold",
  },
  {
    tittle: "Platinum Kart",
    desc: "Sınırsız avantajlar ve VIP hizmetlerle lüks yaşam. ",
    features: [
      "100.000 TL'ye kadar limit",
      "%1.49 aylık faiz",
      "Concierge hizmeti",
      "Seyahat sigortası",
    ],
    color: "platinum",
  },
  {
    tittle: "Classic Kart",
    desc: "Günlük ihtiyaçlarınız için ideal, uygun faizli kart. ",
    features: [
      "25.000 TL'ye kadar limit",
      "%2.49 aylık faiz",
      "Online alışveriş güvencesi",
      "Taksit avantajları",
    ],
    color: "classic",
  },
];

const Cards = () => {
  return (
    <section className="cards">
      <div className="cards__header">
        <h2>Kredi Kartlarımız</h2>
        <p>
          İhtiyaçlarınıza özel tasarlanmış kredi kartlarımızla finansal
          özgürlüğünüzü yaşayın.
        </p>
      </div>

      <div className="cards__grid">
        {cardData.map((card, i) => (
          <div className={`card ${card.color}`} key={i}>
            <h3>{card.title}</h3>
            <p className="desc">{card.desc}</p>
            <ul>
              {card.features.map((f, idx) => (
                <li key={idx}>• {f}</li>
              ))}
            </ul>
            <button>Başvur →</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cards;
