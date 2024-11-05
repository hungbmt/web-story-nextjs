"use client";

import { typeGethome } from "@/type/story.type";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./TopStory.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";

interface typeGimStory {
  topday: typeGethome[];
  toptoday: typeGethome[];
  topMonth: typeGethome[];
  topyear: typeGethome[];
}
const TopStory: React.FC<typeGimStory> = ({
  topday,
  toptoday,
  topMonth,
  topyear,
}) => {
  const swiperRef = useRef<any>(null); // Tạo ref cho Swiper
  const [currentSlideText, setCurrentSlideText] = useState("Top ngày");
  const handleSlideChange = () => {
    const swiper = swiperRef.current.swiper; // Lấy instance của Swiper
    const activeSlide = swiper.slides[swiper.activeIndex]; // Lấy slide hiện tại
    const text =
      activeSlide.querySelector("span")?.innerText || activeSlide.innerText;
    setCurrentSlideText(text);
  };
  const localhost = "http://localhost:3000/";
  return (
    <>
      {" "}
      <section>
        <div className="top-story-top">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            rewind={true}
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            onSlideChange={handleSlideChange} // Thêm sự kiện khi slide thay đổi
            className="mySwiper"
            ref={swiperRef} // Gán ref cho Swiper
          >
            <SwiperSlide>
              <span style={{ marginRight: 8 }}>Top ngày</span>
            </SwiperSlide>
            <SwiperSlide>
              <span style={{ marginRight: 8 }}>Top tuần</span>
            </SwiperSlide>
            <SwiperSlide>
              <span style={{ marginRight: 8 }}>Top tháng</span>
            </SwiperSlide>
            <SwiperSlide>
              <span style={{ marginRight: 8 }}>Top năm</span>
            </SwiperSlide>
          </Swiper>

          <div className="custom-next">
            <i className="fa-solid fa-caret-right"></i>
          </div>
          <div className="custom-prev">
            <i className="fa-solid fa-caret-left"></i>
          </div>
        </div>

        <div className="mt-3">
          {currentSlideText === "Top ngày" && (
            <>
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
                      slidesPerView: 5,
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
                  {topday?.map((dataTopDay, inx) => (
                    <SwiperSlide
                      virtualIndex={inx}
                      key={`${dataTopDay.id} - ${inx}`}
                    >
                      <Link href={`${"/book/" + dataTopDay.slug + "?page=1"}`}>
                        <div className="book-box">
                          {dataTopDay?.statusStory === "Full" ? (
                            <div className="book-tape-wraper">
                              <div className="book-tape">
                                {dataTopDay?.statusStory === "Full"
                                  ? "Complete"
                                  : ""}
                              </div>
                              <div className="book-tape-one"></div>
                            </div>
                          ) : (
                            ""
                          )}

                          <Image
                            src={localhost + dataTopDay.imgStory}
                            width={500}
                            height={500}
                            alt="Picture of the author"
                            onError={(e) =>
                              (e.currentTarget.srcset = "/img/bannerStory.png")
                            }
                          />

                          <div className="title-book">
                            <h4>{dataTopDay.title}</h4>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          )}
          {currentSlideText === "Top tuần" && (
            <>
              <div className="product-top-today-box">
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
                      slidesPerView: 5,
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
                  {toptoday?.map((dataTopToDay, inx) => (
                    <SwiperSlide
                      key={`${dataTopToDay.id} - ${inx}`}
                      virtualIndex={inx}
                    >
                      <Link
                        href={`${"/book/" + dataTopToDay.slug + "?page=1"}`}
                      >
                        <div className="book-box">
                          {dataTopToDay?.statusStory === "Full" ? (
                            <div className="book-tape-wraper">
                              <div className="book-tape">
                                {dataTopToDay?.statusStory === "Full"
                                  ? "Complete"
                                  : ""}
                              </div>
                              <div className="book-tape-one"></div>
                            </div>
                          ) : (
                            ""
                          )}

                          <Image
                            src={localhost + dataTopToDay?.imgStory}
                            width={500}
                            height={500}
                            alt="Picture of the author"
                            onError={(e) =>
                              (e.currentTarget.srcset = "/img/bannerStory.png")
                            }
                          />
                          <div className="title-book">
                            <h4>{dataTopToDay.title}</h4>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          )}
          {currentSlideText === "Top tháng" && (
            <>
              <div className="product-top-month-box">
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
                      slidesPerView: 5,
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
                  {topMonth?.map((dataTopMoth, inx) => (
                    <SwiperSlide
                      key={`${dataTopMoth?.id}-${inx}`}
                      virtualIndex={inx}
                    >
                      <Link href={`${"/book/" + dataTopMoth.slug + "?page=1"}`}>
                        <div className="book-box">
                          {dataTopMoth?.statusStory === "Full" ? (
                            <div className="book-tape-wraper">
                              <div className="book-tape">
                                {dataTopMoth?.statusStory === "Full"
                                  ? "Complete"
                                  : ""}
                              </div>
                              <div className="book-tape-one"></div>
                            </div>
                          ) : (
                            ""
                          )}
                          <Image
                            src={localhost + dataTopMoth.imgStory}
                            width={500}
                            height={500}
                            alt="Picture of the author"
                            onError={(e) =>
                              (e.currentTarget.srcset = "/img/bannerStory.png")
                            }
                          />
                          <div className="title-book">
                            <h4>{dataTopMoth.title}</h4>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          )}
          {currentSlideText === "Top năm" && (
            <>
              <div className="product-top-year-box">
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
                      slidesPerView: 5,
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
                  {topyear?.map((dataTopYear, inx) => (
                    <SwiperSlide
                      key={`${dataTopYear.id} - ${inx}`}
                      virtualIndex={inx}
                    >
                      <Link href={`${"/book/" + dataTopYear.slug + "?page=1"}`}>
                        <div className="book-box">
                          {dataTopYear?.statusStory === "Full" ? (
                            <div className="book-tape-wraper">
                              <div className="book-tape">
                                {dataTopYear?.statusStory === "Full"
                                  ? "Complete"
                                  : ""}
                              </div>
                              <div className="book-tape-one"></div>
                            </div>
                          ) : (
                            ""
                          )}
                          <Image
                            src={localhost + dataTopYear.imgStory}
                            width={500}
                            height={500}
                            alt="Picture of the author"
                            onError={(e) =>
                              (e.currentTarget.srcset = "/img/bannerStory.png")
                            }
                          />
                          <div className="title-book">
                            <h4>{dataTopYear.title}</h4>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default TopStory;
