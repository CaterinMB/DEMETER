import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { AiOutlineFileText } from 'react-icons/ai';
import { useLosses } from '../Context/Losses.context';
import { format } from 'date-fns';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function SeeLosses({ supply }) {
    const { losses, getLosses } = useLosses();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getLosses();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <button
                type="button"
                className={`ml-1 btn btn-icon btn-primary ${!supply.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                onClick={handleOpen}
                disabled={!supply.State}
            >
                <AiOutlineFileText />
            </button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={style}>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Pérdidas Asociadas</h5>
                            </div>
                            <div className="card-body">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Cantidad pérdida</th>
                                            <th>Razón de pérdida</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {losses.map((loss) => (
                                            <tr key={loss.ID_Losses}>
                                                <td>  
                                                {loss.createdAt ? format(new Date(loss.createdAt), 'dd/MM/yyyy HH:mm:ss') : 'Fecha no disponible'}
                                                </td>
                                                <td>{loss.Unit}</td>
                                                <td>{loss.Reason}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="buttonconfirm">
                                    <div className="mb-3">
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleClose}
                                            type="button"
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default SeeLosses;
