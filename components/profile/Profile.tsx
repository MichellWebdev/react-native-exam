import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Stack navigation
import { useNavigation } from '@react-navigation/native';

// Custom components
import Button from '../common/Button';

interface ProfileLabels {
  buttonText: string;
}

const Profile = ({ buttonText = 'Edit profile' }: ProfileLabels) => {
  const navigation = useNavigation();
  const loggedInUser = useSelector((state: any) => state.user.loggedInUser || {});

  const handleRedirect = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View>
      <View style={styles.profileContainer}>
        <Text style={styles.profileInfo}>Profile</Text>
        <Text>{loggedInUser.name}</Text>
        <Text>{loggedInUser.studyProgramme}</Text>
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
