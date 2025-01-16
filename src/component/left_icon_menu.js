import React from 'react';
import '../css/input.css';
import '../css/style.css';

function LeftIconMenu(props) {
	const clickIconMenu = (event) => {
		props.onMenuClicked(true);
	}
   
    return (
        <div className={props.iconMenuParts.iconMenuLayout} onClick={clickIconMenu} >
            <img className="iconMenuImage" alt="" src={props.iconMenuParts.iconMenuImage} />
            <div className="iconMenuTitle"> 
                {props.iconMenuParts.iconMenuTitle}
            </div>
        </div>
    );
}

export default LeftIconMenu;


