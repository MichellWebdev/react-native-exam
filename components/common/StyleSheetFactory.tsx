import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Reference: https://stackoverflow.com/questions/42707327/passing-props-into-external-stylesheet-in-react-native

export default class StyleSheetFactory {
    static getSheet(backgroundColor?: string, backgroundImage?: string) {
        return StyleSheet.create({
            discoverBoxContainer: {
                // flex: 1,
                // width: '100%',
                // height: '10%',
                // // justifyContent: "center",
                // // alignItems: "center",
                // opacity: 0.7,
                // backgroundColor: 'red',
                flex: 1,
                flexDirection: 'column',
                height: 30,
            },
            discoverBoxImage: {
                flex: 1,
                resizeMode: 'cover',
                justifyContent: 'center',
            },
            discoverBoxOverlay: {
                height: '100%',
                backgroundColor: 'rgba(255,0,0,0.5)',
            },
        })
    }
}
