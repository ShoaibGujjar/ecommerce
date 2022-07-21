// alo this is store screen
import React, { useState, useEffect } from 'react'
import StoreScreen from './storeScreen'
import HomeScreen from './HomeScreen'
import { Container } from 'react-bootstrap'
function pinScreen({ history }) {

  return (
    <Container>
      <StoreScreen />
      <HomeScreen />
    </Container>
  )
}

export default pinScreen
