import React, {useContext} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { StoredCredentialsContext } from '../components/StoredCredentialsContext';
import Tabs from './tabs';
import LoginScreen from '../screens/LoginScreen';
import Signup from '../screens/Signup';
import IntroScreen from '../screens/IntroductionScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export const Start_Stack = ({hasOpenedSocialSquare}) => {
    const {storedCredentials, setStoredCredentials} = useContext(StoredCredentialsContext);
    AsyncStorage.setItem('hasOpenedSocialSquare', 'true');
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {hasOpenedSocialSquare == true ?
                storedCredentials ?
                    <>
                        <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}}/>
                    </>
                : 
                    <>
                        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
                    </>
            :
                <>
                    <Stack.Screen name="IntroScreen" component={IntroScreen} options={{headerShown: false}}/>
                </>
            }
        </Stack.Navigator>

    )
}
