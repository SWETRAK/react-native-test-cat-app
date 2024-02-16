import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeScreen} from "./screens/HomeScreen";
import {ProfileScreen} from "./screens/ProfileScreen";
import {GlobalStyles} from "./GlobalStyles";

export default function App(): Element {

    const Stack = createNativeStackNavigator<any>();

    return (
        <View style={GlobalStyles.wrapperContainer}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"Home"}>
                    <Stack.Screen
                        name={"Home"}
                        options={{
                            title: "Cat Facts on Demand",
                            headerLargeTitle: true,
                            headerTitleStyle: {
                                color: "#fff"
                            },
                            headerBackTitle: "Back",
                            headerStyle: {
                                backgroundColor: "red"
                            }
                        }}
                        component={HomeScreen}/>
                    <Stack.Screen
                        name={"Profile"}
                        options={{
                            title: "Cat for you ❤️❤️",
                            headerBackTitle: "Back"
                        }}
                        component={ProfileScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}