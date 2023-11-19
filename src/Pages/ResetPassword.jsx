import React, { useState } from 'react';
import logo from '../img/logo.png';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '../Context/User.context';
import '../css/style.css';
import '../css/landing.css';

function ResetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { forgotPassword } = useUser();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const res = await forgotPassword(data.Email);
      if (res.success) {
        setSuccessMessage(res.message);
        setErrorMessage('');
      } else {
        setErrorMessage(res.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.log('Error:', error);
      setErrorMessage('Hubo un problema al enviar el correo.');
      setSuccessMessage('');
    }
  };
  
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i data-feather="mail"><AiOutlineMail/></i></span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Correo electrónico *"
                        {...register('Email', {
                          pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                            message: "El correo electrónico no es válido"
                          }
                        })}
                      />
                      {errors.Email && (
                        <p className="text-red-500">{errors.Email.message}</p>
                      )}
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <button type="submit" className="btn btn-block btn-primary mt-3 mr-3 ">Enviar</button>
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
  );
}

export default ResetPassword;
