"use client";

import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/app/component/headerComponent/Header"));
const FooterLayout = dynamic(
  () => import("@/app/component/Footer/FooTerLayout")
);
import { useEffect } from "react";
import { apiGetCategory, apigetList } from "@/lib/apiRequest/api";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
export default function DefaulrLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    apiGetCategory(dispatch);
  }, [dispatch]);

  useEffect(() => {
    apigetList(dispatch);
  }, [dispatch]);
  const stateCategory = useAppSelector((state) => state.getCategoryReducer);
  const dataCtegory = stateCategory.data.data;
  const stateList = useAppSelector((state) => state.getListReducer);
  const dataList = stateList.data.data;
  return (
    <div className="web-app-container">
      <header>
        <Header dataCtegory={dataCtegory} dataList={dataList} />
      </header>
      <section>{children}</section>
      <footer>
        <FooterLayout />
      </footer>
    </div>
  );
}
