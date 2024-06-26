import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { listProducts } from '../actions/productActions';

export default function HomeScreen() {

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products } = productList

  const { search } = useLocation()

  useEffect(() => {
    dispatch(listProducts(search))
  }, [dispatch])

  return (
    <div>
        <h1>Latest Products</h1>
        {loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message>
          : (
              <Row>
                {products.map(product =>
                (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
              </Row>
          )
      }


    </div>
  );
}