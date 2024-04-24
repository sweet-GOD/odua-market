import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import Footer from "../components/Layout/Footer";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen profilebg">
          <Header activeHeading={4} />
          <div className="p-4 w-full md:w-11/12 mx-auto md:pt-0 pt-10">
            {allEvents &&
              allEvents.map((event, index) => (
                <div className="md:m-4 my-4">
                  <EventCard key={index} active={true} data={event} />
                </div>
              ))}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default EventsPage;
