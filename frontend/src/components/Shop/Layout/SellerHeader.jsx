import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { sellerCategoriesData, productData } from "../../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "../../../components/Layout/DropDown";
import Navbar from "../../../components/Layout/Navbar";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import corsalogo from "../../../Assests/ocorsalogo.svg";
import { IoMenu } from "react-icons/io5";
import SellerNavbar from "../../Layout/SellerNavbar";
import SellerDropDown from "../../Layout/SellerDropDown";

const SellerHeader = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { seller } = useSelector((state) => state.seller);


  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}  p-1 z-10`}>
        <div className="hidden 800px:py-[0px] 800px:flex items-center justify-between">
          <div>
            <Link to="/dashboard">
              <img className="w-36 " src={corsalogo} alt="" />
            </Link>
          </div>
          <h1 className="text font-bold  multicolor-text">PLACE ADVERTS HERE!!!</h1>

          <div
            className={`${styles.button}  hover:opacity-80 transition ease-in-out duration-300 shadow-lg !h-11`}
          >
            <Link to={`${isSeller ? "/" : "/"}`}>
              <h1 className="text-[#fff] flex uppercase text-sm items-center font-semibold">
                {isSeller ? "Wallet Address" : ""}{" "}
                {/* <IoIosArrowForward className="ml-1" /> */}
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${
          active === true ? " fixed top-0 left-0  bg-[#010101f5]" : "bg-[#222]"
        } transition hidden  800px:flex items-center justify-between z-20 w-full  h-[60px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-start`}
        >
          <div className="flex items-center justify-start  w-[500px] gap-8">
            {/* categories */}
            <div onClick={() => setDropDown(!dropDown)}>
              <div className="relative      hidden 1000px:block">
                <IoMenu
                  size={20}
                  className="absolute top-0 left-2 text-[#FFF]"
                />
                <button
                  className={`w-full flex justify-between  items-center pl-8  text-[#FFF]  font-sans text-sm font-[500] select-none rounded-t-lg`}
                >
                  MENU
                </button>
                
                {dropDown ? (
                  <SellerDropDown
                    categoriesData={sellerCategoriesData}
                    setDropDown={setDropDown}
                  />
                ) : null}
              </div>
            </div>

            {/* search box */}
            <div className=" relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[24px] bg-white w-96 p-5 pl-12 shadow-lg  bg-transparent text-black rounded-3xl "
              />
              <AiOutlineSearch
                size={26}
                className="absolute left-4 top-2  pr-2 cursor-pointer text-[#010101]"
              />
              {searchTerm.trim() !== "" &&
              searchData &&
              searchData.length !== 0 ? (
                <div className="absolute min-h-[30vh] backdrop-blur-2xl bg-[#ffffff9c] shadow-sm-2 z-[9] p-4 rounded-lg shadow-xl  mt-4 w-full">
                  {searchData &&
                    searchData.map((i, index) => {
                      return (
                        <Link to={`/product/${i._id}`}>
                          <div className="w-full flex items-center p-2 rounded-xl hover:bg-gray-200">
                            <img
                              src={`${i.images[0]?.url}`}
                              alt=""
                              className="w-[40px] h-[40px] mr-[10px] rounded-lg"
                            />
                            <h1 className="font-semibold text-[#010101]">{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex w-full justify-between">

          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <SellerNavbar active={activeHeading} />
          </div>

          <div className="flex">
          <div className={`${styles.noramlFlex} gap-3`}>
            <h1 className="text-gray-300 text-sm font-semibold">{seller.name}</h1>
          <Link to={`/shop/${seller._id}`}  data-tip={seller ? seller.email : "Profile"} className="tooltip tooltip-bottom">
            <img
              src={`${seller.avatar?.url}`}
              alt=""
              className="w-[36px] h-[36px] rounded-full object-cover"
            />
          </Link>
            </div>

            <div className={`${styles.noramlFlex}`}>
              
            </div>

            <div className={`${styles.noramlFlex}`}>
              
            </div>
           
          </div>
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm  z-10 " : null
        }
      w-full h-[60px]  backdrop-blur-md z-50 fixed top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center z-50 justify-between">
          <div>
            <BiMenuAltLeft
              size={30}
              className="ml-4 text-[#fff]"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/dashboard">
              <img
                src={corsalogo}
                alt=""
                className="mt-3 cursor-pointer w-32"
              />
            </Link>
          </div>
          <div>
            <div className="text-[#999] mr-[20px]">Seller</div>
            <div
              className="relative hidden mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} className="text-[#fff]" />
              <span className="absolute right-0 shadow-lg top-0 rounded-full bg-[#fff] w-4 h-4 top right p-0 m-0 text-[#010101] font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed z-50 w-full bg-[#0000005f] h-screen top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-50">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative hidden mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#010101] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="flex w-full py-4 mb-4 px-4 justify-start border-b">
                {isSeller ? (
                  <div>
                    <Link to="/profile" className="flex items-center gap-2">
                      <img
                        src={`${seller.avatar?.url}`}
                        alt=""
                        className="w-[35px] h-[35px] rounded-full border-[3px] border-[#ffde59]"
                      />
                      <p className="text-[#010101] font-semibold">
                        {seller.name}
                      </p>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] font-semibold hidden text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] font-semibold text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>

              <div className="mb-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#010101] border-[2px] rounded-lg shadow-lg"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchTerm.trim() !== "" &&
                searchData &&
                searchData.length !== 0 ? (
                  <div className="absolute bg-[#fff] z-10 shadow-xl w-[99%] left-4 p-2 rounded-xl">
                    {searchData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${i._id}`}>
                          <div className="w-full flex items-center p-2 rounded-xl hover:bg-gray-100">
                            <img
                              src={`${i.images[0]?.url}`}
                              alt=""
                              className="w-[40px] h-[40px] mr-[10px] rounded-lg"
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <SellerNavbar active={activeHeading} />
              {/* <div className={`${styles.button} ml-4 `}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become a Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div> */}

              <div className={`${styles.button} ml-4 shadow-lg hidden`}>
                <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                  <h1 className="text-[#fff] flex items-center ">
                    {isSeller ? "Go to Dashboard" : "Become a seller"}{" "}
                    {/* <IoIosArrowForward className="ml-1" /> */}
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SellerHeader;
