import React from 'react'
import logo from '../img/logo.png'
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai'
import { useNavigate, Link } from 'react-router-dom';
import '../css/style.css'
import '../css/landing.css'
import '../fonts/cryptofont.css'
import '../fonts/feather.css'
import '../fonts/fontawesome.css'
import '../fonts//material.css'

function NewPassword() {
  return (
    <div className="">
         <div className="auth-wrapper">
	<div className="auth-content">
		<div className="card">
			<div className="row align-items-center text-center">
				<div className="col-md-12">
					<div className="card-body">
						<img src={logo} alt="" className="img-fluid mb-4"/>
                        <p>Escribe tu nueva contraseña</p>
						<div className="input-group mb-3">
							<span className="input-group-text"><i data-feather="lock"><AiOutlineLock/></i></span>
							<input type="email" className="form-control" placeholder="Nueva contraseña"/>
						</div>
						<div className="input-group mb-4">
							<span className="input-group-text"><i data-feather="lock"><AiOutlineLock/></i></span>
							<input type="password" className="form-control" placeholder="Confirmar contraseña "/>
						</div>
						<button className="btn btn-block btn-primary mb-4" >Enviar</button>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


    </div>
   
  )
}

export default NewPassword;