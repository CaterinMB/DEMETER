import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdRemoveRedEye } from "react-icons/md";
import '../css/style.css'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

function ShoppingView() {
    const [open, setOpen] = React.useState(false);

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
        onClick={handleOpen}
        className="btn  btn-icon btn-primary mr-1">
        <MdRemoveRedEye />
    </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <div>
            {/* Aquí va la estructura de tu modal simplificada */}
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5>Detalle de compras</h5>
                </div>
                <div className="card-body">
                  {/* Contenido del formulario simplificado */}
                  <form>
                    {/* ... Campos de formulario necesarios */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default ShoppingView