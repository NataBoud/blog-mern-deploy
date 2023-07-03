import React from 'react'
// теперь нужно поставить доп библ для лайков и комментов npm install react-icons --save
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
// npm i react-moment чтобы корректно выводилось время
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom' 


export const PostItem = ({ post }) => {

    if(!post){
        return(
            <div className='text-xl text-center text-white py-10'>
                Chargement...
            </div>
        )
    }

    // Оборачиваем все в компонент <Link> из react router dom

    return (
        
            <Link to={`/${post._id}`}>
            <div className='flex flex-col basis-1/4 fex-grow pb-10'>


                <div className={
                        post.imgUrl 
                            ? 'flex rounded-sm h-96' 
                            : 'flex rounded-sm'  
                    }
                >
                
                    {post.imgUrl && (
                        <img 
                            src={`https://blog-api-fz11.onrender.com/${post.imgUrl}`} 
                            alt='img' 
                            className='flex object-cover w-full'
                        />
                    )}
                </div>


                <div className='flex justify-between items-center pt-4'>
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

                <p className='text-white text-xs opacity-60 pt-4 line-clamp-4'>
                    {post.text}
                </p>

                <div className='flex gap-3 items-center mt-2'>
                    <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                        <AiFillEye /> <span>{post.views}</span>
                    </button>
                    <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                        <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
                    </button>
                    
                </div>

                </div>
        </Link>
    )
}
