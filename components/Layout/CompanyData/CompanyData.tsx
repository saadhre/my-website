import type { Homepage } from "../../../lib/types";

import React from "react";
import { Trans } from "next-i18next";
import { Wrapper } from "@googlemaps/react-wrapper";

import { SectionTitle } from "../../SectionTitle";

import { InnerWrapper } from "./InnerWrapper";
import { Address } from "./Address";
import { MapWithMarker } from "./MapWithMarker";

export const CompanyData: React.FC<Homepage> = (props) => {
  const { companyLocation, companyName, street, postalCode, city, phone, contactEmail, vatId, regon } = props.homepage;
  const mapApiKey = String(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

  const rawPhone = () => phone.split(' ').join('').substring(1);

  return (
    <div>
      <SectionTitle>
        <Trans
          i18nKey="addressData"
          defaults="Dane adresowe"
        />
      </SectionTitle>
      <Wrapper apiKey={mapApiKey}>
        <InnerWrapper>
          <MapWithMarker {...companyLocation} />
          <Address>
            <h3>{companyName}</h3>
            <p>
              {street}
              <br />
              {`${postalCode} ${city}`}
            </p>
          </Address>
          <div>
            <Trans
              i18nKey="phone"
              defaults="tel."
            />
            {': '}
            <a href={`tel:${rawPhone()}`}>{phone}</a>
            <br />
            e-mail
            {': '}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
          <div>
            NIP: {vatId}
            <br />
            REGON: {regon}
          </div>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
}
