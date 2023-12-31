// import { useState } from "react";
// import {
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
//   List,
//   Box,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { IconComponent } from "../../../../_cloner/components/DynamicIcon";
// import ExpandLessIcon from '@mui/icons-material/ExpandLess'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// const MenuItems = (props: { menuItems: any }) => {
//   const [openSubMenu, setOpenSubMenu] = useState(
//     new Array(props?.menuItems?.length).fill(false)
//   );

//   const toggleSubMenu = (index: number) => {
//     const updatedOpenSubMenu = openSubMenu.map((item, i) => i === index ? !item : false);
//     setOpenSubMenu(updatedOpenSubMenu);
//   };

//   return props?.menuItems?.map((menuItem: any, index: number) => {
//     if (menuItem.submenu) {
//       return (
//         <Box
//           component="div"
//           key={`${menuItem.id}-${index}`}  
//           // key={menuItem.id}
//           className="cursor-pointer pr-4"
//         >
//           <ListItem className={`hover:bg-white hover:rounded-tr-full hover:rounded-br-full hover:text-[#272862] ${openSubMenu[index] && "text-[#272862] font-bold " } ${openSubMenu[index] && "bg-white rounded-tr-3xl rounded-br-3xl " }`} onClick={() => toggleSubMenu(index)}>
//             <ListItemIcon className="text-white hover:!text-[#272862] font-bold">
//               <Box component="div" className="text-white hover:!text-[#272862] font-bold">
//                 <IconComponent className={`hover:!text-[#272862] font-bold`} iconName={menuItem.iconName} />
//               </Box>
//             </ListItemIcon>
//             <ListItemText className={``} primary={menuItem.title} />
//             {openSubMenu[index] ? (
//               <ExpandLessIcon />
//             ) : (
//               <ExpandMoreIcon />
//             )}
//           </ListItem>
//                      <Collapse
//               key={menuItem.id}
//               in={openSubMenu[index]}
//               timeout="auto"
//               unmountOnExit
//             >
//               <List component="div" disablePadding>
//                 <Link
//                   id="RouterLink"
//                   className="text-gray-400"
//                   to={`${menuItem.to}`}
//                 >
//                   <MenuItems menuItems={menuItem.children} />
//                 </Link>
//               </List>
//             </Collapse>

//           {/* <Collapse
//             // key={menuItem.id}
//             key={`${menuItem.id}-${index}`}  
//             in={openSubMenu[index]}
//             timeout="auto"
//             unmountOnExit
//           >
//             <List component="div" disablePadding>
//               <Link
//                 id="RouterLink"
//                 className={`text-gray-300`}
//                 to={`${menuItem.to}`}
//               >
//                 <MenuItems menuItems={menuItem.submenu} />
//               </Link>
//             </List>
//           </Collapse> */}
//         </Box>
//       );
//     } else {
//       return (
//         <Link id="RouterLink" key={menuItem.id} to={`${menuItem.to}`}>
//           <ListItem className="ml-4" key={menuItem.id}>
//             <ListItemIcon className="text-white">
//               <Box component="div" className="text-white">
//                 <IconComponent iconName={menuItem.icon} />
//               </Box>
//             </ListItemIcon>
//             <ListItemText primary={menuItem.description} />
//           </ListItem>
//         </Link>
//     );
//     }
//   });
// }
// export default MenuItems;


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
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { IconComponent } from "../../../../_cloner/components/DynamicIcon";

const MenuItems = (props: { menuItems: any }) => {
  const [openSubMenu, setOpenSubMenu] = useState(
    new Array(props?.menuItems?.length).fill(false),
  );
  const toggleSubMenu = (index: number) => {
    const updatedOpenSubMenu = [...openSubMenu];
    updatedOpenSubMenu[index] = !updatedOpenSubMenu[index];
    setOpenSubMenu(updatedOpenSubMenu);
  };

  return props?.menuItems?.map((menuItem: any, index: number) => {
    if (menuItem.children?.length > 0) {
      return (
        <Box component="div" key={menuItem.id} className="cursor-pointer">
         <ListItem className={`hover:bg-white hover:rounded-tr-full hover:rounded-br-full hover:text-[#272862] ${openSubMenu[index] && "text-[#272862] font-bold " } ${openSubMenu[index] && "bg-white rounded-tr-3xl rounded-br-3xl " }`} onClick={() => toggleSubMenu(index)}>
             <ListItemIcon className="text-white hover:!text-[#272862] font-bold">
              <Box component="div" className="text-[#fcc615] hover:!text-[#272862] font-bold">
                <IconComponent iconName={menuItem.icon} />
              </Box>
            </ListItemIcon>
            <ListItemText primary={menuItem.title} />
            {openSubMenu[index] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            key={menuItem.id}
            in={openSubMenu[index]}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <Link
                id="RouterLink"
                className="text-gray-400"
                to={`${menuItem.to}`}
              >
                <MenuItems menuItems={menuItem.children} />
              </Link>
            </List>
          </Collapse>
        </Box>
      );
    } else {
      return (
        <Link id="RouterLink" key={menuItem.id} to={`${menuItem.to}`}>
          <ListItem className="!ml-2" key={menuItem.id}>
            <ListItemIcon className="text-white">
              <Box component="div" className="text-white">
                <IconComponent className="!w-4 !h-4" iconName={menuItem.icon} />
              </Box>
            </ListItemIcon>
            <ListItemText primary={menuItem.description} />
          </ListItem>
        </Link>
      );
    }
  });

};

export default MenuItems;
