import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "./SwiperTrue.css";
const SwiperTrue = () => {
  return (
    <div className="mt-3">
      <div className="product-top-day-box">
        <Swiper
          slidesPerView={1} // Default for small screens
          breakpoints={{
            // when window width is >= 480px
            400: {
              slidesPerView: 3,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 3,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 4,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 8,
            },
            // when window width is >= 1280px
            1280: {
              slidesPerView: 8,
            },
            // when window width is >= 1536px
            1536: {
              slidesPerView: 8,
            },
            1836: {
              slidesPerView: 8,
            },
            2000: {
              slidesPerView: 8,
            },
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="book-box">
              <Image
                src="http://localhost:3001/img/bannerStory.png" // Use a valid image path
                width={500}
                height={500}
                alt="Fallback image"
              />
              <div className="loader loading-joint"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="book-box">
              <Image
                src="http://localhost:3001/img/bannerStory.png" // Use a valid image path
                width={500}
                height={500}
                alt="Fallback image"
              />
              <div className="loader loading-joint"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="book-box">
              <Image
                src="http://localhost:3001/img/bannerStory.png" // Use a valid image path
                width={500}
                height={500}
                alt="Fallback image"
              />
              <div className="loader loading-joint"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="book-box">
              <Image
                src="http://localhost:3001/img/bannerStory.png" // Use a valid image path
                width={500}
                height={500}
                alt="Fallback image"
              />
              <div className="loader loading-joint"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="book-box">
              <Image
                src="http://localhost:3001/img/bannerStory.png" // Use a valid image path
                width={500}
                height={500}
                alt="Fallback image"
              />
              <div className="loader loading-joint"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="book-box">
              <Image
                src="http://localhost:3001/img/bannerStory.png" // Use a valid image path
                width={500}
                height={500}
                alt="Fallback image"
              />
              <div className="loader loading-joint"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="book-box">
              <Image
                src="http://localhost:3001/img/bannerStory.png" // Use a valid image path
                width={500}
                height={500}
                alt="Fallback image"
              />
              <div className="loader loading-joint"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="book-box">
              <Image
                src="http://localhost:3001/img/bannerStory.png" // Use a valid image path
                width={500}
                height={500}
                alt="Fallback image"
              />
              <div className="loader loading-joint"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="book-box">
              <Image
                src="http://localhost:3001/img/bannerStory.png" // Use a valid image path
                width={500}
                height={500}
                alt="Fallback image"
              />
              <div className="loader loading-joint"></div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperTrue;
