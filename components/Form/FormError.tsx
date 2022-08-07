import type { FieldErrorProps } from "../../lib/types";

import React from "react";
import styled from "styled-components";

import { ErrorMessage } from "../ErrorMessage";

const Message = styled(ErrorMessage)`
  margin: 1.5em 0;
  font-size: 1em;
`;

export const FormError: React.FC<FieldErrorProps> = ({ error }) => {
  if (!error) return null;

  return <Message>{error.message}</Message>;
};
