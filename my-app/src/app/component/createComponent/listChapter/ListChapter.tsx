import { typechapter } from "@/type/story.type";
import React, { useEffect, useState } from "react";
import "./lischapter.css";
import { Col } from "react-bootstrap";
import { apidataUpdata, apiDriveLockStory } from "@/lib/apiRequest/api";
import { useAppDispatch, useAppSelector } from "@/lib/hook";

interface typeDataDom {
  id: string;
  [key: string]: any;
}

interface typeListchapter {
  HandleCloseFormCreate: () => void;
  HandleshowFormAddChapter: () => void;
  dataChapter: typechapter[] | "";
  refDataChapter: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
  page: number;
  currentPage: number;
  HandleShowFormUpDataChapter: (slug: string, slug_1: string) => void;
}

const ListChapter: React.FC<typeListchapter> = ({
  HandleCloseFormCreate,
  HandleshowFormAddChapter,
  dataChapter,
  refDataChapter,
  setPage,
  totalPage,
  page,
  currentPage,
  HandleShowFormUpDataChapter,
}) => {
  const dispatch = useAppDispatch();
  const accesstoken = useAppSelector(
    (state) => state.loginReducer.data.AccessToken
  );
  const isArray = Array.isArray(dataChapter);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChapter, setIsLoadingChapter] = useState(false);
  const [getpage, setGetpage] = useState<number>(page);
  const [isDriveLock, setDriveLock] = useState<{ [key: number]: boolean }>({});
  const [dataChapters, setDataChapters] = useState<typechapter[]>([]);
  useEffect(() => {
    const currentRef = refDataChapter?.current;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = currentRef;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        page < totalPage &&
        !isLoading
      ) {
        setIsLoading(true);
        setTimeout(() => {
          setPage((prevPage) => Math.min(prevPage + 1, totalPage));
        }, 3000);
      }
      if (scrollTop <= 1 && page > 1 && !isLoading) {
        setIsLoading(true);
        setTimeout(() => {
          setPage((prevPage) => Math.max(prevPage - 1, 1));
        }, 3000);
      }
    };

    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [refDataChapter, page, totalPage, setPage, isLoading]);

  useEffect(() => {
    const currentRef = refDataChapter?.current;
    if (currentRef && isLoading) {
      currentRef?.scrollTo({ top: 40, behavior: "smooth" });
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [page, refDataChapter, isLoading]);
  // Mỗi khi page thay đổi, cập nhật getpage để input hiển thị đúng
  useEffect(() => {
    setGetpage(page);
  }, [page]);
  let rangePage = 3;
  let mide = Math.ceil(rangePage / 2);
  let min = Math.max(1, currentPage - mide + 1);
  let max = Math.min(totalPage, min + rangePage - 1);
  let pages = [];
  for (let i = min; i <= max; i++) {
    pages.push(i);
  }

  const HandleKeyLock = async (id: number, slug: string, chapter: string) => {
    if (isArray) {
      const chapterData = dataChapter.find((element) => element.id === id);
      if (chapterData) {
        const newLockStatus = !chapterData.is_locked;
        // Make API call to update lock status on server
        await apiDriveLockStory(
          dispatch,
          slug,
          chapter,
          { is_locked: newLockStatus },
          accesstoken
        );

        setIsLoadingChapter(true);
        await apidataUpdata(dispatch, slug, page);
        setIsLoadingChapter(false);
      }
    }
  };
  return (
    <div className="form-create-story">
      <div className="close-font" onClick={HandleCloseFormCreate}>
        <span>x</span>
      </div>
      <div className="title-joint" style={{ margin: "30px 0" }}>
        <span>Chapter</span>
      </div>
      <button className="add-Chapter" onClick={HandleshowFormAddChapter}>
        +
      </button>

      <div className="list-chapter-updata-box">
        <span className="title-chapter-updata">List Chapter</span>
        <div className="pagination-list-chapter-updata">
          {currentPage > 1 ? (
            <button onClick={(e) => setPage(currentPage - 1)}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          ) : (
            ""
          )}

          <button onClick={(e) => setPage(1)}>
            <i className="fa-solid fa-angles-left"></i> Đầu
          </button>
          {pages.map((pageNum) => {
            return (
              <button
                key={pageNum}
                value={pageNum}
                onClick={(e) => setPage(Number(e.currentTarget.value))}
                className={pageNum === currentPage ? "active" : ""}
              >
                {pageNum}
              </button>
            );
          })}
          <button onClick={(e) => setPage(totalPage)}>
            cuối <i className="fa-solid fa-angles-right"></i>
          </button>
          {currentPage >= totalPage ? (
            ""
          ) : (
            <button onClick={(e) => setPage(currentPage + 1)}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}

          <input
            className="imp"
            value={getpage}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPage(Number(e.target.value))
            }
          />
        </div>
        <div className="list-chapter-update-container" ref={refDataChapter}>
          {isLoadingChapter ? (
            <p>Loading chapters...</p>
          ) : (
            <>
              {isArray ? (
                dataChapter.map((data, inx: number) => (
                  <div className="list-chapter-updata-inf" key={inx}>
                    <Col xl={9} className="list-chapter-updata-right">
                      <span>
                        {data.title} chương {data.number_chapter}
                      </span>
                    </Col>
                    <Col xl={3} className="list-chapter-updata-left">
                      <button
                        className="btn"
                        onClick={() =>
                          HandleShowFormUpDataChapter(data.slug, data.slug_1)
                        }
                      >
                        <i className="fa-solid fa-gear"></i>
                      </button>
                      <button className="btn">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        className="btn"
                        onClick={() =>
                          HandleKeyLock(data.id, data.slug, data.slug_1)
                        }
                      >
                        {data.is_locked ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-lock"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                            <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                            <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-lock-open-2"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                            <path d="M9 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                            <path d="M13 11v-4a4 4 0 1 1 8 0v4" />
                          </svg>
                        )}
                      </button>
                    </Col>
                  </div>
                ))
              ) : (
                <p>No chapters available</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListChapter;
