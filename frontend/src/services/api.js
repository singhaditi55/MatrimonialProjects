import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchProfiles = async () => {
  try {
    const response = await axios.get(`${API_URL}/profiles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

export const createProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_URL}/profiles`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
};
