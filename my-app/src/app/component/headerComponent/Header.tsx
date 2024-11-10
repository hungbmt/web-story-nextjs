"use client";

import Link from "next/link";
import React, { useState } from "react";
import "./Header.css";
import { Col, Container, Row } from "react-bootstrap";
interface type {
  dataCtegory: any;
}
const Header: React.FC<type> = ({ dataCtegory }) => {
  const [showdirectory, setShowdirectory] = useState(false);
  const [showCategory, setShowcategory] = useState(false);
  const [showNavBarRp, setShowNavBarRp] = useState(false);
  const [showNavBarDirectoryRp, setShowNavBarDirectoryRp] = useState(false);
  // value Search
  const [search, setSearch] = useState("");
  // const navigate = useNavigate();
  // show
  const HandelClickdirectory = () => {
    setShowdirectory(!showdirectory);
  };
  const HandleClikShowCategory = () => {
    setShowcategory(!showCategory);
  };

  const HandleSowNavRp = () => {
    setShowNavBarRp(!showNavBarRp);
  };

  const HandleShowdirectoryRp = () => {
    setShowNavBarDirectoryRp(!showNavBarDirectoryRp);
  };

  // const HandleSearch = () => {
  //   navigate(`/search/?search=${search}`);
  // };
  return (
    <div className="header-wraper">
      <Container>
        <div className="d-flex align-content-center justify-content-between ">
          <Link href={"/"}>
            <h1>HelloAz</h1>
          </Link>
          <div
            className="navbar-nav-header xl={0}"
            style={{ margin: "0 0 2px 100px", width: "100%" }}
          >
            <div className="hearder-left">
              <div className="directory-hearder" onClick={HandelClickdirectory}>
                <i className="fa-solid fa-list"></i>
                <span>Danh Sách</span>
                <i className="fa-solid fa-caret-down"></i>
                {showdirectory && (
                  <>
                    <div className="dropdow-hearder-directory">
                      <ul>
                        <Link href={"/danh-sach/truyen-moi"}>
                          <li>truyện mới</li>
                        </Link>
                      </ul>
                    </div>
                  </>
                )}
              </div>
              <div
                className="hearder-category"
                onClick={HandleClikShowCategory}
              >
                <i className="fa-solid fa-list"></i>
                <span>Thể Loại</span>
                <i className="fa-solid fa-caret-down"></i>
                {showCategory && (
                  <>
                    <div className="hearder-category-dropdow ">
                      <Row>
                        {dataCtegory?.map((data: any, inx: number) => {
                          return (
                            <Col
                              className="list-category-hearder"
                              xl={3}
                              key={data.id}
                            >
                              <Link href={`/the-loai/${data?.slug}`} key={inx}>
                                {data?.category}
                              </Link>
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="hearder-right">
              <div className="header-search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <div className="header-auth">
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
            {/* <div className="search-wraper">
              <input
                type="text"
                placeholder="search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="auth-header ">
              <Link href={"/login"}>
                <span>Login</span>
              </Link>
              <Link href={"/register"} className="ms-2">
                <span>register</span>
              </Link>
            </div> */}
          </div>
          <div
            className="navbarRp"
            style={{ display: "none" }}
            onClick={HandleSowNavRp}
          >
            <i className="fa-solid fa-bars icon"></i>
          </div>
          {showNavBarRp && (
            <>
              <div className="dropdow-rp-wraper">
                <Container>
                  <div
                    className="directory-rp-box"
                    onClick={HandleShowdirectoryRp}
                  >
                    <i className="fa-solid fa-list"></i>
                    <span>Danh Sách</span>
                    <i className="fa-solid fa-caret-down"></i>
                    {showNavBarDirectoryRp && (
                      <>
                        <div className="directory-rp-box-dropdow">
                          <ul>
                            <Link href={""}>
                              <li>truyện hot</li>
                            </Link>
                            <Link href={""}>
                              <li>truyện full</li>
                            </Link>
                            <Link href={"/"}>
                              <li>truyện mới cập nhật</li>
                            </Link>
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="category-rp-box">
                    <i className="fa-solid fa-list"></i>
                    <span>Thể Loại</span>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                  <div>
                    <Link href={"/"}>
                      <span>Login</span>
                    </Link>
                  </div>
                  <div>
                    <Link href={"/"}>
                      <span>Register</span>
                    </Link>
                  </div>
                </Container>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;
