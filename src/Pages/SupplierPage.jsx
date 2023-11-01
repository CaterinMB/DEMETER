import React, { useState, useEffect } from 'react';
import { BiEdit } from 'react-icons/bi'
import { AiOutlineEye, AiFillDelete } from 'react-icons/ai'
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useSupplier } from '../Context/Supplier.context';
import '../css/style.css'
import '../css/landing.css'
import '../fonts/cryptofont.css'
import '../fonts/feather.css'
import '../fonts/fontawesome.css'
import '../fonts//material.css'
import CreateSupplier from '../Components/CreateSupplier.jsx';
import DeleteSupplier from '../Components/DeleteSupplier';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function SupplierPage() {
    const { supplier, getSupplier, deleteSupplier, toggleSupplyStatus } = useSupplier();
    const [searchTerm, setSearchTerm] = useState('');

    const Status = supplier.State ? "" : "Inhabilitado";

    useEffect(() => {
        getSupplier().then(console.log(supplier));;
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredSuppliers = supplier.filter((supplierItem) => {
        const { Type_Document, Document, Name_Supplier, Name_Business, Phone, City, Email, State } = supplierItem;
        const searchString = `${Type_Document} ${Document} ${Name_Supplier} ${Name_Business} ${Phone} ${City} ${Email} ${State}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });



    return (
        <section class="pc-container">
            <div class="pcoded-content">
                <div class="row w-100">
                    <div class="col-md-12">
                        <div class=" w-100 col-sm-12">

                            <div class="card">
                                <div class="card">
                                    <div class="card-header">
                                        <h5>Visualización del proveedor</h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <CreateSupplier />


                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <input type="search" class="form-control"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Buscador"
                                                        value={searchTerm}
                                                        onChange={handleSearchChange}

                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <div class="card-body table-border-style">
                                            <div class="table-responsive">
                                                <table class="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Tipo de documento</th>
                                                            <th>Documento</th>
                                                            <th>Nombre</th>
                                                            <th>Empresa</th>
                                                            <th>Telefono</th>
                                                            <th>Ciudad</th>
                                                            <th>Email</th>
                                                            <th>Estado</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredSuppliers.map((supplierItem) => (
                                                            <tr key={supplierItem.ID_Supplier}>
                                                                <td>{supplierItem.Type_Document}</td>
                                                                <td>{supplierItem.Document}</td>
                                                                <td>{supplierItem.Name_Supplier}</td>
                                                                <td>{supplierItem.Name_Business}</td>
                                                                <td>{supplierItem.Phone}</td>
                                                                <td>{supplierItem.City}</td>
                                                                <td>{supplierItem.Email}</td>
                                                                <td className={`${Status}`}>{supplierItem.State ? 'Habilitado' : 'Deshabilitado'}</td>


                                                                <td className='flex items-center'>
                                                                    <button type="button" class="btn  btn-icon btn-primary"><i data-feather="thumbs-up"><BiEdit /></i></button>
                                                                    <DeleteSupplier />
                                                                    <button type="button" class="btn  btn-icon btn-success"><i data-feather="check-circle" >
                                                                        {supplier.State ? (
                                                                            <MdToggleOn className={`${Status}`} />

                                                                        ) : (
                                                                            <MdToggleOff className={`${Status}`} />
                                                                        )}
                                                                    </i> </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <Stack spacing={3} className='pagination'>
                                                    <Pagination className='pagination' count={5} showFirstButton showLastButton />
                                                </Stack>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SupplierPage