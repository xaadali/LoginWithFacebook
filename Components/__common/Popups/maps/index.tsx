import React, { useMemo, useState, useRef, useEffect } from "react";
import Modal from "../../modal";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import axios from "axios";

function Maps({
  setpopupvisible,
  popupvisible,
  setAddress,
  setClickedLocation,
  clickedLocation,
}) {
  const libraries = useMemo(() => ["places"], []);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [address, setAddres] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const inputRef: any = useRef();

  const handlePlacesChanged = () => {
    const places = inputRef?.current?.getPlaces();
    if (places?.length > 0) {
      const { geometry, formatted_address } = places[0];
      setClickedLocation({
        lat: geometry.location.lat(),
        lng: geometry.location.lng(),
      });
      setAddress(formatted_address);
    }
  };

  // const center = useMemo(() => ({ lat: 18.52043, lng: 83.856743 }), []);

  const onPlaceSelect = (place) => {
    setSelectedPlace(place);
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA5EUIP04j8lgG9Vl6Fdc2YidPS8LKBOsQ",
    libraries: libraries as any,
  });

  // if (!isLoaded) {
  //   return <p>Loading...</p>;
  // }

  const handleMapClick = (e) => {
    setClickedLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    handleGetAddress(e.latLng.lat(), e.latLng.lng());
  };
  const handleGetAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA5EUIP04j8lgG9Vl6Fdc2YidPS8LKBOsQ`
      );
      if (response.data.results.length > 0) {
        setAddress(response.data.results[0].formatted_address);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      setAddress("Error fetching address");
      console.error(error);
    }
  };
  const [mapCenter, setMapCenter] = useState<any>(null);

  // useEffect(() => {
  //   // Try to get the user's location
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const userLat = position.coords.latitude;
  //         console.log(
  //           "🚀 ~ file: index.tsx:85 ~ useEffect ~ userLat:",
  //           userLat
  //         );
  //         const userLng = position.coords.longitude;
  //         console.log(
  //           "🚀 ~ file: index.tsx:87 ~ useEffect ~ userLng:",
  //           userLng
  //         );

  //         // Create and initialize your Google Map instance here
  //         // @ts-ignore
  //         const googleMap = new window.google.maps.Map(
  //           // @ts-ignore
  //           document.getElementById("map"),
  //           {
  //             center: { lat: userLat, lng: userLng },
  //             zoom: 8, // You can adjust the initial zoom level as needed
  //           }
  //         );

  //         // Load the map using your onLoad callback
  //         onLoad(googleMap);
  //       },
  //       (error) => {
  //         console.error("Error getting user location:", error);
  //         // Default to a fallback location if getting user location fails
  //         const fallbackCenter = { lat: 40.416775, lng: -3.70379 }; // Madrid, Spain

  //         // Create and initialize your Google Map instance with the fallback location
  //         // @ts-ignore
  //         const googleMap = new window.google.maps.Map(
  //           // @ts-ignore
  //           document.getElementById("map"),
  //           {
  //             center: fallbackCenter,
  //             zoom: 8, // You can adjust the initial zoom level as needed
  //           }
  //         );

  //         // Load the map using your onLoad callback
  //         onLoad(googleMap);
  //       }
  //     );
  //   } else {
  //     // Geolocation is not supported by the user's browser, so use a fallback location
  //     const fallbackCenter = { lat: 40.416775, lng: -3.70379 }; // Madrid, Spain

  //     // Create and initialize your Google Map instance with the fallback location
  //     // @ts-ignore
  //     const googleMap = new window.google.maps.Map(
  //       // @ts-ignore
  //       document.getElementById("map"),
  //       {
  //         center: fallbackCenter,
  //         zoom: 8, // You can adjust the initial zoom level as needed
  //       }
  //     );

  //     // Load the map using your onLoad callback
  //     onLoad(googleMap);
  //   }
  // }, [onLoad]);

  // Function to get the user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setMapCenter({ lat: userLat, lng: userLng });
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Default to a fallback location (e.g., Madrid, Spain) if getting user location fails
          setMapCenter({ lat: 40.416775, lng: -3.70379 });
        }
      );
    } else {
      // Geolocation is not supported by the user's browser, so use a fallback location
      setMapCenter({ lat: 40.416775, lng: -3.70379 });
    }
  };
  useEffect(() => {
    getUserLocation(); // Get the user's location when the component mounts
  }, []);
  return (
    <Modal
      visible={popupvisible}
      btn={true}
      onClose={() => setpopupvisible(false)}
    >
      <div>
        {isLoaded && (
          <GoogleMap
            // options={mapOptions}
            zoom={12}
            center={clickedLocation || mapCenter}
            onClick={handleMapClick}
            // mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: "100%", height: "400px" }}
            // onLoad={() => console.log("Map Component Loaded...")}
          >
            <StandaloneSearchBox
              onLoad={(ref) => (inputRef.current = ref)}
              onPlacesChanged={handlePlacesChanged}
            >
              <input
                type="text"
                placeholder="Enter location"
                style={{
                  boxSizing: "border-box",
                  border: "1px solid transparent",
                  width: "240px",
                  height: "32px",
                  padding: "0 12px",
                  borderRadius: "3px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                  fontSize: "14px",
                  outline: "none",
                  textOverflow: "ellipses",
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-120px",
                }}
              />
            </StandaloneSearchBox>

            <Marker
              draggable={false}
              // onDragEnd={handleMarkerDragEnd}
              position={clickedLocation}
              icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
            />
          </GoogleMap>
        )}
      </div>
    </Modal>
  );
}

export default Maps;
