import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import '../css/style.css'
import ConfirmShop from './confirmShop';
import CancelShop from './CancelShop';
import { useSupplier } from '../Context/Supplier.context';
import Select from 'react-select';


function ShoppingBill({ total = 0 }) {
  const { register, handleSubmit } = useForm();
  const { getSupplier } = useSupplier()
  const [supplierState, setSupplierState] = useState([{
    Name_Supplier: "",
    ID_Supplier: ""
  }])
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '180px', // Ajusta el ancho del control
      minHeight: '30px', // Ajusta la altura mínima del control
      fontSize: '14px', // Ajusta el tamaño de fuente
    }),
  };

  useEffect(() => {
    return async () => {
      const newSupplier = await Promise.resolve(getSupplier())
      setSupplierState(newSupplier)
      console.log(newSupplier)
    }
    // console.log(getSupplies())
  }, [])

  const onSubmit = handleSubmit(data => {
    signin(data)
  })

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setCurrentDate(new Date());
  };

  const handleChange = (value, name) => {
    setSelectedSupplier(value);
  };

  const options = supplierState.map(({ ID_Supplier, Name_Supplier }) => ({
    value: ID_Supplier,
    label: Name_Supplier,
  }));
  
  return (

    <div className="facture flex justify-between gap-20 w-full h-full ">
      <form className="w-full max-w-xs p-6" onSubmit={onSubmit}>
        <div className="text-center">
          <h4 className='mt-3'>{currentDate.toLocaleDateString()}</h4>
          <h2>Factura</h2>
          <hr className="ml-2" />
        </div>
        <div className="flex mb-2 ">
          <h4 className='ml-4 mt-2'>Proveedor:</h4>
          <Select
          className='ml-3'
            options={options}
            value={selectedSupplier}
            onChange={handleChange}
            placeholder=""
            styles={customStyles}
          />
        
        </div>
        <hr className='ml-2 mt-4'/>
        <div>
          <h1 className='text-center mt-5'>$ {total}</h1>
          <p className='text-center mt-1'>Total</p>
        </div>

        <div className="mt-auto ">
          <hr className="ml-2 mt-5 " />
          <div className="flex justify-between pt-4">
            <ConfirmShop />
            <CancelShop />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ShoppingBill