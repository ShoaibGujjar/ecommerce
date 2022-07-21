import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productAction'
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header'
function HomeScreen({ location, history }) {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products } = productList
  const types = localStorage.getItem('type');
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  let user = null;
  if (userInfo === null) {
    user = 0
  }
  else {
    user = userInfo.id
  }
  location = useLocation()

  let keyword = location.search
  useEffect(() => {
    dispatch(listProducts(user, types, keyword))
  }, [dispatch, user, types, keyword])

  return (
    <div>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          : products.length === 0 ? <Message variant='info'>No result found for your selected type</Message>
            : <div className='row'>
              {
                products.map(
                  product => (
                    <div key={product._id} className='column'>
                      <Product product={product} />
                    </div>
                  )
                )
              }
            </div>
      }
    </div>
  )

}

export default HomeScreen
