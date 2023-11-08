import React from 'react'
import logo from '../img/logo.png'
import {AiOutlineMail} from 'react-icons/ai'
import '../css/style.css'
import '../css/landing.css'
import '../fonts/cryptofont.css'
import '../fonts/feather.css'
import '../fonts/fontawesome.css'
import '../fonts//material.css'

function ResetPassword() {
  return (
    <div className="">
         <div class="auth-wrapper">
	<div class="auth-content">
		<div class="card">
			<div class="row align-items-center text-center">
				<div class="col-md-12">
					<div class="card-body">
						<img src={logo} alt="" class="img-fluid mb-4"/>
                        <p>Restablecer contraseña</p>
						<div class="input-group mb-3">
							<span class="input-group-text"><i data-feather="mail"><AiOutlineMail/></i></span>
							<input type="email" class="form-control" placeholder="Correo electrónico *"/>
						</div>
						
						<button class="btn btn-block btn-primary mt-3 mr-3 " onclick="location.href='index.html'">Enviar</button>
                        <button class="btn btn-block btn-primary mt-3" onclick="location.href='index.html'">Cancelar</button>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


    </div>
   
  )
}

export default ResetPassword;