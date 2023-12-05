import React from 'react'
import UpdateProduct from '../Components/UpdateProduct.jsx'
import ProductDetails from '../Components/ProductDetails.jsx'
import CreateProductDetail from '../Components/CreateProductDetail.jsx'

export default function ProductDetail() {
    return (
        <section className="pc-container">
            <div className="pcoded-content">
                <div className="row w-100">
                    <div className="col-md-12">
                        <div className=" w-100 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>Producto</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <UpdateProduct />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>Recetas</h5>
                                        </div>
                                        <div>
                                            <ProductDetails />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <CreateProductDetail />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
