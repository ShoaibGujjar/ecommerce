import React, { useState, useEffect } from 'react'
import { Nav } from 'react-bootstrap';
import { Form, Button, Col, Row, Container, Table } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderAction'
import { logout } from '../actions/userAction'
function ProfileScreen({ history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userUpdateprofile = useSelector(state => state.userUpdateprofile)
    const { success } = userUpdateprofile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])
    const SubmitHandler = (e) => {
        e.preventDefault()
        if (password != confirmpassword) {
            setMessage('password do not match')
        }
        else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            setMessage('')
        }
    }

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <div className="d-grid gap-2" >
                        <Button
                            className='btn-block  my-3' id='btn-st'
                            // disabled={cartItems.length === 0}
                            type='button'
                            onClick={logoutHandler}
                        >
                            logout

                        </Button>

                    </div>
                    <h2>User Profile</h2>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={SubmitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                required
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='passwordConfirm'>
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Button
                            className='btn-block my-3'
                            id='btn-st'
                            type='submit'
                            variant='primary'
                        >update
                        </Button>
                    </Form>

                </Col>
                <Col md={1}></Col>
                <Col md={8}>
                    <h2>My order</h2>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant='danger'>{errorOrders}</Message>
                    ) : (
                        <Table striped responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID </th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr>
                                        <td>{order._id}</td>
                                        <td>{order.createAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}</td>
                                        <td>

                                            <Nav.Link as={Link} to={`/order/${order._id}`}>
                                                <Button className='btn-sm' id='btn-st'>Detail</Button>
                                            </Nav.Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen
