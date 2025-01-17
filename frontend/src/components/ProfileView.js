  import React, { useState } from 'react';
import { 
  Grid, Typography, Avatar, Box, Chip, IconButton, FormControl, 
  Select, MenuItem, TextField, InputLabel, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CallManagement from './CallManagement';

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

const ProfileView = () => {
  const [filters, setFilters] = useState({
    gender: 'all',
    ageRange: 'all',
    caste: 'all',
    searchQuery: ''
  });
  const [selectedProfile, setSelectedProfile] = useState(dummyProfiles[0]);

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
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Profile</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Interests</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProfiles.map((profile) => (
                  <TableRow 
                    key={profile.id} 
                    hover
                    selected={selectedProfile?.id === profile.id}
                    onClick={() => setSelectedProfile(profile)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={profile.avatar} sx={{ width: 50, height: 50 }} />
                        <Box>
                          <Typography variant="subtitle1">{profile.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {profile.age} years
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {profile.occupation}<br/>
                        {profile.education}<br/>
                        {profile.caste} - {profile.subCaste}
                      </Typography>
                    </TableCell>
                    <TableCell>{profile.location}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {profile.interests.map((interest, idx) => (
                          <Chip key={idx} label={interest} size="small" />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <CallIcon />
                      </IconButton>
                      <IconButton color="secondary">
                        <EmailIcon />
                      </IconButton>
                      <IconButton color="error">
                        <FavoriteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            <CallManagement profileData={selectedProfile} />
          </Box>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default ProfileView;
