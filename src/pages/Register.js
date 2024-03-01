import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/socialbite.svg";

import { login, register } from "lib/api";

export default function Register() {
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const { username, password, passwordConfirm } = loginCredentials;
    if (!username || !password || !passwordConfirm) {
      setErrorMessage("Must enter all fields");
      return;
    }
    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (password.length < 8 || password.length > 72) {
      setErrorMessage(
        "Password must be over 8 characters and less than 72 characters"
      );
      return;
    }
    try {
      await register(username, password, passwordConfirm);
      await login(username, password);
      navigate("/feed");

    } catch (error) {
      console.error("Error registering account:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  }

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center bg-black text-white">
      <img src={Logo} alt="SocialBite Logo" className="pb-4" />
      <div id="parent_notification">{errorMessage ? errorMessage : ""}</div>
      <form className="mb-4 w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            className="input-minimal"
            type="text"
            name="username"
            placeholder="Username"
            value={loginCredentials.username}
            onChange={(e) => setLoginCredentials({ ...loginCredentials, username: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <input
            className="input-minimal"
            type="text"
            name="password"
            placeholder="Password"
            value={loginCredentials.password}
            onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <input
            className="input-minimal"
            type="text"
            name="passwordConfirm"
            placeholder="Confirm Password"
            value={loginCredentials.passwordConfirm}
            onChange={(e) =>
              setLoginCredentials({ ...loginCredentials, passwordConfirm: e.target.value })
            }
          />
        </div>
        <button className="btn-teal" type="submit">
          Register
        </button>
      </form>
      <div className="flex">
        Already have an account?
        <a className="ml-1 link-orange" href="/login">
          Login!
        </a>
      </div>
    </section>
  );
}