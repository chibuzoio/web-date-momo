import React from 'react';
import '../css/input.css';

function RightIconFormField(props) {
    return (
        <div className={props.formParts.fieldLayoutClass}>
            <input className={props.formParts.formFieldClass} type={props.formParts.type} 
                name="name" placeholder={props.formParts.placeholder} />
            <img className={props.formParts.fieldIconClass} alt="" src={props.formParts.fieldIcon} />
        </div>
    );    
}

export default RightIconFormField;


