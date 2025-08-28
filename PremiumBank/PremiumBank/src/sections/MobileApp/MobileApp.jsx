import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BsApple } from "react-icons/bs";
import { FaGooglePlay } from "react-icons/fa";
import MobileAppMockup from "./MobileAppMockup/MobileAppMockup.jsx";
import "./MobileApp.scss";

function MobileApp() {
  return (
    <section className="mobileapp-section">
      <div className="mobileapp-content">
        <div className="mobileapp-info">
          <h2 className="mobileapp-title">Mobil Bankacılık Uygulaması</h2>
          <p className="mobileapp-desc">
            Kredi kartlarınızı yönetin, harcamalarınızı takip edin ve ödemelerinizi kolayca yapın. Her zaman yanınızda olan bankacılık deneyimi.
          </p>
          <ul className="mobileapp-features">
            <li><IoMdCheckmarkCircleOutline  className="check-icon"/> Anında bildirimler</li>
            <li><IoMdCheckmarkCircleOutline className="check-icon"/> Biyometrik güvenlik</li>
            <li><IoMdCheckmarkCircleOutline className="check-icon"/> Harcama analizi</li>
          </ul>
          <div className="mobileapp-buttons">
            <a href="#" className="appstore-btn"> <span role="img" aria-label="apple"><BsApple/></span> App Store </a>
            <a href="#" className="googleplay-btn"> <span role="img" aria-label="google"><FaGooglePlay/></span> Google Play </a>
          </div>
        </div>
        <div className="mobileapp-mockup">
          <MobileAppMockup />
        </div>
      </div>
    </section>
  );
}

export default MobileApp;