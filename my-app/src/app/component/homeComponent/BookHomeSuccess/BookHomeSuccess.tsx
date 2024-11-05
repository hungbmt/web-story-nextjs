"use client";

import { typeGethome } from "@/type/story.type";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import "./BookHomSuccess.css";

interface typeBookSuccess {
  bookcomplete: typeGethome[];
}
const BookHomeSuccess: React.FC<typeBookSuccess> = ({ bookcomplete }) => {
  const localhost = "http://localhost:3000/";

  return (
    <>
      <Row>
        {bookcomplete?.map((item, ix) => {
          return (
            <Col
              className="bookcomplete-mb"
              xxl={2}
              xl={2}
              lg={4}
              md={4}
              sm={6}
              key={ix}
            >
              <Link href={"/book/" + item.slug}>
                <div className="book-complete-box">
                  <Image
                    src={localhost + "/" + item?.imgStory} // Path from the public directory
                    width={500}
                    height={500}
                    alt="Fallback image"
                    onError={(e) =>
                      (e.currentTarget.srcset = "/img/bannerStory.png")
                    }
                  />
                  {item?.statusStory === "Full" ? (
                    <div className="book-tape-wraper">
                      <div className="book-tape tape-bookComplete">
                        {item?.statusStory === "Full" ? "Complete" : ""}
                      </div>
                      <div className="book-tape-one book-tape-one-complete"></div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="name-book-complete">
                    <h5>{item.title}</h5>
                  </div>
                  <div className="chapter-book-complete">
                    <span>chương: {item.totalChapters}</span>
                  </div>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default BookHomeSuccess;
