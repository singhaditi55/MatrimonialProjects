import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Button, Paper, Box, Avatar, Chip, Divider, List, ListItem, ListItemText } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CallEndIcon from '@mui/icons-material/CallEnd';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import TimerIcon from '@mui/icons-material/Timer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CallManagement = () => {
  const { profileId } = useParams();
  const location = useLocation();
  const profileData = location.state?.profileData;
  const [isCallActive, setIsCallActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [statusLogs, setStatusLogs] = useState([]);

  useEffect(() => {
    let timer;
    if (isCallActive) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCallActive]);

  const addStatusLog = (status) => {
    const timestamp = new Date().toLocaleTimeString();
    setStatusLogs(prev => [{
      time: timestamp,
      message: status,
      id: Date.now()
    }, ...prev]);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    setCallDuration(0);
    addStatusLog('Call started');
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsRecording(false);
    addStatusLog('Call ended');
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
    addStatusLog(isRecording ? 'Recording stopped' : 'Recording started');
  };

  return (
    <motion.div
      initial={{ x: '-100vw' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Paper
          elevation={3}
          sx={{
            padding: '30px',
            borderRadius: '16px',
            background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
            flex: 2
          }}
        >
          {profileData && (
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={profileData.avatar}
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mr: 3,
                    border: '4px solid #fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                />
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                    {profileData.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    {profileData.age} years | {profileData.location}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip label={profileData.occupation} color="primary" sx={{ mr: 1 }} />
                    <Chip label={profileData.caste} color="secondary" />
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
            </Box>
          )}

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <AnimatePresence>
              {isCallActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Typography variant="h3" sx={{ 
                    color: '#2ecc71', 
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <TimerIcon sx={{ mr: 1 }} />
                    {formatDuration(callDuration)}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                startIcon={<PhoneInTalkIcon />}
                onClick={handleStartCall}
                disabled={isCallActive}
                sx={{
                  backgroundColor: '#2ecc71',
                  '&:hover': { backgroundColor: '#27ae60' },
                  borderRadius: '25px',
                  padding: '10px 30px',
                  boxShadow: '0 4px 12px rgba(46,204,113,0.3)'
                }}
              >
                Start Call
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                startIcon={<CallEndIcon />}
                onClick={handleEndCall}
                disabled={!isCallActive}
                sx={{
                  backgroundColor: '#e74c3c',
                  '&:hover': { backgroundColor: '#c0392b' },
                  borderRadius: '25px',
                  padding: '10px 30px',
                  boxShadow: '0 4px 12px rgba(231,76,60,0.3)'
                }}
              >
                End Call
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                startIcon={<RadioButtonCheckedIcon />}
                onClick={handleRecording}
                disabled={!isCallActive}
                sx={{
                  backgroundColor: isRecording ? '#e74c3c' : '#3498db',
                  borderRadius: '25px',
                  padding: '10px 30px',
                  boxShadow: isRecording ? 
                    '0 4px 12px rgba(231,76,60,0.3)' : 
                    '0 4px 12px rgba(52,152,219,0.3)'
                }}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
            </motion.div>
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            borderRadius: '16px',
            background: '#f8f9fa',
            flex: 1,
            minHeight: '400px'
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: '#2c3e50'
          }}>
            <CheckCircleIcon sx={{ mr: 1, color: '#27ae60' }} />
            Live Status
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List sx={{ maxHeight: '500px', overflow: 'auto' }}>
            <AnimatePresence>
              {statusLogs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ListItem sx={{ 
                    bgcolor: 'white', 
                    mb: 1, 
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <ListItemText 
                      primary={log.message}
                      secondary={log.time}
                      primaryTypographyProps={{ fontWeight: 500 }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default CallManagement;
