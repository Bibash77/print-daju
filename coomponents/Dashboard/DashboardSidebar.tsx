import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { FaProductHunt } from "react-icons/fa";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import {FcImageFile} from 'react-icons/fc'
import {GrAdd} from 'react-icons/gr'
import { useRouter } from "next/router";

export default function DashboardSidebar() {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          CLOUD PRINT
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <FaProductHunt />
        </ListItemIcon>
        <ListItemText primary="Product" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              router.push("/dashboard/product/add");
            }}
          >
            <ListItemIcon>
              <GrAdd />
            </ListItemIcon>
            <ListItemText primary="Add" />
          </ListItemButton>


          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              router.push("/dashboard/product");
            }}
          >
            <ListItemIcon>
              <FcImageFile />
            </ListItemIcon>
            <ListItemText primary="All Products" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
