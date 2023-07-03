import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from '../utils/axios'
import { updatePost } from '../redux/features/post/postSlice'

export const EditPostPage = () => {

    //состояния:
    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    // При нажатии редактировать пост мы переходим на EditPostPage. 

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    // Теперь нужно загрузить тот пост по кот мы кликнули:
    const fetchPost = useCallback(async() => {
        const { data } = await axios.get(`https://blog-api.onrender.com/posts/${params.id}`)
        setTitle(data.title)
        setText(data.text)
        setOldImage(data.imgUrl) // старую картинку будем менять на новую а эту очищать
    }, [params.id])

    const submitHandler = () => {
        try {
            const updatedPost = new FormData()
            updatedPost.append('title', title)
            updatedPost.append('text', text)
            updatedPost.append('id', params.id)
            updatedPost.append('image', newImage)
            dispatch(updatePost(updatedPost))
            navigate('/posts')
        } catch (error) {
            console.log(error)
        }
    }
    // dispatch(updatePost(updatedPost)) - 
    // отпраляем.(обновляемыйПост(ОбновленныйПост))

    const clearFormHandler = () => {
        setTitle('')
        setText('')
    }

    useEffect(() => {
        fetchPost()
    }, [fetchPost])


    return (
        <form
            className='w-1/3 mx-auto py-10'
            onSubmit={(e) => e.preventDefault()} 
        >
            <label 
                className='text-gray-700 hover:text-gray-800 py-2 bg-gray-200 hover:bg-gray-300 text-xs mt-2 mb-1 
                flex item-center justify-center rounded-md drop-shadow-sm cursor-pointer'
            >Télécharger une image:
                <input 
                    type='file' 
                    className='hidden'
                    onChange={(e) => {
                        setNewImage(e.target.files[0])
                        setOldImage('')
                    } }
                />
            </label>
            
            <div 
                className='flex object-cover py-2'>
                    {oldImage && 
                        <img 
                            src={`https://blog-api.onrender.com/${oldImage}`} 
                            alt={oldImage.name}/>
                    }
                    
                    {newImage && 
                        <img 
                            src={URL.createObjectURL(newImage)} 
                            alt={newImage.name}/>
                    }                   
            </div>

            <label 
                className='text-xs text-white opacity-70'>
                Titre du post:
                <input 
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titre de l'article"
                    className='  mt-1 text-black w-full rounded-lg 
                    py-2 px-2 text-xs outline-none placeholder:text-gray-700 mb-4'
                />
            </label>

            <label 
                className='text-xs text-white opacity-70'>
                Texte du post:
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    value={text}                  
                    placeholder="Texte du post"
                    className='mt-1 text-black w-full rounded-md bg-white py-2 px-4 text-xs outline-none placeholder:text-gray-700 drop-shadow-sm mb-4'
                />
            </label>

            <div className='flex gap-8 item justify-center mt-6'>
                <button
                    onClick={submitHandler} 
                    className='flex justify-center text-center
                    bg-gray-600 text-xs hover:bg-gray-500 text-gray-200 
                    rounded-sm px-4 py-2 drop-shadow-md'>
                    Mettre à jour le post
                </button>
                <button
                    onClick={clearFormHandler} 
                    className='flex justify-center items-center
                    bg-red-600 hover:bg-red-700 text-xs text-white 
                    rounded-sm py-2 px-4 drop-shadow-md'>
                    Annuler
                </button>
            </div>

        </form>
    )
}


