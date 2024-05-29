import {User} from '../../../types/user';
import { Region } from '../../../types/region';

export const getAgentData = async (): Promise<User[]> => {
  try {
    let url = `${process.env.REACT_APP_API_ENDPOINT}/iot/user/getAllAgent`;
    const token = localStorage.getItem('accessToken');
    console.log(token);
    const response = await fetch(url,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const responeData = await response.json();
    const data: User[] = responeData.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching agent data:', error);
    return [];
  }
};

export const addAgentData = async (newAgent: Partial<User>): Promise<User> => {
  try {
    let url = `${process.env.REACT_APP_API_ENDPOINT}/iot/user/addAgent`;
    const token = localStorage.getItem('accessToken');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAgent)
    });
    if (!response.ok) {
      throw new Error('Failed to add agent');
    }
    const responseData = await response.json();
    const addedAgent: User = responseData.data;
    return addedAgent;
  } catch (error) {
    console.error('Error adding agent data:', error);
    throw error;
  }
};

export const getRegionUser = async (userId: number): Promise<Region[]> => {
  try {
    const url = `${process.env.REACT_APP_API_ENDPOINT}/iot/user/getRegionUser/${userId}`;
    const token = localStorage.getItem('accessToken');
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch region data');
    }

    const regionData = await response.json();

    if (Array.isArray(regionData.data) && regionData.data.length > 0) {
      return regionData.data;
    } else {
      throw new Error('No region data found');
    }
    
  } catch (error) {
    console.error('Error fetching region data:', error);
    throw error;
  }
};

export const updateAgentData = async (userId: number,updatedAgent: Partial<User>): Promise<User> => {
  try {
    const url = `${process.env.REACT_APP_API_ENDPOINT}/iot/user/editAgent/${userId}`;
    const token = localStorage.getItem('accessToken');
    console.log('----------------------------');
    console.log(userId);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedAgent)
    });
    if (!response.ok) {
      throw new Error('Failed to update agent');
    }
    const responseData = await response.json();
    console.log(responseData);
    const updatedAgentData: User = responseData.data;
    return updatedAgentData;
  } catch (error) {
    console.error('Error updating agent data:', error);
    throw error; // Ensure the function always throws an error if something goes wrong
  }
};

export const deleteAgentData = async(id: number): Promise<void> =>{
  try {
    const url = `${process.env.REACT_APP_API_ENDPOINT}/iot/user/${id}`;
    const token = localStorage.getItem('accessToken');
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to delete agent');
    }
  } catch (error) {
    console.error('Error deleting agent data:', error);
    throw error;
  }
}