import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useForm } from 'react-hook-form';

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};

export default function AssignPermissions({ onClose, onCreated }) {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  // Cambio de activacion
  const [dashboardActive, setDashboardActive] = useState(false);
  const [configuracionActive, setConfiguracionActive] = useState(false);
  const [usuarioActive, setUsuarioActive] = useState(false);
  const [categoriaInsumosActive, setCategoriaInsumosActive] = useState(false);
  const [insumosActive, setInsumosActive] = useState(false);
  const [proveedoresActive, setProveedoresActive] = useState(false);
  const [categoriaProductosActive, setCategoriaProductosActive] = useState(false);
  const [productosActive, setProductosActive] = useState(false);
  const [meserosActive, setMeserosActive] = useState(false);
  const [comprasActive, setComprasActive] = useState(false);
  const [ventasActive, setVentasActive] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    onCreated();
    onClose();
  });

  const onCancel = () => {
    onClose();
  };

  // Funciones de cambio de activacion
  const handleDashboardClick = () => {
    setDashboardActive(prevState => !prevState);
  };

  const handleConfiguracionClick = () => {
    setConfiguracionActive(prevState => !prevState);
  };

  const handleUsuarioClick = () => {
    setUsuarioActive(prevState => !prevState);
  };

  const handleCategoriaInsumosClick = () => {
    setCategoriaInsumosActive(prevState => !prevState);
  };

  const handleInsumosClick = () => {
    setInsumosActive(prevState => !prevState);
  };

  const handleProveedoresClick = () => {
    setProveedoresActive(prevState => !prevState);
  };

  const handleCategoriaProductosClick = () => {
    setCategoriaProductosActive(prevState => !prevState);
  };

  const handleProductosClick = () => {
    setProductosActive(prevState => !prevState);
  };

  const handleMeserosClick = () => {
    setMeserosActive(prevState => !prevState);
  };

  const handleComprasClick = () => {
    setComprasActive(prevState => !prevState);
  };

  const handleVentasClick = () => {
    setVentasActive(prevState => !prevState);
  };

  return (
    <Box sx={{ ...style, width: 600 }}>
      <div>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5>Asignacion de permisos</h5>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>

                <div className="control">
                  <div className="form-group col-md-4">
                    <h5>DashBoard</h5>
                    <button
                      type="button"
                      className={`${dashboardActive ? "" : "desactivado"}`}
                      onClick={handleDashboardClick}
                    >
                      {dashboardActive ? (
                        <MdToggleOn className={`estado-icon active`} />
                      ) : (
                        <MdToggleOff className={`estado-icon inactive`} />
                      )}
                    </button>
                  </div>
                  <div className="form-group col-md-4">
                    <h5>Configuracion</h5>
                    <button
                      type="button"
                      className={`${configuracionActive ? "" : "desactivado"}`}
                      onClick={handleConfiguracionClick}
                    >
                      {configuracionActive ? (
                        <MdToggleOn className={`estado-icon active`} />
                      ) : (
                        <MdToggleOff className={`estado-icon inactive`} />
                      )}
                    </button>
                  </div>
                  <div className="form-group col-md-4">
                    <h5>Usuario</h5>
                    <button
                      type="button"
                      className={`${usuarioActive ? "" : "desactivado"}`}
                      onClick={handleUsuarioClick}
                    >
                      {usuarioActive ? (
                        <MdToggleOn className={`estado-icon active`} />
                      ) : (
                        <MdToggleOff className={`estado-icon inactive`} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="control">
                  <div className="form-group col-md-4">
                    <h5>Categoria Insumos</h5>
                    <button
                      type="button"
                      className={`${categoriaInsumosActive ? "" : "desactivado"}`}
                      onClick={handleCategoriaInsumosClick}
                    >
                      {categoriaInsumosActive ? (
                        <MdToggleOn className={`estado-icon active`} />
                      ) : (
                        <MdToggleOff className={`estado-icon inactive`} />
                      )}
                    </button>
                  </div>
                  <div className="form-group col-md-4">
                    <h5>Insumos</h5>
                    <button
                      type="button"
                      className={`${insumosActive ? "" : "desactivado"}`}
                      onClick={handleInsumosClick}
                    >
                      {insumosActive ? (
                        <MdToggleOn className={`estado-icon active`} />
                      ) : (
                        <MdToggleOff className={`estado-icon inactive`} />
                      )}
                    </button>
                  </div>
                  <div className="form-group col-md-4">
                    <h5>Proveedores</h5>
                    <button
                      type="button"
                      className={`${proveedoresActive ? "" : "desactivado"}`}
                      onClick={handleProveedoresClick}
                    >
                      {proveedoresActive ? (
                        <MdToggleOn className={`estado-icon active`} />
                      ) : (
                        <MdToggleOff className={`estado-icon inactive`} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="control">
                  <div className="form-group col-md-4">
                    <h5>Categoria Productos</h5>
                    <button
                      type="button"
                      className={`${categoriaProductosActive ? "" : "desactivado"}`}
                      onClick={handleCategoriaProductosClick}
                    >
                      {categoriaProductosActive ? (
                        <MdToggleOn className={`estado-icon active`} />
                      ) : (
                        <MdToggleOff className={`estado-icon inactive`} />
                      )}
                    </button>
                  </div>
                  <div className="form-group col-md-4">
                    <h5>Productos</h5>
                    <button
                      type="button"
                      className={`${productosActive ? "" : "desactivado"}`}
                      onClick={handleProductosClick}
                    >
                      {productosActive ? (
                        <MdToggleOn className={`estado-icon active`} />
                      ) : (
                        <MdToggleOff className={`estado-icon inactive`} />
                      )}
                    </button>
                  </div>
                  <div className="form-group col-md-4">
                    <h5>Meseros</h5>
                    <button
                      type="button"
                      className={`${meserosActive ? "" : "desactivado"}`}
                      onClick={handleMeserosClick}
                    >
                      {meserosActive ? (
                        <MdToggleOn className={`estado-icon active`} />
                      ) : (
                        <MdToggleOff className={`estado-icon inactive`} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="control">
                  <div className="form-group col-md-6">
                    <h5>Compras</h5>
                    <button
                      type="button"
                      className={`${comprasActive ? "" : "desactivado"}`}
                      onClick={handleComprasClick}
                    >
                      {comprasActive ? (
                        <MdToggleOn className={`estado-icon active`} />
                      ) : (
                        <MdToggleOff className={`estado-icon inactive`} />
                      )}
                    </button>
                  </div>
                  <div className="form-group col-md-6">
                    <h5>Ventas</h5>
                    <button
                      type="button"
                      className={`${ventasActive ? "" : "desactivado"}`}
                      onClick={handleVentasClick}
                    >
                      {ventasActive ? (
                        <MdToggleOn className={`estado-icon active`} />
                      ) : (
                        <MdToggleOff className={`estado-icon inactive`} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="buttonconfirm">
                  <div className="mb-3">
                    <button
                      className="btn btn-primary"
                      onClick={onCancel}
                      type="button"
                      title='Cancelar el rol no creado actualemente en el sistema'
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn btn-primary mr-5"
                      type="submit"
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
