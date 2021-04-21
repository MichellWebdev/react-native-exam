import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../common/Button';

// Stack navigation
import { useNavigation } from '@react-navigation/native';

interface ProfileLabels {
  buttonText: string;
}

const Profile = ({ buttonText = 'Edit profile' }: ProfileLabels) => {
  const navigation = useNavigation();

  const handleRedirect = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View>
      <View style={styles.profileContainer}>
        <Text style={styles.profileInfo}>Profile</Text>
      </View>
      <Button buttonText={buttonText} onPress={handleRedirect} />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    margin: 20,
  },
  profileInfo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
