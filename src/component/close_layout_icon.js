import React from 'react';
import '../css/input.css';
import '../css/style.css';

function CloseLayoutIcon(props) {
	const changeIconDisplay = () => {
		props.onChangeIconDisplay(true);
	}

    return (
        <div className={props.menuIconParts.menuLayoutClass} onClick={changeIconDisplay}> 
            <img className={props.menuIconParts.menuIconClass} 
                src={props.menuIconParts.menuIcon} alt="" />
        </div>
    );
}

export default CloseLayoutIcon;


