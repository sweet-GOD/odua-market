import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { IoIosArrowForward } from "react-icons/io";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[80vh] 800px:min-h-[80vh] w-full bg-no-repeat herooo ${styles.noramlFlex}`}
      // style={{
      //   backgroundImage:
      //     "url(https://en.idei.club/uploads/posts/2023-03/1679254363_en-idei-club-p-white-wall-indoor-krasivo-60.jpg)",
      // }}
      style={{
        backgroundImage:
          "url(https://phototips.cc/wp-content/uploads/2015/08/XPC10.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[90%]`}>
        <div>
          <p className=" text-[20px] font-[Poppins] font-[400] text-[#fff]">
          Your Trusted Marketplace for 
          </p>
          <h1
            className={`text-[64px] leading-[1.1] heroText 800px:text-[118px] text-[#fff] font-[500] capitalize `}
          >
            Buyers & Sellers.
          </h1>
          <p className="pt-2 text-[24px] lg:text-center text-left font-[Poppins] font-[400] text-[#ddd]">
            Variety of stores with unique and ordinary products just for you!
          </p>
        </div>
        <Link to="/products" className="inline-block w-full mt-20">
          <div className={`${styles.button} shadow-xl bg-white hover:bg-transparent   md:mx-auto`}>
            <span className="text-[#111] hover:text-black font-semibold font-[Poppins] text-[18px]  ">
              Shop Now <IoIosArrowForward className="ml-1 inline" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
