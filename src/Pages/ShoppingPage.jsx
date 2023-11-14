import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShoppingContext } from '../Context/Shopping.context';
import { useSupplier } from "../Context/Supplier.context";
import '../css/style.css'; 
import "../css/landing.css";
import { AiOutlineEye, AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import users from '../img/users.png'

function ShoppingPage() {
    const {  getOneShopping, shopping: Shopping, fetchGain, selectAction, CancelDet, disableShopping, getShoppingList } = useShoppingContext();
  const [searchTerm, setSearchTerm] = useState("");
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };


  useEffect(() => {
    getShoppingList();
  }, []);

  const status = Shopping.State ? "" : "desactivado";

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredShopping = Shopping.filter((shoppingItem) => {
    const {
      ID_Shopping,
      Datetime,
      Total,
      State
    } = shoppingItem;
    const searchString =
      `${ID_Shopping} ${Datetime} ${Total} ${State}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });



  return (
    <section className="pc-container">
      <div className="pcoded-content">
        <div className="row w-100">
          <div className="col-md-12">
            <div className=" w-100 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Visualización de compras</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                    <Link to="/shop">
                        <button type="button" className="btn btn-primary" onClick={() =>{selectAction(1) }}>
                          Registrar compra
                        </button>
                      </Link>
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
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Proveedor</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredShopping.map((shoppingItem) => (
                            <tr key={shoppingItem.ID_Shopping}>
                              <td>{shoppingItem.Datetime}</td>
                              {/* <td>{ID de proveedor}</td> */}
                              <td>{shoppingItem.Total}</td>
                              <td className={`${status}`}>
                                {shoppingItem.State ? "Habilitado" : "Deshabilitado"}
                                </td>

                              <td className="flex items-center">
                                
                                <button
                                  type="button"
                                  className={`btn  btn-icon btn-success ${status}`}
                            
                                  onClick={() => toggleSupplyStatus(shoppingItem.ID_Shopping)}
                                >
                                </button>
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
    </section>
);
}
  
export default ShoppingPage