import React from 'react'
import { useForm } from 'react-hook-form';
import '../css/style.css'
import ConfirmShop from './confirmShop';
import CancelShop from './CancelShop';

function ShoppingBill() {
    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(data=>{
		signin(data)
	})


  return (
   
    <div className="facture flex justify-between gap-20 w-full h-full ">
      <form className="w-full max-w-xs p-6" onSubmit={onSubmit}>
        <div className="text-center">
          <h4 className='mt-3'>12/02/2001</h4>
          <h2>Factura</h2>
          <hr className="ml-2" />
        </div>
        <div className="flex mb-2 ">
          <h4 className='ml-4 mt-3'>Proveedor:</h4>
          <select className="mb-1 ml-3 mt-3 ">
            <option value="proveedor1">Proveedor 1</option>
            <option value="proveedor2">Proveedor 2</option>
            <option value="proveedor3">Proveedor 3</option>
          </select>
        </div>
        <div>
          <h1 className='text-center mt-5'>$</h1>
          <p className='text-center mt-'>Total</p>
        </div>
        
        <div className="mt-auto">
        <hr className="ml-2 mt-3 " />
          <div className="flex justify-between pt-4">
          <ConfirmShop/>
          <CancelShop/>
          </div>
        </div>
      </form>
    </div>
  );
}
 
export default ShoppingBill