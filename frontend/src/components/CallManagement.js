import React, { useState, useEffect, useCallback } from 'react';
import { 
  Typography, Button, Paper, Box, Avatar, Divider, List, 
  ListItem, ListItemText, IconButton, LinearProgress, Grid, Chip 
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CallEndIcon from '@mui/icons-material/CallEnd';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MicIcon from '@mui/icons-material/Mic';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonIcon from '@mui/icons-material/Person';

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
        backgroundColor: 'rgba(0,0,0,0.1)',
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

const ProfileDetails = ({ profile }) => (
  <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
      Personal Information
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="body2" color="textSecondary">Gender</Typography>
        <Typography variant="body1">{profile.gender}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2" color="textSecondary">Age</Typography>
        <Typography variant="body1">{profile.age} years</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2" color="textSecondary">Caste</Typography>
        <Typography variant="body1">{profile.caste}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2" color="textSecondary">Sub Caste</Typography>
        <Typography variant="body1">{profile.subCaste}</Typography>
      </Grid>
    </Grid>

    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
      Professional Details
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="body2" color="textSecondary">Education</Typography>
        <Typography variant="body1">{profile.education}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2" color="textSecondary">Occupation</Typography>
        <Typography variant="body1">{profile.occupation}</Typography>
      </Grid>
    </Grid>

    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
      Contact Information
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="body2" color="textSecondary">Phone</Typography>
        <Typography variant="body1">{profile.phone}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2" color="textSecondary">Email</Typography>
        <Typography variant="body1">{profile.email}</Typography>
      </Grid>
    </Grid>

    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
        Interests
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {profile.interests.map((interest, idx) => (
          <Chip key={idx} label={interest} size="small" variant="outlined" />
        ))}
      </Box>
    </Box>
  </Box>
);

const CallManagement = ({ profileData }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [statusLogs, setStatusLogs] = useState([]);
  const [callQuality, setCallQuality] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [showFullProfile, setShowFullProfile] = useState(false);

  const addStatusLog = useCallback((status) => {
    const timestamp = new Date().toLocaleTimeString();
    setStatusLogs(prev => [{
      time: timestamp,
      message: status,
      id: Date.now(),
      profileId: profileData.id
    }, ...prev]);
  }, [profileData.id]);

  useEffect(() => {
    setStatusLogs([]);
    addStatusLog(`Profile selected: ${profileData.name}`);
  }, [profileData, addStatusLog]);

  useEffect(() => {
    let timer;
    if (isCallActive) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
        setCallQuality(prev => Math.max(30, Math.min(100, prev + Math.random() * 10 - 5)));
      }, 1000);
      // Start recording without adding log (will be added in handleStartCall)
      setIsRecording(true);
    } else {
      // Stop recording without adding log (will be added in handleEndCall)
      setIsRecording(false);
    }
    return () => clearInterval(timer);
  }, [isCallActive]);

  const handleStartCall = () => {
    setIsCallActive(true);
    addStatusLog('Call started with automatic recording');
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    addStatusLog('Call ended and recording stopped');
  };

  const handleManualRecording = () => {
    setIsRecording(!isRecording);
    addStatusLog(isRecording ? 'Recording stopped manually' : 'Recording started manually');
  };
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: '20px', mb: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={profileData?.avatar}
                  sx={{ width: 80, height: 80, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">{profileData?.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {profileData?.age} years | {profileData?.location}
                  </Typography>
                </Box>
              </Box>
              <Button
                startIcon={showFullProfile ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                endIcon={<PersonIcon />}
                onClick={() => setShowFullProfile(!showFullProfile)}
                sx={{ borderRadius: 2 }}
              >
                {showFullProfile ? 'Hide Details' : 'View Details'}
              </Button>
            </Box>

            <AnimatePresence>
              {showFullProfile && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProfileDetails profile={profileData} />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                startIcon={<PhoneInTalkIcon />}
                onClick={handleStartCall}
                disabled={isCallActive}
                sx={{
                  bgcolor: '#2ecc71',
                  '&:hover': { bgcolor: '#27ae60' },
                  borderRadius: '25px',
                  px: 4
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
                  bgcolor: '#e74c3c',
                  '&:hover': { bgcolor: '#c0392b' },
                  borderRadius: '25px',
                  px: 4
                }}
              >
                End Call
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                startIcon={<RadioButtonCheckedIcon />}
                onClick={handleManualRecording}
                disabled={!isCallActive}
                sx={{
                  bgcolor: isRecording ? '#e74c3c' : '#3498db',
                  '&:hover': { bgcolor: isRecording ? '#c0392b' : '#2980b9' },
                  borderRadius: '25px',
                  px: 4
                }}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
            </motion.div>
          </Box>

          {isCallActive && (
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h3" sx={{ color: '#2ecc71', mb: 2 }}>
                {formatDuration(callDuration)}
              </Typography>
              <CallQualityIndicator quality={callQuality} />
              {isRecording && (
                <Typography variant="body2" sx={{ color: '#e74c3c', mt: 1 }}>
                  Recording in progress...
                </Typography>
              )}
            </Box>
          )}

          <AudioControls 
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            volume={volume}
            setVolume={setVolume}
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: '20px' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleIcon sx={{ mr: 1, color: '#27ae60' }} />
            Live Status - {profileData.name}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
            <AnimatePresence>
              {statusLogs
                .filter(log => log.profileId === profileData.id)
                .map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ListItem sx={{ bgcolor: 'rgba(0,0,0,0.02)', mb: 1, borderRadius: '8px' }}>
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
  );
};

export default CallManagement;
