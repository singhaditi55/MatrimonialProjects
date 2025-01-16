import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Avatar, Box, Chip, IconButton, FormControl, Select, MenuItem, TextField, InputLabel } from '@mui/material';
import { motion } from 'framer-motion';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';

const dummyProfiles = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
    gender: 'Male',
    caste: 'Brahmin',
    subCaste: 'Iyer',
    location: 'New York',
    education: 'MBA',
    occupation: 'Software Engineer',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    interests: ['Reading', 'Traveling', 'Photography'],
    phone: '+1-234-567-8901',
    email: 'john.doe@email.com'
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    age: 27,
    gender: 'Female',
    caste: 'Kshatriya',
    subCaste: 'Rajput',
    location: 'London',
    education: 'PhD',
    occupation: 'Data Scientist',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    interests: ['Yoga', 'Cooking', 'Art'],
    phone: '+44-789-012-3456',
    email: 'sarah.w@email.com'
  },
  {
    id: 3,
    name: 'Raj Patel',
    age: 32,
    gender: 'Male',
    caste: 'Vaishya',
    subCaste: 'Agarwal',
    location: 'Mumbai',
    education: 'B.Tech',
    occupation: 'Business Analyst',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    interests: ['Cricket', 'Music', 'Meditation'],
    phone: '+91-987-654-3210',
    email: 'raj.p@email.com'
  },
  {
    id: 4,
    name: 'Priya Sharma',
    age: 28,
    gender: 'Female',
    caste: 'Brahmin',
    subCaste: 'Iyengar',
    location: 'Bangalore',
    education: 'M.Tech',
    occupation: 'Product Manager',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    interests: ['Dancing', 'Writing', 'Fitness'],
    phone: '+91-876-543-2109',
    email: 'priya.s@email.com'
  }
];

const FilterSection = ({ filters, setFilters }) => (
  <Box sx={{ mb: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            value={filters.gender}
            onChange={(e) => setFilters({...filters, gender: e.target.value})}
            label="Gender"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel>Age Range</InputLabel>
          <Select
            value={filters.ageRange}
            onChange={(e) => setFilters({...filters, ageRange: e.target.value})}
            label="Age Range"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="20-25">20-25</MenuItem>
            <MenuItem value="26-30">26-30</MenuItem>
            <MenuItem value="31-35">31-35</MenuItem>
            <MenuItem value="36+">36+</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel>Caste</InputLabel>
          <Select
            value={filters.caste}
            onChange={(e) => setFilters({...filters, caste: e.target.value})}
            label="Caste"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Brahmin">Brahmin</MenuItem>
            <MenuItem value="Kshatriya">Kshatriya</MenuItem>
            <MenuItem value="Vaishya">Vaishya</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label="Search by name"
          value={filters.searchQuery}
          onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
        />
      </Grid>
    </Grid>
  </Box>
);

const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();

  const handleCallClick = () => {
    navigate(`/call-management/${profile.id}`, { 
      state: { profileData: profile } 
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card sx={{ 
        borderRadius: '16px', 
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)'
      }}>
        <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
          <Avatar
            src={profile.avatar}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 120,
              height: 120,
              border: '4px solid white'
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            {profile.name}, {profile.age}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
            <Chip label={profile.gender} color="primary" size="small" />
            <Chip label={profile.caste} color="secondary" size="small" />
            <Chip label={profile.location} variant="outlined" size="small" />
          </Box>
          <Typography variant="body2" align="center" gutterBottom>
            {profile.occupation} | {profile.education}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <IconButton color="primary" onClick={handleCallClick}>
              <CallIcon />
            </IconButton>
            <IconButton color="secondary">
              <EmailIcon />
            </IconButton>
            <IconButton color="error">
              <FavoriteIcon />
            </IconButton>
          </Box>
          <Box sx={{ mt: 2 }}>
            {profile.interests.map((interest, idx) => (
              <Chip
                key={idx}
                label={interest}
                size="small"
                sx={{ m: 0.5 }}
                variant="outlined"
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProfileView = () => {
  const [filters, setFilters] = useState({
    gender: 'all',
    ageRange: 'all',
    caste: 'all',
    searchQuery: ''
  });

  const filterProfiles = (profiles) => {
    return profiles.filter(profile => {
      const matchesGender = filters.gender === 'all' || profile.gender === filters.gender;
      const matchesCaste = filters.caste === 'all' || profile.caste === filters.caste;
      
      let matchesAge = true;
      if (filters.ageRange !== 'all') {
        const [min, max] = filters.ageRange.split('-').map(num => parseInt(num));
        matchesAge = profile.age >= min && (max ? profile.age <= max : true);
      }

      const matchesSearch = profile.name.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return matchesGender && matchesCaste && matchesAge && matchesSearch;
    });
  };

  const filteredProfiles = filterProfiles(dummyProfiles);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FilterSection filters={filters} setFilters={setFilters} />
      <Grid container spacing={3}>
        {filteredProfiles.map((profile) => (
          <Grid item xs={12} sm={6} md={4} key={profile.id}>
            <ProfileCard profile={profile} />
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default ProfileView;
  
  