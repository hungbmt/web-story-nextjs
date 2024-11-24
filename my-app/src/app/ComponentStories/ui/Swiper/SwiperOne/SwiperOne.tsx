import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import Image from "next/image";
import "./SwiperOne.css";
import { Navigation, Pagination, History } from "swiper/modules";

import { LeftIcon } from "../../icon/icon";
import { Placeholder } from "react-bootstrap";

const SwiperOne: React.FC = () => {
  return (
    <section className="recommended-Story-wraper">
      <Swiper
        spaceBetween={18}
        slidesPerView={3}
        pagination={false}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        navigation={{
          nextEl: ".custom-recommended-next",
          prevEl: ".custom-recommended-prev",
        }}
        modules={[Navigation, Pagination, History]}
        className="mySwiper"
      >
        <SwiperSlide className="recommended-story-slide">
          <Link href="/" className="recommended-story-box">
            <div className="recommended-story-info">
              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={11} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={9} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={7} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={2} />
              </Placeholder>
            </div>
            <div className="recommended-story-img">
              <Image
                src="http://localhost:3001/img/bannerStory.png" // Use a valid image path
                width={500}
                height={500}
                alt="Fallback image"
              />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="recommended-story-slide">
          <Link href="/" className="recommended-story-box">
            <div className="recommended-story-info">
              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={11} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={9} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={7} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={2} />
              </Placeholder>
            </div>
            <div className="recommended-story-img">
              <Image
                src="http://localhost:3001/img/bannerStory.png" // Use a valid image path
                width={500}
                height={500}
                alt="Fallback image"
              />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="recommended-story-slide">
          <Link href="/" className="recommended-story-box">
            <div className="recommended-story-info">
              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={11} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={9} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={7} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={2} />
              </Placeholder>
            </div>
            <div className="recommended-story-img">
              <Image
                src="http://localhost:3001/img/bannerStory.png" // Use a valid image path
                width={500}
                height={500}
                alt="Fallback image"
              />
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
      <div className="custom-recommended-next">
        <i className="fa-solid fa-caret-right"></i>
      </div>
      <div className="custom-recommended-prev">
        <i className="fa-solid fa-caret-right"></i>
      </div>
    </section>
  );
};

export default SwiperOne;
