import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./signUp.css";
import { useState } from "react";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { validateEmail } from "../../utils/validateEmail";
import { Link } from "react-router-dom";

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!email || !password || !name) {
        setError("please fill all the fields");
        return;
      }
      if (!validateEmail(email)) {
        setError("please enter a valid email");
        return;
      }
      setEmail("");
      setName("");
      setPassword("");
      setError("");
      console.log(email, password,name);

      //API CALL
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
