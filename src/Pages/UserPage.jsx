import React, { useState, useEffect, useLayoutEffect } from "react";

// Icons
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

// Diseño
import "../css/style.css";
import "../css/landing.css";

// Context
import { useRole } from "../Context/Role.context";
import { useUser } from "../Context/User.context.jsx";

// Componentes
import CreateUser from "../Components/CreateUser";
import UpdateUser from '../Components/UpdateUser';
import DeleteUser from "../Components/DeleteUser";

// Paginado
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function UserPage() {
    const { user, getUsers, toggleUserStatus, deleteUser } = useUser()
    const { role } = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [showEnabledOnly, setShowEnabledOnly] = useState(
        localStorage.getItem("showEnabledOnly") === "true"
    );
    const itemsForPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getUsers();
        setCurrentPage(1);
    }, []);

    const navigateToCreateUser = () => {
        setIsModalOpen(true);
    };

    const handleCreated = () => {
        getUsers();
    };

    const handleEdit = (user) => {
        setUserToEdit(user);
        setIsEditModalOpen(true);
    };

    const handleDelete = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            deleteUser(userToDelete.ID_User);
            setUserToDelete(null);
            setIsDeleteModalOpen(false);
        }
    };

    const cancelDelete = () => {
        setUserToDelete(null);
        setIsDeleteModalOpen(false);
    };

    useEffect(() => {
        localStorage.setItem("showEnabledOnly", showEnabledOnly);
    }, [showEnabledOnly]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // const handleCheckboxChange = () => {
    //     setShowEnabledOnly(!showEnabledOnly);
    // };

    const filteredUsers = user.filter((user) => {
        const { Type_Document, Document, Name_User, LastName_User, Email, State } = user;
        const searchString = `${Type_Document} ${Document} ${Name_User} ${LastName_User} ${Email} ${State}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    const enabledUsers = filteredUsers.filter((user) => user.State);
    const disabledUsers = filteredUsers.filter((user) => !user.State);
    const sortedUsers = [...enabledUsers, ...disabledUsers];

    const pageCount = Math.ceil(sortedUsers.length / itemsForPage);

    const startIndex = (currentPage - 1) * itemsForPage;
    const endIndex = startIndex + itemsForPage;
    const visibleUsers = sortedUsers.slice(startIndex, endIndex);

    const barraClass = user.State ? "" : "desactivado";

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <section className="pc-container">
            <div className="pcoded-content">
                <div className="row w-100">
                    <div className="col-md-12">
                        <div className=" w-100 col-sm-12">

                            <div className="card">
                                <div className="card-header">
                                    <h5>Visualización de empleados</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button
                                                type='button'
                                                className='btn btn-primary'
                                                onClick={navigateToCreateUser}
                                            >
                                                Registrar
                                            </button>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="search" className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Buscador"
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                    title='Buscar uno o varios empleados por algun dato registrado en el sistema.'
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="movement">
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="showEnabledOnly"
                                                    checked={showEnabledOnly}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label className="form-check-label" htmlFor="showEnabledOnly">
                                                    Habilitados
                                                </label>
                                            </div>
                                        </div> */}
                                    </div>


                                    <div className="card-body table-border-style">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">Tipo</th>
                                                        <th className="text-center">N° documento</th>
                                                        <th className="text-center">Nombre</th>
                                                        <th className="text-center">Apellido</th>
                                                        <th className="text-center">Email</th>
                                                        <th className="text-center">Rol</th>
                                                        <th className="text-center">Estado</th>
                                                        <th className="text-center">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {visibleUsers.map((users) => (
                                                        <tr key={users.ID_User}>
                                                            <td>{users.Type_Document}</td>
                                                            <td>{users.Document}</td>
                                                            <td>{users.Name_User}</td>
                                                            <td>{users.LastName_User}</td>
                                                            <td>{users.Email}</td>
                                                            <td>
                                                                {users.Role_ID
                                                                    ? role.find(
                                                                        (rol) =>
                                                                            rol.ID_Role ===
                                                                            users.Role_ID
                                                                    )?.Name_Role || '' : ''
                                                                }
                                                            </td>
                                                            <td className={`${barraClass}`}>
                                                                {users.State ? "Habilitado" : "Deshabilitado"}
                                                            </td>
                                                            <td>
                                                                <div style={{ display: "flex", alignItems: "center", padding: '3px' }}>
                                                                    <button
                                                                        onClick={() => handleEdit(users)}
                                                                        className={`ml-1 btn btn-icon btn-primary ${!users.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                                                                        disabled={!users.State}
                                                                    >
                                                                        <BiEdit />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(users)}
                                                                        className={`ml-1 btn btn-icon btn-danger ${!users.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                                                                        disabled={!users.State}
                                                                    >
                                                                        <AiFillDelete />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className={`ml-1 btn btn-icon btn-success ${barraClass}`}
                                                                        onClick={() => toggleUserStatus(users.ID_User)}
                                                                    >
                                                                        {users.State ? (
                                                                            <MdToggleOn className={`estado-icon active ${barraClass}`} />
                                                                        ) : (
                                                                            <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="pagination-container pagination"
                title='Para moverse mas rapido por el modulo cuando hay varios registros en el sistema.'
            >
                <Stack spacing={2}>
                    <Pagination
                        count={pageCount}
                        page={currentPage}
                        siblingCount={2}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
            </div>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, title: 'Muestra la pagina en la que se encuentra actualmente de las paginas en total que existen.' }}>
                <Typography variant="body2" color="text.secondary">
                    Página {currentPage} de {pageCount}
                </Typography>
            </Box>

            {isDeleteModalOpen && (
                <DeleteUser
                    onClose={cancelDelete}
                    onDelete={confirmDelete}
                />
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
                    <div className="modal-container">
                        <CreateUser onClose={() => setIsModalOpen(false)} onCreated={handleCreated} />
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}></div>
                    <div className="modal-container">
                        <UpdateUser onClose={() => setIsEditModalOpen(false)} userToEdit={userToEdit} />
                    </div>
                </div>
            )}
        </section>
    )
}

export default UserPage
