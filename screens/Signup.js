import React, {useState, useContext} from 'react';
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
import {View, ActivityIndicator, TouchableOpacity, Text, Linking, ScrollView} from 'react-native';

// Colors
const {brand, primary, tertiary} = Colors;

// API client
import axios from 'axios';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { StoredCredentialsContext } from './../components/StoredCredentialsContext';
import { AllCredentialsStoredContext } from '../components/AllCredentialsStoredContext.js';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';


const Signup = ({navigation, route}) => {
    const {allCredentialsStoredList, setAllCredentialsStoredList} = useContext(AllCredentialsStoredContext);
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext);

    if (route.params) {var {modal} = route.params;}

    const {colors} = useTheme();

    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    //context
    const {storedCredentials, setStoredCredentials} = useContext(StoredCredentialsContext)

    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = "https://nameless-dawn-41038.herokuapp.com/user/signup";

        axios.post(url, credentials).then((response) => { 
            const result = response.data;
            const {message, status, data} = result;

            
            if (status !== 'SUCCESS') {
                handleMessage(message,status);
            } else {
                persistLogin({...data}, message, status);
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
        var temp = allCredentialsStoredList;
        credentialsToUse.profilePictureUri = SocialSquareLogo_B64_png
        if (temp == null || temp == undefined) {
            temp = [];
            credentialsToUse.indexLength = 0;
        } else {
            credentialsToUse.indexLength = temp.length;
        }
        setProfilePictureUri(SocialSquareLogo_B64_png);
        AsyncStorage.setItem('socialSquareCredentials', JSON.stringify(credentialsToUse))
        .then(() => {
            handleMessage(message, status);
            setStoredCredentials(credentialsToUse);
            temp.push(credentialsToUse);
            AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(temp)).then(() => {
                setAllCredentialsStoredList(temp);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Tabs' }],
                });
            })
        })
        .catch((error) => {
            console.log(error);
            handleMessage('Persisting login failed');
        })
    }

    const goBackToLoginScreen = () => {
        if (modal == true) {
            navigation.goBack();
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
        }
    }

    return(
        <ScrollView style={{flex: 1}} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
            <PageLogo source={require('./../assets/img/Logo.png')} />
            <PageTitle style={{color: colors.tertiary}}>SocialSquare</PageTitle>
            <SubTitle style={{color: colors.tertiary}}>Signup Page</SubTitle>

            <Formik
                initialValues={{name: '',email: '', password: '', confirmPassword: ''}}
                onSubmit={(values, {setSubmitting}) => {
                    if (values.email == "" || values.password == "" || values.name == "" || values.confirmPassword == "") {
                        handleMessage('Please fill all the fields.');
                        setSubmitting(false);
                    } else if (values.password !== values.confirmPassword) {
                        handleMessage('Passwords do not match.');
                        setSubmitting(false);
                    } else {
                        handleSignup(values, setSubmitting);
                    }
                }}
            >
                {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                    <StyledFormArea>
                        <UserTextInput
                            label="Username"
                            icon="person"
                            placeholder="Eg. PhotosAreCool123"
                            placeholderTextColor={colors.tertiary}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            style={{backgroundColor: colors.primary, color: colors.tertiary}}
                            autoCapitalize="none"
                        />

                        <UserTextInput
                            label="Email Address"
                            icon="mail"
                            placeholder="example@gmail.com"
                            placeholderTextColor={colors.tertiary}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            style={{backgroundColor: colors.primary, color: colors.tertiary}}
                            autoCapitalize="none"
                        />

                        <UserTextInput
                            label="Password"
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
                        />

                        <UserTextInput
                            label="Confirm Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={colors.tertiary}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            style={{backgroundColor: colors.primary, color: colors.tertiary}}
                        />
                        <MsgBox type={messageType}>{message}</MsgBox>
                        {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                            <ButtonText> Signup </ButtonText>
                        </StyledButton>)}

                        {!isSubmitting && modal == true && (<StyledButton onPress={() => {navigation.pop(2)}}>
                            <ButtonText> Close </ButtonText>
                        </StyledButton>)}

                        {isSubmitting && (<StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary} />
                        </StyledButton>)}
                        <ExtraView>
                            <ExtraText style={{color: colors.tertiary, fontSize: 20}}>Already have an account? </ExtraText>
                            <TextLink onPress={goBackToLoginScreen}>
                                <TextLinkContent style={{color: colors.brand, fontSize: 20, top: 5}}>Login</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                        <Text style={{textAlign: 'center', color: colors.tertiary, marginTop: 20}}>By signing up, you agree to our </Text>
                        <TextLink onPress={() => {Linking.openURL('https://squaretable.github.io/social-media-platform/TermsAndConditions')}}>
                            <TextLinkContent style={{color: colors.brand}}>Terms of Service</TextLinkContent>
                        </TextLink>
                        <Text style={{textAlign: 'center', color: colors.tertiary}}>and</Text>
                        <TextLink onPress={() => {Linking.openURL('https://squaretable.github.io/social-media-platform/PrivacyPolicy')}}>
                            <TextLinkContent style={{color: colors.brand}}>Privacy Policy</TextLinkContent>
                        </TextLink>
                    </StyledFormArea>)}
            </Formik>
        </ScrollView>
    );
}

const UserTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon style={{top: 34.5}}>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon style={{top: 32.5}} onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={brand}/>
                </RightIcon>
            )}
        </View>
    )
}

export default Signup;
