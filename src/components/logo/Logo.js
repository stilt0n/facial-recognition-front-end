import React from 'react';
import Tilt from 'react-tilt';
import eye from '../../files/eye.png'
import './Logo.css'

const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max: 60 }} 
			style={{ height: 150, width: 150}} >
				<div className="Tilt-inner white"><img alt='logo' src={eye}/></div>
			</Tilt>
		</div>
	);
}

export default Logo;