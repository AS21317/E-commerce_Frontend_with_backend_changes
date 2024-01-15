

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from '../userSlice'
import { Link } from 'react-router-dom'
import { discountedPrice } from '../../../app/constant'

const UserOrders = () => {

    const dispatch = useDispatch()
  const [open, setOpen] = useState(true)

    const user = useSelector(selectUserInfo)
    const orders = useSelector(selectUserOrders)  // yha user ke sare orders aa gye , now you need to display them 
    console.log("Orders here : ",orders);

    useEffect(()=>{
        dispatch(fetchLoggedInUserOrdersAsync(user.id))
    },[dispatch,user])
  return (

    <div>
        {orders?.map((order)=>(
        <div>
      <div className="mx-auto  mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                  <h1 className=' text-4xl py-4 font-bold tracking-tight text-gray-900'>Order number is : #{order.id}</h1>
                  <h3 className=' text-2xl  font-bold tracking-tight text-red-700'>Order status : {order.status}</h3>

                  <hr className='mb-6'/>


    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flow-root">
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {order.items.map((item) => (
          <li key={item.id} className="flex  mb-10 py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href={item.href}>{item.title}</a>
                  </h3>
                  <p className="ml-4">${discountedPrice(item)}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <div className="text-gray-500"> 
                <label 
                htmlFor="quantity"
                 className="inline mr-5 text-sm font-medium leading-6 text-gray-900">

                Qty:{item.quantity}
              </label> 
                

                   </div>

              </div>
            </div>
            
          </li>
         
        ))}
      </ul>
    </div>
  </div>


<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
  <div className="flex mx-2 my-2 justify-between text-base font-medium text-gray-900">
    <p>Total items in Cart</p>
    <p>{order.totalItems} items</p> 
  </div>
  <div className="flex  mx-2 my-2 justify-between text-base font-medium text-gray-900">
    <p>Subtotal</p>
    <p>${order.totalAmount}</p> 
  </div>
  <h1 className=' text-2xl  font-bold tracking-tight text-left text-red-700'>Shipping Address : </h1>
  <div  className="flex border-solid border-2 mt-2 border-gray-300 px-5 justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
         
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900"><span className='font-semibold text-lg '>Name:</span>  {order.selectedAddress?.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500"><span className='font-semibold text-lg '>Street:</span>  {order.selectedAddress?.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500"><span className='font-semibold text-lg '>Zip Code:</span>  {order.selectedAddress?.pinCode}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-500"><span className='font-semibold text-lg '>Phone:</span>  {order.selectedAddress?.phone}</p>
            <p className="text-sm leading-6 text-gray-500"><span className='font-semibold text-lg '>Email:</span>  {order.selectedAddress?.email}</p>
            <p className="text-sm leading-6 text-gray-500"><span className='font-semibold text-lg '>State:</span>  {order.selectedAddress?.state}</p>
             
              
            
          </div>
        </div>

 
</div>

</div>
        </div>))}
    </div>
  )
}

export default UserOrders