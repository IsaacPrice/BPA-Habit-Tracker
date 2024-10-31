import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import APIClientFactory from '../api/APIClientFactory';
import { Team } from '../api/client';


const Home: React.FC = () => 
{
	useEffect(() => {
		const token = sessionStorage.getItem('sessionToken');
		fetch('http://localhost:5280/Team/EnumerateTeam', {
			method: 'GET',
			credentials: 'include', // This ensures cookies and other credentials are sent
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error('Error:', error));
	}, []);


	return (
		<Box>
			<Typography variant="h1">Homepage</Typography>
		</Box>
	);
}


export default Home;