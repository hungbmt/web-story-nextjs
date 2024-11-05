"use client";

import FormCreateMenu from "@/app/component/formCreatemenu/formCreateMenu";
import Link from "next/link";
import "./create-list.css";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { apiCreateList, apigetList } from "@/lib/apiRequest/api";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import CategoryLayout from "@/app/layout/categoryformLayout/categoryLayout";
import { createAxios } from "@/Helper/CreateInterceptors";
interface tydataList {
  id: string;
  category: string;
}
const CreateList = () => {
  const id = uuidv4();
  const stateList = useAppSelector((state) => state.getListReducer);
  const dataLists = stateList.data.data;
  const dispatch = useAppDispatch();
  const [dataList, setDataList] = useState<tydataList[]>([]);
  const [inputValueList, setInputValueList] = useState<string>("");

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      list: inputValueList,
    };
    apiCreateList(dispatch, data);
    setDataList((prev) => [...prev, { id: id, category: inputValueList }]);
    setInputValueList("");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setInputValueList(data);
  };
  useEffect(() => {
    apigetList(dispatch);
  }, [dispatch]);
  return (
    <>
      <CategoryLayout namePagem="list">
        <FormCreateMenu
          HandleSubmit={HandleSubmit}
          inputValue={inputValueList}
          handleChange={handleChange}
          data={dataList}
          dataDb={dataLists}
        />
      </CategoryLayout>
    </>
  );
};

export default CreateList;
