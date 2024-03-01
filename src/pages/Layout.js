import { Outlet, Link } from "react-router-dom";
import pb from "lib/pocketbase";
import { logout } from "lib/api";

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
        <Link to={"/feed"}>Feed</Link>
        <Link to={"/account"}>Account</Link>
        {pb.authStore.isValid ? (
          <button onClick={onLogout} className="btn-teal">
            Logout
          </button>
        ) : (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}
