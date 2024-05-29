// /path/to/EditAgent.tsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Paper, Box, TextField, Button, MenuItem, Grid, Typography } from '@mui/material';
import { updateUserData, getRegionUser } from '../../../utils/user/users/DataUser';
import { User } from '../../../types/user';
import { Region } from '../../../types/region';

const EditAgent: React.FC = () => {
  //const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const user: User | undefined = location.state?.user;

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.group || '');
  const [password, setPassword] = useState(user?.password || '');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');

  useEffect(() => {
    if (!user) {
      navigate('/dashboard/user/users'); // Redirect if no user is found
    }else{
      const fetchRegionData = async () => {
        try {
          const regionData: Region[] = await getRegionUser(user.id);
          const fullAddresses = regionData.map((region: Region) => 
            `${region.street}, ${region.ward}, ${region.district}, ${region.city}`
          ).join(' | '); 
          setAddress(fullAddresses);
        } catch (error) {
          console.error('Error fetching region data:', error);
        }
      };

      fetchRegionData();
    }
  }, [user, navigate]);

  const handleCancel = () => {
    navigate(-1); 
  };

  const parseAddress = (address: string) => {
    const regex = /^(.*),\s*(.*),\s*(.*),\s*(.*)$/;
    const match = address.match(regex);
    if (match) {
      return {
        street: match[1].trim(),
        ward: match[2].trim(),
        district: match[3].trim(),
        city: match[4].trim()
      };
    }
    return null;
  };

  const handleSave = async () => {
    if (!user) {
      console.error('User data is missing');
      return;
    }

    const parsedAddress = parseAddress(address);
    console.log(parsedAddress);
    if (!parsedAddress) {
      alert('Invalid address format. Please use "Street, Ward, District, City" format.');
      return;
    }

    const updatedUser = {
      name,
      email,
      group: role,
      password,
      street: parsedAddress.street,
      ward: parsedAddress.ward,
      district: parsedAddress.district,
      city: parsedAddress.city,
      phoneNumber
    };

    console.log(updatedUser);

    try {
      await updateUserData(user.id,updatedUser);
      navigate(-1); 
    } catch (error) {
      console.error('Error updating agent data:', error);
    }
  };

  return (
    <Box sx={{ mt: 2, mb: 2, p: 2 }}>
      <Typography variant="h4" component="h2">Update User</Typography>
      <Paper elevation={2} sx={{ m: 4, p: 2 }}>
        <Box sx={{ flexGrow: 1, m: 4 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                variant="outlined"
                select
                fullWidth
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Technican">Technican</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="error" onClick={handleCancel} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button variant="contained" color="success" onClick={handleSave}>
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditAgent;
