import React, { useEffect, useState } from 'react'
import logo from '../img/logo.png'
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai'
import { useUser } from "../Context/User.context.jsx";
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import '../css/style.css'
import '../css/landing.css'
import '../fonts/cryptofont.css'
import '../fonts/feather.css'
import '../fonts/fontawesome.css'
import '../fonts//material.css'

function Login() {
	const {signin, isAuthenticated, loginError } = useUser();
	const {register, handleSubmit, formState:{errors}} = useForm();
	const navigate = useNavigate();


	const onSubmit = async (data) => {
		  await signin(data);		
	}


	useEffect (()=>{
		if (isAuthenticated) navigate('/dashboard')
	}, [isAuthenticated])

	

  return (
	<div className="">
	<div className="auth-wrapper">
	  <div className="auth-content">
		<div className="card">
		  <div className="row align-items-center text-center">
			<div className="col-md-12">
			  <div className="card-body">
				<img src={logo} alt="" className="img-fluid mb-4" />
				<form onSubmit={handleSubmit(onSubmit)}>
				  <div className="input-group mb-3">
					<span className="input-group-text">
					  <i data-feather="mail"><AiOutlineMail /></i>
					</span>
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
				  <div className="input-group mb-4">
					<span className="input-group-text">
					  <i data-feather="lock"><AiOutlineLock /></i>
					</span>
					<input
					  type="password"
					  className="form-control"
					  placeholder="Contraseña *"
					  {...register('Password',{
						required: true
					  })}
					/>
					
				  </div>
				  {loginError && (
                      <p className="text-red-500">{loginError}</p>
                    )}
				  <button type="submit" className="btn btn-block btn-primary mb-4">Iniciar sesión</button>
				</form>
				<p className="mb-0 text-muted">
				  ¿Desea restablecer la contraseña? <Link to="/resetPassword" className="f-w-400">Recuperar</Link>
				</p>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
);
}

export default Login;