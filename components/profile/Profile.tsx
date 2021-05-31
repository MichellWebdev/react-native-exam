import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// React navigation
import { useNavigation } from '@react-navigation/native';

// React redux
import { useSelector } from 'react-redux';

// Common components
import Button from '../common/Button';

interface ProfileLabels {
  buttonText?: string;
}

const Profile = ({ buttonText = 'Edit profile' }: ProfileLabels) => {
  const loggedInUser = useSelector((state: any) => state.user.loggedInUser || {});
  const navigation = useNavigation();

  const handleRedirect = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          {loggedInUser.image === '' ? (
            <Image style={styles.profileImage} source={require('../../assets/images/profile-image-placeholder.png')} />
          ) : (
            <Image style={styles.profileImage} source={{ uri: loggedInUser.image }} />
          )}
        </View>
        <View style={styles.profileInfoContainer}>
          <Text style={styles.profileName}>{loggedInUser.name}</Text>
          <Text style={styles.profileInfo}>{loggedInUser.email}</Text>
          <Text style={styles.profileInfo}>{loggedInUser.studyProgramme}</Text>
        </View>
      </View>
      <Button buttonText={buttonText} onPress={handleRedirect} />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 150,
    padding: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 150,
  },
  profileInfoContainer: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#32305D',
  },
  profileInfo: {
    marginTop: 5,
  },
});

export default Profile;
