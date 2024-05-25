import {CameraView, useCameraPermissions, FocusMode, CameraCapturedPicture} from 'expo-camera';
import {useRef, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GlobalStyles from "../GlobalStyles";
import {AutoFocus, CameraType, ImageType} from "expo-camera/legacy";
import {take} from "rxjs";

const MyCameraView = () => {

    const cameraViewRef = useRef<CameraView>(null);

    const [facing, setFacing] = useState(CameraType.back);
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
          <View style={styles.container}>
              <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
              <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePicture = async (): Promise<void> => {
        if (cameraViewRef.current !== null) {
            const takePictureResult: CameraCapturedPicture | undefined = await cameraViewRef.current.takePictureAsync({
                base64: true,
                imageType: ImageType.jpg
            });

            if(takePictureResult) {
                console.log(takePictureResult.base64);
            }
        }
    }

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <CameraView
              style={styles.camera}
              facing={facing}
              autofocus={AutoFocus.on}
              mode={'video'}
              enableTorch={true}
              ref={cameraViewRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}>Take Picture</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default MyCameraView;