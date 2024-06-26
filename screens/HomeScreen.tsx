import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useEffect, useState} from "react";
import IFactDto from "../models/dto/IFactDto";
import {Pressable, Text, View} from "react-native";
import GlobalStyles from "../GlobalStyles";
import i18n from "../translations/TranslationHelper";
import TextLoader from "../components/TextLoader";
import TextLoaderRow from "../components/TextLoaderRow";
import {getFact} from "../services/HttpServcie";
import {filter, map, take} from "rxjs";

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
        setFact(null);
        getFact()
            .pipe(take(1))
            .pipe(filter(ev => ev.status === 200))
            .pipe(map(x => x.response))
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
    const onGoToMapPageButtonPressed = (): void => navigation.navigate("Map");
    const onGoToSpeechPageButtonPressed = (): void => navigation.navigate("Speech");

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
                    <Text style={GlobalStyles.buttonText}>{i18n.t("camera")}</Text>
                </Pressable>
            </View>

            <View style={GlobalStyles.buttonOverlay}>
                <Pressable onPress={onGoToMapPageButtonPressed} style={GlobalStyles.button}>
                    <Text style={GlobalStyles.buttonText}>{i18n.t("map")}</Text>
                </Pressable>
            </View>

            <View style={GlobalStyles.buttonOverlay}>
                <Pressable onPress={onGoToSpeechPageButtonPressed} style={GlobalStyles.button}>
                    <Text style={GlobalStyles.buttonText}>{i18n.t("goToSpeechPageButtonText")}</Text>
                </Pressable>
            </View>

        </View>
    );
}

export default HomeScreen;