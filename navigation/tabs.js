import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreenStack, FindScreenStack, PostScreenStack, ChatScreenStack, ProfileScreenStack } from './StackNavigation';
import { useTheme } from '@react-navigation/native';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext';


const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: -2.5,
            justifyContent: 'center',
            alignItems: 'center',
            /*... styles.shadow*/
        }}
        onPress={onPress}
    >
        <View style={{
            width: 50,
            height: 50,
            borderRadius: 35,
            backgroundColor: 'transparent',
        }}>
            {children}
        </View>
    </TouchableOpacity>
);


export const Tabs = ({navigation}) => {
    const {colors} = useTheme()
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext);
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    /*position: 'absolute',*/
                    bottom: 0, /*Change the margin from the bottom of the screen for the tab navigator*/
                    left: 0, /*Change the margin from the left of the screen for the tab navigator*/
                    right: 0, /*Change the margin from the right of the screen for the tab navigator*/
                    elevation: 0,
                    height: 55,
                    backgroundColor: colors.primary,
                    /*...styles.shadow*/
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreenStack} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0, width: 50}}>
                        <Image
                            source={require('../assets/app_icons/home.png')}
                            resizeMode = 'contain'
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? colors.navFocusedColor : colors.navNonFocusedColor
                            }}
                        />
                        <Text style={{color: focused ? colors.navFocusedColor : colors.navNonFocusedColor, fontSize: 10}}>HOME</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Find" component={FindScreenStack} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0, width: 50}}>
                        <Image
                            source={require('../assets/app_icons/find.png')}
                            resizeMode = 'contain'
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? colors.navFocusedColor : colors.navNonFocusedColor
                            }}
                        />
                        <Text style={{color: focused ? colors.navFocusedColor : colors.navNonFocusedColor, fontSize: 10}}>FIND</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Post" component={PostScreenStack} initialParams={{postData: null, postType: null, navigateToHomeScreen: false}}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{width: 50}}>
                        <Image 
                            source={require('../assets/app_icons/test3.png')}
                            resizeMode="contain"
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50/2
                            }}
                        />
                    </View>
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} />
                )
            }}/>
            <Tab.Screen name="Chat" component={ChatScreenStack} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0, width: 50}}>
                        <Image
                            source={require('../assets/app_icons/chat.png')}
                            resizeMode = 'contain'
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? colors.navFocusedColor : colors.navNonFocusedColor
                            }}
                        />
                        <Text style={{color: focused ? colors.navFocusedColor : colors.navNonFocusedColor, fontSize: 10}}>CHAT</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="Profile" component={ProfileScreenStack} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0, width: 50}}>
                        <Image
                            source={{uri: profilePictureUri}}
                            resizeMode = 'contain'
                            style={{
                                width: 35,
                                height: 35,
                                borderWidth: 3,
                                borderColor: focused ? colors.navFocusedColor : colors.navNonFocusedColor,
                                borderRadius: 40/2
                            }}
                        />
                        <Text style={{color: focused ? colors.navFocusedColor : colors.navNonFocusedColor, fontSize: 10}}>PROFILE</Text>
                    </View>
                ),
            }}/>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#88C0D0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tabs;