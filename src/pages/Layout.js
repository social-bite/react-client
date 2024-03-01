import { Outlet, Link } from "react-router-dom";
import pb from "lib/pocketbase";
import { logout } from "lib/api";

import Home from '../assets/home.svg';
import Search from '../assets/search.svg';
import Account from '../assets/account.svg';

export default function Layout() {
  function onLogout() {
    logout();
    // console.log(pb.authStore.isValid);
    window.location.reload();
  }
  return (
    <div className="h-screen w-screen flex flex-col bg-black text-white">
      <div>
        <Link to={"/"}>Discover</Link>

        {pb.authStore.isValid ? (
          <>
            <Link to={"/feed"}>Feed</Link>
            <Link to={"/account"}>Account</Link>
            <button onClick={onLogout} className="btn-teal">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </div>
      <Outlet />
      <div className="flex justify-between">
        <Link className="w-1/3 flex justify-center" to={"/"}><img className="w-1/3" src={Home} alt="Home icon"/></Link>
        <Link className="w-1/3 flex justify-center" to={"/feed"}><img className="w-1/3" src={Search} alt="Home icon"/></Link>
        <Link className="w-1/3 flex justify-center" to={"/account"}><img className="w-1/3" src={Account} alt="Home icon"/></Link>
      </div>
    </div>
  );
}
