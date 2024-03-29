import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {ReactComponent as Logo} from "assets/socialbite.svg";

import { login, register } from "lib/api";

export default function Register() {
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const { first_name, last_name, username, password, passwordConfirm } = loginCredentials;
    if (!username || !password || !passwordConfirm || !first_name || !last_name) {
      setErrorMessage("Must enter all fields");
      return;
    }
    // const exist = await checkUsername(username);
    // if (!exist) {
    //   setErrorMessage("Username already exists");
    //   return;
    // }
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
      <Logo className="mb-12" />
      <div id="parent_notification" className="mb-4">{errorMessage ? errorMessage : ""}</div>
      <form className="mb-4 w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            className="input-minimal"
            type="text"
            name="first_name"
            placeholder="First Name"
            value={loginCredentials.first_name}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                first_name: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <input
            className="input-minimal"
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={loginCredentials.last_name}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                last_name: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <input
            className="input-minimal"
            type="text"
            name="username"
            placeholder="Username"
            value={loginCredentials.username}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                username: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <input
            className="input-minimal"
            type="text"
            name="password"
            placeholder="Password"
            value={loginCredentials.password}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                password: e.target.value,
              })
            }
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
              setLoginCredentials({
                ...loginCredentials,
                passwordConfirm: e.target.value,
              })
            }
          />
        </div>
        <button className="w-full btn-teal" type="submit">
          Register
        </button>
      </form>
      <div className="flex">
        Already have an account?
        <Link className="ml-1 link-orange" to="/login" replace>
          Login!
        </Link>
      </div>
    </section>
  );
}
