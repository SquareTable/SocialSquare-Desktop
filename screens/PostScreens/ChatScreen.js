import React from "react";
import {View, Text} from "react-native";
import { useTheme } from "@react-navigation/native";

const ChatScreen = () => {
    const {colors} = useTheme()
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: colors.tertiary, fontSize: 25, fontWeight: 'bold'}}>Chats coming soon</Text>
        </View>
    )
}

export default ChatScreen;