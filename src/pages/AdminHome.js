import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/Product/components/ProductList'
import AdminProductList from '../features/admin/components/AdminProductList'

const AdminHome = () => {
  return (
    <div>
        <Navbar>
            <AdminProductList></AdminProductList>
        </Navbar>
    </div>
  )
}

export default AdminHome