import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaTurkishLiraSign, FaCheck } from "react-icons/fa6";
import "./Footer.scss";

function Footer() {
  return (
    <footer>
      {/* faq (columns section) */}
      <div className="faq">
        <div className="column">
          {/* First column's title area with icons */}
          <div className="column-title icons-title">
            <div className="icons">
              <FaCheck className="checkmark" />
              <FaTurkishLiraSign className="tr-lira" />
            </div>
            <p>PremiumBank</p>
          </div>
          <p>Finansal özgürlüğünüzün güvenilir ortağı.</p>
        </div>
        <div className="column">
          <div className="column-title">Ürünler</div>
          <div className="column-list">
            <p>Classic Kart</p>
            <p>Gold Kart</p>
            <p>Platinum Kart</p>
            <p>Kurumsal Kartlar</p>
          </div>
        </div>
        <div className="column">
          <div className="column-title">Hizmetler</div>
          <div className="column-list">
            <p>Online Bankacılık</p>
            <p>Mobil Bankacılık</p>
            <p>ATM Ağı</p>
            <p>Müşteri Hizmetleri</p>
          </div>
        </div>
        <div className="column">
          <div className="column-title">Sosyal Medya</div>
          <div className="column-link-list">
            <FaInstagram className="column-link" />
            <FaXTwitter className="column-link" />
            <FaLinkedin className="column-link" />
          </div>
        </div>
      </div>
      {/* Seperator line */}
      <div className="line"></div>
      { /* Copyrights */}
      <div className="copyrights">
        © 2024 PremiumBank. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}

export default Footer;
