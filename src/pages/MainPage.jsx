import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PostItem } from '../components/PostItem'
import { PopularPosts } from '../components/PopularPosts'
import { getAllPosts } from '../redux/features/post/postSlice'



export const MainPage = () => {

    const dispatch = useDispatch()
    const { posts, popularPosts } = useSelector((state) => state.post)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch]) // зависим мы тут от [dispatch]

    if(!posts.length) {
        return (
           <div className='text-xl text-center text-white py-10'>
                il n'y a pas de posts.
           </div> 
        )
    }
// 'max-w[1200px] my-10 px-20', 'flex flex-col gap-10 basis-6/12'
    return (
        <div className='max-w-[900px] mx-auto py-10'>
            <div className='flex justify-between gap-8'>
                <div className='flex flex-col basis-4/5'>

                    {
                        posts?.map((post, idx) =>(<PostItem key={idx} post={post}/>
                    ))}                                    
                </div>
                <div className='basis-1/4'>
                    <div className='text-xs uppercase text-white'>
                        Populaire:
                    </div>

                    {/* 
                    ? если есть посты, то мы их мапим .map((post, idx) => возвращаем <PopularPosts key={idx} post={post}/>) 
                    */} 

                    {popularPosts?.map((post, idx) => (
                            <PopularPosts key={idx} post={post}/>
                    ))}                 
                </div>
            </div>
        </div>
    )
}
