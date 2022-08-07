import React from "react";
import styled from "styled-components";

import { Marker } from "./Marker";

export interface MapWithMarkerProps {
  latitude: string;
  longitude: string;
}

const Wrapper = styled.div`
  height: 300px;
  width: 100%;
`;

export const MapWithMarker: React.FC<MapWithMarkerProps> = ({ latitude, longitude }) => {
  const [map, setMap] = React.useState<google.maps.Map>();
  const mapRef = React.useRef<HTMLDivElement>(null);

  const getPosition = React.useCallback(() =>
    new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude)), [latitude, longitude]);

  React.useEffect(() => {
    if (mapRef.current && !map) {
      setMap(new window.google.maps.Map(mapRef.current, {
        center: getPosition(),
        zoom: 16,
      }));
    }
  }, [mapRef, map, getPosition]);

  return (
    <Wrapper ref={mapRef}>
      <Marker position={getPosition()} map={map} />
    </Wrapper>
  );
};
