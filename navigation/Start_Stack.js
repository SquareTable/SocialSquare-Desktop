import React, {useContext} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { StoredCredentialsContext } from '../components/StoredCredentialsContext';
import Tabs from './tabs';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export const Start_Stack = () => {
    const {storedCredentials, setStoredCredentials} = useContext(StoredCredentialsContext);
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {storedCredentials ?
                <>
                    <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}}/>
                </>
            : 
                <>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
                </>
            }
        </Stack.Navigator>

    )
}
