import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    productListReducers,
    productCreateReviewReducers,
    productDetailReducers } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    ordersListReducer } from './reducers/orderReducers'

import {
    userLoginReducers,
    userRegisterReducers,
    userDetailsReducers,
    userUpdateProfileReducers,
    } from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailReducers,
    productCreateReview: productCreateReviewReducers,
    cart: cartReducer,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    ordersList: ordersListReducer,

})

const cartItemsLocalStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) :
    []

const userInfoLocalStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) :
    null

const shippingAddressInfoLocalStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) :
    {}


const initialState = {
    cart: {
        cartItems: cartItemsLocalStorage,
        shippingAddress: shippingAddressInfoLocalStorage
    },
    userLogin: {userInfo: userInfoLocalStorage},
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store