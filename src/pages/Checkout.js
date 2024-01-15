import React from 'react'


import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItemFromCartAsync, selectCartItems, updateCartAsync } from '../features/cart/cartSlice'
import { useForm } from 'react-hook-form'
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice'
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice'
import { selectUserInfo } from '../features/user/userSlice'
import { discountedPrice } from '../app/constant'





const Checkout = () => {
  console.log("Welcome to order page : ");
    const [open, setOpen] = useState(true)
    const {register,handleSubmit,reset,watch,formState: { errors },  } = useForm()
    const user= useSelector(selectUserInfo);
    const [selectedAddress,setSelectedAddress] = useState(null)
    const [paymentMethod,setPaymentMethod] = useState('cash')
    const currentOrder = useSelector(selectCurrentOrder)


    const items  = useSelector(selectCartItems)
    const dispatch = useDispatch()
    const totalAmount = items.reduce((amount,item)=>discountedPrice(item)*item.quantity +amount,0)
    const totalItems = items.reduce((total,item)=>item.quantity +total,0)
     
    const handleQuantity=(e,item)=>{
      dispatch(updateCartAsync({...item, quantity:+e.target.value}))
  
    }
  
    const handleRemove=(e,id)=>{
      dispatch(deleteItemFromCartAsync(id))
    }

    const handleAddress=(e)=>{

        console.log(user.addresses[e.target.value]);
        setSelectedAddress(user.addresses[e.target.value])
    }

    const handlePayment =(e)=>{
      setPaymentMethod(e.target.value)
    }


    const handleOrder =(e)=>{
      const order ={items,totalAmount,totalItems,user,paymentMethod,selectedAddress, status:'pending'}
      dispatch(createOrderAsync(order))
      // setPaymentMethod(e.target.value)

      // TODO: 1.cart should be clear after order , 
      //TODO:  2. Redirect to order sussess page
      //TODO:  3.On server change the stock number of the items
      //TODO:  4. Status can be updated later by admin on delivered or recieved or dispatch


    }
    console.log("current order is :", currentOrder);

console.log( "In checkzout current User info is : ", user);

  return (
    <>
     {!items.length && <Navigate to={'/'} replace={true}></Navigate>}
     
     {/* समझ मे नहीं आया है , फिर दे सोचना है की यह से  id कैसे चली गई  */}
     {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`}  replace={true}></Navigate>} 
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

   
 <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
    <div className='lg:col-span-3'>

        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            console.log("New address to be added : ",data);
            console.log("User info before adding above address: ",user);
            dispatch(
              updateUserAsync({
                ...user,
                addresses: [...user.addresses, data],
              })
            );
            console.log("User info after adding above address: ",user);

            reset()
           
          })}  
        className='bg-white text-left px-6  '>
        <div className="space-y-12">

        <div className="border-b border-gray-900/10 pb-12">

          <h2 className="text-2xl font-semibold leading-7 mt-16 pt-6  text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('name',{required:'Name is required'})}
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

           

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email',{required:'Email is required'})}

                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone 
              </label>
              <div className="mt-2">
              <input
                  id="phone"
                  {...register('phone',{required:'Email is required'})}

                  type="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('street',{required:'Street Address is required'})}

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('city',{required:'City is required'})}

                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('state',{required:'City is required'})}

                  id="region"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  {...register('pinCode',{required:'Pin Code is required'})}
                  id="pinCode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Reset
        </button>
        <button
        
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose from Existing address          </p>
                 
                  <ul role="list" className="">

      {user.addresses.map((address,index) => (
        <li key={index} className="flex border-solid border-2 mt-5 border-gray-300 px-5 justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
          <input
                    onChange={handleAddress}
                    value={index}   //html me value me object pass nhi kr sakte aasani se 
                    id="cash"
                    name="address"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900"><span className='font-semibold text-lg '>Name:</span>  {address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500"><span className='font-semibold text-lg '>Street:</span>  {address.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500"><span className='font-semibold text-lg '>Zip Code:</span>  {address.pincode}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-500"><span className='font-semibold text-lg '>Phone:</span>  {address.phone}</p>
            <p className="text-sm leading-6 text-gray-500"><span className='font-semibold text-lg '>Email:</span>  {address.email}</p>
            <p className="text-sm leading-6 text-gray-500"><span className='font-semibold text-lg '>State:</span>  {address.state}</p>
             
              
            
          </div>
        </li>
      ))}
    </ul>

          <div className="mt-10 space-y-10">
            
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                  onChange={handlePayment}
                  value={'cash'}
                    id="cash"
                    name="payments"
                    type="radio"
                    checked={paymentMethod === 'cash'}

                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                    Cash
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                  onChange={handlePayment}
                   value={'card'}
                    id="card"
                    name="payments"
                    type="radio"
                    checked={paymentMethod === 'card'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Payment
                  </label>
                </div>
               
              </div>
            </fieldset>
          </div>
        </div>
      </div>

    </form>
    </div>

    {/* Cart code start here  */}


    <div className='lg:col-span-2'>
    <div className="mx-auto  mt-24 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                  <h2 className=' text-4xl font-bold tracking-tight text-gray-900'>Cart</h2>
                  <hr className='mb-6'/>


    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flow-root">
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {items.map((item) => (
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

                Qty
              </label> 
                  <select 
                  onChange={(e)=>handleQuantity(e,item) }value={item.quantity}
                  name="" id="">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>

                   </div>

                <div className="flex">
                  <button
                  onClick={(e)=>handleRemove(e,item.id)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
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
    <p>{totalItems} items</p> 
  </div>
  <div className="flex  mx-2 my-2 justify-between text-base font-medium text-gray-900">
    <p>Subtotal</p>
    <p>${totalAmount}</p> 
  </div>
  <p className="mt-0.5 text-sm text-left text-gray-500">Shipping and taxes calculated at checkout.</p>
  <div className="mt-6">
    <div
      onClick={handleOrder}
      className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
    >
      Order Now
    </div>
  </div>
  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
    <p>
      or {" "}
      <Link to={'/'}>
      <button
        type="button"
        className="font-medium text-indigo-600 hover:text-indigo-500"
        onClick={() => setOpen(false)}
      >
        Continue Shopping
        <span aria-hidden="true"> &rarr;</span>
      </button>
      </Link>
    </p>
  </div>
</div>

</div>

    </div>
    </div>
    </div>
    </>
   
   
  )
}

export default Checkout