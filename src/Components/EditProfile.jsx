import React from 'react'
import { useForm } from 'react-hook-form';

const EditUser = () => {

    const { register, formState: { errors } } = useForm({});

    return (
        <form className='text-center col-md-10'>
            <div className="form-group p-3">
                <label htmlFor="Name_User" className="form-label">
                    Nombres: <strong>*</strong>
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
                    placeholder='Nombre'
                    className="form-control"
                />
                {errors.Name_User && (
                    <p className="text-red-500">
                        {errors.Name_User.message}
                    </p>
                )}
            </div>

            <div className="form-group px-3">
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
            
            <div className="form-group p-3">
                <label htmlFor="Email" className="form-label">
                    Correo electrónico: <strong>*</strong>
                </label>
                <input
                    {...register("Email", {
                        required: 'El correo es obligatorio',
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                            message: 'El correo electrónico no es válido'
                        }
                    })}
                    type="email"
                    placeholder='Correo electrónico'
                    className="form-control"
                />
                {errors.Email && (
                    <p className="text-red-500">
                        {errors.Email.message}
                    </p>
                )}
            </div>

            <div className="buttonconfirm">
                <button
                    className="btn btn-primary mr-3"
                    type="submit"
                >
                    Guardar
                </button>
            </div>
        </form>
    )
}
export default EditUser
