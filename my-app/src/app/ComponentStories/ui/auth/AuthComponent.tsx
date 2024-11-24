import Link from "next/link";
import InputText from "../input/InputText";
import Button from "../button/Button";
import "./../../../globals.css";
import "./auth.css";
import { useState } from "react";
import { SubmitIcon } from "../icon/icon";
import { Submit } from "../button/Button.stories";

interface authstype {
  HandleSubmitAuth: (e: React.FormEvent) => void;
  HandleSubmitRegister: (e: React.FormEvent) => void;
}
const Auth: React.FC<authstype> = ({
  HandleSubmitAuth,
  HandleSubmitRegister,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const HandleClickRegister = () => {
    setShowForm(true);
  };
  const HandleClickLogin = () => {
    setShowForm(false);
  };
  return (
    <div className="auth-wraper">
      <div className="auth-box">
        <div className="form-login" style={{ left: showForm ? "450px" : "0" }}>
          <div className="title-joint" style={{ margin: "20px 0" }}>
            <span>Login</span>
          </div>
          <div className="btn-aut">
            <Button
              label={"Đăng ký"}
              icon={""}
              colorspan="#ebdbdb"
              onClick={HandleClickRegister}
            />
            <Button
              label={"Đăng Nhập"}
              icon={""}
              colorspan="#ebdbdb"
              onClick={HandleClickLogin}
            />
          </div>
          <form className="Form-auth" onSubmit={HandleSubmitAuth}>
            <InputText
              placeholder={"usename"}
              name={"usename"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-user"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                  <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                </svg>
              }
            />
            <InputText
              placeholder={"password"}
              name={"password"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-key"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14.52 2c1.029 0 2.015 .409 2.742 1.136l3.602 3.602a3.877 3.877 0 0 1 0 5.483l-2.643 2.643a3.88 3.88 0 0 1 -4.941 .452l-.105 -.078l-5.882 5.883a3 3 0 0 1 -1.68 .843l-.22 .027l-.221 .009h-1.172c-1.014 0 -1.867 -.759 -1.991 -1.823l-.009 -.177v-1.172c0 -.704 .248 -1.386 .73 -1.96l.149 -.161l.414 -.414a1 1 0 0 1 .707 -.293h1v-1a1 1 0 0 1 .883 -.993l.117 -.007h1v-1a1 1 0 0 1 .206 -.608l.087 -.1l1.468 -1.469l-.076 -.103a3.9 3.9 0 0 1 -.678 -1.963l-.007 -.236c0 -1.029 .409 -2.015 1.136 -2.742l2.643 -2.643a3.88 3.88 0 0 1 2.741 -1.136m.495 5h-.02a2 2 0 1 0 0 4h.02a2 2 0 1 0 0 -4" />
                </svg>
              }
            />
            <Link href={"/"} className="text-auth">
              quên mật khẩu?
            </Link>
            <div className="btn-form-auth" style={{ margin: "0 auto" }}>
              <Button
                colorspan="#ebdbdb"
                icon={""}
                label="Submit"
                onClick={() => {}}
                size="medium"
              />
            </div>
          </form>
        </div>
        {/* register */}
        <div
          className="form-register"
          style={{ right: showForm ? "0" : "450px" }}
        >
          <div className="title-joint" style={{ margin: "20px 0" }}>
            <span>register</span>
          </div>
          <div className="btn-aut">
            <Button
              icon={""}
              colorspan="#ebdbdb"
              label={"Đăng ký"}
              onClick={HandleClickRegister}
            />
            <Button
              icon={""}
              colorspan="#ebdbdb"
              label={"Đăng Nhập"}
              onClick={HandleClickLogin}
            />
          </div>
          <form className="Form-auth" onSubmit={HandleSubmitRegister}>
            <InputText
              placeholder={"email"}
              name={"email"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-mail"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z" />
                  <path d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z" />
                </svg>
              }
            />
            <InputText
              placeholder={"username"}
              name={"username"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-user"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                  <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                </svg>
              }
            />
            <InputText
              placeholder={"password"}
              name={"password"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-key"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14.52 2c1.029 0 2.015 .409 2.742 1.136l3.602 3.602a3.877 3.877 0 0 1 0 5.483l-2.643 2.643a3.88 3.88 0 0 1 -4.941 .452l-.105 -.078l-5.882 5.883a3 3 0 0 1 -1.68 .843l-.22 .027l-.221 .009h-1.172c-1.014 0 -1.867 -.759 -1.991 -1.823l-.009 -.177v-1.172c0 -.704 .248 -1.386 .73 -1.96l.149 -.161l.414 -.414a1 1 0 0 1 .707 -.293h1v-1a1 1 0 0 1 .883 -.993l.117 -.007h1v-1a1 1 0 0 1 .206 -.608l.087 -.1l1.468 -1.469l-.076 -.103a3.9 3.9 0 0 1 -.678 -1.963l-.007 -.236c0 -1.029 .409 -2.015 1.136 -2.742l2.643 -2.643a3.88 3.88 0 0 1 2.741 -1.136m.495 5h-.02a2 2 0 1 0 0 4h.02a2 2 0 1 0 0 -4" />
                </svg>
              }
            />

            <div className="btn-form-auth" style={{ margin: "0 auto" }}>
              <Button
                label={"submit"}
                icon={<SubmitIcon />}
                colorspan={"black"}
                backgroundColor={Submit.args?.backgroundColor}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
