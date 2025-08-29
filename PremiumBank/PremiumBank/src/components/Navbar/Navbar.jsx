import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { FaTurkishLiraSign, FaCheck } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="navbar__left">
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
        </div>

        <div className="navbar__right">
          <div className="navbar__menu-container">
            <ul className="navbar__menu">
              <li>
                <a href="#home">Ana Sayfa</a>
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
          </div>

          <div className="navbar__apply-box">
            <a href="#basvuru" className="navbar__apply-btn">
              Başvuru Yap
            </a>
          </div>

          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      <section className={`navbar__panel${menuOpen ? " open" : ""}`}>
        <div className="navbar__panel-header">
          <span className="navbar__panel-title">Menü</span>
          <button
            className="navbar__drawer-close"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        <ul className="navbar__panel-menu">
          <li>
            <a href="#" onClick={() => setMenuOpen(false)}>
              Ana Sayfa
            </a>
          </li>
          <li>
            <a href="#kredi-kartlari" onClick={() => setMenuOpen(false)}>
              Kredi Kartları
            </a>
          </li>
          <li>
            <a href="#ortaklar" onClick={() => setMenuOpen(false)}>
              Ortaklar
            </a>
          </li>
          <li>
            <a href="#mobil-app" onClick={() => setMenuOpen(false)}>
              Mobil App
            </a>
          </li>
          <li>
            <a href="#blog" onClick={() => setMenuOpen(false)}>
              Blog
            </a>
          </li>
          <li>
            <a href="#avantajlar" onClick={() => setMenuOpen(false)}>
              Avantajlar
            </a>
          </li>
        </ul>
        <div className="navbar__panel-cta">
          <a
            href="#basvuru"
            className="navbar__apply-btn"
            onClick={() => setMenuOpen(false)}
          >
            Başvuru Yap
          </a>
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
