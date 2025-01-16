import React from 'react';
import '../css/input.css';
import '../css/style.css';

function ProgressAnimation(props) {
    return (
        <div className={props.animationData.animationLayout}>
            <img className={props.animationData.animationImageClass} 
                src={props.animationData.animationMotionIcon} alt="" />
        </div>
    );    
}

export default ProgressAnimation;


