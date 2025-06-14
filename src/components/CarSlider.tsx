"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarSliderProps {
  images: string[];
}

export default function CarSlider({ images }: CarSliderProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      className="rounded-xl shadow-xl"
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <div className="relative w-full h-[400px] md:h-[500px]">
            <Image
              src={img}
              alt={`Фото ${idx + 1}`}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
