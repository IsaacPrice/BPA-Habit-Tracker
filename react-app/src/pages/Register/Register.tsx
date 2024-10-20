import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useAuthContext } from '../../context/AuthContext';
import { User } from '../../api/client';


const Register: React.FC = () => 
{
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const authContext = useAuthContext();

    const onRegister = async () =>
    {
        if (!firstName || !lastName || !username || !email || !password || !confirmPassword) 
        {
            setError("All fields are required");
            return;
        }


        if (password !== confirmPassword)
        {
            setError("Passwords do not match");
            return;
        }

        const registerRequest: User = User.fromJS({ firstName, lastName, username, email, userPassword: password });
        const errorMessage: string | void = await authContext.register(registerRequest);

        if (errorMessage) 
        {
            setError(errorMessage);
        }
    }

    return (
        <Box>
            <Box className="registerForm">
                <Typography variant="h3">Register</Typography>

                { 
                    error && 
                    <Box className="errorContainer">
                        <Typography>    
                            {error}
                        </Typography> 
                    </Box>
                }

                <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onRegister}
                >
                    Register
                </Button>

                <Typography variant="body1">Already have an account? <Link to="/login">Log in</Link></Typography>
            </Box>
        </Box>
    );
}


export default Register;