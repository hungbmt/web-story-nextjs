import { typeGethome } from "@/type/story.type";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import "./tableProductAdmin.css";
import FormCreateStory from "../createComponent/formCreateStory/FormCreateStory";
import {
  apiChapterStory,
  apiCreateChapter,
  apidataUpdata,
  apiUpdataChapter,
  apiUpdataStory,
} from "@/lib/apiRequest/api";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import ListChapter from "../createComponent/listChapter/ListChapter";
import FormAddChapter from "../createComponent/FormAddChapter/FormAddChapter";
import { v4 as uuidv4 } from "uuid";

interface typeTableAdmin {
  dataStory: typeGethome[];
  HandleClickGim: (id: Number, slug: String, checked: Number) => void;
  HandleDelete: (title: string) => void;
  HandleCloseFormAddChapter: any;
  loadingProduct: any;
  accesstoken: string;
  CreateApiRf: any;
  setDataDescription: any;
  dataDescription: any;
}

interface typedataDom {
  id: string;
  [key: string]: any;
}

const TableProductAdmin: React.FC<typeTableAdmin> = ({
  dataStory,
  HandleClickGim,
  HandleDelete,
  HandleCloseFormAddChapter,
  loadingProduct,
  accesstoken,
  CreateApiRf,
  setDataDescription,
  dataDescription,
}) => {
  const dispatch = useAppDispatch();
  const id = uuidv4();
  const [idSelecter, setIdSelecter] = useState<Set<Number>>(new Set());
  const [selectedActive, setSelectedActive] = useState<boolean>(false);
  const [showFormUpdate, setShowFormUpdate] = useState<boolean>(false);
  const [showLischapter, setShowListChapter] = useState<boolean>(false);
  const [showFormAddChapter, setShowFormAddChapter] = useState<boolean>(false);
  const [showFormChapter, setShowFormChapter] = useState<boolean>(false);

  const [subpage, setSubpage] = useState<string>("");
  const [chapter, setChapter] = useState<string>("");
  const [slugStory, setSlugStory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Thêm trạng thái loading
  const StatGetChapterStory = useAppSelector(
    (state) => state.chapterStoryReducer
  );
  const dataChapterStory = StatGetChapterStory.data.data;
  const nameForm = "updata story";
  const stateDataUpdata = useAppSelector((state) => state.dataUpdataReducer);
  const data = stateDataUpdata.data?.data;
  const dataChapter = stateDataUpdata.data?.chapter;
  const totalPage = stateDataUpdata.data?.totalPage;
  const currentPage = stateDataUpdata.data?.currentPage;
  const [dataDom, setDataDom] = useState<typedataDom[]>([]);
  const [items, setItems] = useState<{ id: number; title: string }[]>([]);
  const [page, setPage] = useState(1); // Quản lý số trang
  const refDataChapter = useRef<HTMLDivElement | null>(null);
  const descriptionDatab = data?.description;
  const [loadingChapter, setLoadingChapter] = useState<boolean>(false);
  const [textContent, setTextContent] = useState("");
  const handleSelectAllCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setSelectedActive(checked);
    if (checked) {
      const ids = new Set(dataStory.map((data) => data.id));
      setIdSelecter(ids);
    } else {
      setIdSelecter(new Set());
    }
  };

  const HandleCheckbookChanger =
    (id: Number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setIdSelecter((prev) => {
        const newSet = new Set(prev);
        if (checked) {
          newSet.add(id); // Thêm id vào Set nếu checked
        } else {
          newSet.delete(id); // Bỏ id khỏi Set nếu unchecked
        }
        return newSet;
      });
    };

  const HadleCheckbookchanger =
    (id: Number, slug: String) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked ? 1 : 0;
      HandleClickGim(id, slug, checked);
    };

  const HandleShowFormUpdata = async (slug: string) => {
    setShowFormUpdate(true); // Hiển thị form update
    setSlugStory(slug);
  };

  const getDataUpdata = useCallback(async () => {
    setLoading(true); // Bắt đầu quá trình loading
    if (slugStory) {
      await apidataUpdata(dispatch, slugStory, page); // Chờ đợi dữ liệu từ API
    }
    setLoading(false); // Kết thúc quá trình loading
  }, [dispatch, page, slugStory]);
  useEffect(() => {
    getDataUpdata();
  }, [getDataUpdata]);

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const HandleAddChapter = () => {
    setShowListChapter(true);
  };
  const HandleCloseFormCreate = () => {
    setShowFormUpdate(false);
    setShowListChapter(false);
    setPage(1);
  };
  const HandleshowFormAddChapter = () => {
    setShowFormAddChapter(!showFormAddChapter);
  };

  const HandleSubmitAddChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (slugStory) {
      setShowFormAddChapter(true);
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      data.content = textContent;
      try {
        setDataDom((prev) => [...prev, { id, ...data }]);
        await apiCreateChapter(
          dispatch,
          slugStory,
          data,
          accesstoken,
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
        accesstoken,
        CreateApiRf
      );
      await getDataUpdata();
      setShowFormChapter(false);
    } catch (error) {
      console.error("Error updating chapter:", error);
    }
  };

  // Handle submit form updata story
  const HandleSubmitUpdataStory = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    data.description = dataDescription || descriptionDatab;
    if (data.genres && typeof data.genres === "string") {
      const genresArray = data.genres
        .split(",") // Tách chuỗi bằng dấu phẩy
        .map((genre: string) => ({ genres: genre.trim() })); // Tạo mảng đối tượng và loại bỏ khoảng trắng thừa
      data.genres = JSON.stringify(genresArray); // Chuyển đổi mảng đối tượng thành chuỗi JSON
    }
    try {
      apiUpdataStory(
        dispatch,
        data,
        slugStory,
        accesstoken,
        CreateApiRf
      ).then();
    } catch (error) {
      console.log(error);
    }
    console.log("abc");
  };
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th className="table-th-joint" scope="col">
              <div className="form-check table-td-joint">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedActive}
                  onChange={handleSelectAllCheckboxChange}
                  id="defaultCheck1"
                />
              </div>
            </th>
            <th className="table-th-joint" scope="col">
              #
            </th>
            <th className="table-th-joint" scope="col">
              name story
            </th>
            <th className="table-th-joint" scope="col">
              gim
            </th>
            <th className="table-th-joint" scope="col">
              active
            </th>
            <th className="table-th-joint" scope="col">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {dataStory?.map((data, inx) => (
            <tr key={inx}>
              <td scope="row">
                <div className="form-check table-td-joint">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={idSelecter.has(data.id)}
                    onChange={HandleCheckbookChanger(data.id)}
                    id="defaultCheck1"
                  />
                </div>
              </td>
              <th scope="row">{inx + 1}</th>
              <td>{data.title}</td>
              <td>
                <div className="form-check form-switch table-td-joint">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                    defaultChecked={data?.gim === 1}
                    onChange={HadleCheckbookchanger(data.id, data.slug)}
                  />
                </div>
              </td>
              <td>
                <div className="form-check form-switch table-td-joint">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                    defaultChecked={data?.isActive === 1}
                  />
                </div>
              </td>
              <td>
                <div className="table-td-joint">
                  <button className="btn">
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button
                    className=" btn"
                    onClick={() => HandleDelete(data.title)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    className="btn"
                    onClick={() => HandleShowFormUpdata(data.slug)}
                  >
                    <i className="fa-solid fa-gear"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showFormUpdate && (
        <div className="story-Action">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <FormCreateStory
              nameForm={nameForm}
              HandleSubmitCreateStory={HandleSubmitUpdataStory}
              HandleCloseFormCreate={HandleCloseFormCreate}
              HandleAddChapter={HandleAddChapter}
              data={data}
              setDataDescription={setDataDescription}
            />
          )}
          {showLischapter && (
            <ListChapter
              HandleCloseFormCreate={HandleCloseFormCreate}
              HandleshowFormAddChapter={HandleshowFormAddChapter}
              dataChapter={dataChapter}
              refDataChapter={refDataChapter}
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
    </>
  );
};

export default TableProductAdmin;
