import styled from "styled-components";

import { Avatar } from "./Avatar";
import { IconsList } from "./IconsList";
import { CompanyLogo } from "./CompanyLogo";

export const PageHeader = styled.div`
  display: grid;
  row-gap: 1.5em;

  ${IconsList} {
    margin-top: 1.5em;
  }

  ${CompanyLogo} {
    grid-row: 1;
  }

  @media (min-width: 768px) {
    grid-template-columns: 150px 1fr 1fr;
    grid-column-gap: 3em;

    ${Avatar} {
      margin-bottom: 0;
    }

    ${IconsList} {
      margin-top: 1em;
    }

    ${CompanyLogo} {
      grid-column: 3;
      text-align: right;
    }
  }
`;
