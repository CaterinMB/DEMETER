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
            {detailP && detailP.map((detail) => (
              <tr key={detail.ID_ProductDetail}>
                <td>{detail.Supplies_ID
                    ? supplies.find(
                      (supply) =>
                        supply.ID_Supplies ===
                        detail.Supplies_ID
                    )?.Name_Supplies || ''
                    : ''}</td>
                <td>{detail.Lot_ProductDetail}</td>
                <td>{detail.Measure}</td>
                <td>{detail.State ? 'Habilitado' : 'Deshabilitado'}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>

                    <button
                      type="button"
                      className={`btn btn-icon btn-success ${detail.State ? "active" : "inactive"}`}
                      onClick={() => toggleSupplyStatus(detail.ID_Product)}
                    >
                      <AiFillDelete/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
