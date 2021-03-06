import React, {useContext, useState, useEffect} from 'react';

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
    darkModeOn,
    darkModeStyling,
    lightModeStyling,
    BackgroundDarkColor,
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    TextLink,
    TextLinkContent
} from '../components/styling.js';
import {useTheme} from "@react-navigation/native";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View, Image, Platform, Switch } from 'react-native';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NotificationsSettingsScreen = ({navigation}) => {
    const {colors, dark} = useTheme();
    if (Platform.OS == 'ios' || Platform.OS == 'android' || Platform.OS == 'web') {
        const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext)
        // Receive notifications
        const [textMessages, setTextMessages] = useState(true)
        const [upvotesOnPosts, setUpvotesOnPosts] = useState(true)
        const [neutralVotesOnPosts, setNeutralVotesOnPosts] = useState(true)
        const [downvotesOnPosts, setDownvotesOnPosts] = useState(true)
        const [upvotesOnVideos, setUpvotesOnVideos] = useState(true)
        const [neutralVotesOnVideos, setNeutralVotesOnVideos] = useState(true)
        const [downvotesOnVideos, setDownvotesOnVideos] = useState(true)
        const [upvotesOnPolls, setUpvotesOnPolls] = useState(true)
        const [neutralVotesOnPolls, setNeutralVotesOnPolls] = useState(true)
        const [downvotesOnPolls, setDownvotesOnPolls] = useState(true)
        const [upvotesOnThreads, setUpvotesOnThreads] = useState(true)
        const [neutralVotesOnThreads, setNeutralVotesOnThreads] = useState(true)
        const [downvotesOnThreads, setDownvotesOnThreads] = useState(true)
        const [personJoiningCategory, setPersonJoiningCategory] = useState(true)
        // Send notifications
        const [sendTextMessages, setSendTextMessages] = useState(true)
        const [sendUpvotesOnPosts, setSendUpvotesOnPosts] = useState(true)
        const [sendNeutralVotesOnPosts, setSendNeutralVotesOnPosts] = useState(true)
        const [sendDownvotesOnPosts, setSendDownvotesOnPosts] = useState(true)
        const [sendUpvotesOnVideos, setSendUpvotesOnVideos] = useState(true)
        const [sendNeutralVotesOnVideos, setSendNeutralVotesOnVideos] = useState(true)
        const [sendDownvotesOnVideos, setSendDownvotesOnVideos] = useState(true)
        const [sendUpvotesOnPolls, setSendUpvotesOnPolls] = useState(true)
        const [sendNeutralVotesOnPolls, setSendNeutralVotesOnPolls] = useState(true)
        const [sendDownvotesOnPolls, setSendDownvotesOnPolls] = useState(true)
        const [sendUpvotesOnThreads, setSendUpvotesOnThreads] = useState(true)
        const [sendNeutralVotesOnThreads, setSendNeutralVotesOnThreads] = useState(true)
        const [sendDownvotesOnThreads, setSendDownvotesOnThreads] = useState(true)
        const [sendJoiningCategory, setSendJoiningCategory] = useState(true)
        //
        const [showSettings, setShowSettings] = useState(false)
        
        const marginVerticalOnSwitches = 4.9
        const fontSizeForText = 15
    
        const setContextAndAsyncStorage = (type) => {
            type == 'TextMessages' ? setTextMessages(textMessages => !textMessages)
            : type == 'UpvotesOnPosts' ? setUpvotesOnPosts(upvotesOnPolls => !upvotesOnPolls)
            : type == 'NeutralVotesOnPosts' ? setNeutralVotesOnPosts(neutralVotesOnPosts => !neutralVotesOnPosts)
            : type == 'DownvotesOnPosts' ? setDownvotesOnPosts(downvotesOnPosts => !downvotesOnPosts)
            : type == 'UpvotesOnVideos' ? setUpvotesOnVideos(upvotesOnVideos => !upvotesOnVideos)
            : type == 'NeutralVotesOnVideos' ? setNeutralVotesOnVideos(neutralVotesOnVideos => !neutralVotesOnVideos)
            : type == 'DownvotesOnVideos' ? setDownvotesOnVideos(downvotesOnVideos => !downvotesOnVideos)
            : type == 'UpvotesOnPolls' ? setUpvotesOnPolls(upvotesOnPolls => !upvotesOnPolls)
            : type == 'NeutralVotesOnPolls' ? setNeutralVotesOnPolls(neutralVotesOnPolls => !neutralVotesOnPolls)
            : type == 'DownvotesOnPolls' ? setDownvotesOnPolls(downvotesOnPolls => !downvotesOnPolls)
            : type == 'UpvotesOnThreads' ? setUpvotesOnThreads(upvotesOnThreads => !upvotesOnThreads)
            : type == 'NeutralVotesOnThreads' ? setNeutralVotesOnThreads(neutralVotesOnThreads => !neutralVotesOnThreads)
            : type == 'DownvotesOnThreads' ? setDownvotesOnThreads(downvotesOnThreads => !downvotesOnThreads)
            : type == 'PersonJoiningCategory' ? setPersonJoiningCategory(personJoiningCategory => !personJoiningCategory)
            : type == 'SendTextMessages' ? setSendTextMessages(sendTextMessages => !sendTextMessages)
            : type == 'SendUpvotesOnPosts' ? setSendUpvotesOnPosts(sendUpvotesOnPolls => !sendUpvotesOnPolls)
            : type == 'SendNeutralVotesOnPosts' ? setSendNeutralVotesOnPosts(sendNeutralVotesOnPosts => !sendNeutralVotesOnPosts)
            : type == 'SendDownvotesOnPosts' ? setSendDownvotesOnPosts(sendDownvotesOnPosts => !sendDownvotesOnPosts)
            : type == 'SendUpvotesOnVideos' ? setSendUpvotesOnVideos(sendUpvotesOnVideos => !sendUpvotesOnVideos)
            : type == 'SendNeutralVotesOnVideos' ? setSendNeutralVotesOnVideos(sendNeutralVotesOnVideos => !sendNeutralVotesOnVideos)
            : type == 'SendDownvotesOnVideos' ? setSendDownvotesOnVideos(sendDownvotesOnVideos => !sendDownvotesOnVideos)
            : type == 'SendUpvotesOnPolls' ? setSendUpvotesOnPolls(sendUpvotesOnPolls => !sendUpvotesOnPolls)
            : type == 'SendNeutralVotesOnPolls' ? setSendNeutralVotesOnPolls(sendNeutralVotesOnPolls => !sendNeutralVotesOnPolls)
            : type == 'SendDownvotesOnPolls' ? setSendDownvotesOnPolls(sendDownvotesOnPolls => !sendDownvotesOnPolls)
            : type == 'SendUpvotesOnThreads' ? setSendUpvotesOnThreads(sendUpvotesOnThreads => !sendUpvotesOnThreads)
            : type == 'SendNeutralVotesOnThreads' ? setSendNeutralVotesOnThreads(sendNeutralVotesOnThreads => !sendNeutralVotesOnThreads)
            : type == 'SendDownvotesOnThreads' ? setSendDownvotesOnThreads(sendDownvotesOnThreads => !sendDownvotesOnThreads)
            : type == 'SendJoiningCategory' ? setSendJoiningCategory(sendJoiningCategory => !sendJoiningCategory)
            : console.error('Wrong type has been passed to setContextAndAsyncStorage function in NotificationSettings')
            const settingsObject = {
                TextMessages: type == 'TextMessages' ? !textMessages : textMessages,
                UpvotesOnPosts: type == 'UpvotesOnPosts' ? !upvotesOnPosts : upvotesOnPosts,
                NeutralVotesOnPosts: type == 'NeutralVotesOnPosts' ? !neutralVotesOnPosts : neutralVotesOnPosts,
                DownvotesOnPosts: type == 'DownvotesOnPosts' ? !downvotesOnPosts : downvotesOnPosts,
                UpvotesOnVideos: type == 'UpvotesOnVideos' ? !upvotesOnVideos : upvotesOnVideos,
                NeutralVotesOnVideos: type == 'NeutralVotesOnVideos' ? !neutralVotesOnVideos : neutralVotesOnVideos,
                DownvotesOnVideos: type == 'DownvotesOnVideos' ? !downvotesOnVideos : downvotesOnVideos,
                UpvotesOnPolls: type == 'UpvotesOnPolls' ? !upvotesOnPolls : upvotesOnPolls,
                NeutralVotesOnPolls: type == 'NeutralVotesOnPolls' ? !neutralVotesOnPolls : neutralVotesOnPolls,
                DownvotesOnPolls: type == 'DownvotesOnPolls' ? !downvotesOnPolls : downvotesOnPolls,
                UpvotesOnThreads: type == 'UpvotesOnThreads' ? !upvotesOnThreads : upvotesOnThreads,
                NeutralVotesOnThreads: type == 'NeutralVotesOnThreads' ? !neutralVotesOnThreads : neutralVotesOnThreads,
                DownvotesOnThreads: type == 'DownvotesOnThreads' ? !downvotesOnThreads : downvotesOnThreads,
                PersonJoiningCategory: type == 'PersonJoiningCategory' ? !personJoiningCategory : personJoiningCategory,
                SendTextMessages: type == 'SendTextMessages' ? !sendTextMessages : sendTextMessages,
                SendUpvotesOnPosts: type == 'SendUpvotesOnPosts' ? !sendUpvotesOnPosts : sendUpvotesOnPosts,
                SendNeutralVotesOnPosts: type == 'SendNeutralVotesOnPosts' ? !sendNeutralVotesOnPosts : sendNeutralVotesOnPosts,
                SendDownvotesOnPosts: type == 'SendDownvotesOnPosts' ? !sendDownvotesOnPosts : sendDownvotesOnPosts,
                SendUpvotesOnVideos: type == 'SendUpvotesOnVideos' ? !sendUpvotesOnVideos : sendUpvotesOnVideos,
                SendNeutralVotesOnVideos: type == 'SendNeutralVotesOnVideos' ? !sendNeutralVotesOnVideos : sendNeutralVotesOnVideos,
                SendDownvotesOnVideos: type == 'SendDownvotesOnVideos' ? !sendDownvotesOnVideos : sendDownvotesOnVideos,
                SendUpvotesOnPolls: type == 'SendUpvotesOnPolls' ? !sendUpvotesOnPolls : sendUpvotesOnPolls,
                SendNeutralVotesOnPolls: type == 'SendNeutralVotesOnPolls' ? !sendNeutralVotesOnPolls : sendNeutralVotesOnPolls,
                SendDownvotesOnPolls: type == 'SendDownvotesOnPolls' ? !sendDownvotesOnPolls : sendDownvotesOnPolls,
                SendUpvotesOnThreads: type == 'SendUpvotesOnThreads' ? !sendUpvotesOnThreads : sendUpvotesOnThreads,
                SendNeutralVotesOnThreads: type == 'SendNeutralVotesOnThreads' ? !sendNeutralVotesOnThreads : sendNeutralVotesOnThreads,
                SendDownvotesOnThreads: type == 'SendDownvotesOnThreads' ? !sendDownvotesOnThreads : sendDownvotesOnThreads,
                SendJoiningCategory: type == 'SendJoiningCategory' ? !sendJoiningCategory : sendJoiningCategory
            }
            AsyncStorage.setItem('NotificationsSettings', JSON.stringify(settingsObject))
        }
    
        const turnOnAllReceiveNotifications = async () => {
            setTextMessages(true)
            setUpvotesOnPosts(true)
            setNeutralVotesOnPosts(true)
            setDownvotesOnPosts(true)
            setUpvotesOnVideos(true)
            setNeutralVotesOnVideos(true)
            setDownvotesOnVideos(true)
            setUpvotesOnPolls(true)
            setNeutralVotesOnPolls(true)
            setDownvotesOnPolls(true)
            setUpvotesOnThreads(true)
            setNeutralVotesOnThreads(true)
            setDownvotesOnThreads(true)
            setPersonJoiningCategory(true)
            const asyncStorageData = JSON.parse(await AsyncStorage.getItem('NotificationsSettings'));
            const settingsObject = {
                TextMessages: true,
                UpvotesOnPosts: true,
                NeutralVotesOnPosts: true,
                DownvotesOnPosts: true,
                UpvotesOnVideos: true,
                NeutralVotesOnVideos: true,
                DownvotesOnVideos: true,
                UpvotesOnPolls: true,
                NeutralVotesOnPolls: true,
                DownvotesOnPolls: true,
                UpvotesOnThreads: true,
                NeutralVotesOnThreads: true,
                DownvotesOnThreads: true,
                PersonJoiningCategory: true,
                SendTextMessages: asyncStorageData.SendTextMessages,
                SendUpvotesOnPosts: asyncStorageData.SendUpvotesOnPosts,
                SendNeutralVotesOnPosts: asyncStorageData.SendNeutralVotesOnPosts,
                SendDownvotesOnPosts: asyncStorageData.SendDownvotesOnPosts,
                SendUpvotesOnVideos: asyncStorageData.SendUpvotesOnVideos,
                SendNeutralVotesOnVideos: asyncStorageData.SendNeutralVotesOnVideos,
                SendDownvotesOnVideos: asyncStorageData.SendDownvotesOnVideos,
                SendUpvotesOnPolls: asyncStorageData.SendUpvotesOnPolls,
                SendNeutralVotesOnPolls: asyncStorageData.SendNeutralVotesOnPolls,
                SendDownvotesOnPolls: asyncStorageData.SendDownvotesOnPolls,
                SendUpvotesOnThreads: asyncStorageData.SendUpvotesOnThreads,
                SendNeutralVotesOnThreads: asyncStorageData.SendNeutralVotesOnThreads,
                SendDownvotesOnThreads: asyncStorageData.SendDownvotesOnThreads,
                SendJoiningCategory: asyncStorageData.SendJoiningCategory
            }
            AsyncStorage.setItem('NotificationsSettings', JSON.stringify(settingsObject))
        }
    
        const turnOffAllReceiveNotifications = async () => {
            setTextMessages(false)
            setUpvotesOnPosts(false)
            setNeutralVotesOnPosts(false)
            setDownvotesOnPosts(false)
            setUpvotesOnVideos(false)
            setNeutralVotesOnVideos(false)
            setDownvotesOnVideos(false)
            setUpvotesOnPolls(false)
            setNeutralVotesOnPolls(false)
            setDownvotesOnPolls(false)
            setUpvotesOnThreads(false)
            setNeutralVotesOnThreads(false)
            setDownvotesOnThreads(false)
            setPersonJoiningCategory(false)
            const asyncStorageData = JSON.parse(await AsyncStorage.getItem('NotificationsSettings'));
            const settingsObject = {
                TextMessages: false,
                UpvotesOnPosts: false,
                NeutralVotesOnPosts: false,
                DownvotesOnPosts: false,
                UpvotesOnVideos: false,
                NeutralVotesOnVideos: false,
                DownvotesOnVideos: false,
                UpvotesOnPolls: false,
                NeutralVotesOnPolls: false,
                DownvotesOnPolls: false,
                UpvotesOnThreads: false,
                NeutralVotesOnThreads: false,
                DownvotesOnThreads: false,
                PersonJoiningCategory: false,
                SendTextMessages: asyncStorageData.SendTextMessages,
                SendUpvotesOnPosts: asyncStorageData.SendUpvotesOnPosts,
                SendNeutralVotesOnPosts: asyncStorageData.SendNeutralVotesOnPosts,
                SendDownvotesOnPosts: asyncStorageData.SendDownvotesOnPosts,
                SendUpvotesOnVideos: asyncStorageData.SendUpvotesOnVideos,
                SendNeutralVotesOnVideos: asyncStorageData.SendNeutralVotesOnVideos,
                SendDownvotesOnVideos: asyncStorageData.SendDownvotesOnVideos,
                SendUpvotesOnPolls: asyncStorageData.SendUpvotesOnPolls,
                SendNeutralVotesOnPolls: asyncStorageData.SendNeutralVotesOnPolls,
                SendDownvotesOnPolls: asyncStorageData.SendDownvotesOnPolls,
                SendUpvotesOnThreads: asyncStorageData.SendUpvotesOnThreads,
                SendNeutralVotesOnThreads: asyncStorageData.SendNeutralVotesOnThreads,
                SendDownvotesOnThreads: asyncStorageData.SendDownvotesOnThreads,
                SendJoiningCategory: asyncStorageData.SendJoiningCategory
            }
            AsyncStorage.setItem('NotificationsSettings', JSON.stringify(settingsObject))
        }
    
        const turnOnAllSendNotifications = async () => {
            setSendTextMessages(true)
            setSendUpvotesOnPosts(true)
            setSendNeutralVotesOnPosts(true)
            setSendDownvotesOnPosts(true)
            setSendUpvotesOnVideos(true)
            setSendNeutralVotesOnVideos(true)
            setSendDownvotesOnVideos(true)
            setSendUpvotesOnPolls(true)
            setSendNeutralVotesOnPolls(true)
            setSendDownvotesOnPolls(true)
            setSendUpvotesOnThreads(true)
            setSendNeutralVotesOnThreads(true)
            setSendDownvotesOnThreads(true)
            setSendJoiningCategory(true)
            const asyncStorageData = JSON.parse(await AsyncStorage.getItem('NotificationsSettings'));
            const settingsObject = {
                TextMessages: asyncStorageData.TextMessages,
                UpvotesOnPosts: asyncStorageData.UpvotesOnPosts,
                NeutralVotesOnPosts: asyncStorageData.NeutralVotesOnPosts,
                DownvotesOnPosts: asyncStorageData.DownvotesOnPosts,
                UpvotesOnVideos: asyncStorageData.UpvotesOnVideos,
                NeutralVotesOnVideos: asyncStorageData.NeutralVotesOnVideos,
                DownvotesOnVideos: asyncStorageData.DownvotesOnVideos,
                UpvotesOnPolls: asyncStorageData.UpvotesOnPolls,
                NeutralVotesOnPolls: asyncStorageData.NeutralVotesOnPolls,
                DownvotesOnPolls: asyncStorageData.DownvotesOnPolls,
                UpvotesOnThreads: asyncStorageData.UpvotesOnThreads,
                NeutralVotesOnThreads: asyncStorageData.NeutralVotesOnThreads,
                DownvotesOnThreads: asyncStorageData.DownvotesOnThreads,
                PersonJoiningCategory: asyncStorageData.PersonJoiningCategory,
                SendTextMessages: true,
                SendUpvotesOnPosts: true,
                SendNeutralVotesOnPosts: true,
                SendDownvotesOnPosts: true,
                SendUpvotesOnVideos: true,
                SendNeutralVotesOnVideos: true,
                SendDownvotesOnVideos: true,
                SendUpvotesOnPolls: true,
                SendNeutralVotesOnPolls: true,
                SendDownvotesOnPolls: true,
                SendUpvotesOnThreads: true,
                SendNeutralVotesOnThreads: true,
                SendDownvotesOnThreads: true,
                SendJoiningCategory: true
            }
            AsyncStorage.setItem('NotificationsSettings', JSON.stringify(settingsObject))
        }
    
        const turnOffAllSendNotifications = async () => {
            setSendTextMessages(false)
            setSendUpvotesOnPosts(false)
            setSendNeutralVotesOnPosts(false)
            setSendDownvotesOnPosts(false)
            setSendUpvotesOnVideos(false)
            setSendNeutralVotesOnVideos(false)
            setSendDownvotesOnVideos(false)
            setSendUpvotesOnPolls(false)
            setSendNeutralVotesOnPolls(false)
            setSendDownvotesOnPolls(false)
            setSendUpvotesOnThreads(false)
            setSendNeutralVotesOnThreads(false)
            setSendDownvotesOnThreads(false)
            setSendJoiningCategory(false)
            const asyncStorageData = JSON.parse(await AsyncStorage.getItem('NotificationsSettings'));
            const settingsObject = {
                TextMessages: asyncStorageData.TextMessages,
                UpvotesOnPosts: asyncStorageData.UpvotesOnPosts,
                NeutralVotesOnPosts: asyncStorageData.NeutralVotesOnPosts,
                DownvotesOnPosts: asyncStorageData.DownvotesOnPosts,
                UpvotesOnVideos: asyncStorageData.UpvotesOnVideos,
                NeutralVotesOnVideos: asyncStorageData.NeutralVotesOnVideos,
                DownvotesOnVideos: asyncStorageData.DownvotesOnVideos,
                UpvotesOnPolls: asyncStorageData.UpvotesOnPolls,
                NeutralVotesOnPolls: asyncStorageData.NeutralVotesOnPolls,
                DownvotesOnPolls: asyncStorageData.DownvotesOnPolls,
                UpvotesOnThreads: asyncStorageData.UpvotesOnThreads,
                NeutralVotesOnThreads: asyncStorageData.NeutralVotesOnThreads,
                DownvotesOnThreads: asyncStorageData.DownvotesOnThreads,
                PersonJoiningCategory: asyncStorageData.PersonJoiningCategory,
                SendTextMessages: false,
                SendUpvotesOnPosts: false,
                SendNeutralVotesOnPosts: false,
                SendDownvotesOnPosts: false,
                SendUpvotesOnVideos: false,
                SendNeutralVotesOnVideos: false,
                SendDownvotesOnVideos: false,
                SendUpvotesOnPolls: false,
                SendNeutralVotesOnPolls: false,
                SendDownvotesOnPolls: false,
                SendUpvotesOnThreads: false,
                SendNeutralVotesOnThreads: false,
                SendDownvotesOnThreads: false,
                SendJoiningCategory: false
            }
            AsyncStorage.setItem('NotificationsSettings', JSON.stringify(settingsObject))
        }
    
        useEffect(() => {
            async function getNotificationsSettings() {
                await AsyncStorage.getItem('NotificationsSettings').then((data) => {
                    if (data == null) {
                        turnOnAllSendNotifications()
                        turnOnAllReceiveNotifications()
                        const settingsObject = {
                            TextMessages: true,
                            UpvotesOnPosts: true,
                            NeutralVotesOnPosts: true,
                            DownvotesOnPosts: true,
                            UpvotesOnVideos: true,
                            NeutralVotesOnVideos: true,
                            DownvotesOnVideos: true,
                            UpvotesOnPolls: true,
                            NeutralVotesOnPolls: true,
                            DownvotesOnPolls: true,
                            UpvotesOnThreads: true,
                            NeutralVotesOnThreads: true,
                            DownvotesOnThreads: true,
                            PersonJoiningCategory: true,
                            SendTextMessages: true,
                            SendUpvotesOnPosts: true,
                            SendNeutralVotesOnPosts: true,
                            SendDownvotesOnPosts: true,
                            SendUpvotesOnVideos: true,
                            SendNeutralVotesOnVideos: true,
                            SendDownvotesOnVideos: true,
                            SendUpvotesOnPolls: true,
                            SendNeutralVotesOnPolls: true,
                            SendDownvotesOnPolls: true,
                            SendUpvotesOnThreads: true,
                            SendNeutralVotesOnThreads: true,
                            SendDownvotesOnThreads: true,
                            SendJoiningCategory: true
                        }
                        AsyncStorage.setItem('NotificationsSettings', JSON.stringify(settingsObject))
                        setShowSettings(true)
                    } else {
                        let dataToStringify = {}
                        let dataParsed = JSON.parse(data)
                        if (dataParsed.TextMessages == undefined) {
                            dataToStringify.TextMessages = true
                            setTextMessages(true)
                        } else {
                            dataToStringify.TextMessages = dataParsed.TextMessages
                            setTextMessages(dataParsed.TextMessages)
                        }
                        if (dataParsed.UpvotesOnPosts == undefined) {
                            dataToStringify.UpvotesOnPosts = true;
                            setUpvotesOnPosts(true)
                        } else {
                            dataToStringify.UpvotesOnPosts = dataParsed.UpvotesOnPosts
                            setUpvotesOnPosts(dataParsed.UpvotesOnPosts)
                        }
                        if (dataParsed.NeutralVotesOnPosts == undefined) {
                            dataToStringify.NeutralVotesOnPosts = true
                            setNeutralVotesOnPosts(true)
                        } else {
                            dataToStringify.NeutralVotesOnPosts = dataParsed.NeutralVotesOnPosts
                            setNeutralVotesOnPosts(dataParsed.NeutralVotesOnPosts)
                        }
                        if (dataParsed.DownvotesOnPosts == undefined) {
                            dataToStringify.DownvotesOnPosts = true
                            setDownvotesOnPosts(true)
                        } else {
                            dataToStringify.DownvotesOnPosts = dataParsed.DownvotesOnPosts
                            setDownvotesOnPosts(dataParsed.DownvotesOnPosts)
                        }
                        if (dataParsed.UpvotesOnVideos == undefined) {
                            dataToStringify.UpvotesOnVideos = true
                            setUpvotesOnVideos(true)
                        } else {
                            dataToStringify.UpvotesOnVideos = dataParsed.UpvotesOnVideos
                            setUpvotesOnVideos(dataParsed.UpvotesOnVideos)
                        }
                        if (dataParsed.NeutralVotesOnVideos == undefined) {
                            dataToStringify.NeutralVotesOnVideos = true
                            setNeutralVotesOnVideos(true)
                        } else {
                            dataToStringify.NeutralVotesOnVideos = dataParsed.NeutralVotesOnVideos
                            setNeutralVotesOnVideos(dataParsed.NeutralVotesOnVideos)
                        }
                        if (dataParsed.DownvotesOnVideos == undefined) {
                            dataToStringify.DownvotesOnVideos = true
                            setDownvotesOnVideos(true)
                        } else {
                            dataToStringify.DownvotesOnVideos = dataParsed.DownvotesOnVideos
                            setDownvotesOnVideos(dataParsed.DownvotesOnVideos)
                        }
                        if (dataParsed.UpvotesOnPolls == undefined) {
                            dataToStringify.UpvotesOnPolls = true
                            setUpvotesOnPolls(true)
                        } else {
                            dataToStringify.UpvotesOnPolls = dataParsed.UpvotesOnPolls
                            setUpvotesOnPolls(dataParsed.UpvotesOnPolls)
                        }
                        if (dataParsed.NeutralVotesOnPolls == undefined) {
                            dataToStringify.NeutralVotesOnPolls = true
                            setNeutralVotesOnPolls(true)
                        } else {
                            dataToStringify.NeutralVotesOnPolls = dataParsed.NeutralVotesOnPolls
                            setNeutralVotesOnPolls(dataParsed.NeutralVotesOnPolls)
                        }
                        if (dataParsed.DownvotesOnPolls == undefined) {
                            dataToStringify.DownvotesOnPolls = true
                            setDownvotesOnPolls(true)
                        } else {
                            dataToStringify.DownvotesOnPolls = dataParsed.DownvotesOnPolls
                            setDownvotesOnPolls(dataParsed.DownvotesOnPolls)
                        }
                        if (dataParsed.UpvotesOnThreads == undefined) {
                            dataToStringify.UpvotesOnThreads = true
                            setUpvotesOnThreads(true)
                        } else {
                            dataToStringify.UpvotesOnThreads = dataParsed.UpvotesOnThreads
                            setUpvotesOnThreads(dataParsed.UpvotesOnThreads)
                        }
                        if (dataParsed.NeutralVotesOnThreads == undefined) {
                            dataToStringify.NeutralVotesOnThreads = true
                            setNeutralVotesOnThreads(true)
                        } else {
                            dataToStringify.NeutralVotesOnThreads = dataParsed.NeutralVotesOnThreads
                            setNeutralVotesOnThreads(dataParsed.NeutralVotesOnThreads)
                        }
                        if (dataParsed.DownvotesOnThreads == undefined) {
                            dataToStringify.DownvotesOnThreads = true
                            setDownvotesOnThreads(true)
                        } else {
                            dataToStringify.DownvotesOnThreads = dataParsed.DownvotesOnThreads
                            setDownvotesOnThreads(dataParsed.DownvotesOnThreads)
                        }
                        if (dataParsed.PersonJoiningCategory == undefined) {
                            dataToStringify.PersonJoiningCategory = true
                            setPersonJoiningCategory(true)
                        } else {
                            dataToStringify.PersonJoiningCategory = dataParsed.PersonJoiningCategory
                            setPersonJoiningCategory(dataParsed.PersonJoiningCategory)
                        }
                        if (dataParsed.SendTextMessages == undefined) {
                            dataToStringify.SendTextMessages = true
                            setSendTextMessages(true)
                        } else {
                            dataToStringify.SendTextMessages = dataParsed.SendTextMessages
                            setSendTextMessages(dataParsed.SendTextMessages)
                        }
                        if (dataParsed.SendUpvotesOnPosts == undefined) {
                            dataToStringify.SendUpvotesOnPosts = true
                            setSendUpvotesOnPosts(true)
                        } else {
                            dataToStringify.SendUpvotesOnPosts = dataParsed.SendUpvotesOnPosts
                            setSendUpvotesOnPosts(dataParsed.SendUpvotesOnPosts)
                        }
                        if (dataParsed.SendNeutralVotesOnPosts == undefined) {
                            dataToStringify.SendNeutralVotesOnPosts = true
                            setSendNeutralVotesOnPosts(true)
                        } else {
                            dataToStringify.SendNeutralVotesOnPosts = dataParsed.SendNeutralVotesOnPosts
                            setSendNeutralVotesOnPosts(dataParsed.SendNeutralVotesOnPosts)
                        }
                        if (dataParsed.SendDownvotesOnPosts == undefined) {
                            dataToStringify.SendDownvotesOnPosts = true
                            setSendDownvotesOnPosts(true)
                        } else {
                            dataToStringify.SendDownvotesOnPosts = dataParsed.SendDownvotesOnPosts
                            setSendDownvotesOnPosts(dataParsed.SendDownvotesOnPosts)
                        }
                        if (dataParsed.SendUpvotesOnVideos == undefined) {
                            dataToStringify.SendUpvotesOnVideos = true
                            setSendUpvotesOnVideos(true)
                        } else {
                            dataToStringify.SendUpvotesOnVideos = dataParsed.SendUpvotesOnVideos
                            setSendUpvotesOnVideos(dataParsed.SendUpvotesOnVideos)
                        }
                        if (dataParsed.SendNeutralVotesOnVideos == undefined) {
                            dataToStringify.SendNeutralVotesOnVideos = true
                            setSendNeutralVotesOnVideos(true)
                        } else {
                            dataToStringify.SendNeutralVotesOnVideos = dataParsed.SendNeutralVotesOnVideos
                            setSendNeutralVotesOnVideos(dataParsed.SendNeutralVotesOnVideos)
                        }
                        if (dataParsed.SendDownvotesOnVideos == undefined) {
                            dataToStringify.SendDownvotesOnVideos = true
                            setSendDownvotesOnVideos(true)
                        } else {
                            dataToStringify.SendDownvotesOnVideos = dataParsed.SendDownvotesOnVideos
                            setSendDownvotesOnVideos(dataParsed.SendDownvotesOnVideos)
                        }
                        if (dataParsed.SendUpvotesOnPolls == undefined) {
                            dataToStringify.SendUpvotesOnPolls = true
                            setSendUpvotesOnPolls(true)
                        } else {
                            dataToStringify.SendUpvotesOnPolls = dataParsed.SendUpvotesOnPolls
                            setSendUpvotesOnPolls(dataParsed.SendUpvotesOnPolls)
                        }
                        if (dataParsed.SendNeutralVotesOnPolls == undefined) {
                            dataToStringify.SendNeutralVotesOnPolls = true
                            setSendNeutralVotesOnPolls(true)
                        } else {
                            dataToStringify.SendNeutralVotesOnPolls = dataParsed.SendNeutralVotesOnPolls
                            setSendNeutralVotesOnPolls(dataParsed.SendNeutralVotesOnPolls)
                        }
                        if (dataParsed.SendDownvotesOnPolls == undefined) {
                            dataToStringify.SendDownvotesOnPolls = true
                            setSendDownvotesOnPolls(true)
                        } else {
                            dataToStringify.SendDownvotesOnPolls = dataParsed.SendDownvotesOnPolls
                            setSendDownvotesOnPolls(dataParsed.SendDownvotesOnPolls)
                        }
                        if (dataParsed.SendUpvotesOnThreads == undefined) {
                            dataToStringify.SendUpvotesOnThreads = true
                            setSendUpvotesOnThreads(true)
                        } else {
                            dataToStringify.SendUpvotesOnThreads = dataParsed.SendUpvotesOnThreads
                            setSendUpvotesOnThreads(dataParsed.SendUpvotesOnThreads)
                        }
                        if (dataParsed.SendNeutralVotesOnThreads == undefined) {
                            dataToStringify.SendNeutralVotesOnThreads = true
                            setSendNeutralVotesOnThreads(true)
                        } else {
                            dataToStringify.SendNeutralVotesOnThreads = dataParsed.SendNeutralVotesOnThreads
                            setSendNeutralVotesOnThreads(dataParsed.SendNeutralVotesOnThreads)
                        }
                        if (dataParsed.SendDownvotesOnThreads == undefined) {
                            dataToStringify.SendDownvotesOnThreads = true
                            setSendDownvotesOnThreads(true)
                        } else {
                            dataToStringify.SendDownvotesOnThreads = dataParsed.SendDownvotesOnThreads
                            setSendDownvotesOnThreads(dataParsed.SendDownvotesOnThreads)
                        }
                        if (dataParsed.SendJoiningCategory == undefined) {
                            dataToStringify.SendJoiningCategory = true
                            setSendJoiningCategory(true)
                        } else {
                            dataToStringify.SendJoiningCategory = dataParsed.SendJoiningCategory
                            setSendJoiningCategory(dataParsed.SendJoiningCategory)
                        }
                        AsyncStorage.setItem('NotificationSettings', JSON.stringify(dataToStringify)).catch((e) => {console.error(e)})
                        setShowSettings(true)
                    }
                }).catch((e) => console.error(e))
            }
            getNotificationsSettings()
        }, [])
        return(
            <> 
                <BackgroundDarkColor style={{backgroundColor: colors.primary}}>
                    <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                        <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                            <Image
                            source={require('../assets/app_icons/back_arrow.png')}
                            style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                            resizeMode="contain"
                            resizeMethod="resize"
                            />
                        </Navigator_BackButton>
                        <TestText style={{textAlign: 'center', color: colors.tertiary}}>Notifications Settings</TestText>
                    </ChatScreen_Title>
                    <ScrollView>
                        <WelcomeContainer style={{backgroundColor: colors.primary, marginTop: -50}}>
                            <Avatar resizeMode="cover" source={{uri: profilePictureUri}} />
                            {showSettings == true ?
                                <>
                                    <TestText style={{textAlign: 'center', color: colors.tertiary}}>Receive notifications</TestText>
                                    <View style={{flexDirection: 'row'}}>
                                        <TextLink onPress={turnOnAllReceiveNotifications}>
                                            <TextLinkContent style={{color: colors.brand, fontSize: 22}}>Turn On All</TextLinkContent>
                                        </TextLink>
                                        <TextLink style={{marginLeft: 50}} onPress={turnOffAllReceiveNotifications}>
                                            <TextLinkContent style={{color: colors.brand, fontSize: 22}}>Turn Off All</TextLinkContent>
                                        </TextLink>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{flexDirection: 'column', flex: 1}}>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Text Messages</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on your posts</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on your posts</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on your posts</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on your videos</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on your videos</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on your videos</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on your polls</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on your polls</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on your polls</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on your threads</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on your threads</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on your threads</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Person joining a category you are in</Text>
                                        </View>
                                        <View style={{flex: 0.3, flexDirection: 'column', alignItems: 'center'}}>
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={textMessages ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('TextMessages')}}
                                                value={textMessages}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={upvotesOnPosts ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('UpvotesOnPosts')}}
                                                value={upvotesOnPosts}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={neutralVotesOnPosts ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('NeutralVotesOnPosts')}}
                                                value={neutralVotesOnPosts}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={downvotesOnPosts ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('DownvotesOnPosts')}}
                                                value={downvotesOnPosts}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={upvotesOnVideos ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('UpvotesOnVideos')}}
                                                value={upvotesOnVideos}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={neutralVotesOnVideos ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('NeutralVotesOnVideos')}}
                                                value={neutralVotesOnVideos}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={downvotesOnVideos ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('DownvotesOnVideos')}}
                                                value={downvotesOnVideos}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={upvotesOnPolls ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('UpvotesOnPolls')}}
                                                value={upvotesOnPolls}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={neutralVotesOnPolls ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('NeutralVotesOnPolls')}}
                                                value={neutralVotesOnPolls}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={downvotesOnPolls ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('DownvotesOnPolls')}}
                                                value={downvotesOnPolls}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={upvotesOnThreads ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('UpvotesOnThreads')}}
                                                value={upvotesOnThreads}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={neutralVotesOnThreads ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('NeutralVotesOnThreads')}}
                                                value={neutralVotesOnThreads}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={downvotesOnThreads ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('DownvotesOnThreads')}}
                                                value={downvotesOnThreads}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={personJoiningCategory ? colors.teritary : colors.primary}
                                                ios_backgroundColor={colors.teritary}
                                                onValueChange={() => {setContextAndAsyncStorage('PersonJoiningCategory')}}
                                                value={personJoiningCategory}
                                            />
                                        </View>
                                    </View>
                                    <TestText style={{textAlign: 'center', color: colors.tertiary}}>Send notifications</TestText>
                                    <View style={{flexDirection: 'row'}}>
                                        <TextLink onPress={turnOnAllSendNotifications}>
                                            <TextLinkContent style={{color: colors.brand, fontSize: 22}}>Turn On All</TextLinkContent>
                                        </TextLink>
                                        <TextLink style={{marginLeft: 50}} onPress={turnOffAllSendNotifications}>
                                            <TextLinkContent style={{color: colors.brand, fontSize: 22}}>Turn Off All</TextLinkContent>
                                        </TextLink>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{flexDirection: 'column', flex: 1}}>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Text Messages</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on posts</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on posts</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on posts</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on videos</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on videos</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on videos</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on polls</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on polls</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on polls</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on threads</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on threads</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on threads</Text>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>You joining a category</Text>
                                        </View>
                                        <View style={{flex: 0.3, flexDirection: 'column', alignItems: 'center'}}>
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendTextMessages ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onValueChange={() => {setContextAndAsyncStorage('SendTextMessages')}}
                                                value={sendTextMessages}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendUpvotesOnPosts ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onValueChange={() => {setContextAndAsyncStorage('SendUpvotesOnPosts')}}
                                                value={sendUpvotesOnPosts}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendNeutralVotesOnPosts ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onValueChange={() => {setContextAndAsyncStorage('SendNeutralVotesOnPosts')}}
                                                value={sendNeutralVotesOnPosts}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendDownvotesOnPosts ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onValueChange={() => {setContextAndAsyncStorage('SendDownvotesOnPosts')}}
                                                value={sendDownvotesOnPosts}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendUpvotesOnVideos ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onValueChange={() => {setContextAndAsyncStorage('SendUpvotesOnVideos')}}
                                                value={sendUpvotesOnVideos}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendNeutralVotesOnVideos ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onValueChange={() => {setContextAndAsyncStorage('SendNeutralVotesOnVideos')}}
                                                value={sendNeutralVotesOnVideos}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendDownvotesOnVideos ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onValueChange={() => {setContextAndAsyncStorage('SendDownvotesOnVideos')}}
                                                value={sendDownvotesOnVideos}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendUpvotesOnPolls ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onValueChange={() => {setContextAndAsyncStorage('SendUpvotesOnPolls')}}
                                                value={sendUpvotesOnPolls}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendNeutralVotesOnPolls ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onValueChange={() => {setContextAndAsyncStorage('SendNeutralVotesOnPolls')}}
                                                value={sendNeutralVotesOnPolls}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendDownvotesOnPolls ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onValueChange={() => {setContextAndAsyncStorage('SendDownvotesOnPolls')}}
                                                value={sendDownvotesOnPolls}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendUpvotesOnThreads ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onValueChange={() => {setContextAndAsyncStorage('SendUpvotesOnThreads')}}
                                                value={sendUpvotesOnThreads}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendNeutralVotesOnThreads ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onValueChange={() => {setContextAndAsyncStorage('SendNeutralVotesOnThreads')}}
                                                value={sendNeutralVotesOnThreads}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendDownvotesOnThreads ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onValueChange={() => {setContextAndAsyncStorage('SendDownvotesOnThreads')}}
                                                value={sendDownvotesOnThreads}
                                            />
                                            <Switch
                                                trackColor={{ false: colors.borderColor, true: colors.darkestBlue }}
                                                thumbColor={sendJoiningCategory ? colors.tertiary : colors.primary}
                                                ios_backgroundColor={colors.tertiary}
                                                onToggle={() => {setContextAndAsyncStorage('SendJoiningCategory')}}
                                                value={sendJoiningCategory}
                                            />
                                        </View>
                                    </View>
                                </>
                            : <TestText style={{textAlign: 'center', color: colors.tertiary, marginVertical: 30}}>Loading...</TestText>}
                            <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center'}}>?? SquareTable 2022</Text>
                            <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center', marginBottom: 10}}>All Rights Reserved</Text>
                            <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', marginBottom: 10}}>Made by Sebastian Webster, Kovid Dev, Didula Semasinghe, and Jacob Bowden</Text>
                        </WelcomeContainer>
                    </ScrollView>
                </BackgroundDarkColor>
            </>
        );
    } else {
        return(
            <>
                 <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0, height: 'auto', paddingBottom: 5}}>
                    <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                        <Image
                        source={require('../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                        />
                    </Navigator_BackButton>
                    <TestText style={{textAlign: 'center', color: colors.tertiary}}>Multimedia Upload Page</TestText>
                </ChatScreen_Title>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center'}}>Please download the iOS or Android version of SocialSquare or use the SocialSquare website to use this feature</Text>
                </View>
            </>
        );
    }
}

export default NotificationsSettingsScreen;