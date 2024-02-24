import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="h-screen w-screen flex flex-col bg-black text-white">
      <div>
        <Link to={"/"}>Discover</Link>
        <Link to={"/feed"}>Feed</Link>
        <Link to={"/account"}>Account</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </div>
      <Outlet />
    </div>
  );
}
