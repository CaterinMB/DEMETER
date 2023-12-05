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
                                            title='Se debe ingresar el nombre del producto que se desea crear en el sistema.'
                                        />
                                        {errors.Name_Products && (
                                            <p className="text-red-500">
                                                {errors.Name_Products.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="ProductCategory_ID" className="form-label">
                                            Categoria: <strong>*</strong>
                                        </label>
                                        <Select
                                            {...register("Type_Document")}
                                            options={Category_products.map((category) => ({
                                                value: category.ID_ProductCategory,
                                                label: category.Name_ProductCategory,
                                            }))}
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
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
                                            title='Se debe seleccionar una categoria para el producto que se desea crear en el sistema.'
                                        />
                                        {errors.ProductCategory_ID && (
                                            <p className="text-red-500">{errors.ProductCategory_ID.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="control">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="Price_Product" className="form-label">
                                            Precio: <strong>*</strong>
                                        </label>
                                        <input
                                            {...register("Price_Product", {
                                                required: "El precio es obligatorio",
                                                validate: (value) => {
                                                    const parsedValue = parseInt(value);
                                                    if (isNaN(parsedValue)) {
                                                        return 'El precio debe ser un número válido.';
                                                    }
                                                },
                                            })}
                                            type="text"
                                            placeholder='Precio del producto'
                                            className="form-control"
                                            title='Ingresar el precio del producto que se desea crear.'
                                        />
                                        {errors.Price_Product && (
                                            <p className="text-red-500">
                                                {errors.Price_Product.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="Image" className="form-label">
                                            Imagen: <strong>*</strong>
                                        </label>
                                        <input
                                            {...register('Image', {
                                                required: 'Este campo es obligatorio',
                                                validate: {
                                                    validImage: (value) => {
                                                        const isFile = value instanceof FileList;
                                                        const isUrl = /^https?:\/\//i.test(value);

                                                        if (!isFile && !isUrl) {
                                                            return 'Por favor, selecciona una imagen o ingresa una URL válida.';
                                                        }

                                                        if (isFile) {
                                                            // Validar la imagen si es un archivo
                                                            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                                                            const maxFileSize = 5 * 1024 * 1024; // 5MB

                                                            const file = value[0];

                                                            const fileExtension = file.name.split('.').pop().toLowerCase();
                                                            if (!allowedExtensions.includes(fileExtension)) {
                                                                return 'Por favor, selecciona una imagen con formato válido (jpg, jpeg, png, gif).';
                                                            }

                                                            if (file.size > maxFileSize) {
                                                                return 'La imagen es demasiado grande. Por favor, selecciona una imagen más pequeña.';
                                                            }
                                                        }

                                                        return true; // La validación pasó
                                                    },
                                                },
                                            })}
                                            type="file"
                                            className="form-control"
                                            title='Inserte la imagen del producto.'
                                        />
                                        {errors.Image && (
                                            <p className="text-red-500">{errors.Image.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="buttonconfirm">
                                    <div className="mb-3">
                                        <button
                                            className="btn btn-primary"
                                            onClick={onCancel}
                                            type="button"
                                            title='Se cancela el producto antes de crearlo en el sistema.'
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="btn btn-primary mr-5"
                                            type="submit"
                                            title='Se crea el producto en el sistema.'
                                        >
                                            Confirmar
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