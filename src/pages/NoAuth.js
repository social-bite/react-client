import { Navigate, Outlet } from "react-router-dom";
import pb from "lib/pocketbase";

export default function NoAuth() {
  return pb.authStore.isValid ? (
    <Navigate to="/feed" replace={true} />
  ) : (
    <Outlet />
  );
}
