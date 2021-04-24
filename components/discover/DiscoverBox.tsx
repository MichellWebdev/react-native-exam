import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CSS from 'csstype';
import StyleSheetFactory from '../common/StyleSheetFactory';

interface DiscoverBoxLabels {
    boxHeader: string;
    boxBackgroundColor: string;
    boxBackgroundImage: string;
}

const DiscoverBox = ({
    boxHeader,
    boxBackgroundColor,
    boxBackgroundImage,
}: DiscoverBoxLabels) => {

    const styles = StyleSheetFactory.getSheet(boxBackgroundColor, boxBackgroundImage);
    const image = { uri: boxBackgroundImage };

    return (
        <View style={styles.discoverBoxContainer}>
            <TouchableOpacity>
                <ImageBackground
                    style={styles.discoverBoxImage}
                    resizeMode='cover'
                    source={image}
                >
                    <View style={styles.discoverBoxHeaderContainer} >
                        <Text
                            style={styles.discoverBoxHeader}
                        > {boxHeader} </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

export default DiscoverBox;
