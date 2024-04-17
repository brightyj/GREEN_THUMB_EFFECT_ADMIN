import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'indoor',
    new_price: '',
    old_price: ''
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = { ...productDetails };

    try {
      let formData = new FormData();
      formData.append('product', image);
      const response = await fetch('https://green-thumb-effect-backend.onrender.com/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });
      responseData = await response.json();
      if (responseData.success) {
        product.image = responseData.image_url;
        console.log(product);

        // Send the product data to addproduct endpoint
        await fetch('https://green-thumb-effect-backend.onrender.com/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        }).then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert('Product Added');
            } else {
              alert('Failed to add Product');
            }
          });
      }
    } catch (error) {
      console.error('Error occurred while uploading image:', error);
    }
  };

  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>Product title</p>
        <input type='text' name='name' value={productDetails.name} onChange={changeHandler} placeholder='Type here' />
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Price(Rs)</p>
          <input type='text' name='old_price' value={productDetails.old_price} onChange={changeHandler} placeholder='Type here' />
        </div>
        <div className='addproduct-itemfield'>
          <p>Offer Price</p>
          <input type='text' name='new_price' value={productDetails.new_price} onChange={changeHandler} placeholder='Type here' />
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select value={productDetails.category} name='category' className='add-product-selector' onChange={changeHandler}>
          <option value='indoor'>Indoor plants</option>
          <option value='outdoor'>Outdoor plants</option>
          <option value='succulent'>Succulent plants</option>
          <option value='fertilizer'>Fertilizers</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
        <img className="addproduct-thumbnail-img" src={!image?upload_area:URL.createObjectURL(image)} alt="" />
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
      </div>
      <button className='addproduct-btn' onClick={Add_Product}>ADD</button>
    </div>
  );
};

export default AddProduct;
