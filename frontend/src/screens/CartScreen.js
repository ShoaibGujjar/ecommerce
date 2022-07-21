import React, { useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, Container } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartAction'
import { TiDeleteOutline } from 'react-icons/ti'


function CartScreen({ match, location, history, search }) {
  const productId = match.params.id
  let params = useParams();
  let Location = useLocation();
  const qty = Location.search ? Number(Location.search.split("=")[1]) : 1;
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  // console.log('cartItem', cartItems)
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    history.push('/shipping')
  }
  return (
    <Container>
      <Row>
        <h1>My Bag</h1>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message variant='info'>
              Cart is empty <Link to='/store'>Go Back</Link></Message>
          ) : (
            <ListGroup variant='flush' id='btn-st' >
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={6}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col >
                    <Col md={4}>
                      <Row className='py-3'>
                        <h4> <Link to={`/product/${item.product}`}>{item.name}</Link></h4>
                      </Row>
                      <Row className='py-2'>
                        <h5>Rs: {item.price}</h5>
                      </Row>
                      <Row className='py-2'>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          id='btn-st'
                          onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                        >
                          {
                            [...Array(item.countInStock).keys()].map((x) =>
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>)
                          }
                        </Form.Control>
                      </Row>
                    </Col>

                    <Col md={1}>
                      <a onClick={() => removeFromCartHandler(item.product)} className="card_cross" href='#'><TiDeleteOutline /> </a>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )
          }
        </Col>
        <Col md={4}>
          <Row className='py-2'>
          </Row>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Total Item : {cartItems.reduce((acc, item) => acc + item.qty, 0)}</h3>
              <h4>Rs: {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}</h4>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <div className="d-grid gap-2" >
              <Button
                className='btn-block' id='btn-st'
                disabled={cartItems.length === 0}
                type='button'
                onClick={checkoutHandler}>ChecOut to Process

              </Button>

            </div>
          </ListGroup.Item>

        </Col>
      </Row>
    </Container>
  )
}

export default CartScreen
