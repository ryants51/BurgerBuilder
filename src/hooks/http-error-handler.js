import { useState, useEffect } from 'react';

export default (httpClient) => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use((req) => {
        setError(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, (err) => {
        setError(err);
    });

    useEffect(() => {
        // This ejects the interceptors when they aren't needed anymore
        // This helps with memory leaks and unexpected state changes
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
}