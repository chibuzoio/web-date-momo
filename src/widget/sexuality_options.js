import React from 'react';
import '../css/input.css';
import '../css/sexuality.css';
import BasicHollowButton from '../component/basic_hollow_button';

function SexualityOptions(props) {
    var sexualitySelected = false;
	var visibleSexualBasicButton = "basicButton sexualityButton";  
	var visibleSexualHollowButton = "hollowButton sexualityButton";  
	var hiddenSexualBasicButton = visibleSexualBasicButton + " hideComponent";
	var hiddenSexualHollowButton = visibleSexualHollowButton + " hideComponent";
     
	const getSexualityProperty = (event) => {
		var currentSelectedOption = event.currentTarget.getAttribute("data-current-sexuality");

        if (sexualitySelected) {
            var localSexualityButtons = props.sexualityButtons;
            localSexualityButtons[currentSelectedOption].basicButton.buttonClass = visibleSexualBasicButton;
            localSexualityButtons[currentSelectedOption].hollowButton.buttonClass = hiddenSexualHollowButton;
            localSexualityButtons[currentSelectedOption].sexualitySelected = 1;
            
            props.onSexualityChange(localSexualityButtons);
        } else {
            var localSexualityButtons = props.sexualityButtons;
            localSexualityButtons[currentSelectedOption].basicButton.buttonClass = hiddenSexualBasicButton;
            localSexualityButtons[currentSelectedOption].hollowButton.buttonClass = visibleSexualHollowButton;
            localSexualityButtons[currentSelectedOption].sexualitySelected = 0;

            props.onSexualityChange(localSexualityButtons);
        }
	}

	const selectSexualityOption = (buttonSelected) => {		
		sexualitySelected = buttonSelected;
	}

    return (
        <div className="sexualityButtonLayout">
            { 
                props.sexualityButtons.map((sexualityButton, index) => ( 
                    <div className="basicHollowButton" onClick={getSexualityProperty} data-current-sexuality={index}>
                        <BasicHollowButton onButtonSelected={selectSexualityOption} buttonParts={sexualityButton} />
                    </div>
                ))
            }
        </div>
    );
}

export default SexualityOptions;


