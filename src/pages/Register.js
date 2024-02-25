import React from 'react'
import { useState } from 'react';
import { API_URL } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/socialbite.svg';

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
    <section className='h-screen w-screen flex flex-col justify-center items-center bg-black text-white'>
      <img src={Logo} alt='SocialBite Logo' className='pb-4' />
      <div id='parent_notification'></div>
      <form className='mb-4 w-1/2' onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            class="w-full bg-[black] text-[white] outline-none border-t-[none] border-b-[0.1rem]
              border-x-[none] mb-4 transition-all duration-200 ease-[ease]
              hover:border-x-[none] hover:border-t-[none] hover:border-[#3B836E] hover:border-b-[0.2rem]"
            type="text"
            name="username"
            placeholder='Username'
            value={login.username}
            onChange={e => setLogin({...login, username: (e.target.value)})}
          />
        </div>
        <div className="flex flex-col">
          <input
            class="w-full bg-[black] text-[white] outline-none border-t-[none] border-b-[0.1rem]
              border-x-[none] mb-4 transition-all duration-200 ease-[ease]
              hover:border-x-[none] hover:border-t-[none] hover:border-[#3B836E] hover:border-b-[0.2rem]"
            type="text"
            name="password"
            placeholder='Password'
            value={login.password}
            onChange={e => setLogin({...login, password: (e.target.value)})}
          />
        </div>
        <div className="flex flex-col">
          <input
            class="w-full bg-[black] text-[white] outline-none border-t-[none] border-b-[0.1rem]
              border-x-[none] mb-4 transition-all duration-200 ease-[ease]
              hover:border-x-[none] hover:border-t-[none] hover:border-[#3B836E] hover:border-b-[0.2rem]"
            type="text"
            name="passwordConfirm"
            placeholder='Confirm Password'
            value={login.passwordConfirm}
            onChange={e => setLogin({...login, passwordConfirm: (e.target.value)})}
          />
        </div>
        <button
        class="bg-[#3B836E] mt-4 mb-4 font-[bold] w-full max-w-[15rem] text-xl transition-all 
          duration-300 ease-[ease] px-6 py-3 border-2 border-solid border-[#3B836E] rounded-md"
          type="submit"
        >
          Register
        </button>
      </form>
      <div class="flex">
        <h4 class="mr-[0.25rem]">Already have an account?</h4>
        <a
          class="hover:text-blue-700 transition-all duration-300 ease-[ease] hover:text-[#3B836E]"
          href="/login"
        >
          Login
        </a>
      </div>
    </section>
  );
}

export default Signup