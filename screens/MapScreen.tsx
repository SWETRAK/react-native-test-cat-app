import {SafeAreaView, StyleSheet} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {useEffect} from "react";


const MyMapScreen = () => {

    useEffect(() => {


        return () => {

        }
    }, []);

    return (
      <SafeAreaView>
          <MapView
            style={styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0441,
            }}>
              <Marker
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                }}
                title={"Test title"}
                description={"test description ha ha ha "}
              />

          </MapView>
      </SafeAreaView>
    )
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

export default MyMapScreen;