import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShoppingContext } from '../Context/Shopping.context';
import { useSupplier } from "../Context/Supplier.context";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

import '../css/style.css';
import "../css/landing.css";

function ShoppingPage() {
  const { getOneShopping, shopping: Shopping, selectAction, disableShopping, getShoppingList, getShopingAndShopingDetails } = useShoppingContext();
  const { getSupplier } = useSupplier();
  const [searchTerm, setSearchTerm] = useState("");
  const [shoppingData, setShoppingData] = useState([])
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    return async () => {
      const data = await getShopingAndShopingDetails();
      setShoppingData(data)
      console.log("data")
      console.log(shoppingData)
      console.log(data)
    }
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
                        <button type="button" className="btn btn-primary" onClick={() => { selectAction(1) }}>
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
                          {shoppingData.map((
                            {
                              ID_ShoppingDetail,
                              Lot,
                              Price_Supplier,
                              Supplies_ID,
                              Shopping_ID,
                              Shopping: {
                                  ID_Shopping,
                                  Datetime,
                                  Total,
                                  State,
                                  User_ID,
                                  Supplier_ID,
                                  Supplier: {
                                      ID_Supplier,
                                      Type_Document,
                                      Document,
                                      Name_Supplier,
                                      Name_Business,
                                      Phone,
                                      Email,
                                      City: Medellin,
                                      State: SupplierState
                                  }
                              }
                          }
                          ) => (
                            <tr key={ID_ShoppingDetail}>
                              <td>{Datetime}</td>
                              <td>{Name_Supplier}</td>
                              <td>{Total}</td>
                              <td className={`${State ? "" : "desactivado"}`}>
                                {State ? "Habilitado" : "Deshabilitado"}
                              </td>

                              <td className="flex items-center">

                              <button
                                   type="button"
                                   className={`btn  btn-icon btn-success ${status}`}
                                   onClick={() => toggleSupplyStatus(shoppingData.ID_ShoppingDetail)}
                                  
                                >
                                   {shoppingData.State ? (
                                     <MdToggleOn className={`estado-icon active${status}`} />
                                   ) : (
                                     <MdToggleOff className={`estado-icon inactive${status}`} />
 
                                   )}
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