// show product detail 
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Form, Container, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { detailProduct, createProductReview } from '../actions/productAction'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { error: errorProductReview, loading: loadingProductReview, success: successProductReview } = productReviewCreate

  useEffect((e) => {

    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(detailProduct(match.params.id))
  }, [dispatch, match])
  const addToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(
      match.params.id, {
      rating,
      comment,
    }
    ))
  }
  return (
    <Container>
      <div fluid="md">
        <Link to='/store' className="btn btn-outline-dark  my-3" id='btn-st'>Go Back</Link>
        {loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message>
            : (
              <div>
                <div className='rowProduct' >
                  <div className='colProduct'>
                    <div className='imageCard'>
                      <Image src={product.image} alt={product.name} className='card-imageProduct' />
                    </div>
                  </div>
                  <div className='colProduct'>
                    <div className='datailCard'>
                      <div className='card-PrductDetail'>
                        <Col>
                          <h3>{product.name} </h3>
                        </Col>
                        <Col>
                          Description:{product.description}
                        </Col>
                        <Col>
                          Rs: {product.price}
                        </Col>
                        <Col>
                          <Rating value={product.rating} text={`(${product.numReviews} )`} color={'#f8e825'} />
                        </Col>
                        <Col>
                          Status: {product.countInStock > 0 ? 'in Stock' : 'Out of Stock'}
                        </Col>
                        <Col className="d-grid gap-2">
                          {
                            product.countInStock > 0 && (
                              <ListGroup.Item>
                                <Row>
                                  <Col>Qty</Col>
                                  <Col >
                                    <Form.Control
                                      as="select"
                                      value={qty}
                                      onChange={(e) => setQty(e.target.value)}
                                    >
                                      {
                                        [...Array(product.countInStock).keys()].map((x) =>
                                          <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                          </option>)
                                      }
                                    </Form.Control>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            )
                          }
                        </Col>
                        <Col className="d-grid gap-2">
                          {
                            product.countInStock > 0 && (
                              <Button
                                onClick={addToCart}
                                className='button  my-3'
                                id='btn-st'
                                disabled={product.countInStock === 0}
                                type='button'>Add to Cart
                              </Button>
                            )
                          }
                        </Col>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Row className='my-3'>
                    <Col>
                      <h4>
                        Reviews
                      </h4>
                      {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                      <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                          <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} color='#f8e825' />
                            <p>{review.createAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                          </ListGroup.Item>
                        ))}

                        <ListGroup.Item>
                          <h4>Write a review</h4>
                          {loadingProductReview && <Loader />}
                          {successProductReview && <Message variant='success'>Review Submitted</Message>}
                          {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                          {
                            userInfo ? (
                              <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                  <Form.Label>
                                    Rating
                                  </Form.Label>
                                  <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                    <option value=''>Select...</option>
                                    <option value='1'>1 - poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 - Excellent</option>
                                  </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='comment'>
                                  <Form.Label>Review</Form.Label>
                                  <Form.Control as='textarea' row='5' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Button disabled={loadingProductReview} className='btn-block  my-3' id='btn-st' type='submit' variant='primary'>
                                  Submit
                                </Button>
                              </Form>
                            ) : (
                              <Message variant='info'>
                                Please <Link to='/login'>
                                  login
                                </Link>
                                to write a review
                              </Message>
                            )
                          }
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </div>
              </div>
            )

        }
      </div>
    </Container>
  )
}

export default ProductScreen
