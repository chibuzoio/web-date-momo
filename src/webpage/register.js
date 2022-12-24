import React from 'react';
import axios from 'axios';
import '../css/login.css';
import LeftIconFormField from '../component/left_icon_form_field'
import BasicButton from '../component/basic_button'
import icon_person from '../image/icon_person.png'
import icon_password from '../image/icon_password.png'
import logo from '../image/datemomo.png';

class Register extends React.Component {
	state = {userNames : []};

	constructor(props) {
		super(props);
		this.state.userNames = props.userNames;
	}

	componentDidMount() {
	
	}

	componentWillUnmount() {

	}
  
	render() {
		var firstFormPartsValue = {
			fieldIcon : icon_person,
			placeholder : "User Name",
			label : "User Name",
			type : "text",
			fieldLayoutClass : "fieldLayout",
			fieldIconClass : "leftFieldIcon"
		};

		var secondFormPartsValue = {
			fieldIcon : icon_password,
			placeholder : "Password",
			label : "Password",
			type : "password",
			fieldLayoutClass : "fieldLayout",
			fieldIconClass : "leftFieldIcon"
		};

		var basicButton = {
			buttonTitle : "Sign Up",
			buttonClass : "basicButton fullWidth"
		}
 
		return (
			<div className="login">
				<div className="loginWidget">
					<div className="registerPageHeader">
						<div className="registerPageTitle">Create Your <br></br>Account</div>
						<img className="registerPageIcon" alt="Logo" src={logo}/>
					</div>
					<LeftIconFormField formParts={firstFormPartsValue} />
					<LeftIconFormField formParts={secondFormPartsValue} />
					<BasicButton buttonParts={basicButton} />
				</div>
			</div>
		);
	}
}

export default Register;  


