import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between items-center w-full md:w-8/12 mx-auto">
        <div className="flex items-start hover:opacity-60 transition ease-in-out duration-500">
          <img
            src="https://www.vectorlogo.zone/logos/apple/apple-ar21.png"
            style={{ width: "120px", objectFit: "contain" }}
            alt=""
          />
        </div>
        <div className="flex items-start hover:opacity-60 transition ease-in-out duration-500">
          <img
            src="https://i.pinimg.com/originals/ef/41/ae/ef41aecb2c8f966b5719ef4c39f49ebc.png"
            style={{ width: "120px", objectFit: "contain" }}
            alt=""
          />
        </div>
        <div className="flex items-start hover:opacity-60 transition ease-in-out duration-500">
          <img src="https://svgsilh.com/png-1024/80658.png" style={{ width: "120px", objectFit: "contain" }} alt="" />
        </div>
        <div className="flex items-start hover:opacity-60 transition ease-in-out duration-500">
          <img src="https://www.logo.wine/a/logo/Tesla%2C_Inc./Tesla%2C_Inc.-Logomark-Black-Logo.wine.svg" style={{ width: "120px", objectFit: "contain" }} alt="" />
        </div>
        <div className="flex items-start hover:opacity-60 transition ease-in-out duration-500">
          <img src="https://pngimg.com/d/google_PNG19624.png" style={{ width: "120px", objectFit: "contain" }} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
