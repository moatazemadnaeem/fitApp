import NavBar from "./components/navbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "./hooks/userAuth";
function MainLayout() {
  useAuth();
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default MainLayout;
