import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/socialbite.svg";

import { login } from "lib/api";

function Login() {
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  function handleNotification(notification) {
    // let parent = document.getElementById("parent_notification");
    // parent.innerHTML = "";
    // parent.innerHTML += notification;
    setErrorMessage(notification);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { password } = loginCredentials;
    const { username } = loginCredentials;
    if (!username || !password) {
      handleNotification("Please enter username or password");
      return;
    }
    try {
      await login(username, password);
      navigate("/feed");
    } catch (error) {
      console.error("Server error", error);
      handleNotification("Server error");
    }
  }

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center bg-black text-white">
      <img src={Logo} alt="SocialBite Logo" className="pb-4" />
      <div id="parent_notification">{errorMessage ? errorMessage : ""}</div>
      <form className="mb-4 w-1/2" onSubmit={(event) => handleSubmit(event)}>
        <div className="flex flex-col">
          <input
            className="input-minimal"
            type="text"
            name="Username"
            value={login.username}
            placeholder="Username"
            onChange={(e) => setLoginCredentials({ ...loginCredentials, username: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <input
            className="input-minimal"
            type="text"
            name="password"
            value={login.password}
            placeholder="Password"
            onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
          />
        </div>
        <button className="btn-teal" type="submit">
          Login
        </button>
      </form>
      <div className="flex">
        Don't have an account?
        <a className="ml-1 link-orange" href="/register">
          Register!
        </a>
      </div>
    </section>
  );
}

export default Login;
