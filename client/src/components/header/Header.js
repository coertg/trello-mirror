import React from 'react'
import './Header.css'

const Header = ({boardTitle}) => (
  <div className='Header'>
    <div>{boardTitle} 🍕</div>
  </div>
)

export default Header