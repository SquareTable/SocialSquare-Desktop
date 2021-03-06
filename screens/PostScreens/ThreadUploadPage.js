import React, {useState, useContext, useEffect} from 'react';

// formik
import {Formik} from 'formik';

// icons
import Octicons from 'react-native-vector-icons/Octicons';

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
    AboveButtonText,
    PostHorizontalView,
    CheckBoxForPosts,
    PostIcons,
    MultiMediaPostFrame
} from '../../components/styling.js';
const {brand, primary, tertiary, darkLight, slightlyLighterGrey, midWhite, greyish} = Colors;

//From react native
import {View, Image, ActivityIndicator, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Text, Platform} from 'react-native';

//Axios
import axios from 'axios';

// keyboard avoiding view

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { StoredCredentialsContext } from '../../components/StoredCredentialsContext';

import { useTheme } from '@react-navigation/native';

const ThreadUploadPage = ({route, navigation}) => {
    const {colors, dark} = useTheme();
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [postIsNSFW, setPostIsNSFW] = useState(false);
    const [postIsNSFL, setPostIsNSFL] = useState(false);
    const [selectFormat, setSelectFormat] = useState("Text");
    const {threadFormat, threadTitle, threadSubtitle, threadTags, categoryTitle, threadBody, imageFromRoute, threadImageDescription, threadNSFW, threadNSFL, goBackAfterPost} = route.params;
    const [selectedTitle, setSelectedTitle] = useState("")
    const [selectedSubTitle, setSelectedSubTitle] = useState("")
    const [selectedTags, setSelectedTags] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedBody, setSelectedBody] = useState("")
    const [image, setImage] = useState();
    const [selectedThreadImageDescription, setSelectedThreadImageDescription] = useState("")
    const [selectedThreadNSFW, setSelectedThreadNSFW] = useState(false)
    const [selectedThreadNSFL, setSelectedThreadNSFL] = useState(false)
    const [changeOnce, setChangeOnce] = useState(false)
    const [screenshotsAllowed, setScreenshotsAllowed] = useState(false)
    //context
    const {storedCredentials, setStoredCredentials} = useContext(StoredCredentialsContext);
    const {_id} = storedCredentials;

    useEffect(() => {
        if (imageFromRoute) {
            setImage(imageFromRoute);
        }
    })
    
    console.log("Format:", threadFormat, "Title:", threadTitle, "Subtitle:", threadSubtitle, "Tags:", threadTags, "CategoryTitle:", categoryTitle, "Body:", threadBody, "ImageFromRoute:", imageFromRoute, "ThreadImageDescription:", threadImageDescription, "ThreadNSFW:", threadNSFW, "ThreadNSFL:", threadNSFL)
    console.log("SelectedCategory:", selectedCategory)
    if (categoryTitle !== null) {
        if (selectedCategory !== categoryTitle) {
            setSelectedCategory(null)
            setSelectedCategory(categoryTitle)
            console.log("Changed selected category")
        }
    }
    if (changeOnce == false) {
        if (threadFormat !== null) {
            if (selectFormat !== threadFormat) {
                setSelectFormat()
                setSelectFormat(threadFormat)
            }
        }
        if (threadTitle !== null) {
            if (selectedTitle !== threadTitle) {
                setSelectedTitle()
                setSelectedTitle(threadTitle)
            }
        }
        if (threadSubtitle !== null) {
            if (selectedSubTitle !== threadSubtitle) {
                setSelectedSubTitle()
                setSelectedSubTitle(threadSubtitle)
            }
        }
        if (threadTags !== null) {
            if (selectedTags !== threadTags) {
                setSelectedTags()
                setSelectedTags(threadTags)
            }
        }
        if (threadBody !== null) {
            if (selectedBody !== threadBody) {
                setSelectedBody()
                setSelectedBody(threadBody)
            }
        }
        if (imageFromRoute !== null) {
            if (image !== imageFromRoute) {
                setImage()
                setImage(imageFromRoute)
            }
        }
        if (threadImageDescription !== null) {
            if (selectedThreadImageDescription !== threadImageDescription) {
                setSelectedThreadImageDescription()
                setSelectedThreadImageDescription(threadImageDescription)
            }
        }
        if (threadNSFW !== null) {
            if (selectedThreadNSFW !== threadNSFW) {
                setSelectedThreadNSFW()
                setSelectedThreadNSFW(threadNSFW)
            }
        }
        if (threadNSFL !== null) {
            if (selectedThreadNSFL !== threadNSFL) {
                setSelectedThreadNSFL()
                setSelectedThreadNSFL(threadNSFL)
            }
        }
        setChangeOnce(true)
    }

    const checkboxNSFWPressed = () => {
        if (postIsNSFW == true) {
            if (postIsNSFL == true) {
                setPostIsNSFL(true)
                setPostIsNSFW(false)
            }else{
                setPostIsNSFL(false)
                setPostIsNSFW(false)
            }
        } else {
            setPostIsNSFL(false)
            setPostIsNSFW(true)
        }
    }

    const checkboxNSFLPressed = () => {
        if (postIsNSFL == true) {
            if (postIsNSFW == true) {
                setPostIsNSFW(true)
                setPostIsNSFL(false)
            }else{
                setPostIsNSFL(false)
                setPostIsNSFW(false)
            }
        } else {
            setPostIsNSFW(false)
            setPostIsNSFL(true)
        }
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const UserTextInput = ({label, icon, body, ...props}) => {
        if (body == true) {
            return(
                <View style={{width: '100%'}}>
                    {/*
                        <LeftIcon style={{top: 28}} searchIcon={true}>
                            <Octicons name={icon} size={30} color={brand} />
                        </LeftIcon>
                    */}
                    <StyledInputLabel style={{color: colors.tertiary}}>{label}</StyledInputLabel>
                    <StyledTextInput searchPage={true} style={{borderColor: dark ? midWhite : greyish, borderRadius: 10, backgroundColor: dark ? darkLight : colors.borderColor, borderWidth: 3, color: colors.tertiary, width: '100%'}} {...props}/>
                </View>
            )
        } else {
            return(
                <View>
                    <LeftIcon style={{top: 26.5}} searchIcon={true}>
                        <Octicons name={icon} size={30} color={brand} />
                    </LeftIcon>
                    <StyledInputLabel style={{color: colors.tertiary}}>{label}</StyledInputLabel>
                    <StyledTextInput searchPage={true} style={{borderColor: dark ? slightlyLighterGrey : greyish, backgroundColor: dark ? darkLight : colors.borderColor, color: colors.tertiary}} {...props}/>
                </View>
            )
        }
    }

    return(
        <>
            <TouchableOpacity onPress={() => {navigation.goBack()}} style={{zIndex: 2, position: 'absolute', top: 10, left: 10}}>
                <Image
                    source={require('../assets/app_icons/back_arrow.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                />
            </TouchableOpacity>
            <ScrollView style={{width: '100%'}}>
                <InnerContainer style={{backgroundColor: colors.primary, width: '100%'}}>
                    <PageLogo style={{tintColor: colors.tertiary}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/007-pencil2.png')} />
                    
                    <PageTitle>Create Thread</PageTitle>
                    <Formik
                        initialValues={{threadFormat: selectFormat, threadTitle: selectedTitle, threadSubtitle: selectedSubTitle, threadTags: selectedTags, threadCategory: selectedCategory, threadBody: selectedBody, threadImageDescription: selectedThreadImageDescription, threadNSFW: selectedThreadNSFW, threadNSFL: selectedThreadNSFL}}
                        onSubmit={(values) => {
                            console.log("Submitting")
                            if (values.threadFormat == "Text") {
                                if (values.threadTitle == "" || selectedCategory == null || values.threadBody == "") {
                                    handleMessage('Please fill all the fields.');
                                } else {
                                    let tempValues = values;
                                    tempValues.selectedCategory = selectedCategory;
                                    tempValues.screenshotsAllowed = screenshotsAllowed;
                                    tempValues.threadNSFL = postIsNSFL;
                                    tempValues.threadNSFW = postIsNSFW;
                                    navigation.reset({
                                        index: 0,
                                        routes: [{name: 'PostScreen', params: {postData: tempValues, postType: 'thread_text', navigateToHomeScreen: true}}]
                                    })
                                }
                            } else if (values.threadFormat == "Images") {
                                if (Platform.OS != 'macos') {
                                    if (values.threadTitle == "" || selectedCategory == null || image == null) {
                                        handleMessage('Please fill all the fields.');
                                    } else {
                                        let tempValues = values;
                                        tempValues.selectedCategory = selectedCategory;
                                        tempValues.screenshotsAllowed = screenshotsAllowed;
                                        tempValues.image = image;
                                        tempValues.threadNSFL = postIsNSFL;
                                        tempValues.threadNSFW = postIsNSFW;
                                        navigation.reset({
                                            index: 0,
                                            routes: [{name: 'PostScreen', params: {postData: tempValues, postType: 'thread_image', navigateToHomeScreen: true}}]
                                        })
                                    }
                                } else {
                                    alert('Download the iOS, Android, or Windows version of SocialSquare or use the SocialSquare website to be able to post threads with images in them.')
                                }
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                            <StyledFormArea theOutline={true}>
                                <UserTextInput
                                    label="Thread Title"
                                    icon="note"
                                    placeholder=""
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('threadTitle')}
                                    onBlur={handleBlur('threadTitle')}
                                    value={values.threadTitle}
                                />
                                <UserTextInput
                                    label="Thread Subtitle (optional)"
                                    icon="note"
                                    placeholder=""
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('threadSubtitle')}
                                    onBlur={handleBlur('threadSubtitle')}
                                    value={values.threadSubtitle}
                                />
                                <UserTextInput
                                    label="Tags (optional)"
                                    icon="note"
                                    placeholder=""
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('threadTags')}
                                    onBlur={handleBlur('threadTags')}
                                    value={values.threadTags}
                                />
                                <View style={{width: '100%', flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                                        <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal', color: colors.tertiary}}>Text</SubTitle>
                                        {selectFormat == "Text" && (
                                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: colors.borderColor, alignItems: 'center', justifyContent: 'center'}}>
                                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/035-file-text.png')}/>
                                            </TouchableOpacity>
                                        )}
                                        {selectFormat !== "Text" && (
                                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: colors.borderColor, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                                setSelectFormat("Text")
                                                values.threadFormat="Text"
                                            }}>
                                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/035-file-text.png')}/>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                                        <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal', color: colors.tertiary}}>Images</SubTitle>
                                        {selectFormat == "Images" && (
                                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: colors.borderColor, alignItems: 'center', justifyContent: 'center'}}>
                                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png')}/>
                                            </TouchableOpacity>
                                        )}
                                        {selectFormat !== "Images" && (
                                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: colors.borderColor, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                                setSelectFormat("Images")
                                                values.threadFormat="Images"
                                            }}>
                                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png')}/>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                                        <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal', color: colors.tertiary}}>User Posts</SubTitle>
                                        {selectFormat == "User Posts" && (
                                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: colors.borderColor, alignItems: 'center', justifyContent: 'center'}}>
                                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/115-users.png')}/>
                                            </TouchableOpacity>
                                        )}
                                        {selectFormat !== "User Posts" && (
                                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: colors.borderColor, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                                setSelectFormat("User Posts")
                                                values.threadFormat="User Posts"
                                            }}>
                                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/115-users.png')}/>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                                {selectFormat == "Text" && (
                                    <UserTextInput
                                        label="Body"
                                        icon="note"
                                        placeholder=""
                                        body={true}
                                        multiline={true}
                                        placeholderTextColor={tertiary}
                                        onChangeText={handleChange('threadBody')}
                                        onBlur={handleBlur('threadBody')}
                                        value={values.threadBody}
                                        style={{maxHeight: 100, borderRadius: 10}}
                                    />
                                )}
                                {selectFormat == "Images" && 
                                    <>
                                        {Platform.OS != 'macos' ? (
                                            <View style={{width: '90%', alignSelf: 'center', marginVertical: 10}}>
                                                {image && <MultiMediaPostFrame style={{width: '100%', aspectRatio: 1/1, backgroundColor: colors.borderColor}} PostingThreadImage={true}>
                                                    <Image source={image} style={{ width: "100%", height: '100%'}} resizeMode="contain" />
                                                </MultiMediaPostFrame>}
                                                {image && <StyledButton style={{backgroundColor: colors.primary, borderColor: colors.tertiary}} removeImage={true} onPress={() => {navigation.setParams({imageFromRoute: null})}}>
                                                    <ButtonText style={{color: colors.tertiary}} removeImage={true}>
                                                        X
                                                    </ButtonText>
                                                </StyledButton>}
                                                {!image && <MultiMediaPostFrame style={{width: '100%', aspectRatio: 1/1, backgroundColor: colors.borderColor}} PostingThreadImage={true}>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <StyledButton style={{backgroundColor: colors.borderColor, borderColor: colors.tertiary}} postImage={true} onPress={OpenImgLibrary}>
                                                            <ButtonText style={{color: colors.tertiary}} postImage={true}>
                                                                +
                                                            </ButtonText>
                                                        </StyledButton>
                                                        <View style={{width: 20}}/>
                                                        <StyledButton style={{backgroundColor: colors.borderColor, borderColor: colors.tertiary}} postImage={true} onPress={checkForCameraPermissions}>
                                                        <Image
                                                            source={require('../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/016-camera.png')}
                                                            style={{height: 30, width: 30, tintColor: colors.tertiary}}
                                                            resizeMode="contain"
                                                            resizeMethod="resize"
                                                        />
                                                        </StyledButton>
                                                    </View>
                                                </MultiMediaPostFrame>}
                                                <UserTextInput
                                                    label="Image Description (optional)"
                                                    icon="note"
                                                    placeholder=""
                                                    body={true}
                                                    multiline={true}
                                                    placeholderTextColor={tertiary}
                                                    onChangeText={handleChange('threadImageDescription')}
                                                    onBlur={handleBlur('threadImageDescription')}
                                                    value={values.threadImageDescription}
                                                />
                                            </View>
                                    
                                        ) : (
                                            <Text style={{fontSize: 20, color: colors.tertiary, textAlign: 'center', marginVertical: 10}}>Download the iOS, Android, or Windows version of SocialSquare or use the SocialSquare website to use this feature.</Text>
                                        )}
                                    </>
                                }
                                {selectFormat == "User Posts" && (
                                    <Text style={{fontSize: 20, color: colors.tertiary, textAlign: 'center', marginVertical: 10}}>User posts in threads are coming soon</Text>
                                )}
                                <AboveButtonText style={{color: colors.tertiary}}>Select Category</AboveButtonText>
                                <StyledButton style={{backgroundColor: colors.primary}} signUpButton={true} onPress={() => navigation.navigate("SelectCategorySearchScreen", {threadFormat: selectFormat, threadTitle: values.threadTitle, threadSubtitle: values.threadSubtitle, threadTags: values.threadTags, threadCategory: selectedCategory, threadBody: values.threadBody, threadImage: image, threadImageDescription: values.threadImageDescription, threadNSFW: values.threadNSFW, threadNSFL: values.threadNSFL})}>
                                    <ButtonText style={{top: -9}} signUpButton={true}>{selectedCategory || "None"}</ButtonText>
                                </StyledButton>
                                <PostHorizontalView centerAlign={true}>
                                    <CheckBoxForPosts style={{marginLeft: 4}} selectedState={postIsNSFW} onPress={checkboxNSFWPressed}/>
                                    <AboveButtonText style={{color: colors.tertiary, borderColor: dark ? 3 : 5}} byCheckBox={true}>Mark as NSFW</AboveButtonText>
                                </PostHorizontalView>
                                <PostHorizontalView centerAlign={true}>
                                    <CheckBoxForPosts selectedState={postIsNSFL} onPress={checkboxNSFLPressed}/>
                                    <AboveButtonText style={{color: colors.tertiary, borderColor: dark ? 3 : 5}} byCheckBox={true}>Mark as NSFL</AboveButtonText>
                                </PostHorizontalView>
                                <MsgBox type={messageType}>{message}</MsgBox>
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    <Text style={{color: colors.tertiary, fontSize: 18, marginTop: 10, marginRight: 10}}>Allow screen capture</Text>
                                    <TouchableOpacity onPress={() => {setScreenshotsAllowed(screenshotsAllowed => !screenshotsAllowed)}} style={{width: 40, height: 40, borderColor: colors.borderColor, borderWidth: 3, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', textAlignVertical: 'center'}}>{screenshotsAllowed == false ? '???' : '???'}</Text>
                                    </TouchableOpacity>
                                </View>
                                {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                    <ButtonText> Submit </ButtonText>
                                </StyledButton>)}

                                {isSubmitting && (<StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>)}
                                
                                <StyledButton style={{backgroundColor: colors.primary}} signUpButton={true} onPress={() => navigation.goBack()}>
                                        <ButtonText style={{top: -9}} signUpButton={true}> Back </ButtonText>
                                </StyledButton>
                            </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center"
    }
})

export default ThreadUploadPage;
