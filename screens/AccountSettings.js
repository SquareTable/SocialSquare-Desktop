import React, {useContext, useState} from 'react';
import {useTheme} from "@react-navigation/native";

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
    TextLinkContent,
    TextLink,
    SettingsHorizontalView
} from '../components/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { StoredCredentialsContext } from '../components/StoredCredentialsContext';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';
import { TouchableOpacity, Image } from 'react-native';


const AccountSettings = ({navigation}) => {
    const {colors, dark} = useTheme();
     //context
    const {storedCredentials, setStoredCredentials} = useContext(StoredCredentialsContext);
    const {name, displayName, email, photoUrl} = storedCredentials;
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext)
    

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
            <WelcomeContainer style={{backgroundColor: colors.primary}}>                
                <Avatar resizeMode="cover" source={{uri: profilePictureUri}} />
                <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("ChangeDisplayNamePage")}>
                    <SettingsItemText style={{color: colors.tertiary}} titleIfSubTitle={true}>Change Display Name</SettingsItemText>
                    <SettingsItemText style={{color: colors.tertiary}} subTitle={true}>Current: {displayName|| "Couldn't Get Or None"}</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("ChangeUsernamePage")}>
                    <SettingsItemText style={{color: colors.tertiary}} titleIfSubTitle={true}>Change User Name</SettingsItemText>
                    <SettingsItemText style={{color: colors.tertiary}} subTitle={true}>Current: {name || "Couldn't get name"}</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("ChangeEmailPage")}>
                    <SettingsItemText style={{color: colors.tertiary}} titleIfSubTitle={true}>Change Email</SettingsItemText>
                    <SettingsItemText style={{color: colors.tertiary}} subTitle={true}>Current: {email || "Couldn't get email"}</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => {alert("Coming soon")}}>
                    <SettingsItemText style={{color: colors.tertiary}} titleIfSubTitle={true}>Change Password</SettingsItemText>
                    <SettingsItemText style={{color: colors.tertiary}} subTitle={true}>Coming soon</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
            </WelcomeContainer>
        </>
    );
}

export default AccountSettings;
