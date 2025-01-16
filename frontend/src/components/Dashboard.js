import React from 'react';
import { Typography, Paper, Grid, Box, CircularProgress, Card, IconButton, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', matches: 65 },
  { name: 'Feb', matches: 59 },
  { name: 'Mar', matches: 80 },
  { name: 'Apr', matches: 81 },
  { name: 'May', matches: 56 },
  { name: 'Jun', matches: 95 },
];

const StatCard = ({ title, value, icon, color, percentage }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Paper
      elevation={3}
      sx={{
        padding: '20px',
        background: `linear-gradient(45deg, ${color}40 30%, ${color}20 90%)`,
        color: '#fff',
        borderRadius: '15px',
        height: '100%',
        border: `1px solid ${color}30`,
        backdropFilter: 'blur(10px)'
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>{value}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>{title}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: percentage > 0 ? '#4caf50' : '#f44336' }}>
            {percentage > 0 ? '+' : ''}{percentage}%
          </Typography>
        </Box>
      </Box>
    </Paper>
  </motion.div>
);

const RecentActivity = () => (
  <Card sx={{ 
    p: 2, 
    background: 'rgba(30, 30, 30, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  }}>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h6" color="white">Recent Activity</Typography>
      <IconButton sx={{ color: 'white' }}>
        <MoreVertIcon />
      </IconButton>
    </Box>
    <Box sx={{ height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip 
            contentStyle={{ 
              background: 'rgba(0,0,0,0.8)', 
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff' 
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="matches" 
            stroke="#8884d8" 
            strokeWidth={2}
            dot={{ fill: '#8884d8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  </Card>
);

const Dashboard = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    style={{
      minHeight: '100vh',
      background: '#121212',
      padding: '20px',
      borderRadius: '20px'
    }}
  >
    <Typography variant="h4" sx={{ color: '#fff', mb: 4, fontWeight: 'bold' }}>
      Dashboard Overview
    </Typography>

    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
        <StatCard 
          title="Total Profiles" 
          value="156" 
          icon={<PersonIcon sx={{ fontSize: 40 }} />}
          color="#2196f3"
          percentage={12}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <StatCard 
          title="Active Calls" 
          value="23" 
          icon={<CallIcon sx={{ fontSize: 40 }} />}
          color="#f50057"
          percentage={-5}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <StatCard 
          title="Matches Made" 
          value="45" 
          icon={<FavoriteIcon sx={{ fontSize: 40 }} />}
          color="#9c27b0"
          percentage={8}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <StatCard 
          title="Success Rate" 
          value="78%" 
          icon={<TrendingUpIcon sx={{ fontSize: 40 }} />}
          color="#4caf50"
          percentage={15}
        />
      </Grid>

      <Grid item xs={12}>
        <RecentActivity />
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ 
          p: 3, 
          background: 'rgba(30, 30, 30, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Typography variant="h6" color="white" gutterBottom>
            Recent Matches
          </Typography>
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />
          {/* Add recent matches list here */}
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ 
          p: 3, 
          background: 'rgba(30, 30, 30, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Typography variant="h6" color="white" gutterBottom>
            Performance Metrics
          </Typography>
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />
          {/* Add performance metrics here */}
        </Card>
      </Grid>
    </Grid>
  </motion.div>
);

export default Dashboard;
