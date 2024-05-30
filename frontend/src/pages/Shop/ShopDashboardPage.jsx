import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardHero from "../../components/Shop/DashboardHero";
import SellerHeader from "../../components/Shop/Layout/SellerHeader";

const ShopDashboardPage = () => {
  return (
        <div className="profilebg overflow-hidden">
          <SellerHeader />
          {/* <DashboardHeader /> */}
          <div className="flex items-start justify-between w-full mt-10 lg:mt-0  mx-auto">
            <div className="w-[80px] 800px:w-[330px] hidden">
              <DashboardSideBar active={1} />
            </div>
            <DashboardHero />
          </div>
        </div>
  );
};

export default ShopDashboardPage;
