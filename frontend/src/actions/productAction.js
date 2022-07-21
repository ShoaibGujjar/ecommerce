import axios from 'axios'
import Product from '../components/Product';
import { useSelector } from 'react-redux'
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

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    ADDTOWISHLIST_FAIL,
    ADDTOWISHLIST_REQUEST,
    ADDTOWISHLIST_SUCCESS,

    WISH_LIST_REQUEST,
    WISH_LIST_SUCCESS,
    WISH_LIST_FAIL,

    DEL_TO_WISHLIST_FAIL,
    DEL_TO_WISHLIST_REQUEST,
    DEL_TO_WISHLIST_SUCCESS,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
} from '../constants/productConstants'



export const typeList = () => async (dispatch) => {
    const types = localStorage.getItem('type');
    try {
        dispatch({ type: TYPE_LIST_REQUEST })
        const { data } = await axios.get('/api/type/')
        dispatch({
            type: TYPE_LIST_SUCCESS,
            payload: data
        })
        localStorage.setItem('items', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: TYPE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }


}
export const listProducts = (user, types = '', keyword = '') => async (dispatch) => {
    const collection = localStorage.getItem('collection');
    const type = localStorage.getItem('type');
    if (type.length === 0) {
        types = 'all'
    }
    if (keyword.length === 0) {
        keyword = '?'
    }
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`/api/typeproduct/${keyword}&user=${user}&collection=${collection}&type=${types}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listWishlist = (user) => async (dispatch) => {
    try {
        dispatch({ type: WISH_LIST_REQUEST })
        const { data } = await axios.get(`/api/wishlist/?user=${user}`)
        dispatch({
            type: WISH_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: WISH_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const detailProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/product/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}









export const addWishlist = (user, product) => async (dispatch) => {
    try {
        dispatch({
            type: ADDTOWISHLIST_REQUEST
        })
        const config = {
            Headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/addto_wishlist/',
            { 'user': user, 'product': product },
            config
        )
        dispatch({
            type: ADDTOWISHLIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADDTOWISHLIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const del_to_wishlist = (user, product) => async (dispatch) => {

    try {
        dispatch({ type: DEL_TO_WISHLIST_REQUEST })
        const { data } = await axios.get(`/api/del_wishlist/?user=${user}&product=${product}`)
        dispatch({
            type: DEL_TO_WISHLIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DEL_TO_WISHLIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(
            `/api/product/${productId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}


