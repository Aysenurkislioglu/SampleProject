import React from "react";
import "./HomePage.scss";

const cardsData = [
  {
    type: "Platinum",
    number: "•••• •••• •••• 8901",
    bank: "PREMIUM BANK",
    gradient: "platinum",
    rotate: "12deg",
    top: "0px",
    left: "50px",
  },
  {
    type: "Gold",
    number: "•••• •••• •••• 5678",
    bank: "PREMIUM BANK",
    gradient: "gold",
    rotate: "6deg",
    top: "25px",
    left: "25px",
  },
  {
    type: "Classic",
    number: "•••• •••• •••• 1234",
    bank: "PREMIUM BANK",
    gradient: "classic",
    rotate: "-6deg",
    top: "50px",
    left: "0px",
  },
];

const HomePage = () => {
  return (
    <section id="homePage" className="home">
      <div className="home__cards">
        <div className="card-stack">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className={`card ${card.gradient}`}
              style={{
                "--init-rotate": card.rotate,
                top: card.top,
                left: card.left,
                zIndex: 10 - index,
              }}
            >
              <div className="card-content">
                <div className="card-header">
                  <span className="card-type">{card.type}</span>
                  <div className="card-chip">
                    <div className="chip-inner"></div>
                  </div>
                </div>
                <div className="card-number">{card.number}</div>
                <div className="card-bank">{card.bank}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home__content">
        <h1>
          Hayalinizdeki Kredi Kartı <br />
          <span>Artık Elinizde</span>
        </h1>
        <p>
          Yüksek limitler, düşük faizler ve benzersiz avantajlarla dolu kredi
          kartlarımızla finansal özgürlüğünüzü keşfedin.
        </p>
        <div className="home__buttons">
          <a href="#applicationForm" className="btn btn--primary">
            Hemen Başvur
          </a>
          <a href="#cards" className="btn btn--secondary">
            Kartları İncele
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
