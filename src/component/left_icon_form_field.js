import React from 'react';
import '../css/input.css';
import '../css/style.css';
import BasicFormField from './basic_form_field';

function LeftIconFormField(props) {
	const updateValueFormData = (valueFormData, isBlurred) => {
		props.onFormValueChange(valueFormData, isBlurred);
	}

    return (
        <div>
            <label>{props.formParts.label}</label>
            <div className={props.formParts.fieldLayoutClass}>
                <img className={props.formParts.fieldIconClass} alt="" src={props.formParts.fieldIcon} />
                <BasicFormField onFormValueChange={updateValueFormData} formParts={props.formParts} />
            </div>
        </div>
    );
}

export default LeftIconFormField;


