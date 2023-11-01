import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineEye, AiFillDelete } from "react-icons/ai";
import "../css/style.css";
import "../css/landing.css";

import { useUser } from "../Context/User.context.jsx";
import UserCard from "../Components/User.card.jsx";
// import CreateUser from "../Components/CreateUser";
// import EditUser from '../Components/EditUser';
import DeleteUser from "../Components/DeleteUser";

function UserPage() {
    const { user, getUsers, deleteUser } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getUsers();
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
            deleteUser(userToDelete.ID_USUARIO);
            setUserToDelete(null);
            setIsDeleteModalOpen(false);
        }
    };

    const cancelDelete = () => {
        setUserToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = user.filter((user) => {
        const { Type_Document, Document, Name_User, LastName_User, Email, State } = user;
        const searchString = `${Type_Document} ${Document} ${Name_User} ${LastName_User} ${Email} ${State}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    return (
        <section className="pc-container">
            <div className="pcoded-content">
                <div className="row w-100">
                    <div className="col-md-12">
                        <div className=" w-100 col-sm-12">

                            <div className="card">
                                <div className="card-header">
                                    <h5>Visualización del empleados</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button
                                                type='button'
                                                className='btn btn-primary'
                                                onClick={navigateToCreateUser}
                                            >
                                                Crear Usuario
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

                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="card-body table-border-style">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Tipo de documento</th>
                                                        <th>N° documento</th>
                                                        <th>Nombre</th>
                                                        <th>Apellido</th>
                                                        <th>Email</th>
                                                        <th>Rol</th>
                                                        <th>Estado</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredUsers.map((user) => (
                                                        <UserCard
                                                            user={user}
                                                            key={user.ID_User}
                                                            onEdit={() => handleEdit(user)}
                                                            onDelete={() => handleDelete(user)}
                                                        />
                                                    ))}
                                                </tbody>
                                            </table>

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
                                                        <EditUser onClose={() => setIsEditModalOpen(false)} userToEdit={userToEdit} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserPage
