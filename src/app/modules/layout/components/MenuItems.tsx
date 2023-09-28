import { useState } from "react";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    List,
    Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { IconComponent } from "../../../../_helpers/components/DynamicIcon";
import { IMenuItem } from "../core/_models";

const MenuItems = (props: { menuItems: any }) => {
    const [openSubMenu, setOpenSubMenu] = useState(
        new Array(props?.menuItems?.length).fill(false)
    );

  // const toggleSubMenu = (index: number) => {
  //     const updatedOpenSubMenu = [...openSubMenu];
  //     updatedOpenSubMenu[index] = !updatedOpenSubMenu[index];
  //     setOpenSubMenu(updatedOpenSubMenu);
  // };

  // return props?.menuItems?.map((menuItem: any, index: number) => {
  // if (menuItem.submenu) {
  //     return (
  //         <Box
  //             component="div"
  //             key={menuItem.id}
  //             className="cursor-pointer"
  //         >
  //             <ListItem onClick={() => toggleSubMenu(index)}>
  //                 <ListItemIcon className="text-white">
  //                     <IconComponent iconName={"Home"} />
  //                 </ListItemIcon>
  //                 <ListItemText primary={menuItem.title} />
  //                 {openSubMenu[index] ? (
  //                     <ExpandLessIcon />
  //                 ) : (
  //                     <ExpandMoreIcon />
  //                 )}
  //             </ListItem>
  //             <Collapse
  //                 key={menuItem.id}
  //                 in={openSubMenu[index]}
  //                 timeout="auto"
  //                 unmountOnExit
  //             >
  //                 <List component="div" disablePadding>
  //                     <Link
  //                         id="RouterLink"
  //                         className="text-gray-400"
  //                         to={`${menuItem.to}`}
  //                     >
  //                         <MenuItems menuItems={menuItem.submenu} />
  //                     </Link>
  //                 </List>
  //             </Collapse>
  //         </Box>
  //     );
  // } else {
  //     return (
  //         <Link id="RouterLink" key={menuItem.id} to={`${menuItem.to}`}>
  //             <ListItem key={menuItem.id}>
  //                 <ListItemIcon className="text-white">
  //                     <Box component="div" className="text-white">
  //                         <IconComponent iconName={"Home"} />
  //                     </Box>
  //                 </ListItemIcon>
  //                 <ListItemText primary={menuItem.title} />
  //             </ListItem>
  //         </Link>
  //     );
  // }
  // });
  // const toggleSubMenu = (index: number) => {
  //   const updatedOpenSubMenu = [...openSubMenu];
  //   updatedOpenSubMenu[index] = !updatedOpenSubMenu[index];
  //   setOpenSubMenu(updatedOpenSubMenu);
  // };

  return (
    <>
      {props?.menuItems?.map((menuItem: any, index: number) => {
        // if (menuItem.submenu) {
        //   return (
        //     <Box component="div" key={menuItem.id} className="cursor-pointer">
        //       <ListItem onClick={() => toggleSubMenu(index)}>
        //         <ListItemIcon className="text-white">
        //           {/* <DynamicIcon iconName={menuItem.iconName} /> */}
        //         </ListItemIcon>
        //         <ListItemText primary={menuItem.title} />
        //         {openSubMenu[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        //       </ListItem>
        //       <Collapse
        //         key={menuItem.id}
        //         in={openSubMenu[index]}
        //         timeout="auto"
        //         unmountOnExit
        //       >
        //         <List component="div" disablePadding>
        //           <Link
        //             id="RouterLink"
        //             className="text-gray-400"
        //             to={`${menuItem.to}`}
        //           >
        //             {/*<MenuItems menuItems={menuItem?.submenu} />*/}
        //           </Link>
        //         </List>
        //       </Collapse>
        //     </Box>
        //   );
        // } else {
        return (
          <Link id="RouterLink" key={menuItem.id} to={`${menuItem.to}`}>
            <ListItem key={menuItem.id}>
              <ListItemIcon className="text-white">
                <Box component="div" className="text-white">
                  <IconComponent iconName={"Home"} />
                </Box>
              </ListItemIcon>
              <ListItemText primary={menuItem.title} />
            </ListItem>
          </Link>
        );
      })}
    </>
  );
};

export default MenuItems;
