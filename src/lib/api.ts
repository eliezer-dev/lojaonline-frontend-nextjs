import axios from 'axios';
import { UserAuthResponse, UserToken } from '@/types/userAuthResponse-types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});


// api.interceptors.request.use(
//     (config) => {
//         const storedToken = localStorage.getItem('vn_token');
//         if (storedToken) {
//             try {
//                 const parsedToken: UserToken = JSON.parse(storedToken); 
//                 if (parsedToken.access_token) {
//                     config.headers.Authorization = `Bearer ${parsedToken.access_token}`; 
//                 }
//             } catch (error) {
//                 console.error('Erro ao parsear o token:', error);
//             }
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
  

export default api;