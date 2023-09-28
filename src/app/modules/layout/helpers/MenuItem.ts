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
];

export { menuItem };
