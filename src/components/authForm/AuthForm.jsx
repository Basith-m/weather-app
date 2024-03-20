import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./authForm.css";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../../services/allAPI";

const AuthForm = ({ register }) => {

  const [userData, setUserData] = useState({
    username: "", email: "", password: ""
  })

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    const { username, email, password } = userData
    try {
      if (!username || !email || !password) {
        alert("Please fill the form completely !!!")
      } else {
        const res = await registerAPI(userData)
        if (res.status === 200) {
          alert("user registerd successfully...")
          navigate('/')
          setUserData({
            username: "", email: "", password: ""
          })
        } else {
          alert(res.response.data)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = userData
    try {
      if (!email || !password) {
        alert("Please fill the form completely !!!")
      } else {
        const res = await loginAPI(userData)
        if (res.status === 200) {
          alert("user loginned successfully...")
          navigate('/home')
          setUserData({
            username: "", email: "", password: ""
          })
        } else {
          alert(res.response.data)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="authForm">
      {
        register &&
        <TextField
          className="input_field"
          label="Username"
          variant="filled"
          size="small"
          fullWidth
          InputProps={{
            style: { paddingLeft: "10px" },
          }}
          value={userData.username}
          onChange={e => setUserData({ ...userData, username: e.target.value })}
        />
      }
      <TextField
        label="Email"
        variant="filled"
        size="small"
        fullWidth
        InputProps={{
          style: { paddingLeft: "10px" },
        }}
        value={userData.email}
        onChange={e => setUserData({ ...userData, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="filled"
        size="small"
        fullWidth
        InputProps={{
          style: { paddingLeft: "10px" },
        }}
        value={userData.password}
        onChange={e => setUserData({ ...userData, password: e.target.value })}
      />
      {
        register ?
          <Link className="auth_link" to={'/'}>Already a member?</Link>
          :
          <Link className="auth_link" to={'/register'}>New user? Sign up here</Link>
      }
      {
        register ?
          <Button variant="contained" onClick={handleRegister}>Register</Button>
          :
          <Button variant="contained" onClick={handleLogin}>Login</Button>
      }
    </div>
  );
};

export default AuthForm;
