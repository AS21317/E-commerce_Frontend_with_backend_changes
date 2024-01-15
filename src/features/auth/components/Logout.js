import React, { useEffect } from 'react'
import { selectLoggedInUser, signOutAsync } from '../authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Logout = () => {
        const dispatch = useDispatch()
        const user = useSelector(selectLoggedInUser)
    useEffect(()=>{
        dispatch(signOutAsync())
    })

    // But the problem is that , useeffect runs after render , so we need to delay the navigate part 
  return (
    <div>
        {
        // jb user null ho jaye to redirect kr jao 
        !user && <Navigate to={'/login'} replace={true}></Navigate>
        
        }  
    </div>
  )
}

export default Logout