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
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Category Creation</TestText>
            </ChatScreen_Title>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Download the iOS, Android, or Windows version of SocialSquare or use the SocialSquare website to use this feature.</Text>
            </View>
        </>
    )
}

export default RecordAudioPage;