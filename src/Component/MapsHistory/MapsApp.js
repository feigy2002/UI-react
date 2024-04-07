import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import FlyToMarker from "./FyToMarker";
import Filter from "./Filter";
import { useParams } from "react-router-dom";
// import icon from '../../Images/marker.svg'

const emptyStar = <i className="fa-regular fa-star"></i>;
const fullStar = (
  <i
    className="fa-solid fa-star"
    style={{
      color: "#fdc401",
    }}
  ></i>
);

export function MapsApp() {
  const [eventsData, setEventsData] = useState([]);
  const { eventId } = useParams();
  const BERLIN_POSITION = [52.5163, 13.3777];
  const [defaultPosition, setDefaultPosition] = useState(BERLIN_POSITION);

  useEffect(() => {
    loadEventList();
  }, []);

  const loadEventList = async () => {
    try {
      // get all events data to display in the map
      const response = await fetch('https://localhost:7122/api/Event');
      const jsonData = await response.json();
      setEventsData(jsonData || []);
      if (jsonData.length) {
        const selectedEvent = jsonData.find((x) => x.eventId === +eventId);
        setDefaultPosition([
          selectedEvent.latitude || BERLIN_POSITION[0],
          selectedEvent.longtitude || BERLIN_POSITION[1]
        ]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const icon = new Icon({
    iconUrl: '/marker.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);
  const [favourites, setFavourites] = useState(() => {
    const savedFavorites = localStorage.getItem("favourites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const handleFavouriteClick = (evId) => {
    let updatedFavourites = favourites.filter((eventId) => +eventId !== +evId);

    if (!favourites.includes(evId)) { // add
      updatedFavourites = [evId, ...updatedFavourites];
    }

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const handleListItemClick = (evId) => {
    const event = eventsData.find((event) => +event.eventId === +evId);

    if (event) {
      setActiveEvent(event);
    }
  };

  const handleCategorySelection = (selection) => {
    setSelectedCategory(selection);
    setActiveEvent(null);
  };

  return (
    <div className="maps-app">
      <div className="content">
        <div className="map-content flex flex-col gap-6 h-full">
          <Filter setSelectedCategory={handleCategorySelection} />
          <MapContainer
            center={defaultPosition}
            zoom={13}
            className="map-container"
            key={`${defaultPosition[0]}_${defaultPosition[1]}`}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {eventsData
              .filter(
                (event) =>
                  (!selectedCategory || event.category === selectedCategory)
                  && event.latitude && event.longtitude
              )
              .map((event) => {
                return (
                  <Marker
                    key={event.eventId}
                    position={[event.latitude, event.longtitude]}
                    icon={icon}
                    eventHandlers={{
                      click: () => {
                        setActiveEvent(event);
                      },
                    }}
                  />
                );
              })}
            {activeEvent && (
              <Popup position={[activeEvent.latitude, activeEvent.longtitude]}>
                <div className="popup-inner">
                  <h2 className="popup-inner__title">{activeEvent.titeleEvent}</h2>
                </div>
                <p className="popup-inner__description">
                  {activeEvent.edescription}
                </p>
                <button
                  className="popup-inner__button"
                  onClick={() => handleFavouriteClick(activeEvent.eventId)}
                >
                  {favourites.includes(activeEvent.eventId) ? (
                    <span>{fullStar} הסר מרשימת המועדפים</span>
                  ) : (
                    <span>{emptyStar} הוסף לרשימת המועדפים</span>
                  )}
                </button>
              </Popup>
            )}

            {activeEvent && (
              <FlyToMarker position={[activeEvent.latitude, activeEvent.longtitude]} zoomLevel={15} />
            )}
          </MapContainer>
        </div>

        <div className="liked-events">
          <h2 className="liked-events__title">
            <i className="fa-solid fa-star"></i> המועדפים שלי
          </h2>
          <ul>
            {favourites
              .map((eventId) => {
                return eventsData.find((event) => event.eventId === eventId);
              })
              .map((event) => {
                return (
                  <li
                    key={event?.eventId}
                    className="liked-events__event"
                    onClick={() => {
                      handleListItemClick(event?.eventId);
                    }}
                  >
                    <h3>{event?.titeleEvent}</h3>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
