import React, {useEffect, useState} from "react";
import {
    Animated,
    DimensionValue,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import GlobalStyles from "../GlobalStyles";
import * as Speech from "expo-speech";
import {NativeBoundaryEvent} from "expo-speech/build/Speech.types";
import {Ionicons} from "@expo/vector-icons";

const MySpeechScreen = () => {

    const [speechPercentage, setSpeechPercentage] = useState<DimensionValue | null>(0);
    const [isAlreadyPlaying, setIsAlreadyPlaying] = useState<boolean>(false);

    useEffect(() => {

        return () => {

        }
    },  []);

    const speak = async (languageCode: string, textToSpeech: string): Promise<void> => {

        const availableVoices = await Speech.getAvailableVoicesAsync();
        const languageVoices = availableVoices.filter(s => s.language === languageCode);

        const textLength = textToSpeech.length;

        setIsAlreadyPlaying(true);

        Speech.speak(textToSpeech, {
            language: languageCode,
            voice: languageVoices[0].identifier,
            onBoundary: (data: NativeBoundaryEvent) => {
                setSpeechPercentage(`${data.charIndex / textLength * 100}%`);
            },
            onDone: () => {
                setIsAlreadyPlaying(false)
                setSpeechPercentage('100%');
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
      <SafeAreaView style={GlobalStyles.container}>

          <View style={GlobalStyles.buttonOverlay}>
              <View style={localStyles.speechPlayerRow}>


                  <View style={localStyles.speechPlayerProgressBox}>
                      <View
                        style={{
                            width: speechPercentage,
                            height:'100%',
                            backgroundColor: 'red',
                            borderCurve: "circular",
                            borderRadius: 4,
                          }}/>
                  </View>

                  <View>
                      <TouchableOpacity style={localStyles.speechPlayerButtons} onPress={async () => {
                          if (isAlreadyPlaying) {
                              await speechResume();
                          } else {
                              await speak("pl-PL", "Brawa dla Dominika");
                          }
                      }}>
                          <Ionicons name="play" size={24}></Ionicons>
                      </TouchableOpacity>
                  </View>

                  <View>
                      <TouchableOpacity style={localStyles.speechPlayerButtons} onPress={() => speechPause()}>
                          <Ionicons name="pause" size={24}></Ionicons>
                      </TouchableOpacity>
                  </View>
              </View>


          </View>

          <View style={GlobalStyles.buttonOverlay}>
              <Pressable
                onPress={async () => {
                    await speak("pl-PL", "Brawa dla Dominika");
                }}
                style={GlobalStyles.button}>
                  <Text style={GlobalStyles.buttonText}>Play</Text>
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
                  <Text style={GlobalStyles.buttonText}>Resume</Text>
              </Pressable>
          </View>

      </SafeAreaView>
    )
}

const localStyles = StyleSheet.create({
    speechPlayerRow : {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        height: 34
    },
    speechPlayerButtons: {
        flex: 1,
        padding: 5
    },
    speechPlayerProgressBox: {
        flex: 2,
        height: 8,
        borderCurve: "circular",
        borderRadius: 4,
        width: "80%",
        backgroundColor: "black",
    }
})

export default MySpeechScreen;