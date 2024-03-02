import {Camera, CameraType, PermissionResponse} from 'expo-camera';
import {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {from} from 'rxjs'
import GlobalStyles from "../GlobalStyles";

const CameraView = () => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    useEffect(() => {

        return () => {

        }
    }, []);

    if (!permission) {
        // console.error("Camera permission not working");
    }

    if (!permission?.granted) {
        from(requestPermission()).subscribe({
            next: (value: PermissionResponse) => {
                console.log(value);
            },
            error: (err: any) => {
            }
        })
        // console.warn("Camera permission not granted")
    }

    const toggleCameraType = () => setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));


    return (
        <SafeAreaView style={GlobalStyles.container}>
            <Camera type={type} style={{flex: 1, width: "100%", height: "100%", alignItems: 'center', justifyContent: 'flex-end'}}>
                <View style={{alignSelf: 'center'}}>
                    <TouchableOpacity onPress={toggleCameraType}>
                        <Text style={{color: '#fff'}}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </SafeAreaView>
    );
}

export default CameraView;