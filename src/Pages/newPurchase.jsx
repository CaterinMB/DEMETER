import React from 'react';
import { useForm } from "react-hook-form";
import CancelShop from '../Components/CancelShop';
import ConfirmShop from '../Components/confirmShop';

function NewPurchase() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Aquí puedes enviar los datos a través de una solicitud HTTP o realizar alguna acción con ellos
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="organited flex flex-col items-start mb-4">
          <label className="block mb-2">
            Insumo:
            <select className="border border-gray-300 rounded-md p-1" {...register("insumo1")}>
              <option value="lechuga">Lechuga</option>
              <option value="panes">Panes</option>
            </select>
          </label>
          <label className="block mb-2">
            Cantidad:
            <input className="border border-gray-300 rounded-md p-1" type="number" {...register("cantidad1")} />
          </label>
          <label className="block mb-2">
            Medida:
            <select className="border border-gray-300 rounded-md p-1" {...register("medida1")}>
              <option value="kg">Kg</option>
              <option value="lb">Lb</option>
            </select>
          </label>
          <label className="block mb-2">
            Precio:
            <input className="border border-gray-300 rounded-md p-1" type="number" {...register("precio1")} />
          </label>
        </div>
        <div className="contentshop">
          <div className="contentshopp">
            <h1 className=' text-center mt-3'>Factura</h1>
            <h4 className=' text-center mb-4'>18/11/2023</h4>
            <div className="w-310 h-600 flex flex-col justify-center items-center">
              <select className='selectProvider'>
                <option value="proveedor1">Proveedor 1</option>
                <option value="proveedor2">Proveedor 2</option>
                <option value="proveedor3">Proveedor 3</option>
              </select>
            </div>
          </div>
        </div>
      </form>
      {/* Insertar la tabla después del formulario */}
      <div className=" table-container card-body table-border-style">
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Insumo</th>
                <th>Cantidad</th>
                <th>Medida</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lechuga</td>
                <td>5</td>
                <td>Kg</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Panes</td>
                <td>10</td>
                <td>Unidad</td>
                <td>20</td>
              </tr>
              {/* Agrega más filas si es necesario */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="button-cancel">
      <CancelShop/>

      </div>
      <div className="button-confirm">
      <ConfirmShop/>
     
      </div>
    
    </div>
  )
}

export default NewPurchase;