import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Box, TextField, Button, MenuItem, Grid, Typography } from '@mui/material';
import { addAgentData } from '../../../utils/user/agent/DataAgent'; // Make sure to import your addAgentData function

const AddAgent: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
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
    const parsedAddress = parseAddress(address);
    if (!parsedAddress) {
      alert('Invalid address format. Please use "Street, Ward, District, City" format.');
      return;
    }

    const newAgent = {
      name,
      email,
      group: role,
      password,
      street: parsedAddress.street,
      ward: parsedAddress.ward,
      district: parsedAddress.district,
      city: parsedAddress.city,
      phoneNumber,
    };
	console.log('New agent data:', newAgent); 
    try {
      const addedAgent = await addAgentData(newAgent);
      console.log('Agent added successfully:', addedAgent);
      navigate('/dashboard/user/agent');
    } catch (error) {
      console.error('Error adding agent:', error);
    }
  };

  return (
    <Box sx={{ mt: 2, mb: 2, p: 2 }}>
      <Typography variant="h4" component="h2">Add Agent</Typography>
      <Paper elevation={2} sx={{ m: 4, p: 2 }}>
        <Box sx={{ flexGrow: 1, m: 4 }}>
          <Grid container spacing={2}>
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
				<MenuItem value="User">None</MenuItem>
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

export default AddAgent;
