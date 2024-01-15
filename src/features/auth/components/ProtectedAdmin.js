// यह से हम कंट्रोल करेंगे routes --> 
// that means on which route a normal user can go and on which route a logged in user can go 

import { useSelector } from "react-redux"
import { selectLoggedInUser } from "../authSlice"
import { Navigate } from "react-router-dom"


const ProtectedAdmin = ({children}) => {
    const user  = useSelector(selectLoggedInUser)

    if(!user){
        return <Navigate to="/login" replace={true} ></Navigate>
    }
  return ( 
    children
  )
}

export default ProtectedAdmin