import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Custom components
import Profile from '../components/profile/Profile';

const ProfileScreen = props => {
  return (
    <View style={styles.profileScreenContainer}>
      <Profile />
    </View>
  );
};

const styles = StyleSheet.create({
  profileScreenContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
});

export default ProfileScreen;
