import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Quote from "../components/Quote";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { status } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  if (status) {
    navigate("/");
  }

  return (
    <div className="h-screen flex">
      <Outlet />
      <Quote />
    </div>
  );
};

export default AuthLayout;
