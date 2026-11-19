import React, { useRef } from 'react'
import { useNavigate,Link } from 'react-router-dom'

function Login() {
    const goTo = useNavigate()
    const user = useRef()
    const pass = useRef()

    const getUsername = localStorage.getItem("username")
    const getPassword = localStorage.getItem("password")

    if(getUsername && getPassword){
        goTo('/allproducts')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(user.current.value=='priyanjaliagarwal27@gmail.com' && pass.current.value=='12345'){
            localStorage.setItem('username','priyanjaliagarwal27@gmail.com')
            localStorage.setItem('password','12345')
            goTo('/allproducts')
        }
    }
  return (
        <div className="container-fluid">
        <div className="row login-container">
            
            {/* <!-- Left Side: Login Form --> */}
            <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center justify-content-center bg-white py-5 px-4 px-sm-5">
                <div className="w-100" style={{maxWidth: "400px"}}>
                    
                    {/* <!-- Back to Shop Link --> */}
                    <div className="mb-4">
                            <Link to="/" className="text-decoration-none text-muted small fw-semibold"><i className="bi bi-arrow-left me-1"></i>Back to store</Link>
                    </div>

                    {/* <!-- Header --> */}
                    <h2 className="fw-bold text-dark mb-1">Welcome back</h2>
                    <p className="text-muted mb-4">Please enter your credentials to access your account.</p>

                    {/* <!-- Login Form --> */}
                    <form onSubmit={handleSubmit}>
                        
                        {/* <!-- Email Field --> */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label small fw-semibold text-muted">Email Address</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope text-muted"></i></span>
                                <input type="email" ref={user} className="form-control bg-light border-start-0" id="email" placeholder="name@example.com" required/>
                            </div>
                        </div>

                        {/* <!-- Password Field --> */}
                        <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                                <label htmlFor="password" className="form-label small fw-semibold text-muted mb-0">Password</label>
                                <a href="#" className="text-decoration-none text-dark small fw-semibold">Forgot password?</a>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><i className="bi bi-lock text-muted"></i></span>
                                <input type="password" ref={pass} className="form-control bg-light border-start-0" id="password" placeholder="••••••••" required/>
                            </div>
                        </div>

                        {/* <!-- Remember Me Checkbox --> */}
                        <div className="form-check mb-4">
                            <input className="form-check-input" type="checkbox" id="rememberMe"/>
                            <label className="form-check-label text-muted small" htmlFor="rememberMe">
                                Keep me logged in
                            </label>
                        </div>

                        {/* <!-- Submit Button --> */}
                        <button type="submit" className="btn btn-dark w-100 py-2.5 fw-semibold mb-3">
                            Sign In <i className="bi bi-box-arrow-in-right ms-1"></i>
                        </button>

                        {/* <!-- Social Sign-in Button --> */}
                        {/* <button type="button" className="btn btn-outline-secondary w-100 py-2.5 d-flex align-items-center justify-content-center gap-2 mb-4">
                            <i className="bi bi-google text-danger"></i> Sign in with Google
                        </button> */}
                    </form>

                    {/* <!-- Footer Link --> */}
                    <div className="text-center">
                        <p className="text-muted small mb-0">Don't have an account? <Link to="/register" className="text-decoration-none text-dark fw-bold">Sign up for free</Link></p>
                    </div>

                </div>
            </div>

            {/* <!-- Right Side: Decorative Image Banner (Hidden on Mobile) --> */}
            {/* <div className="col-md-6 col-lg-7 d-none d-md-flex align-items-center login-banner p-5">
                <div className="text-white" style={{maxWidth:"500px"}} >
                    <span className="badge bg-white text-dark mb-3 px-3 py-2 fw-semibold text-uppercase tracking-wider">New Season</span>
                    <h1 className="display-4 fw-bold mb-3">Manage Your Digital Storefront Efforlessly.</h1>
                    <p className="lead text-white-50">Upload products, monitor incoming customer traffic loops, track inventory, and view analytics in one singular console dashboard.</p>
                </div>
            </div> */}

        </div>
    </div>
  )
}

export default Login