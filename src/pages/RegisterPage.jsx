import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice'
// импорт компонент toast
import { toast } from 'react-toastify'


export const RegisterPage = () => {

    const [username, setUsername] = useState('') // onChange={e => setUserName(e.target.value)} 
    const [password, setPassword] = useState('') // value из инпута и записываем его в useState('')
    const {status} = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth) // проверка если мы в сети...
    const navigate = useNavigate()    
    
    const dispatch = useDispatch() // dispatch-отправка, перераспределение

    useEffect(() => {
        if(status) { toast(status) }
        if(isAuth) navigate('/')
    }, [status, isAuth, navigate])

    // handle submit - обработчик отправки // берем handleSubmit и вешаем на кнопку подтвердить
    const handleSubmit = () =>{
        try {
            dispatch(registerUser({ username,password })) // потом нужно очистить форму =>
            setPassword('') // потом нужно очистить форму пустой строкой
            setUsername('')
        } catch (error) {
           console.log(error) 
        }
    }
   
    return (
    <form 
        onSubmit = {e => e.preventDefault()}
        className='w-1/4 h-60 mx-auto mt-40'
    >

        <h1 className='text-lg text-white text-center'>Créer un compte</h1>
        <label className='text-xs text-gray-400'>
            Nom d'utilisateur:
            <input
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)} // берем value из инпута и записываем его в useState('')
                placeholder="Nom d'utilisateur"
                className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
            />
            
        </label>

        <label className='text-xs text-gray-400'>
            Mot de passe:
            <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Mot de passe'
                className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
            />
            
        </label>

        <div className='flex gap-8 justify-center mt-4'>
            <button 
            type='submit'
            onClick={handleSubmit}
            className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
            >Confirmer
            </button>
        <Link 
            to='/login'         
            className='flex justify-center items-center text-xs text-white'
        >Vous avez un compte ?
        </Link>
        </div>

    </form>
    )
            
}