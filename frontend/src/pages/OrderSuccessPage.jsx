import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../Assests/animations/107043-success.json";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-screen bg-white w-full flex items-center justify-center flex-col">
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mx-10 mb-52 text-[25px] text-[#010101]">
        Your order has been placed successfully!
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
