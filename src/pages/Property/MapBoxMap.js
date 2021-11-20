import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import { render } from "react-dom";
import MapGL from "react-map-gl";
import WebMercatorViewport from 'viewport-mercator-project';

import Geocoder from "react-map-gl-geocoder";

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZmluZHByb3BlcnRpZXMiLCJhIjoiY2tzZDh4emxlMG9kdTJwbnV4ZHMydTZmZyJ9.rUqHRUS993INqpIcW0h8Eg";

const MapBoxMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 24.044920062868243,
    longitude: 54.52523460946966,
    minZoom: 5,
    maxZoom: 16,
    minPitch: 22,
    maxPitch: 85,
    countries:"ae",
    center: [24.044920062868243, 54.52523460946966], // starting position ([lng, lat] for Mombasa, Kenya)
    capturePointerMove: true,
    captureDrag: true,
  });
  
  const mapRef = useRef();

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    [

    ]
  );
  const geocoderContainerRef = useRef();

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  return (
    <div style={{ height: "70vh" }}>
      <div
        ref={geocoderContainerRef}
        style={{ position: "relative", top: -10, left: 0, zIndex: 1 }}
      />
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        // latitude={22}
        // longitude={56.5}
        height="100%"
        mapStyle="mapbox://styles/findproperties/cks61mi510ncm17qpixvdc4up"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
    {/* <Marker latitude={23.78} longitude={56.41} offsetLeft={-20} offsetTop={-10}>
      </Marker> */}
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
      </MapGL>
    </div>
  );
};

// render(<MapBoxMap />, document.getElementById("root"));
export default MapBoxMap