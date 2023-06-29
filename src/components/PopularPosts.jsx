// snippet rafc
import React from 'react'
import { Link } from 'react-router-dom'

export const PopularPosts = ({ post }) => {
  return (
    <div className='bg-gray-600 my-2 drop-shadow-md rounded-sm'>
        <Link
          to={`${post._id}`} 
          className='flex text-xs p-2 text-gray-300 hover:bg-gray-700 hover:text-white'
          >
            {post.title} sd
        </Link>
    </div>
  )
}
