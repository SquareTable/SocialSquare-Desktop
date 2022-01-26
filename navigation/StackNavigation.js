import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import PostScreen from '../screens/PostScreen';
import ChatScreen from '../screens/PostScreens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RecordAudioPage from '../screens/RecordAudioPage';
import MultiMediaUploadPage from '../screens/PostScreens/MultiMediaUploadPage';
import SettingsPage from '../screens/SettingsScreen';

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
        </Stack.Navigator>
    );
}

export const PostScreenStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="PostScreen" component={PostScreen} options={{headerShown: false}}/>
            <Stack.Screen name="RecordAudioPage" component={RecordAudioPage} options={{headerShown: false}}/>
            <Stack.Screen name="MultiMediaUploadPage" component={MultiMediaUploadPage} options={{headerShown: false}}/>
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
        </Stack.Navigator>
    );
}