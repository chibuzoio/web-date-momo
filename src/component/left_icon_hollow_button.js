import React from 'react';
import '../css/input.css';
import '../css/style.css';

function LeftIconHollowButton(props) {
	const clickHollowButton = (event) => {
		props.onButtonClicked(true);
	}
 
    return (
        <button onClick={clickHollowButton} className={props.buttonParts.leftIconHollowButtonLayout}>
            <img className={props.buttonParts.leftIconHollowButtonIcon} src={props.buttonParts.buttonIcon}/>
            <div className={props.buttonParts.leftIconHollowButtonTitle}>{props.buttonParts.buttonTitle}</div>
        </button>
    );
}

export default LeftIconHollowButton;


