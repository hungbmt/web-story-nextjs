import { typechapter } from "@/type/story.type";
import React, { useEffect, useState } from "react";
import "./lischapter.css";
import { Col } from "react-bootstrap";

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
  const isArray = Array.isArray(dataChapter);
  const [isLoading, setIsLoading] = useState(false);
  const [getpage, setGetpage] = useState<number>(page);
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
                </Col>
              </div>
            ))
          ) : (
            <p>No chapters available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListChapter;
