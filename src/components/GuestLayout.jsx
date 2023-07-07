import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";

const GuestLayout = () => {
  const { token } = useStateContext();
  // debugger;
  if (token) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      GuestLayout
      <Outlet />
    </div>
  );
};

export default GuestLayout;
