import { Outlet } from "react-router-dom";
import { FC } from "react";
import Nav from "../components/Nav";

const Layout: FC = () => {
  return (
    <div>
      <Nav />
      <div className="my-10">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
