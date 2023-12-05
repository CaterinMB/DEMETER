import React, { useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useProduct } from '../Context/Product.context.jsx';
import { useSupplies } from '../Context/Supplies.context.jsx';

export default function CreateProductDetail() {
  const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm();
  const { createDetailP, detailP } = useProduct();
  const { supplies } = useSupplies();
  const [selectedSupplies, setSelectedSupplies] = useState(null);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '1px solid #201E1E' : '1px solid #201E1E',
      '&:hover': {
        border: '1px solid #201E1E',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#e36209' : state.isFocused ? '#e36209' : 'white',
      color: state.isSelected ? 'white' : state.isFocused ? '#555' : '#201E1E',
      '&:hover': {
        backgroundColor: '#e36209',
        color: 'white',
      },
      cursor: state.isDisabled ? 'not-allowed' : 'default',
    }),
  };

  const onSubmit = handleSubmit(async (values) => {
    const idNameProductDuplicate = product.some(products => products.Name_Products === values.Name_Products);

    if (idNameProductDuplicate) {
      setError('Name_Products', {
        type: 'manual',
        message: 'El nombre del producto ya existe.'
      });
      return;
    }

    if (!selectedSupplies || selectedSupplies.value === '') {
      setError('Supplies_ID', {
        type: 'manual',
        message: 'Debe seleccionar un insumo para la receta.'
      });
      return;
    }

    values.Supplies_ID = selectedSupplies.value;

    CreateProduct(values);
    onCreated();
    onClose();
  });

  return (
    <div>CreateProductDetail</div>
  )
}
