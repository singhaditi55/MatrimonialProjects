import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  Grid, 
  Box, 
  Card, 
  IconButton, 
  Chip, 
  Avatar, 
  List, 
  ListItem, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow, 
  Button, 
  Menu, 
  MenuItem 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const activityData = [
  { month: 'Jan', matches: 65, calls: 45, success: 38 },
  { month: 'Feb', matches: 59, calls: 38, success: 30 },
  { month: 'Mar', matches: 80, calls: 60, success: 52 },
  { month: 'Apr', matches: 81, calls: 65, success: 58 },
  { month: 'May', matches: 56, calls: 48, success: 40 },
  { month: 'Jun', matches: 95, calls: 75, success: 68 },
];

const recentMatches = [
  { id: 1, name: 'John & Priya', date: '2 hours ago', status: 'Call Scheduled', avatar1: 'https://randomuser.me/api/portraits/men/1.jpg', avatar2: 'https://randomuser.me/api/portraits/women/1.jpg', compatibility: 95 },
  { id: 2, name: 'Raj & Meera', date: '5 hours ago', status: 'Profile Shared', avatar1: 'https://randomuser.me/api/portraits/men/2.jpg', avatar2: 'https://randomuser.me/api/portraits/women/2.jpg', compatibility: 88 },
  { id: 3, name: 'David & Sarah', date: '1 day ago', status: 'Meeting Fixed', avatar1: 'https://randomuser.me/api/portraits/men/3.jpg', avatar2: 'https://randomuser.me/api/portraits/women/3.jpg', compatibility: 92 },
];

const performanceMetrics = [
  { metric: 'Profile Views', value: 2456, growth: '+15%' },
  { metric: 'Successful Matches', value: 189, growth: '+8%' },
  { metric: 'Active Conversations', value: 67, growth: '+12%' },
  { metric: 'Premium Conversions', value: 45, growth: '+20%' },
];

const matchDistribution = [
  { name: 'Age 25-30', value: 35 },
  { name: 'Age 31-35', value: 40 },
  { name: 'Age 36-40', value: 15 },
  { name: 'Age 40+', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
      <Typography variant="h6" color="white">Activity Overview</Typography>
      <IconButton sx={{ color: 'white' }}>
        <MoreVertIcon />
      </IconButton>
    </Box>
    <Box sx={{ height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={activityData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="month" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip 
            contentStyle={{ 
              background: 'rgba(0,0,0,0.8)', 
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff' 
            }} 
          />
          <Line type="monotone" dataKey="matches" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="calls" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="success" stroke="#ffc658" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  </Card>
);

const RecentMatchesList = () => (
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
    <List>
      {recentMatches.map((match) => (
        <ListItem key={match.id} sx={{ 
          mb: 2, 
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '10px',
          '&:hover': { background: 'rgba(255,255,255,0.1)' }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={match.avatar1} sx={{ mr: 1 }} />
              <Typography color="white" variant="body2">❤</Typography>
              <Avatar src={match.avatar2} sx={{ ml: 1 }} />
            </Box>
            <Box sx={{ ml: 2, flex: 1 }}>
              <Typography color="white" variant="subtitle2">{match.name}</Typography>
              <Typography color="gray" variant="caption">{match.date}</Typography>
            </Box>
            <Chip 
              label={`${match.compatibility}% Match`}
              size="small"
              sx={{ 
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                color: 'white'
              }}
            />
          </Box>
        </ListItem>
      ))}
    </List>
  </Card>
);

const PerformanceMetricsCard = () => (
  <Card sx={{ 
  }}>
    <Typography variant="h6" color="white" gutterBottom>
      Performance Metrics
    </Typography>
    <TableContainer>
      <Table>
        <TableBody>
          {performanceMetrics.map((metric) => (
            <TableRow key={metric.metric} sx={{ '&:last-child td': { border: 0 } }}>
              <TableCell sx={{ color: 'white', border: 'none' }}>
                {metric.metric}
              </TableCell>
              <TableCell align="right" sx={{ color: 'white', border: 'none' }}>
                {metric.value}
              </TableCell>
              <TableCell align="right" sx={{ color: '#4caf50', border: 'none' }}>
                {metric.growth}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
);

const MatchDistributionChart = () => (
  <Card sx={{ 
    p: 3, 
    background: 'rgba(30, 30, 30, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    border: '1px solid rgba(255,255,255,0.1)',
    height: '100%'
  }}>
    <Typography variant="h6" color="white" gutterBottom>
      Match Distribution
    </Typography>
    <Box sx={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={matchDistribution}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {matchDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
    <Box sx={{ mt: 2 }}>
      {matchDistribution.map((entry, index) => (
        <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: COLORS[index % COLORS.length],
              mr: 1
            }}
          />
          <Typography color="white" variant="caption">
            {entry.name}: {entry.value}%
          </Typography>
        </Box>
      ))}
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
      <Button
        component={Link}
        to="/Profileview"
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
      >
        Go to Profile View
      </Button>

      <Button
        component={Link}
        to="/Profileview"
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
      >
        Go to Profile View
      </Button>

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
        <RecentMatchesList />
      </Grid>

      <Grid item xs={12} md={6}>
        <PerformanceMetricsCard />
      </Grid>

      <Grid item xs={12} md={6}>
        <MatchDistributionChart />
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ 
          p: 3, 
          background: 'rgba(30, 30, 30, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          border: '1px solid rgba(255,255,255,0.1)',
          height: '100%'
        }}>
          <Typography variant="h6" color="white" gutterBottom>
            Monthly Success Rate
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="success" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Grid>
    </Grid>
  </motion.div>
);

export default Dashboard;
