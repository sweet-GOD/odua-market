import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";
import { BsCartPlus } from "react-icons/bs";
import { IoOpenOutline } from "react-icons/io5";
import { formatPrice } from "../../../static/data";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

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

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
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
    <>
      <div className="w-full rounded   overflow-hidden  pb-4 relative cursor-pointer">
        <div className="flex justify-start items-center px-2 pt-3 gap-2">
          <Link
            to={`/shop/preview/${data?.shop._id}`}
            className="flex  justify-center items-center"
          >
            <img
              className="avatar rounded-full w-8 h-8 mb-3 mr-2"
              src={data?.shop.avatar.url}
              alt=""
            />
            <h5 className={`${styles.shop_name} text-green-300 pb-3 font-medium`}>
              {data.shop.name}
            </h5>
          </Link>
        </div>
        <h5
          className={`${styles.shop_name} absolute text-white top-[20%] left-[20%] opacity-20 text-[64px] pb-3`}
        >
          {data.shop.name}
        </h5>
        <div className="relative ">
          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
          >
            <img
              src={`${data.images && data.images[0]?.url}`}
              alt=""
              className="w-full h-80 md:h-72 rounded-btn object-cover "
            />
          </Link>

          <div className="absolute bottom-2 left-2 ">
            <Ratings rating={data?.ratings} />
          </div>

          <span className="font-[400] badge absolute bottom-2 right-2 p-4 backdrop-blur-2xl text-[14px] text-[#010101]">
            {data?.stock} in stock
          </span>
        </div>

        <div className="px-2 pt-4">
          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
          >
            <h4 className="pt-2 text-[#fff] text-md px-2 font-[700] hover:opacity-70 ">
              {data.name.length > 35
                ? data.name.slice(0, 35) + "..."
                : data.name}
            </h4>
          </Link>

          <div className="p-2 my-2">
            <div className="flex items-center justify-between">
              {/* <h5 className={`${styles.productDiscountPrice} text-xl`}>
                ₦ {" "}
                {data.originalPrice === 0
                  ? formatPrice(data.originalPrice)
                  : formatPrice(data.discountPrice)}
              </h5> */}

              <h4 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice
                  ? "₦" + formatPrice(data.originalPrice)
                  : null}
              </h4>

              {/* side options */}
              <div className="flex gap-2">
                {click ? (
                  <AiFillHeart
                    size={24}
                    className="cursor-pointer  "
                    onClick={() => removeFromWishlistHandler(data)}
                    color={click ? "red" : "#fff"}
                    title="Remove from wishlist"
                  />
                ) : (
                  <AiOutlineHeart
                    size={24}
                    className="cursor-pointer  "
                    onClick={() => addToWishlistHandler(data)}
                    color={click ? "red" : "#fff"}
                    title="Add to wishlist"
                  />
                )}

                <IoOpenOutline
                  size={24}
                  className="cursor-pointer  "
                  onClick={() => setOpen(!open)}
                  color="#fff"
                  title="Quick view"
                />
                {open ? (
                  <ProductDetailsCard setOpen={setOpen} data={data} />
                ) : null}
              </div>
            </div>
          </div>

          <button className="w-full  overflow-hidden">
            {data?.stock > 0 ? (
              <div
                className="btn w-full hover:bg-[#eee] rounded-btn text-[#010101] bg-[#fff] cursor-pointer flex items-center justify-center"
                onClick={() => addToCartHandler(data._id)}
              >
                Add to Cart
                {/* <BsCartPlus
                  size={18}
                  color="#010101"
                  // title="Add to cart"
                /> */}
              </div>
            ) : (
              <div
                onClick={() => toast.error("Product Out of Stock!")}
                className="btn w-full text-white bg-[#ccc] cursor-pointer flex rounded items-center justify-center "
              >
                Out of Stock
              </div>
            )}
          </button>

          <div className="flex justify-between px-2 ">
            {/* <span className="font-[400] text-[14px] text-[#666]">
              {data?.sold_out} sold
            </span> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
