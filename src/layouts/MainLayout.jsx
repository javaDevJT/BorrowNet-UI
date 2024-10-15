import { AppBar, Box, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';



import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'



const MainLayout = () => {

  const navigate = useNavigate();

  const redirectToMyProfilePage = () => {
    navigate('/my-profile');
  };
  
  const redirectToHome = () => {
    navigate('/home');
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  const logOut = () => {
    localStorage.removeItem('jwt');
    redirectToLogin();
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      redirectToLogin();
    }
  }, []); 

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };




  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key='1' disablePadding>
          <ListItemButton onClick={redirectToHome}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
        </ListItem>
        <ListItem key='2' disablePadding>
          <ListItemButton onClick={redirectToMyProfilePage}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary='My Profile' />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key='4' disablePadding>
          <ListItemButton onClick={logOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Log out' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: 'white' }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BorrowNet
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      
      <Container sx={{ bgcolor: "secondary.main" , padding: 2, my: 2 }}>
        <Outlet/>
      </Container>
    </React.Fragment>

  )
}

export default MainLayout