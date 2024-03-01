import { Navigate, Outlet } from "react-router-dom";
import pb from "lib/pocketbase";

export default function NoAuth() {
  return !pb.authStore.isValid ? (
    <Outlet />
  ) : (
    <Navigate to="/feed" replace />
  );
}
