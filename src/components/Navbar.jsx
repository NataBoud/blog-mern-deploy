import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { checkIsAuth,logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const Navbar = () => {

  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()

  const activeStyles = {
    color: 'white'
  }

  // делаем выход из аккаунта // обработчик логаута
  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token') // нужно удалить из localStorage token
    toast("Vous vous êtes déconnecté(e)")
  }

  return (
    <div className='flex py-4 justify-between items-center'>
      <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm'>
        E
      </span>

      {
        isAuth && (
          <ul className='flex gap-8'>
            <li>
              <NavLink to={'/'} href='/'
                className='text-xs text-gray-400 hover:text-white'
                style={({ isActive }) =>
                  isActive ? activeStyles : undefined
                }
              >Accueil
              </NavLink>
            </li>
  
            <li>
              <NavLink to={'/posts'} href='/'            
                className='text-xs text-gray-400 hover:text-white'
                style={({ isActive }) =>
                  isActive ? activeStyles : undefined
                }
              >Mes posts
              </NavLink>
            </li>
  
            <li>
              <NavLink to={'/new'} href='/'            
                className='text-xs text-gray-400 hover:text-white'
                style={({ isActive }) =>
                  isActive ? activeStyles : undefined
                }
              >Ajouter un post
              </NavLink>
            </li>
  
        </ul>
      )}

      <div className='flex justify-center text-center bg-gray-600 text-xs hover:bg-gray-500 text-gray-200 rounded-sm px-4 py-2'>

        {isAuth ? (
          <button 
            className='hover:text-white' 
            onClick={logoutHandler}
            >Quitter
          </button>
            ) : (
            <Link to={'/login'}>Entrer</Link>
        )}

      </div>

    </div>
  )
}
