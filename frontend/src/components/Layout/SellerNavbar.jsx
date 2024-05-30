import React from "react";
import { Link } from "react-router-dom";
import { navSellerItems } from "../../static/data";
import styles from "../../styles/styles";

const SellerNavbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navSellerItems &&
        navSellerItems.map((i, index) => (
          <div key={index} className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#59CE8F] ]"
                  : "text-black 800px:text-[#fff] hover:text-[#59CE8F]"
              } pb-[30px] 800px:pb-0 transition ease-in-out duration-300
                    hover:scale-110 font-[500] uppercase px-6 text-sm cursor-pointer}`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default SellerNavbar;
