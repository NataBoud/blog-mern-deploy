import React from 'react'
import axios from '../utils/axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { PostItem } from '../components/PostItem'

// нужно получить посты 

export const PostsPage = () => {

  const [posts, setPosts] = useState([])
  
  const fetchMyPosts = async () => {
    
    try {
      const { data } = await axios.get('https://blog-api.onrender.com/posts/user/me')
      setPosts(data)
    } catch (error) {
      console.log(error)     
    }
  }

  useEffect(() => {
    fetchMyPosts()
}, [])

  return (
    <div className='mx-auto py-10 flex flex-col gap 10 w-1/2'>
      {posts?.map((post, idx) => (
        <PostItem post={post} key={idx}/>
      ))}
    </div> 
  )  
}
