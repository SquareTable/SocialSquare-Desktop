import React, {useContext, useEffect, useState} from 'react';
import { useTheme } from '@react-navigation/native';

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar,
    StyledContainer,
    ProfileHorizontalView,
    ProfileHorizontalViewItem,
    ProfIcons,
    ProfInfoAreaImage,
    ProfileBadgesView,
    ProfileBadgeIcons,
    ProfilePostsSelectionView,
    ProfilePostsSelectionBtns,
    ProfileGridPosts,
    ProfileFeaturedPosts,
    ProfileTopBtns,
    TopButtonIcons,
    PostTypeSelector,
    PostHorizontalView,
    PostIcons,
    PostCollectionView,
    PostMsgBox
} from '../components/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { StoredCredentialsContext } from '../components/StoredCredentialsContext';

import { Platform } from 'react-native';


const PostScreen = ({navigation, route}) => {
     //context
    const {storedCredentials, setStoredCredentials} = useContext(StoredCredentialsContext);
    if (storedCredentials) {var {name, displayName, email} = storedCredentials;}
    const [gridViewState, setGridViewState] = useState("flex")
    const [featuredViewState, setFeaturedViewState] = useState("none")
    const [messageVisibility, setMessageVisibility] = useState(false);
    const [formatOneSelected, setFormatOneSelected] = useState(false);
    const [formatTwoSelected, setFormatTwoSelected] = useState(false);
    const [formatThreeSelected, setFormatThreeSelected] = useState(false);
    const [formatFourSelected, setFormatFourSelected] = useState(false);
    const [formatFiveSelected, setFormatFiveSelected] = useState(false)
    const [formatMessage, setFormatMessage] = useState('Select a format')
    if (route.params) {var {postData, postType, navigateToHomeScreen} = route.params}

    const continuePressed = () => {
        if (formatOneSelected == true) {
            setMessageVisibility(false)
            navigation.navigate("MultiMediaUploadPage", {imageFromRoute: null, titleFromRoute: '', descriptionFromRoute: ''})
        } else if (formatTwoSelected == true) {
            setMessageVisibility(false)
            navigation.navigate("ThreadUploadPage", {threadFormat: null, threadTitle: null, threadSubtitle: null, threadTags: null, categoryTitle: null, threadBody: null, imageFromRoute: null, threadImageDescription: null, threadNSFW: null, threadNSFL: null, goBackAfterPost: false})
        } else if (formatThreeSelected == true) {
            setMessageVisibility(false)
            navigation.navigate("PollUploadPage")
        } else if (formatFourSelected == true) {
            setMessageVisibility(false)
            navigation.navigate("RecordAudioPage")
        } else if (formatFiveSelected == true) {
            setMessageVisibility(false)
            navigation.navigate("CategoryCreationPage", {imageFromRoute: null})
        } else {
            setMessageVisibility(true)
        }
    }

    const formatOnePressed = () => {
        if (formatOneSelected !== true) {
            setFormatOneSelected(true)
            setFormatTwoSelected(false)
            setFormatThreeSelected(false)
            setFormatFourSelected(false)
            setFormatFiveSelected(false)
            setFormatMessage(Platform.OS == 'macos' ? 'Post Multimedia (iOS, Android, Windows, and Web only)' : 'Post Multimedia')
        }
    }

    const formatTwoPressed = () => {
        if (formatTwoSelected !== true) {
            setFormatOneSelected(false)
            setFormatTwoSelected(true)
            setFormatThreeSelected(false)
            setFormatFourSelected(false)
            setFormatFiveSelected(false)
            setFormatMessage('Post Threads')
        }
    }

    const formatThreePressed = () => {
        if (formatThreeSelected !== true) {
            setFormatOneSelected(false)
            setFormatTwoSelected(false)
            setFormatThreeSelected(true)
            setFormatFourSelected(false)
            setFormatFiveSelected(false)
            setFormatMessage('Post Polls')
        }
    }

    const formatFourPressed = () => {
        if (formatFourSelected !== true) {
            setFormatOneSelected(false)
            setFormatTwoSelected(false)
            setFormatThreeSelected(false)
            setFormatFourSelected(true)
            setFormatFiveSelected(false)
            setFormatMessage(Platform.OS == 'macos' ? 'Post Audio (iOS, Android, Windows, and Web only)' : 'Post Audio')
        }
    }

    const formatFivePressed = () => {
        if (formatFiveSelected !== true) {
            setFormatOneSelected(false)
            setFormatTwoSelected(false)
            setFormatThreeSelected(false)
            setFormatFourSelected(false)
            setFormatFiveSelected(true)
            setFormatMessage(Platform.OS == 'macos' ? 'Create a category (iOS, Android, Windows, and Web only)' : 'Create a category')
        }
    }

    const {colors, dark} = useTheme();

    if (navigateToHomeScreen == true) {
        navigation.setParams({navigateToHomeScreen: false})
        navigation.navigate('HomeScreen', {postData: postData, postType: postType})
    }


    return(
        <>    
            <WelcomeContainer style={{backgroundColor: colors.primary}} postScreen={true}>
                <PageTitle style={{color: colors.brand}}>Post Screen</PageTitle>
                <SubTitle style={{color: colors.tertiary}}>{formatMessage}</SubTitle>
                <PostCollectionView>
                    <PostTypeSelector style={{borderColor: formatOneSelected ? colors.darkestBlue : colors.brand}} styleForSelected={formatOneSelected} onPress={formatOnePressed}>
                        <PostIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/016-camera.png')}/>
                    </PostTypeSelector>
                    <PostHorizontalView marginVertical={20}>
                        <PostTypeSelector style={{borderColor: formatTwoSelected ? colors.darkestBlue : colors.brand}} noMarginHorizontal={true} styleForSelected={formatTwoSelected} onPress={formatTwoPressed}>
                            <PostIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/007-pencil2.png')}/>
                        </PostTypeSelector>
                        <PostTypeSelector style={{borderColor: formatFiveSelected ? colors.darkestBlue : colors.brand}} centerIcon={true} styleForSelected={formatFiveSelected} onPress={formatFivePressed}>
                            <PostIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/093-drawer.png')}/>
                        </PostTypeSelector>
                        <PostTypeSelector style={{borderColor: formatThreeSelected ? colors.darkestBlue : colors.brand}} noMarginHorizontal={true} styleForSelected={formatThreeSelected} onPress={formatThreePressed}>
                            <PostIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/157-stats-bars.png')}/>
                        </PostTypeSelector>
                    </PostHorizontalView>
                    <PostTypeSelector style={{borderColor: formatFourSelected ? colors.darkestBlue : colors.brand}} styleForSelected={formatFourSelected} onPress={formatFourPressed}>
                        <PostIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/018-music.png')}/>
                    </PostTypeSelector>
                    <PostMsgBox style={{color: colors.red}} viewHidden={messageVisibility}> Select a format </PostMsgBox>
                </PostCollectionView>
                <StyledButton /*continueButton={true}*/ style={{backgroundColor: colors.brand}} onPress={continuePressed}>
                    <ButtonText style={{color: 'black'}} /*continueButton={true}*/>
                        Continue
                    </ButtonText>
                </StyledButton>
            </WelcomeContainer>
        </>
    );
}

export default PostScreen;
