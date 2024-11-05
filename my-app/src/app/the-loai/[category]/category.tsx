import { typeGethome } from "@/type/story.type";
import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { apiProductCategory } from "@/lib/apiRequest/api";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import ListCategoryComponent from "@/app/component/listCategoryComponent/listCategoryComponent";
export default function CategoryPageConponent() {
  const dispatch = useAppDispatch();
  const params = useParams();
  let pages = useSearchParams().get("page") ?? 1;
  let slug = params.category;
  const state = useAppSelector((state) => state.getProctCategoryReducer);
  const dataCagegory = state.data;
  const name = state.name;
  const totalPage = state.totalPage;
  const currentPage = state.curentPage;
  const totalStory = state.totalStory;
  const rangePage = 3;
  const Hostpage: String = "?page=";
  if (Number(pages) > totalPage) {
    pages = "1";
  }

  useEffect(() => {
    apiProductCategory(dispatch, slug, pages);
  }, [dispatch, slug, pages]);
  return (
    <>
      <ListCategoryComponent
        totalPage={Number(totalPage)}
        currenPage={Number(currentPage)}
        rangePage={Number(rangePage)}
        Hostpage={String(Hostpage)}
        data={dataCagegory}
        name={name}
      />
    </>
  );
}
