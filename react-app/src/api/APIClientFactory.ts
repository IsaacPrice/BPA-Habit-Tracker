import { Client } from './client';


class APIClientFactory 
{
    private static instance: Client;

    public static getInstance(): Client 
    {
        if (!APIClientFactory.instance) 
        {
            APIClientFactory.instance = new Client('http://localhost:5280');

        }
        return APIClientFactory.instance;
    }
}

export default APIClientFactory;