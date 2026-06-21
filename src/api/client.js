import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Reads from the .env.local file we just made
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to automatically attach your security token once logged in
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
