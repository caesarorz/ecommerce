import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [message, setMessage] = useState('')

    const navegate = useNavigate();
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    console.log(userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const { loading: loadingOrders, error: errorOrders, orders } = useSelector(state => state.ordersList)
    // console.log('ordersList ', orders)
    console.log('orders ', orders, ' loading ', loadingOrders)

    useEffect(() => {
        if(!userInfo) {
            navegate('/login')
        }
        else {
            if(!user || !user.name || success) {
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listOrders())
            }else {
                setName(userInfo.name)
                setEmail(userInfo.email)
            }
        }
    }, [dispatch, userInfo, user, success])


    const parseDate = (date) => {
        const dt = new Date("2023-05-09T23:43:51Z"); // now is a date object for current time
        const now = new Date(); // now is a date object for current time
        const timedelta = dt.getTime() - now.getTime(); // timedelta is in milliseconds
        const hours = Math.floor(timedelta / (1000 * 60 * 60)); // hours is the number of hours in timedelta
        const days = Math.floor(hours / 24); // days is the number of days in timedelta
        console.log(hours, days)
        var output = "";
        if (days > 0) {
          output += days + " day(s) ";
        }
        if (hours > 0) {
          output += hours % 24 + " hour(s) "; // use modulo to get the remaining hours
        }
        output += "from now";
        console.log(output); // e.g. "2 day(s) 5 hour(s) from now"
        return output;
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== passwordConfirm)
            setMessage('Passwords do not match!')
        else {
            dispatch(updateUserProfile({
                'id': user.id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
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
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirm' className='py-2'>
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password' value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)} />
                    </Form.Group>
                    <Button type='submit' variant='primary' className='my-2'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                {
                    loadingOrders ? ( <Loader/> ) :
                    errorOrders ? (<Message variant='danger'>{errorOrders }</Message>) :
                    (
                        <Table striped responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Created at</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivery date</th>
                                    <th>See order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.created_at.substring(0, 10)}</td>
                                            <td>${order.total_price}</td>
                                            <td>{order.is_paid ? order.paid_at : (
                                                <i className='fas fa-times' style={{color: 'red'}}>Not yet</i>)}
                                            </td>
                                            {/* <td>{order.is_delivered ? order.delivered_at.substring(0, 10) : 'In progress'}</td> */}
                                            <td>{order.is_delivered ? order.delivered_at : 'In progress'}</td>
                                            <td>
                                                <LinkContainer to={`/order/${order.id}/`}>
                                                    <Button className='btn-sm'>See Order</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                ))}
                            </tbody>

                        </Table>
                    )
                }
            </Col>
        </Row>
    )
}