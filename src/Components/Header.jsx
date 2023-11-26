import React from 'react'
import '../styles/Header.scss'
import logo from '../assets/img/logo.png'
import like from '../assets/img/like-img.png'

function Header() {
  return (
    <div className="header">
      <div className='header-top'>
        <img src={logo} alt="" />
        <div className='left-item'>
          <img src={like} alt="" />
          <a href="#">Избранное</a>
        </div>
      </div>
      <div className='header-bottom'>
        <input type="text" placeholder='Поиск' />
      </div>
    </div>
  )
}

export default Header