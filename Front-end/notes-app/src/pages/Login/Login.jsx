import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import {Link} from 'react-router-dom'
import './login.css'
import {useState} from 'react'
import PasswordInput from '../../components/PasswordInput/PasswordInput'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");
  return (
    <>
    <Navbar/>

    <div className="section-log">
      <div className='login'>
        <form onSubmit={()=>{}}>
          <h4 className="login-title">
            Login
          </h4>

        <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        className='inputMail'
        />
        <PasswordInput onChange={(e)=>{
          setPassword(e.target.value);
        }}  value={password}/>
        <button type='submit' className="btn-login">
          Login
        </button>

        <p className="not-registred">
          Not registred? 
          <a href="/SignUp" className='link-create'>
          Create an Account
          </a>
        </p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login