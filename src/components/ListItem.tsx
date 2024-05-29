import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UserIcon from '@mui/icons-material/PersonOutline';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import { ListItem } from '@mui/material';

const MainListItem = () => {
  const [openUser, setOpenUser] = React.useState(false);
  const [openDevice,setOpenDevice] = React.useState(false);


  const hanldeDeviceClick = () =>{
    setOpenDevice(!openDevice);
  }

  const handleUserClick = () => {
    setOpenUser(!openUser);
  };

  return (
    <React.Fragment>
      <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      <ListItemButton onClick={handleUserClick}>
        <ListItemIcon>
          <UserIcon />
        </ListItemIcon>
        <ListItemText primary="User" />
        {openUser ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openUser} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/dashboard/user/agent" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <UserIcon />
              </ListItemIcon>
              <ListItemText primary="List Agents" />
            </ListItemButton>
          </Link>
          <Link to="/dashboard/user/users" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <UserIcon />
              </ListItemIcon>
              <ListItemText primary="List Users" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

      <ListItemButton onClick={hanldeDeviceClick}>
        <ListItemIcon>
          <UserIcon />
        </ListItemIcon>
        <ListItemText primary="Device" />
        {openDevice ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openDevice} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/dashboard/device" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <UserIcon />
              </ListItemIcon>
              <ListItemText primary="List Devices" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>


      <ListItemButton>
        <ListItemIcon>
          <UserIcon />
        </ListItemIcon>
        <ListItemText primary="Revenue" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <UserIcon />
        </ListItemIcon>
        <ListItemText primary="Setup/maintenance schedule" sx={{ whiteSpace: 'normal' }} />
      </ListItemButton>
    </React.Fragment>
  );
};

export default MainListItem;