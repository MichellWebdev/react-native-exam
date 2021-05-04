import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Custom components
import Profile from '../components/profile/Profile';
import Notification from '../components/notification/Notification';
import Separator from '../components/common/Separator';
import Button from '../components/common/Button';

const ProfileScreen = () => {
  return (
    <View>
      <Profile />
      <Separator borderBottomWidth={1} borderBottomColor={'#DCDCDC'} marginTop={50} />
      <Notification />
      <Separator borderBottomWidth={1} borderBottomColor={'#DCDCDC'} marginTop={50} />
      <View style={styles.buttonContainer}>
        <Button
          buttonText={'Log out'}
          onPress={() => {
            console.log('logging out...');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: '15%',
  },
});

export default ProfileScreen;
