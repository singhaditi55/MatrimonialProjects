import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Button, Paper, Box, Avatar, Chip, Divider, List, ListItem, ListItemText, IconButton, LinearProgress, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CallEndIcon from '@mui/icons-material/CallEnd';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import TimerIcon from '@mui/icons-material/Timer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MicIcon from '@mui/icons-material/Mic';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

const CallQualityIndicator = ({ quality }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <SignalCellularAltIcon sx={{ color: quality > 70 ? '#4CAF50' : quality > 30 ? '#FFC107' : '#F44336' }} />
    <LinearProgress 
      variant="determinate" 
      value={quality} 
      sx={{ 
        width: 100,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        '& .MuiLinearProgress-bar': {
          backgroundColor: quality > 70 ? '#4CAF50' : quality > 30 ? '#FFC107' : '#F44336'
        }
      }}
    />
  </Box>
);

const AudioControls = ({ isMuted, setIsMuted, volume, setVolume }) => (
  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <IconButton 
        onClick={() => setIsMuted(!isMuted)}
        sx={{ 
          bgcolor: isMuted ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)',
          '&:hover': { bgcolor: isMuted ? 'rgba(244, 67, 54, 0.2)' : 'rgba(76, 175, 80, 0.2)' }
        }}
      >
        <MicIcon sx={{ color: isMuted ? '#F44336' : '#4CAF50' }} />
      </IconButton>
    </motion.div>
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <IconButton 
        onClick={() => setVolume(volume === 0 ? 100 : 0)}
        sx={{ 
          bgcolor: 'rgba(33, 150, 243, 0.1)',
          '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.2)' }
        }}
      >
        <VolumeUpIcon sx={{ color: '#2196F3' }} />
      </IconButton>
    </motion.div>
  </Box>
);

const CallManagement = () => {
  const { profileId } = useParams();
  const location = useLocation();
  const profileData = location.state?.profileData;
  const [isCallActive, setIsCallActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [statusLogs, setStatusLogs] = useState([]);
  const [callQuality, setCallQuality] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    let timer;
    if (isCallActive) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
        // Simulate random call quality changes
        setCallQuality(prev => Math.max(30, Math.min(100, prev + Math.random() * 10 - 5)));
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

  return (
    <motion.div
      initial={{ x: '-100vw' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: '20px',
              background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
              height: '100%'
            }}
          >
            {profileData && (
              <Box sx={{ mb: 4 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={profileData.avatar}
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        mr: 3,
                        border: '4px solid white',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
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
                </motion.div>
              </Box>
            )}

            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <AnimatePresence>
                {isCallActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <Typography variant="h2" sx={{ 
                      color: '#2ecc71', 
                      mb: 2,
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TimerIcon sx={{ mr: 2, fontSize: 40 }} />
                      {formatDuration(callDuration)}
                    </Typography>
                    <CallQualityIndicator quality={callQuality} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 4 }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  startIcon={<PhoneInTalkIcon />}
                  onClick={() => {
                    setIsCallActive(true);
                    addStatusLog('Call started');
                  }}
                  disabled={isCallActive}
                  sx={{
                    bgcolor: '#2ecc71',
                    '&:hover': { bgcolor: '#27ae60' },
                    borderRadius: '25px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem'
                  }}
                >
                  Start Call
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  startIcon={<CallEndIcon />}
                  onClick={() => {
                    setIsCallActive(false);
                    setIsRecording(false);
                    addStatusLog('Call ended');
                  }}
                  disabled={!isCallActive}
                  sx={{
                    bgcolor: '#e74c3c',
                    '&:hover': { bgcolor: '#c0392b' },
                    borderRadius: '25px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem'
                  }}
                >
                  End Call
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  startIcon={<RadioButtonCheckedIcon />}
                  onClick={() => {
                    setIsRecording(!isRecording);
                    addStatusLog(isRecording ? 'Recording stopped' : 'Recording started');
                  }}
                  disabled={!isCallActive}
                  sx={{
                    bgcolor: isRecording ? '#e74c3c' : '#3498db',
                    '&:hover': { bgcolor: isRecording ? '#c0392b' : '#2980b9' },
                    borderRadius: '25px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem'
                  }}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
              </motion.div>
            </Box>

            <AudioControls 
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              volume={volume}
              setVolume={setVolume}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: '20px',
              background: '#fff',
              height: '100%'
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
                      bgcolor: 'rgba(0,0,0,0.02)', 
                      mb: 1, 
                      borderRadius: '8px'
                    }}>
                      <ListItemText 
                        primary={log.message}
                        secondary={log.time}
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default CallManagement;
