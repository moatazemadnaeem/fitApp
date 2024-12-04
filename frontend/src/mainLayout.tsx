import NavBar from "./components/navbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "./hooks/userAuth";
import { Spin } from "antd";

function MainLayout() {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div className="glob-spin">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default MainLayout;
