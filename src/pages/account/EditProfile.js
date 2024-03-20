import React from "react";
import { useState } from "react";
import { Link, useNavigate, useLoaderData } from "react-router-dom";

import {ReactComponent as Logo} from "assets/socialbite.svg";

import { logout, updateProfile } from "lib/api";

export default function Register() {
  const navigate = useNavigate();
  const userData = useLoaderData()
  const {avatar, firstname, lastname, username} = userData;
  const [loginCredentials, setLoginCredentials] = useState({
    first_name: firstname,
    last_name: lastname,
    username: username,
    password: "",
    newPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const { first_name, last_name, username } = loginCredentials;
    if (!username || !first_name || !last_name) {
      setErrorMessage("Must enter all fields");
      return;
    }
    // const exist = await checkUsername(username);
    // if (!exist) {
    //   setErrorMessage("Username already exists");
    //   return;
    // }
    const newData = {...userData, firstname: first_name, lastname: last_name, username: username}
    try {
      await updateProfile(newData);
      navigate("/account");
    } catch (error) {
      console.error("Error updating account:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  }

  async function handleSubmitPassword(event) {
    event.preventDefault();
    const { password, newPassword } = loginCredentials;
    if (password === newPassword) {
      setErrorMessage("Current and New Password cannot be the same");
      return;
    }
    const newData = {...userData, oldPassword: password, password:newPassword, passwordConfirm: newPassword}
    try {
      await updateProfile(newData);
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error updating account:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  }

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center bg-black text-white">
      <Logo className="mb-10" />
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
        <button className="w-full btn-teal" type="submit">
          Edit Profile
        </button>
      </form>
      <form className="mb-4 w-1/2" onSubmit={handleSubmitPassword}>
        <div className="flex flex-col">
          <input
            className="input-minimal"
            type="text"
            name="password"
            placeholder="Current Password"
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
            name="newPassword"
            placeholder="New Password"
            value={loginCredentials.newPassword}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                newPassword: e.target.value,
              })
            }
          />
        </div>
        <button className="w-full btn-teal" type="submit">
          Change Password
        </button>
      </form>
      <div className="flex">
        <Link className="ml-1 link-orange" to="/account" replace>
          Go Back
        </Link>
      </div>
    </section>
  );
}

{/* <form className="mb-4 w-1/2" onSubmit={handleSubmit}>
<div className="flex flex-col">
  <input
    className="input-minimal"
    type="text"
    name="password"
    placeholder="Current Password"
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
    placeholder="New Password"
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
  Change Password
</button>
</form>
<div className="flex">
<Link className="ml-1 link-orange" to="/account" replace>
  Go Back
</Link>
</div> */}