import React from 'react';
import '../css/input.css';
import '../css/style.css';

function InputErrorMessage(params) {
    return (
        <div className={props.errorMessageData.messageLayout}>
            {props.errorMessageData.errorMessage}
        </div>
    );    
}

export default InputErrorMessage;


