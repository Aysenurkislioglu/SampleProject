import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { PiMicrophoneStageBold } from "react-icons/pi";
import { IoHeartCircle } from "react-icons/io5";
import "./TicketInfo.scss";

function TicketInfo() {
  return (
    <div className="section ticket-info-container">
      <div className="left-area">
        <div className="subtitle">Title</div>
        <div className="image">Resim</div>
      </div>

      <div className="right-area">
        <div className="subtitle">Bilgiler</div>
        <div className="ticket-info">
          <div className="info-item">
            <FaLocationDot className="icon" /> Mekan
          </div>
          <div className="info-item">
            <FaRegCalendarAlt className="icon" /> Tarih
          </div>
          <div className="info-item">
            <FaRegClock className="icon" /> Saat
          </div>
          <div className="info-item">
            <PiMicrophoneStageBold className="icon" /> Sanatçı
          </div>
        </div>

        <div className="subtitle">Açıklama</div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
          pariatur fuga minima adipisci cumque corrupti voluptatem eius
          accusantium officiis quos, a perspiciatis accusamus facilis numquam
          libero nihil similique nemo! Eligendi nulla vel magni reprehenderit,
          totam suscipit natus. Veritatis tempora harum omnis eaque. Repudiandae
          magnam, corporis soluta reiciendis voluptatum cupiditate eaque!
        </p>

        <div className="button-area">
          <div className="add-to-favourite">
            <IoHeartCircle className="icon" /> Favorilere Ekle
          </div>
          <div className="purchase-area">
            <div className="price">1450 TL</div>
            <div className="button">SATIN AL</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketInfo;
