import type { FieldErrorProps } from "../../lib/types";
import { ErrorMessage } from "./ErrorMessage";

export const FormFieldError = ({ error }: FieldErrorProps) => {
  if (!error) return null;

  return <ErrorMessage>{error.message}</ErrorMessage>;
}
