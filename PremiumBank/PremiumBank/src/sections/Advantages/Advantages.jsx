import "./Advantages.scss";
import { FaCheckCircle } from "react-icons/fa";


function Advantages() {

  const features = [
    ` 7/24 Müşteri Hizmetleri`,
    ` Anında Onay Sistemi`,
    ` Güvenli Online İşlemler`,
  ];

  const stats = [
    { value: "1M+", label: "Aktif Müşteri" },
    { value: "99%", label: "Müşteri Memnuniyeti" },
    { value: "25+", label: "Yıl Deneyim" },
    { value: "24/7", label: "Hizmet" },
  ];


  return (

    <div className="advantages" id="advantages">

      <div className="advantages__left">
        <h1>Neden PremiumBank?</h1>
        <p>25 yılı aşkın bankacılık deneyimimiz ile 1 milyon+ müşteriye hizmet
          veriyoruz. Güvenilir, yenilikçi ve müşteri odaklı yaklaşımımızla
          finansal ihtiyaçlarınızda yanınızdayız.
        </p>
        <ul>
          {features.map((x, i) => (

            <li key={i}> <FaCheckCircle />  {x}</li>

          ))}
        </ul>
      </div>

      <div className="advantages__right">
        {stats.map((x, i) => (
          <div className="stat" key={i}>

            <h3>{x.value}</h3>
            <p>{x.label}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Advantages;

