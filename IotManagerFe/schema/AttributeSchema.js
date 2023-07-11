import * as Yup from "yup";

export default Yup.object({
    deviceId: Yup.string().notOneOf(['-1'], "Select a device").required("Required"),
    attributeValue: Yup.string().required("Required"),
    updateAttributeChannel: Yup.string().required("Required"),
    confirmAttributeChannel: Yup.string().required("Required"),
});
