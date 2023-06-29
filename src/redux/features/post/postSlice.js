import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false, 
} 

export const createPost = createAsyncThunk(
    'post/createPost', 
    async(params) => {
    try {
        const {data} = await axios.post('/posts', params)
        // params - title, text, image
        return data         
    } catch (error) {
        console.log(error)       
    }
}) // теперь data нужно зарегестрировать в extraReducers: {} и поменять state
// pending-в ожидании запрос отправляется, 
// fulfilled-запрос выполнен до конца, 
// rejected-отклонено, ошибка

export const getAllPosts = createAsyncThunk(
    'post/getAllPosts', 
    async () => {
    try {
        // делаем get запрос: data из await.... 
        const {data} = await axios.get('/posts')
        return data
    } catch (error) {
        console.log(error)
    }
}) 

export const removePost = createAsyncThunk(
    'post/removePost', 
    async (id) => {
    try {
        const { data } = await axios.delete(
            `/posts/${id}`, id)
        return data
    } catch (error) {
        console.log(error);       
    }
})

export const updatePost = createAsyncThunk(
    'post/updatePost', 
    async (updatedPost) => {
    try {
        const { data } = await axios.put(
            `/posts/${updatedPost.id}`, 
            updatedPost
        )
        return data
    } catch (error) {
        console.log(error);       
    }
})
 
export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {

        // Creation d'un post
        [createPost.pending]: (state) => {
            state.loading = true
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts.push(action.payload)

        },
        [createPost.rejected]: (state) => {
            state.loading = false
        },

        // Réception de tous les posts
        [getAllPosts.pending]: (state) => {
            state.loading = true
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload.posts // ici on met tous les posts
            state.popularPosts = action.payload.popularPosts 

        },
        [getAllPosts.rejected]: (state) => {
            state.loading = false
        },

        // Suppression d'un post !== - не равен
        [removePost.pending]: (state) => {
            state.loading = true
        },
        [removePost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = state.posts.filter(
                (post) => post._id !== action.payload._id
                )
        },
        [removePost.rejected]: (state) => {
            state.loading = false
        },

        // Mis à jour d'un post
        [updatePost.pending]: (state) => {
            state.loading = true
        },
        // у нас есть массив постов и нам нужно определить какой именно нужно менять
        // поэтому нужно найти индекс этого поста
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.posts.findIndex(
                (post) => post._id === action.payload._id 
                // в слайсе лежит тот пост который уже обновленный
                )
            state.posts[index] = action.payload    
        },
        [updatePost.rejected]: (state) => {
            state.loading = false
        },

    },
})

export default postSlice.reducer