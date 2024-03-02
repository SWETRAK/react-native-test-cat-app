import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useEffect, useState} from "react";
import IFactDto from "../models/dto/IFactDto";
import {Pressable, Text, View} from "react-native";
import GlobalStyles from "../GlobalStyles";
import {getFact} from "../services/HttpServcie";
import {filter, map, take} from "rxjs";
import i18n from "../translations/TranslationHelper";
import TextLoader from "../components/TextLoader";
import TextLoaderRow from "../components/TextLoaderRow";

const HomeScreen = () => {

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

    const onLoadFactButtonPress = (): void => getFactFromApi();
    const onGoToNextPageButtonPress = (): void => navigation.navigate("Profile");
    const onGoToCameraPageButtonPressed = (): void => navigation.navigate("Camera");

    return (
        <View style={GlobalStyles.container}>
            <View style={GlobalStyles.buttonOverlay}>
                {fact === null ?
                    (
                        <TextLoader>
                            <TextLoaderRow></TextLoaderRow>
                            <TextLoaderRow></TextLoaderRow>
                            <TextLoaderRow></TextLoaderRow>
                        </TextLoader>
                    ) : (
                        <Text style={GlobalStyles.factText}>{fact?.fact}</Text>
                    )}
            </View>
            <View style={GlobalStyles.buttonOverlay}>
                <Pressable onPress={onLoadFactButtonPress} style={GlobalStyles.button}>
                    <Text style={GlobalStyles.buttonText}>{i18n.t('loadNewFact')}</Text>
                </Pressable>
            </View>
            <View style={GlobalStyles.buttonOverlay}>
                <Pressable onPress={onGoToNextPageButtonPress} style={GlobalStyles.button}>
                    <Text style={GlobalStyles.buttonText}>{i18n.t('catForYou')}</Text>
                </Pressable>
            </View>
            <View style={GlobalStyles.buttonOverlay}>
                <Pressable onPress={onGoToCameraPageButtonPressed} style={GlobalStyles.button}>
                    <Text style={GlobalStyles.buttonText}>Camera Screen</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default HomeScreen;