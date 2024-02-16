import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useEffect, useState} from "react";
import IFactDto from "../models/dto/IFactDto";
import {Pressable, Text, View} from "react-native";
import {GlobalStyles} from "../GlobalStyles";
import {getFact} from "../services/HttpServcie";
import {filter, map, take} from "rxjs";

export const HomeScreen = () => {

    const navigation = useNavigation<StackNavigationProp<any>>();
    const [fact, setFact] = useState<IFactDto | null>(null);

    useEffect(() => {
        // Code here will be executed on component mount
        getFactFromApi();
        return () => {
            // Code here will be executed on component unmount
        }
    }, [])

    const getFactFromApi = (): void => {
        getFact()
            .pipe(take(1))
            .pipe(filter(ev => ev.status === 200))
            .pipe(map(x => x.data))
            .subscribe({
                next: (value: IFactDto) => {
                    setFact(value);
                },
                error: (err: any) => {
                    console.log(err);
                }
            });
    }

    const onLoadFactButtonPress = (): void => {
        getFactFromApi();
    }

    const onGoToNextPageButtonPress = (): void => {
        navigation.navigate("Profile");
    }

    return (
        <View style={GlobalStyles.container}>
            <View style={GlobalStyles.buttonOverlay}>
                <Text style={GlobalStyles.factText}>{fact?.fact || "No fact for now"}</Text>
            </View>
            <View style={GlobalStyles.buttonOverlay}>
                <Pressable onPress={onLoadFactButtonPress} style={GlobalStyles.button}>
                    <Text style={GlobalStyles.buttonText}>Load new fact 😜</Text>
                </Pressable>
            </View>
            <View style={GlobalStyles.buttonOverlay}>
                <Pressable onPress={onGoToNextPageButtonPress} style={GlobalStyles.button}>
                    <Text style={GlobalStyles.buttonText}>Go to next page ➡️</Text>
                </Pressable>
            </View>
        </View>
    );
}