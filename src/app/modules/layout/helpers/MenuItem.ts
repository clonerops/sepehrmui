const menuItem = [
  { id: 1, title: "صفحه نخست", to: "/dashboard", iconName: "Home" },
  {
    id: 2,
    title: "سفارشات",
    to: "",
    iconName: "User",
    submenu: [
      {
        id: 1321,
        iconName: "Plus",
        title: "ثبت سفارش",
        to: "dashboard/order",
      },
      {
        id: 1321,
        iconName: "Plus",
        title: "لیست سفارش",
        to: "dashboard/order/lists",
      },
      {
        id: 1321,
        iconName: "Plus",
        title: "تایید سفارش",
        to: "dashboard/order/confirm",
      },
    ],
  },
  {
    id: 2,
    title: "مشتریان",
    to: "",
    iconName: "User",
    submenu: [
      {
        id: 1321,
        iconName: "Plus",
        title: "مدیریت مشتری",
        to: "dashboard/customers",
      },
    ],
  },
  {
    id: 2,
    title: "محصولات",
    to: "",
    iconName: "User",
    submenu: [
      {
        id: 1321,
        iconName: "Plus",
        title: "مدیریت محصولات",
        to: "dashboard/products",
      },
      {
        id: 1321,
        iconName: "Plus",
        title: "مدیریت تامین کنندگان",
        to: "dashboard/suppliers",
      },
      {
        id: 1321,
        iconName: "Plus",
        title: "مدیریت قیمت محصولات",
        to: "dashboard/productPrices",
      },
    ],
  },
  {
    id: 2,
    title: "اعلام بار",
    to: "",
    iconName: "User",
    submenu: [
      {
        id: 1321,
        iconName: "Plus",
        title: "مدیریت اعلام بار",
        to: "dashboard/cargo",
      },
    ],
  },
  {
    id: 2,
    title: "حسابداری",
    to: "",
    iconName: "User",
    submenu: [
      {
        id: 1321,
        iconName: "Plus",
        title: "دریافت و پرداخت",
        to: "dashboard/payment",
      },
      {
        id: 1321,
        iconName: "Plus",
        title: "حسابداری دریافت و پرداخت",
        to: "dashboard/payment/accounting ",
      },
    ],
  },
];

export { menuItem };
