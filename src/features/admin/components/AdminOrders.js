import React, { useEffect, useState } from 'react'
import { fetchAllOrdersAsync,selectTotalOrdersCount,selectTotalOrders, updateOrderAsync } from '../../order/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ITEM_PER_PAGE, discountedPrice } from '../../../app/constant'
import { PencilIcon ,EyeIcon,ArrowDownIcon,ArrowUpIcon} from "@heroicons/react/24/outline";
import Pagination from '../../common/pagination';


const AdminOrders = () => {
    const dispatch = useDispatch()
    const [page,setPage]  = useState(1)
    const orders = useSelector(selectTotalOrders) 
    const totalOrders = useSelector(selectTotalOrdersCount)
    const [editableOrderId, setEditableOrderId] = useState(-1)
    const [sort, setSort] = useState({});
    
     console.log("Fetched orders is : ", orders);

    const chooseColor=(status)=>{
      switch(status){
        case 'pending':
          return 'bg-purple-200 text-purple-600';
          case 'dispatch':
            return 'bg-yellow-200 text-yellow-600';
            case 'delivered':
              return 'bg-green-200 text-green-600';
              case 'cancelled':
                return 'bg-red-200 text-red-600';
      }

    }



    const handleEdit=(order)=>{
      console.log("Handle Edit on Order: ",order);
      setEditableOrderId(order.id)  // each order ke andder multiple item ho sakte hai 

    }

    const handleShow=(order)=>{
      console.log("Handle show on Order: ",order);

    }

    const handleUpdate=(e,order)=>
    {
        const updatedOrder = {...order, status:e.target.value}
        dispatch(updateOrderAsync(updatedOrder))
        setEditableOrderId(-1)

    }

    const handlePage = (page) => {
      setPage(page);
    };
  
    const handleSort = (sortOption) => {
      const sort = { _sort: sortOption.sort, _order: sortOption.order };
      console.log({ sort });
      setSort(sort);
    };

     useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PER_PAGE};
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);




  return (
   
    <>
   {orders && 
    <div className="overflow-x-auto">
      <div className=" bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
        <div className="w-full ">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-3 cursor-pointer text-left" onClick={(e)=>handleSort({sort:'id', order:sort?._order ==='asc'?'desc':'asc'})}>Order Number#{' '}
                 {sort._sort === 'id' && sort._order === 'asc'? <ArrowUpIcon className='w-4 h-4 inline'></ArrowUpIcon>:
                  <ArrowDownIcon className='w-4 h-4 inline'></ArrowDownIcon>}
                  </th>
                  <th className="py-3 px-3 text-left">Items</th>
                  <th className="py-3 px-3 text-left">Price</th>
                  <th className="py-3 px-3 text-left">Quantity</th>
                  <th className="py-3 px-3 text-left">Shipping Address</th>

                  <th className="py-3 px-3 cursor-pointer text-left" onClick={(e)=>handleSort({sort:'totalAmount', order:sort?._order ==='asc'?'desc':'asc'})}>Total Amount{' '}
                 {sort._sort === 'totalAmount' && sort._order === 'asc'? <ArrowUpIcon className='w-4 h-4 inline'></ArrowUpIcon>:
                  <ArrowDownIcon className='w-4 h-4 inline'></ArrowDownIcon>}
                  </th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
              {orders.map((order) => (<tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2">
                        
                      </div>
                      <span className="font-medium">{order.id}</span>
                    </div>
                  </td>
                  <td className="py-3  px-6 text-left">
                 {order.items?.map(item=><div className="flex  items-center">
                      <div className="mr-2">
                        <img
                          className="w-6 h-6 rounded-full"
                          src={item.thumbnail}
                        />
                      </div>
                      <span>{item.title } </span>
                    </div>
                  )}
                  </td>

                  <td className="py-3 px-6 text-left">
                 {order.items?.map(item=><div className="flex items-center">
                      
                      <span>$ {discountedPrice(item) } </span>
                    </div>
                  )}
                  </td>


                  <td className="py-3 px-6 text-left">
                 {order.items?.map(item=><div className="flex justify-center items-center">
                      
                      <span>{item.quantity } </span>
                    </div>
                  )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="">
                    <div>
                      <strong className='text-[16px] font-bold'>{order.selectedAddress?.name}</strong>
                    </div>
                    <div className='text-md font-semibold'>{order.selectedAddress?.street}</div>
                    <div className='text-md font-semibold'>{order.selectedAddress?.city}</div>
                    <div className='text-md font-semibold'>{order.selectedAddress?.state}</div>
                    <div className='text-md font-semibold'>{order.selectedAddress?.pinCode}</div>
                    <div className='text-md font-semibold'>{order.selectedAddress?.email}</div>
                    </div>
                  </td>
                
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center">
                    $ {order.totalAmount}
                    </div>
                  </td>
                  
                  <td className="py-3 px-6 text-center">
                    {order.id === editableOrderId ?( 
                    <select name="" id="" onChange={(e)=> handleUpdate(e,order)}>
                      <option value="pending">Pending</option>
                      <option value="dispatch">Dispatch</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>) :

                    (
                      <span className={` ${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>  
                      {/* Class ke ander ek function bhi de sakte hai like above  */}
                        {order.status}
                      </span>)
                     }</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <div className="w-6 cursor-pointer mr-6 transform hover:text-purple-500 hover:scale-110">
                       <EyeIcon className='w-6 h-6' onClick={(e)=>handleShow(order)}></EyeIcon>
                      </div>
                      <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                       <PencilIcon className='w-6 h-6' onClick={(e)=>handleEdit(order)}></PencilIcon>
                      </div>
                     
                    </div>
                  </td>
                </tr>))}
          
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination  page={page} totalItems={totalOrders} setpage={setPage} handlePage={handlePage} />
    </div>}
  </>
  
  )
}

export default AdminOrders