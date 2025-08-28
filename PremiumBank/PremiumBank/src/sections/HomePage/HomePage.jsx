import React from "react";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <section className="home">
      <div className="home__cards">
        {/* Card Stack */}
        <div className="card-stack">
          <div className="card platinum">PLATINUM</div>
          <div className="card gold">GOLD</div>
          <div className="card classic">CLASSIC</div>
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
          <a href="#ApplicationForm" className="btn btn--primary">
            Hemen Başvur
          </a>
          <a href="#Cards" className="btn btn--secondary">
            Kartları İncele
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
