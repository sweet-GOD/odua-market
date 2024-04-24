import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import Ratings from "../../Products/Ratings";
import { formatPrice } from "../../../static/data";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  //   const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-[#fff] ">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] backdrop-blur-lg z-50 flex items-center justify-center">
            
          <div className="w-[90%] 800px:w-[60%] h-[95vh]  800px:h-[75vh] bg-[#ffffffdc] backdrop-blur-2xl overflow-y-scroll rounded shadow relative p-4">

          <RxCross1
              size={30}
              className="absolute right-2 shadow-lg top-0 bg-white w-12 h-12 p-3 rounded-b-2xl   z-50"
              onClick={() => setOpen(false)}
            />

            <div className="flex w-full justify-between items-center mt-8">
              <div className="flex pt-3">
                <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                  <img
                    src={`${data?.shop.avatar.url}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name} pb-0`}>{data.shop.name}</h3>
                    <Ratings rating={data?.ratings} />
                    {/* <h5 className=" text-[15px]">{data?.ratings} Ratings</h5> */}
                  </div>
                </Link>
              </div>
              <div
                className={`${styles.button} bg-[#000] mt-4 rounded h-11`}
                onClick={handleMessageSubmit}
              >
                <span className="text-[#fff] flex items-center">
                  Send Message <AiOutlineMessage className="ml-2" />
                </span>
              </div>
            </div>

            <div className="block w-full 800px:flex pt-2 gap-8 justify-between items-start">
              <div className="w-full 800px:w-[50%] relative mb-4 md:mb-0">
                <img className="rounded h-80 w-full shadow" src={`${data.images && data.images[select]?.url}`} alt="" />

                <h5 className="text-[14px] text-[green] mt-5 badge backdrop-blur-3xl shadow absolute top-0 right-2 py-4 px-4">
                  {data?.stock} in stock
                </h5>

                <div className="w-full carousel">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? null : null
                        } carousel-item cursor-pointer mr-2 mt-2 border-4 shadow border-white rounded w-32 overflow-hidden`}
                      >
                        <img
                          src={`${i?.url}`}
                          alt=""
                          className="h-[120px] w-full object-cover"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                </div>
                
              </div>

              <div className="w-full 800px:w-[50%] ">
                <h1 className={`${styles.productTitle} text-[20px] pb-4`}>
                  {data.name}
                </h1>
                <p>{data.description.slice(0,400)+ "..."}</p>

                <div className="flex items-center pt-3">
                  {/* <h4 className={`${styles.productDiscountPrice} p-0 m-0`}>
                  ₦ {formatPrice(data.discountPrice)}
                  </h4> */}
                  <h3 className={`${styles.productDiscountPrice} p-0 m-0`}>
                  ₦{data.originalPrice ? formatPrice(data.originalPrice) : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div className="">
                    <button
                      className="bg-gray-800 text-white font-bold rounded-l-lg px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2 ">
                      {count}
                    </span>
                    <button
                      className="bg-gray-800 text-white font-bold rounded-r-lg px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 w-full h-14 hover:opacity-75 transition ease-in-out duration-300 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
