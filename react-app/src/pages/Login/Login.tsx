import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useAuthContext } from '../../context/AuthContext';


const Login: React.FC = () => 
{
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    
    const authContext = useAuthContext();


    const onLogin = async () =>
    {
        try 
        {
            const errorMessage: string | void = await authContext.login(username, password);
            setError((errorMessage) ? errorMessage : null);
        }
        catch (error) 
        {
            console.error(error);
        }
    }


    return (
        <Box>
            <Box className="loginForm">
                <Typography variant="h3">Login</Typography>

                { 
                    error && 
                    <Box className="errorContainer">
                        <Typography>    
                            {error}
                        </Typography> 
                    </Box>
                }

                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    fullWidth
                    />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                    />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onLogin}
                    >
                    Login
                </Button>

                <Typography variant="body1">Don't have an account? <Link to="/register">Register</Link></Typography>
            </Box>
        </Box>
    );
}


export default Login;