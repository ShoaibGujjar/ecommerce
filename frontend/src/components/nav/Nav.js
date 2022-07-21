import React, { useState } from 'react'
import './nav.css'
import { AiOutlineAppstore, AiOutlineHome, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser, AiOutlineSearch } from 'react-icons/ai'
import { useHistory } from 'react-router-dom';
import { logout } from '../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
function Nav() {
    const dispatch = useDispatch()
    let history = useHistory()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div className='py-5'>


            <div className='navend'>
                <a href='/' className={history.location.pathname === '/' ? 'active' : ''}><AiOutlineHome /> </a>
                <a href='/store' className={history.location.pathname === '/store' ? 'active' : ''}><AiOutlineAppstore /> </a>
                <a href='/wishlist' className={history.location.pathname === '/wishlist' ? 'active' : ''}><AiOutlineHeart /> </a>
                <a href='/store' className={history.location.pathname === '/as' ? 'active' : ''}><AiOutlineSearch /> </a>
                <a href='/cart' className={history.location.pathname === '/cart' ? 'active' : ''}><AiOutlineShoppingCart /> </a>
                {
                    userInfo ? (
                        <a href="/profile" className={history.location.pathname === '/profile'}><AiOutlineUser /> </a>
                    ) : (<a href='/login' className={history.location.pathname === '/login'}><AiOutlineUser /> </a>)
                }
            </div>
        </div>
    )
}

export default Nav
