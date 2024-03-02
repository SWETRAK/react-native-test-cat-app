import {StyleSheet, View} from "react-native";
import React, {ReactNode} from "react";

const TextLoaderRow = () => {

    return (
        <View style={style.textLoaderRow}></View>
    );
};

const style = StyleSheet.create({
    textLoaderRow: {
        width: "100%",
        height: 20,
        backgroundColor: '#D3D3D3',
        borderRadius: 5,
        margin: 5
    }
});


export default TextLoaderRow;