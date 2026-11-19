import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Home from './components/Home'
import About from './components/About'
import ProductCatalog from './components/ProductCatalog'
import Login from './admin-components/Login'
import Signup from './admin-components/Signup'
import ProductList from './admin-components/ProductList'
import AddProduct from './admin-components/AddProduct'
import UpdateProduct from './admin-components/UpdateProduct'
import ViewProduct from './admin-components/ViewProduct'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      {/* <Navigation /> */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about-us' element={<About/>} />
        <Route path='/products' element={<ProductCatalog/>} />
        <Route path='/admin' element={<ProductList/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/allproducts' element={<ProductList/>} />
        <Route path='/addProduct' element={<AddProduct/>} />
        <Route path='/viewProduct/:id' element={<ViewProduct/>} />
        <Route path='/updateProduct/:id' element={<UpdateProduct/>} />
      </Routes>
    </>
  )
}

export default App