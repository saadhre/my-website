import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Marker } from "./Marker";

const Wrapper = styled.div`
  height: 300px;
  width: 100%;
`;

export interface MapWithMarkerProps {
  position: string;
}
export const MapWithMarker = ({ position }: MapWithMarkerProps) => {
  const [map, setMap] = useState<google.maps.Map>();
  const mapRef = useRef<HTMLDivElement>(null);

  const parsePosition = (position: string) => {
    const [latitude, longitude] = position.split(',');
    return new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
  }

  useEffect(() => {
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
