import axios from 'axios'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'

export const Navbar: React.FC = () => {
  const navigate = useHistory()
  const handleClicck = async (e: any) => {
    e.preventDefault()
    const res = await axios.get(
      'http://localhost:5000/account/validate?postBackUrl=http://localhost:3000/about'
    )
    if (res.status === 200) {
      navigate.push('/about')
    }
  }
  return (
    <nav>
      <div className="nav-wrapper cyan darken-1 px1">
        <NavLink to="/" className="brand-logo">
          Redux + TypeScript
        </NavLink>
        <ul className="right hide-on-med-and-down">
          <li cy-data="home-nav-link">
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <a href="/about" onClick={handleClicck}>
              rjkbguirwfgyiwrugfw
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
