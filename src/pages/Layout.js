import { Outlet, Link } from "react-router-dom";
import Home from '../assets/home.svg';
import Search from '../assets/search.svg';
import Account from '../assets/account.svg';

export default function Layout() {
  return (
    <div className="h-screen w-screen flex flex-col bg-black text-white">
      <Outlet />
      <div className="flex justify-between">
        <Link className="w-1/3 flex justify-center" to={"/"}><img className="w-1/3" src={Home} alt="Home icon"/></Link>
        <Link className="w-1/3 flex justify-center" to={"/feed"}><img className="w-1/3" src={Search} alt="Home icon"/></Link>
        <Link className="w-1/3 flex justify-center" to={"/account"}><img className="w-1/3" src={Account} alt="Home icon"/></Link>
      </div>
    </div>
  );
}
