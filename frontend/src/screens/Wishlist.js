import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listWishlist } from '../actions/productAction'
import { del_to_wishlist } from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ImCross } from 'react-icons/im'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
function Wishlist(match, history) {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const wishList = useSelector(state => state.wishList)
  const { error, loading, wishlist } = wishList
  let user = null;
  useEffect(() => {
    if (userInfo === null) {
      console.log(null)
    }
    else {
      user = userInfo.id
      dispatch(listWishlist(user))
    }
  }, [dispatch, user])
  const removeFromCartHandler = (id) => {
    user = userInfo.id
    dispatch(del_to_wishlist(user, id))
  }
  // const [qty, setQty] = useState(1)
  // const addToCart = (id) => {
  //   history.push(`/cart/${id}?qty=${qty}`)
  // }
  return (
    <Container>
      {userInfo === null ? (
        <Message variant='info'>
          you must login <Link to='/login'>login</Link></Message>
      ) : (
        <div>
          {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
              :
              <div className='rowwishlist' >
                {
                  wishlist.map(
                    product => (
                      <div key={product._id}>
                        <div className='colwishlist'>
                          <div className='wishlistimage'>
                            <img className="wishlist-card-image" src={product.image} />
                          </div>
                        </div>
                        <div className='colwishlist'>
                          <div className='wishlistdatail'>
                            <a href='/wishlist' onClick={() => removeFromCartHandler(product._id)} className="card-cross"><ImCross /> </a>
                            <div className='wishlist-card-title'>
                              {product.name}
                              <br></br>
                              {product.price}
                              {/* {
                                product.countInStock > 0 && (
                                  <Button
                                  onChange={(e) => setPaymentMethod(e.target.value)}
                                    onClick={addToCart(product._id)}
                                    className='button'
                                    id='btn-st'
                                    disabled={product.countInStock === 0}
                                    type='button'>Add to Cart
                                  </Button>
                                )
                              } */}
                            </div>
                          </div>
                        </div>

                      </div>

                    )
                  )
                }
                <div></div>
              </div>
          }
        </div>
      )
      }
    </Container>
  )
}

export default Wishlist


