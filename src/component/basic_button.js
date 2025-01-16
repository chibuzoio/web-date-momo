import React from 'react';
import '../css/input.css';
import '../css/style.css';

function BasicButton(props) {
	const clickBasicButton = (event) => {
		props.onButtonClicked(true);
    }
    
    return (
        <button className={props.buttonParts.buttonClass} 
            onClick={clickBasicButton} type="button"> 
            {props.buttonParts.buttonTitle}
        </button>
    );
}

export default BasicButton;


