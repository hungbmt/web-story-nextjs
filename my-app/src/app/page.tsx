"use client";

import { useEffect } from "react";
import { ApigetHome } from "@/lib/apiRequest/api";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { Container } from "react-bootstrap";
import GimStory from "./component/homeComponent/GimStory/GimStory";
import TopStory from "./component/homeComponent/TopStory/TopStory";
import BookHomeUpdate from "./component/homeComponent/BookHomeUpdata/BookHomeUpdata";
import BookHomeSuccess from "./component/homeComponent/BookHomeSuccess/BookHomeSuccess";
import DefaultLayout from "./layout/defaultLayout/DefaulrLayout";
export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    ApigetHome(dispatch);
  }, [dispatch]);
  const state = useAppSelector((state) => state.getHomeReducer);
  const isfetching = state.isfetching;
  const dataNew = state?.data.dataNew;
  const topday = state?.data.topView.viewDay;
  const toptoday = state?.data.topView.viewToday;
  const topMonth = state?.data.topView.viewmoth;
  const topyear = state?.data.topView.viewyear;
  const newBook = state?.data.dataUpdate;
  const dataStorySuccess = state?.data.dataStorySuccess;

  return (
    <DefaultLayout>
      <Container>
        <div className="title-joint">
          <span>truyện đề cử</span>
        </div>
        <GimStory dataNew={dataNew} />

        <div className="title-joint">
          <span>Top truyện</span>
        </div>
        <div className="top-story-box">
          <TopStory
            topday={topday}
            toptoday={toptoday}
            topMonth={topMonth}
            topyear={topyear}
          />
        </div>

        <div className="title-joint">
          <span>Truyện Mới Cập Nhật</span>
        </div>
        <div className="book-home-updata-wrapper">
          <BookHomeUpdate newBook={newBook} />
        </div>

        <div className="title-joint">
          <span>Truyện Hoàn Thành</span>
        </div>
        <div className="book-home-compile-wrapper">
          <BookHomeSuccess bookcomplete={dataStorySuccess} />
        </div>
      </Container>
    </DefaultLayout>
  );
}
