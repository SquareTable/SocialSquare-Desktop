//import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from "react";
import {View, Text, useColorScheme, Animated, useWindowDimensions, TouchableOpacity, FlatList} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { StoredCredentialsContext } from "./components/StoredCredentialsContext.js";
import { Start_Stack } from './navigation/Start_Stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocialSquareLogo_B64_png from "./assets/SocialSquareLogo_Base64_png";
import { ProfilePictureURIContext } from "./components/ProfilePictureURIContext.js";
import { AllCredentialsStoredContext } from "./components/AllCredentialsStoredContext.js";
import { ShowAccountSwitcherContext } from "./components/ShowAccountSwitcherContext.js";
import NetInfo from "@react-native-community/netinfo";
import { AppStylingContext } from "./components/AppStylingContext.js";
import { HasOpenedSocialSquareContext } from "./components/HasOpenedSocialSquareContext.js";
import { RefreshAppStylingContext } from "./components/RefreshAppStylingContext.js";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useTheme } from '@react-navigation/native';
import { navigationRef } from './components/ReactNavigationRef.js';
import * as AppNavigation from './components/ReactNavigationRef.js';
import {
  Avatar
} from './components/styling.js';
const App = () => {
  const [storedCredentials, setStoredCredentials] = useState(null);
  const [profilePictureUri, setProfilePictureUri] = useState(SocialSquareLogo_B64_png);
  const [allCredentialsStoredList, setAllCredentialsStoredList] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const AppColorScheme = useColorScheme();
  const [AppStylingContextState, setAppStylingContextState] = useState('Default');
  const [hasOpenedSocialSquare, setHasOpenedSocialSquare] = useState(false);
  const [refreshAppStyling, setRefreshAppStyling] = useState(false);
  const [currentSimpleStylingData, setCurrentSimpleStylingData] = useState();
  const previousStylingState = useRef(null)
  const AsyncSimpleStyling_ParsedRef = useRef(null)
  const [AsyncStorageSimpleStylingData, setAsyncStorageSimpleStylingData] = useState()
  const AccountSwitcherY = useRef(new Animated.Value(500)).current;
  const AccountSwitchedBoxY = useRef(new Animated.Value(0)).current;
  const [AccountSwitcherHeight, setAccountSwitcherHeight] = useState(0);
  const DismissAccountSwitcherBoxActivated = useRef(new Animated.Value(0)).current;
  const windowDimensions = useWindowDimensions();

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  const AppDarkTheme = {
    dark: true,
    colors: {
      primary: '#3b4252',
      background: '#3b4252',
      secondary: '#88c0d0',
      tertiary: '#eceff4',
      darkLight: '#4c566a',
      brand: '#88c0d0',
      green: '#A3BE8C',
      red: '#BF616A',
      darkest: '#2e3440',
      greyish: '#D8DEE9',
      bronzeRarity: '#b08d57',
      darkestBlue: '#5E81AC',
      navFocusedColor: '#88C0D0',
      navNonFocusedColor: '#ECEFF4',
      borderColor: '#2E3440',
      orange: '#D08770',
      yellow: '#EBCB8B',
      purple: '#B48EAD',
      slightlyLighterGrey: '#434C5E',
      midWhite: '#E5E9F0',
      slightlyLighterPrimary: '#424a5c',
      descTextColor: '#abafb8',
      errorColor: '#FF0000', //red
      searchScreenType: 'Regular',
    },
  };
  const AppLightTheme = {
    dark: false,
    colors: {
      primary: '#eceff4',
      background: '#eceff4',
      secondary: '#88c0d0',
      tertiary: '#3b4252',
      darkLight: '#4c566a',
      brand: '#81A1C1',
      green: '#A3BE8C',
      red: '#BF616A',
      darkest: '#2e3440',
      greyish: '#D8DEE9',
      bronzeRarity: '#b08d57',
      darkestBlue: '#5E81AC',
      navFocusedColor: '#5E81AC',
      navNonFocusedColor: '#2E3440',
      borderColor: '#D8DEE9',
      orange: '#D08770',
      yellow: '#EBCB8B',
      purple: '#B48EAD',
      slightlyLighterGrey: '#434C5E',
      midWhite: '#E5E9F0',
      slightlyLighterPrimary: '#424a5c',
      descTextColor: '#abafb8',
      errorColor: '#FF0000', //red
      searchScreenType: 'Regular',
    }
  };
  const AppPureDarkTheme = {
    dark: true,
    colors: {
      primary: 'black',
      background: 'black',
      secondary: '#88c0d0',
      tertiary: 'white',
      darkLight: '#4c566a',
      brand: '#81A1C1',
      green: '#A3BE8C',
      red: '#BF616A',
      darkest: '#2e3440',
      greyish: '#D8DEE9',
      bronzeRarity: '#b08d57',
      darkestBlue: '#5E81AC',
      navFocusedColor: '#81A1C1',
      navNonFocusedColor: 'white',
      borderColor: '#D8DEE9',
      orange: '#D08770',
      yellow: '#EBCB8B',
      purple: '#B48EAD',
      slightlyLighterGrey: '#434C5E',
      midWhite: '#E5E9F0',
      slightlyLighterPrimary: '#424a5c',
      descTextColor: '#abafb8',
      errorColor: '#FF0000', //red
      searchScreenType: 'Regular',
    }
  };
  const AppPureLightTheme = {
    dark: false,
    colors: {
      primary: 'white',
      background: 'white',
      secondary: '#88c0d0',
      tertiary: 'black',
      darkLight: '#4c566a',
      brand: '#81A1C1',
      green: '#A3BE8C',
      red: '#BF616A',
      darkest: '#2e3440',
      greyish: '#D8DEE9',
      bronzeRarity: '#b08d57',
      darkestBlue: '#5E81AC',
      navFocusedColor: '#5E81AC',
      navNonFocusedColor: '#2E3440',
      borderColor: '#D8DEE9',
      orange: '#D08770',
      yellow: '#EBCB8B',
      purple: '#B48EAD',
      slightlyLighterGrey: '#434C5E',
      midWhite: '#E5E9F0',
      slightlyLighterPrimary: '#424a5c',
      descTextColor: '#abafb8',
      errorColor: '#FF0000', //red
      searchScreenType: 'Regular',
    }
  };

  const setCurrentSimpleStylingDataToStyle = (SimpleAppStyleIndexNum) => {
    const simpleStylingData = AsyncStorageSimpleStylingData;
    console.log(simpleStylingData);
    try {
      for (let i = 0; i < simpleStylingData.length; i++) {
        if (simpleStylingData[i].indexNum == parseInt(SimpleAppStyleIndexNum)) {
            setCurrentSimpleStylingData(simpleStylingData[i])
            console.log(simpleStylingData[i])
            previousStylingState.current = SimpleAppStyleIndexNum
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }

  useEffect(() => {
    async function getAsyncSimpleStyling() {
      let AsyncSimpleStyling = await AsyncStorage.getItem('simpleStylingData')
      let AsyncSimpleStyling_Parsed = JSON.parse(AsyncSimpleStyling)
      if (AsyncSimpleStyling_Parsed != AsyncSimpleStyling_ParsedRef.current) {
        setAsyncStorageSimpleStylingData(AsyncSimpleStyling_Parsed)
        AsyncSimpleStyling_ParsedRef.current = AsyncSimpleStyling_Parsed
        console.log('Setting Async Storage Data in App.js')
      }
      console.log('AsyncSimpleStyling is: ' + AsyncSimpleStyling_Parsed)
    }
    getAsyncSimpleStyling()
  }, [])

  useEffect(() => {
    async function firstTime_getAsyncSimpleStyling() {
      let AsyncSimpleStyling = await AsyncStorage.getItem('simpleStylingData')
      let AsyncSimpleStyling_Parsed = JSON.parse(AsyncSimpleStyling)
      setAsyncStorageSimpleStylingData(AsyncSimpleStyling_Parsed)
      AsyncSimpleStyling_ParsedRef.current = AsyncSimpleStyling_Parsed
    }
    firstTime_getAsyncSimpleStyling()
  }, [])

  console.log('App Styling Context State is: ' + AppStylingContextState)
  console.log('App is currently using this style: ' + currentSimpleStylingData)

  if (refreshAppStyling == true) {
    console.warn('Refreshing app styling')
    async function getAsyncSimpleStyling() {
      let AsyncSimpleStyling = await AsyncStorage.getItem('simpleStylingData')
      let AsyncSimpleStyling_Parsed = JSON.parse(AsyncSimpleStyling)
      setAsyncStorageSimpleStylingData(AsyncSimpleStyling_Parsed)
      AsyncSimpleStyling_ParsedRef.current = AsyncSimpleStyling_Parsed
    }
    setRefreshAppStyling(false)
    getAsyncSimpleStyling()
    setCurrentSimpleStylingDataToStyle(AppStylingContextState)
  }

  useEffect(() => {
    if (showAccountSwitcher == true) {
      Animated.timing(DismissAccountSwitcherBoxActivated, { toValue: 1, duration: 1, useNativeDriver: true }).start();
      Animated.timing(AccountSwitcherY, {
        toValue: -AccountSwitcherHeight + 60,
        duration: 100,
        useNativeDriver: true,
        }).start();
        setShowAccountSwitcher(false)
    }
  }, [showAccountSwitcher])

  /*
  const AccountSwitcher = () => {
    const onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationY: AccountSwitcherY,
          },
        },
      ],
      { useNativeDriver: true }
    );
    const onHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        if (event.nativeEvent.absoluteY > windowDimensions.height - 80 - AccountSwitcherHeight) {
          Animated.timing(DismissAccountSwitcherBoxActivated, { toValue: 0, duration: 1, useNativeDriver: true }).start();
          Animated.timing(AccountSwitcherY, {
            toValue: 250,
            duration: 200,
            useNativeDriver: true
          }).start();
        } else {
          Animated.timing(AccountSwitcherY, {
            toValue: 60 - AccountSwitcherHeight,
            duration: 100,
            useNativeDriver: true
          }).start();
        }
      }
    }
    const onBoxPress = () => {
      Animated.timing(AccountSwitcherY, {
        toValue: 250,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
    const AddNewAccount = () => {
      AppNavigation.navigate('ModalLoginScreen', {modal: true});
      Animated.timing(DismissAccountSwitcherBoxActivated, { toValue: 0, duration: 1, useNativeDriver: true }).start();
      Animated.timing(AccountSwitcherY, {
        toValue: 250,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
    const goToAccount = (account) => {
      setProfilePictureUri(account.profilePictureUri);
      setStoredCredentials(account);
      Animated.timing(DismissAccountSwitcherBoxActivated, { toValue: 0, duration: 1, useNativeDriver: true }).start();
      Animated.timing(AccountSwitcherY, {
        toValue: 250,
        duration: 200,
        useNativeDriver: true
      }).start();
      AppNavigation.reset('Tabs', 0);
    }
    return(
      //<PanGestureHandler onGestureEvent={onPanGestureEvent} onHandlerStateChange={onHandlerStateChange}>
        <AnimatedTouchableOpacity style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', height: 'auto', width: '90%', position: 'absolute', zIndex: 1000, top: windowDimensions.height - 140, marginHorizontal: '5%', flexDirection: 'column', borderColor: 'black', borderRadius: 15, borderWidth: 1, transform: [{translateY: AccountSwitcherY}], alignSelf: 'center', maxHeight: windowDimensions.height / 2}} onLayout={e => setAccountSwitcherHeight(e.nativeEvent.layout.height)} onPress={onBoxPress}>
            {storedCredentials ?
              <>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', height: 60, alignItems: 'flex-start'}}>
                  <Avatar style={{width: 40, height: 40, marginLeft: 15}} resizeMode="cover" source={{uri: profilePictureUri}}/>
                  <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 16, position: 'absolute', left: 71}}>{storedCredentials.name}</Text>
                </View>
                <View style={{width: '100%', backgroundColor: 'white', height: 3, borderColor: 'white', borderWidth: 1, borderRadius: 20, width: '96%', alignSelf: 'center'}}/>
                <FlatList
                  data={allCredentialsStoredList}
                  inverted={true}
                  renderItem={({item}) => (
                    <>
                      {item.secondId != storedCredentials.secondId ?
                        <TouchableOpacity onPress={() => {goToAccount(item)}} style={{flexDirection: 'row', justifyContent: 'flex-start', height: 60, alignItems: 'flex-start'}}>
                          <Avatar style={{width: 40, height: 40, marginLeft: 15}} resizeMode="cover" source={{uri: item.profilePictureUri}}/>
                          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 16, position: 'absolute', left: 71}}>{item.name}</Text>
                        </TouchableOpacity>
                      : null}
                    </>
                  )}
                  keyExtractor={(item, index) => 'key'+index}
                />
                <TouchableOpacity onPress={AddNewAccount} style={{flexDirection: 'row', justifyContent: 'flex-start', height: 60}}>
                  <EvilIcons name="plus" size={60} color="white" style={{marginLeft: 6, marginTop: 4}}/>
                  <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 5, marginTop: 16}}>Add New Account</Text>
                </TouchableOpacity>
              </>
            : null}
        </AnimatedTouchableOpacity>
      //</PanGestureHandler>
    )
  }

  const AccountSwitchedBox = () => {
    const {colors} = useTheme()
    const onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationY: AccountSwitchedBoxY,
          },
        },
      ],
      { useNativeDriver: true }
    );
    const onHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        if (event.nativeEvent.absoluteY > windowDimensions.height - 140) {
          Animated.timing(AccountSwitchedBoxY, {
            toValue: 250,
            duration: 200,
            useNativeDriver: true
          }).start();
        } else {
          Animated.timing(AccountSwitchedBoxY, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
          }).start();
        }
      }
    }
    const onBoxPress = () => {
      Animated.timing(AccountSwitchedBoxY, {
        toValue: 250,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
    return(
      <>
        {storedCredentials ?
          //<PanGestureHandler onGestureEvent={onPanGestureEvent} onHandlerStateChange={onHandlerStateChange}>
            <Animated.View style={{backgroundColor: (colors.primary + 'CC'), height: 60, width: '90%', position: 'absolute', zIndex: 999, top: windowDimensions.height - 140, marginHorizontal: '5%', flexDirection: 'row', borderColor: 'black', borderRadius: 15, borderWidth: 1, transform: [{translateY: AccountSwitchedBoxY}], justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={onBoxPress} style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Avatar style={{width: 40, height: 40, marginLeft: 15}} source={{uri: profilePictureUri}}/>
                <Text style={{color: colors.tertiary, fontSize: 16, marginTop: 20, marginLeft: 15, fontWeight: 'bold'}}>{'Switched to ' + storedCredentials.name}</Text>
              </TouchableOpacity>
            </Animated.View>
          //</PanGestureHandler>
        : null}
      </>
    )
  }

  */

  useEffect(() => {
    try {
      if (allCredentialsStoredList) {
        if (allCredentialsStoredList.length == 0 || allCredentialsStoredList.length == 1) {
          Animated.timing(AccountSwitchedBoxY, {
            toValue: 250,
            duration: 1,
            useNativeDriver: true
          }).start();
        }
      }
      if (storedCredentials && allCredentialsStoredList) {
        if (allCredentialsStoredList.length > 1) {
          Animated.sequence([
            Animated.timing(AccountSwitchedBoxY, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true
            }),
            Animated.delay(3000),
            Animated.timing(AccountSwitchedBoxY, {
              toValue: 250,
              duration: 100,
              useNativeDriver: true
            })
          ]).start();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [storedCredentials])

  async function setUpApp() {
    await AsyncStorage.getItem('socialSquareCredentials').then((result) => {
      if (!result) {
        setStoredCredentials(null);
      } else {
        setStoredCredentials(JSON.parse(result));
      }
      async function refreshProfilePictureContext(credentials) {
        const getProfilePicture = () => {
          const url = `https://nameless-dawn-41038.herokuapp.com/user/getProfilePic/${credentials.name}`;
  
          axios.get(url).then((response) => {
              const result = response.data;
              const {message, status, data} = result;
  
              if (status !== 'SUCCESS') {
                  console.log('GETTING PROFILE PICTURE FOR ProfilePictureUriContext WAS NOT A SUCCESS')
                  console.log(status)
                  console.log(message)
              } else {
                  console.log(status)
                  console.log(message)
                  axios.get(`https://nameless-dawn-41038.herokuapp.com/getImage/${data}`)
                  .then((response) => {
                      const result = response.data;
                      const {message, status, data} = result;
                      console.log(status)
                      console.log(message)
                      console.log(data)
                      //set image
                      if (message == 'No profile image.' && status == 'FAILED') {
                          console.log('Setting logo to SocialSquare logo')
                          setProfilePictureUri(SocialSquareLogo_B64_png)
                      } else if (data) {
                            //convert back to image
                            console.log('Setting logo in tab bar to profile logo')
                            var base64Icon = `data:image/jpg;base64,${data}`
                            setProfilePictureUri(base64Icon)
                      } else {
                          console.log('Setting logo to SocialSquare logo')
                          setProfilePictureUri(SocialSquareLogo_B64_png)
                      }
                  })
                  .catch(function (error) {
                      console.log("Image not recieved")
                      console.log(error);
                  });
              }
              //setSubmitting(false);
  
          }).catch(error => {
              console.log(error);
              //setSubmitting(false);
              handleMessage("An error occured. Try checking your network connection and retry.");
          })
        }
        let credentialsListObject = await AsyncStorage.getItem('socialSquare_AllCredentialsList');
        if (credentialsListObject == null && credentials) {
          setStoredCredentials(null);
          setAllCredentialsStoredList(null);
        } else {
          let parsedCredentialsListObject = JSON.parse(credentialsListObject);
          setAllCredentialsStoredList(parsedCredentialsListObject);
          if (credentials && parsedCredentialsListObject[credentials.indexLength].profilePictureUri != null && parsedCredentialsListObject[credentials.indexLength].profilePictureUri != undefined) {
            console.log('Setting ProfilePictureUri context to profile picture in Async Storage')
            setProfilePictureUri(parsedCredentialsListObject[credentials.indexLength].profilePictureUri)
          } else {
            NetInfo.fetch().then(state => {
              console.log("Connection type", state.type);
              console.log("Is connected?", state.isConnected);
              if (state.isConnected == true) {
                if (credentials) {
                  console.log('There is no profile picture in AsyncStorage. Loading profile picture for ProfilePictureUri Context using internet connection')
                  getProfilePicture()
                } else {
                  console.log('There is no stored credentials and no profile picture in Async Storage. Setting ProfilePictureUri to SocialSquareB64Logo')
                  setProfilePictureUri(SocialSquareLogo_B64_png)
                }
              } else {
                console.log('There is no internet connection and no saved profile picture in Async Storage. Setting ProfilePictureUri to SocialSquareB64Logo')
                setProfilePictureUri(SocialSquareLogo_B64_png)
              }
            });
          }
        }
      }
      console.log('Getting profile picture for ProfilePictureUriContext')
      refreshProfilePictureContext(JSON.parse(result))
    }).catch((error) => {console.error('Error getting stored credentials', error)})
    await AsyncStorage.getItem('socialSquare_AllCredentialsList').then((result) => {
      if (!result) {
        setAllCredentialsStoredList(null);
      } else {
        setAllCredentialsStoredList(JSON.parse(result));
      }
    }).catch((error) => {console.error('Error getting all stored credentials list', error)})
    await AsyncStorage.getItem('AppStylingContextState').then((result) => {
      if (!result) {
        setAppStylingContextState('Default');
        AsyncStorage.setItem('AppStylingContextState', 'Default');
      } else if (result == 'Default') {
        setAppStylingContextState('Default');
      } else if (result == 'Dark') {
        setAppStylingContextState('Dark');
      } else if (result == 'Light') {
        setAppStylingContextState('Light');
      } else {
        setAppStylingContextState(result)
      }
    }).catch((error) => {console.error('Error getting AppStylingContextState', error)})
    await AsyncStorage.getItem('hasOpenedSocialSquare').then((result) => {
      if (!result) {
        setHasOpenedSocialSquare(false);
        AsyncStorage.setItem('hasOpenedSocialSquare', 'false');
      } else if (result == 'true') {
        setHasOpenedSocialSquare(true);
      } else if (result == 'false') {
        setHasOpenedSocialSquare(false);
      } else {
        setHasOpenedSocialSquare(false);
        AsyncStorage.setItem('hasOpenedSocialSquare', 'false');
        console.error('hasOpenedSocialSquare was not set to true or false. Setting to false')
      }
    })
    setIsReady(true);
  }
  useEffect(() => {
    if (isReady == false) {
      setUpApp();
    }
  }, []);
  if (!isReady) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    )
  } else {
    return (
      <StoredCredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
        <ProfilePictureURIContext.Provider value={{profilePictureUri, setProfilePictureUri}}>
          <AllCredentialsStoredContext.Provider value={{allCredentialsStoredList, setAllCredentialsStoredList}}>
            <ShowAccountSwitcherContext.Provider value={{showAccountSwitcher, setShowAccountSwitcher}}>
              <AppStylingContext.Provider value={{AppStylingContextState, setAppStylingContextState}}>
                <HasOpenedSocialSquareContext.Provider value={{hasOpenedSocialSquare, setHasOpenedSocialSquare}}>
                  <RefreshAppStylingContext.Provider value={{refreshAppStyling, setRefreshAppStyling}}>
                    {AppStylingContextState != 'Default' && AppStylingContextState != 'Light' && AppStylingContextState != 'Dark' && AppStylingContextState != 'PureDark' && AppStylingContextState != 'PureLight' ? previousStylingState.current != AppStylingContextState ? setCurrentSimpleStylingDataToStyle(AppStylingContextState) : null : null}
                    <NavigationContainer ref={navigationRef} theme={AppStylingContextState == 'Default' ? AppColorScheme == 'dark' ? AppDarkTheme : AppLightTheme : AppStylingContextState == 'Dark' ? AppDarkTheme : AppStylingContextState == 'Light' ? AppLightTheme : AppStylingContextState == 'PureDark' ? AppPureDarkTheme : AppStylingContextState == 'PureLight' ? AppPureLightTheme : currentSimpleStylingData}>
                      {/*<AccountSwitcher/>
                      <AccountSwitchedBox/>*/}
                      <Start_Stack hasOpenedSocialSquare={hasOpenedSocialSquare}/>
                    </NavigationContainer>
                  </RefreshAppStylingContext.Provider>
                </HasOpenedSocialSquareContext.Provider>
              </AppStylingContext.Provider>
            </ShowAccountSwitcherContext.Provider>
          </AllCredentialsStoredContext.Provider>
        </ProfilePictureURIContext.Provider>
      </StoredCredentialsContext.Provider>
    );
  }
}

export default App;