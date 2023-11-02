import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineEye, AiFillDelete } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useSupplier } from "../Context/Supplier.context";
import "../css/style.css";
import "../css/landing.css";

function ShoppingPage() {

    


  return (
<section class="pc-container">
    <div class="pcoded-content">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h5>Registro de "Nombre del Modulo"</h5>
                    </div>
                    <div class="card-body">
                        {/* <script>
                            // Example starter JavaScript for disabling form submissions if there are invalid fields
                            (function() {
                                'use strict';
                                window.addEventListener('load', function() {
                                    // Fetch all the forms we want to apply custom Bootstrap validation styles to
                                    var forms = document.getElementsByClassName('needs-validation');
                                    // Loop over them and prevent submission
                                    var validation = Array.prototype.filter.call(forms, function(form) {
                                        form.addEventListener('submit', function(event) {
                                            if (form.checkValidity() === false) {
                                                event.preventDefault();
                                                event.stopPropagation();
                                            }
                                            form.classList.add('was-validated');
                                        }, false);
                                    });
                                }, false);
                            })();
                        </script> */}
                        <form class="was-validated">
                            <div class="mb-3">
                                <label for="validationTextarea" class="form-label">Textarea</label>
                                <textarea class="form-control is-invalid" id="validationTextarea" placeholder="Required example textarea" required></textarea>
                                <div class="invalid-feedback">
                                    Please enter a message in the textarea.
                                </div>
                            </div>
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input" id="validationFormCheck1" required/>
                                <label class="form-check-label" for="validationFormCheck1">Check this checkbox</label>
                                <div class="invalid-feedback">Example invalid feedback text</div>
                            </div>
                            <div class="form-check">
                                <input type="radio" class="form-check-input" id="validationFormCheck2" name="radio-stacked" required/>
                                <label class="form-check-label" for="validationFormCheck2">Toggle this radio</label>
                            </div>
                            <div class="form-check mb-3">
                                <input type="radio" class="form-check-input" id="validationFormCheck3" name="radio-stacked" required/>
                                <label class="form-check-label" for="validationFormCheck3">Or toggle this other radio</label>
                                <div class="invalid-feedback">More example invalid feedback text</div>
                            </div>
                            <div class="mb-3">
                                <select class="form-select" required aria-label="select example">
                                    <option value="">Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <div class="invalid-feedback">Example invalid select feedback</div>
                            </div>
                            <div class="form-file mb-3">
                                <input type="file" class="form-file-input" id="validationFormFile" required/>
                                <label class="form-file-label" for="validationFormFile">
                                    <span class="form-file-text">Choose file...</span>
                                    <span class="form-file-button">Browse</span>
                                </label>
                                <div class="invalid-feedback">Example invalid form file feedback</div>
                            </div>
                            <div class="mb-3">
                                <button class="btn btn-primary" type="submit" disabled>Submit form</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            
            <div class="col-sm-12">

                <div class="card">
                    <div class="card-header">
                        <h5>Visualización de "Nombre del Modulo"</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                              <button type="button" class="btn btn-primary"><i class="mr-2" data-feather="thumbs-up"></i>Primary</button>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <input type="search" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Buscador"/>
                              </div>
                            </div>
                          </div>                                     

                        
                        <div class="card-body table-border-style">
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td><button type="button" class="btn  btn-icon btn-primary"><i data-feather="thumbs-up"></i></button>
                                                <button type="button" class="btn  btn-icon btn-secondary"><i data-feather="camera"></i></button>
                                                <button type="button" class="btn  btn-icon btn-success"><i data-feather="check-circle"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td><button type="button" class="btn  btn-icon btn-primary"><i data-feather="thumbs-up"></i></button>
                                                <button type="button" class="btn  btn-icon btn-secondary"><i data-feather="camera"></i></button>
                                                <button type="button" class="btn  btn-icon btn-success"><i data-feather="check-circle"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                            <td><button type="button" class="btn  btn-icon btn-primary"><i data-feather="thumbs-up"></i></button>
                                                <button type="button" class="btn  btn-icon btn-secondary"><i data-feather="camera"></i></button>
                                                <button type="button" class="btn  btn-icon btn-success"><i data-feather="check-circle"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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

export default ShoppingPage