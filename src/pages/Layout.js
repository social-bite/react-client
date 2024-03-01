import { Outlet, Link } from "react-router-dom";
import pb from "lib/pocketbase";
import { logout } from "lib/api";

import { ReactComponent as FeedIcon } from "assets/feed.svg";
import { ReactComponent as SearchIcon } from "assets/search.svg";
import { ReactComponent as AccountIcon } from "assets/account.svg";
import { ReactComponent as LogoutIcon } from "assets/logout.svg";
import { ReactComponent as LoginIcon } from "assets/login.svg";

export default function Layout() {
  function onLogout() {
    logout();
    window.location.reload();
  }
  return (
    <div className="h-screen w-screen flex flex-col bg-black text-white">
      <div className="flex justify-center grow overflow-y-scroll">
        <div className="max-w-lg w-full">
          <Outlet />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-lg w-full grid grid-cols-4 divide-x-2 divide-teal-2 border-x-2 border-x-teal-2">
          <Link to={"/"} className="flex flex-col items-center justify-center">
            <SearchIcon className="h-12 bg-teal-1 rounded-md p-1" />
            <span>Discover</span>
          </Link>
          <Link
            to={"/feed"}
            className="flex flex-col items-center justify-center"
          >
            <FeedIcon className="h-12 bg-teal-1 rounded-md p-1" />
            <span>Feed</span>
          </Link>
          <Link
            to={"/account"}
            className="flex flex-col items-center justify-center"
          >
            <AccountIcon className="h-12 bg-teal-1 rounded-md p-1" />
            <span>Account</span>
          </Link>
          {pb.authStore.isValid ? (
            <button
              onClick={onLogout}
              className="flex flex-col items-center justify-center"
            >
              <LogoutIcon className="h-12 bg-teal-1 rounded-md p-1" />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              to={"/login"}
              className="flex flex-col items-center justify-center"
            >
              <LoginIcon className="h-12 bg-teal-1 rounded-md p-1" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
