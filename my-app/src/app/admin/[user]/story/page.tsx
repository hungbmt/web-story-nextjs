"use client";
import React, { useCallback, useEffect, useState } from "react";
import "./story.css";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { v4 as uuidv4 } from "uuid";
import {
  apiChapterStory,
  apiCreateChapter,
  apiCreateContent,
  apidataUpdata,
  apiDeleteContent,
  apiListProductAdmin,
  apiUpdataChapter,
  apiUpdateGim,
} from "@/lib/apiRequest/api";
import TableProductAdmin from "@/app/component/tableProducAdmin/tableProductAdmin";
import FormCreateStory from "@/app/component/createComponent/formCreateStory/FormCreateStory";
import ListChapter from "@/app/component/createComponent/listChapter/ListChapter";
import FormAddChapter from "@/app/component/createComponent/FormAddChapter/FormAddChapter";
import AdminLayout from "@/app/layout/adminLayout/adminLayout";
import { LoginSuccess } from "@/lib/features/auth/login/loginSlider";
import { createAxios } from "@/Helper/CreateInterceptors";
interface DataDomType {
  id: string;
  [key: string]: any;
}
const Story = () => {
  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [showInfoChapter, setShowingChapter] = useState<boolean>(false);
  const [showFormAddChapter, setShowFormAddChapter] = useState<boolean>(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [showFormChapter, setShowFormChapter] = useState<boolean>(false);
  const [dataDescription, setDataDescription] = React.useState("");
  const id = uuidv4();
  const [page, setPage] = useState(1); // Quản lý số trang

  const stateListProduct = useAppSelector(
    (state) => state.listProductAdminReducer
  );
  const stateUpdateChapter = useAppSelector(
    (state) => state.createContentReducer
  );
  // const dataUpdateChaoter = stateUpdateChapter.data;
  const slugStory: any = stateUpdateChapter.data?.slug;
  const nameForm = "create story";
  const dataStory = stateListProduct.data.data;
  const dispatch = useAppDispatch();
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const user = useAppSelector((state) => state.loginReducer.data);
  const [subpage, setSubpage] = useState<string>("");
  const [chapter, setChapter] = useState<string>("");
  const [loadingChapter, setLoadingChapter] = useState<boolean>(false);
  const [textContent, setTextContent] = useState("");
  const accessToken = user.AccessToken;

  const stateDataUpdata = useAppSelector((state) => state.dataUpdataReducer);
  const dataChapter = stateDataUpdata.data?.chapter;
  const totalPage = stateDataUpdata.data?.totalPage;
  const currentPage = stateDataUpdata.data?.currentPage;

  // refeshtoken
  const CreateApiRf = createAxios(user, dispatch, LoginSuccess);
  const StatGetChapterStory = useAppSelector(
    (state) => state.chapterStoryReducer
  );
  const dataChapterStory = StatGetChapterStory.data.data;
  const apiLisProductAdmin = useCallback(async () => {
    setLoadingProduct(true);
    await apiListProductAdmin(dispatch, accessToken, CreateApiRf);
    setLoadingProduct(false);
  }, [dispatch, accessToken, CreateApiRf]);

  useEffect(() => {
    apiLisProductAdmin().then();
  }, []);

  const HandleClickGim = async (id: Number, slug: String, checked: Number) => {
    const data = {
      gim: checked,
    };
    await apiUpdateGim(dispatch, id, slug, data, accessToken, CreateApiRf);
  };
  const HandleShowformcreate = () => {
    setShowFormCreate(!showFormCreate);
  };
  const HandleCloseFormCreate = () => {
    setShowFormCreate(false);
    setShowingChapter(false);
    setShowFormAddChapter(false);
    setPage(1);
  };
  const getDataUpdata = useCallback(async () => {
    if (slugStory) {
      await apidataUpdata(dispatch, slugStory, page); // Chờ đợi dữ liệu từ API
    }
  }, [dispatch, page, slugStory]);

  // handle submit story
  const HandleSubmitCreateStory = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lấy dữ liệu từ FormData
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    data.description = dataDescription;
    if (data.genres && typeof data.genres === "string") {
      const genresArray = data.genres
        .split(",") // Tách chuỗi bằng dấu phẩy
        .map((genre: string) => ({ genres: genre.trim() })); // Tạo mảng đối tượng và loại bỏ khoảng trắng thừa
      data.genres = JSON.stringify(genresArray); // Chuyển đổi mảng đối tượng thành chuỗi JSON
    }
    try {
      // Gửi dữ liệu lên API
      await apiCreateContent(dispatch, data, accessToken, CreateApiRf);
      // Gọi lại API để lấy dữ liệu mới và cập nhật vào state
      await apiLisProductAdmin();
      await getDataUpdata();
      console.log("subpage");
    } catch (error) {
      console.log(error);
    }
  };

  // HandleSubmitAddChapter
  const HandleSubmitAddChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (slugStory) {
      setShowFormAddChapter(true);
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      data.content = textContent;
      try {
        await apiCreateChapter(
          dispatch,
          slugStory,
          data,
          accessToken,
          CreateApiRf
        ).then();
        await getDataUpdata();
        setShowFormAddChapter(false);
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  const HandleShowFormUpDataChapter = useCallback(
    async (slug: string, slug_1: string) => {
      setShowFormChapter(true);
      setSubpage(slug);
      setChapter(slug_1);
      setLoadingChapter(true); // Set loading to true before the API call
      await apiChapterStory(dispatch, slug, slug_1);
      setLoadingChapter(false); // Set loading to false after the API call
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoadingChapter(true);
      if (subpage && chapter) {
        await HandleShowFormUpDataChapter(subpage, chapter); // Wait for the API call
      }
      setLoadingChapter(false); // Only set to false after the call is complete
    };

    fetchData(); // Call the function
  }, [subpage, chapter, HandleShowFormUpDataChapter]);

  // show list chapter
  const HandleAddChapter: () => void = (): void => {
    if (!loadingProduct) {
      setShowingChapter(!showInfoChapter);
    }
  };
  // show form chapter
  const HandleshowFormAddChapter: () => void = () => {
    setShowFormAddChapter(!showFormAddChapter);
  };
  // handle delete content
  const HandleDelete = async (title: string) => {
    let data: { title: string } = {
      title: title,
    };
    try {
      await delay(1000);
      await apiDeleteContent(dispatch, data);
      await apiLisProductAdmin();
      toast("delete success");
    } catch (error) {
      console.log(error);
      toast("error sever");
    }
  };
  const HandleCloseFormAddChapter = () => {
    setShowFormAddChapter(false);
  };

  // hanle Close form chapter
  const HandleCloseFormChapter = () => {
    setShowFormChapter(false);
  };

  // handle submit updata chapter
  const HandleSubmitupdataChapter = async (
    event: React.FormEvent,
    subpage: string,
    chapter: string
  ) => {
    event.preventDefault();
    // Extract and structure form data
    const formData = new FormData(event.target as HTMLFormElement);
    const formEntries = Object.fromEntries(formData.entries());
    const requestData = { ...formEntries, content: textContent };

    // Proceed if both slugs are provided
    if (!subpage || !chapter) {
      console.error("Missing required slugs for chapter update.");
      return;
    }
    try {
      // Update chapter and refresh error list if successful
      await apiUpdataChapter(
        dispatch,
        requestData,
        subpage,
        chapter,
        accessToken,
        CreateApiRf
      );
      await getDataUpdata();
      setShowFormChapter(false);
    } catch (error) {
      console.error("Error updating chapter:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="list-story">
        <div className="title-joint">
          <span>List story</span>
        </div>
        <ToastContainer />
        <div className="create-story-box">
          <button className="btn-story" onClick={HandleShowformcreate}>
            add story
          </button>
        </div>
        <TableProductAdmin
          dataStory={dataStory}
          HandleClickGim={HandleClickGim}
          HandleDelete={HandleDelete}
          HandleCloseFormAddChapter={HandleCloseFormAddChapter}
          loadingProduct={loadingProduct}
          accesstoken={accessToken}
          CreateApiRf={CreateApiRf}
          setDataDescription={setDataDescription}
          dataDescription={dataDescription}
        />
      </div>
      {showFormCreate && (
        <div className="story-Action">
          <FormCreateStory
            nameForm={nameForm}
            HandleSubmitCreateStory={HandleSubmitCreateStory}
            HandleCloseFormCreate={HandleCloseFormCreate}
            HandleAddChapter={HandleAddChapter}
            data={""}
            setDataDescription={setDataDescription}
          />
          {showInfoChapter && (
            <ListChapter
              HandleCloseFormCreate={HandleCloseFormCreate}
              HandleshowFormAddChapter={HandleshowFormAddChapter}
              dataChapter={dataChapter}
              refDataChapter={Number}
              setPage={setPage}
              totalPage={Number(totalPage)}
              page={Number(page)}
              currentPage={Number(currentPage)}
              HandleShowFormUpDataChapter={HandleShowFormUpDataChapter}
            />
          )}
          {showFormAddChapter && (
            <FormAddChapter
              HandleSubmitAddChapter={HandleSubmitAddChapter}
              HandleCloseFormAddChapter={HandleCloseFormAddChapter}
              dataChapterStory={""}
              setTextContent={setTextContent}
            />
          )}
          {showFormChapter &&
            (loadingChapter ? (
              <p>Loading...</p>
            ) : (
              <FormAddChapter
                HandleSubmitAddChapter={HandleSubmitupdataChapter}
                HandleCloseFormAddChapter={HandleCloseFormChapter}
                dataChapterStory={dataChapterStory}
                setTextContent={setTextContent}
              />
            ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default Story;
