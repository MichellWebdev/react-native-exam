import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

// React navigation
import { useNavigation } from '@react-navigation/native';

// Custom stylehseet
import StyleSheetFactory from '../common/StyleSheetFactory';

interface DiscoverBoxLabels {
  boxHeader: string;
  boxBackgroundColor: string;
  boxBackgroundImage: string;
  tabNavigationName: string;
}

const DiscoverBox = ({ boxHeader, boxBackgroundColor, boxBackgroundImage, tabNavigationName }: DiscoverBoxLabels) => {
  const navigation = useNavigation();

  const styles = StyleSheetFactory.getSheet(boxBackgroundColor, boxBackgroundImage);
  const image = { uri: boxBackgroundImage };

  return (
    <View style={styles.discoverBoxContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(tabNavigationName)}>
        <ImageBackground style={styles.discoverBoxImage} resizeMode='cover' source={image}>
          <View style={styles.discoverBoxHeaderContainer}>
            <Text style={styles.discoverBoxHeader}> {boxHeader} </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default DiscoverBox;
