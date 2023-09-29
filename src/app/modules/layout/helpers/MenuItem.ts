const menuItem = [
  { id: 1, title: "صفحه نخست", to: "/dashboard", iconName: "Home" },
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
        to: "dashboard/order/confirm",
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
    ],
  },
  {
    id: 2,
    title: "محصولات",
    to: "",
    iconName: "RunCircle",
    submenu: [
      {
        id: 1321,
        iconName: "Satellite",
        title: "مدیریت محصولات",
        to: "dashboard/products",
      },
      {
        id: 1321,
        iconName: "SavingsRounded",
        title: "مدیریت تامین کنندگان",
        to: "dashboard/suppliers",
      },
      {
        id: 1321,
        iconName: "ScheduleSendSharp",
        title: "مدیریت قیمت محصولات",
        to: "dashboard/productPrices",
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
];

export { menuItem };
