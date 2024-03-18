import axios from 'axios'

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILED,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAILED,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
} from '../constants/productConstants'

export const listProducts = (search='') => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`/api/products/${search}`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PRODUCT_LIST_FAILED,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const detailProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST })
        const { data } = await axios.get(`/api/products/${id}/`)
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PRODUCT_DETAIL_FAILED,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const createProductReview = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/review/${id}/`,
            review,
            config
        )

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}