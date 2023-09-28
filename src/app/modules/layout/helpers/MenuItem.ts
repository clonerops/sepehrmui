const menuItem = [
  { id: 1, title: "Dashboard", to: "/dashboard", iconName: "Home" },
  {
    id: 2,
    title: "Customers",
    to: "",
    iconName: "User",
    submenu: [
      {
        id: 1321,
        iconName: "Plus",
        title: "Customer Managment",
        to: "/dashboard/customers",
      },
    ],
  },
  {
    id: 3,
    title: "Dealers",
    to: "",
    iconName: "User",
    submenu: [
      {
        id: 2131,
        iconName: "Plus",
        title: "Dealer Managment",
        to: "/dashboard/dealer",
      },
    ],
  },
  {
    id: 4,
    title: "Users",
    to: "",
    iconName: "User",
    submenu: [
      {
        id: 2131,
        iconName: "Plus",
        title: "User Managment",
        to: "/dashboard/users",
      },
    ],
  },
];

export { menuItem };

// import { useMenuItems } from "../core/_hooks";
//
// const MenuItems = () => {
//   const { data } = useMenuItems();
//   return data;
// };
//
// export default MenuItems();
