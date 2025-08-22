import React, { useState } from 'react';
import { 
  Box, CssBaseline, Drawer, Toolbar, List, 
  Typography, Divider, IconButton, ListItem, 
  ListItemButton, ListItemIcon, ListItemText 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';
import AdminTopbar from './AppTopbar';

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/adminhome' },
    { text: 'Categories', icon: <CategoryIcon />, path: '/addcategory' },
    { text: 'Add Product', icon: <InventoryIcon />, path: '/addproduct' },
    { text: 'View Products', icon: <InventoryIcon />, path: '/viewproduct' },
    { text: 'Change Password', icon: <SettingsIcon />, path: '/adminchangepass' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('aid');
    localStorage.removeItem('aname');
    localStorage.removeItem('aemail');
    navigate('/adminlogin');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* AdminTopbar is called here */}
      <AdminTopbar open={open} toggleDrawer={toggleDrawer} />
      
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: open ? 'block' : 'none',
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        
        <List component="nav">
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          
          <Divider sx={{ my: 1 }} />
          
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          transition: 'width 0.3s',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;