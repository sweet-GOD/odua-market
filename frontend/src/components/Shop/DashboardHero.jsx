import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight,} from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { formatPrice } from "../../static/data";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
     dispatch(getAllOrdersOfShop(seller._id));
     dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller]);

  const availableBalance = seller?.availableBalance.toFixed(2);

  const latestOrders = orders?.slice(0, 5).map((item) => ({
    id: item._id,
    itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
    total: "US$ " + item.totalPrice,
    status: item.status,
  }));

  
  return (
    <div className="w-full p-8 text-white">
      <h3 className="text-[26px] my-4 font-Poppins pb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-gray-900  shadow rounded-box p-6">
          <div className="flex  items-center">
            {/* <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            /> */}
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] multicolor-text`}
            >
              Account Balance{" "}
              <span className="text-[16px] hidden">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2  text-[30px]  my-4 font-[500]">$ {formatPrice(availableBalance)}</h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#40d132] ">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-gray-900  shadow rounded-box p-6">
          <div className="flex  items-center">
            
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 multicolor-text !font-[400] text-[rgba(0,0,0,0.52)]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2  text-[30px] my-4 font-[500]">{orders && orders.length}</h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#40d132] ">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-gray-900  shadow rounded-box p-6">
          <div className="flex  items-center">
            {/* <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            /> */}
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] multicolor-text text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2  text-[30px] my-4 font-[500]">{products && products.length}</h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#40d132] ">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[26px] my-4 font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-gray-900  rounded-box">
      {latestOrders && latestOrders.length > 0 ? (
          latestOrders.map((order) => (
            <div key={order.id} className="flex justify-between items-center mb-4 p-4 rounded-lg shadow">
              <div>
                <h4 className="font-semibold">Order ID: {order.id}</h4>
                <p>Status: <span className={order.status === "Delivered" ? "text-green-400" : "text-red-400"}>{order.status}</span></p>
                <p>Items Qty: {order.itemsQty}</p>
                <p>Total: {order.total}</p>
              </div>
              <Link to={`/dashboard/order/${order.id}`}>
                <button className="flex items-center text-[#40d132] hover:text-[#60f553]">
                  <AiOutlineArrowRight size={20} />
                  <span className="ml-2">View Order</span>
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700">No latest orders found.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardHero;
