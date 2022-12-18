import React from 'react';
import '../css/input.css';

class LeftIconFormField extends React.Component {
	state = {formParts : {}};

/*		
	You declare constructor explicitly because 
	you want to initialize state. You initialized 
	state because you want to set state somewhere
	in the class. If not, use data from props directly, 
	without initializing state with it and do not declare 
	the constructor because it's already declared implicitly.
*/		
	constructor(props) {
		super(props);
		this.state.formParts = props.formParts; 
	}

	render() {
		return (
			<div>
				<label>
				    Name:
				    <img className="leftFormIcon" alt="" src={this.state.formParts.fieldIcon} />
				    <input type="text" name="name" />
				</label>
				<input type="submit" value={this.state.formParts.buttonTitle} />
			</div>
		);
	}
}

export default LeftIconFormField;   


