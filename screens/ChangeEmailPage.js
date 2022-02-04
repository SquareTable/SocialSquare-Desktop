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
import {View, ActivityIndicator, ImageBackground, StyleSheet, useColorScheme, ScrollView, TouchableOpacity, Image} from 'react-native';

// Colors
const {brand, primary, tertiary} = Colors;

// API client
import axios from 'axios';
// mongodb+srv://Thekookiekov:<password>@cluster0.c403h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { StoredCredentialsContext } from '../components/StoredCredentialsContext';


const ChangeEmailPage = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    //context
    const {storedCredentials, setStoredCredentials} = useContext(StoredCredentialsContext);
    const {email} = storedCredentials;

    const handleChangeDisplayName = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = "https://nameless-dawn-41038.herokuapp.com/user/changeemail";

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
        AsyncStorage.removeItem('socialSquareCredentials')
        .then(() => {
            setStoredCredentials("");
        })
        .catch(error => console.log(error))

        AsyncStorage.setItem('socialSquareCredentials', JSON.stringify(credentials))
        .then(() => {
            handleMessage(message, status);
            setStoredCredentials(credentials);
        })
        .catch((error) => {
            console.log(error);
            handleMessage('Persisting login failed');
        })
    }

    const {colors} = useTheme();

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
            <InnerContainer style={{backgroundColor: colors.primary}}>
                <PageLogo source={require('./../assets/img/Logo.png')} />
                <PageTitle>SocialSquare</PageTitle>
                <SubTitle style={{color: colors.tertiary}}>Change Email</SubTitle>

                <Formik
                    initialValues={{password: '', userEmail: email, desiredEmail: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log("Submitting")
                        if (values.desiredEmail == "" || values.password == "") {
                            hanadleMessage('Please fill all the fields.');
                            setSubmitting(false);
                        } else {
                            handleChangeDisplayName(values, setSubmitting);
                        }
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                        <StyledFormArea>
                            <UserTextInput
                                icon="person"
                                placeholder="Desired Email"
                                placeholderTextColor={colors.tertiary}
                                onChangeText={handleChange('desiredEmail')}
                                onBlur={handleBlur('desiredEmail')}
                                value={values.desiredEmail}
                                style={{backgroundColor: colors.primary, color: colors.tertiary}}
                            />
                            <UserTextInput
                                icon="lock"
                                placeholder="Confirm Password"
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
                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                <ButtonText> Submit </ButtonText>
                            </StyledButton>)}

                            {isSubmitting && (<StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>)}
                            <SubTitle disclaimerText={true}>You may have to re-login to view your changes</SubTitle>
                        </StyledFormArea>)}
                </Formik>
            </InnerContainer>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center"
    }
})

const UserTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon style={{top: 32}} onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={brand}/>
                </RightIcon>
            )}
        </View>
    )
}

export default ChangeEmailPage;
