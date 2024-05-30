import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login/Login.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className=" z-10 md:w-[50%] md:h-screen hidden h-[10vh] bg-white lg:flex items-center justify-center">
        <img
          src="https://images.saatchiart.com/saatchi/1250863/art/9043103/8106281-WFOWPSAY-7.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <Login />
    </div>
  );
};

export default LoginPage;
