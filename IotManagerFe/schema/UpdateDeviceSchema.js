import * as Yup from "yup";

export default Yup.object({
  username: Yup.string().required("Device login username Required"),
  password: Yup.string(),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  deviceName: Yup.string().required("Device name Required"),
});
