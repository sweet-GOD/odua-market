import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styles from '../../styles/styles'
import EventCard from "./EventCard";

const Events = () => {
  const {allEvents,isLoading} = useSelector((state) => state.events);  
   
  return (
    <div>
     {
      !isLoading && (
        <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
        <div className="bg-[#FF1E00] w-12 h-[2px] mt-2 text-center"></div>
      </div>

      <div className="w-full grid  p-2">
         {
          allEvents.length !== 0 && (
            <EventCard data={allEvents && allEvents[0]} />
          )
         }
         <h4 className='p-4'>{
           allEvents?.length === 0 && (
            'No Events yet!'
           )
          }

         </h4>
      </div>
     
    </div>
      )
     }
  </div>
  )
}

export default Events