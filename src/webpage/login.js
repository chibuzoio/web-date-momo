import React from 'react';
import axios from 'axios';
import '../css/login.css';
import LeftIconHollowButton from '../component/left_icon_hollow_button'
import LeftIconFormField from '../component/left_icon_form_field'
import BasicButton from '../component/basic_button'
import HollowButton from '../component/hollow_button'
import icon_person from '../image/icon_person.png'
import icon_gallery_blue from '../image/icon_gallery_blue.png'
import icon_password from '../image/icon_password.png'
import logo from '../image/datemomo.png';

class Login extends React.Component {
	state = {userNames : []};

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
	}

	componentDidMount() {
		axios.get("http://datemomo.com/service/usernamecomposite.php")
	    	.then(response => {
	    		this.setState({
	    			userNames : response.data
	    		});
	
				this.testMethod();
	        }, error => {
	        	console.log(error);
	        });
	}

	componentWillUnmount() {

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
		var firstFormPartsValue = {
			fieldIcon : icon_person,
			placeholder : "User Name",
			label : "User Name",
			type : "text"
		};

		var secondFormPartsValue = {
			fieldIcon : icon_password,
			placeholder : "Password",
			label : "Password",
			type : "password"
		};

		var basicButton = {
			buttonTitle : "Log In"
		}

		var hollowButton = {
			buttonTitle : "Sign Up"			
		}

		var leftIconHollowButton = {
			buttonTitle : "Photos",
			buttonIcon : icon_gallery_blue
		}

		return (
			<div className="login">
				<div className="loginWidget">
					<img className="logo" alt="Logo" src={logo}/>
					<div>
						<LeftIconFormField formParts={firstFormPartsValue} />
						<LeftIconFormField formParts={secondFormPartsValue} />
						<BasicButton buttonParts={basicButton} />
						<HollowButton buttonParts={hollowButton} />
					</div>
				</div>
			</div>
		);
	}
}

export default Login;  


