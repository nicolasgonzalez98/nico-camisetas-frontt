import axios from 'axios'
import { userAuthStore } from "./stores/authStore";
import {computed} from "vue";

axios.defaults.withCredentials = true

const base_url = computed( () => {
    switch (location.hostname) {
        case '172.172.122.221':
            return import.meta.env.VITE_URL_AUTH_HML
            break
        case 'comedores.bue.edu.ar':
            return import.meta.env.VITE_URL_AUTH_PROD
            break
        default:
            return import.meta.env.VITE_URL_AUTH_DEV
            break

    }
})

const axiosAuth = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
axiosAuth.defaults.headers.common['Accept'] = 'application/json'
axiosAuth.defaults.headers.common['Content-Type'] = 'application/json'
axiosAuth.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'



axiosAuth.interceptors.request.use(config =>{
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default axiosAuth
