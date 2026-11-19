import React, { useEffect, useState }  from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import LeftSidebar from './LeftSidebar'
import { useAlert } from '../context/AlertContext';

function ProductList() {
    const { showAlert } = useAlert();
    const [productList, setProductList] = useState([])
    // const [count, setCount] = useState(1)
    const goTo = useNavigate()

    // const truncate = (str) => { return str.length > 10 ? str.substring(0, 40) + "..." : str }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/admin/products')
                setProductList(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [productList])

    const triggerUpdate = (id) => {
        goTo(`/updateProduct/${id}`)
    }
    const handleView = (id) => {
        goTo(`/viewProduct/${id}`)
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/admin/products/${id}`)
            if (response.status === 200) {
                setProductList(productList.filter((item) => item.id !== id));
                showAlert('Record deleted successfully!', 'success');
            }
        } catch (error) {
            showAlert("Failed to delete the record:", 'danger');
        }
    }
    return (
        <div className="d-flex wrapper">

            <LeftSidebar />

            {/* <!-- Right Side Product Listing Area --> */}
            <main className="flex-grow-1 p-4" style={{ overflowY: 'auto' }}>

                {/* <!-- Upper Section: Search Bar & Actions --> */}
                <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom">
                    <h1 className="h2 fw-semibold text-dark">Products</h1>
                    <Link to="/" className="text-decoration-none text-muted small fw-semibold"><i className="bi bi-arrow-left me-1"></i>Back to store</Link>
                    <div className="d-flex gap-2">
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0"><i className="bi bi-search text-muted"></i></span>
                            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search products..." />
                        </div>
                        <button className="btn btn-primary text-nowrap" onClick={() => goTo('/addProduct')}>
                            <i className="bi bi-plus-lg me-1"></i> Add Product
                        </button>
                    </div>
                </div>

                {/* <!-- Tabular Product Data View --> */}
                <div className="card border-0 shadow-sm">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col" className="ps-4" style={{ width: '40px' }}>
                                        <input className="form-check-input" type="checkbox" id="selectAll" />
                                    </th>
                                    <th scope="col">Product</th>
                                    <th scope="col">SKU</th>
                                    {/* <th scope="col">Category</th>
                                    <th scope="col">Stock</th> */}
                                    <th scope="col">Price</th>
                                    <th scope="col" className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {/* <!-- Row 1 --> */}
                                {productList.map((item) => (
                                    <tr>
                                        <td className="ps-4">
                                            <input className="form-check-input" type="checkbox" />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                {/* <img src="#" alt="Sneakers" className="product-thumb" /> */}
                                                <div>
                                                    <h6 className="mb-0 fw-semibold text-dark">{item.prod_name}</h6>
                                                    {/* <span className="text-muted small">Athletic footwear</span> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td><code className="text-uppercase text-secondary">{item.sku}</code></td>
                                        {/* <td>Footwear</td>
                                        <td>
                                            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2.5">In Stock (42)</span>
                                        </td> */}
                                        <td className="fw-semibold text-dark">₹{item.price}</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => triggerUpdate(item._id)} />
                                            <FontAwesomeIcon icon={faEye} onClick={() => handleView(item._id)} />
                                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(item._id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default ProductList