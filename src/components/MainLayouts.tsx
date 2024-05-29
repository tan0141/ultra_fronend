import React from 'react';
import { Typography, Box, Drawer, Toolbar, Container, Grid, Link, List, IconButton, CssBaseline } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import UserList from './user/User/UserList';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import MainListItem from './ListItem';
import AgentRoutes from '../utils/user/agent/AgentRouter';
import UsersRoutes from '../utils/user/users/UsersRouter';
import DeviceRoutes from '../utils/device/DeviceRoutes';


function Copyright(props: any) {
  return (
    <Typography variant='body2' color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color='inherit' component={RouterLink} to="/">
        Combros
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface MainLayoutProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MainLayoutProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#3949ab',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ThemeDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      height: '100vh',
      backgroundColor: '#2c387e', // Dark blue background color
      color: '#fff', // White text color
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label={open ? "close drawer" : "open drawer"}
            onClick={toggleDrawer}
            sx={{
              marginRight: '15px',
            }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >

          </Typography>
          <IconButton color="inherit">
          </IconButton>
        </Toolbar>
      </AppBar>
      <ThemeDrawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
            height: 100,
          }}
        >
          {open && (
            <Box
              sx={{
                marginTop: 4,
                width: 240,
                height: 100,
                borderRadius: 2,
                backgroundColor: '#3949ab',
                display: 'flex',
                justifyContent: 'center',
                alignItem: 'center,'
              }}
            >
              <Typography variant="h6" sx={{alignItems:"center"}}>
                Plugin TWM
              </Typography>
            </Box>
          )}
        </Toolbar>
        <List component="nav" sx={{ marginTop: 2 }}>
          {MainListItem()}
        </List>
      </ThemeDrawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar />
        <Container maxWidth={false} sx={{ flexGrow: 1, padding: 0, margin: 0 }}>
            <Routes>
              <Route path="user/agent/*" element={<AgentRoutes />} />
              <Route path="user/users/*" element={<UsersRoutes />} />
              <Route path="device/*" element={<DeviceRoutes/>} />
            </Routes>
        </Container>
        <Box component="footer" sx={{
          p: 2, mt: 'auto', backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
        }}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
}
