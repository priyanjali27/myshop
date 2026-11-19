import React, { useEffect, useState } from 'react'
import LeftSidebar from './LeftSidebar'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function ViewProduct() {
    const [formData, setFormData] = useState({
        prod_name: '',
        sku: '',
        short_description: '',
        description: '',
        mark_price: '',
        price: '',
    })
    const [existingImage, setExistingImage] = useState('')
    const { id } = useParams();
    const goTo = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/admin/products/${id}`)
                const { images, ...remainingFields } = response.data
                setFormData(remainingFields)
                if (images && images.length > 0) {
                    setExistingImage(images[0].url);
                }
                // console.log(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [id])

    return (
        <div className='d-flex wrapper'>
            <LeftSidebar />
            {/* <!-- Right Side Work Area --> */}
            <main className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
                {/* <!-- Header Section with Back Navigation & Action Actions --> */}
                <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom">
                    <div className="d-flex align-items-center gap-3">
                        {/* <a href="#" className="btn btn-outline-secondary btn-sm"><i className="bi bi-arrow-left"></i></a> */}
                        <div>
                            <nav aria-label="breadcrumb" className="mb-0">
                                <ol className="breadcrumb small mb-1">
                                    <li className="breadcrumb-item"><Link to="/allproducts" className="text-decoration-none">Products</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">View Product</li>
                                </ol>
                            </nav>
                            <h1 className="h3 fw-semibold text-dark mb-0">View Product</h1>
                        </div>
                    </div>
                </div>

                {/* <!-- Form Content Setup inside Grid Systems --> */}
                <form id="productForm">
                    <div className="row g-4">

                        {/* <!-- Left Primary Column (Inputs, Meta fields) --> */}
                        <div className="col-12 col-lg-8">

                            {/* <!-- Primary Specifications Card --> */}
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-semibold mb-3">General Information</h5>
                                    <div className="mb-3">
                                        <label htmlFor="prod_name" className="form-label fw-semibold text-secondary">Product Title</label>
                                        <input type="text" className="form-control" value={formData.prod_name} name="prod_name" id="prod_name" disabled/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="sku" className="form-label fw-semibold text-secondary">SKU</label>
                                        <input type="text" className="form-control" value={formData.sku} name="sku" id="sku" disabled />
                                    </div>
                                    <div className="mb-0">
                                        <label htmlFor="short_description" className="form-label fw-semibold text-secondary">Short Description</label>
                                        <textarea className="form-control" name="short_description" value={formData.short_description} id="short_description" rows="3" disabled></textarea>
                                    </div>
                                    <div className="mb-0">
                                        <label htmlFor="description" className="form-label fw-semibold text-secondary">Description</label>
                                        <textarea className="form-control" name="description" value={formData.description} id="description" rows="5" disabled></textarea>
                                    </div>
                                    <div className="mb-0">
                                        <label htmlFor="productimage" className="form-label fw-semibold text-secondary">Images</label>
                                        {/* <input type="file" accept="image/*" className="form-control" name="productimage" id="productimage" /> */}
                                        {existingImage ? (
                                                <img src={`http://localhost:3000${existingImage}`} alt="existingImage" className="img-thumbnail mt-1 mb-2" style={{ maxHeight: '100px' }} />

                                        ) : (
                                            <p className="text-muted small">No image uploaded</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Pricing & Stock Metrics Card --> */}
                            <div className="row g-4 mb-4">
                                {/* <!-- Pricing Sub-section --> */}
                                <div className="col-12 col-md-6">
                                    <div className="card border-0 shadow-sm h-100">
                                        <div className="card-body p-4">
                                            <h5 className="card-title fw-semibold mb-3">Pricing</h5>
                                            <div className="mb-3">
                                                <label htmlFor="mark_price" className="form-label fw-semibold text-secondary">MRP</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light">₹</span>
                                                    <input type="number" name="mark_price" className="form-control" value={formData.mark_price} id="mark_price" step="0.01" placeholder="0.00" disabled />
                                                </div>
                                            </div>
                                            <div className="mb-0">
                                                <label htmlFor="price" className="form-label fw-semibold text-secondary">Selling Price</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light">₹</span>
                                                    <input type="number" className="form-control" id="price" value={formData.price} name="price" step="0.01" placeholder="0.00" disabled/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-2 mt-3 mt-sm-0 justify-content-center">
                                <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(`/allproducts`)}>Back</button>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default ViewProduct