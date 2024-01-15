import React, { useEffect, useState } from 'react'

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { clearSelectedProduct, createProductAsync, selectAllBrands, selectAllCategories, selectProductById, updateProductAsync } from '../../Product/ProductSlice'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { fetchProductByIdAsync } from '../../Product/ProductSlice'
import Modal from '../../common/Modal'



const ProductForm = () => {
    const brands =useSelector(selectAllBrands)
    const {register,handleSubmit,reset,setValue,watch,formState: { errors },  } = useForm()
    const params = useParams()
    const selectedProduct = useSelector(selectProductById)
    const [openModal,setOpenModal]= useState(null)



    const categories = useSelector(selectAllCategories)
    const dispatch = useDispatch()
    console.log(brands);

    useEffect(()=>{
        if(params.id){
           dispatch(fetchProductByIdAsync(params.id))
         

            
        }
        else{
            // agr id nhi hai meand user want to add , show him a empty form 
            dispatch(clearSelectedProduct())
           

        }
    },[params.id,dispatch])

    useEffect(()=>{
        if(selectedProduct && params.id)    // params.id means you are comming via edit root
        {
            // jb async call se product aa jaye tbhi ye render ho 
            setValue('title',selectedProduct.title)
            setValue('description',selectedProduct.description)
            setValue('brand',selectedProduct.brand)
            setValue('price',selectedProduct.price)
            setValue('discountPercentage',selectedProduct.discountPercentage)
            setValue('Stock',selectedProduct.stock)
            setValue('thumbnail',selectedProduct.thumbnail)
            setValue('category',selectedProduct.category)
            setValue('image1',selectedProduct.images[1])
            setValue('image2',selectedProduct.images[2])
            setValue('image3',selectedProduct.images[3])
        }
       

    },[selectedProduct,params.id,setValue])


    const handleDelete=()=>{
        const product = {...selectedProduct}
        product.deleted = true;  // product ke ander ek deleted name ki field attach kr do 
        dispatch(updateProductAsync(product))
    }



  return (
    <>
    <form    noValidate
    onSubmit={handleSubmit((data) => {
      console.log(data);
    //   Need to add product in DB

    const product = {...data}
    product.images = [product.image1,product.image2,product.image3,product.thumbnail]
    product.rating=0

    // Product ki array me add krne ke baad sari image field ko top product object se delete kr do 
    delete product['image1']
    delete product['image2']
    delete product['image3']

    // inhe number ki trah store kro
    product.price = +product.price
    product.stock = +product.stock
    product.discountPercentage = +product.discountPercentage
   

    console.log("Product is : ",product);  // ab product exactally vaisa hi bn gya jaisa required tha
    if(params.id)
    {        // agr id hai means admin wants to update a product else he is ading a new product
            product.id = params.id    //why ?? 
            product.rating = selectedProduct.rating || 0 

            dispatch(updateProductAsync(product))
            reset()
            //TODO: if successfully created then show a message and clear the form 

    }
    else{

        dispatch(createProductAsync(product))
        reset()
            //TODO: if successfully created then show a message and clear the form 

    }
      
    
     
    })}  >
      <div className="space-y-12 bg-white p-8">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
         

          <div className="mt-10 text-left grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* {selectedProduct['deleted']?selectedProduct.deleted:false && <h2 className=' text-red-500'>This product is Deleted</h2> } */}
            <div className="sm:col-span-6">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                   <input
                    type="text"
                    {...register('title',{required:"title is required"})}
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Write Product Title"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register('description',{required:"description is required"})}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about Product.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="Description" className="block text-sm font-medium leading-6 text-gray-900">
                Brands
              </label>
              <div className="mt-2">
               <select name="" id=""{...register('brand',{required:"brand is required"})}
  >
                <option value="">--Choose Brands--</option>
                {brands.map((brand)=>( <option  value={brand.value}>{brand.label} </option>))}
               
               </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
               <select name="" id="" {...register('category',{required:"category is required"})}>
                <option value="">--Choose Category--</option>
                {categories.map((category)=>( <option  value={category.value}>{category.label} </option>))}
               
               </select>
              </div>
            </div>


            <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                   <input
                    type="number"
                    {...register('price',{required:"price is required",min:1,max:10000})}

                    id="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  /> 
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                Discount
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                   <input
                    type="number" 
                    {...register('discountPercentage',{required:"discountPercentage is required",min:0,max:100})}
                    id="discountPercentage"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                   <input
                    type="number"
                    {...register('Stock',{required:"Stock is required",min:0})}
                    id="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
              Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                   <input
                    type="text"
                    {...register('thumbnail',{required:"thumbnail is required"})}
                    id="thumbnail"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter a URL "
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                Image 1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                   <input
                    type="text"
                    {...register('image1',{required:"image1 is required"})}

                    id="image1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Write Product Title"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                Image 2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                   <input
                    type="text"
                    {...register('image2',{required:"image2 is required"})}

                    id="image2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Write Product Title"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                Image 3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                   <input
                    type="text"
                    {...register('image3',{required:"image3 is required"})}

                    id="image3"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Write Product Title"
                  />
                </div>
              </div>
            </div>

           

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

          
          </div>
        </div>

     

        <div className="border-b text-left  border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>
        

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
           
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>

        {selectedProduct &&   (
         <button
        onClick={(e)=>{e.preventDefault();setOpenModal(true)}}
          type="submit"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Delete
        </button>)}

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    <Modal title={`Delete ${selectedProduct?.title}`}
                 message={`Are you sure , You want to delete this Product ?` }
                 dangerOption={'Delete'} 
                 cancelOption={'Cancel'} 
                 cancelAction={()=>{setOpenModal(null)}} 
                   showModal={openModal}
                 dangerAction={handleDelete}
                 >
                    
                    </Modal>
    </>
  )
}


export default ProductForm