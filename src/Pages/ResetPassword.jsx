import React from 'react'
import logo from '../img/logo.png'
import {AiOutlineMail} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../css/style.css'
import '../css/landing.css'
import '../fonts/cryptofont.css'
import '../fonts/feather.css'
import '../fonts/fontawesome.css'
import '../fonts//material.css'

function ResetPassword() {
	const {register, handleSubmit, formState:{errors}} = useForm();

	const onSubmit = handleSubmit(data=>{
		signin(data)
	})

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
						<form onSubmit={onSubmit}>

				
						<div className="input-group mb-3">
							<span className="input-group-text"><i data-feather="mail"><AiOutlineMail/></i></span>
							<input

					 		type="email"
					 		className="form-control"
					  		placeholder="Correo electrónico *"
					  		{...register('Email',{
							pattern: {
							value:
							  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
							message: "El correo electrónico no es válido"
						  }
						})}
					/>
					{errors.Email && (
                          <p className="text-red-500">{errors.Email.message}</p>
                    )}
						</div>
						
						<button className="btn btn-block btn-primary mt-3 mr-3 " >Enviar</button>
						<Link to="/">
                        <button className="btn btn-block btn-primary mt-3">
							Cancelar

                        </button>
                      </Link>
					  </form>
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