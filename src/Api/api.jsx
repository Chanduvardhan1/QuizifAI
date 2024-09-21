import { baseURl } from "./constants";

const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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

        post: async (endpoint, data = {}) => {
            const response = await fetch(`${baseURl}${endpoint}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
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