// @flow
"use client";
import * as React from "react";
import { Container } from "react-bootstrap";
import "./storyError.css";
import { useEffect } from "react";
import {
  apiChapterStory,
  apiNotifierError,
  apiUpdataChapter,
} from "@/lib/apiRequest/api";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/hook";
import { createAxios } from "@/Helper/CreateInterceptors";
import { LoginSuccess } from "@/lib/features/auth/login/loginSlider";
import { typeErrorStory } from "@/type/story.type";
import Link from "next/link";
import FormAddChapter from "@/app/component/createComponent/FormAddChapter/FormAddChapter";
const StoryErrorPage = () => {
  const dispatch = useDispatch();
  const [showAction, setShowAction] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [subpage, setSubpage] = React.useState<string>("");
  const [chapter, setChapter] = React.useState<string>("");
  const [textContent, setTextContent] = React.useState<string>("");
  const [showFormModify, setShowFormModify] = React.useState<boolean>(false);
  const stateLogin = useAppSelector((state) => state.loginReducer);
  const accesstoken = stateLogin.data.AccessToken;
  const user = stateLogin.data;
  const CreateApiRf = createAxios(user, dispatch, LoginSuccess);
  const statedError = useAppSelector((state) => state.getErrorReducer);
  const dataError: typeErrorStory[] = statedError.data.data;
  const stateGetErrorStory = useAppSelector(
    (state) => state.chapterStoryReducer
  );
  const dataChapterStory = stateGetErrorStory.data.data;

  const getStoryError = async () => {
    if (!accesstoken || !CreateApiRf) {
      console.warn("Access token or CreateApiRf is missing.");
      return;
    }

    try {
      await apiNotifierError(dispatch, accesstoken, CreateApiRf);
    } catch (err) {
      console.error("Error in apiNotifierError:", err);
    }
  };

  useEffect(() => {
    getStoryError();
  }, [accesstoken, dispatch]);

  const HandleshowAction = (id: string) => {
    setShowAction((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the action visibility for this specific id
    }));
  };

  const HandleShowFormModifyErrorStory = (slug_1: string, slug_2: string) => {
    setShowFormModify(true);
    setSubpage(slug_1);
    setChapter(slug_2);
  };

  const getDataChapter = async () => {
    if (subpage && chapter) {
      apiChapterStory(dispatch, subpage, chapter).then();
    }
  };

  useEffect(() => {
    getDataChapter();
  }, [chapter, dispatch, subpage]);

  // submit modify chapter
  const HandleSubmitupdataChapter = async (
    event: React.FormEvent,
    slug: string,
    subSlug: string
  ) => {
    event.preventDefault();

    // Extract and structure form data
    const formData = new FormData(event.target as HTMLFormElement);
    const formEntries = Object.fromEntries(formData.entries());
    const requestData = { ...formEntries, content: textContent };

    // Proceed if both slugs are provided
    if (!slug || !subSlug) {
      console.error("Missing required slugs for chapter update.");
      return;
    }

    try {
      // Update chapter and refresh error list if successful
      await apiUpdataChapter(
        dispatch,
        requestData,
        slug,
        subSlug,
        accesstoken,
        CreateApiRf
      );
      await getStoryError();
      await getDataChapter();
      setShowFormModify(false);
    } catch (error) {
      console.error("Error updating chapter:", error);
    }
  };

  // close show
  const HandleCloseFormChapter = () => {
    setShowFormModify(false);
  };

  return (
    <div className={"story-error-wrap"}>
      <Container>
        <div className={"title-joint"}>
          <span>Error-Story</span>
        </div>
        <div className={"form-error-story"}>
          <table className="table">
            <thead>
              <tr className={"text-center"}>
                <th scope="col">stt</th>
                <th scope="col" style={{ width: "20%" }}>
                  title
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  Chapter
                </th>
                <th scope="col" style={{ width: "50%" }}>
                  Description
                </th>
                <th scope="col" style={{ width: "5%" }}>
                  status
                </th>
                <th scope="col" style={{ width: "5%" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataError?.map((data: typeErrorStory, inx: number) => (
                <React.Fragment key={inx}>
                  <tr className="spacing-row">
                    <td></td>
                  </tr>
                  <tr className="text-center box-product">
                    <td>{inx + 1}</td>
                    <td>{data.name_story}</td>
                    <td>{data.name_chapter}</td>
                    <td>{data.error_message}</td>
                    <td>
                      <span className="fa fa-check pl-3"></span>
                    </td>
                    <td onClick={() => HandleshowAction(data.id)}>
                      <span className="fa fa-ellipsis-v btn"></span>
                    </td>
                    {showAction[data?.id] && (
                      <div className="action-updata-error">
                        <div>
                          <Link href={data?.slug_chapter}>
                            <div>
                              <i className="fa-solid fa-eye"></i>
                            </div>
                          </Link>
                        </div>
                        <div
                          onClick={() =>
                            HandleShowFormModifyErrorStory(
                              data.slug_1,
                              data.slug_2
                            )
                          }
                        >
                          <i className="fa-solid fa-gear"></i>
                        </div>
                      </div>
                    )}
                  </tr>
                  <tr className="spacing-row">
                    <td></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {showFormModify && (
            <div className="story-Action">
              <FormAddChapter
                HandleSubmitAddChapter={HandleSubmitupdataChapter}
                HandleCloseFormAddChapter={HandleCloseFormChapter}
                dataChapterStory={dataChapterStory}
                setTextContent={setTextContent}
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
export default StoryErrorPage;
