import React from "react";
import "./inputText.css";
interface inputype {
  placeholder: string;
  name: string;
  icon: React.ReactNode;
}

const InputText: React.FC<inputype> = ({ placeholder, name, icon }) => {
  return (
    <div className="input-box">
      {icon}
      <input type="text" placeholder={placeholder} name={name} />
    </div>
  );
};

export default InputText;
