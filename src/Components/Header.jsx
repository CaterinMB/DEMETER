import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../css/style.css'
import '../css/landing.css'
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useUser } from '../Context/User.context';
const Header = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const {isAuthenticated, logout, user, getUsers } = useUser();
	
	const navigate = useNavigate(); 

	const toggleDropdown = () => {
		setShowDropdown(prevState => !prevState)

		setTimeout(() => setShowDropdown(false), 5000);
	};

	
	return (
		<header className="pc-header">
		<div className="mr-auto pc-mob-drp">
			<ul className="list-unstyled">
				<li className="dropdown pc-h-item">
					<h3><strong className='pc-tamaño'>DEMETER</strong></h3>
				</li>
			</ul>
		</div>
		<div className="ml-auto">
			<ul className="list-unstyled">
				<li className="dropdown pc-h-item">
					{isAuthenticated ? (
						<>
							<button
								className="pc-head-link dropdown-toggle arrow-none mr-0"
								role="button"
								aria-haspopup="false"
								aria-expanded="false"
								onClick={toggleDropdown}
							>
								<span>
									<span className="user-name">{user && user.Name_User}</span>
									<span className="user-desc">Administrador</span>
								</span>
							</button>
							{showDropdown && (
								<ul className="dropdown-menu dropdown-menu-right pc-h-dropdown flex-column">
									<li className="dropdown-item">
										<button onClick={() => navigate('/')}>
											<ChromeReaderModeIcon />
											<span>Editar perfil</span>
										</button>
									</li>
									<li className="dropdown-item">
										<button onClick={() => navigate('/')}>
											<LockIcon />
											<span>Cambio contraseña</span>
										</button>
									</li>
									<li className="dropdown-item">
										<button onClick={() => logout()}>
											<ExitToAppIcon />
											<span>Logout</span>
										</button>
									</li>
								</ul>
							)}
						</>
					) : null}
				</li>
			</ul>
		</div>
	</header>
	);
};

export default Header;