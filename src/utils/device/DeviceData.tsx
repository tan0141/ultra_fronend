import {Device} from '../../types/device';

export const getDeviceData = async (): Promise<Device[]> => {
	try {
	  let url = `${process.env.REACT_APP_API_ENDPOINT}/iot/ultrasonic/getall`;
	  const token = localStorage.getItem('accessToken');
	  console.log(token);
	  const response = await fetch(url,{
		headers: {
		  'Authorization': `Bearer ${token}`
		}
	  });
	  if (!response.ok) {
		throw new Error('Failed to fetch device');
	  }
	  const responeData = await response.json();
	  const data: Device[] = responeData.data;
	  console.log(data);
	  return data;
	} catch (error) {
	  console.error('Error fetching agent data:', error);
	  return [];
	}
  };