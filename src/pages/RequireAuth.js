import { Navigate, Outlet } from "react-router-dom";
import pb from "lib/pocketbase";

export default function RequireAuth() {
  return pb.authStore.isValid ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}
