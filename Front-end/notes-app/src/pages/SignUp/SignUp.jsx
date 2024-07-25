import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./signUp.css";
import { useState } from "react";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { validateEmail } from "../../utils/validateEmail";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const SignUpUser = async (Email, FullName, Password) => {
    try {
      const response = await axiosInstance.post(
        "https://notes-app-back-end-mu.vercel.app/createuser",
        {
          fullName: FullName,
          email: Email,
          password: Password,
        }
      );

      // console.log(response);

      if (response.data.error === false) {
        setError(response.data.message);
        navigate("/login");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("Please fill all the fields");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    // console.log(email, password, name);

    // API CALL
    SignUpUser(email, name, password);
  };

  return (
    <>
      <Navbar />

      <div className="section-sign">
        <div className="sign">
          <form onSubmit={handleSubmit}>
            <h4 className="sign-title">SIGN UP</h4>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="inputName-sign"
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="inputMail-sign"
            />
            <PasswordInput
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />

            {error && <p className="erreur"> {error}</p>}
            <button type="submit" className="btn-sign">
              Create Account
            </button>

            <p className="not-registred-sign">
              Have an Account?
              <Link to="/Login" className="link-log-sign">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
