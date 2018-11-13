import React from 'react';
import './ImageInputForm.css';

const ImageInputForm = ({ onInputChange, onSubmit }) => {
	return (
		<div>
			<p className="f3">
			{'This app will detect faces in your pictures.  Try it out'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5 glass'>
					<input className='f4 pa2 w-70 center' type='text' 
					placeholder='put image url here' onChange={onInputChange}/>
					<button className='w-30 grow f4 link ph3 pv2 dib black metal'
					onClick={onSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageInputForm;