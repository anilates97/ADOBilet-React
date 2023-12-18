import React, { useEffect, useState } from "react";
import EventsComp from "../components/EventsComp/EventsComp";
import FilterCategories from "../components/FilterCategories/FilterCategories";
import { useDispatch, useSelector } from "react-redux";
import { getArtistWithEvents } from "../redux/dataSlice";
import { useParams } from "react-router-dom";
import HeaderTitle from "../components/Header/HeaderTitle";
import HeaderMenu from "../components/Header/HeaderMenu";
import Footer from "../components/FooterComp/Footer";
import { HashLoader } from "react-spinners";

const Events = () => {
  const { eventsWithArtists } = useSelector((state) => state.data);

  const { categoryName } = useParams();
  const [filteredEvents, setFilteredEvents] = useState([]);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");

  const convertToDate = (dateString) => {
    const [day, month, year] = dateString.split(".");
    const formattedDate = new Date(`${year}-${month}-${day}`);
    return formattedDate.toLocaleDateString("en-GB");
  };

  const checkedData = filteredEvents.filter((event) => {
    const filtered = convertToDate(event.eventDate);

    if (filtered < formattedDate) {
      return null;
    }

    return filtered;
  });

  console.log("data", checkedData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistWithEvents());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    if (category === "") {
      setFilteredEvents(eventsWithArtists);
    } else {
      const filtered = eventsWithArtists.filter(
        (event) => event.category.name === category
      );
      setFilteredEvents(filtered);
    }
  };

  return (
    <>
      <div className="bg-color-primary">
        <HeaderMenu />
        <HeaderTitle />
      </div>
      {eventsWithArtists?.length > 0 ? (
        <>
          <div className="  text-[52px] text-white  bg-gradient-to-b from-[#183f3b] to-[#358981] rounded-b-3xl  ">
            <span className="shadow-xl after:content-['|'] before:content-['|'] after:ml-5 before:mr-5 border-b-8 after:shadow-xl before:shadow-xl ">
              INCOMING EVENTS
            </span>
          </div>
          <FilterCategories
            events={eventsWithArtists}
            clickedCategory={categoryName}
            onSelectCategory={handleCategorySelect}
          />
          {checkedData.length > 0 ? (
            <EventsComp events={filteredEvents} categoryName={categoryName} />
          ) : (
            <div className="text-2xl p-6">There is no incoming events!</div>
          )}
        </>
      ) : eventsWithArtists?.length === 0 ? (
        <div className="flex justify-center p-8">
          <HashLoader size={100} color="#404529" />
        </div>
      ) : (
        <div className="p-10 mb-1 text-lg">There are no incoming events.</div>
      )}
      <Footer />
    </>
  );
};

export default Events;
