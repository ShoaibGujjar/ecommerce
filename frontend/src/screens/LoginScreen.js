import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormConntainer from '../components/FormConntainer'
import { login } from '../actions/userAction'
import { useHistory } from 'react-router-dom';

function LoginScreen({ location }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let Location = useLocation();
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    let history = useHistory()
    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
            // history.push(history.push(history.location.pathname))
        }
    }, [history, userInfo, redirect])



    // const submitHandler = (e) => {
    //   e.preventDefault()
    //   if (keyword) {
    //     history.push(`/store/?keyword=${keyword}`)
    //   }
    //   else {
    //     history.push(history.push(history.location.pathname))
    //   }
    // }

    const SubmitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))

    }
    // console.log(redirect)
    return (
        <FormConntainer>
            <h1>sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={SubmitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
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
                <Button
                    className='btn-block my-3'
                    id='btn-st'
                    type='submit'
                    variant='primary'
                >Sign In
                </Button>
                <Row className='py-3'>
                    <Col>
                        New Customer? <Link
                            to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Register
                        </Link>
                    </Col>
                </Row>
            </Form>

        </FormConntainer>
    )
}

export default LoginScreen
