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
        marginBottom: 30,
        borderRadius: discoverBoxBorderRadius,
        borderWidth: discoverBoxBorderWidth,
        borderColor: backgroundColor,
        backgroundColor: 'white',
      },
      eventBoxImage: {
        resizeMode: 'cover',
        justifyContent: 'center',
        borderRadius: discoverBoxBorderRadius,
        borderWidth: discoverBoxBorderWidth,
        borderColor: backgroundColor,
      },
      eventBoxContentsContainer: {
        height: eventBoxHeight,
        backgroundColor: backgroundColor,
        borderRadius: discoverBoxBorderRadius,
        borderWidth: discoverBoxBorderWidth,
        borderColor: backgroundColor,
        justifyContent: 'flex-end',
        padding: 10,
      },
      eventBoxLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      eventName: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        textAlign: 'left',
        marginBottom: 2,
      },
      eventGroup: {
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
        textAlign: 'left',
        marginBottom: 3,
      },
      eventDate: {
        fontSize: 15,
        fontWeight: '700',
        color: 'white',
        textAlign: 'left',
        marginLeft: 6,
        marginBottom: 3,
      },
      eventLocation: {
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
        textAlign: 'left',
        marginLeft: 6,
      },

      // Discover --> Student organisations
      studentOrgInfoContainer: {
        padding: 10,
      },
      studentOrgHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      followBtn: {
        alignItems: 'flex-end',
        width: '70%',
      },
      studentOrgImageContainer: {
        borderRadius: discoverBoxBorderRadius,
        width: '30%',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: -50,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.0,

        elevation: 2,
      },
      studentOrgImage: {
        width: 80,
        height: 80,
      },
      logoContainer: {
        flexDirection: 'row',
        marginBottom: 20,
      },
    });
  }
}
