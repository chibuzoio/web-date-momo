import React from 'react';
import '../css/input.css'; 

function BottomMenuIcon(props) {
	const clickButtonMenuIcon = (event) => {
		props.onButtonClicked(true);
	}
    
    return (
        <button onClick={clickButtonMenuIcon} className={props.menuParts.bottomMenuClass} type="button"> 
            <img className={props.menuParts.bottomMenuIcon} alt="" src={props.menuParts.menuIcon} />
        </button>
    );
}

export default BottomMenuIcon;


