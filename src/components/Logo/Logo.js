import React from 'react';
import logo from './logo.png';
import Tilt from 'react-tilt';
import './logo.css';


const Logo =() => {
	return (

			<div> 
			<Tilt className="Tilt br3 shadow-3 ml5" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
				 <div className="Tilt-inner pt4 pl4"> <img src={logo} alt='logo' /> </div>
			</Tilt>
			 </div>
		);
}
export default Logo;