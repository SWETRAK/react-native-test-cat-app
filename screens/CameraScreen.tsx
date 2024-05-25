import {
    CameraView,
    useCameraPermissions,
    CameraCapturedPicture,
    useMicrophonePermissions,
} from 'expo-camera';
import {CameraType, ImageType} from "expo-camera/legacy";
import {useEffect, useRef, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import GlobalStyles from "../GlobalStyles";

const MyCameraView = () => {

    const cameraViewRef = useRef<CameraView>(null);
    const [facing, setFacing] = useState<CameraType>(CameraType.back);
    const [permission, requestPermission] = useCameraPermissions();
    const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
    const [recordingUri, setRecordingUri] = useState<string | null>(null);

    useEffect(() => {
        return () => {
        }
    }, []);

    const onToggleCameraFacing = () => {
        setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const onTakePicture = async (): Promise<void> => {
        if (cameraViewRef.current !== null) {
            const takePictureResult: CameraCapturedPicture | undefined = await cameraViewRef.current.takePictureAsync({
                base64: true,
                imageType: ImageType.jpg
            });

            if(takePictureResult) {
                // THIS IS PLACE where file can be saved to gallery or sent to server as base64
                console.log(takePictureResult.base64);
            }
        }
    }

    const onStartRecording = async (): Promise<void> => {
        if (cameraViewRef.current !== null) {
            const startRecordingResult: {uri: string} | undefined = await cameraViewRef.current.recordAsync({});
            if (startRecordingResult !== undefined) {
                setRecordingUri(startRecordingResult.uri);
            }
        }
    }

    const onStopRecording = async () => {
        if (cameraViewRef.current !== null) {
            cameraViewRef.current.stopRecording();

            // THERE you can sand video and other files
        }
    }

    if (!permission && !microphonePermission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission?.granted && !microphonePermission?.granted) {
        // Camera permissions are not granted yet.
        return (
          <View style={styles.container}>
              <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
              <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
    }

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <CameraView
              style={styles.camera}
              facing={facing}
              autofocus={'on'}
              mode={'video'}
              enableTorch={false}
              ref={cameraViewRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={onToggleCameraFacing}>
                        <Ionicons name="camera-reverse" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onTakePicture}>
                        <Ionicons name="camera" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        width: '100%',
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default MyCameraView;