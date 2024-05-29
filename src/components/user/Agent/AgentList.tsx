// /path/to/AgentList.tsx

import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, Button, Stack, Chip, IconButton,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import CustomNoRowsOverlay from '../../../utils/CustomNoRowsOverlay';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { User } from '../../../types/user';
import { getAgentData, deleteAgentData } from '../../../utils/user/agent/DataAgent';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AgentList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAgentData();
      setUsers(data);
    };

    fetchData();
  }, []);

  const handleAddAgent = () => {
    navigate('/dashboard/user/agent/add');
  };

  const handleEditClick = (user: User) => {
    navigate(`/dashboard/user/agent/editAgent/${user.id}`, { state: { user } });
  };
  
  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteAgentData(selectedUser.id);
        setUsers(users.filter(user => user.id !== selectedUser.id));
      } catch (error) {
        console.error('Error deleting agent data:', error);
      } finally {
        setOpen(false);
        setSelectedUser(null);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 171 },
    { field: 'email', headerName: 'Email', width: 171 },
    {
      field: 'address', headerName: 'Address', width: 242,
      valueGetter: (params) => {
        const { street, ward, district, city } = params.row;
        return [street, ward, district, city].includes(null) ? "" : `${street}, ${ward}, ${district}, ${city}`;
      }
    },
    { field: 'group', headerName: 'Group', width: 171 },
    {
      field: 'active', headerName: 'Status', width: 171,
      renderCell: (params) => params.value === 1 ? (
        <Chip
          label="Active"
          avatar={<FiberManualRecordSharpIcon style={{ width: "14px", color: '#57e257' }} />}
          sx={{
            backgroundColor: '#8aff8a',
            color: '#2f8e2f',
            fontWeight: 'bold',
            borderRadius: '20px',
            padding: '0 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : ''
    },
    {
      field: 'action', headerName: 'Action', width: 171,
      renderCell: (params) => (
        <div>
          <IconButton aria-label="edit" onClick={() => handleEditClick(params.row as User)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDeleteClick(params.row as User)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )
    },
  ];

  return (
    <Paper elevation={2} sx={{ mt: 4, mb: 4, p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 2 }}>
          <Button variant='contained' onClick={handleAddAgent}>Add Agent</Button>
        </Box>
        <DataGrid
          autoHeight
          columns={columns}
          rows={users}
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          sx={{ '--DataGrid-overlayHeight': '300px' }}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this agent? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AgentList;
