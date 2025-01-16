import React from 'react';
import '../css/input.css';

function BasicFormField(props) {
	const checkFieldValue = (event) => {
		props.onFormValueChange(event.currentTarget.value, true);
	}

	const getInputValue = (event) => {
		props.onFormValueChange(event.currentTarget.value, false);
	}
    
    return (
        <input className={props.formParts.inputFieldClass} onBlur={checkFieldValue} 
            onChange={getInputValue} type={props.formParts.type} 
            placeholder={props.formParts.placeholder} />
    );
}

export default BasicFormField;


