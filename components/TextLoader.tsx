import {StyleSheet, View} from "react-native";
import React, {ReactNode} from "react";
import TextLoaderRow from "./TextLoaderRow";

type TextLoaderRowType = typeof TextLoaderRow;

type TextLoaderProps = {
    children: ReactNode
}

const TextLoader = ({children}: TextLoaderProps) => {

    return (
        <View style={style.mainContainer}>
            {children}
        </View>
    );
};

const style = StyleSheet.create({
    mainContainer: {
        width: "100%"
    }
})


export default TextLoader;