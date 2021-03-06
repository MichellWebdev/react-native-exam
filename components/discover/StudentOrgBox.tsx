import React from 'react';
import { ImageBackground, TouchableOpacity, View, Text, Image } from 'react-native';

// React navigation
import { useNavigation } from '@react-navigation/native';

// Models
import DiscoverStudOrg from '../../models/DiscoverStudOrg';

// Custom stylesheet
import StyleSheetFactory from '../common/StyleSheetFactory';

// Common components
import Button from '../common/Button';

interface StudentOrgBoxLabels {
  boxBackgroundColor: string;
  boxBackgroundImage: string;
  studentOrg: DiscoverStudOrg;
}

const StudentOrgBox = ({ boxBackgroundColor, boxBackgroundImage, studentOrg }: StudentOrgBoxLabels) => {
  const navigation = useNavigation();

  const styles = StyleSheetFactory.getSheet(boxBackgroundColor, boxBackgroundImage);

  const userFollow = false;
  const image = { uri: boxBackgroundImage };

  return (
    <View style={styles.eventBoxContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('StudentOrgsDetail', { title: studentOrg.orgName, studentOrg: studentOrg })}>
        <ImageBackground style={styles.eventBoxImage} resizeMode='cover' source={image}>
          <View style={styles.eventBoxContentsContainer}></View>
        </ImageBackground>
        <View style={styles.studentOrgInfoContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.studentOrgImageContainer}>
              <Image style={styles.studentOrgImage} source={require('../../assets/images/chatroom.png')} />
            </View>
            <View style={styles.followBtn}>
              <Button
                secondaryBtn={userFollow ? true : false}
                buttonText={userFollow === false ? 'Follow' : 'Following'}
                onPress={() => {
                  console.log('follow');
                }}
                buttonWidth='70%'
              />
            </View>
          </View>
          <Text style={styles.studentOrgHeader}>{studentOrg.orgName}</Text>
          <Text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto sunt magni pariatur excepturi minus adipisci
            fugiat accusamus vero rem culpa!
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StudentOrgBox;
