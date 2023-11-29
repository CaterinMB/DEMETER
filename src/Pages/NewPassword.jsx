import React from 'react'
import logo from '../img/logo.png'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useUser } from '../Context/User.context';
import { useForm } from 'react-hook-form';
import '../css/style.css'
import '../css/landing.css'
import '../fonts/cryptofont.css'
import '../fonts/feather.css'
import '../fonts/fontawesome.css'
import '../fonts//material.css'

function NewPassword() {
	const { NewPasswordd, changePasswordError, changePasswordSuccess} = useUser()
	const {register,handleSubmit, formState:{errors}} = useForm();

	const onSubmit = handleSubmit(data => {
		NewPasswordd(token, data.Password, data.ConfirmPassword);
	  });

	const { token } = useParams()

	const handleNewPassword = () => {
		NewPasswordd(token)
	}

	return (
		<div className="">
		<div className="auth-wrapper">
		  <div className="auth-content">
			<div className="card">
			  <div className="row align-items-center text-center">
				<div className="col-md-12">
				  <div className="card-body">
					<img src={logo} alt="" className="img-fluid mb-4" />
					<p>Restablecer contraseña</p>
					<form onSubmit={handleSubmit(onSubmit)}>
					  <div className="input-group mb-3">
						<span className="input-group-text"><i data-feather="mail"><AiOutlineLock /></i></span>
						<input
						  type="password"
						  className="form-control"
						  placeholder="Contraseña *"
						  {...register('Password', {
							require: "Debe llenar el campo para cambiar la contraseña",
							pattern: {
							  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?=.*\w).*$/,
							  message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.'
							},
							minLength: {
							  value: 5,
							  message: 'La contraseña debe tener al menos 5 caracteres'
							},
							maxLength: {
							  value: 20,
							  message: 'La contraseña no puede tener más de 20 caracteres'
							}
						  })}
						/>
						{errors.Password && (
						  <p className="text-red-500">{errors.Password.message}</p>
						)}
					  </div>
  
					  <div className="input-group mb-3">
						<span className="input-group-text"><i data-feather="mail"><AiOutlineLock /></i></span>
						<input
						  type="password"
						  className="form-control"
						  placeholder="Confirmar Contraseña *"
						  {...register('ConfirmPassword', {
							require: "Debe llenar la confirmación de la contraseña",
							validate: (value) =>
							  value === getValues('Password') || 'Las contraseñas no coinciden',
						  })}
						/>
						{errors.ConfirmPassword && (
						  <p className="text-red-500">{errors.ConfirmPassword.message}</p>
						)}
					  </div>
					  {changePasswordError && (
  					<p className="text-red-500">{changePasswordError}</p>
						)}
					{changePasswordSuccess && (
 					 <p className="text-green-500">{changePasswordSuccess}</p>
					)}

					  <button type="submit" className="btn btn-block btn-primary mt-3 mr-3" onClick={handleNewPassword}>Confirmar</button>
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
  
export default NewPassword;