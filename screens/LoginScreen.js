import React, {useState, useContext, useEffect, useRef} from 'react';
import { useTheme } from '@react-navigation/native';

// formik
import {Formik} from 'formik';

// icons
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
} from '../components/styling.js';
import {View, ActivityIndicator, ImageBackground, StyleSheet, Text, ScrollView} from 'react-native';

// Colors
const {brand, primary, tertiary} = Colors;

// keyboard avoiding view
import NetInfo from "@react-native-community/netinfo";

// API client
import axios from 'axios';
// mongodb+srv://Thekookiekov:<password>@cluster0.c403h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { StoredCredentialsContext } from '../components/StoredCredentialsContext';
import { AllCredentialsStoredContext } from '../components/AllCredentialsStoredContext.js';

import FeatherIcons from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';


const LoginScreen = ({navigation, route}) => {
    const { colors, dark } = useTheme();
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [downloadingPfp, setDownloadingPfp] = useState(false);

    //context
    const {storedCredentials, setStoredCredentials} = useContext(StoredCredentialsContext);
    const {allCredentialsStoredList, setAllCredentialsStoredList} = useContext(AllCredentialsStoredContext);
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext)
    const [profilePictureData, setProfilePictureData] = useState(null);

    const sameAccount = useRef(false)

    if (route.params) {var {modal, goBackToApp} = route.params}

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = "https://nameless-dawn-41038.herokuapp.com/user/signin";

        axios.post(url, credentials).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message,status);
            } else {
                persistLogin({...data[0]}, message, status);
            }
            setSubmitting(false);

        }).catch(error => {
            console.log(error);
            setSubmitting(false);
            handleMessage("An error occured. Try checking your network connection and retry.");
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }


    const persistLogin = (credentials, message, status) => {
        let credentialsToUse = credentials;
        setDownloadingPfp(true);
        if (allCredentialsStoredList) {
            for (let i = 0; i < allCredentialsStoredList.length; i++) {
                if (allCredentialsStoredList[i].secondId == credentialsToUse.secondId) {
                    sameAccount.current = true;
                }
            }
        } else {
            sameAccount.current = false;
        }
        console.log('Getting profile picture for ProfilePictureUriContext')
        const getProfilePicture = () => {
            const url = `https://nameless-dawn-41038.herokuapp.com/user/getProfilePic/${credentialsToUse.name}`;
    
            axios.get(url).then((response) => {
                const result = response.data;
                const {message, status, data} = result;
    
                if (status !== 'SUCCESS') {
                    console.log('GETTING PROFILE PICTURE FOR ProfilePictureUriContext WAS NOT A SUCCESS')
                    console.log(status)
                    console.log(message)
                    setProfilePictureData([SocialSquareLogo_B64_png, message, status, credentialsToUse])
                } else {
                    console.log(status)
                    console.log(message)
                    axios.get(`https://nameless-dawn-41038.herokuapp.com/getImage/${data}`)
                    .then((response) => {
                        const result = response.data;
                        const {message, status, data} = result;
                        console.log(status)
                        console.log(message)
                        console.log(data)
                        //set image
                        if (message == 'No profile image.' && status == 'FAILED') {
                            console.log('Setting logo to SocialSquare logo')
                            setProfilePictureUri(SocialSquareLogo_B64_png)
                            setProfilePictureData([SocialSquareLogo_B64_png, message, status, credentialsToUse])
                        } else if (data) {
                            //convert back to image
                            console.log('Setting logo in tab bar to profile logo')
                            var base64Icon = `data:image/jpg;base64,${data}`
                            setProfilePictureUri(base64Icon)
                            setProfilePictureData([base64Icon, message, status, credentialsToUse])
                        } else {
                            console.log('Setting logo to SocialSquare logo')
                            setProfilePictureUri(SocialSquareLogo_B64_png)
                            setProfilePictureData([SocialSquareLogo_B64_png, message, status, credentialsToUse])
                        }
                    })
                    .catch(function (error) {
                        console.log("Image not recieved")
                        console.log(error);
                    });
                }
                //setSubmitting(false);
    
            }).catch(error => {
                console.log(error);
                //setSubmitting(false);
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        }
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == true) {
                if (credentials) {
                console.log('There is no profile picture in AsyncStorage. Loading profile picture for ProfilePictureUri Context using internet connection')
                getProfilePicture()
                } else {
                console.log('There is no stored credentials and no profile picture in Async Storage. Setting ProfilePictureUri to SocialSquareB64Logo')
                setProfilePictureUri(SocialSquareLogo_B64_png)
                setProfilePictureData([SocialSquareLogo_B64_png, message, status, credentialsToUse])
                }
            } else {
                console.log('There is no internet connection and no saved profile picture in Async Storage. Setting ProfilePictureUri to SocialSquareB64Logo')
                setProfilePictureUri(SocialSquareLogo_B64_png)
                setProfilePictureData([SocialSquareLogo_B64_png, message, status, credentialsToUse])
            }
        });
    }

    useEffect(() => {
        if (profilePictureData != null) {
            let profilePictureUriData = profilePictureData[0];
            let message = profilePictureData[1];
            let status = profilePictureData[2];
            let credentialsToUse = profilePictureData[3];
            let temp = allCredentialsStoredList;
            setProfilePictureUri(profilePictureUriData);
            if (temp == null || temp == undefined) {
                temp = [];
                credentialsToUse.indexLength = 0;
            } else {
                credentialsToUse.indexLength = temp.length;
            }
            credentialsToUse.profilePictureUri = profilePictureUriData;
            AsyncStorage.setItem('socialSquareCredentials', JSON.stringify(credentialsToUse))
            .then(() => {
                setStoredCredentials(credentialsToUse);
                if (sameAccount.current == false) {
                    temp.push(credentialsToUse);
                }
                AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(temp))
                .then(() => {
                    handleMessage(message, status);
                    if (sameAccount.current === false) {
                        setAllCredentialsStoredList(temp);
                    }
                    if (modal === true) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Tabs' }],
                        });
                    } else {
                        navigation.replace("Tabs");
                    }
                    handleMessage(message, status);
                })
                .catch((error) => {
                    console.log(error);
                    handleMessage('Persisting login failed');
                })
                })
            .catch((error) => {
                console.log(error);
                handleMessage('Persisting login failed');
            })
            setDownloadingPfp(false);
        }
    }, [profilePictureData])

    useEffect(() => {
        AsyncStorage.setItem('HasOpenedSocialSquare', 'true');
    })

    if (goBackToApp == true) {
        navigation.goBack()
    }
    return(
        <ScrollView style={{flex: 1}} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
            <PageLogo source={require('./../assets/img/Logo.png')} />
            <PageTitle style={{color: colors.tertiary}}>SocialSquare</PageTitle>
            <SubTitle style={{color: colors.tertiary}}>Login Page</SubTitle>

            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={(values, {setSubmitting}) => {
                    if (values.email == "" || values.password == "") {
                        handleMessage('Please fill all the fields.');
                        setSubmitting(false);
                    } else {
                        handleLogin(values, setSubmitting);
                    }
                }}
            >
                {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                    <StyledFormArea>
                        <UserTextInput
                            icon="mail"
                            placeholder="example@gmail.com"
                            placeholderTextColor={colors.tertiary}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={{backgroundColor: colors.primary, color: colors.tertiary}}
                            octiconColor={colors.brand}
                            handleSubmit={handleSubmit}
                        />

                        <UserTextInput
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={colors.tertiary}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            style={{backgroundColor: colors.primary, color: colors.tertiary}}
                            octiconColor={colors.brand}
                            handleSubmit={handleSubmit}
                        />
                        <MsgBox type={messageType}>{message}</MsgBox>
                        {downloadingPfp == false ?
                            <>
                                {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                    <ButtonText> Login </ButtonText>
                                </StyledButton>)}

                                {isSubmitting && (<StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>)}
                                
                                <StyledButton style={{backgroundColor: colors.primary, color: colors.tertiary}} signUpButton={true} onPress={() => modal == true ? navigation.navigate('ModalSignupScreen', {modal: true}) : navigation.navigate("Signup")}>
                                        <ButtonText signUpButton={true} style={{color: colors.tertiary, top: -9.5}}> Signup </ButtonText>
                                </StyledButton>

                                {modal == true ?
                                    <StyledButton style={{backgroundColor: colors.primary, color: colors.tertiary}} signUpButton={true} onPress={() => navigation.goBack()}>
                                        <ButtonText signUpButton={true} style={{color: colors.tertiary, top: -9.5}}> Close </ButtonText>
                                    </StyledButton> 
                                : null}
                            </>
                        :
                            <ActivityIndicator size="large" color={brand} />
                        }
                    </StyledFormArea>)}
            </Formik>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center"
    }
})

const UserTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, octiconColor, handleSubmit, ...props}) => {
    return(
        <View>
            <LeftIcon style={{top: 34}}>
                <Octicons name={icon} size={30} color={octiconColor} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} onSubmitEditing={handleSubmit}/>
            {isPassword && (
                <RightIcon style={{top: 31}} onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={brand}/>
                </RightIcon>
            )}
        </View>
    )
}



export default LoginScreen;
