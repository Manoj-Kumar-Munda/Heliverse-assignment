import React from "react";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { status } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  console.log(status);

  if (!status) {
    navigate("/auth/login");
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
