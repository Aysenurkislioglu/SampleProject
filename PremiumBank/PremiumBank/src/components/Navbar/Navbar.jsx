import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaTurkishLiraSign, FaCheck } from "react-icons/fa6";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <div className="column-title icons-title">
          <div className="icons">
            <div className="checkmark-bg">
              <FaCheck className="checkmark" />
            </div>
            <FaTurkishLiraSign className="tr-lira" />
          </div>
        </div>
        <div className="navbar__brand-info">
          <span className="navbar__brand">PremiumBank</span>
          <span className="navbar__subtitle">Güvenilir Bankacılık</span>
        </div>
        <ul className="navbar__menu">
          <li>
            <a href="#">Ana Sayfa</a>
          </li>
          <li>
            <a href="#kredi-kartlari">Kredi Kartları</a>
          </li>
          <li>
            <a href="#ortaklar">Ortaklar</a>
          </li>
          <li>
            <a href="#mobil-app">Mobil App</a>
          </li>
          <li>
            <a href="#blog">Blog</a>
          </li>
          <li>
            <a href="#avantajlar">Avantajlar</a>
          </li>
        </ul>
        <div className="navbar__apply-box">
          <a href="#basvuru" className="navbar__apply-btn">
            Başvuru Yap
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
