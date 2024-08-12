import React, { useState } from "react";
import AuthHeader from "../components/AuthHeader";
import Input from "../components/form/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(signinData);

    try {
      const data = await axios.post("/api/v1/user/login", signinData);
      console.log(data);
      if (!data?.data?.success) {
        throw new Error("Failed to login");
      }
      dispatch(login(data?.data?.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to login");
    }
  };
  return (
    <div className="grow basis-1/2 w-full">
      <Toaster />
      <div className="relative pt-[15vh] md:pt-0 flex flex-col md:justify-center items-center h-full border border-white px-2 ">
        <div className="max-w-lg w-full">
          <AuthHeader type="signin" />
          <form className="my-4 space-y-3" onSubmit={submitHandler}>
            <Input
              label="Email"
              placeholder="Enter your email"
              onChange={(e) =>
                setSigninData({ ...signinData, email: e.target.value })
              }
            />
            <Input
              label="Password"
              placeholder="Create password"
              type="password"
              onChange={(e) =>
                setSigninData({ ...signinData, password: e.target.value })
              }
            />

            <button className="bg-blue-500 text-white w-full py-2 rounded-md">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
