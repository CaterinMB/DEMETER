import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { useLosses } from '../Context/Losses.context';
import { IoMdArrowDropdown } from 'react-icons/io';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function CreateLosses({ supply, onLossCreated }) {
    const { createLoss } = useLosses();
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm();

    const onSubmit = handleSubmit(async (values) => {
        try {
            await createLoss({
                ...values,
                Supplies_ID: supply.ID_Supplies,
            });
            setOpen(false);
            if (onLossCreated) {
                onLossCreated();
            }
        } catch (error) {
            console.error('Error al registrar la pérdida', error);
        }
    });

    const onCancel = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <button
                type="button"
                className={`ml-1 btn btn-icon btn-primary ${!supply.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                onClick={() => {
                    setOpen(true);
                }}
                disabled={!supply.State}
            >
                <IoMdArrowDropdown />
            </button>

            <Modal
                open={open}
                onClose={onCancel}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={style}>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Registro de pérdida</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={(event) => onSubmit(event)}>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="Unit" className="form-label">
                                            Cantidad pérdida:
                                        </label>
                                        <input
                                            {...register('Unit', {
                                                required: 'Este campo es obligatorio',
                                                validate: (value) => {
                                                    const parsedValue = parseInt(value);
                                                    if (isNaN(parsedValue)) {
                                                        return 'La cantidad de pérdida debe ser un número válido.';
                                                    }
                                                },
                                            })}
                                            type="text"
                                            className="form-control"
                                        />
                                        {errors.Unit && (
                                            <p className="text-red-500">{errors.Unit.message}</p>
                                        )}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="Reason" className="form-label">
                                            Razón de la pérdida:
                                        </label>
                                        <textarea
                                            {...register('Reason', {
                                                required: 'Este campo es obligatorio',
                                            })}
                                            type="textarea"
                                            className="form-control"
                                        />
                                        {errors.Reason && (
                                            <p className="text-red-500">{errors.Reason.message}</p>
                                        )}
                                    </div>

                                    <div className="buttonconfirm">
                                        <div className="mb-3">
                                            <button
                                                className="btn btn-primary mr-5"
                                                type="submit"
                                                disabled={!isValid}
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
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default CreateLosses;
