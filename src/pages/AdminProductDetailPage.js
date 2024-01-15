
import React from 'react'
import ProductDetails from '../features/Product/components/ProductDetails'
import Navbar from '../features/navbar/Navbar'
import AdminProductDetails from '../features/admin/components/AdminProductDetails'

const AdminProductDetailPage = () => {
  return (
    <div>
        <Navbar>
        <AdminProductDetails/>
        </Navbar>
        
    </div>
  )
}

export default AdminProductDetailPage