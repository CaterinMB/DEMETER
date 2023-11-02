import React, { useState } from 'react';
import Select from 'react-select';
import Box from "@mui/material/Box";
import { useForm } from 'react-hook-form';
import { useUser } from '../Context/User.context.jsx';

const style = {
    position: "absolute",
    top: "50%",
    left: "60%",
    transform: "translate(-40%, -60%)",
    width: 100,
    height: 100,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 20,
    pt: 1,
    px: 3,
    pb: 2
};

function CreateWaiter({ onClose, onCreated }) {
    const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm();
    const { createWaiter, user } = useUser();
    const [selectedType, setSelectedType] = useState({ label: 'Seleccione tipo', value: '', isDisabled: true });

    const typeOptions = [
        { label: 'Seleccione tipo', value: '', isDisabled: true },
        { label: 'Registro civli', value: 'RC' },
        { label: 'Tarjeta de identidad', value: 'TI' },
        { label: 'Cédula de ciudadanía', value: 'CC' },
        { label: 'Cédula de extranjería', value: 'CE' },
        { label: 'Pasaporte', value: 'PB' },
    ];

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
        const isDocumentouplicate = user.some(users => users.Document === values.Document);

        if (isDocumentouplicate) {
            setError('Document', {
                type: 'manual',
                message: 'El documento del usuario ya existe.'
            });
            return;
        }

        if (!selectedType || selectedType.value === '') {
            setError('Type_Document', {
                type: 'manual',
                message: 'Debe seleccionar un tipo de documento.'
            });
            return;
        }

        values.Type_Document = selectedType.value;

        createWaiter(values);
        onCreated();
        onClose();
    });

    const onCancel = () => {
        onClose();
    };

    return (
        <Box sx={{ ...style, width: 500, height: 500 }}>
            <div>
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h5>Registro de mesero</h5>
                        </div>
                        <div class="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="control">
                                    <div class="form-group col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="Type_Document" className="form-label mt-3">
                                                Tipo de documento: <strong>*</strong>
                                            </label>
                                            <Select
                                                options={typeOptions}
                                                {...register("Type_Document")}
                                                value={selectedType}
                                                onChange={(selectedOption) => setSelectedType(selectedOption)}
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
                                            {errors.Type_Document && (
                                                <p className="text-red-500">
                                                    {errors.Type_Document.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label htmlFor="Document" className="form-label">
                                            Número de identidad: <strong>*</strong>
                                        </label>
                                        <input
                                            type="number"
                                            {...register("Document", {
                                                required: "El documento es obligatorio",
                                                validate: (value) => {
                                                    const parsedValue = parseInt(value);
                                                    if (
                                                        isNaN(parsedValue) ||
                                                        parsedValue < 10000000 ||
                                                        parsedValue > 9999999999
                                                    ) {
                                                        return "El número no es valido, debe tener de 8 a 10 caracteres.";
                                                    }
                                                }
                                            })}
                                            className="form-control"
                                        />
                                        {errors.Document && (
                                            <p className="text-red-500">
                                                {errors.Document.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="control">
                                    <div class="form-group col-md-6">
                                        <label htmlFor="Name_User" className="form-label">
                                            Nombre
                                        </label>
                                        <input
                                            {...register("Name_User", {
                                                required: "El nombre es obligatorio",
                                                pattern: {
                                                    value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                                                    message:
                                                        "El nombre del mesero debe tener la primera letra en mayúscula y solo letras."
                                                }
                                            })}
                                            type="text"
                                            className="form-control"
                                        />
                                        {errors.Name_User && (
                                            <p className="text-red-500">
                                                {errors.Name_User.message}
                                            </p>
                                        )}
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label htmlFor="LastName_User" className="form-label">
                                            Empresa
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
                                            className="form-control"
                                        />
                                        {errors.LastName_User && (
                                            <p className="text-red-500">
                                                {errors.LastName_User.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="control">
                                    <div class="form-group col-md-6">
                                        <label htmlFor="Restaurant" className="form-label">
                                            Restaurante: <strong>*</strong>
                                        </label>
                                        <input
                                            {...register("Restaurant", {
                                                required: "El restaurante es obligatorio"
                                            })}
                                            type="text"
                                            className="form-control"
                                            required
                                        />
                                        {errors.Restaurant && (
                                            <p className="text-red-500">
                                                {errors.Restaurant.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="buttonconfirm">
                                    <div class="mb-3">
                                        <button
                                            class="btn btn-primary mr-5"
                                            type="submit"
                                            disabled={!isValid}
                                        >
                                            Confirmar
                                        </button>
                                        <button
                                            class="btn btn-primary"
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

export default CreateWaiter