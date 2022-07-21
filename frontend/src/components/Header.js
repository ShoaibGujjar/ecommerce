import React, { useState, useEffect } from 'react'
import { Nav, Navbar, Container, NavDropdown, } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
function Header() {
  const [keyword, setKeyword] = useState('')
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  // console.log(keyword)
  let history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
      history.push(`/store/?keyword=${keyword}`)
    }
    else {
      history.push(history.push(history.location.pathname))
    }
  }
  return (
    <nav className="navbar">
      {/* <a href="/" className="logo">LOGO</a> */}
      <div className='list'>
        <a href="/" className="link">home</a>
        <a href="/store" className="link">Store</a>
        <a href="/wishlist" className="link">wishlist</a>
        <a href="/cart" className="link"><AiOutlineShoppingCart className='react-icon-size' /></a>
        <div className="search-box">
          <input type="text" onChange={(e) => setKeyword(e.target.value)} placeholder="search...." />
          <a onClick={submitHandler} className="icon">
            <i className="fas fa-search"></i>
          </a>
        </div>
        {
          userInfo ? (
            <a href="/profile" className='link'><AiOutlineUser className='react-icon-size' /> </a>
          ) : (<a href='/login' className='link' ><AiOutlineUser className='react-icon-size' /> </a>)
        }
      </div >
    </nav>
  )
}
export default Header


