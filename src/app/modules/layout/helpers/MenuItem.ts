const menuItem = [
  // { id: 1, title: "صفحه نخست", to: "/dashboard", iconName: "Home" },
  {
    id: 2,
    title: "سفارشات",
    to: "",
    iconName: "Redeem",
    submenu: [
      {
        id: 1321,
        iconName: "Report",
        title: "ثبت سفارش",
        to: "dashboard/order",
      },
      {
        id: 1321,
        iconName: "RestorePage",
        title: "لیست سفارش",
        to: "dashboard/order/lists",
      },
      {
        id: 1321,
        iconName: "RocketTwoTone",
        title: "تایید سفارش",
        to: "dashboard/order/confirm-list",
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
        iconName: "SavingsRounded",
        title: "مدیریت تامین کنندگان",
        to: "dashboard/suppliers",
      },
    ],
  },
  {
    id: 2,
    title: "کاربران",
    to: "",
    iconName: "PriceChange",
    submenu: [
      {
        id: 1321,
        iconName: "SelectAll",
        title: "کاربران و دسترسی ها",
        to: "dashboard/users",
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
    title: "اعلام بار",
    to: "",
    iconName: "Psychology",
    submenu: [
      {
        id: 1321,
        iconName: "Home",
        title: "مدیریت اعلام بار",
        to: "dashboard/cargo",
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
  
  // {
  //   id: 2,
  //   title: "عمومی",
  //   to: "",
  //   iconName: "Settings",
  //   submenu: [
  //     {
  //       id: 1321,
  //       iconName: "BrandingWatermark",
  //       title: "برند ها",
  //       to: "dashboard/brands",
  //     },
  //     {
  //       id: 1321,
  //       iconName: "TypeSpecimen",
  //       title: "نوع کالا ها",
  //       to: "dashboard/productTypes",
  //     },
  //     {
  //       id: 1321,
  //       iconName: "Balcony",
  //       title: "حالت ها",
  //       to: "dashboard/productState",
  //     },
  //     {
  //       id: 1321,
  //       iconName: "SettingsInputSvideo",
  //       title: "استاندارد ها",
  //       to: "dashboard/productStandard",
  //     },
  //     // {
  //     //   id: 1321,
  //     //   iconName: "SettingsInputSvideo",
  //     //   title: "برند کالا",
  //     //   to: "dashboard/productBrand",
  //     // },
  //   ],
  // },
];

export { menuItem };
