import React from "react";
import { useState } from "react";
import { API_URL } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/socialbite.svg";

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const { password } = login;
    const { username } = login;
    if (!username || !password) {
      setErrorMessage("Please enter username or password");
      return;
    }
    try {
      const response = await fetch(API_URL + "/api/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate("/feed");
      } else {
        setErrorMessage(data["message"]);
      }
    } catch (error) {
      console.error("Server error", error);
      setErrorMessage("Server error");
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
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <input
            className="input-minimal"
            type="text"
            name="password"
            value={login.password}
            placeholder="Password"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
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
