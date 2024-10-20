import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LoginResponse, RegisterResponse, User, UserLogin } from '../api/client';
import APIClientFactory from '../api/APIClientFactory';
import { useNavigate } from 'react-router-dom';


type AuthContextType =
{
    sessionToken: string | undefined;
    login: (username: string, password: string) => Promise<string | void>;
    register: (registerRequest: User) => Promise<string | void>;
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


    const login = async (username: string, password: string): Promise<string | void> => 
    {
        const loginRequest = UserLogin.fromJS({ username, password });

        await APIClientFactory
            .getInstance()
            .login(loginRequest)
            .then((response: LoginResponse) => 
            {
                if (response.token) 
                {
                    setSessionToken(response.token);
                    localStorage.setItem('sessionToken', response.token);
                    navigate('/');
                }
            })
            .catch((error: any) => 
            {
                console.log(error);
            });

        return "Invalid username or password";
    };


    const register = async (registerRequest: User): Promise<string | void> =>
    {
        await APIClientFactory
            .getInstance()
            .register(registerRequest)
            .then((response: RegisterResponse) => 
            {
                if (response.token) 
                {
                    setSessionToken(response.token);
                    localStorage.setItem('sessionToken', response.token);
                    navigate('/');
                }

            })
            .catch((error: any) => 
            {
                console.log(error);
            });

        return "Username already exists";
    }


    return (
        <AuthContext.Provider value={{ sessionToken, login, register }}>
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