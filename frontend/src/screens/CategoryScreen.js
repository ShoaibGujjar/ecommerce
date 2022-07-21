import React, { useState } from 'react'
import './Category.css'
import { Link } from 'react-router-dom'
import kid from '../images/2k.jpg'
import women from '../images/women.png'
import man from '../images/download.png'
function CategoryScreen() {
  const [collection, setType] = useState('')
  localStorage.setItem('collection', setType);
  localStorage.setItem('collection', setType ? collection : '');
  return (
    <div className='category'>
      <div className='finalcategory'>
        <div className='subcategory' >
          <a href='/store' onClick={() => setType('M')} >
            <div className='col1'>
              <div className='smallcontainer'>
                <div className='link'>MEN</div>
              </div>
            </div>
            <div className='col1'>
              <img className='images' src={man} alt="kid" />
            </div>
          </a>
        </div >
        <div className='subcategory' >
          <a href='/store' onClick={() => setType('W')} >
            <div className='col1'>
              <div className='smallcontainer'>
                <div className='link'>WOMEN</div>
              </div>
            </div>
            <div className='col1'>
              <img className='images' src={women} alt="kid" />
            </div>
          </a>
        </div >
        <div className='subcategory' >
          <a href='/store' onClick={() => setType('J')} >
            <div className='col1'>
              <div className='smallcontainer'>
                <div className='link'>JUNIOR</div>
              </div>
            </div>
            <div className='col1'>
              <img className='images' src={kid} alt="kid" />
            </div>
          </a>
        </div >
      </div >
    </div >
  )
}

export default CategoryScreen
