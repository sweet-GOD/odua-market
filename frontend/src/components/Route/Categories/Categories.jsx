import React from "react";
import { useNavigate } from "react-router-dom";
import {
  brandingData,
  categoriesData,
  popularCategories,
} from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className=" pb-1 px-4">
      <div className="pb-12 pt-12 md:pt-2 flex flex-col justify-center  items-center">
        <h1 className="text-center text-[#010101] text-2xl font-semibold">
          Popular Categories
        </h1>
        <div className="bg-[#FF1E00] w-12 h-[2px] mt-2 text-center"></div>
      </div>
      {/* <div className={`${styles.section} block sm:block z-20`}>
        <div
          className={`branding my-4 flex md:flex-row flex-col gap-6 justify-between w-full md:shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-semibold text-sm text-[#010101] md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div> */}

      <div
        className={`${styles.section} bg-white shadow p-4  md:py-8 rounded-md mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-3 gap-4 md:grid-cols-3 md:gap-[10px] lg:grid-cols-6 lg:gap-[20px] xl:grid-cols-6 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.slice(0, 12).map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-full  md:hover:opacity-70 transition ease-in-out duration-300 py-3 rounded-lg  flex flex-col items-center justify-between cursor-pointer overflow-hidden"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <img
                    src={i.image_Url}
                    className="h-12  object-cover"
                    alt=""
                  />
                  <h5
                    className={`text-sm md:text-[18px] leading-[1.3] text-center md:text-start font-semibold mt-4`}
                  >
                    {i.title}
                  </h5>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
