import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import PostScreen from '../screens/PostScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RecordAudioPage from '../screens/PostScreens/RecordAudioPage';
import MultiMediaUploadPage from '../screens/PostScreens/MultiMediaUploadPage';
import SettingsPage from '../screens/SettingsScreen';
import PollUploadPage from '../screens/PostScreens/PollUploadPage';
import CategoryCreationPage from '../screens/CategoryCreationPage';
import ThreadUploadPage from '../screens/PostScreens/ThreadUploadPage';
import SelectCategorySearchScreen from '../screens/SelectCategorySearchScreen';
import ProfilePages from '../screens/ProfilePages';
import CategoryViewPage from '../screens/CategoryViewPage';
import ViewImagePostPage from '../screens/ViewImagePostPage';
import ThreadViewPage from '../screens/ThreadViewPage';
import ViewPollPostPage from '../screens/ViewPollPostPage';
import AccountBadges from '../screens/BadgesScreen';
import AppStyling from '../screens/AppStyling';
import AccountSettings from '../screens/AccountSettings';
import ChangeDisplayNamePage from '../screens/ChangeDisplayNamePage';
import ChangeUsernamePage from '../screens/ChangeUsernamePage';
import ChangeEmailPage from '../screens/ChangeEmailPage';
import OtherStyles from '../screens/OtherStyles';
import CustomStylesMenu from '../screens/StylingScreens/CustomStylesMenu';
import EditCustomStyle from '../screens/StylingScreens/EditCustomStyle';
import ColorPickerScreen from '../screens/StylingScreens/ColorPicker';

const Stack = createStackNavigator();

export const HomeScreenStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export const FindScreenStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="FindScreen" component={FindScreen} options={{headerShown: false}}/>
            <Stack.Screen name="ProfilePages" component={ProfilePages} options={{headerShown: false}}/>
            <Stack.Screen name="CategoryViewPage" component={CategoryViewPage} options={{headerShown: false}}/>
            <Stack.Screen name="ViewImagePostPage" component={ViewImagePostPage} options={{headerShown: false}}/>
            <Stack.Screen name="ThreadViewPage" component={ThreadViewPage} options={{headerShown: false}}/>
            <Stack.Screen name="ViewPollPostPage" component={ViewPollPostPage} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export const PostScreenStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="PostScreen" component={PostScreen} options={{headerShown: false}}/>
            <Stack.Screen name="RecordAudioPage" component={RecordAudioPage} options={{headerShown: false}}/>
            <Stack.Screen name="MultiMediaUploadPage" component={MultiMediaUploadPage} options={{headerShown: false}}/>
            <Stack.Screen name="PollUploadPage" component={PollUploadPage} options={{headerShown: false}}/>
            <Stack.Screen name="CategoryCreationPage" component={CategoryCreationPage} options={{headerShown: false}}/>
            <Stack.Screen name="ThreadUploadPage" component={ThreadUploadPage} options={{headerShown: false}}/>
            <Stack.Screen name="SelectCategorySearchScreen" component={SelectCategorySearchScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export const ChatScreenStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export const ProfileScreenStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name='SettingsScreen' component={SettingsPage} options={{headerShown: false}}/>
            <Stack.Screen name="CategoryViewPage" component={CategoryViewPage} options={{headerShown: false}}/>
            <Stack.Screen name="ViewImagePostPage" component={ViewImagePostPage} options={{headerShown: false}}/>
            <Stack.Screen name="ThreadViewPage" component={ThreadViewPage} options={{headerShown: false}}/>
            <Stack.Screen name="ViewPollPostPage" component={ViewPollPostPage} options={{headerShown: false}}/>
            <Stack.Screen name="AccountBadges" component={AccountBadges} options={{headerShown: false}}/>
            <Stack.Screen name="AppStyling" component={AppStyling} options={{headerShown: false}}/>
            <Stack.Screen name="AccountSettings" component={AccountSettings} options={{headerShown: false}}/>
            <Stack.Screen name="ChangeDisplayNamePage" component={ChangeDisplayNamePage} options={{headerShown: false}}/>
            <Stack.Screen name="ChangeUsernamePage" component={ChangeUsernamePage} options={{headerShown: false}}/>
            <Stack.Screen name="ChangeEmailPage" component={ChangeEmailPage} options={{headerShown: false}}/>
            <Stack.Screen name="OtherStyles" component={OtherStyles} options={{headerShown: false}}/>
            <Stack.Screen name="CustomStylesMenu" component={CustomStylesMenu} options={{headerShown: false}}/>
            <Stack.Screen name="EditCustomStyle" component={EditCustomStyle} options={{headerShown: false}}/>
            <Stack.Screen name="ColorPickerScreen" component={ColorPickerScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}