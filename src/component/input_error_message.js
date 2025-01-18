import React from 'react';
import '../css/input.css';
import '../css/style.css';

function InputErrorMessage(props) {
    return (
        <div className={props.errorMessageData.messageLayout}>
            {props.errorMessageData.errorMessage}
        </div>
    );    
}

export default InputErrorMessage;


