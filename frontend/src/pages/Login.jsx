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
      <div className=" z-10 md:w-[50%] md:h-screen h-[30vh] bg-white flex items-center justify-center">
        <img
          src="https://trueafricanart.com/cdn/shop/files/cow_e3860c30-3b1a-40b7-959e-6cd5bfe580c3_2048x2048.jpg?v=1689208053"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <Login />
    </div>
  );
};

export default LoginPage;
