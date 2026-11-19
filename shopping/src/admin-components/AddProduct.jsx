import React, { useEffect, useState } from 'react'
import LeftSidebar from './LeftSidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAlert } from '../context/AlertContext';

function AddProduct() {
    const { showAlert } = useAlert();
    const [formData, setFormData] = useState({
        prod_name: '',
        sku: '',
        short_description: '',
        description: '',
        mark_price: '',
        price: '',
        preview: null
    })
    const [imageFile, setImageFile] = useState(null);
    const goTo = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0])
        setFormData(prev => ({
                ...prev,preview: URL.createObjectURL(e.target.files[0])
            }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFormData = new FormData();
        for (const key in formData) {
            newFormData.append(key, formData[key]);
        }
        if (imageFile) {
            newFormData.append('images', imageFile)
        }
                // console.log(newFormData)

        try {
            const response = await axios.post('http://localhost:3000/api/admin/addProduct', newFormData)
            if (response.status === 201) {
                showAlert('The product has been saved and published successfully!', 'success');
                goTo('/allproducts')
            }
        } catch (error) {
            console.log("Error in saving data:", error)
            showAlert('Failed to save data!', 'danger')
        }
    }
    return (
        <div className='d-flex wrapper'>
            <LeftSidebar />
            {/* <!-- Right Side Work Area --> */}
            <main className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
                {/* <!-- Header Section with Back Navigation & Action Actions --> */}
                <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom">
                    <div className="d-flex align-items-center gap-3">
                        <a href="#" className="btn btn-outline-secondary btn-sm"><i className="bi bi-arrow-left"></i></a>
                        <div>
                            <nav aria-label="breadcrumb" className="mb-0">
                                <ol className="breadcrumb small mb-1">
                                    <li className="breadcrumb-item"><Link to="/allproducts" className="text-decoration-none">Products</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Add Product</li>
                                </ol>
                            </nav>
                            <h1 className="h3 fw-semibold text-dark mb-0">Add New Product</h1>
                        </div>
                    </div>
                    {/* <div className="d-flex gap-2 mt-3 mt-sm-0">
                        <button className="btn btn-outline-secondary">Cancel</button>
                        <button type="submit" form="productForm" className="btn btn-primary">Save Product</button>
                    </div> */}
                </div>

                {/* <!-- Form Content Setup inside Grid Systems --> */}
                <form id="productForm" onSubmit={handleSubmit}>
                    <div className="row g-4">

                        {/* <!-- Left Primary Column (Inputs, Meta fields) --> */}
                        <div className="col-12 col-lg-8">

                            {/* <!-- Primary Specifications Card --> */}
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-semibold mb-3">General Information</h5>
                                    <div className="mb-3">
                                        <label htmlFor="prod_name" className="form-label fw-semibold text-secondary">Product Title</label>
                                        <input type="text" className="form-control" name="prod_name" onChange={handleChange} id="prod_name" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="sku" className="form-label fw-semibold text-secondary">SKU</label>
                                        <input type="text" className="form-control" name="sku" onChange={handleChange} id="sku" required />
                                    </div>
                                    <div className="mb-0">
                                        <label htmlFor="short_description" className="form-label fw-semibold text-secondary">Short Description</label>
                                        <textarea className="form-control" name="short_description" onChange={handleChange} id="short_description" rows="3"></textarea>
                                    </div>
                                    <div className="mb-0">
                                        <label htmlFor="description" className="form-label fw-semibold text-secondary">Description</label>
                                        <textarea className="form-control" name="description" onChange={handleChange} id="description" rows="5"></textarea>
                                    </div>
                                    <div className="mb-0">
                                        <label htmlFor="productimage" className="form-label fw-semibold text-secondary">Images</label>
                                        <input type="file" accept="image/*" className="form-control" name="productimage" onChange={handleFileChange} id="productimage" required />
                                        {formData.preview && <img src={formData.preview} alt="Preview" className="img-thumbnail mt-1 mb-2" style={{ maxHeight: '100px' }} />}
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
                                                    <input type="number" name="mark_price" className="form-control" onChange={handleChange} id="mark_price" step="0.01" placeholder="0.00" required />
                                                </div>
                                            </div>
                                            <div className="mb-0">
                                                <label htmlFor="price" className="form-label fw-semibold text-secondary">Selling Price</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light">₹</span>
                                                    <input type="number" className="form-control" id="price" onChange={handleChange} name="price" step="0.01" placeholder="0.00" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-2 mt-3 mt-sm-0 justify-content-end">
                                <button className="btn btn-outline-secondary" type="button" onClick={() => goTo(`/allproducts`)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Product</button>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default AddProduct