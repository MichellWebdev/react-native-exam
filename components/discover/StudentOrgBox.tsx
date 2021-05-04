import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import DiscoverStudOrg from '../../models/DiscoverStudOrg';
import StyleSheetFactory from '../common/StyleSheetFactory';

interface StudentOrgBoxLabels {
  boxBackgroundColor: string;
  boxBackgroundImage: string;
  studentOrg: DiscoverStudOrg;
}

const StudentOrgBox = ({ boxBackgroundColor, boxBackgroundImage, studentOrg }: StudentOrgBoxLabels) => {
  const navigation = useNavigation();

  const styles = StyleSheetFactory.getSheet(boxBackgroundColor, boxBackgroundImage);
  const image = { uri: boxBackgroundImage };

  return (
    <View style={styles.eventBoxContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('StudentOrgsDetail', { title: studentOrg.orgName, studentOrg: studentOrg })}>
        <ImageBackground style={styles.eventBoxImage} resizeMode='cover' source={image}>
          <View style={styles.eventBoxContentsContainer}>
            <Text>{studentOrg.orgName}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default StudentOrgBox;
