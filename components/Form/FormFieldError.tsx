import type { FieldErrorProps } from "../../lib/types";

import React from "react";

import { ErrorMessage } from "../ErrorMessage";

export const FormFieldError: React.FC<FieldErrorProps> = ({ error }) => {
  if (!error) return null;

  return <ErrorMessage>{error.message}</ErrorMessage>;
}
