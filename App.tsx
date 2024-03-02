import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import GlobalStyles from "./GlobalStyles";
import i18n from "./translations/TranslationHelper";
import CameraScreen from "./screens/CameraScreen";

export default function App(): Element {
    const Stack = createNativeStackNavigator<any>();

    return (
        <View style={GlobalStyles.wrapperContainer}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"Home"}>
                    <Stack.Screen
                        name={"Home"}
                        options={{
                            title: i18n.t<string>('catFactsOnDemandHeader'),
                            headerLargeTitle: true,
                            headerTitleStyle: {
                                color: "#fff"
                            },
                            headerBackTitle: i18n.t<string>('back'),
                            headerStyle: {
                                backgroundColor: "red"
                            }
                        }}
                        component={HomeScreen}/>
                    <Stack.Screen
                        name={"Profile"}
                        options={{
                            title: i18n.t<string>('catForYouHeader'),
                            headerBackTitle: i18n.t<string>('back')
                        }}
                        component={ProfileScreen}/>
                    <Stack.Screen
                        name={"Camera"}
                        options={{
                            title: i18n.t<string>('catForYouHeader'),
                            headerBackTitle: i18n.t<string>('back')
                        }}
                        component={CameraScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}