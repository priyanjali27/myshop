import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Navigation from './Navigation'

function ProductCatalog() {
  const [productList, setProductList] = useState([])

  const truncate = (str) => { return str.length > 10 ? str.substring(0, 40) + "..." : str }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products')
        setProductList(response.data)
        console.log(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [])
  return (
    <>
    <Navigation/>
    <div className="container my-5">
      <div className="row">

        <aside className="col-lg-3 mb-4">
          <div className="card p-3 shadow-sm">
            <h5 className="fw-bold mb-3">Filter By</h5>

            <div className="mb-4">
              <h6 className="text-uppercase fw-semibold text-muted small">Categories</h6>
              <div className="form-check my-2">
                <input className="form-check-input" type="checkbox" id="cat1" checked/>
                  <label className="form-check-label" type="checkbox" htmlFor="cat1">Electronics</label>
              </div>
              <div className="form-check my-2">
                <input className="form-check-input" type="checkbox" id="cat2"/>
                  <label className="form-check-label" htmlFor="cat2">Fashion</label>
              </div>
              <div className="form-check my-2">
                <input className="form-check-input" type="checkbox" id="cat3"/>
                  <label className="form-check-label" htmlFor="cat3">Home & Living</label>
              </div>
            </div>

            <div className="mb-4">
              <h6 className="text-uppercase fw-semibold text-muted small">Price Range</h6>
              <input type="range" className="form-range" min="0" max="1000" id="priceRange"/>
                <div className="d-flex justify-content-between small text-muted">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
            </div>

            <div>
              <h6 className="text-uppercase fw-semibold text-muted small">Customer Rating</h6>
              <div className="form-check my-2">
                <input className="form-check-input" type="radio" name="rating" id="rate4"/>
                  <label className="form-check-label text-warning" htmlFor="rate4">
                    <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i> & Up
                  </label>
              </div>
            </div>
          </div>
        </aside>

        <main className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4 bg-light p-3 rounded shadow-sm">
            <span className="text-muted">Showing <strong>9</strong> Products</span>
            <div className="d-flex align-items-center">
              <label htmlFor="sortSelect" className="form-label me-2 mb-0 text-nowrap small text-muted">Sort By:</label>
              <select className="form-select form-select-sm" id="sortSelect" style={{width: "auto"}}>
                <option>Featured</option>
                <option value="1">Price: Low to High</option>
                <option value="2">Price: High to Low</option>
                <option value="3">Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
          { productList.map((item) => ( 
            <div className="col">
              <div className="card h-100 product-card shadow-sm">
                {item.images.map(image => 
                                        <img src={`http://localhost:3000${image.url}`} alt="ssa" className="card-img-top product-img"/>
                  )}

                {/* <img src={`http://localhost:3000/}`} className="card-img-top product-img" alt="Product 1"/> */}
                  <div className="card-body d-flex flex-column">
                    <h6 className="text-muted text-uppercase small">{item.prod_name}</h6>
                    <h5 className="card-title fw-bold text-dark">{truncate(item.description)}</h5>
                    <div className="text-warning mb-2 small">
                      <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i>
                      {/* <span className="text-muted small ms-1">(124)</span> */}
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <span className="text-dark fw-bold fs-5 me-2">₹{item.price}</span>
                      <span className="text-muted text-decoration-line-through small">₹200</span>
                    </div>
                    <button className="btn btn-dark mt-auto w-100"><i className="bi bi-cart-plus me-2"></i>Add to Cart</button>
                  </div>
              </div>
            </div>
            ))
          }
          </div>
        </main>
      </div>
    </div>
    </>
  )
}

export default ProductCatalog