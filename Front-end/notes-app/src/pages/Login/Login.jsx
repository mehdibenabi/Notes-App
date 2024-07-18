import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './login.css'
import {useState} from 'react'
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import { validateEmail } from "../../utils/validateEmail"
import {Link} from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    if( !email || !password ){
      setError("please fill all the fields");
      return;
    }
    if (!validateEmail(email)) {
      setError("please enter a valid email");
      return;
    }
    setEmail('');
    setPassword('');
    setError('');
    console.log(email, password);

    //API CALL
  }
  return (
    <>
      <Navbar />

      <div className="section-log">
        <div className="login">
          <form onSubmit={handleSubmit}>
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
              Not registred?
              <Link to="/SignUp" className="link-create">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login