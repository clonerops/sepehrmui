const menuItem = [
  { id: 1, title: "صفحه نخست", to: "/dashboard", iconName: "Home" },
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
];

export { menuItem };
