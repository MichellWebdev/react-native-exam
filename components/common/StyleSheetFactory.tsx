import React from 'react';
import { StyleSheet } from 'react-native';

// Reference: https://stackoverflow.com/questions/42707327/passing-props-into-external-stylesheet-in-react-native
// Reference: https://stackoverflow.com/questions/49144649/flexbox-height-in-react-native

// Need to improve:
// (1) text align center - located center manually atm
// (2) border radius - not perfect
// (3) Event texts - bottom left (need to move down)

export default class StyleSheetFactory {
    static getSheet(backgroundColor?: string, backgroundImage?: string) {

        const discoverBoxWidth = 350;
        const discoverBoxHeight = 140;
        const discoverBoxBorderRadius = 5;
        const discoverBoxBorderWidth = 0.5;

        const eventBoxWidth = 350;
        const eventBoxHeight = 180;

        return StyleSheet.create({
            // Discover Main Page
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
            },
            // Discover -> Event Page
            eventBoxContainer: {
                flexDirection: 'column',
                // marginTop: 15,
                marginBottom: 30,
                borderRadius: discoverBoxBorderRadius,
                borderWidth: discoverBoxBorderWidth,
                borderColor: backgroundColor,
            },
            eventBoxImage: {
                resizeMode: 'cover',
                justifyContent: 'center',
                borderRadius: discoverBoxBorderRadius,
                borderWidth: discoverBoxBorderWidth,
                borderColor: backgroundColor,
            },
            eventBoxContentsContainer: {
                width: eventBoxWidth,
                height: eventBoxHeight,
                backgroundColor: backgroundColor,
                borderRadius: discoverBoxBorderRadius,
                borderWidth: discoverBoxBorderWidth,
                borderColor: backgroundColor,
            },
            eventBoxLabelContainer: {
                flexDirection: 'row',
            },
            eventBigBold: {
                fontSize: 20,
                fontWeight: '700',
                color: 'white',
                textAlign: 'left',
            },
            eventSmallNonbold: {
                fontSize: 15,
                fontWeight: '400',
                color: 'white',
                textAlign: 'left',
            },
            eventSmallBold: {
                fontSize: 15,
                fontWeight: '700',
                color: 'white',
                textAlign: 'left',
            },
        })
    }
}
