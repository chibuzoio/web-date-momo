import React from 'react';
import axios from 'axios';
import '../css/login.css';
import '../css/sexuality.css';
import BasicButton from '../component/basic_button';
import loading_puzzle from '../image/loading_puzzle.gif';
import SexualityOptions from '../widget/sexuality_options';
import ProgressAnimation from '../component/progress_animation';

class Sexuality extends React.Component {
	visibleSexualBasicButton = "basicButton sexualityButton";  
	visibleSexualHollowButton = "hollowButton sexualityButton";  
	visibleButtonClass = "basicButton customTopMargin fullWidth";
	visibleAnimationClass = "progressLoadingLayout customTopMargin";
	hiddenButtonClass = this.visibleButtonClass + " hideComponent";
	hiddenAnimationClass = this.visibleAnimationClass + " hideComponent";
	hiddenSexualBasicButton = this.visibleSexualBasicButton + " hideComponent";
	hiddenSexualHollowButton = this.visibleSexualHollowButton + " hideComponent";
	sexualCategoryButtons = [
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Bisexual",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Bisexual",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Gay",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Gay",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Lesbian",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Lesbian",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Straight",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Straight",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sugar Daddy",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sugar Daddy",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sugar Mommy",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sugar Mommy",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Toy Boy",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Toy Boy",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Toy Girl",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Toy Girl",
				buttonClass : this.visibleSexualHollowButton
			}
		}
	];

	sexualInterestButtons = [
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Bisexual",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Bisexual",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Friendship",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Friendship",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Gay",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Gay",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Lesbian",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Lesbian",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Relationship",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Relationship",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Straight",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Straight",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sugar Daddy",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sugar Daddy",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sugar Mommy",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sugar Mommy",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Toy Boy",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Toy Boy",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Toy Girl",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Toy Girl",
				buttonClass : this.visibleSexualHollowButton
			}
		}
	];

	sexualExperienceButtons = [
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "69",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "69",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Anal Sex",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Anal Sex",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Given Head",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Given Head",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Missionary",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Missionary",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "One-night Stand",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "One-night Stand",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Orgy Sex",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Orgy Sex",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Pool Sex",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Pool Sex",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Received Head",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Received Head",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sexed In Car",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sexed In Car",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sexed In Public",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sexed In Public",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sexed With Camera",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sexed With Camera",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Threesome",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Threesome",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Used Sex Toys",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Used Sex Toys",
				buttonClass : this.visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Video Sex Chat",
				buttonClass : this.hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Video Sex Chat",
				buttonClass : this.visibleSexualHollowButton
			}
		}
	]; 
	state = {contextData : {
		sexualCategoryButtons : this.sexualCategoryButtons,
		sexualInterestButtons : this.sexualInterestButtons,
		sexualExperienceButtons : this.sexualExperienceButtons,
		sexualityButtonParts : {
			buttonTitle : "Submit",
			buttonClass : this.visibleButtonClass
		},
		puzzleProgressAnimation : {
			animationLayout : this.hiddenAnimationClass,
			animationImageClass : "progressLoadingIcon",
			animationMotionIcon : loading_puzzle
		}
	}};
	currentUser = {};
	sexualityRequestData = {
	    memberId : 0,
	    userLevel : "displayMatchedUsers",
	    // userLevel : "selectSexualityInterest",
	    bisexualCategory : 0,
	    gayCategory : 0,
	    lesbianCategory : 0,
	    straightCategory : 0,
	    sugarDaddyCategory : 0,
	    sugarMommyCategory : 0,
	    toyBoyCategory : 0,
	    toyGirlCategory : 0,
	    bisexualInterest : 0,
	    gayInterest : 0,
	    lesbianInterest : 0,
	    straightInterest : 0,
	    friendshipInterest : 0,
	    sugarDaddyInterest : 0,
	    sugarMommyInterest : 0,
	    relationshipInterest : 0,
	    toyBoyInterest : 0,
	    toyGirlInterest : 0,
	    sixtyNineExperience : 0,
	    analSexExperience : 0,
	    givenHeadExperience : 0,
	    missionaryExperience : 0,
	    oneNightStandExperience : 0,
	    orgySexExperience : 0,
	    poolSexExperience : 0,
	    receivedHeadExperience : 0,
	    carSexExperience : 0,
	    publicSexExperience : 0,
	    cameraSexExperience : 0,
	    threesomeExperience : 0,
	    sexToyExperience : 0,
	    videoSexExperience : 0
	};

	constructor(props) {
		super(props);
		// localStorage.setItem("currentUser", "{}");
		this.submitSexualitySelections = this.submitSexualitySelections.bind(this);
		this.updateSexualityCollection = this.updateSexualityCollection.bind(this);
	}

	componentDidMount() {
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.sexualityRequestData.memberId = this.currentUser.memberId; 
	}

	componentWillUnmount() {

	}

	updateSexualityCollection(sexualityButtonData) {
		if (sexualityButtonData[0].sexualityType === "Category") {
			this.sexualCategoryButtons = sexualityButtonData;
			this.sexualInterestButtons = this.state.contextData.sexualInterestButtons;
			this.sexualExperienceButtons = this.state.contextData.sexualExperienceButtons;
		} else if (sexualityButtonData[0].sexualityType === "Interest") {
			this.sexualCategoryButtons = this.state.contextData.sexualCategoryButtons;
			this.sexualInterestButtons = sexualityButtonData;
			this.sexualExperienceButtons = this.state.contextData.sexualExperienceButtons;
		} else if (sexualityButtonData[0].sexualityType === "Experience") {
			this.sexualCategoryButtons = this.state.contextData.sexualCategoryButtons;
			this.sexualInterestButtons = this.state.contextData.sexualInterestButtons;
			this.sexualExperienceButtons = sexualityButtonData;
		}

		this.setState(function(state) {
			return {contextData : {
				sexualCategoryButtons : this.sexualCategoryButtons,
				sexualInterestButtons : this.sexualInterestButtons,
				sexualExperienceButtons : this.sexualExperienceButtons,
				sexualityButtonParts : {
					buttonTitle : state.contextData.sexualityButtonParts.buttonTitle,
					buttonClass : this.visibleButtonClass
				},
				puzzleProgressAnimation : state.contextData.puzzleProgressAnimation
			}
		}});       
	}

	submitSexualitySelections(buttonClicked) {
		if (buttonClicked) {
			this.setState(function(state) {
				return {contextData : {
					sexualCategoryButtons : this.state.contextData.sexualCategoryButtons,
					sexualInterestButtons : this.state.contextData.sexualInterestButtons,
					sexualExperienceButtons : this.state.contextData.sexualExperienceButtons,
					sexualityButtonParts : {
						buttonTitle : state.contextData.sexualityButtonParts.buttonTitle,
						buttonClass : this.hiddenButtonClass
					},
					puzzleProgressAnimation : {
						animationLayout : this.visibleAnimationClass,
						animationImageClass : state.contextData.puzzleProgressAnimation.animationImageClass,
						animationMotionIcon : state.contextData.puzzleProgressAnimation.animationMotionIcon
					}
				}
			}});       

		    this.sexualityRequestData.bisexualCategory = this.state.contextData.sexualCategoryButtons[0].sexualitySelected;
		    this.sexualityRequestData.gayCategory = this.state.contextData.sexualCategoryButtons[1].sexualitySelected;
		    this.sexualityRequestData.lesbianCategory = this.state.contextData.sexualCategoryButtons[2].sexualitySelected;
		    this.sexualityRequestData.straightCategory = this.state.contextData.sexualCategoryButtons[3].sexualitySelected;
		    this.sexualityRequestData.sugarDaddyCategory = this.state.contextData.sexualCategoryButtons[4].sexualitySelected;
		    this.sexualityRequestData.sugarMommyCategory = this.state.contextData.sexualCategoryButtons[5].sexualitySelected;
		    this.sexualityRequestData.toyBoyCategory = this.state.contextData.sexualCategoryButtons[6].sexualitySelected;
		    this.sexualityRequestData.toyGirlCategory = this.state.contextData.sexualCategoryButtons[7].sexualitySelected;
		    this.sexualityRequestData.bisexualInterest = this.state.contextData.sexualInterestButtons[0].sexualitySelected;
		    this.sexualityRequestData.gayInterest = this.state.contextData.sexualInterestButtons[1].sexualitySelected;
		    this.sexualityRequestData.lesbianInterest = this.state.contextData.sexualInterestButtons[2].sexualitySelected;
		    this.sexualityRequestData.straightInterest = this.state.contextData.sexualInterestButtons[3].sexualitySelected;
		    this.sexualityRequestData.friendshipInterest = this.state.contextData.sexualInterestButtons[4].sexualitySelected;
		    this.sexualityRequestData.sugarDaddyInterest = this.state.contextData.sexualInterestButtons[5].sexualitySelected;
		    this.sexualityRequestData.sugarMommyInterest = this.state.contextData.sexualInterestButtons[6].sexualitySelected;
		    this.sexualityRequestData.relationshipInterest = this.state.contextData.sexualInterestButtons[7].sexualitySelected;
		    this.sexualityRequestData.toyBoyInterest = this.state.contextData.sexualInterestButtons[8].sexualitySelected;
		    this.sexualityRequestData.toyGirlInterest = this.state.contextData.sexualInterestButtons[9].sexualitySelected;
		    this.sexualityRequestData.sixtyNineExperience = this.state.contextData.sexualExperienceButtons[0].sexualitySelected;
		    this.sexualityRequestData.analSexExperience = this.state.contextData.sexualExperienceButtons[1].sexualitySelected;
		    this.sexualityRequestData.givenHeadExperience = this.state.contextData.sexualExperienceButtons[2].sexualitySelected;
		    this.sexualityRequestData.missionaryExperience = this.state.contextData.sexualExperienceButtons[3].sexualitySelected;
		    this.sexualityRequestData.oneNightStandExperience = this.state.contextData.sexualExperienceButtons[4].sexualitySelected;
		    this.sexualityRequestData.orgySexExperience = this.state.contextData.sexualExperienceButtons[5].sexualitySelected;
		    this.sexualityRequestData.poolSexExperience = this.state.contextData.sexualExperienceButtons[6].sexualitySelected;
		    this.sexualityRequestData.receivedHeadExperience = this.state.contextData.sexualExperienceButtons[7].sexualitySelected;
		    this.sexualityRequestData.carSexExperience = this.state.contextData.sexualExperienceButtons[8].sexualitySelected;
		    this.sexualityRequestData.publicSexExperience = this.state.contextData.sexualExperienceButtons[9].sexualitySelected;
		    this.sexualityRequestData.cameraSexExperience = this.state.contextData.sexualExperienceButtons[10].sexualitySelected;
		    this.sexualityRequestData.threesomeExperience = this.state.contextData.sexualExperienceButtons[11].sexualitySelected;
		    this.sexualityRequestData.sexToyExperience = this.state.contextData.sexualExperienceButtons[12].sexualitySelected;
		    this.sexualityRequestData.videoSexExperience = this.state.contextData.sexualExperienceButtons[13].sexualitySelected;

			axios.post("https://datemomo.com/service/userbiometrics.php", this.sexualityRequestData)
		    	.then(response => { 
					this.setState(function(state) {
						return {contextData : {
							sexualCategoryButtons : this.state.contextData.sexualCategoryButtons,
							sexualInterestButtons : this.state.contextData.sexualInterestButtons,
							sexualExperienceButtons : this.state.contextData.sexualExperienceButtons,
							sexualityButtonParts : {
								buttonTitle : state.contextData.sexualityButtonParts.buttonTitle,
								buttonClass : this.visibleButtonClass
							},
							puzzleProgressAnimation : {
								animationLayout : this.hiddenAnimationClass,
								animationImageClass : state.contextData.puzzleProgressAnimation.animationImageClass,
								animationMotionIcon : state.contextData.puzzleProgressAnimation.animationMotionIcon
							}
						}
					}});       

					this.currentUser.userLevel = response.data.userLevel;
					localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
					window.location.replace("/");
		        }, error => {     
					this.setState(function(state) {
						return {contextData : {
							sexualCategoryButtons : this.state.contextData.sexualCategoryButtons,
							sexualInterestButtons : this.state.contextData.sexualInterestButtons,
							sexualExperienceButtons : this.state.contextData.sexualExperienceButtons,
							sexualityButtonParts : {
								buttonTitle : state.contextData.sexualityButtonParts.buttonTitle,
								buttonClass : this.visibleButtonClass
							},
							puzzleProgressAnimation : {
								animationLayout : this.hiddenAnimationClass,
								animationImageClass : state.contextData.puzzleProgressAnimation.animationImageClass,
								animationMotionIcon : state.contextData.puzzleProgressAnimation.animationMotionIcon
							}
						}
					}});       

		        	console.log(error);
		        });
		}
	}

	render() {    
		return (
			<div className="login">
				<div className="loginWidget">
					<div className="sexualCategoryHeader">Your Sexual Category</div>
					<SexualityOptions onSexualityChange={this.updateSexualityCollection} sexualityButtons={this.sexualCategoryButtons} />
					<div className="sexualCategoryHeader">You are interested in</div>
					<SexualityOptions onSexualityChange={this.updateSexualityCollection} sexualityButtons={this.sexualInterestButtons} />
					<div className="sexualCategoryHeader">Things you have tried or can do in sex</div>
					<SexualityOptions onSexualityChange={this.updateSexualityCollection} sexualityButtons={this.sexualExperienceButtons} />
					<BasicButton onButtonClicked={this.submitSexualitySelections} buttonParts={this.state.contextData.sexualityButtonParts} />
					<ProgressAnimation animationData={this.state.contextData.puzzleProgressAnimation} />
				</div>
			</div>
		);
	}
}

export default Sexuality;


