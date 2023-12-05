import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import "../css/style.css";
import "../css/landing.css";

import { useProduct } from '../Context/Product.context.jsx'
import { useSupplies } from '../Context/Supplies.context.jsx'

export default function ProductDetails() {
  const { detailP, getDetailProduct, deleteDetailProduct } = useProduct();
  const { supplies } = useSupplies();

  useEffect(() => {
    getDetailProduct();
  }, []);

  return (
    <div className="card-body table-border-style">
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="text-center">Insumo</th>
              <th className="text-center">Cantidad</th>
              <th className="text-center">Medida</th>
              <th className="text-center">Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(detailP) && detailP.length > 0 ? (
              detailP.map((detailItem) => (
                <tr key={detailItem.ID_ProductDetail}>
                  <td>
                    {detailItem.Supplies_ID
                      ? supplies.find(
                        (supply) =>
                          supply.ID_Supplies === detailItem.Supplies_ID
                      )?.Name_Supplies || ''
                      : ''}
                  </td>
                  <td>{detailItem.Lot_ProductDetail}</td>
                  <td>{detailItem.Measure}</td>
                  <td>{detailItem.State ? 'Habilitado' : 'Deshabilitado'}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        type="button"
                        className={`btn btn-icon btn-success ${detailItem.State ? 'active' : 'inactive'
                          }`}
                        onClick={() => toggleSupplyStatus(detailItem.ID_Product)}
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No existen detalles en este producto.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
