import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILED,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAILED,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_FAIL,
} from '../constants/productConstants'

export const productListReducers = (state = { products: [] }, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products:[] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAILED:
            return { loading: false, error: action.payload  }
        default:
            return state
    }
}

export const productDetailReducers = (state = { product: {reviews:[]} }, action) => {
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAIL_FAILED:
            return { loading: false, error: action.payload  }
        default:
            return state
    }
}

export const productCreateReviewReducers = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload  }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}