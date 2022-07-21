import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetail, payOrder } from '../actions/orderAction'
import { ORDER_PAY_RESET } from '../constants/orderConstants'


function OrderScreen({ match }) {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails


    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successpay } = orderPay

    if (!loading && !error) {
        order.itemsPrice = order.orderitems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


    //ASCIBbd0w627D2j_0COoqgsmvYfhmVzb8OhvQpIytETaFZYEzlOJLVXmIS1RsIaweUzy4Fom2stpzGDe
    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=ASCIBbd0w627D2j_0COoqgsmvYfhmVzb8OhvQpIytETaFZYEzlOJLVXmIS1RsIaweUzy4Fom2stpzGDe'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
    useEffect(() => {
        if (!order || successpay || order._id !== Number(orderId)) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetail(orderId))
        }
        else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderId, successpay])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1>Order:{order._id}</h1>
            <Row>
                <Col md={8}>

                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping:</strong>
                                {order.shippingAddress.address},{order.shippingAddress.city},
                                {' '},
                                {order.shippingAddress.postalCode},
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.delivereAt}</Message>
                            ) : <Message variant='warning'>Not Delivered</Message>
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : <Message variant='warning'>Not Paid</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {order.orderitems.length === 0 ? <Message variant='info'>
                                your order is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderitems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col md={5}>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={5}>
                                                    {item.qty} X {item.price}={(item.qty * item.price).toFixed(2)} Rs
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>


                    </ListGroup>
                </Col>

                <Col md={4}>

                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col> Item: </Col>
                                <Col> {order.itemsPrice} Rs</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col> Shipping: </Col>
                                <Col> {order.shippingPrice} Rs </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col> Tax: </Col>
                                <Col> {order.taxPrice} Rs</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col> Total: </Col>
                                <Col> {order.totalPrice} Rs </Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? (
                                    <Loader />
                                ) : (
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />)}

                            </ListGroup.Item>
                        )}

                    </ListGroup>

                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
