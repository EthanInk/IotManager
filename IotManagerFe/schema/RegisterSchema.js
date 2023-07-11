import * as Yup from "yup";

export default Yup.object({
  email: Yup.string().email("Invalid email address").required("Email address Required"),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  topicRoot: Yup.string().required("Topic username is required")
});
