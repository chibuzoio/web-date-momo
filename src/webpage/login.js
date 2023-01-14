import React from 'react';
import axios from 'axios';
import '../css/login.css';
import { Link } from "react-router-dom";
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import LeftIconFormField from '../component/left_icon_form_field';
import BasicButton from '../component/basic_button';
import HollowButton from '../component/hollow_button';
import icon_person from '../image/icon_person.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import icon_password from '../image/icon_password.png';
import Register from '../webpage/register';
import logo from '../image/datemomo.png';

class Login extends React.Component {
	state = {loginData : {
			userNames : [],
			firstFormPartsValue : {}			
		}
	};

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

		// The binding below is necessary so as to attach 
		// testMethod to the context of this class and for 
		// the method not to appear undefined when called
		this.testMethod = this.testMethod.bind(this); 
		this.getValue = this.getValue.bind(this);
	}

	componentDidMount() {
		axios.get("http://datemomo.com/service/usernamecomposite.php")
	    	.then(response => {
	    		this.setState({loginData : {
		    			userNames : response.data,
		    			firstFormPartsValue : this.state.loginData.firstFormPartsValue
		    		}
	    		});
	
				this.testMethod();
	        }, error => {
	        	console.log(error);
	        });
	}

	componentWillUnmount() {

	}

	getValue() {
		console.log("The value of this.state.loginData.firstFormPartsValue.value = " 
			+ this.state.loginData.firstFormPartsValue.value);
	}

	testMethod() {
		// This kind of expression below is used when the 
		// state needs to be updated using values from state 
		// (old data) and values from props (new data)
 		this.setState((state, props) => {
			// counter: state.counter + props.increment
			// console.log("The value of state here is " + JSON.stringify(state));
		});
	}

	render() {
		this.state.loginData.firstFormPartsValue = {
			fieldIcon : icon_person,
			placeholder : "User Name",
			label : "User Name",
			value : "",
			type : "text",
			fieldLayoutClass : "fieldLayout iconMargin",
			fieldIconClass : "leftFieldIcon"
		};

		var secondFormPartsValue = {
			fieldIcon : icon_password,
			placeholder : "Password",
			label : "Password",
			type : "password",
			value : "",
			fieldLayoutClass : "fieldLayout",
			fieldIconClass : "leftFieldIcon"
		};

		var basicButton = {
			buttonTitle : "Log In",
			buttonClass : "basicButton fullWidth"
		}

		var hollowButton = {
			buttonTitle : "Sign Up",
			buttonClass : "hollowButton buttonTopMargin fullWidth"
		}

		var leftIconHollowButton = {
			buttonTitle : "Photos",
			buttonIcon : icon_gallery_blue,
			leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin",
			leftHollowButtonContentClass : "leftHollowButtonContent",
			hollowButtonLeftIconClass : "hollowButtonLeftIcon",
			leftHollowButtonTitleClass : "leftHollowButtonTitle"
		}
             
		return (
			<div className="login"> 
				<div className="loginWidget">
					<img className="logo" alt="Logo" src={logo}/>
					<div>
						<LeftIconFormField onChange={this.getValue} formParts={this.state.loginData.firstFormPartsValue} />
						<LeftIconFormField formParts={secondFormPartsValue} />
						<BasicButton onClick={this.getValue} buttonParts={basicButton} /> {/* If you click on this button, 
						fetch data, store it in localStorage and reload */}
						<Link to="register">
							<HollowButton buttonParts={hollowButton} />
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;  


