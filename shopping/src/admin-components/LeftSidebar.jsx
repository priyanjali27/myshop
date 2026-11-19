import React from 'react'

function LeftSidebar() {
    return (
        <aside className="sidebar d-flex flex-column p-3 text-white shrink-0">
            <a href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <i className="bi bi-shop fs-4 me-2 text-primary"></i>
                <span className="fs-4 fw-bold">Admin Panel</span>
            </a>
            <hr />

            {/* <!-- Navigation Modules --> */}
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link text-white" aria-current="page">
                        <i className="bi bi-speedometer2 me-2"></i> Dashboard
                    </a>
                </li>
                <li>
                    {/* <!-- "Products" item is marked active and open by default --> */}
                    <a href="#" className="nav-link active">
                        <i className="bi bi-box-seam me-2"></i> Products
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-receipt me-2"></i> Orders
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-people me-2"></i> Customers
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-graph-up-arrow me-2"></i> Analytics
                    </a>
                </li>
            </ul>
            <hr />

            {/* <!-- User Profile Dropdown at bottom --> */}
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="#" alt="profile" width="32" height="32" className="rounded-circle me-2" />
                    <strong>Alex Merlin</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-menu-item dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-menu-item dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-menu-item dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
        </aside>
    )
}

export default LeftSidebar