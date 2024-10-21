import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import APIClientFactory from '../api/APIClientFactory';
import { Team } from '../api/client';


const Home: React.FC = () => 
{
	useEffect(() => {
		APIClientFactory
		    .getInstance()
			.enumerateTeam()
			.then((response: Team[]) => 
			{
				console.log(response);
			})
			.catch((error: any) => console.error("Error creating team", error));
	}, []);


	return (
		<Box>
			<Typography variant="h1">Homepage</Typography>
		</Box>
	);
}


export default Home;