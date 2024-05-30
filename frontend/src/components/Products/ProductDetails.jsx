import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import { formatPrice } from "../../static/data";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

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
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className=" ">
      {data ? (
        <div className={`${styles.section} w-[90%] text-[#eee] 800px:w-[80%]`}>
          <div className="text-sm overflow-hidden breadcrumbs pt-10">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={`/products?category=${data.category}`}>
                  {data.category}
                </Link>
              </li>
              <li className="font-bold">{data.name}</li>
            </ul>
          </div>
          <div className="w-full py-5">
            <div className="flex w-full 800px:flex-row flex-col 800px:gap-10 gap-8 ">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${data && data.images[select]?.url}`}
                  alt=""
                  className="w-full h-[400px]  rounded-btn object-cover"
                />


                <div className="w-full carousel">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? null : null
                        } carousel-item cursor-pointer mr-2 mt-2  shadow  rounded-btn w-32 overflow-hidden`}
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

              <div className="w-full 800px:w-[50%] p-4 rounded shadow md:p-0 ">
                {/* ******************** */}

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <img
                        src={`${data?.shop?.avatar?.url}`}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                    </Link>
                    <div className="pr-8">
                      <Link to={`/shop/preview/${data?.shop._id}`}>
                        <h3 className={`text-[14px] font-semibold text-green-300 p-0 m-0`}>
                          {data.shop.name}
                        </h3>
                      </Link>
                      <h5 className="p-0 m-0 text-[15px]">
                        ({averageRating}/5) Ratings
                      </h5>
                    </div>
                  </div>

                  <div
                    className={`${styles.button} bg-[#333] mt-4 rounded justify-end`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message
                    </span>
                  </div>
                </div>

                {/* ******************** */}
                <h1 className={`${styles.productTitle} text-4xl font-bold mt-4`}>
                  {data.name}
                </h1>
                <p className="my-4">{data.description.slice(0,300)+ "..."}</p>
                <div className="flex pt-3 items-center">
                  {/* <h4 className={`${styles.productDiscountPrice} text-4xl`}>
                    ₦ {formatPrice(data.discountPrice)}
                  </h4> */}
                  <h3 className={`${styles.productDiscountPrice} text-[26px]`}>
                    ₦
                    {data.originalPrice
                      ? formatPrice(data.originalPrice)
                      : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gray-600 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[9px]">
                      {count}
                    </span>
                    <button
                      className="bg-gray-600 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
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
                        color={click ? "red" : "#fff"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        color={click ? "red" : "#fff"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-white !mt-6 rounded-btn hover:opacity-75 transition ease-in-out duration-300 flex items-center w-full`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-[#010101] font-semibold flex items-center">
                    Add to cart 
                  </span>
                </div>
              </div>
            </div>
          </div>

          <br />

          <div className="grid grid-cols-3 gap-8">
            <ProductDetailsInfo
              data={data}
              products={products}
              totalReviewsLength={totalReviewsLength}
              averageRating={averageRating}
            />
            <div className=" md:col-span-1 col-span-3 py-10 mb-8 text-[#010101] bg-gray-600 rounded-box h-full shadow">
              <div className="relative px-8 ">
                <h5
                  className={`
               py-3 text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
                >
                  Seller Information
                </h5>
              </div>

              <div className="w-full block  p-5">
                <div className="w-full mb-4 border-b">
                  <Link to={`/shop/preview/${data.shop._id}`}>
                    <div className="flex items-center">
                      <img
                        src={`${data?.shop?.avatar?.url}`}
                        className="w-[50px] h-[50px] rounded-full"
                        alt=""
                      />
                      <div className="pl-3">
                        <h3 className={`${styles.shop_name}`}>
                          {data.shop.name}
                        </h3>
                        <h5 className="pb-2 text-[15px]">
                          ({averageRating}/5) Ratings
                        </h5>
                      </div>
                    </div>
                  </Link>
                  <p className="pt-2">{data.shop.description}</p>
                </div>
                <div className="w-full  mt-5 800px:mt-0 800px:flex flex-col items-end">
                  <div className="text-left w-full">
                    <h5 className="font-[600]">
                      Joined on:{" "}
                      <span className="font-[500]">
                        {data.shop?.createdAt?.slice(0, 10)}
                      </span>
                    </h5>
                    <h5 className="font-[600] pt-3">
                      Total Products:{" "}
                      <span className="font-[500]">
                        {products && products.length}
                      </span>
                    </h5>
                    <h5 className="font-[600] pt-3">
                      Total Reviews:{" "}
                      <span className="font-[500]">{totalReviewsLength}</span>
                    </h5>
                    <Link to={`/shop/preview/${data.shop._id}`}>
                      <div
                        className={`${styles.button} rounded-btn w-full  mt-3 `}
                      >
                        <h4 className="text-white">Visit Shop</h4>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-gray-600 md:col-span-2 col-span-3  px-3 800px:px-10 w-full py-2 rounded-box shadow">
      <div className="w-full flex justify-start gap-10 border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={`${active === 1 ? "text-[#010101]" : "text-[#999]"}
               py-3 text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={`${active === 2 ? "text-[#010101]" : "text-[#999]"}
               py-3 text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-8 text-[18px] leading-8 pb-10 whitespace-pre-line text-[#010101]">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 text-[#010101] overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full items-center flex my-2">
                <img
                  src={`${item.user.avatar.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3 mb-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews For This Product Yet!</h5>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
