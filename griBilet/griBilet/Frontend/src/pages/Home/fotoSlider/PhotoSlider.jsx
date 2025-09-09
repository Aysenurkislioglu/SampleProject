import React from 'react'
import {Swiper,SwiperSlide} from "swiper/react"
import {Autoplay , Pagination} from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "./PhotoSlider.scss"

import jj from "../Media/jolly-joker.avif"
import ifper from "../Media/if-performance.avif"
import hk from "../Media/hayal-kahvesi.avif"
import zorlu from "../Media/zorlu-psm.avif"

const images = [
    {src:jj ,label:""},
    {src:ifper ,label:""},
    {src:hk ,label:""},
    {src:zorlu ,label:""}
]
export default function PhotoSlider() {
  return (
    <div className='photoSlider'> 
        <Swiper
            modules={[Autoplay,Pagination]}
            loop
            autoplay={{delay:1500, disableOnInteraction:false}}
            pagination={{clickable:true}}
            spaceBetween={16}
            slidesPerView={1}
        >
        
            {images.map( (e,key) =>(
                <SwiperSlide key={key}>
                    <div className='slide'>
                        <img src={e.src} alt="" />
                        <span className='caption'> {e.label}</span>
                    </div>

                </SwiperSlide>
            ) )}
        </Swiper>
        

    </div>
  )
}
