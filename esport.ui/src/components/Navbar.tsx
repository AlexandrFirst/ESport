import React, { MouseEvent } from 'react'
import axios from 'axios'
import { NavLink, useHistory } from 'react-router-dom'

export const Navbar: React.FC = () => {
  const navigate = useHistory()
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const res = await axios.get(
      'http://localhost:5000/User/validate?postBackUrl=http://localhost:3000/about'
    )

    console.log(res)
    if (res.status === 200) {
      navigate.push('/about')
    }
    if(res.status === 302){
      console.log(res.headers.location);
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
            <a href="/about" onClick={handleClick}>
              rjkbguirwfgyiwrugfw
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
