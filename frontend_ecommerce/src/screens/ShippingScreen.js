import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer } from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';

export default function ShippingScreen() {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [country, setCountry] = useState(shippingAddress.country)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)

    const navigator = useNavigate();

    const submitHandler = () => {
        dispatch(saveShippingAddress({
            address, city, postalCode, country
        }) )
        navigator('/payment')
    }

    return (
        <FormContainer>
            <h1>Shipping Address</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' className='py-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter Address' value={address ? address : ""}
                            onChange={(e) => setAddress(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId='city' className='py-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter City' value={city ? city : ""}
                            onChange={(e) => setCity(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId='postalCode' className='py-2'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text' placeholder='Enter Postal Code' value={postalCode ? postalCode : ""}
                            onChange={(e) => setPostalCode(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId='country' className='py-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Enter your country' value={country ? country : ""}
                            onChange={(e) => setCountry(e.target.value)} required/>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>Submit</Button>
            </Form>
        </FormContainer>
    )
}