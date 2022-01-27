import React, { Component, useContext ,useState } from 'react';

import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';

import imagesArray from './../assets/badgeimages/imageDir';

import { useTheme } from '@react-navigation/native';

import {
    WelcomeContainer,
    Avatar,
    SettingsPageItemTouchableOpacity,
    SettingsItemImage,
    SettingsItemText,
    ConfirmLogoutView,
    ConfirmLogoutText,
    ConfirmLogoutButtons,
    ConfirmLogoutButtonText,
    PageTitle,
    BadgeGridLayout,
    BadgeGridViewBlockStyle,
    GridViewInsideTextItemStyle,
    BadgeGridViewImage
} from '../components/styling.js';



// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { StoredCredentialsContext } from '../components/StoredCredentialsContext';

const AccountBadges = ({navigation}) => {
    const {storedCredentials, setStoredCredentials} = useContext(StoredCredentialsContext);
    if (storedCredentials) {var {name, email, photoUrl, badges} = storedCredentials;}
    const AvatarImg = photoUrl ? {uri: photoUrl} : require('./../assets/img/Logo.png');
    const [logoutViewState, setLogoutViewState] = useState("false")
    const [badgeValue, setBadgeValue] = useState("")
    const [badgeDebounce, setBadgeDebounce] = useState("")
    const [rarity, setRarity] = useState("")
    const [badgeText, setBadgeText] = useState("")
    const [badgeDescription, setBadgeDescription] = useState("")
    const {colors, dark} = useTheme();

    const changeBadgeValue = (badgeName) => {
        if (badgeName == "onSignUpBadge") {
            if (badgeDebounce !== "onSignUpBadge") {
                console.log("User Has On Sign Up Badge")
                setBadgeText("Welcome To Hell")
                setBadgeDescription("Made an account")
                setRarity("Bronze")
                setBadgeValue(imagesArray.onSignupBadge)
                setBadgeDebounce("onSignUpBadge")
            }
        }
    }

    return(
            <>  
                <TouchableOpacity onPress={() => {navigation.goBack()}} style={{position: 'absolute', top: 10, left: 10, zIndex: 2}}>
                    <Image
                        source={require('../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                </TouchableOpacity>
                <WelcomeContainer style={{width: '100%'}}>                
                    <PageTitle badges={true}>{name} Badges</PageTitle>
                    <BadgeGridLayout>
                        <React.Fragment>
                            <ScrollView>  
                                <BadgeGridViewBlockStyle>
                                    {badges.map((badge) => (
                                            
                                            <React.Fragment>

                                                <GridViewInsideTextItemStyle key={rarity} onload={changeBadgeValue(badge)} rarityForTextColor={rarity}>{rarity}</GridViewInsideTextItemStyle>
                                                <BadgeGridViewImage key={imagesArray} source={badgeValue}/>
                                                <GridViewInsideTextItemStyle key={badge} badgeTitle={true}>{badgeText}</GridViewInsideTextItemStyle>
                                                <GridViewInsideTextItemStyle key={badgeDescription} bottomText={true}>{badgeDescription}</GridViewInsideTextItemStyle>
                                                
                                            </React.Fragment>
                                    
                                        
                                    ))}
                                </BadgeGridViewBlockStyle>
                            </ScrollView>
                        </React.Fragment>
                </BadgeGridLayout>
            </WelcomeContainer>
        </>
    );
}

export default AccountBadges