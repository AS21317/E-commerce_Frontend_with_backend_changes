import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItemFromCartAsync, selectCartItems, selectCartItemsStatus, updateCartAsync } from './cartSlice'
import { Navigate } from 'react-router-dom'
import { discountedPrice } from '../../app/constant'
import { Grid } from 'react-loader-spinner'
import Modal from '../common/Modal'



const Cart = () => {
  console.log("Welcome to cart page ");
  const [open, setOpen] = useState(true)
  const [openModal,setOpenModal]= useState(null)
  
  // cartItems globaly redux store me present hai, which are used here as the naem items
  console.log("Fetching Available cart items from the cart ");
  const items  = useSelector(selectCartItems)
  const status = useSelector(selectCartItemsStatus)
  const dispatch = useDispatch()
  const totalAmount = items.reduce((amount,item)=>discountedPrice(item)*item.quantity +amount,0)
  const totalItems = items.reduce((total,item)=>item.quantity +total,0)

  const handleQuantity=(e,item)=>{
    console.log(item);
    console.log("printin updatddd item : ",{...item,quantity:+e.target.value});
    dispatch(updateCartAsync({...item, quantity:+e.target.value}))

  }

  const handleRemove=(e,id)=>{
    console.log("Calling deletion operation :");
    dispatch(deleteItemFromCartAsync(id))
  }

  return (
    <>
      {/* Cart me tabhi jao jab vha kuch ho */}
     {!items.length && <Navigate to={'/'} replace={true}></Navigate>}

                <div className="mx-auto  mt-24 bg-white max-w-7xl px-4 sm:px-6 lg:px-8"> 
                  <h2 className=' text-4xl font-bold tracking-tight text-gray-900'>Cart</h2>
                  <hr className='mb-6'/>


    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flow-root">
      
    {status === 'loading'?<Grid
  visible={true}
  height="80"
  width="80"
  color="rgb(79 ,70 ,229)"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass="grid-wrapper"
  />:null}
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
                <Modal title={`Delete ${item.title}`}
                 message={`Are you sure , You want to delete this cart Item ?` }
                 dangerOption={'Delete'} 
                 cancelOption={'Cancel'} 
                 cancelAction={()=>{setOpenModal(null)}} 
                   showModal={openModal === item.id}
                 dangerAction={(e)=>handleRemove(e,item.id)}
                 >
                    
                    </Modal>
                    
                  <button
               onClick={(e)=>{setOpenModal(item.id)}}
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
    <Link
      to={'/checkout'}
      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
    >
      Checkout
    </Link>
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
</>
  )
}

export default Cart
