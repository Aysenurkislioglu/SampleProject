import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useFilters from "../hooks/UseFilters";

import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./PhotoSlider.scss";

import jj from "../Media/jolly-joker.avif";
import ifper from "../Media/if-performance.avif";
import hk from "../Media/hayal-kahvesi.avif";
import zorlu from "../Media/zorlu-psm.avif";

const images = [
  { src: jj, label: "istanbul" },
  { src: ifper, label: "ankara" },
  { src: hk, label: "izmir" },
  { src: zorlu, label: "istanbul" },
];

export default function PhotoSlider() {
  const { filters, update, reset } = useFilters();

  function changeCity(e) {
    update({ city: e.label });

    const element = document.getElementById("events");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const callChangeCity = (e) => () => changeCity(e);
  // fonksiyonun yine referansını çağırdık

  return (
    <div className="photoSlider">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1}
      >
        {images.map((e, key) => (
          <SwiperSlide key={key}>
            <div className="slide">
              <img src={e.src} alt="" onClick={callChangeCity(e)} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
