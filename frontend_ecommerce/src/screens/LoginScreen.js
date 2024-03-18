import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import { FormContainer } from '../components/FormContainer';

export default function LoginScreen({location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navegate = useNavigate();

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    if(userInfo) {
        navegate('/')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            { error && <Message variant='danger'>{error}</Message> }
            { loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>Sign In</Button>
            </Form>

            <Row className='py-3'>
                <Col>New Customer?
                    {/* <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link> */}
                    <Link to={'/register'}> Register Here</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}
