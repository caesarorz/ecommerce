import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';
import Message from '../components/Message';
import { registerUser } from '../actions/userActions';
import { FormContainer } from '../components/FormContainer';

export default function RegisterScreen() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [message, setMessage] = useState('')

    const navegate = useNavigate();
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, _ } = userRegister

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== passwordConfirm)
            setMessage('Passwords do not match!')
        else {
            dispatch(registerUser(name, email, password))
            navegate('/')
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            { message && <Message variant='danger'>{message}</Message> }
            { error && <Message variant='danger'>{error}</Message> }
            { loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='py-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Name' value={name}
                        onChange={(e) => setName(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId='email' className='py-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email}
                        onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId='password' className='py-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password}
                        onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId='passwordConfirm' className='py-2'>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)} required/>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>Register</Button>
            </Form>

            <Row className='py-3'>
                <Col>Already have an account?
                    {/* <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link> */}
                    <Link to={'/login'}> Login Here</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}