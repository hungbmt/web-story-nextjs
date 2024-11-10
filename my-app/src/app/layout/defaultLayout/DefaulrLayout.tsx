"use client";

import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/app/component/headerComponent/Header"), {
  ssr: false,
});
const FooterLayout = dynamic(
  () => import("@/app/component/Footer/FooTerLayout")
);
import { useEffect, useState } from "react";
import { apiGetCategory } from "@/lib/apiRequest/api";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
export default function DefaulrLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  // Đánh dấu rằng component đã tải xong ở phía client
  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  // Chỉ gọi API sau khi component đã tải xong
  useEffect(() => {
    if (isClientLoaded) {
      apiGetCategory(dispatch);
    }
  }, [dispatch, isClientLoaded]);
  const stateCategory = useAppSelector((state) => state.getCategoryReducer);
  const dataCtegory = stateCategory.data.data;
  return (
    <div className="web-app-container">
      <header>
        <Header dataCtegory={dataCtegory} />
      </header>
      <section>{children}</section>
      <footer>
        <FooterLayout />
      </footer>
    </div>
  );
}
