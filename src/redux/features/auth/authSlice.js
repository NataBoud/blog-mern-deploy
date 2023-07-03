import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
} // Когда удачно прошла регистрация нужно запронить весь State

export const registerUser = createAsyncThunk(
    'auth/registerUser', 
    async ({ username, password }) => {
        try {
            const { data } = await axios.post('https://blog-api-fz11.onrender.com/auth/register', {
                username,
                password
            })
            // получаем данные потом если в данных есть токен:
            if(data.token) {
                window.localStorage.setItem('token', data.token)
            }// (токен, как дата.токен)           
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser', 
    async ({ username, password }) => {
        try {
            const { data } = await axios.post('https://blog-api-fz11.onrender.com/auth/login', {
                username,
                password
            })
            // получаем данные потом если в данных есть токен:
            if(data.token) {
                window.localStorage.setItem('token', data.token)
            }// (токен, как дата.токен)           
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

export const getMe = createAsyncThunk('auth/loginUser', async () => {
        try {
            const { data } = await axios.get('https://blog-api-fz11.onrender.com/auth/me')                
            return data
        } catch (error) {
            console.log(error)
        }
    })

// теперь нужно этот (reduser(преобр данных) => registerUser) => зарегестрировать =>
// => для этого мы идем в authSlice => extraReducers => это объект, 
// где мы можем управлять (initialState - нашим состоянием) 

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { //после нажатия кнопки выйти нам нужно все чистить
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers: {
        

        //--- Register user ---//

        // В этих состояниях мы упр state
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false // загрузка закончилась
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
            
        },
        [registerUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        // pending-в ожидании запрос отправляется, 
        // fulfilled-запрос выполнен до конца, 
        // rejected-отклонено, ошибка

        //--- Login user ---//

        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false // загрузка закончилась
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
            
        },
        [loginUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        //--- (getMe) login check ---//

        [getMe.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false // загрузка закончилась
            state.status = null // toastify не ставим запрос делается каждый раз при обновлении стр
            state.user = action.payload?.user // If a user exists
            state.token = action.payload?.token // If a user exists
            
        },
        [getMe.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    }
})

// создаем переменную при помощи которой делаем check = принимаем state =>
export const checkIsAuth = state => Boolean(state.auth.token)

// после нажатия кнопки выйти нам нужно все чистить

export const { logout } = authSlice.actions
export default authSlice.reducer
