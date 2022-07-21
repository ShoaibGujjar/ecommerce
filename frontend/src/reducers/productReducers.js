import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,

    TYPE_LIST_FAIL,
    TYPE_LIST_REQUEST,
    TYPE_LIST_SUCCESS,

    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,

    ADDTOWISHLIST_FAIL,
    ADDTOWISHLIST_REQUEST,
    ADDTOWISHLIST_SUCCESS,

    WISH_LIST_REQUEST,
    WISH_LIST_SUCCESS,
    WISH_LIST_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

} from '../constants/productConstants'

export const productListReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state


    }
}

export const wishListReducers = (state = { wishlist: [] }, action) => {
    switch (action.type) {
        case WISH_LIST_REQUEST:
            return { loading: true, wishlist: [] }

        case WISH_LIST_SUCCESS:
            return { loading: false, wishlist: action.payload }

        case WISH_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state


    }
}


export const typeListReducers = (state = { list: [] }, action) => {
    switch (action.type) {
        case TYPE_LIST_REQUEST:
            return { loading: true, list: [] }

        case TYPE_LIST_SUCCESS:
            return { loading: false, list: action.payload }

        case TYPE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state


    }
}


export const productDetailsReducers = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state


    }
}


export const addWishListReducers = (state = {}, action) => {
    switch (action.type) {
        case ADDTOWISHLIST_REQUEST:
            return { loading: true, }

        case ADDTOWISHLIST_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case ADDTOWISHLIST_FAIL:
            return { loading: false, error: action.payload }

        // case USER_LOGOUT:
        //     return {}
        default:
            return state


    }
}


export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: TYPE_LIST_REQUEST }

        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        default:
            return state


    }
}