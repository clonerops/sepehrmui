const menuItem = [
 
    {
        id: 2,
        title: "سفارش فروش",
        to: "",
        iconName: "Redeem",
        submenu: [
            {
                id: 1321,
                iconName: "Report",
                title: "ثبت سفارش فروش",
                to: "dashboard/sales_order",
            },
            {
                id: 1321,
                iconName: "RestorePage",
                title: "لیست فروش ها",
                to: "dashboard/sales_order/lists",
            },
            {
                id: 1321,
                iconName: "RocketTwoTone",
                title: "تایید سفارش فروش" ,
                to: "dashboard/sales_order/ready-to-confirm",
            },
            {
                id: 1321,
                iconName: "RocketTwoTone",
                title: "ویرایش سفارش فروش",
                to: "dashboard/sales_order/edit",
            },
        ],
    },
    {
        id: 2,
        title: "مشتریان",
        to: "",
        iconName: "VerifiedUserSharp",
        submenu: [
            {
                id: 1321,
                iconName: "Rsvp",
                title: "مدیریت مشتری",
                to: "dashboard/customers",
            },
            {
                id: 1321,
                iconName: "Rsvp",
                title: "شرکت های مشتریان",
                to: "dashboard/customerCompany",
            },
            {
                id: 1321,
                iconName: "SavingsRounded",
                title: "مدیریت تامین کنندگان",
                to: "dashboard/suppliers",
            },
        ],
    },
    {
        id: 2,
        title: "مدیریت کاربران",
        to: "",
        iconName: "PriceChange",
        submenu: [
            {
                id: 1321,
                iconName: "SelectAll",
                title: "کاربران",
                to: "dashboard/users",
            },
            {
                id: 1321,
                iconName: "SelectAll",
                title: "گروه ها",
                to: "dashboard/roles/groups",
            },
            {
                id: 1321,
                iconName: "SelectAll",
                title: "مجوز ها",
                to: "dashboard/permissions",
            },
        ],
    },
    {
        id: 2,
        title: "کالا",
        to: "",
        iconName: "RunCircle",
        submenu: [
            {
                id: 1321,
                iconName: "Satellite",
                title: "مدیریت کالا",
                to: "dashboard/products",
            },
            {
                id: 1321,
                iconName: "ScheduleSendSharp",
                title: "مدیریت قیمت کالا",
                to: "dashboard/productPrices",
            },
            {
                id: 1321,
                iconName: "BrandingWatermark",
                title: "برند ها",
                to: "dashboard/brands",
            },
            {
                id: 1321,
                iconName: "TypeSpecimen",
                title: "نوع کالا ها",
                to: "dashboard/productTypes",
            },
            {
                id: 1321,
                iconName: "Balcony",
                title: "حالت ها",
                to: "dashboard/productState",
            },
            {
                id: 1321,
                iconName: "SettingsInputSvideo",
                title: "استاندارد ها",
                to: "dashboard/productStandard",
            },
            {
                id: 1321,
                iconName: "SettingsInputSvideo",
                title: "کالا برند",
                to: "dashboard/productBrand",
            },
            {
                id: 1321,
                iconName: "SettingsInputSvideo",
                title: "خدمات ",
                to: "dashboard/productService",
            },
        ],
    },
    {
        id: 2,
        title: "لجستیک",
        to: "",
        iconName: "Psychology",
        submenu: [
            {
                id: 1321,
                iconName: "Home",
                title: "سفارشات آماده اعلام بار",
                to: "dashboard/order_ready_cargo",
            },
            {
                id: 1321,
                iconName: "Home",
                title: "اعلام بار های ثبت شده",
                to: "dashboard/cargoList",
            },
            {
                id: 1321,
                iconName: "SettingsInputSvideo",
                title: "صدور مجوز بارگیری",
                to: "dashboard/ready_to_lading",
            },
            {
                id: 1321,
                iconName: "SettingsInputSvideo",
                title: "صدور مجوز خروج",
                to: "dashboard/ready_to_exit",
            },
        ],
    },
    {
        id: 2,
        title: "حسابداری",
        to: "",
        iconName: "PriceChange",
        submenu: [
            {
                id: 1321,
                iconName: "SelectAll",
                title: "دریافت و پرداخت",
                to: "dashboard/payment",
            },
            {
                id: 1321,
                iconName: "SensorOccupiedOutlined",
                title: "حسابداری دریافت و پرداخت",
                to: "dashboard/payment/accounting ",
            },
        ],
    },
];

export { menuItem };
