import React, { useEffect, useState, useRef } from 'react';
import '../css/style.css';
import '../css/floating_account.css';
import placeholder from '../image/placeholder.jpg';
import icon_message_blue from '../image/icon_message_blue.png';
import RoundPicture from '../component/round_picture';
import SexualityOptions from './sexuality_options';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import RightIconFormField from '../component/right_icon_form_field';
import icon_view_blue from '../image/icon_view_blue.png';
import test_image from '../image/test_image.png';
import logo from '../image/datemomo.png';

function FloatingAccount() {
    var viewProfileButton = {
        buttonTitle : "View Profile",
        buttonIcon : icon_view_blue,
        leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin " + 
            "greyHollowButton floatingAccountButton",
        leftHollowButtonContentClass : "leftHollowButtonContent",
        hollowButtonLeftIconClass : "hollowButtonLeftIcon",
        leftHollowButtonTitleClass : "leftHollowButtonTitle"
    }

    var messageButton = {
        buttonTitle : "Message",
        buttonIcon : icon_message_blue,
        leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin " + 
            "floatContentRight greyHollowButton floatingAccountButton",
        leftHollowButtonContentClass : "leftHollowButtonContent",
        hollowButtonLeftIconClass : "hollowButtonLeftIcon",
        leftHollowButtonTitleClass : "leftHollowButtonTitle"
    }

    var sexualCategoryButtons = [
        {buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"}
    ];

    var sexualInterestButtons = [
        {buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Friendship", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Relationship", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"}
    ];

    var sexualExperienceButtons = [
        {buttonTitle : "69", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Anal Sex", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Given Head", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Missionary", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "One-night Stand", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Orgy Sex", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Pool Sex", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Received Head", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Sexed In Car", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Sexed In Public", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Sexed With Camera", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Threesome", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Used Sex Toys", buttonClass : "basicButton sexualityButton"},
        {buttonTitle : "Video Sex Chat", buttonClass : "basicButton sexualityButton"}
    ];

    const gradientCover = useRef();
    const userAccountImage = useRef();

    const [gradientHeight, setGradientHeight] = useState(0);

    useEffect(() => {
        window.addEventListener('resize', setGradientHeight(userAccountImage.current.clientHeight));
    }, [gradientHeight]);

	const updateGradientHeight = (event) => {
		setGradientHeight(event.target.clientHeight);
	}
    
    return (
        <div className="floatingUserAccountLayout hideComponent">
            <div className="floatingUserAccountWidget">
                <img className="floatingUserAccountImage" 
                    ref={userAccountImage} onLoad={updateGradientHeight} 
                    alt="" src={test_image} />
                <div className="gradientCover" ref={gradientCover} 
                    style={{height : gradientHeight}}>
                    <div className="gradientLayout">
                        <div className="gradientUserName">Solution, 37</div>
                        <div className="gradientLocation">Minarelikoy</div>
                    </div>
                </div>
                <div className="userStatusText">Hello dear! Welcome to my profile!</div>
                <div className="floatingLayoutButtons">
                    <LeftIconHollowButton buttonParts={viewProfileButton} />
                    <LeftIconHollowButton buttonParts={messageButton} />
                </div>
                <div className="floatingSexualityLayout">
                    <div className="sexualityHeader">Kelechi sexuality</div>
                    <SexualityOptions sexualityButtons={sexualCategoryButtons} />
                    <div className="sexualityHeader">Kelechi is looking for</div>
                    <SexualityOptions sexualityButtons={sexualInterestButtons} />
                    <div className="sexualityHeader">Kelechi sexual fantasies</div>
                    <SexualityOptions sexualityButtons={sexualExperienceButtons} />
                </div>
            </div>
        </div>
    );
}

export default FloatingAccount;


