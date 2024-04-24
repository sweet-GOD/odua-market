import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Signup from "../components/Signup/Signup";
import Lottie from "react-lottie";
import animation from "../Assests/animations/Animation - 1711643118630.json";

const SignupPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="z-10 md:w-[50%] md:h-screen h-[30vh] bg-white flex items-center justify-center">
        {/* <Lottie options={defaultOptions} height={600} width={600} /> */}
        <img
          src="https://doziearts.com/cdn/shop/products/image_31861890-bb38-4565-9465-2aa9b88cb8ba_900x.jpg?v=1629063723"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <Signup />
    </div>
  );
};

export default SignupPage;
