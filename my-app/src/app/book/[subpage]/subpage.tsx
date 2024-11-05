"use client";
import {
  apiGetSubpage,
  apiRelatedStory,
  apiViewSubpage,
} from "@/lib/apiRequest/api";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { typeGethome } from "@/type/story.type";
import InfoHolder from "@/app/component/subpageComponent/InfoHolder/InfoHolder";
import Image from "next/image";
import Description from "@/app/component/subpageComponent/Description/Description";
import ListChapter from "@/app/component/subpageComponent/ListChapter/ListChapter";
import Pagination from "@/app/component/Pagination/pagination";
import { headers } from "next/headers";
import RelatedStory from "@/app/component/subpageComponent/RelatedStory/RelatedStory";

const SubpagePage = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [showSearch, isShowSearch] = useState(false);
  const [heightSearch, setHeightHearch] = useState(0);
  const { subpage } = useParams<{ subpage: string }>();
  const [shouldFetch, setShouldFetch] = useState(false);
  const page = Number(searchParams.get("page")) || 1;
  const state = useAppSelector((state) => state.getsubpageReducer);
  const stateRelatedStory = useAppSelector(
    (state) => state.relatedStoryReducer
  );
  // const dataRelatedStory: typeGethome = stateRelatedStory.data.data;

  const dataSub = state.data?.data;
  const genres = state.data?.data?.genres;
  const chapterSub = state.data.chapter;
  const dataTotalChapter = state.data.totalChapter;
  const totalPage = state.data.totalPage;
  const curenPage = state.data.curenPage;
  const rangePage = 3;
  const Hostpage: String = "?page=";
  const [Genres, setGenres] = useState<string[]>([]);
  useEffect(() => {
    if (genres) {
      try {
        const parsedGenres = JSON.parse(genres);
        if (Array.isArray(parsedGenres)) {
          const mapGenres = parsedGenres.map((data: any) => data.genres);
          setGenres(mapGenres);
        }
      } catch (error) {
        console.error("Error parsing genres:", error);
      }
    }
  }, [genres]);
  useEffect(() => {
    apiGetSubpage(dispatch, subpage, page);
  }, [dispatch, subpage, page]);

  // useEffect(() => {
  //   apiRelatedStory(dispatch, Genres);
  // }, [dispatch, Genres]);
  useEffect(() => {
    if (subpage) {
      apiViewSubpage(dispatch, subpage);
    }
  }, [dispatch, subpage]);

  const HandleSearch = () => {
    isShowSearch(!showSearch);
  };
  const localhost = "http://localhost:3000/";
  return (
    <>
      <Container>
        <Row>
          <Col xl={9}>
            <div
              className="title-subpae-shared"
              style={{ marginBottom: "20px" }}
            >
              <h6>Thông Tin Truyện</h6>
            </div>

            <Row>
              <div className="subpage-book-top">
                <Row>
                  <Col xl={4} className="info-holder">
                    <div className="book-info-holder">
                      <div className="book-info-holder-img">
                        <Image
                          src={localhost + dataSub?.imgStory}
                          width={230}
                          height={350}
                          alt={"backGround"}
                          onError={(e) =>
                            (e.currentTarget.srcset = "/img/bannerStory.png")
                          }
                        />
                      </div>
                      <div className="read-action">
                        <button>Đọc từ Đầu</button>
                        <button>Đọc mới nhất</button>
                      </div>
                      <button
                        className=" bookmark"
                        style={{ marginBottom: 20 }}
                      >
                        <i className="fa-solid fa-bookmark"></i> Theo Dõi
                      </button>
                    </div>
                  </Col>
                  <Col xl={8} className="decription-wrapper">
                    <InfoHolder
                      itemSubpage={dataSub}
                      totalChapter={dataTotalChapter}
                    />

                    <Description itemSubpage={dataSub} />
                  </Col>
                </Row>
              </div>
              <div
                className="title-subpae-shared"
                style={{ marginTop: "40px" }}
              >
                <h6>Danh Sách Truyện </h6>
                <button className="btn" onClick={HandleSearch}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>

              <div
                className="search-chapter-subpage"
                style={{ height: heightSearch }}
              ></div>
              <div className="subpage-chapter-box mb-5">
                <ListChapter chapterSub={chapterSub} />
              </div>
              <div
                className="paginarion-wraper text-center"
                style={{ marginBottom: 20 }}
              >
                <Pagination
                  totalPage={Number(totalPage)}
                  currenPage={Number(curenPage)}
                  rangePage={Number(rangePage)}
                  Hostpage={String(Hostpage)}
                />
              </div>
              {/* <CommentComponent /> */}
              {/* <CommentLibrary host={url} /> */}
            </Row>
          </Col>
          <Col xl={3}>
            <div
              className="title-subpae-shared"
              style={{ marginBottom: "20px" }}
            >
              <h6>Truyện Liên Quan</h6>
            </div>

            {/* <RelatedStory
              dataRelatedStory={
                Array.isArray(dataRelatedStory) ? dataRelatedStory : []
              }
            /> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SubpagePage;
