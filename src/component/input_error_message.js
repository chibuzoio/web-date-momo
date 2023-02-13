import React from 'react';
import '../css/input.css';
import '../css/style.css';

class InputErrorMessage extends React.Component {
	state = {contextData : {
		errorMessageData : {}
	}};
 
	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
	}
            
	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {contextData : {
				errorMessageData : props.errorMessageData
			}
		}});
	}

	render() {  
		return (
			<div className={this.props.errorMessageData.messageLayout}>
				{this.props.errorMessageData.errorMessage}
			</div>
		);
	}
}

export default InputErrorMessage;   


