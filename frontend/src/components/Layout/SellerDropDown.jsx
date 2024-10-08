import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const SellerDropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/${i.url}`);
    setDropDown(false);
    // window.location.reload();
  };
  return (
    <div className="pb-4 w-[320px] p-2 backdrop-blur-xl bg-[#ffffffea] mt-8 absolute z-30 rounded-xl shadow-2xl">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.noramlFlex} hover:bg-white rounded-xl`}
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            />
            <h3 className="m-3 font-semibold cursor-pointer select-none">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default SellerDropDown;
