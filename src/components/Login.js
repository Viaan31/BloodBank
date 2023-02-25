import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const loginHandler = () => {
    axios
      .post(`https://fakestoreapi.com/auth/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setToken(res.data.token);
        localStorage.setItem("userToken", res.data.token);
        navigate("/city");
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-container-left">
          <h1
            style={{
              fontFamily: "monospace",
              fontSize: "34px",
              // marginLeft: "35px",
              textAlign: "center",
            }}
          >
            Welcome Back!
          </h1>
        </div>
        <div className="login-container-right">
          <div className="login-buttons">
            <h1>Login</h1>
            <input
              type="text"
              placeholder="Enter Email"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {error ? <div>{error}</div> : null}
            <button onClick={() => loginHandler()}>Login</button>
            <button
              onClick={() => {
                navigate(`/register`);
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
