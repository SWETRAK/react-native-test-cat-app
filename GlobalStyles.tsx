import {StyleSheet} from "react-native";

const GlobalStyles = StyleSheet.create({
    wrapperContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonOverlay: {
        padding: 10,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        padding: 10,
        borderRadius: 10,
        width: '100%',
        backgroundColor: "#000",
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: "#fff"
    },
    factText: {
        color: "#000",
        fontSize: 20
    }
});

export default GlobalStyles;