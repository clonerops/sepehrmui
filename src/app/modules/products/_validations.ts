import * as Yup from "yup";

const createProductValidations = Yup.object().shape({
    productName: Yup.string()
        .required("نام کالا الزامی است"),
    productSize: Yup.string()
        .required("سایز کالا الزامی است"),
    approximateWeight: Yup.number().typeError("مقدار باید عددی باشد")
        .required("افزودن وزن الزامی است"),
    productTypeId: Yup.mixed()
        .required("نوع کالا الزامی است"),
    numberInPackage: Yup.mixed()
        .required("تعداد در بسته الزامی است"),
    productThickness: Yup.mixed()
        .required("ضخامت الزامی است"),
    productStandardId: Yup.mixed()
        .required("استاندارد کالا الزامی است"),
    productStateId: Yup.mixed()
        .required("حالت کالا الزامی است"),
    description: Yup.mixed()
        .required("توضیحات الزامی است"),
    productMainUnitId: Yup.mixed()
        .required("واحد اصلی الزامی است"),
    productSubUnitId: Yup.mixed()
        .required("واحد فرعی الزامی است"),
    exchangeRate: Yup.mixed()
        .required("نرخ تبدیل الزامی است"),
    maxInventory: Yup.mixed()
        .required("حداکثر موجودی الزامی است"),
    minInventory: Yup.mixed()
        .required("حداقل موجودی الزامی است"),
    inventotyCriticalPoint: Yup.mixed()
        .required("نقطه بحرانی الزامی است"),
});

export {
    createProductValidations
}