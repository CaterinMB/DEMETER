import React, { useState, useEffect } from "react";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import "../css/style.css";
import "../css/landing.css";

import {useProduct} from '../Context/Product.context.jsx'
import { useNavigate } from "react-router-dom";

function ProductPage() {
    const {product, getProduct, toggleSupplyStatus} = useProduct();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getProduct();
    }, []);

    // const handleSearchChange = (event) => {
    //     setSearchTerm(event.target.value);
    // };

    // const filteredProduct = user.filter((produc) => {
    //     const { Type_Document, Document, Name_User, LastName_User, Restaurant, State } = produc;
    //     const searchString = `${Type_Document} ${Document} ${Name_User} ${LastName_User} ${Restaurant} ${State}`.toLowerCase();
    //     return searchString.includes(searchTerm.toLowerCase());
    // });
    
    // const status = user.State ? "" : "desactivado";

    return (
        <section className="pc-container">
            <div className="pcoded-content">
                <div className="row w-100">
                    <div className="col-md-12">
                        <div className=" w-100 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Visualización de productos</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                        <button
                                            className="btn btn-primary mr-5"
                                            onClick={() => {
                                                navigate('/create_product');
                                            }}
                                            type="button"
                                        >
                                            Registrar
                                        </button>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                {/* <input
                                                    type="search"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Buscador"
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body table-border-style">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Categoria</th>
                                                        <th>Precio</th>
                                                        <th>Estado</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {filteredProduct.map((produc) => (
                                                        <tr key={produc.ID_Product}>
                                                            <td>{produc.Name_Supplies}</td>
                                                            <td>{produc.Unit}</td>
                                                            <td>{produc.Measure}</td>
                                                            <td>{produc.Stock}</td>
                                                            <td>
                                                                {produc.SuppliesCategory_ID
                                                                    ? Category_supplies.find(
                                                                        (category) =>
                                                                            category.ID_SuppliesCategory ===
                                                                            produc.SuppliesCategory_ID
                                                                    )?.Name_SuppliesCategory || ''
                                                                    : ''}
                                                            </td>
                                                            <td>{produc.State ? 'Habilitado' : 'Deshabilitado'}</td>
                                                            <td>
                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                    
                                                                    <button
                                                                        type="button"
                                                                        className={`btn btn-icon btn-success ${produc.State ? "active" : "inactive"}`}
                                                                        onClick={() => toggleSupplyStatus(produc.ID_Product)}
                                                                    >
                                                                        {produc.State ? (
                                                                            <MdToggleOn className={`estado-icon active`} />
                                                                        ) : (
                                                                            <MdToggleOff className={`estado-icon inactive`} />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))} */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductPage;