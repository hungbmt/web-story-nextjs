"use client";

import { apiChapterStory, apiSendError } from "@/lib/apiRequest/api";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { typechapter } from "@/type/story.type";
import { CreateAxios } from "@/Helper/CreateInterceptors";
import { LoginSuccess } from "@/lib/features/auth/login/loginSlider";
export interface typechapters {
  data: {
    data: typechapter; // This is the array you want to access
  };
  // other properties...
}
const ChapterCp = () => {
  let { chapter, subpage } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/");
  const [showTableErrorRepost, setShowTableErrorRepost] =
    useState<boolean>(false);
  const [textTextarea, setTextTextarea] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const state = useAppSelector((state) => state.chapterStoryReducer);
  const datas = state?.data?.data;
  const stateUser = useAppSelector((state) => state.loginReducer.data);
  const username = stateUser.data.username;
  const accesstoken = stateUser.AccessToken;
  const createApiRf = CreateAxios(stateUser, dispatch, LoginSuccess);

  // Convert subpage to a string if it's an array
  if (Array.isArray(subpage)) {
    subpage = subpage.join("/");
  }
  if (Array.isArray(chapter)) {
    chapter = chapter.join("/");
  }
  useEffect(() => {
    apiChapterStory(dispatch, subpage, chapter, accesstoken).then();
  }, [accesstoken, chapter, dispatch, subpage]);

  const HandleBackPage = () => {
    router.push(
      `/book/${datas.slug}/chuong-${Number(datas.number_chapter - 1) || 1}`
    );
  };
  const HandleNextStory = () => {
    router.push(
      `/book/${datas.slug}/chuong-${Number(datas.number_chapter + 1)}`
    );
  };

  // show table error repost
  const HandleShowTableErrorRepost = () => {
    setShowTableErrorRepost(true);
  };

  // close Table Error repost
  const HandleClose = () => {
    setShowTableErrorRepost(false);
  };

  const creatAxios = CreateAxios(stateUser, dispatch, LoginSuccess);

  const HandleTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setSelectedOption(data);
  };
  const HandleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const data = e.target.value;
    setTextTextarea(data);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      slug_chapter: pathname,
      name_story: datas.title,
      name_chapter: `chương: ${datas?.number_chapter} ${datas?.name_chapter}`,
      username_error_repost: username,
      error_message: selectedOption || textTextarea,
      slug_1: path[2],
      slug_2: path[3],
    };
    apiSendError(dispatch, data, accesstoken, creatAxios).then();
    setShowTableErrorRepost(false);
    setSelectedOption("");
    setTextTextarea("");
  };
  return (
    <div className="page-chapper-wraper">
      {showTableErrorRepost && (
        <div className="live-error-repost">
          <div className="table-error-report">
            <button className="close_form" onClick={HandleClose}>
              x
            </button>
            <div className="title-joint" style={{ marginBottom: 20 }}>
              <span>Error repost</span>
            </div>
            <Form onSubmit={handleSubmit}>
              {["radio"].map((type: any) => (
                <div
                  key={`inline-${type}`}
                  className="mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Form.Check
                    inline
                    label="Lổi thiếu chapter"
                    name="group1"
                    type={type}
                    value={"Lổi thiếu chapter"}
                    id={`inline-${type}-1`}
                    onChange={HandleTextValue}
                  />
                  <Form.Check
                    inline
                    label="Lổi không tìm thấy chapter"
                    name="group1"
                    type={type}
                    value={"Lổi không tìm thấy chapter"}
                    id={`inline-${type}-2`}
                    onChange={HandleTextValue}
                  />
                  <Form.Check
                    inline
                    label="Lổi chapter sắp xếp chapter"
                    name="group1"
                    type={type}
                    value={"Lổi chapter sắp xếp chapter"}
                    id={`inline-${type}-2`}
                    onChange={HandleTextValue}
                  />
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>khác</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={textTextarea}
                      onChange={HandleTextarea}
                      rows={3}
                    />
                  </Form.Group>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              ))}
            </Form>
          </div>
        </div>
      )}

      <Container>
        <Row>
          <div className="chapter-top">
            <div className="title-chapter">
              <h3>{datas?.title}</h3>
            </div>
            <div className="name-chapter">
              <h6>
                chương: {datas?.number_chapter} {datas?.name_chapter}
              </h6>
            </div>
            <div className="btn-chapter-box">
              <button onClick={HandleBackPage}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              {username && (
                <button onClick={HandleShowTableErrorRepost}>
                  <i className="fa-solid fa-bug"></i>
                </button>
              )}
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>

              <button>
                <i className="fa-solid fa-gear"></i>
              </button>
              <button onClick={HandleNextStory}>
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
          <div className="conten-chapter">
            <p dangerouslySetInnerHTML={{ __html: datas?.content }}></p>
          </div>
          <div className="btn-chapter-box">
            <button>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button>
              <i className="fa-solid fa-bug"></i>
            </button>
            <button>
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default ChapterCp;
