import { AppBar, Box, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';
import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation} from 'react-router-dom';
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

const MainLayout = () => {

  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectToMyProfilePage = () => {
    navigate('/my-profile');
  };
  
  const redirectToMyChatsPage = () => {
    navigate('/my-chats');
  };

  const redirectToHome = () => {
    navigate('/home');
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  const redirectToCreatePostingPage = () => {
    navigate('/new-post');
  };

  const redirectToPublicProfileSelectPage = () => {
    navigate('/profiles-public');
  };

  const redirectToSettingsPage = () => {
    navigate('/settings');
  }

  const logOut = () => {
    signOut();
    redirectToLogin();
  };

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/') {
      navigate('/home');  // Redirect to home if authenticated
    } else if (!isAuthenticated){
      navigate('/login');  // Redirect to login if not authenticated
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
        <ListItem key='7' disablePadding>
          <ListItemButton onClick={redirectToMyChatsPage}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary='My Chats' />
          </ListItemButton>
        </ListItem>
          <ListItem key='3' disablePadding>
            <ListItemButton onClick={redirectToPublicProfileSelectPage}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary='Public Profiles' />
            </ListItemButton>
        </ListItem>
        <ListItem key='4' disablePadding>
          <ListItemButton onClick={redirectToCreatePostingPage}>
            <ListItemIcon>
              <AddToPhotosIcon />
            </ListItemIcon>
            <ListItemText primary='New Posting' />
          </ListItemButton>
        </ListItem>
        <ListItem key='5' disablePadding>
          <ListItemButton onClick={redirectToSettingsPage}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key='6' disablePadding>
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