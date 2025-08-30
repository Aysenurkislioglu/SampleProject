import "./ApplicationForm.scss";
import { useState } from "react";

import { FaRegFileAlt } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { FaRegCheckCircle } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { SiHackthebox } from "react-icons/si";
import { HiLightningBolt } from "react-icons/hi";

import { BiSolidLockAlt } from "react-icons/bi";
import { MdPermIdentity } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi2";
import { TbPhone } from "react-icons/tb";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { IoCardOutline } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import { BiSolidFastForwardCircle } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";


function ApplicationForm() {

    //Progress Part
    const [formData, setFormData] = useState({
        ad: "",
        soyad: "",
        tc: "",
        telefon: "",
        email: "",
        gelir: "",
        kart: "",
        kvkk: false,
    });

    const filledCount = Object.values(formData).filter(
        (v) => v !== "" && v !== false
    ).length

    const totalFields = Object.keys(formData).length;
    const progress = (filledCount / totalFields) * 100;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData ({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    //Application Message Part
    const [isLoading, setIsLoading] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false)
            setShowMessage(true)
        }, 2000);
    }


    return(
        <div className="applicationForm" id="applicationForm">

            <div className="title-container">
                <div className="title-icon-box"><FaRegFileAlt /></div>
                <h1>Kredi Kartı Başvurusu</h1>
                <p>Hemen başvurun, anında onay alın! Kredi kartınız 3 iş günü içinde elinizde olsun.</p>
                <ul>
                    <li><TbPointFilled className="li-icon"/>SSL Güvenli</li>
                    <li><TbPointFilled className="li-icon"/>256-bit Şifreleme</li>
                    <li><TbPointFilled className="li-icon"/>KVKK Uyumlu</li>
                </ul>   
            </div>

            <div className="main-containers">

                <div className='left-container'>

                    <div className='title'>
                        <div className='icon'><HiOutlineLightningBolt /></div>
                        <h3>Hızlı Başvuru</h3>
                        <p>Sadece 3 dakikada tamamlayın</p>
                    </div>

                    <div className='card-box'>

                        <div className='card'>
                            <div className='icon-box'><FaRegCheckCircle strokeWidth={0.70}/></div>
                            <div className='text'>
                                <h5>Anında Onay</h5>
                                <p>Başvurunuz 5 dakika içinde değerlendirilir</p>
                                <p>%98 Onay Oranı</p>
                            </div>
                        </div>

                        <div className='card'>
                            <div className='icon-box'><BsTelephone strokeWidth={0.80} /></div>
                            <div className='text'>
                                <h5>7/24 Destek</h5>
                                <p>444 0 PREMIUM numaralı hattımız</p>
                                <p>Ücretsiz Arama</p>
                            </div>
                        </div>

                        <div className='card'>
                            <div className='icon-box'><SiHackthebox strokeWidth={0.70}/></div>
                            <div className='text'>
                                <h5>Ücretsiz Kargo</h5>
                                <p>Kartınız 3 iş günü içinde adresinizde</p>
                                <p>Güvenli Teslimat</p>
                            </div>
                        </div>
                    </div>

                    <div className='special-box'>
                        <div className='icon-box'><HiLightningBolt /></div>
                        <div className='text'>
                            <h6>Özel Kampanya!</h6>
                            <p>İlk yıl yıllık aidat ücretsiz</p>
                        </div>
                    </div>
            
                </div>

                

                <div className='right-container'>

                    <div className="app-title">
                        <div className="header">
                            <h1>Başvuru Formu</h1>
                            <label htmlFor="secure">
                                <span className="lock-icon"><BiSolidLockAlt />Güvenli Form</span>
                            </label>
                        </div>
                        
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${progress}%` }} ></div>
                        </div>    
                    </div>

                    <form className="forms">

                        <div className="row1">
                            <div className="form">
                                <label htmlFor="firstname">
                                    <span className="icon"><MdPermIdentity />Ad</span>
                                </label>
                                <input id="firstname" name="ad" type="text" value={formData.ad} onChange={handleChange} placeholder="Adınızı giriniz" />
                            </div>
                            <div className="form">
                                <label htmlFor="lastname">
                                    <span className="icon"><MdPermIdentity />Soyad</span>
                                </label>
                                <input id="lastname" name="soyad" type="text" value={formData.soyad} onChange={handleChange} placeholder="Soyadınızı giriniz" />
                            </div>
                        </div>

                        <div className="row2">
                            <div className="form">
                                <label htmlFor="id-no">
                                    <span className="icon"><HiOutlineIdentification />TC Kimlik No</span>
                                </label>
                                <input id="id-no" name="tc" inputMode="numeric" value={formData.tc} onChange={handleChange} placeholder="12345678901" />
                            </div>
                            <div className="form">
                                <label htmlFor="ph-no">
                                    <span className="icon"><TbPhone />Telefon</span>
                                </label>
                                <input id="ph-no" name="telefon" type="tel" inputMode="tel" value={formData.telefon} onChange={handleChange} placeholder="0555 123 45 67" />
                            </div>
                        </div>

                        <div className="row3">
                            <div className="form">
                                <label htmlFor="email">
                                    <span className="icon"><MdOutlineAlternateEmail />E-posta Adresi</span>
                                </label>
                                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ornek@email.com" />
                            </div>
                        </div>

                        <div className="row4">
                            <div className="form">
                                <label htmlFor="income">
                                    <span className="icon"><GiReceiveMoney />Aylık Gelir</span>
                                </label>
                                <select name="gelir" id="income" value={formData.gelir} onChange={handleChange} defaultValue="" >
                                    <option value="" disabled>Gelir aralığınızı seçiniz</option>
                                    <option>5.000 - 10.000 TL</option>
                                    <option>10.000 - 20.000 TL</option>
                                    <option>20.000 - 50.000 TL</option>
                                    <option>50.000 TL ve üzeri</option>
                                </select>
                            </div>

                            <div className="form">
                                <label htmlFor="card-type">
                                    <span className="icon"><IoCardOutline />Kart Türü</span>
                                </label>
                                <select name="kart" id="card-type" value={formData.kart} onChange={handleChange} defaultValue="">
                                    <option value="" disabled>Kart türünüzü seçiniz</option>
                                    <option>Classic Kart</option>
                                    <option>Gold Kart</option>
                                    <option>Platinum Kart</option>
                                </select>
                            </div>
                        </div>

                        <div className="last-row">
                            <label htmlFor="checkbox">
                                <input id="kvkk" name="kvkk" type="checkbox" checked={formData.kvkk} onChange={handleChange} />
                                <span><span className="underline">Kişisel Verilerin Korunması Kanunu</span> kapsamında kişisel verilerimin işlenmesini, <span className="underline">Açık Rıza Metni</span>'ni okuduğumu ve kabul ettiğimi beyan ederim.</span>
                            </label>
                        </div>

                        <div className="button">
                            <button type="submit" className="btn" onClick={handleSubmit} disabled={isLoading} > {isLoading ? (
                                <>
                                <ImSpinner2 className="spin" /> İşleniyor...
                                </>
                            ) : ( 
                                <>
                                <FaRegCheckCircle />Başvuruyu Gönder
                                </>
                            )} 
                            </button>
                        </div>
                        
                        <div className="last-icons">
                            <label htmlFor="icon">
                                <span><BiSolidLockAlt />SSL Korumalı</span>
                            </label>
                            <label htmlFor="icon">
                                <span><MdSecurity />Güvenilir</span>
                            </label>
                            <label htmlFor="icon">
                                <span><BiSolidFastForwardCircle />Hızlı İşlem</span>
                            </label>
                        </div>


                        {showMessage && (
                        <div className="success-box">
                            <div className="success">
                                <div className="icon"><FaRegCheckCircle /></div>
                                <div className="text">
                                    <h3>Başvurunuz Alındı! 🎉</h3>
                                    <p><span>Demo: </span>Kredi kartı başvurunuz başarıyla alındı. 5 dk içinde onay durumunuzu SMS ile bildireceğiz.</p>
                                    <p>Başvuru No: PB-2024-BM8AWBRJ6</p>
                                </div>
                            </div>
                        </div>
                        )}

                    </form>

                </div>

            </div>

        </div>
    );
}

export default ApplicationForm;