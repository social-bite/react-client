import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  redirect,
} from "react-router-dom";

import pb from "lib/pocketbase";

import Layout from "pages/Layout";
import Discover from "pages/discover/Discover";
import Feed from "pages/feed/Feed";
import Login from "pages/login/Login";
import Register from "pages/register/Register";
import Account from "pages/account/Account";
import EditProfile from "pages/account/EditProfile";
import { fetchFeed, fetchRestaurantList, fetchUser } from "lib/api";

const require_no_auth = async () => {
  if(pb.authStore.isValid) return redirect("/")
  return null;
}

const require_auth = async () => {
  if(!pb.authStore.isValid) return redirect("/login")
  return null;
}

const account_loader = async () => {
  let [userData, feedData] = await Promise.all([
    fetchUser(), fetchFeed()
  ])
  userData = {...userData[0], avatar:userData[1]}
  return {...userData, ...feedData};
}
const edit_profile_loader = async () => {
  let [userData] = await Promise.all([
    fetchUser()
  ])
  userData = {...userData[0]}
  return userData
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* User can either be logged in or not logged in */}
      <Route element={<Layout />}>
        <Route path="/" loader={fetchRestaurantList} element={<Discover />} />
      </Route>

      {/* User is required to be logged in */}
      <Route loader={require_auth}>
        <Route element={<Layout />}>
          <Route path="feed" loader={fetchFeed} element={<Feed />} />
          <Route path="account" loader={account_loader} element={<Account />} />
          <Route path="account/edit-profile" loader={edit_profile_loader} element={<EditProfile />} />
        </Route>
      </Route>
      {/* User is required to be not logged in */}
      <Route loader={require_no_auth}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
