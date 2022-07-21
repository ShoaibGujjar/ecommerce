import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormConntainer from '../components/FormConntainer'
import { saveShipppingAddress } from '../actions/cartAction'
import CheckoutStep from '../components/CheckoutStep'
function ShippingScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const { shippingAddress } = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    // const [message, setMessage] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShipppingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    if (!userInfo) {
        history.push('/login')
    }
    return (
        <FormConntainer>
            <CheckoutStep />
            <h1>Shipping </h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter City'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button
                    className='btn-block my-3'
                    id='btn-st'
                    type='submit'
                    variant='primary'
                >Continue
                </Button>
            </Form>
        </FormConntainer>
    )
}

export default ShippingScreen
