import React from 'react';
import '../css/input.css';
import '../css/sexuality.css';
import BasicButton from '../component/basic_button';

function SexualityBiometrics(props) {    
	const clickedBasicButton = (buttonClicked) => {		
		if (buttonClicked) {}
	}

    return (
        <div className="sexualityButtonLayout">
            { 
                props.sexualityButtons.map((sexualityButton) => ( 
                    <BasicButton onButtonClicked={clickedBasicButton} buttonParts={sexualityButton} />
                ))
            }
        </div>
    );
}

export default SexualityBiometrics;


