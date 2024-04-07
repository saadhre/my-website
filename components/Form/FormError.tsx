import styled from "styled-components";

import type { FieldErrorProps } from "../../lib/types";
import { ErrorMessage } from "./ErrorMessage";

const Message = styled(ErrorMessage)`
  margin: 1.5em 0;
  font-size: 1em;
`;

export const FormError = ({ error }: FieldErrorProps) => {
  if (!error) return null;

  return <Message>{error.message}</Message>;
};
