import React, { useState, useEffect, useRef } from 'react';
import '../css/style.css';  
import grey_placeholder from '../image/grey_placeholder.png'; 

function RoundPicture(props) {	
 	const handleOnError = (event) => {
	    event.currentTarget.src = grey_placeholder;
	    event.currentTarget.onerror = null;
	};

	return (
		<img className={props.pictureParts.roundPictureClass} 
			alt="" src={props.pictureParts.roundPicture} 
			onError={handleOnError} />
	);
}

export default RoundPicture;   


