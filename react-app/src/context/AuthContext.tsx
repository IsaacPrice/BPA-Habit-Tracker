import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LoginResponse, UserLogin } from '../api/client';
import APIClientFactory from '../api/APIClientFactory';
import { useNavigate } from 'react-router-dom';


type AuthContextType =
{
    sessionToken: string | undefined;
    login: (username: string, password: string) => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => 
{
    const [sessionToken, setSessionToken] = useState<string | undefined>(undefined);

    const navigate = useNavigate();


    useEffect(() => 
    {
        const token = localStorage.getItem('sessionToken');
        if (token) 
        {
            setSessionToken(token);
        }
        else
        {
            navigate('/login');
        }
    }, []);


    const login = async (username: string, password: string) => 
    {
        const loginRequest = UserLogin.fromJS({ username, password });

        APIClientFactory
            .getInstance()
            .login(loginRequest)
            .then((response: LoginResponse) => 
            {
                if (response.token) 
                {
                    setSessionToken(response.token);
                    localStorage.setItem('sessionToken', response.token);
                }
            })
            .catch((error: any) => console.log(error));

        navigate('/');
    };


    return (
        <AuthContext.Provider value={{ sessionToken, login }}>
            {children}
        </AuthContext.Provider>
    );
};


const useAuthContext = (): AuthContextType => 
{
    const context = useContext(AuthContext);
    if (!context) 
    {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, AuthContext, useAuthContext };