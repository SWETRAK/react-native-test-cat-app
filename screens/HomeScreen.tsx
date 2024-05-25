import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useEffect, useState} from "react";
import IFactDto from "../models/dto/IFactDto";
import {Pressable, Text, View} from "react-native";
import GlobalStyles from "../GlobalStyles";
import i18n from "../translations/TranslationHelper";
import TextLoader from "../components/TextLoader";
import TextLoaderRow from "../components/TextLoaderRow";
import * as Speech from 'expo-speech';
import {getFact} from "../services/HttpServcie";
import {filter, map, take} from "rxjs";
import {NativeBoundaryEvent} from "expo-speech/build/Speech.types";

const HomeScreen = () => {

    const navigation = useNavigation<StackNavigationProp<any>>();
    const [fact, setFact] = useState<IFactDto | null>(null);
    const [speechPercentage, setSpeechPercentage] = useState<number | null>(null);

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

    const speak = async (languageCode: string, textToSpeech: string): Promise<void> => {

        const availableVoices = await Speech.getAvailableVoicesAsync();
        const languageVoices = availableVoices.filter(s => s.language === languageCode);

        const textLength = textToSpeech.length;

        Speech.speak(textToSpeech, {
            language: languageCode,
            voice: languageVoices[0].identifier,
            onBoundary: (data: NativeBoundaryEvent) => {
                setSpeechPercentage(data.charIndex / textLength * 100);
            },
            onDone: () => {
                setSpeechPercentage(100);
            }
        });
    };

    const speechPause = async (): Promise<void> => {
        await Speech.pause();
    }

    const speechResume = async (): Promise<void> => {
        await Speech.resume();
    }

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
                    <Text style={GlobalStyles.buttonText}>Camera</Text>
                </Pressable>
            </View>

            <View style={GlobalStyles.buttonOverlay}>
              <Pressable
                onPress={async () => {
                  await speak("pl-PL", "Brawa dla Dominika");
                 }}
                style={GlobalStyles.button}>
                <Text style={GlobalStyles.buttonText}>Mów    {Math.round(speechPercentage!)}</Text>
              </Pressable>
            </View>

            <View style={GlobalStyles.buttonOverlay}>
                <Pressable
                  onPress={speechPause}
                  style={GlobalStyles.button}>
                    <Text style={GlobalStyles.buttonText}>Pause</Text>
                </Pressable>
            </View>

            <View style={GlobalStyles.buttonOverlay}>
                <Pressable
                  onPress={speechResume}
                  style={GlobalStyles.button}>
                    <Text style={GlobalStyles.buttonText}>Play</Text>
                </Pressable>
            </View>

        </View>
    );
}

export default HomeScreen;