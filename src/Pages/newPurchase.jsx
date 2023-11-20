import React from 'react';
import { useForm } from "react-hook-form";
import CancelShop from '../Components/CancelShop';
import ConfirmShop from '../Components/confirmShop';
import { AiFillDelete } from "react-icons/ai";


function NewPurchase() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
   <div className="flex justify-between mt-20 mx-10">
      
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mb-4">
     
    
        </form>
     
      <div className="table-container card-body table-border-style mt-4">
      <div className="flex flex-row mb-5 ml-5">
            <div className="mr-5">
              <label>
                Insumo:
                <select className="border border-gray-300 rounded-md p-1" {...register("insumo1")}>
                  <option value="lechuga">Lechuga</option>
                  <option value="panes">Panes</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Cantidad:
                <input className="border border-gray-300 rounded-md p-1" type="number" {...register("Lot")} />
              </label>
            </div>
          </div>

          <div className="flex mb-5">
            <div className="mr-5 ml-5">
              <label>
                Medida:
                <select className="border border-gray-300 rounded-md p-1 mr-5" {...register("medida1")}>
                  <option value="kg">Kg</option>
                  <option value="lb">Lb</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Precio:
                <input className="border border-gray-300 rounded-md p-1" type="number" {...register("Price_Supplier")} />
              </label>
            </div>
            <button type="button" className=" btn-sup btn btn-icon btn-primary ml-4 ">Agregar insumo</button>
          </div>

        <div className="table-responsive table-shop">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Insumo</th>
                <th>Cantidad</th>
                <th>Medida</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lechuga</td>
                <td>5</td>
                <td>Kg</td>
                <td>10</td>
                <td> 
                  <button type="button" className="btn btn-icon btn-danger">
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
              <tr>
                <td>Panes</td>
                <td>10</td>
                <td>Unidad</td>
                <td>20</td>
                <td> 
                  <button type="button" className="btn btn-icon btn-danger">
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="contentshop">
        <div className="contentshopp">
          <h4 className='text-center mt-3'>18/11/2023</h4>
          <h1 className='text-center'>Factura</h1>
          <p className='ml-4'>__________________________________________________</p>
          <div className="w-310 h-600 flex flex-col justify-center items-center">
          <h4 className='text-center ml-4 mt-3'>Proveedor:</h4>
            <select className='selectProvider ml-4 w-50 h-30'>
              
              <option value="proveedor1">Proveedor 1</option>
              <option value="proveedor2">Proveedor 2</option>
              <option value="proveedor3">Proveedor 3</option>
            </select>
        
          </div>
          <div className='line'>
          <p className='ml-4 mt-5'>__________________________________________________</p>
          <div className="mt-5 ml-3">
          <button type="button" className="btn btn-icon btn-primary">Confirmar compra</button>
          <button type="button" className="btn btn-icon btn-primary ml-2">Cancelar compra</button>
          </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPurchase;