import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import Moment from 'react-moment'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import axios from '../utils/axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { removePost } from '../redux/features/post/postSlice'
import { createComment, getPostComments } from '../redux/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem'



export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    
    const { user } = useSelector((state) => state.auth)
    const { comments } = useSelector((state) => state.comment)
    const navigate = useNavigate()


    const params = useParams()
    const dispatch = useDispatch()

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            toast("Le post a éte supprimé!")
            navigate('/posts')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        try {
            const postId = params.id
            dispatch(createComment({ postId, comment }))
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error)
        }
    }, [params.id, dispatch])
    // комменты загружены теперь их нужно получить


    const fetchPost = useCallback(async() => {
        const { data } = await axios.get(`https://blog-api.onrender.com/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])
    
    // Возьмем еще один useEffect и загрузим комменты:
    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    if(!post){
        return(
            <div className='text-xl text-center text-white py-10'>
                Chargement...
            </div>
        )
    }

    return (
        <div className='max-w-[1200px] mx-auto py-10' >

            <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 drop-shadow-md'>
               <Link className='flex' to={'/'}>Retour</Link>        
            </button>

            <div className='flex gap-10 py-8'>
                <div className='w-2/3'>

                    <div className='flex flex-col basis-3/4 flex-grow'>

                        <div className={
                            post?.imgUrl 
                                ? 'flex rounded-sm h-auto' 
                                : 'flex rounded-sm'  
                        }
                        >
                    
                        {post?.imgUrl && (
                            <img 
                                src={`https://blog-api.onrender.com/${post.imgUrl}`} 
                                alt='img' 
                                className='flex object-cover w-full'
                            />
                        )}
                        </div>

                
                        <div className='flex justify-between items-center pt-2'>
                            <div className='text-xs text-white opacity-50'>
                                {post.username}
                            </div>
                            <div className='text-xs text-white opacity-50'>
                                <Moment date={post.createdAt} format='D MMM YYYY'/>
                            </div>
                        </div>

                        <div className='text-white text-xl'>
                            {post.title}
                        </div>
                        
                        <p className='text-white text-xs opacity-60 pt-4'>
                            {post.text}
                        </p>

                        <div className='flex gap-3 items-center mt-2 justify-between'>

                            <div className='flex gap-3 mt-4'>

                                <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                <AiFillEye /> <span>{post.views}</span>
                                </button>

                                <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                                    <AiOutlineMessage />{' '}
                                    <span>{post.comments?.length || 0}</span>
                                </button>

                            </div>

                            {user?._id === post.author && (
                                <div className='flex gap-3 mt-4'>

                                    <button className='flex items-center justify-center gap-2 text-white opacity-50'>
                                    <Link to={`/${params.id}/edit`}>
                                        <AiTwotoneEdit/>
                                    </Link>
                                    </button>

                                    <button
                                    onClick={removePostHandler}
                                    className='flex items-center justify-center gap-2 text-white opacity-50'>
                                        <AiFillDelete />                                       
                                    </button>

                                </div> 
                            )}

                        </div>                 

                    </div>              
                </div>
                    <div className='w-1/3 p-8 bg-gray-200 flex flex-col gap-2 rounded-sm drop-shadow-md'>
                        <form 
                            className='flex gap-2' 
                            onSubmit={(e) => e.preventDefault()}>
                                <input 
                                    type='text'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder='Comment'
                                    className='text-black w-full rounded-sm bg-white p-2 text-xs outline-none placeholder:text-gray-700 drop-shadow-sm'
                                />
                                <button
                                    type='submit'
                                    onClick={handleSubmit}
                                    className='flex justify-center text-center bg-gray-600 text-xs hover:bg-gray-500 text-gray-200 rounded-sm px-4 py-2 drop-shadow-md'
                                >
                                    Envoyer
                                </button>
                        </form>
                        {comments?.map((cmt) => (
                            <CommentItem key={cmt._id} cmt={cmt} />
                        ))}
                        
                       
                    </div>
            </div>
        </div>
    )

}
