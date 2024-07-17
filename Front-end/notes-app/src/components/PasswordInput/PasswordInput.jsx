import React from "react";
import "./passwordInput.css";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ onChange, value, placeholder }) => {
  const [isShowPass, setIsShowPass] = useState(false);

  return (
    <>
      <input
        type={isShowPass ? "text" : "password"}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        value={value}
        className="inputPass"
      />

      {isShowPass ? (
        <FaRegEye
          size={22}
          className="eye"
          onClick={() => setIsShowPass(!isShowPass)}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="eye-slash"
          onClick={() => setIsShowPass(!isShowPass)}
        />
      )}
    </>
  );
};

export default PasswordInput;
