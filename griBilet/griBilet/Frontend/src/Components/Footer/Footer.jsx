import React from "react";
import "./footer.scss";
import Instagram from "./instagram.png"
import Twitter from "./twitter.png"
import Facebook from "./facebook.png"

function Footer() {
  return <div className="footer">

    <div className="footer-columns">
      <div className="footer-column">
        <h1>GRIBILET</h1>
        <h3>KVKK</h3>
        <h3>KULLANICI SÖZLEŞMESİ</h3>
      </div>
      <div className="footer-column">
        <h2>GİZLİLİK</h2>
        <h3>ÇEREZ POLİTİKASI</h3>
        <h3>KULLANIM KOŞULLARI</h3>
      </div>
      <div className="footer-column">
        <h2>HAKKIMIZDA</h2>
        <h3>SIKÇA SORULAN SORULAR</h3>
      </div>
      <div className="footer-column">
        <h2>SOSYAL MEDYA</h2>
        <div className="socials-img">
          <img src={Instagram} alt="Instagram" />
          <img src={Twitter} alt="Twitter" />
          <img src={Facebook} alt="Facebook" />
        </div>
        

      </div>
    </div>


  </div>
}

export default Footer;
