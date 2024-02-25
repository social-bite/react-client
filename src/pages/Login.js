import React from 'react'
import { useState } from "react";
import { API_URL } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/socialbite.svg';

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
    <section className="h-screen w-screen flex flex-col justify-center items-center bg-black text-white">
      <img src={Logo} alt='SocialBite Logo' className='pb-4' />
      <div id='parent_notification'></div>
      <form class="mb-4 w-1/2" onSubmit={event => handleSubmit(event)}>
        <div class="flex flex-col">  
          <input
            class="w-full bg-[black] text-[white] outline-none border-t-[none] border-b-[0.1rem]
              border-x-[none] mb-4 transition-all duration-200 ease-[ease]
              hover:border-x-[none] hover:border-t-[none] hover:border-[#3B836E] hover:border-b-[0.2rem]"
            type="text"
            name="Username"
            value={login.username}
            placeholder='Username'
            onChange={e => setLogin({...login, username: (e.target.value)})}
          />
        </div>
        <div class="flex flex-col">
          <input
            class="w-full bg-[black] text-[white] outline-none border-t-[none] border-b-[0.1rem]
              border-x-[none] mb-4 transition-all duration-200 ease-[ease]
              hover:border-x-[none] hover:border-t-[none] hover:border-[#3B836E] hover:border-b-[0.2rem]"
            type="text"
            name="password"
            value={login.password}
            placeholder='Password'
            onChange={e => setLogin({...login, password: (e.target.value)})}
          />
        </div>
        <button
          class="bg-[#3B836E] mt-4 mb-4 font-[bold] w-full max-w-[15rem] text-xl transition-all 
            duration-300 ease-[ease] px-6 py-3 border-2 border-solid border-[#3B836E] rounded-md"
          type="submit"
        > 
          Login
        </button>
      </form>
      <div class="flex">
        <h4 class="mr-[0.25rem]">Don't have an account?</h4>
        <a
          class="hover:text-blue-700 transition-all duration-300 ease-[ease] hover:text-[#3B836E]"
          href="/register"
        >
          Register!
        </a>
      </div>
    </section>
  );
}

export default Login;