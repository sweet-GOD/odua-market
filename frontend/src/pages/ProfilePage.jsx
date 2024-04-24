import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div className="profilebg">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          {/* <div className="w-full px-6  800px:px-28 py-8">
          <Link to={"/"}><BiArrowBack size={24} /></Link>
          </div> */}
          <div className={`${styles.section} md:flex   md:py-10 pt-16 pb-28 min-h-[90vh] gap-10 p-2 `}>
            <div className="w-full 800px:w-[335px] md:sticky fixed bottom-0 left-0">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
