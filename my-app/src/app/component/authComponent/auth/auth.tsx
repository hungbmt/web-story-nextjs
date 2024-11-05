"use client";
import "./auth.css";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { apiLogin } from "@/lib/apiRequest/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
const AuthComponent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showForm, setShowForm] = useState<boolean>(false);
  const accessToken = useAppSelector(
    (state) => state.loginReducer.data.AccessToken
  );
  // useEffect(() => {
  //   if (accessToken) {
  //     const jwtDecodes: any = jwtDecode(accessToken);
  //     const isExpired = jwtDecodes.exp < Math.floor(Date.now() / 1000);
  //     try {
  //       if (isExpired) {
  //         router.push("/auth");
  //       } else {
  //         router.push("/admin");
  //       }
  //     }catch (error){
  //       router.push("/auth");
  //       console.log(error);
  //     }
  //   }
  // },[accessToken, router]);

  const HandleSubmitAuth = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    await apiLogin(dispatch, data);
  };

  const HandleFormRegister = () => {
    setShowForm(true);
  };
  const HandleFormLogin = () => {
    setShowForm(false);
  };
  return (
    <>
      <div className="auth-wraper">
        <div className="auth-box">
          <div
            className="form-login"
            style={{ left: showForm ? "450px" : "0" }}
          >
            <div className="title-joint" style={{ margin: "20px 0" }}>
              <span>Login</span>
            </div>
            <div className="btn-aut">
              <button style={{ marginRight: 1 }} onClick={HandleFormRegister}>
                Đăng Ký
              </button>
              <button onClick={HandleFormLogin}>Đăng Nhập</button>
            </div>
            <form className="Form-auth" onSubmit={HandleSubmitAuth}>
              <div className="input-box">
                <i className="fa-solid fa-user" style={{ marginRight: 2 }}></i>
                <input type="text" placeholder="Email Address" name="email" />
              </div>
              <div className="input-box">
                <i className="fa-solid fa-lock" style={{ marginRight: 2 }}></i>
                <input type="text" placeholder="Password" name="password" />
              </div>
              <Link href={"/"} className="text-auth">
                quên mật khẩu?
              </Link>
              <div className="btn-form-auth">
                <button>submit</button>
              </div>
            </form>
          </div>
          <div
            className="form-register"
            style={{ right: showForm ? "0" : "450px" }}
          >
            <div className="title-joint" style={{ margin: "20px 0" }}>
              <span>register</span>
            </div>
            <div className="btn-aut">
              <button style={{ marginRight: 1 }} onClick={HandleFormRegister}>
                Đăng Ký
              </button>
              <button onClick={HandleFormLogin}>Đăng Nhập</button>
            </div>
            <form className="Form-auth" onSubmit={HandleSubmitAuth}>
              <div className="input-box">
                <i className="fa-solid fa-user" style={{ marginRight: 2 }}></i>
                <input type="text" placeholder="Email Address" name="email" />
              </div>
              <div className="input-box">
                <i className="fa-solid fa-user" style={{ marginRight: 2 }}></i>
                <input type="text" placeholder="username" name="username" />
              </div>
              <div className="input-box">
                <i className="fa-solid fa-lock" style={{ marginRight: 2 }}></i>
                <input type="text" placeholder="Password" name="password" />
              </div>
              <div className="btn-form-auth">
                <button>submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthComponent;
