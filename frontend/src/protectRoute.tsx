import { useAuth } from "./hooks/userAuth";
import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
function ProtectRoute() {
  const { user, currLoading, error } = useAuth();
  console.log(user, error);
  if (currLoading) {
    return (
      <div className="glob-spin">
        <Spin size="large" />
      </div>
    );
  }
  if (!user && error) {
    return <Navigate to="/signin" replace={true} />;
  }

  return <Outlet />;
}

export default ProtectRoute;
