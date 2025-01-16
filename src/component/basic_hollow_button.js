import React from 'react';
import '../css/input.css';
import '../css/style.css';
import BasicButton from './basic_button';
import HollowButton from './hollow_button';

function BasicHollowButton(props) { 
	const selectButtonContent = (buttonClicked) => {
		if (buttonClicked) {
			props.onButtonSelected(true);
		}
	}

	const removeButtonContent = (buttonClicked) => {
		if (buttonClicked) {
			props.onButtonSelected(false);
		}
	}

    return (
        <div className="basicHollowButton">
            <HollowButton onButtonClicked={selectButtonContent} buttonParts={props.buttonParts.hollowButton} />
            <BasicButton onButtonClicked={removeButtonContent} buttonParts={props.buttonParts.basicButton} />
        </div>
    );
}

export default BasicHollowButton;


