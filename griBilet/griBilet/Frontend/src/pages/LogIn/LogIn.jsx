import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import "./login.scss";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log("Giriş başarılı!");

        navigate("/dashboard");
      } else {
        setError(data.error || "Giriş başarısız. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        "Ağ hatası. Lütfen bağlantınızı kontrol edin ve tekrar deneyin."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signin");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <>
      <section className="section banner">
        <div className="banner__content">
          <h1 id="login-banner-title">GRİBİLET üye girişi</h1>
          <p className="banner__subtitle">
            Hoş geldiniz, hızlı bir şekilde üye olabilirsiniz.
          </p>
        </div>
      </section>

      <section className="auth-boxes">
        <div className="section left">
          <h2 id="signup-heading">GRİBİLET hesabınız yok mu?</h2>
          <p id="signup-title">Hemen buradan tıklayarak oluşturun.</p>
          <p id="signup-subtitle">
            Eğlenceyi kaçırma, indirimli biletler seni bekliyor!
          </p>
          <button
            type="button"
            className="signup-redirect-button"
            onClick={handleSignupRedirect}
            disabled={isLoading}
          >
            Üye ol
          </button>
        </div>
        <div className="section right">
          <div className="form-box" id="login-form">
            <form onSubmit={handleLogin}>
              <h2>Giriş Yap</h2>
              <div className="input-wrapper">
                <span className="input-icon">
                  <FiMail />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-posta giriniz"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="input-wrapper">
                <span className="input-icon">
                  <FiLock />
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Şifre giriniz"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner">
                    <span className="spinner"></span>
                    Logging in...
                  </span>
                ) : (
                  "Giriş Yap"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default LogIn;
