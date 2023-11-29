import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";
import ShoppingBill from '../Components/ShoppingBill';
import { useSupplies } from '../Context/Supplies.context'
import '../css/style.css'
import '../css/general.css'

function NewPurchase() {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("")
  const [selectedSupplies, setSelectedSupplies] = useState([])
  const [shoppingBillState, setShoppingBillState] = useState({
    total: 0
  })
  
  // const [selectedSupplies, setSelectedSupplies] = useState([{
  //   Lot: "",
  //   medida1: "",
  //   Price_Supplier: "",
  //   supplieName: "",
  //   ID_Supplies: ""
  // }])

  

  const [suppliesState, setSuppliesState] = useState([{
    ID_Supplies: "",
    Name_Supplies: "",
    Unit: 0,
    Measure: 0
  }])

  const supplierRef = useRef(null)

  const onSubmit = (data) => {
    const { Name_Supplies = "" } = suppliesState.find(v => v.ID_Supplies == supplierRef.current) || {}
    const newData = {
      ...data,
      supplieName: Name_Supplies,
      ID_Supplies: supplierRef.current
    }
    if (Object.values(newData).some(v => !v)) {
      const message = "Llena todos los campos"
      setError(message)
      return
    }
    else if (error) {
      setError("")
    }
    reset()
    const element = selectedSupplies.findIndex(val => val.ID_Supplies == supplierRef.current)
    if (element != -1) {
      updateTotalValue(selectedSupplies.splice(element, 1, newData))
      setSelectedSupplies(prev => prev.splice(element, 1, newData))
    }
    else {
      updateTotalValue([...selectedSupplies, newData])
      setSelectedSupplies(prev => [...prev, newData])
    }

    console.log(selectedSupplies)
  };

  const { getShopSupplies } = useSupplies()

  const updateTotalValue = (array = selectedSupplies) => {
    setShoppingBillState(prev => ({
      ...prev,
      total: array.reduce((acc, curr) => acc + (curr.Price_Supplier * curr.Lot), 0)
    }))

  }
  useEffect(() => {
    // setSuppliesState(getSupplies())
    // console.log("Supplies")
    return async () => {
      const newSupplies = await Promise.resolve(getShopSupplies())
      setSuppliesState(newSupplies)
      console.log(newSupplies)
    }
    // console.log(getSupplies())
  }, [])

  /**
   * @param {Object} target
   * @param {Document} target.target
   */
  const onSelectSupplie = ({ target: { value } }) => {
    // console.log(target.querySelector("selected").value)
    supplierRef.current = value
  }

  const onDeleteSupplie = (id) => {
    updateTotalValue(selectedSupplies.filter(el => el.ID_Supplies != id))
    setSelectedSupplies(prev => prev.filter(el => el.ID_Supplies != id))
  }

  return (

    <div className='position-shop'>
      <div className="flex justify-between mt-20 mx-10 ">

        <div className=" card-body table-border-style mt-4">
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="flex flex-row mb-5 ml-5">
              <div className="mr-5">
                <label>
                  Insumo:
                  <select className="border border-gray-300 rounded-md p-1 ml-2" onChange={onSelectSupplie}>
                    <option value="" selected>Selecciona un insumo</option>
                    {suppliesState.map(({ ID_Supplies, Name_Supplies }) => (
                      <option value={ID_Supplies}>{Name_Supplies}</option>
                    ))}
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
                  <select className="select-measure text-center border border-gray-300 rounded-md p-1 mr-5 ml-2" {...register("medida1")}>
                    <option value="kg">Kg</option>
                    <option value="lb">Lb</option>
                  </select>
                </label>
              </div>
              <div>
                <label className='ml-5'>
                  Precio:
                  <input className="border border-gray-300 rounded-md p-1 ml-4" type="number" {...register("Price_Supplier")} />
                </label>
              </div>
              <button type="submit" className="btn btn-icon btn-primary ml-4 mb-3">Agregar insumo</button>
             
            </div>
            {error && <p className='ml-5'>{error}</p>}
          </form>

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
                {
                  selectedSupplies.map(({ Lot, Price_Supplier, supplieName, medida1, ID_Supplies }) => (
                    <tr>
                      <td>{supplieName}</td>
                      <td>{Lot}</td>
                      <td>{medida1}</td>
                      <td>{Price_Supplier}</td>
                      <td>
                        <button type="button" className="btn btn-icon btn-danger" onClick={() => onDeleteSupplie(ID_Supplies)}>
                          <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='position-facture ml-5'>

        <ShoppingBill {...shoppingBillState} />
      </div>

    </div>
  )
}

export default NewPurchase;