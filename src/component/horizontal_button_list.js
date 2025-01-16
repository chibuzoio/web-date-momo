import React from 'react';
import '../css/input.css'; 
import BasicButton from './basic_button';

function HorizontalButtonList(props) {
    return (
        <div className="horizontalButtonList">
            { 
                props.sexualityButtons.map((sexualityButton) => ( 
                    <BasicButton buttonParts={sexualityButton} />
                ))
            }
        </div>
    );    
}

export default HorizontalButtonList;


