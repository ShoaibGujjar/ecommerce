import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { addWishlist } from '../actions/productAction'
import { Button } from 'react-bootstrap'
import { del_to_wishlist } from '../actions/productAction'

function Product({ product }) {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  let user = null;
  const dispatch = useDispatch()
  const SubmitHandler = (e) => {
    if (userInfo === null) {
      console.log(null)
    }
    else {
      user = userInfo.id
      // e.preventDefault()
      dispatch(addWishlist(user, product._id))
    }
  }
  const removeFromCartHandler = (id) => {
    if (userInfo === null) {
      console.log(null)
    }
    else {
      user = userInfo.id
      dispatch(del_to_wishlist(user, id))
    }
  }
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img className="card-image" src={product.image} />
      </Link>
      <div className="card-title">
        <Link to={`/product/${product._id}`}>
          {product.name}
          <br></br>
          <h6>Rs {product.price}</h6>
        </Link>
      </div>
      {product.is_favourite === false ? <a href='/store' onClick={SubmitHandler} className="card-heart"><AiOutlineHeart /> </a>
        : <a href='/store' onClick={() => removeFromCartHandler(product._id)} className="card-heart"><AiFillHeart /> </a>}
    </div>
  );
}

export default Product;
