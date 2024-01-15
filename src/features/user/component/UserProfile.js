

import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../auth/authSlice'
import { selectUserInfo, updateUserAsync } from '../userSlice'
import { useForm } from 'react-hook-form'

 export default  function  UserProfile  () {
  console.log("Welcome to my profile Page: ");
    const dispatch = useDispatch()
    const user = useSelector(selectUserInfo)
    const {register,handleSubmit,reset,setValue,watch,formState: { errors },  } = useForm()
    const [selectedEditIndex,setSelectedEditIndex]= useState(-1)
    const [showAddAddressForm, setShowAddAddressForm] = useState(false)

    const handleEdit = (updatedAddress,index)=>{
      const newUser = {...user, addresses:[...user.addresses]} // for shalow copy issue
      newUser.addresses.splice(index,1,updatedAddress); 
      dispatch(updateUserAsync(newUser))
       // given index se ek element ht jaye and updatedAddress aa jaye 
      setSelectedEditIndex(-1);  //edit ke baad form vapas se gayab ho jayegqa 
    }

    // ye fun  current values ko form open krke show krega ans unlo edit krega 
    const handleEditForm = (index)=>{
      setSelectedEditIndex(index)
      const address  = user.addresses[index];
      setValue('name',address.name)
      setValue('email',address.email)
      setValue('city',address.city)
      setValue('state',address.state)
      setValue('street',address.street)
      setValue('pinCode',address.pinCode)
      setValue('phone',address.phone)
    }

    const handleRemove = (e,index)=>{
      const newUser = {...user, addresses:[...user.addresses]} // for shalow copy issue
      newUser.addresses.splice(index,1);
      // ab es nye address set ke sath user ko update kr do 
      dispatch(updateUserAsync(newUser))
      setShowAddAddressForm(false);
      
    }

    const handleAdd = (newAddress)=>{
      const newUser = {...user, addresses:[...user.addresses,newAddress]}  // user>addresses ,me nya address push kr diya 
      
      dispatch(updateUserAsync(newUser))
       // given index se ek element ht jaye and updatedAddress aa jaye 
      setShowAddAddressForm(false);  //edit ke baad form vapas se gayab ho jayegqa 

    }



  return (
    <div> 
         <div className="mx-auto  mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
               <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
               <h1 className=' text-4xl py-4 font-bold tracking-tight text-gray-900'>Name:{user.name? user.name:"Guest User"} </h1>
                  <h3 className=' text-2xl  font-bold tracking-tight text-red-700'>Email Address: {user.email}</h3>
                  {user.role ==='admin' && <h3 className=' text-2xl  font-bold tracking-tight text-red-700'>Role: {user.role}</h3>}
               </div>

                 


  


<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
<button
        onClick={(e)=>{setShowAddAddressForm(true);setSelectedEditIndex(-1);reset()}}
        type="submit"
        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
       Add New Address
      </button>
      {showAddAddressForm  ? 
  <form
          noValidate
          onSubmit={handleSubmit((data) => {
            reset();
            console.log(data);
            handleAdd(data)
            
          
           
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
      <button
        onClick={e=>setShowAddAddressForm(false)}
          type="submit"
          className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
         Cancel
        </button>
        <button
        
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>

       
      </div>

    </form>:null}





                {/* Edit wala form START FROM HERE  */}

  <p className=' text-2xl  font-bold tracking-tight text-left text-red-700'>Your Addresses : </p>
  {
    user.addresses.map((address,index)=> (
      <div>
  {selectedEditIndex === index ? 
  <form
          noValidate
          onSubmit={handleSubmit((data) => {
            console.log(data);
            handleEdit(data,index)
            
          
           
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
      <button
        onClick={e=>setSelectedEditIndex(-1)}
          type="submit"
          className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
         Cancel
        </button>
        <button
        
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit Address
        </button>
      </div>

        
      </div>

    </form>:null}
        

<div  className="flex border-solid border-2 mt-2 border-gray-300 px-5 justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
   
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900"><span className='font-semibold text-lg '>Name:</span>  {address.name}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500"><span className='font-semibold text-lg '>Street:</span>  {address.street}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500"><span className='font-semibold text-lg '>Zip Code:</span>  {address.pinCode}</p>
      </div>
    </div>
    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <p className="text-sm leading-6 text-gray-500"><span className='font-semibold text-lg '>Phone:</span>  {address.phone}</p>
      <p className="text-sm leading-6 text-gray-500"><span className='font-semibold text-lg '>State:</span>  {address.state}</p>  
    </div>

    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
    <div className="flex flex-col">
    <button
      // Edit ke liye hme el form bnana  padega 
                  onClick={(e)=>handleEditForm(index)}
                    type="button"
                    className="font-semibold cursor-pointer text-2xl text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>


                  <button
                  onClick={(e)=>handleRemove(e,index)}
                    type="button"
                    className="font-semibold  cursor-pointer text-2xl text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>

                 
                </div>
    </div>
  </div>
      </div>
    
    ))
  }


 
</div>

</div>
    </div>
  )
}
