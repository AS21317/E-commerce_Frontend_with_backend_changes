import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrders from '../features/user/component/UserOrders'

const UserOrderPage = () => {
  return (
    <div>
        <Navbar>
            <h1 className='text-3xl text-left text-green-700 font-semibold'>My Orders : </h1>
            <UserOrders></UserOrders>
        </Navbar>
    </div>
  )
}

export default UserOrderPage