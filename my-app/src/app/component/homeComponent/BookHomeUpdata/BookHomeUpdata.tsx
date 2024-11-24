import { typeGethome } from "@/type/story.type";
import Link from "next/link";
import "./BookHomeUpdata.css";
import { Col, Row } from "react-bootstrap";
import TimeAgo from "timeago-react";
import ListProductLoading from "@/app/ComponentStories/ui/list/ListProductLoading";

interface newBooktype {
  newBook: typeGethome[];
}

const BookHomeUpdate: React.FC<newBooktype> = ({ newBook }) => {
  return (
    <>
      {newBook ? (
        newBook?.map((item, inx) => {
          let genresArray = [];
          // const genresArray = item?.genres ? JSON.parse(`${item?.genres}`) : [];
          try {
            genresArray = item?.genres ? JSON.parse(`${item?.genres}`) : [];
            if (!Array.isArray(genresArray)) {
              genresArray = [];
            }
          } catch (error) {
            console.error("Error parsing genres:", error);
            genresArray = [];
          }

          return (
            <div className="new-book-wraper" key={inx}>
              <Col xl={5} lg={5} md={6} sm={6} xs={6}>
                <Link href={`${"/book/" + item.slug + "?page=1"}`}>
                  <div className="title-home-new">
                    <Row>
                      <Col xl={10}>
                        <span className="home-shared">{item.title}</span>
                      </Col>

                      <Col xl={2} className="badge-Story">
                        {item.statusStory === "Full" ? <span>Full</span> : ""}
                      </Col>
                    </Row>
                  </div>
                </Link>
              </Col>
              <Col
                xl={3}
                lg={3}
                className="d-md-none d-sm-none d-none d-lg-block"
              >
                <div className="genre-home-new">
                  {genresArray?.map((data, inx) => (
                    <Link key={inx} href={`/the-loai/${data.slug}`}>
                      <span className="home-shared">{data.genres}, </span>
                    </Link>
                  ))}
                </div>
              </Col>
              <Col xl={2} lg={2} md={3} sm={3} xs={3}>
                <div className="chapter-home-new">
                  <span className="home-shared chapter">
                    Chương: {item?.totalChapters}
                  </span>
                </div>
              </Col>
              <Col xl={2} lg={2} md={3} sm={3} xs={3}>
                <div className="time-home-new">
                  <span className="home-shareds">
                    <TimeAgo datetime={item?.time_update} />
                  </span>
                </div>
              </Col>
            </div>
          );
        })
      ) : (
        <ListProductLoading />
      )}
    </>
  );
};

export default BookHomeUpdate;
