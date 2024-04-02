import * as Yup from "yup";

const billlandingValidation = Yup.object().shape({
    originWarehouseId: Yup.mixed().required("انبار مبدا الزامی است"),
    destinationWarehouseId: Yup.mixed().required("انبار مقصد الزامی است"),
});

export { billlandingValidation };
