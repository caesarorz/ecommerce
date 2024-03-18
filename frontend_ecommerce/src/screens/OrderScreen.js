import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';


export default function OrderScreen() {
    const orderId = useParams()

    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails;

    if(!loading && !error) {
        order.items_price = order.ordersItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }
    useEffect(() => {
        dispatch(getOrderDetails(orderId.id))
    }, [])


    return loading ?
        <Loader/> : error ?
        <Message variant='danger'> {error}</Message> :
        (
        <div>
            <h1>Order: {order.id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                {order.shipping_address.address},
                                {order.shipping_address.city},
                                {order.shipping_address.postalCode},
                                {order.shipping_address.country}
                            </p>
                            {order && order.is_delivered ? (  <Message variant='success'>Delivered: {order.delivered_at}
                                                </Message>) :
                                                <Message variant='warning'>Not delivered yet</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                {order.payment_method}
                            </p>
                            {order && order.is_paid ? (<Message variant='success'>
                                Paid on: {order.paid_at}
                            </Message>) :
                            <Message variant='warning'>Not paid</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            <p>
                                {order.ordersItems.length === 0 ?
                                    <Message variant='info'>Your order is empty
                                    </Message> : (
                                    <ListGroup variant='flush'>
                                        {order.ordersItems.map((item, index) =>
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = {(item.qty*item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                )}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>${order.items_price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shipping_price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.tax_price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.total_price}</Col>
                                </Row>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}