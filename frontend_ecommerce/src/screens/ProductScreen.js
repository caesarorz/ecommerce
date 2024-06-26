import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, Button, ListGroup, Card, Form, ListGroupItem } from 'react-bootstrap'

import { detailProduct, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'


function ProductScreen() {
    const cat = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
    const { id } = useParams();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(-1)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product} = productDetail

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productCreateReview)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview } = productReviewCreate

    useEffect(() => {
        if(successProductReview) {
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(detailProduct(id))
    }, [dispatch,id,successProductReview])

    const addtoCartHandler = (e) => {
        e.preventDefault()
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id, {
            rating,
            comment
        }))
    }


    return (
            <div>
                <Link to='/' style={{ width: '10%'}} className='btn btn-primary my-3'>Go back</Link>
                {loading ?
                    <Loader />
                    : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid/>
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant='flush'>

                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating
                                                value={product.rating}
                                                text={`${!product.num_reviews ? 'No' : product.num_reviews} reviews`}
                                                color={'#f8e825'}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Price: ${product.price}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Description: {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>

                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col><strong>${product.price}</strong></Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        <strong>{
                                                        product.countin_stock > 0
                                                        ? 'In Stock'
                                                        : 'Out of Stock'
                                                        }</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countin_stock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}>
                                                                {

                                                                    [...Array(product.countin_stock).keys()].map(
                                                                        (x) => (<option
                                                                                    key={ x + 1 }
                                                                                    value={x + 1 }>{x + 1}
                                                                                </option>)
                                                                                )
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}

                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addtoCartHandler}
                                                    variant="primary"
                                                    size="lg"
                                                    style={{ width: '100%'}}
                                                    disabled={product.countin_stock === 0}
                                                    type='button'>
                                                        Add to Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>

                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>Reviews</h4>
                                    {product.reviews.length === 0 &&
                                        <Message variant='blue'>No reviews yet</Message>}

                                    <ListGroup variant='flush'>
                                        {product.reviews.map((review) => (
                                            <ListGroup.Item key={review.id}>
                                                <strong> {review.name} </strong>
                                                <Rating value={review.rating} color={'#f8e825'}></Rating>
                                                <p>{review.created_at.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}
                                        <ListGroupItem>
                                            <h4>Write a review</h4>
                                            {loadingProductReview && <Loader/>}
                                            {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>
                                                            Rating
                                                        </Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                            >
                                                                <option value='-1'>Select your rating (1-5)</option>
                                                                {
                                                                [0,1,2,3,4].map((i) =>
                                                                    ( <option key={i} value={i}>{i+1} - {cat[i]}</option>)
                                                                )}
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>
                                                            Comment
                                                        </Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            placeholder='Leave your comment here'
                                                            onChange={(e) => setComment(e.target.value)}>

                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Button
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >Submit Review</Button>
                                                </Form>
                                            ) : (
                                                <Message variant='info'>Login <Link to={'/login'}>here</Link> to leave a review</Message>
                                            )}
                                        </ListGroupItem>
                                    </ListGroup>

                                </Col>
                            </Row>
                        </div>
                    )

                }

            </div>
        );
}

export default ProductScreen;
