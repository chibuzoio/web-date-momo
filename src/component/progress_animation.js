import React from 'react';
import '../css/input.css';
import '../css/style.css';

class ProgressAnimation extends React.Component {
	state = {contextData : {
		animationData : {}
	}};
 
	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
	}
            
	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {contextData : {
				animationData : props.animationData
			}
		}});
	}

	render() {  
		return (
			<div className={this.props.animationData.animationLayout}>
				<img className={this.props.animationData.animationImageClass} 
					src={this.props.animationData.animationMotionIcon} alt="" />
			</div>
		);
	}
}

export default ProgressAnimation;   


