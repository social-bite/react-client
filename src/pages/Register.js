import { useState } from 'react';
import { API_URL } from '../utils/utils';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  let minLength = 8;
  let maxLength = 72

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== passwordConfirm) {
        alert("Passwords do not match.");
        return;
    }
    if (password.length < minLength || password.length > maxLength) {
      alert("Password must be over 8 characters and less than 72 characters");
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
      console.log(response);

      if (response.ok) {
        // TODO: Navigate to /feed
        // navigate('/feed')
        
      } 
      else {
        alert('Failed to register account. Please try again.');
      }
    } catch (error) {
      console.error('Error registering account:', error);
      alert('An error occurred. Please try again later.');
    }
  }


  return (
    <section>
      <div>
        <h1 className="pb-4">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-6/12">
            <label htmlFor="username">Username</label>
            <input
              className="border-solid border-2 border-[black]"
              type="text"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-6/12">
            <label htmlFor="password">Password</label>
            <input
              className="border-solid border-2 border-[black]"
              type="text"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-6/12">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              className="border-solid border-2 border-[black]"
              type="text"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
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
