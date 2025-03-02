import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { CssBaseline, Container, Typography, AppBar, Toolbar, Button, Box, IconButton, Avatar, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CallIcon from '@mui/icons-material/Call';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import Dashboard from './components/Dashboard';
import ProfileView from './components/ProfileView';
import CallManagement from './components/CallManagement';

const NavButton = ({ to, icon, label }) => (
  <Button
    component={Link}
    to={to}
    color="inherit"
    sx={{
      mx: 1,
      borderRadius: '12px',
      padding: '8px 16px',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        transform: 'translateY(-2px)'
      }
    }}
    startIcon={icon}
  >
    {label}
  </Button>
);

const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <Router>
    <CssBaseline />
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
    }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          background: 'rgba(26, 26, 26, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  mr: 4,
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold'
                }}
              >
                Matchmaking Pro
              </Typography>
            </motion.div>

            {/* <NavButton to="/" icon={<DashboardIcon />} label="Dashboard" /> */}
            <NavButton to="/" icon={<PeopleIcon />} label="Profiles" />
            {/* <NavButton to="/call-management" icon={<CallIcon />} label="Calls" /> */}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Avatar 
              sx={{ 
                cursor: 'pointer',
                border: '2px solid rgba(255,255,255,0.2)',
                '&:hover': {
                  border: '2px solid rgba(255,255,255,0.5)'
                }
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Container 
        maxWidth="xl" 
        sx={{ 
          pt: 4,
          pb: 8
        }}
      >
        <PageTransition>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Profileview" element={<ProfileView />} />
            <Route path="/call-management" element={<CallManagement />} />
            <Route path="/call-management/:profileId" element={<CallManagement />} />
          </Routes>
        </PageTransition>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Box 
          component="footer" 
          sx={{ 
            textAlign: 'center',
            py: 3,
            color: 'rgba(255,255,255,0.5)',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Typography variant="body2">
            © 2024 Matchmaking Pro. All rights reserved.
          </Typography>
        </Box>
      </motion.div>
    </Box>
  </Router>
);

export default App;
