import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';


function App() 
{
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
