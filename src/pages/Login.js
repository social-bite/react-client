import React from 'react'
import { useState } from "react";
import { API_URL } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  function handleNotification(notification) {
    let parent = document.getElementById('parent_notification');
    parent.innerHTML = '';
    parent.innerHTML += notification;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { password } = login;
    const { username } = login;
    if (!username || !password) {
      handleNotification("Please enter username or password");
      return;
    }
    try {
      const response = await fetch(API_URL + '/api/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        navigate('/feed');
      }
      else {
        handleNotification(data["message"]);
      }
    } catch(error) {
      console.error('Server error', error);
      handleNotification("Server error")
    }
  }

  return (
    <section>
      <div>
        <h1 class="pb-4">Login</h1>
        <div id='parent_notification'></div>
        <form class="mb-4" onSubmit={event => handleSubmit(event)}>
          <div class="flex flex-col w-6/12">
            <label for="Username">Username</label>
            <input
              class="border-solid border-2 border-[black]"
              type="text"
              name="Username"
              value={login.username}
              onChange={e => setLogin({...login, username: (e.target.value)})}
            />
          </div>
          <div class="flex flex-col w-6/12">
            <label for="password">Password</label>
            <input
              class="border-solid border-2 border-[black]"
              type="text"
              name="password"
              value={login.password}
              onChange={e => setLogin({...login, password: (e.target.value)})}
            />
          </div>
          <button
            class="mt-4 font-[bold] w-full max-w-[15rem] text-xl transition-all duration-300 ease-[ease] px-6 py-3 border-2 border-solid border-[black]"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div class="flex">
          <h4 class="mr-[0.25rem]">Don't have an account?</h4>
          <a
            class="hover:text-blue-700 transition-all duration-300 ease-[ease]"
            href="/register"
          >
            Register!
          </a>
        </div>
      </div>
    </section>
  );
}

export default Login;