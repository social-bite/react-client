import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "assets/socialbite.svg";

import { login } from "lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const { password } = loginCredentials;
    const { username } = loginCredentials;
    if (!username || !password) {
      setErrorMessage("Please enter username or password");
      return;
    }
    try {
      await login(username, password);
      navigate("/feed");
    } catch (error) {
      console.error("Server error", error);
      setErrorMessage(`${error.response.message}`);
    }
  }

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center bg-black text-white">
      <div className="max-w-lg flex flex-col justify-center items-center w-full">
        <Logo />
        <div id="parent_notification" className="mb-4">
          {errorMessage ? errorMessage : ""}
        </div>
        <form className="mb-4 w-full" onSubmit={(event) => handleSubmit(event)}>
          <div className="flex flex-col w-full">
            <input
              className="input-minimal"
              type="text"
              name="Username"
              value={login.username}
              placeholder="Username"
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  username: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col w-full ">
            <input
              className="input-minimal"
              type="text"
              name="password"
              value={login.password}
              placeholder="Password"
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  password: e.target.value,
                })
              }
            />
          </div>
          <button className="btn-teal w-full" type="submit">
            Login
          </button>
        </form>
        <div className="flex">
          Don't have an account?
          <Link className="ml-1 link-orange" to="/register" replace>
            Register!
          </Link>
        </div>
      </div>
    </section>
  );
}
