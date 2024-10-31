class BaseClient 
{


    protected transformOptions(options: RequestInit): Promise<RequestInit> 
    {
        const token: string = JSON.parse(sessionStorage.getItem("sessionToken") ?? "\"\"");

        if (token !== null) 
        {
            options.headers = 
            {
                ...options.headers,
                ["Authorization"]: `Bearer ${token}`,
            };
        }

        options.credentials = "include";

        return Promise.resolve(options);
    }


    protected transformResult(url: string, response: Response, callback: (response: Response) => Promise<any>): Promise<any>
    {
        const status = response.status;
        if (status === 403)
        {
            let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
            return response.text().then((responseText) => {
                return this.throwException("Forbidden", status, responseText, _headers);
            });            
        }
        return callback(response);
    }


    protected throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any 
    {
        if (result !== null && result !== undefined)
            throw result;
        else
            throw new Error()
    }


}


export default BaseClient;
