import React from 'react'
import { NavLink,Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Shopping</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <NavLink to={'/'} className="nav-link active" aria-current="page">Home</NavLink>
                <NavLink to={'/about-us'} className="nav-link">About Us</NavLink>
                <NavLink to={'/products'} className="nav-link">Products</NavLink>
            </div>
            </div>
            <Link to="/login" className="navbar-brand">Login</Link>
        </div>
    </nav>
  )
}

export default Navigation