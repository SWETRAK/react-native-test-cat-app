import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackNavigatorParamsList} from "../types/RootStackNavigatorParamsList";
import React, {useEffect} from "react";
import {Image, View, Text} from "react-native";
import {GlobalStyles} from "../GlobalStyles";

export const ProfileScreen = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>();

    useEffect(() => {
        // Code here will be executed on component mount
        return () => {
            // Code here will be executed on component unmount
        }
    }, [])

    return (
        <View style={GlobalStyles.container}>
            <Image
                style={{width: '100%', height: '50%'}}
                source={{uri: "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=700&quality=85&auto=format&fit=max&s=fa2a6e634973defc13bfcbae1b8e954d"}}/>

            <Text style={GlobalStyles.factText}>Kociak dla ciebie kochanie 😻😻</Text>
        </View>
    )
}

