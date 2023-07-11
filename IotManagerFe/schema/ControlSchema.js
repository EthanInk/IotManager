import * as Yup from "yup";

export default Yup.object({
  name: Yup.string().required("Required"),
  deviceId: Yup.string()
    .notOneOf(["-1"], "Select a device")
    .required("Required"),
  attributeId: Yup.string()
    .notOneOf(["-1"], "Select a attribute")
    .required("Required"),
  controlType: Yup.string().required("Required"),
});
