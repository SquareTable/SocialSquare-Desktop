import React, {useContext, useState} from 'react';

import {
    Avatar,
    SettingsPageItemTouchableOpacity,
    SettingsItemImage,
    SettingsItemText,
    BackgroundDarkColor,
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    ConfirmLogoutView,
    ConfirmLogoutText,
    ConfirmLogoutButtons,
    ConfirmLogoutButtonText,
} from '../components/styling.js';
import {useTheme} from "@react-navigation/native";

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';

//credentials context
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';
import { StoredCredentialsContext } from '../components/StoredCredentialsContext.js';
import { AppStylingContext } from '../components/AppStylingContext.js';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';
import { AllCredentialsStoredContext } from '../components/AllCredentialsStoredContext.js';


const SecuritySettingsScreen = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext);
    const [destroyLocalDataMenuHidden, setDestroyLocalDataMenuHidden] = useState(true);
    const {storedCredentials, setStoredCredentials} = useContext(StoredCredentialsContext);
    const {AppStylingContextState, setAppStylingContextState} = useContext(AppStylingContext);
    const {allCredentialsStoredList, setAllCredentialsStoredList} = useContext(AllCredentialsStoredContext);

    const destroyAllData = async () => {
        await AsyncStorage.clear();
        setAllCredentialsStoredList(null);
        setAppStylingContextState('Default')
        setProfilePictureUri(SocialSquareLogo_B64_png);
        setStoredCredentials(null);
    }
    return(
        <>   
            <BackgroundDarkColor style={{backgroundColor: colors.primary}}>
                <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0, height: 'auto', paddingBottom: 5}}>
                    <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                        <Image
                        source={require('../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                        />
                    </Navigator_BackButton>
                    <TestText style={{textAlign: 'center', color: colors.tertiary}}>Security Settings</TestText>
                </ChatScreen_Title>
                <ConfirmLogoutView style={{backgroundColor: colors.primary, height: 400}} viewHidden={destroyLocalDataMenuHidden}>
                    <ConfirmLogoutText style={{color: colors.tertiary, fontSize: 24}}>Are you sure you want to delete all locally stored data?</ConfirmLogoutText>
                    <ConfirmLogoutText style={{color: colors.tertiary, fontSize: 14}}>Any data that is not on SocialSquare's servers will be destroyed and will not be able to be recovered. By pressing confirm you are agreeing to take the risk that any data not uploaded will be lost. For destruction of server data AND local data please go to the GDPR settings screen.</ConfirmLogoutText>
                    <ConfirmLogoutButtons cancelButton={true} onPress={() => {setDestroyLocalDataMenuHidden(true)}}>
                        <ConfirmLogoutButtonText cancelButton={true}>Cancel</ConfirmLogoutButtonText>
                    </ConfirmLogoutButtons> 
                    <ConfirmLogoutButtons confirmButton={true} onPress={destroyAllData}>
                        <ConfirmLogoutButtonText confirmButton>Confirm</ConfirmLogoutButtonText>
                    </ConfirmLogoutButtons> 
                </ConfirmLogoutView>
                <ScrollView scrollEnabled={destroyLocalDataMenuHidden} style={{height: '100%', backgroundColor: colors.primary}}>
                    <View style={{backgroundColor: colors.primary}}>
                        <Avatar resizeMode="cover" source={{uri: profilePictureUri}} />
                        <SettingsPageItemTouchableOpacity disabled={!destroyLocalDataMenuHidden} style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("GDPRCompliance")}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>GDPR Compliance</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity disabled={!destroyLocalDataMenuHidden} style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("LoginActivity")}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Login Activity</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity disabled={!destroyLocalDataMenuHidden} style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("2FA")}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Two Factor Authentication</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity disabled={!destroyLocalDataMenuHidden} style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("LoginAttempts")}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Login Attempts</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <TouchableOpacity disabled={!destroyLocalDataMenuHidden} onPress={() => {setDestroyLocalDataMenuHidden(false)}} style={{borderColor: colors.borderColor, borderWidth: 3, paddingVertical: 10, alignItems: 'center', marginBottom: 20}}>
                            <Ionicons name="trash-bin" size={60} color={colors.errorColor}/>
                            <Text style={{color: colors.errorColor, fontSize: 24, textAlign: 'center'}}>Destroy all locally stored data</Text>
                        </TouchableOpacity>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center'}}>© SquareTable 2022</Text>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center', marginBottom: 10}}>All Rights Reserved</Text>
                        <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', marginBottom: 10}}>Made by Sebastian Webster, Kovid Dev, Didula Semasinghe, and Jacob Bowden</Text>
                    </View>
                </ScrollView>
            </BackgroundDarkColor>
        </>
    );
}

export default SecuritySettingsScreen;
