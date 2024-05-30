import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  return (
    <div
      className={`w-full block bg-white  shadow rounded-btn ${
        active ? "unset" : "mb-12"
      } lg:flex `}
    >
      <div className="w-full  relative lg:-w[50%] m-auto">
        <img src={`${data.images[0]?.url}`} alt="" />
        <div className="badge absolute top-4 right-2 p-4">
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.stock} in stock
          </span>
          <span className="pr-3 font-[400] text-[17px] text-red-600">
            {data.sold_out} sold
          </span>
        </div>
      </div>
      <div className="w-full p-4 lg:[w-50%] flex flex-col justify-center">
        <h2 className={`text-[25px] font-[600]  text-[#010101]`}>{data.name}</h2>
        <p>{data.description.slice(0,400)+"..."}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              ₦ {data.discountPrice}
            </h5>
            <h5 className="font-[500] text-[18px] text-[#d55b45] pl-3 line-through">
              ₦{data.originalPrice}
            </h5>
          </div>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default EventCard;
