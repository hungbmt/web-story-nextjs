"use client";

import { useEffect, useRef, useState } from "react";
import "./sideBar.css";
import Link from "next/link";
import Image from "next/image";

const SideBar = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState("200px");
  const [show, setShow] = useState<boolean>(false);
  const myul = useRef<HTMLDivElement>(null);

  const HandleClickOne = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (myul.current) {
      if (show) {
        // Khi hiển thị, đặt height bằng chiều cao thật của div
        setHeight(show ? myul.current.scrollHeight : 0);
      } else {
        // Khi ẩn, đặt height về 0
        setHeight(0);
      }
    }
  }, [show]);
  return (
    <div className="sizebar-wrapper" style={{ width }}>
      <ul>
        <div className="info-user">
          <Image
            src={"/img/avata-default.jpg"}
            alt="backgrount"
            width={50}
            height={50}
          />
          <span className="name-user">hưng nguyễn</span>
        </div>
        <li>
          <Link href={"/admin/create-category/dashboard"}>
            <i className="fa-solid fa-chart-line"></i> Dashboard
          </Link>
        </li>
        <li>truyện</li>
        <li>
          <span onClick={HandleClickOne}>
            <i className="fa-solid fa-list"></i> Quản Lý Truyện
            {show ? <span>&or;</span> : <span>&lt;</span>}
          </span>
        </li>
        <div
          className="story-show"
          style={{
            height: `${height}px`,
            overflow: "hidden",
            transition: "height 0.3s ease",
          }}
          ref={myul}
        >
          <li>
            <Link href={"/admin/hung/story"}>truyện</Link>
          </li>
          <li>
            <span>chapter</span>
          </li>
          <li>
            <Link href={"/admin/hung/story-error"}>truyện lỗi</Link>
          </li>
        </div>
        <li>
          <Link href={"/admin/hung/create-category"}>
            <i className="fa-solid fa-list"></i> phân loại
          </Link>
        </li>
        <li>tùy chỉnh</li>
        <li>
          <Link href={"http://localhost:6006/"}>
            <i className="fa-solid fa-gear"></i> setting
          </Link>
        </li>
        <li>
          <span>
            <i className="fa-solid fa-sitemap"></i> sitemap
          </span>
        </li>
        <li>mở rộng</li>
        <li>
          <Link href={"/admin/hung/craw-story"}>
            <i className="fa-solid fa-spider"></i> tải dữ liệu
          </Link>
        </li>
        <li>
          <span>
            <i className="fa-solid fa-spider"></i> setting update
          </span>
        </li>
        <li>quản trị</li>
        <li>
          <span>
            <i className="fa-solid fa-user-shield"></i> quản lý xác thực
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
