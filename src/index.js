import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { SWRConfig } from "swr";

import Layout from "pages/Layout";
import Discover from "pages/discover/Discover";
import Feed from "pages/feed/Feed";
import Login from "pages/login/Login";
import Register from "pages/register/Register";
import Account from "pages/account/Account";
import RequireAuth from "pages/RequireAuth";
import NoAuth from "pages/NoAuth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* User can either be logged in or not logged in */}
      <Route element={<Layout />}>
        <Route path="/" element={<Discover />} />
      </Route>

      {/* User is required to be logged in */}
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="feed" element={<Feed />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Route>
      {/* User is required to be not logged in */}
      <Route element={<NoAuth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </>
  )
);

const config = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SWRConfig value={config}>
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
