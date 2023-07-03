import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:3002/api',
    // baseURL: 'https://blog-api.onrender.com',
    baseURL: 'https://blog-api-fz11.onrender.com',
    
    
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('token')
    
    return config
})

export default instance
