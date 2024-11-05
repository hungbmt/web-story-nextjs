"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "./GimStory.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, History } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { typeGethome } from "@/type/story.type";
import TimeAgo from "react-timeago";
// Custom formatter cho tiếng Việt
const formatter = (value: number, unit: string, suffix: string) => {
  let timeUnit;
  switch (unit) {
    case "second":
      timeUnit = "giây";
      break;
    case "minute":
      timeUnit = "phút";
      break;
    case "hour":
      timeUnit = "giờ";
      break;
    case "day":
      timeUnit = "ngày";
      break;
    case "week":
      timeUnit = "tuần";
      break;
    case "month":
      timeUnit = "tháng";
      break;
    case "year":
      timeUnit = "năm";
      break;
    default:
      timeUnit = unit;
  }

  return `${value} ${timeUnit} ${suffix === "ago" ? "trước" : "sau"}`;
};

interface typeGimStory {
  dataNew: typeGethome[];
}

const GimStory: React.FC<typeGimStory> = ({ dataNew }) => {
  const date = new Date();
  const localhost = "http://localhost:3000/";
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
          993: {
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
        {dataNew.map((dataGim, index) => (
          <SwiperSlide className="recommended-story-slide" key={index}>
            <Link
              href={`/book/${dataGim.slug}`}
              className="recommended-story-box "
            >
              <div className="recommended-story-info">
                <span className="recommended-story-status">
                  {dataGim?.statusStory === "Full" || "full"
                    ? "Truyện Hoàn Thành"
                    : "Đang Cập Nhật"}
                </span>
                <h4>{dataGim?.title}</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: dataGim?.description }}
                ></p>

                <span className="recommended-story-chapter">
                  Chapter {dataGim?.totalChapters}
                </span>

                <span>
                  <TimeAgo
                    className="recommended-story-time"
                    date={dataGim.time}
                    formatter={formatter}
                  />
                </span>
              </div>
              <div className="recommended-story-img">
                <Image
                  src={localhost + dataGim?.imgStory} // Path from the public directory
                  width={500}
                  height={500}
                  alt="Fallback image"
                  onError={(e) =>
                    (e.currentTarget.srcset = "/img/bannerStory.png")
                  }
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-recommended-next">
        <i className="fa-solid fa-caret-right"></i>
      </div>
      <div className="custom-recommended-prev">
        <i className="fa-solid fa-caret-left"></i>
      </div>
    </section>
  );
};

export default GimStory;
