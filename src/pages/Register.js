import React from 'react'
import { useState } from 'react';
import { API_URL } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  function handleNotification(notification) {
    let parent = document.getElementById('parent_notification');
    parent.innerHTML = '';
    parent.innerHTML += notification;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { username, password, passwordConfirm } = login;
    if (!username || !password || !passwordConfirm) {
      handleNotification("Must enter all fields");
      return;
    }
    if (password !== passwordConfirm) {
      handleNotification("Passwords do not match.");
      return;
    }
    if (password.length < 8 || password.length > 72) {
      handleNotification("Password must be over 8 characters and less than 72 characters");
      return;
    }
    try {
      const response = await fetch(API_URL + '/api/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, passwordConfirm })
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/feed');
      } 
      else {
        if (data["error"] !== undefined) {
          // key exists, print error 
          const jsonObject = JSON.parse(data["error"])
          console.log(jsonObject)
          handleNotification(jsonObject["data"]["username"]["message"]);
        }
      }
    } catch (error) {
      console.error('Error registering account:', error);
      handleNotification("An error occurred. Please try again later.");
    }
  }

  return (
    <section>
      <div>
        <h1 className="pb-4">Register</h1>
        <div id='parent_notification'></div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-6/12">
            <label htmlFor="username">Username</label>
            <input
              className="border-solid border-2 border-[black]"
              type="text"
              name="username"
              value={login.username}
              onChange={e => setLogin({...login, username: (e.target.value)})}
            />
          </div>
          <div className="flex flex-col w-6/12">
            <label htmlFor="password">Password</label>
            <input
              className="border-solid border-2 border-[black]"
              type="text"
              name="password"
              value={login.password}
              onChange={e => setLogin({...login, password: (e.target.value)})}
            />
          </div>
          <div className="flex flex-col w-6/12">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              className="border-solid border-2 border-[black]"
              type="text"
              name="passwordConfirm"
              value={login.passwordConfirm}
              onChange={e => setLogin({...login, passwordConfirm: (e.target.value)})}
            />
          </div>
          <button
            className="mt-4 font-[bold] w-full max-w-[15rem] text-xl transition-all duration-300 ease-[ease] px-6 py-3 border-2 border-solid border-[black]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Signup