import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./login.css";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { validateEmail } from "../../utils/validateEmail";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const response = await axiosInstance.post(
        "/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.error === true) {
        setError(response.data.message);
      } else if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/Home");
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
    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    // console.log(email, password);

    // API call
    loginUser(email, password);
  };

  return (
    <>
      <Navbar />

      <div className="section-log">
        <div className="login">
          <form onSubmit={handleSubmit} className="login-form">
            <h4 className="login-title">LOGIN</h4>

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="inputMail"
            />
            <PasswordInput
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />

            {error && <p className="erreur"> {error}</p>}
            <button type="submit" className="btn-login">
              Login
            </button>

            <p className="not-registred">
              Not registered?
              <Link to="/SignUp" className="link-create">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
