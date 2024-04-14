import React from 'react'
import './Sidebar.css'
import {Link}from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.jpg'
import list_product_icon from '../../assets/Product_list.jpg'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/add-product'} style={{textDecoration:"none"}}>
       <div className='sidebar-item'>
        <img src={add_product_icon}alt=""/>
        <p>ADD PRODUCT</p>
        </div>
        </Link>
        <Link to={'/list-product'} style={{textDecoration:"none"}}>
       <div className='sidebar-item'>
        <img src={list_product_icon}alt=""/>
        <p>PRODUCT LIST</p>
        </div>
        </Link>
          </div>
  )
}

export default Sidebar
