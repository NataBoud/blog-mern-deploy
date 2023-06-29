import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3002/api',
    // http://127.0.0.1:3002/api/auth/register
})

instance.interceptors.request.use(config=> {
    config.headers.Authorization = window.localStorage.getItem('token')
    
    return config
})

export default instance
