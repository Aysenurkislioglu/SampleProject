import "./dashboard.scss";
import React, { useState, useEffect } from "react";

// Ana Dashboard Bileşeni

const Dashboard = () => {
  //Kullanıcı Verileri İçin State
  /* user: SQL'den çekilen kullanıcı bilgilerini tutar */
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    city: "",
  });

  //Etkinlik Verileri İçin State
  /* events: SQL'den çekilen etkinlikleri tutar */
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Arayüz İçin State
  /* activeTab: Hangi sekmenin aktif olduğunu tutar (upcoming/favorites/past) */
  /* isEditing: Kullanıcının düzenleme modunda olup olmadığını tutar */
  /* formData: Düzenleme formundaki verileri tutar */
  /* cities: Şehir seçeneklerini tutar */
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [cities] = useState([
    "Seçiniz",
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Aksaray",
    "Amasya",
    "Ankara",
    "Antalya",
    "Ardahan",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bartın",
    "Batman",
    "Bayburt",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Düzce",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkari",
    "Hatay",
    "Iğdır",
    "Isparta",
    "İstanbul",
    "İzmir",
    "Kahramanmaraş",
    "Karabük",
    "Karaman",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kilis",
    "Kırıkkale",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Mardin",
    "Mersin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Osmaniye",
    "Rize",
    "Sakarya",
    "Samsun",
    "Şanlıurfa",
    "Siirt",
    "Sinop",
    "Şırnak",
    "Sivas",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Uşak",
    "Van",
    "Yalova",
    "Yozgat",
    "Zonguldak",
  ]);

  //Sayfa Yüklendiğinde Çalışacak Effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        await Promise.all([fetchUserData(), fetchEvents()]);
      } catch (err) {
        setError("Veriler yüklenirken bir hata oluştu");
        console.log("Veri yükleme hatası:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Kullanıcı Verilerini Çekme Fonksiyonu
  const fetchUserData = async () => {
    try {
      // Mock data - API hazır olana kadar
      const mockUser = {
        name: "Ahmet Yılmaz",
        email: "ahmet@example.com",
        gender: "male",
        city: "Ankara",
      };
      setUser(mockUser);
      setFormData(mockUser);

      //API hazır olduğunda GET isteği gönder
      /*const response = await fetch("/api/user");
       if (!response.ok) throw new Error("Kullanıcı verileri alınamadı");
      const userData = await response.json();

      //State'i güncelle
      setUser(userData);
      setFormData(userData); */
    } catch (error) {
      console.log("Kullanıcı verileri alınamadı:", error);
      throw error;
    }
  };

  // Etkinlik Verilerini Çekme Fonksiyonu
  const fetchEvents = async () => {
    try {
      // Mock data - API hazır olana kadar
      const mockEvents = [
        {
          id: 1,
          artist: "Tarkan Konseri",
          price: "250 TL",
          location: "Ankara Arena",
          date: "15.12.2023",
          time: "20:00",
        },
      ];
      setEvents(mockEvents);

      //API hazır olduğunda
      /* const response = await fetch("/api/events");
      if (!response.ok) throw new Error("Etkinlikler alınamadı");
      const eventsData = await response.json();
      setEvents(Array.isArray(eventsData) ? eventsData : []); */
    } catch (error) {
      console.log("Etkinlikler alınamadı:", error);
      setEvents([]);
      throw error;
    }
  };

  // Form Input Değişiklerini Yakalama
  /* Kullanıcı inputlarda değişiklik yaptığında çalışır */
  const handleInputChange = (e) => {
    setFormData({
      ...formData /* mevcut veriyi koru */,
      [e.target.name]: e.target.value /* değişen inputu güncelle */,
    });
  };

  // Kullanıcı Bilgilerini Güncelleme
  /* Form submit edildiğinde çalışır */
  const handleUpdateUser = async (e) => {
    e.preventDefault(); /* formun default submit davranışını engelle */

    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData) /* form verilerini JSON'a çevirir */,
      });

      //Başarılıysa state'i güncelle
      if (response.ok) {
        setUser(formData);
        setIsEditing(false); /* düzenleme modundan çık */
        alert("Profil bilgileriniz güncellendi.");
      }
    } catch (error) {
      console.log("Güncelleme hatası:", error);
    }
  };

  // Bilet İptal Etme Fonksiyonu
  const handleCancelTicket = async (eventId) => {
    try {
      const response = await fetch(`/api/tickets/cancel/${eventId}`, {
        method: "POST",
      });

      //Başarılıysa listeden kaldır
      if (response.ok) {
        setEvents(events.filter((event) => event.id !== eventId));
        alert("Bilet iptal edildi.");
      }
    } catch (error) {
      console.log("İptal hatası:", error);
    }
  };

  // JSX Dönüş Değeri - Ekranda Gösterilecek İçerik

  return (
    <div className="dashboard">
      {/* Başlık ve Sekmeler */}
      <header className="dashboard-header">
        <h2>Hoş Geldin, {user.name} </h2>
        <p>
          Biletlerini yönetebilir, favorilerini görüntüleyebilir ve hesap
          ayarlarını düzenleyebilirsin.
        </p>

        <div className="tabs">
          <button
            className={activeTab === "upcoming" ? "active" : ""}
            onClick={() => setActiveTab("upcoming")}
          >
            Aktif Bilet
          </button>
          <button
            className={activeTab === "favorites" ? "active" : ""}
            onClick={() => setActiveTab("favorites")}
          >
            Favori
          </button>
          <button
            className={activeTab === "past" ? "active" : ""}
            onClick={() => setActiveTab("past")}
          >
            Geçmiş Etkinlik
          </button>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="dashboard-main">
        {loading ? (
          <div className="loading">Yükleniyor...</div>
        ) : error ? (
          <div className="error">(error)</div>
        ) : (
          <>
            <div className="profile-section">
              <h3>Bilgiler</h3>
              <p>Profil bilgilerinizi güncelleyebilirsiniz.</p>

              {!isEditing ? (
                <div className="profile-info">
                  <div className="info-item">
                    <span>Adınız Soyadınız</span>
                    <strong>{user.name}</strong>
                  </div>
                  <div className="info-item">
                    <span>Cinsiyet</span>
                    <strong>
                      {user.gender === "male"
                        ? "Erkek"
                        : user.gender === "female"
                        ? "Kadın"
                        : user.gender === "other"
                        ? "Diğer"
                        : "Seçiniz"}
                    </strong>
                  </div>
                  <div className="info-item">
                    <span>E-Posta Adresiniz</span>
                    <strong>{user.email}</strong>
                  </div>
                  <div className="info-item">
                    <span>Şehir</span>
                    <strong>{user.city || "Seçiniz"}</strong>
                  </div>
                  {/* Düzenleme moduna geç butonu */}
                  <button onClick={() => setIsEditing(true)}>Güncelle</button>
                </div>
              ) : (
                <form className="profile-form" onSubmit={handleUpdateUser}>
                  <div className="form-group">
                    <label>Adınız Soyadınız</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Cinsiyet</label>
                    <select
                      name="gender"
                      value={formData.gender || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">Seçiniz</option>
                      <option value="male">Erkek</option>
                      <option value="female">Kadın</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>E-Posta Adresiniz</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Şehir</label>
                    <select
                      name="city"
                      value={formData.city || ""}
                      onChange={handleInputChange}
                    >
                      {cities.map((city, index) => (
                        <option
                          key={index}
                          value={city === "Seçiniz" ? "" : city}
                        >
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-buttons">
                    <button type="submit">Kaydet</button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                      İptal
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="events-section">
              {/* SEKMELERE GÖRE BAŞLIK DEĞİŞİR */}
              <h3>
                {activeTab === "upcoming" && "Gelecek Etkinlikler"}
                {activeTab === "favorites" && "Favoriler"}
                {activeTab === "past" && "Geçmiş Etkinlikler"}
              </h3>

              {/* AKTİF BİLET SEKMESİ */}
              {activeTab === "upcoming" &&
                (events.length === 0 ? (
                  // ETKİNLİK YOKSA
                  <div className="no-events">
                    <p>Henüz bilet bulunamadı</p>
                    <p>Etkinliklere göz atıp bilet satın alabilirsiniz.</p>
                    <button>Etkinliklere göz at</button>
                  </div>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="event-card">
                      <div className="event-header">
                        <h4>{event.artist}</h4>
                        <span className="event-price">{event.price}</span>
                      </div>
                      <div className="event-location">{event.location}</div>
                      <div className="event-date">
                        <span>{event.date}</span>
                        <span>{event.time}</span>
                      </div>
                      {/* BİLET İPTAL BUTONU */}
                      <button
                        className="cancel-button"
                        onClick={() => handleCancelTicket(event.id)}
                      >
                        İptal Et
                      </button>
                    </div>
                  ))
                ))}
              {/* FAVORİLER SEKMESİ */}
              {activeTab === "favorites" && (
                <div className="no-events">
                  <p>Henüz favori etkinlik bulunamadı</p>
                  <p>Etkinliklere göz atıp favorilere ekleyebilirsiniz.</p>
                  <button>Etkinliklere göz at</button>
                </div>
              )}

              {/* GEÇMİŞ ETKİNLİKLER SEKMESİ */}
              {activeTab === "past" && (
                <div className="no-events">
                  <p>Henüz geçmiş etkinlik bulunamadı</p>
                  <p>Etkinliklere göz atıp bilet satın alabilirsiniz.</p>
                  <button>Etkinliklere göz at</button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
