import './MobileAppMockup.scss';

function MobileAppMockup() {
  return (
    <div className="mockup-bg">
      <div className="phone-case">
        <div className="phone-screen">
          <h3 className="mockup-title">PremiumBank</h3>
          <p className="mockup-sub">Mobil Bankacılık</p>
          <div className="mockup-balance">
            <span>Toplam Bakiye</span>
            <strong>₺25,847.50</strong>
          </div>
          <div className="mockup-list">
            <div className="mockup-item">Classic Kart <span>₺8,250</span></div>
            <div className="mockup-item">Gold Kart <span>₺12,500</span></div>
            <div className="mockup-item">Platinum Kart <span>₺5,097</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MobileAppMockup;