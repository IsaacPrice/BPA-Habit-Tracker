import { Client } from './client';

class APIClientFactory 
{
    private static instance: Client;

    public static getInstance(): Client 
    {
        if (!APIClientFactory.instance) 
        {
            APIClientFactory.instance = new Client('https://localhost:7058');
        }
        return APIClientFactory.instance;
    }
}

export default APIClientFactory;