import "./PartnerCard.scss";

function PartnerCard({ name, description, logo }) {
  return (
    <div className="partner-card">
      <img src={logo} alt={name} className="partner-logo" />
      <p className="partner-desc">{description}</p>
    </div>
  );
}
export default PartnerCard;
