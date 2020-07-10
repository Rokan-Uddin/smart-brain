import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm =({onInputChange, onButtonClick}) => {
	return (
			<div >
			<p className='f3 center'> {'This is a Smart Brain App..Lets Try this' } </p>
			<div className='center f3 pa3 ba bw2  br form' style = {{width:'500px' }} >
				<input type='text' onChange={onInputChange} />
				<button className='pointer bg-light-purple' onClick= {onButtonClick} >Detect</button>
			 </div>
			</div>
		);
}
export default ImageLinkForm;