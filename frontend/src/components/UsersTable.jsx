import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api/principal/fetchUsers";
import StudentsTable from "./StudentsTable";
import TeachersTable from "./TeachersTable";

const UsersTable = () => {
  const [userType, setUserType] = useState("students");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetchUsers(userType)
      .then((data) => {
        setData(data?.data);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err?.message);
        setIsLoading(false);
      });
  }, [userType]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="max-w-screen-xl mx-auto ">
      <div className="my-2">
        <select
          className="border-2 border-gray-700 rounded-lg p-2"
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value={"students"}>Students</option>
          <option value={"teachers"}>Teachers</option>
        </select>
      </div>

      <div className="relative overflow-x-auto  border border-gray-700 px-2 rounded-lg ">
        { userType === "students" && <StudentsTable data={data} />}
        { userType === "teachers" && <TeachersTable data={data} />} 
      </div>
    </div>
  );
};

export default UsersTable;
