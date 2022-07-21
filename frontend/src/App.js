import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import storeScreen from './screens/storeScreen';
import Nav from './components/nav/Nav';
import CategoryScreen from './screens/CategoryScreen';
import pinScreen from './screens/pinScreen';
import Wishlist from './screens/Wishlist';
import Search from './screens/Search';
import Sizechart from './Sizechart';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
function App() {

  // this code is for get window width and hight
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })
  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })
  }
  useEffect(() => {
    window.addEventListener('resize', detectSize)
    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimenion])


  return (
    <div id='bodys'>
      <Router>
        {/* {NavHandler ==="" ? '' : windowDimenion.winWidth >= 576 ? <Header /> : ''} */}
        {windowDimenion.winWidth >= 576 ? <Header /> : ''}
        <main className='py-3'>
          <Route path='/' component={CategoryScreen} exact />
          <Route path='/store' component={pinScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/wishlist' component={Wishlist} />
          <Route path='/search' component={Search} />
          <Route path='/Sizechart' component={Sizechart} />
        </main>

        {windowDimenion.winWidth <= 575 ? <Nav /> : ''}
      </Router>

    </div>
  );
}

export default App;
