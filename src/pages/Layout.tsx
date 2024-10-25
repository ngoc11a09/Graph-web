import { Outlet } from "react-router-dom";
import { FC } from "react";
import Nav from "../components/Nav";
import { PathProvider } from "../PathContext";

const Layout: FC = () => {
  return (
    <PathProvider>
      <Nav />
      <div className="my-10">
        <Outlet />
      </div>
    </PathProvider>
  );
};
export default Layout;
