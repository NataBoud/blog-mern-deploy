import React, { useState } from 'react'
import { createPost } from '../redux/features/post/postSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// import { toast } from 'react-toastify'

export const AddPostPage = () => {

    // делаем инпуты управляемыми:
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // теперь все это нужно отправить на сервер (при помощи FormData()), создаем функцию кот отвечает за отпр на сервер submitHandler
    // вешаем onClick={submitHandler} на button Ajouter un poste
    const submitHandler = () => {
        try {
            const data = new FormData()
            // присоединяем к data все импуты
            data.append('title', title) // key: title value: title
            data.append('text', text)
            data.append('image', image)
            // теперь нужно отправить (dispatch) const createPost
            dispatch(createPost(data))
            navigate('/') // после создания поста отпр на гл стр
        } catch (error) {
            // toast("Quelque chose n'a pas marché")
            console.log(error) 
        }
    }

    const clearFormHandler = () => {
        setText('')
        setTitle('')
    }
    
    return <form
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
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>
                
                <div 
                    className='flex object-cover py-2'>
                        {image && <img src={URL.createObjectURL(image)} alt={image.name}/>}
                </div>
                <label 
                    className='text-xs text-white opacity-70'>
                    Titre du post:
                    <input 
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titre de l'article"
                        className='mt-1 text-black w-full rounded-md bg-gray-100 
                         py-2 px-4 text-xs outline-none placeholder:text-gray-700 drop-shadow-sm mb-4'
                    />
                </label>

                <label 
                    className='text-xs text-white opacity-70'>
                    Texte du post:
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        value={text}                  
                        placeholder="Texte du post"
                        className='mt-1 text-black w-full rounded-lg bg-gray-100
                        py-2 px-2 text-xs outline-none placeholder:text-gray-700 mb-4'
                    />
                </label>

                <div className='flex gap-8 item justify-center mt-6'>
                    <button
                        onClick={submitHandler} 
                        className='flex justify-center text-center
                         bg-gray-600 text-xs hover:bg-gray-500 text-gray-200 
                         rounded-sm px-4 py-2 drop-shadow-md'>
                        Ajouter un poste
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
}

