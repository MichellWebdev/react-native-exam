import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Reference: https://stackoverflow.com/questions/42707327/passing-props-into-external-stylesheet-in-react-native
// Reference: https://stackoverflow.com/questions/49144649/flexbox-height-in-react-native

// Need to improve:
// (1) text align center - located center manually atm
// (2) border radius - not perfect

export default class StyleSheetFactory {
    static getSheet(backgroundColor?: string, backgroundImage?: string) {

        const discoverBoxWidth = 350;
        const discoverBoxHeight = 140;
        const discoverBoxBorderRadius = 5;
        const discoverBoxBorderWidth = 0.5;

        return StyleSheet.create({
            discoverBoxContainer: {
                flexDirection: 'column',
                margin: 15,
                borderRadius: discoverBoxBorderRadius,
                borderWidth: discoverBoxBorderWidth,
                borderColor: backgroundColor,
            },
            discoverBoxImage: {
                resizeMode: 'cover',
                justifyContent: 'center',
                borderRadius: discoverBoxBorderRadius,
                borderWidth: discoverBoxBorderWidth,
                borderColor: backgroundColor,
            },
            discoverBoxHeaderContainer: {
                width: discoverBoxWidth,
                height: discoverBoxHeight,
                backgroundColor: backgroundColor,
                borderRadius: discoverBoxBorderRadius,
                borderWidth: discoverBoxBorderWidth,
                borderColor: backgroundColor,
            },
            discoverBoxHeader: {
                width: discoverBoxWidth,
                height: discoverBoxHeight,
                fontSize: 20,
                fontWeight: '900',
                color: 'white',
                textAlign: 'center',
                paddingTop: 60,
            }
        })
    }
}
