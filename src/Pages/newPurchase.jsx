import React from 'react';
import { useForm } from "react-hook-form";
import CancelShop from '../Components/CancelShop';
import ConfirmShop from '../Components/confirmShop';
import { AiFillDelete } from "react-icons/ai";
import ShoppingBill from '../Components/ShoppingBill';
import '../css/style.css'
import '../css/general.css'

function NewPurchase() {
  const { register, handleSubmit } = useForm();


  const onSubmit = (data) => {
    console.log(data);
  };

  return (
  
  <div className='position-shop'>
     <div className="flex justify-between mt-20 mx-10 ">
      
      <form onSubmit={handleSubmit(onSubmit)} >
      <div className=" card-body table-border-style mt-4">
    <div className="flex flex-row mb-5 ml-5">
          <div className="mr-5">
            <label>
              Insumo:
              <select className="border border-gray-300 rounded-md p-1 ml-2" {...register("insumo1")}>
                <option value="lechuga">Lechuga</option>
                <option value="panes">Panes</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Cantidad:
              <input className="border border-gray-300 rounded-md p-1 ml-2 " type="number" {...register("Lot")} />
            </label>
          </div>
        </div>

        <div className="flex mb-5">
          <div className="mr-5 ml-5">
            <label>
              Medida:
              <select className="border border-gray-300 rounded-md p-1 mr-5 ml-2" {...register("medida1")}>
                <option value="kg">Kg</option>
                <option value="lb">Lb</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Precio:
              <input className="border border-gray-300 rounded-md p-1 ml-2" type="number" {...register("Price_Supplier")} />
            </label>
          </div>
          <button type="button" className="btn btn-icon btn-primary ml-4">Agregar insumo</button>
        </div>

      <div className=" ">
        <table className="table table-sm ml-5">
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
  </form>
  </div>
  <div className='position-facture ml-5'>
   
  <ShoppingBill/>
  </div>
 
  </div>
  )
}

export default NewPurchase;