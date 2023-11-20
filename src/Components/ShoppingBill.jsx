import React from 'react'
import { useForm } from 'react-hook-form';
import '../css/style.css'

function ShoppingBill() {
    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(data=>{
		signin(data)
	})


  return (
  
    <div className="facture">
     <form action="">
        <div>
            <h4 className='text-center'>12/02/2001</h4>
            <h2 className='text-center'>Factura</h2>
            <hr />
        </div>
        <div className='flex'>
        <h4 className='ml-3'>Proveedor:</h4>
            <select className='mb-1 ml-3'>
              
              <option value="proveedor1">Proveedor 1</option>
              <option value="proveedor2">Proveedor 2</option>
              <option value="proveedor3">Proveedor 3</option>
            </select>
           
        </div>
        <div className='flex content-end h-full'>
            <hr />
            <button type="button" className="btn btn-icon btn-primary">Confirmar compra</button>
          <button type="button" className="btn btn-icon btn-primary ml-2">Cancelar compra</button>

        </div>
   
    </form>
  </div>

  
 
  )
}

export default ShoppingBill