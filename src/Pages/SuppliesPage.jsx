import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useSupplies } from "../Context/Supplies.context.jsx";
import { useCategorySupplies } from '../Context/CategorySupplies.context.jsx';
import CreateSupplies from "../Components/CreateSupplies.jsx";
import UpdateSupplies from "../Components/UpdateSupplies.jsx";
import DeleteSupplies from "../Components/DeleteSupplies.jsx";
import Pagination from '@mui/material/Pagination';
import "../css/style.css";
import "../css/landing.css";

function SuppliesPage() {
  const { supplies, getSupplies, deleteSupplies, toggleSupplyStatus } = useSupplies();
  const { Category_supplies } = useCategorySupplies();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSupplyToDelete, setSelectedSupplyToDelete] = useState(null);
  const [selectedSupplyToUpdate, setSelectedSupplyToUpdate] = useState(null);
  const [showEnabledOnly, setShowEnabledOnly] = useState(
    localStorage.getItem("showEnabledOnly") === "true"
  );
  const ITEMS_PER_PAGE = 1;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getSupplies();
  }, []);

  useEffect(() => {
    localStorage.setItem("showEnabledOnly", showEnabledOnly);
    setCurrentPage(1);
  }, [showEnabledOnly]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = () => {
    setShowEnabledOnly(!showEnabledOnly);
  };

  const filteredSupplies = supplies.filter((supply) => {
    const {
      Name_Supplies,
    } = supply;
    const searchString =
      `${Name_Supplies}`.toLowerCase();

    if (showEnabledOnly) {
      return supply.State && searchString.includes(searchTerm.toLowerCase());
    }

    return searchString.includes(searchTerm.toLowerCase());
  });

  const enabledSupplies = filteredSupplies.filter((supply) => supply.State);
  const disabledSupplies = filteredSupplies.filter((supply) => !supply.State);
  const sortedSupplies = [...enabledSupplies, ...disabledSupplies];

  const pageCount = Math.ceil(sortedSupplies.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleSupplies = sortedSupplies.slice(startIndex, endIndex);


  const handleDelete = (supply) => {
    setSelectedSupplyToDelete(supply);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedSupplyToDelete(null);
  };

  const handleUpdateSupply = (supply) => {
    setSelectedSupplyToUpdate(supply);
  };

  const handlePageChange = (event, value) => {
    const maxPagesToShow = 4;
    const newPage = value;

    // Evitar que la nueva página sea menor que 1 o mayor que la cantidad total de páginas
    if (newPage < 1) {
      setCurrentPage(1);
    } else if (newPage > pageCount) {
      setCurrentPage(pageCount);
    } else {
      // Avanzar o retroceder hasta un máximo de 4 páginas
      const diff = Math.abs(newPage - currentPage);
      setCurrentPage((prevPage) => (newPage > prevPage ? prevPage + Math.min(diff, maxPagesToShow) : prevPage - Math.min(diff, maxPagesToShow)));
    }
  };
  

  return (
    <section className="pc-container">
      <div className="pcoded-content">
        <div className="row w-100">
          <div className="col-md-12">
            <div className=" w-100 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Visualización de insumos</h5>
                </div>
                <div className="card-body">

                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="showEnabledOnly"
                          checked={showEnabledOnly}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="showEnabledOnly">
                          Mostrar solo habilitados
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <CreateSupplies />
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
                  </div>

                  <div className="card-body table-border-style">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Medida</th>
                            <th>Existencia mínima</th>
                            <th>Categoria</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visibleSupplies.map((supply) => (
                            <tr key={supply.ID_Supplies}>
                              <td>{supply.Name_Supplies}</td>
                              <td>{supply.Unit}</td>
                              <td>{supply.Measure}</td>
                              <td>{supply.Stock}</td>
                              <td>
                                {supply.SuppliesCategory_ID
                                  ? Category_supplies.find(
                                    (category) =>
                                      category.ID_SuppliesCategory ===
                                      supply.SuppliesCategory_ID
                                  )?.Name_SuppliesCategory || ''
                                  : ''}
                              </td>
                              <td>{supply.State ? 'Habilitado' : 'Deshabilitado'}</td>
                              <td>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                  <UpdateSupplies
                                    buttonProps={{
                                      buttonClass: `btn btn-icon btn-primary ${!supply.State ? "text-gray-400 cursor-not-allowed" : ""}`,
                                      isDisabled: !supply.State,
                                      buttonText: <BiEdit />,
                                    }}
                                    supplyToEdit={supply}
                                    onUpdate={handleUpdateSupply}
                                  />
                                  <button
                                    onClick={() => handleDelete(supply)}
                                    className={`btn btn-icon btn-danger ${!supply.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                                    disabled={!supply.State}
                                  >
                                    <AiFillDelete />
                                  </button>
                                  <button
                                    type="button"
                                    className={`btn btn-icon btn-success ${supply.State ? "active" : "inactive"}`}
                                    onClick={() => toggleSupplyStatus(supply.ID_Supplies)}
                                  >
                                    {supply.State ? (
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

      <div className="pagination-container">
        <Pagination
          className="pagination"
          count={pageCount}
          page={currentPage}
          siblingCount={2}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </div>

      {isDeleteModalOpen && (
        <DeleteSupplies
          onClose={closeDeleteModal}
          onDelete={() => {
            if (selectedSupplyToDelete) {
              deleteSupplies(selectedSupplyToDelete.ID_Supplies);
              closeDeleteModal();
            }
          }}
        />
      )}

      {selectedSupplyToUpdate && (
        <UpdateSupplies
          supplyToEdit={selectedSupplyToUpdate}
          onUpdate={() => {
            setSelectedSupplyToUpdate(null);
          }}
        />
      )}
    </section>
  );
}

export default SuppliesPage;
