import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap'

import { FormContainer } from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';

export default function PaymentScreen() {
    const navigator = useNavigate();

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    if(!shippingAddress.address) navigator('/shipping')

    const [paymentMethod, setPaymentMethod] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigator('/placeorder')
    }

    return (
        <FormContainer>
            <h1>Select Payment Method</h1>
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='' className='py-2'>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='PayPal' id='paypal' value='PayPal' onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>
                        <Form.Check type='radio' label='Credit card' id='card' value='Credit Card' onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>
                    </Col>

                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>Submit</Button>
            </Form>
        </FormContainer>
    )
}