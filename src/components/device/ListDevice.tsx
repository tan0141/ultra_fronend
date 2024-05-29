// /path/to/ListDevice.tsx

import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, Button, Stack, Chip, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import CustomNoRowsOverlay from '../../utils/device/DeviceRoutes';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Device } from '../../types/device';
import { getDeviceData } from '../../utils/device/DeviceData';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ListDevice: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDeviceData();
      setDevices(data);
    };

    fetchData();
  }, []);

  const handleAddDevice = () => {
    navigate('/dashboard/device/add');
  };

  const handleEditClick = (device: Device) => {
    navigate(`/dashboard/device/edit/${device.id}`, { state: { device } });
  };

  const handleDeleteClick = (device: Device) => {
    setSelectedDevice(device);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDevice(null);
  };

//  const handleConfirmDelete = async () => {
//    if (selectedDevice) {
//      try {
//        await deleteDeviceData(selectedDevice.id);
//        setDevices(devices.filter(device => device.id !== selectedDevice.id));
//      } catch (error) {
//        console.error('Error deleting device data:', error);
//      } finally {
//        setOpen(false);
//        setSelectedDevice(null);
//      }
//    }
//  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 171 },
    { field: 'intervalTime', headerName: 'Interval Time', width: 171 },
    { field: 'rssi', headerName: 'RSSI', width: 100 },
    { field: 'firmware', headerName: 'Firmware', width: 171 },
    { field: 'createAt', headerName: 'Installation Date', width: 100 },
    {
      field: 'active', headerName: 'Status', width: 100,
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
          <IconButton aria-label="edit" onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDeleteClick(params.row)}>
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
          <Button variant='contained' onClick={handleAddDevice}>Add Device</Button>
        </Box>
        <DataGrid
          autoHeight
          columns={columns}
          rows={devices}
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          sx={{ '--DataGrid-overlayHeight': '300px' }}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this device? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button  color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ListDevice;
