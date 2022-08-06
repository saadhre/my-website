import type { Homepage } from "../pages";

import React, { useCallback } from "react";
import styled from "styled-components";
import { Wrapper } from "@googlemaps/react-wrapper";

import { SectionTitle } from "./SectionTitle";

const MapContainer = styled.div`
  height: 300px;
  width: 100%;
`;

const MapMarker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

interface CompanyLocationMapProps {
  latitude: string;
  longitude: string;
}

export const CompanyLocationMap: React.FC<CompanyLocationMapProps> = ({ latitude, longitude }) => {
  const [map, setMap] = React.useState<google.maps.Map>();
  const mapRef = React.useRef<HTMLDivElement>(null);

  const getPosition = useCallback(() =>
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
    <MapContainer ref={mapRef}>
      <MapMarker position={getPosition()} map={map} />
    </MapContainer>
  );
};
const Address = styled.address`
  font-style: normal;

  h3 {
    font-size: 1.1em;
  }
`;
const CompanyDataSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;

  > * {
    line-height: 1.4;
  }
`;
export const CompanyData: React.FC<Homepage> = (props) => {
  const { companyLocation, companyName, street, postalCode, city, phone, contactEmail, vatId, regon } = props.homepage;

  const rawPhone = () => phone.split(' ').join('').substring(1);

  const mapApiKey = String(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

  return (
    <div>
      <SectionTitle>Dane adresowe</SectionTitle>
      <Wrapper apiKey={mapApiKey}>
        <CompanyDataSections>
          <CompanyLocationMap {...companyLocation} />
          <Address>
            <h3>{companyName}</h3>
            <p>
              {street}
              <br />
              {`${postalCode} ${city}`}
            </p>
          </Address>
          <div>
            tel. <a href={`tel:${rawPhone()}`}>{phone}</a>
            <br />
            e-mail. <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
          <div>
            NIP: {vatId}
            <br />
            REGON: {regon}
          </div>
        </CompanyDataSections>
      </Wrapper>
    </div>
  );
}
