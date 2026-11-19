import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
    return (
        <div className="container py-5">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-12 col-md-8 col-lg-6">

                    {/* <!-- Back Link --> */}
                    <div className="text-center mb-4">
                        <Link to="/" className="text-decoration-none text-dark fw-semibold small">
                            <i className="bi bi-shop me-1"></i> Return to Store
                        </Link>
                    </div>

                    {/* <!-- Registration Card Wrapper --> */}
                    <div className="card signup-card shadow-lg border-0 bg-white p-4 p-sm-5">

                        {/* <!-- Headings --> */}
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-dark mb-1">Create an Account</h2>
                            <p className="text-muted small">Join us to manage your store, track entries, and access exclusive tools.</p>
                        </div>

                        {/* <!-- Sign Up Form --> */}
                        <form action="#" method="POST" className="needs-validation" novalidate>

                            {/* <!-- Full Name Field --> */}
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label small fw-semibold text-muted">Full Name</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light text-muted border-end-0"><i className="bi bi-person"></i></span>
                                    <input type="text" className="form-control bg-light border-start-0" id="fullName" placeholder="John Doe" required/>
                                </div>
                            </div>

                            {/* <!-- Email Address Field --> */}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label small fw-semibold text-muted">Email Address</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light text-muted border-end-0"><i className="bi bi-envelope"></i></span>
                                    <input type="email" className="form-control bg-light border-start-0" id="email" placeholder="name@example.com" required/>
                                </div>
                            </div>

                            {/* <!-- Password Field --> */}
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label small fw-semibold text-muted">Password</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light text-muted border-end-0"><i className="bi bi-lock"></i></span>
                                    <input type="password" className="form-control bg-light border-start-0" id="password" placeholder="Min. 8 characters" minlength="8" required/>
                                </div>
                            </div>

                            {/* <!-- Confirm Password Field --> */}
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label small fw-semibold text-muted">Confirm Password</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light text-muted border-end-0"><i className="bi bi-shield-lock"></i></span>
                                    <input type="password" className="form-control bg-light border-start-0" id="confirmPassword" placeholder="Repeat your password" required/>
                                </div>
                            </div>

                            {/* <!-- Terms and Conditions Checkbox --> */}
                            <div className="form-check mb-4">
                                <input className="form-check-input" type="checkbox" value="" id="termsCheck" required/>
                                    <label className="form-check-label text-muted small" htmlFor="termsCheck">
                                        I agree to the <a href="#" className="text-dark fw-semibold text-decoration-none">Terms of Service</a> and <a href="#" className="text-dark fw-semibold text-decoration-none">Privacy Policy</a>.
                                    </label>
                            </div>

                            {/* <!-- Submit Button --> */}
                            <button type="submit" className="btn btn-dark w-100 py-2.5 fw-semibold mb-3">
                                Register Account <i className="bi bi-person-plus ms-1"></i>
                            </button>

                            {/* <!-- Alternative Registration Divider --> */}
                            <div className="d-flex align-items-center my-4">
                                <hr className="flex-grow-1 my-0 text-muted opacity-25"/>
                                    <span className="mx-3 text-muted small fw-medium">OR</span>
                                    <hr className="flex-grow-1 my-0 text-muted opacity-25"/>
                                    </div>

                                    {/* <!-- Google Signup Trigger Button --> */}
                                    <button type="button" className="btn btn-outline-secondary w-100 py-2.5 d-flex align-items-center justify-content-center gap-2 mb-3">
                                        <i className="bi bi-google text-danger"></i> Sign up with Google
                                    </button>

                                </form>

                                {/* <!-- Navigation Footer Link --> */}
                                <div className="text-center mt-3">
                                    <p className="text-muted small mb-0">Already have an account? <a href="login.html" className="text-decoration-none text-dark fw-bold">Sign In</a></p>
                                </div>

                            </div>
                    </div>
                </div>
            </div>
            )
}

export default Signup