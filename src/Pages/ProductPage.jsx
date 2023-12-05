import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

// Diseño
import "../css/style.css";
import "../css/landing.css";

// Context
import { useProduct } from '../Context/Product.context.jsx'
import { useCategoryProducts } from '../Context/CategoryProducts.context.jsx'

// Componentes
import CreateProduct from '../Components/CreateProduct.jsx'

// Paginado
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function ProductPage() {
    const { product, getProducts, toggleSupplyStatus } = useProduct();
    const { Category_products } = useCategoryProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const [showEnabledOnly, setShowEnabledOnly] = useState(
        localStorage.getItem("showEnabledOnly") === "true"
    );
    const itemsForPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    useLayoutEffect(() => {
        getProducts();
        setCurrentPage(1);
    }, []);

    const navigateToCreateProduct = () => {
        setIsModalOpen(true);
    };

    const handleCreated = () => {
        getProducts();
    };

    useEffect(() => {
        localStorage.setItem("showEnabledOnly", showEnabledOnly);
    }, [showEnabledOnly]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // const handleCheckboxChange = () => {
    //     setShowEnabledOnly(!showEnabledOnly);
    // };

    const filteredProduct = product.filter((produc) => {
        const { Name_Products, Price_Product, ProductCategory_ID } = produc;
        const searchString = `${Name_Products} ${Price_Product} ${ProductCategory_ID}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    const enabledProducts = filteredProduct.filter((produc) => produc.State);
    const disabledProducts = filteredProduct.filter((produc) => !produc.State);
    const sortedProducts = [...enabledProducts, ...disabledProducts];

    const pageCount = Math.ceil(sortedProducts.length / itemsForPage);

    const startIndex = (currentPage - 1) * itemsForPage;
    const endIndex = startIndex + itemsForPage;
    const visibleProducts = sortedProducts.slice(startIndex, endIndex);

    const barraClass = product.State ? "" : "desactivado";

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

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
                                                className="btn btn-primary"
                                                onClick={navigateToCreateProduct}
                                                type="button"
                                            >
                                                Registrar
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input
                                                    type="search"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Buscador"
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="movement">
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="showEnabledOnly"
                                                    checked={showEnabledOnly}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label className="form-check-label" htmlFor="showEnabledOnly">
                                                    Habilitados
                                                </label>
                                            </div>
                                        </div> */}
                                    </div>

                                    <div className="card-body table-border-style">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">Nombre</th>
                                                        <th className="text-center">Categoria</th>
                                                        <th className="text-center">Precio</th>
                                                        <th className="text-center">Estado</th>
                                                        <th className="text-center">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {visibleProducts.map((produc) => (
                                                        <tr key={produc.ID_Product}>
                                                            <td>{produc.Name_Products}</td>
                                                            <td>
                                                                {produc.ProductCategory_ID
                                                                    ? Category_products.find(
                                                                        (category) =>
                                                                            category.ID_ProductCategory ===
                                                                            produc.ProductCategory_ID
                                                                    )?.Name_ProductCategory || ''
                                                                    : ''}
                                                            </td>
                                                            <td>{produc.Price_Product}</td>
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
                                                    ))}
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
            <div
                className="pagination-container pagination"
                title='Para moverse mas rapido por el modulo cuando hay varios registros en el sistema.'
            >
                <Stack spacing={2}>
                    <Pagination
                        count={pageCount}
                        page={currentPage}
                        siblingCount={2}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
            </div>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, title: 'Muestra la pagina en la que se encuentra actualmente de las paginas en total que existen.' }}>
                <Typography variant="body2" color="text.secondary">
                    Página {currentPage} de {pageCount}
                </Typography>
            </Box>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
                    <div className="modal-container">
                        <CreateProduct onClose={() => setIsModalOpen(false)} onCreated={handleCreated} />
                    </div>
                </div>
            )}
        </section>
    );
}

export default ProductPage;