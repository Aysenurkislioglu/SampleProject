import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdOutlineDiscount } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import "./signIn.scss";

function SignIn() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newError = {};
    setSuccess(false);

    if (!form.email) newError.email = "E-posta zorunlu!";
    if (!form.password) newError.password = "Şifre zorunlu!";
    if (!form.name) newError.name = "Ad Soyad zorunlu!";
    if (!checked) newError.checkbox = "Sözleşmeyi kabul etmelisiniz.";

    setError(newError);

    if (Object.keys(newError).length > 0) return;

    try {
      const res = await fetch("http://localhost:3000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setForm({ email: "", password: "", name: "" });
        setChecked(false);
        setError({});
      } else {
        setError({ email: data.error || "Bir hata oluştu" });
      }
    } catch {
      setError({ email: "Bir hata oluştu" });
    }
  };

  return (
    <div className="sign-in-page">
      <div className="section green-container">
        <h2>GRIBILET üye girişi</h2>
        <p>Hoş geldiniz, hızlı bir şekilde üye olabilirsiniz.</p>
      </div>
      <div className="section">
        {" "}
        <div className=" sign-in-main">
          <div className="info-box">
            <div className="info-row">
              <div className="info-icon-title-desc">
                <IoMdCheckmarkCircleOutline className="info-icon green-icon" />
                <div>
                  <div className="info-title green">Kaliteli Hizmet</div>
                  <div className="info-desc">
                    Hiçbir konuda mağduriyet yaşatmadan, sizin memnuniyetiniz
                    için çalışıyoruz.
                  </div>
                </div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon-title-desc">
                <MdOutlineDiscount className="info-icon black-icon" />
                <div>
                  <div className="info-title green">En Uygun Fiyatlar</div>
                  <div className="info-desc">
                    İnternet siteleri arasında en uygun fiyatı size garanti
                    ediyoruz.
                  </div>
                </div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon-title-desc">
                <IoTicketOutline className="info-icon black-icon" />
                <div>
                  <div className="info-title green">
                    Bilet Bulmanın En Kolay Yolu
                  </div>
                  <div className="info-desc">
                    Çıktı almana gerek kalmadan, biletlerin hem sms hem de
                    e-posta ile adresine gelsin.
                  </div>
                </div>
              </div>
            </div>
            <div className="info-footer">
              <span className="info-footer-text">
                GRIBILET hesabınız varsa giriş yapabilirsiniz
              </span>
              <button className="info-login-btn">Giriş Yap</button>
            </div>
          </div>
          <div className="form-box">
            <form onSubmit={handleSubmit}>
              <h2 className="form-title">Kayıt Formu</h2>
              <label className="form-label" htmlFor="email">
                <MdEmail className="icon-email" />
                E-posta adresiniz
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="E-posta adresi giriniz.."
                value={form.email}
                onChange={handleChange}
                required
              />
              {error.email && <div className="error">{error.email}</div>}
              <label className="form-label" htmlFor="password">
                <FaLock className="icon-lock" />
                Şifreniz
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Şifre giriniz"
                value={form.password}
                onChange={handleChange}
                required
              />
              {error.password && <div className="error">{error.password}</div>}
              <label className="form-label" htmlFor="name">
                <FaUserCircle className="icon-user" />
                Adınız Soyadınız
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ad Soyad giriniz"
                value={form.name}
                onChange={handleChange}
                required
              />
              {error.name && <div className="error">{error.name}</div>}
              <div className="form-info">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    style={{ marginRight: "8px" }}
                  />
                  <span>
                    <a href="#" className="form-link">
                      Ön Bilgilendirme Koşulları
                    </a>
                    <span className="normal-text"> ve </span>
                    <a href="#" className="form-link">
                      Mesafeli Satış Sözleşmesini
                    </a>
                    <span className="normal-text"> okudum.</span>
                  </span>
                </label>
                {error.checkbox && (
                  <div className="error">{error.checkbox}</div>
                )}
              </div>
              <button type="submit" className="form-button">
                Kayıt Ol
              </button>
              {success && <div className="success">Kayıt başarılı!</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
