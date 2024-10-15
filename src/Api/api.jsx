import { baseURl } from "./constants";

const getHeaders = () => {
    const authToken = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': authToken
    };
};
export default () => {
    return {
        get: async (endpoint, params = {}) => {
            const url = new URL(`${baseURl}${endpoint}`);
            Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

            const response = await fetch(url, {
                method: 'GET',
                headers: getHeaders(),
            });

            return response.json();
        },

        post: async (endpoint, data = {}, queryParams = {}) => {
            let url = `${baseURl}${endpoint}`;
        
            // Append query parameters to URL
            if (Object.keys(queryParams).length > 0) {
                const queryString = Object.keys(queryParams).map((key) => {
                    return `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`;
                }).join('&');
        
                url += `?${queryString}`;
            }
        
            const response = await fetch(url, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
        
            return response.json();
        },

        uploadFile: async (endpoint, files, queryParams = {}) => {
            let url = `${baseURl}${endpoint}`;
        
            // Append query parameters to URL
            if (Object.keys(queryParams).length > 0) {
                const queryString = Object.keys(queryParams).map((key) => {
                    return `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`;
                }).join('&');
        
                url += `?${queryString}`;
            }
        
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    ...getHeaders(),
                    'Content-Type': 'application/octet-stream',
                    "Accept": "multipart/form-data"
                },
                body: files,
            });
        
            return response.json();
        },

        put: async (endpoint, data = {}) => {
            const response = await fetch(`${baseURl}${endpoint}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });

            return response.json();
        },

        delete: async (endpoint, params = {}) => {
            const url = new URL(`${baseURl}${endpoint}`);
            Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

            const response = await fetch(url, {
                method: 'DELETE',
                headers: getHeaders(),
            });

            return response.json();
        },
    }
}