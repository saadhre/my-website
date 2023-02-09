import type { FieldError } from "react-hook-form";

export interface FieldErrorProps {
  error?: FieldError | { message: string }
}
