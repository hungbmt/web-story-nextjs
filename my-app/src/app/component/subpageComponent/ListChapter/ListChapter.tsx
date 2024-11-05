import { typechapter } from "@/type/story.type";
import Link from "next/link";
import React from "react";
import { Col, Row } from "react-bootstrap";
import "./ListChapter.css";

interface chapterSub {
  chapterSub: typechapter[];
}

const ListChapter: React.FC<chapterSub> = ({ chapterSub }) => {
  return (
    <>
      <Row>
        {chapterSub
          .slice()
          .sort((a, b) => a.number_chapter - b.number_chapter)
          ?.map((item, inx) => {
            return (
              <Col xl={6} key={inx}>
                <Link
                  className="subpage-chapter"
                  href={`/book/${item.slug}/${item.slug_1}`}
                >
                  <div>
                    {"Chương"} {item.number_chapter}
                    {":"} {item.name_chapter}
                  </div>
                </Link>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default ListChapter;
