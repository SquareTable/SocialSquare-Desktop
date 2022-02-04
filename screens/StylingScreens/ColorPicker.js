import React, {useState, useEffect, createRef} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
} from '../../components/styling.js'
import Icon from 'react-native-vector-icons/Entypo';

import Octicons from 'react-native-vector-icons/Octicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ColorPicker from 'react-native-wheel-color-picker'

const ColorPickerScreen = ({navigation, route}) => {
    const {name, indexNum, type, stylingType, stylingVersion, dark, primary, tertiary, borderColor, background, secondary, darkLight, brand, green, red, darkest, greyish, bronzeRarity, darkestBlue, navFocusedColor, navNonFocusedColor, orange, yellow, purple, slightlyLighterGrey, midWhite, slightlyLighterPrimary, descTextColor, errorColor, placeToNavigateBackTo} = route.params;
    let ColorPickerRef = createRef()
    const [reRender, setReRender] = useState(0)
    const StatusBarHeight = 0;

    return (
        <>
            <ChatScreen_Title style={{backgroundColor: primary, borderWidth: 0, marginBottom: -40}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Octicons name={"x"} size={40} color={tertiary} />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: tertiary, fontSize: 14, marginVertical: 4}}>Edit {type == 'primary' ? 'Background' : type == 'tertiary' ? 'Text and Image Tint' : type == 'secondary' ? 'Secondary' : type == 'darkLight' ? 'Dark Light' : type == 'brand' ? 'Brand' : type == 'green' ? 'Green' : type == 'red' ? 'Red' : type == 'orange' ? 'Orange' : type == 'yellow' ? 'yellow' : type == 'purple' ? 'Purple' : type == 'greyish' ? 'Greyish' : type == 'bronzeRarity' ? 'Bronze Badge' : type == 'darkestBlue' ? 'Darkest Blue' : type == 'navFocusedColor' ? 'Nav Focused Color' : type == 'navNonFocusedColor' ? 'Nav Non Focused Color' : type == 'borderColor' ? 'Border' : type == 'slightlyLighterGrey' ? 'Slightly Lighter Grey' : type == 'midWhite' ? 'Mid White' : type == 'slightlyLighterPrimary' ? 'Slightly Lighter Primary' : type == 'descTextColor' ? 'Description Text' : type == 'errorColor' ? 'Error Colour' : 'ERROR OCCURED'} Color</TestText>
                <TouchableOpacity onPress={() => {navigation.navigate(placeToNavigateBackTo, {name: name, indexNum: indexNum, type: null, dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor, errorColor: errorColor})}} style={{position: 'absolute', right: 10, top: StatusBarHeight + 2}}>
                    <Octicons name={"check"} size={40} color={tertiary} />
                </TouchableOpacity>
            </ChatScreen_Title>
            <View style={{backgroundColor: primary, height: '100%', alignItems: 'center', alignSelf: 'center', width: '100%'}}>
                <View style={{height: '85%', width: '80%'}}>
                    <ColorPicker
                        ref={ColorPickerRef}
                        color={eval(type)}
                        swatchesOnly={false}
                        onColorChange={(color) => {console.log(color)}}
                        onColorChangeComplete={(color) => {type == 'primary' ? navigation.setParams({primary: color}) : type == 'tertiary' ? navigation.setParams({tertiary: color}) : type == 'secondary' ? navigation.setParams({secondary: color}) : type == 'darkLight' ? navigation.setParams({darkLight: color}) : type == 'brand' ? navigation.setParams({brand: color}) : type == 'green' ? navigation.setParams({green: color}) : type == 'red' ? navigation.setParams({red: color}) : type == 'orange' ? navigation.setParams({orange: color}) : type == 'yellow' ? navigation.setParams({yellow: color}) : type == 'purple' ? navigation.setParams({purple: color}) : type == 'greyish' ? navigation.setParams({greyish: color}) : type == 'bronzeRarity' ? navigation.setParams({bronzeRarity: color}) : type == 'darkestBlue' ? navigation.setParams({darkestBlue: color}) : type == 'navFocusedColor' ? navigation.setParams({navFocusedColor: color}) : type == 'navNonFocusedColor' ? navigation.setParams({navNonFocusedColor: color}) : type == 'borderColor' ? navigation.setParams({borderColor: color}) : type == 'slightlyLighterGrey' ? navigation.setParams({slightlyLighterGrey: color}) : type == 'midWhite' ? navigation.setParams({midWhite: color}) : type == 'slightlyLighterPrimary' ? navigation.setParams({slightlyLighterPrimary: color}) : type == 'descTextColor' ? navigation.setParams({descTextColor: color}) : type == 'errorColor' ? navigation.setParams({errorColor: color}) : null}}
                        thumbSize={40}
                        sliderSize={40}
                        noSnap={true}
                        row={false}
                        swatchesLast={true}
                        swatches={true}
                        discrete={false}
                    />
                </View>
            </View>
        </>
    );
}

export default ColorPickerScreen;