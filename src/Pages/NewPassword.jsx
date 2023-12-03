import React, { useEffect, useLayoutEffect, useRef } from 'react'
import logo from '../img/logo.png'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom';
import { useUser } from '../Context/User.context';
import { useForm } from 'react-hook-form';
import '../css/style.css'
import '../css/landing.css'
import '../fonts/cryptofont.css'
import '../fonts/feather.css'
import '../fonts/fontawesome.css'
import '../fonts//material.css'

function NewPassword() {
	const { NewPasswordd, changePasswordError, changePasswordSuccess, getUserCookies } = useUser()
	const { register, handleSubmit, formState: { errors }, getValues } = useForm();
	const navigate = useNavigate()

	const tokenRef = useRef(null)

	const onSubmit = handleSubmit(async data => {
		console.log("Hola bien o que")
		console.log(data)
		await NewPasswordd(tokenRef.current, data.Password, data.ConfirmPassword);
		console.log("data")
	});

	const handleNewPassword = () => {
		NewPasswordd(tokenRef.current)
	}

	useLayoutEffect(() => {

		return async () => {
			console.log("cookies2")
			const cookies = await getUserCookies()
			if (!cookies?.cookies?.passwordToken) {
				navigate('/');
			}
			tokenRef.current = cookies.cookies.passwordToken
		}
	}, [])

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
									<form onSubmit={onSubmit}>
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
												placeholder="Contraseña *"
												{...register('ConfirmPassword', {
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
										{changePasswordError && (
											<p className="text-red-500">{changePasswordError}</p>
										)}
										{changePasswordSuccess && (
											<p className="text-green-500">{changePasswordSuccess}</p>
										)}

										<button type="submit" className="btn btn-block btn-primary mt-3 mr-3">Confirmar</button>
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