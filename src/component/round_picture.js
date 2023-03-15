import React, { useState, useEffect, useRef } from 'react';
import '../css/style.css';  

function RoundPicture(props) {
	return (
		<img className={props.pictureParts.roundPictureClass} 
			alt="" src={props.pictureParts.roundPicture} />
	);
}

export default RoundPicture;   


