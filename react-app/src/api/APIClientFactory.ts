import { APIClient } from './client';


class APIClientFactory 
{
    private static instance: APIClient;

    public static getInstance(): APIClient 
    {
        if (!APIClientFactory.instance) 
        {
            APIClientFactory.instance = new APIClient('https://localhost:7058');

        }
        return APIClientFactory.instance;
    }
}

export default APIClientFactory;