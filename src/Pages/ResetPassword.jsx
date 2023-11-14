import React from 'react'
import logo from '../img/logo.png'
import {AiOutlineMail} from 'react-icons/ai'
import { useNavigate, Link } from 'react-router-dom';
import '../css/style.css'
import '../css/landing.css'
import '../fonts/cryptofont.css'
import '../fonts/feather.css'
import '../fonts/fontawesome.css'
import '../fonts//material.css'

function ResetPassword() {
  return (
    <div className="">
         <div className="auth-wrapper">
	<div className="auth-content">
		<div className="card">
			<div className="row align-items-center text-center">
				<div className="col-md-12">
					<div className="card-body">
						<img src={logo} alt="" className="img-fluid mb-4"/>
                        <p>Restablecer contraseña</p>
						<div className="input-group mb-3">
							<span className="input-group-text"><i data-feather="mail"><AiOutlineMail/></i></span>
							<input type="email" className="form-control" placeholder="Correo electrónico *"/>
						</div>
						
						<button className="btn btn-block btn-primary mt-3 mr-3 " onclick="location.href='index.html'">Enviar</button>
                        <Link  to="/login" className="btn btn-block btn-primary mt-3" onclick="location.href='index.html'">Cancelar</Link>
						
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