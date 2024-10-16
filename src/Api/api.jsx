import { baseURl } from "./constants";

const getHeaders = () => {
    const authToken = localStorage.getItem('authToken');
    return {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
    };
};

export default () => {
    const headers = getHeaders();
    return {
        get: async (endpoint, params = {}) => {
            const url = new URL(`${baseURl}${endpoint}`);
            Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

            const response = await fetch(url, {
                method: 'GET',
                headers,
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
                headers,
                body: JSON.stringify(data),
            });
        
            return response.json();
        },

        uploadFile: async (endpoint, file1, file2, queryParams = {}) => {
            console.log('file1', file1);
            let url = `${baseURl}${endpoint}`;
        
            // Append query parameters to URL
            if (Object.keys(queryParams).length > 0) {
                const queryString = Object.keys(queryParams).map((key) => {
                    return `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`;
                }).join('&');
        
                url += `?${queryString}`;
            }

            const formData = new FormData();
            formData.append('file1', file1);
            formData.append('file2', file2);
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: {
                    mode: "formdata",
                    formdata: formData,
                },
            });
        
            return response.json();
        },

        put: async (endpoint, data = {}) => {
            const response = await fetch(`${baseURl}${endpoint}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(data),
            });

            return response.json();
        },

        delete: async (endpoint, params = {}) => {
            const url = new URL(`${baseURl}${endpoint}`);
            Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

            const response = await fetch(url, {
                method: 'DELETE',
                headers,
            });

            return response.json();
        },
    }
}