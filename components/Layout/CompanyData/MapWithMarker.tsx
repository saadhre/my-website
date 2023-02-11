import React from "react";
import styled from "styled-components";

import { Marker } from "./Marker";

const parsePosition = (position: string) => {
  const [latitude, longitude] = position.split(',');
  return new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
}

const Wrapper = styled.div`
  height: 300px;
  width: 100%;
`;

export interface MapWithMarkerProps {
  position: string;
}

export const MapWithMarker: React.FC<MapWithMarkerProps> = ({ position }) => {
  const [map, setMap] = React.useState<google.maps.Map>();
  const mapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (mapRef.current && !map && position) {
      setMap(new window.google.maps.Map(mapRef.current, {
        center: parsePosition(position),
        zoom: 16,
      }));
    }
  }, [mapRef, map, position]);

  if (!position) {
    return null;
  }

  return (
    <Wrapper ref={mapRef}>
      <Marker position={parsePosition(position)} map={map} />
    </Wrapper>
  );
};
