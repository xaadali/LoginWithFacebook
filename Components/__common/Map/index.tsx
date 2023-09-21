import React, { useState } from "react";
import GoogleMapReact, { MapOptions, Maps } from "google-map-react";

interface MarkerPosition {
  lat: any;
  lng: any;
}

interface MapProps {
  handleLocation: (latitude: any, longitude: any) => void;
}

const Map = ({ handleLocation }: MapProps) => {
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition | null>(
    null
  );

  const handleMapClick = (maps: Maps, map: any, event: any) => {
    const latLng = event.latLng;
    setMarkerPosition({ lat: latLng.lat(), lng: latLng.lng() });
    handleLocation(latLng.lat(), latLng.lng()); // Pass the coordinates to the parent component
  };

  const mapOptions: MapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 14,
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }} // Replace with your actual API key
        defaultCenter={mapOptions.center}
        defaultZoom={mapOptions.zoom}
        onClick={handleMapClick}
      >
        {markerPosition && (
          <Marker lat={markerPosition?.lat} lng={markerPosition?.lng} />
        )}
      </GoogleMapReact>
    </div>
  );
};

const Marker = (lat, lng) => {
  return <div className="marker">Marker</div>;
};

export default Map;
