"use client";

import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import "./form-create.css";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import FormCreateMenu from "@/app/component/formCreatemenu/formCreateMenu";
import { apiCreateCategory, apiGetCategory } from "@/lib/apiRequest/api";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import CategoryLayout from "@/app/layout/categoryformLayout/categoryLayout";
import { LoginSuccess } from "@/lib/features/auth/login/loginSlider";
import axios from "axios";
import { createAxios } from "@/Helper/CreateInterceptors";

interface dataCate {
  id: string;
  category: string;
}

const CreateCategory = () => {
  const id = uuidv4();
  const stateCategort = useAppSelector((state) => state.getCategoryReducer);
  const stateAuth = useAppSelector((state) => state.loginReducer);
  const accessToken = stateAuth.data.AccessToken;
  const user = stateAuth.data;
  const dataCategorys = stateCategort.data.data;
  const dispatch = useAppDispatch();
  const [dataCategory, setDataCategory] = useState<dataCate[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const CreateApiRf = createAxios(user, dispatch, LoginSuccess);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCategoryCreated, setIsCategoryCreated] = useState(false); // Biến trạng thái mới

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      category: inputValue,
    };

    setLoading(true);

    try {
      await apiCreateCategory(dispatch, data, accessToken, CreateApiRf);
      setDataCategory((prev) => [...prev, { id: id, category: inputValue }]);
      setResponseMessage("Tạo danh mục thành công");
      setInputValue("");
      setIsCategoryCreated(true); // Kích hoạt useEffect
    } catch (error) {
      setResponseMessage("Lỗi khi tạo danh mục");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setInputValue(data);
  };

  useEffect(() => {
    apiGetCategory(dispatch);
    if (isCategoryCreated) {
      apiGetCategory(dispatch);
      setIsCategoryCreated(false); // Đặt lại sau khi lấy danh mục
    }
  }, [isCategoryCreated, accessToken, dispatch]);

  return (
    <CategoryLayout namePagem="category">
      <FormCreateMenu
        HandleSubmit={HandleSubmit}
        inputValue={inputValue}
        handleChange={handleChange}
        data={dataCategory}
        dataDb={dataCategorys}
        loading={loading}
        responseMessage={responseMessage}
      />
    </CategoryLayout>
  );
};

export default CreateCategory;
