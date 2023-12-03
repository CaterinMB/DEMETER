import React, { useState } from 'react';
import Select from 'react-select';
import Box from "@mui/material/Box";
import { useForm } from 'react-hook-form';
import { useProduct } from '../Context/Product.context.jsx';
import { useCategoryProducts } from '../Context/CategoryProducts.context.jsx';

const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};

function CreateProduct({ onClose, onCreated }) {

    const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm();
    const { CreateProduct, product } = useProduct();
    const { Category_products } = useCategoryProducts();
    const [selectedCategory, setSelectedCategory] = useState(null);

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

        if (!selectedCategory || selectedCategory.value === '') {
            setError('ProductCategory_ID', {
                type: 'manual',
                message: 'Debe seleccionar una categoria para el producto.'
            });
            return;
        }

        values.ProductCategory_ID = selectedCategory.value;

        CreateProduct(values);
        onCreated();
        onClose();
    });

    const onCancel = () => {
        onClose();
    };

    return (
        <Box sx={{ ...style, width: 600 }}>
            <div>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Registro de empleado</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>

                                <div className="control">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="Name_Products" className="form-label">
                                            Nombre: <strong>*</strong>
                                        </label>
                                        <input
                                            {...register("Name_Products", {
                                                required: "El nombre es obligatorio",
                                                pattern: {
                                                    value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                                                    message:
                                                        "El nombre del mesero debe tener la primera letra en mayúscula y solo letras."
                                                }
                                            })}
                                            type="text"
                                            placeholder='Nombre del producto'
                                            className="form-control"
                                        />
                                        {errors.Name_Products && (
                                            <p className="text-red-500">
                                                {errors.Name_Products.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="LastName_User" className="form-label">
                                            Apellidos: <strong>*</strong>
                                        </label>
                                        <input
                                            {...register("LastName_User", {
                                                required: 'El apellido es obligatorio',
                                                pattern: {
                                                    value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                                                    message:
                                                        "El apellido del mesero debe tener la primera letra en mayúscula y solo letras."
                                                }
                                            })}
                                            type="text"
                                            placeholder='Apellido'
                                            className="form-control"
                                        />
                                        {errors.LastName_User && (
                                            <p className="text-red-500">
                                                {errors.LastName_User.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
{/* 
                                <div className="control">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="Role_ID" className="form-label">
                                            Rol: <strong>*</strong>
                                        </label>
                                        <Select
                                            options={[
                                                { label: 'Seleccione rol', value: '', isDisabled: true },
                                                ...rolOpcions
                                            ]}
                                            {...register("Role_ID")}
                                            value={rolOpcions}
                                            onChange={(selectedOption) => setSelectRol(selectedOption)}
                                            menuPlacement="auto"
                                            menuShouldScrollIntoView={false}
                                            maxMenuHeight={132}
                                            styles={customStyles}
                                            theme={(theme) => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary: '#201E1E',
                                                },
                                            })}
                                        />
                                        {errors.Role_ID && (
                                            <p className="text-red-500">
                                                {errors.Role_ID.message}
                                            </p>
                                        )}
                                    </div>
                                </div> */}

                                <div className="buttonconfirm">
                                    <div className="mb-3">
                                        <button
                                            className="btn btn-primary mr-5"
                                            type="submit"
                                        >
                                            Confirmar
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={onCancel}
                                            type="button"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default CreateProduct