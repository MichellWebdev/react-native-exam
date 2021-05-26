import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// Redux
import { useSelector } from 'react-redux';

// Stack navigation
import { useNavigation } from '@react-navigation/native';

// Custom components
import Button from '../common/Button';

interface ProfileLabels {
  buttonText?: string;
}

const Profile = ({ buttonText = 'Edit profile' }: ProfileLabels) => {
  const navigation = useNavigation();
  const loggedInUser = useSelector((state: any) => state.user.loggedInUser || {});

  const handleRedirect = () => {
    navigation.navigate('EditProfile');
  };
  console.log(`loggedInUser`, loggedInUser);

  return (
    <View>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage} source={{ uri: loggedInUser.image }} />
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
