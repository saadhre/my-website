import * as yup from "yup";

export const ContactFormValidationSchema = yup.object({
  name: yup.string().min(2).max(50).required(),
  message: yup.string().min(5).max(1000).required(),
  email: yup.string().email().required(),
}).required();
