import { typeGethome } from "@/type/story.type";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { json } from "stream/consumers";
import Pagination from "../Pagination/pagination";
interface typeListCategory {
  totalPage: number;
  currenPage: number;
  rangePage: number;
  Hostpage: string;
  name: string;
  data: typeGethome[];
}
const ListCategoryComponent: React.FC<typeListCategory> = ({
  totalPage,
  currenPage,
  rangePage,
  Hostpage,
  data,
  name,
}) => {
  return (
    <>
      <Container>
        <div className="title-joint">
          <span>{name}</span>
        </div>

        <Row>
          {data.map((item, inx) => {
            let ArrayGenres = JSON.parse(item.genres);
            return (
              <Col xl={6} className="mt-3" key={inx}>
                <div className="cart-category-box">
                  <div className="image-Category">
                    <Image
                      src={`http://localhost:3000/${item.imgStory}`}
                      width={100}
                      height={145}
                      alt="Picture of the author"
                    ></Image>
                  </div>
                  <div className="info-category-box">
                    <h3 className="story-title" itemProp="name">
                      {item.title}
                    </h3>
                    <div className="metas">
                      {ArrayGenres.map((data: any, inx: number) => {
                        return (
                          <Link
                            className="info-category-link"
                            href={`/the-loai/${data.slug}`}
                            key={inx}
                          >
                            {data.genres}
                          </Link>
                        );
                      })}
                    </div>
                    <p
                      className="info-category-description"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></p>
                    <span>
                      <span>Trạng thái:</span> {item.statusStory}
                    </span>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        {/* totalPage,currenPage,rangePage,Hostpage, */}
        <div className="pagination-listCatefgory mt-4"></div>
        <Pagination
          totalPage={totalPage}
          currenPage={currenPage}
          rangePage={rangePage}
          Hostpage={Hostpage}
        />
      </Container>
    </>
  );
};

export default ListCategoryComponent;
