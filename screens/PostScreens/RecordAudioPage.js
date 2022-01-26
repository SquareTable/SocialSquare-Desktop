import React from 'react';
import {View, Text, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import { 
    Navigator_BackButton,
    TestText,
    ChatScreen_Title
} from '../components/styling';

const RecordAudioPage = ({navigation}) => {
    const {colors} = useTheme();
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
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Record Audio Page</TestText>
            </ChatScreen_Title>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Download the iOS or Android version of SocialSquare to use this feature.</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                    <Image
                        source={require('../assets/app_icons/App-Store-Symbol.png')}
                        style={{width: 200, aspectRatio: 16/9}}
                    />
                    <Image
                        source={require('../assets/app_icons/google-play-badge.png')}
                        style={{width: 200, aspectRatio: 323/125}}
                    />
                </View>
            </View>
        </>
    )
}

export default RecordAudioPage;