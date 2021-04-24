import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Reference: https://stackoverflow.com/questions/42707327/passing-props-into-external-stylesheet-in-react-native
// Reference: https://stackoverflow.com/questions/49144649/flexbox-height-in-react-native

// Need to improve
// (1) text align center - located center manually atm
// (2) border radius - not perfect

export default class StyleSheetFactory {
    static getSheet(backgroundColor?: string, backgroundImage?: string) {
        return StyleSheet.create({
            discoverBoxContainer: {
                flexDirection: 'column',
                height: 120,
                margin: 15,
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: backgroundColor,
            },
            discoverBoxImage: {
                resizeMode: 'cover',
                justifyContent: 'center',
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: backgroundColor,
            },
            discoverBoxHeaderContainer: {
                height: 120,
                width: 300,
                backgroundColor: backgroundColor,
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: backgroundColor,
            },
            discoverBoxHeader: {
                fontSize: 17,
                fontWeight: '900',
                color: 'white',
                textAlign: 'center',
                height: 120,
                width: 300,
                paddingTop: 50,
            }
        })
    }
}
