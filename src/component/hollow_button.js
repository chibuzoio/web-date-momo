import React from 'react';
import '../css/input.css';
import '../css/style.css';

function HollowButton(props) {
	const clickHollowButton = (event) => {
		props.onButtonClicked(true);
	}

    return (
        <button onClick={clickHollowButton} 
            className={props.buttonParts.buttonClass} type="button"> 
            {props.buttonParts.buttonTitle}
        </button>
    );
}

export default HollowButton;


