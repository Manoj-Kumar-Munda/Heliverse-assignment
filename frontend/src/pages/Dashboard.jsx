import React from "react";
import { useSelector } from "react-redux";
import UsersTable from "../components/UsersTable";

const Dashboard = () => {
  const { user, status } = useSelector((store) => store.auth);
  console.log(user?.role);

  return (
    <div className="px-4">
      <h1 className="text-4xl font-semibold my-4 text-center">Dashboard</h1>
      {user?.role === "Principal" && <UsersTable />}
    </div>
  );
};

export default Dashboard;
