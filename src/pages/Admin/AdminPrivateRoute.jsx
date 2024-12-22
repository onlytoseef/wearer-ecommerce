import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminPrivateRoute({ Component }) {
  const user = useSelector((state) => state.adminAuth.user);

  if (!user) {
    return <Navigate to="/admin/login" />;
  }
  console.log(user);

  return <Component />;
}
