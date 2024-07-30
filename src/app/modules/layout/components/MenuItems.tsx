import { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { IconComponent } from "../../../../_cloner/components/DynamicIcon";

const MenuItems = ({ menuItems }: { menuItems: any }) => {
  const [openSubMenu, setOpenSubMenu] = useState<boolean[]>(
    new Array(menuItems.length).fill(false)
  );
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(
    null
  );

  const toggleSubMenu = (index: number) => {
    const updatedOpenSubMenu = [...openSubMenu];
    for (let i = 0; i < updatedOpenSubMenu.length; i++) {
      if (i !== index) {
        updatedOpenSubMenu[i] = false;
      }
    }
    updatedOpenSubMenu[index] = !updatedOpenSubMenu[index];
    setOpenSubMenu(updatedOpenSubMenu);
    setActiveMenuIndex(openSubMenu[index] ? null : index);
  };

  return (
    <List>
      {menuItems.map((menuItem: any, index: number) => {
        const isActive = activeMenuIndex === index;
        if (menuItem.children?.length > 0) {
          return (
            <div key={menuItem.id} className="cursor-pointer">
              <ListItem
                // className={`hover:bg-white hover:rounded-tr-full ${
                //   isActive && "text-red-500"
                // } hover:rounded-br-full hover:text-[#272862] ${
                //   openSubMenu[index] && "text-[#272862] font-bold "
                // } ${
                //   openSubMenu[index] &&
                //   "bg-white rounded-tr-3xl rounded-br-3xl "
                // }`}
                className={`hover:bg-white hover:rounded-tr-full ${
                  isActive && "text-red-500"
                } hover:rounded-br-full hover:text-[#272862] ${
                  openSubMenu[index] && "text-[#272862] font-bold "
                }`}
                onClick={() => toggleSubMenu(index)}
              >
                <ListItemIcon className="text-white hover:!text-[#272862] font-bold">
                  <div className="text-[#fcc615] hover:!text-[#272862] font-bold">
                    <IconComponent iconName={menuItem.icon} />
                  </div>
                </ListItemIcon>
                <ListItemText primary={menuItem.title} />
                {openSubMenu[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={openSubMenu[index]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <MenuItems menuItems={menuItem.children} />
                </List>
              </Collapse>
            </div>
          );
        } else {
          return (
            <Link id="RouterLink" key={menuItem.id} to={`${menuItem.to}`}>
              <ListItem
                className={`!ml-2 ${isActive ? "bg-yellow-500" : ""}`}
                key={menuItem.id}
              >
                <ListItemIcon className="text-gray">
                  <div className="text-white">
                    <IconComponent
                      className="!w-4 !h-4"
                      iconName={menuItem.icon}
                    />
                  </div>
                </ListItemIcon>
                <ListItemText primary={menuItem.description} className="text-gray-400" />
              </ListItem>
            </Link>
          );
        }
      })}
    </List>
  );
};

export default MenuItems;
