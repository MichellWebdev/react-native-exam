import React from 'react';
import { StyleSheet, View } from 'react-native';

// React redux
import { useDispatch } from 'react-redux';
import { logout } from '../redux-store/actions/UserActions';

// Common components
import Separator from '../components/common/Separator';
import Button from '../components/common/Button';

// Custom components
import Profile from '../components/profile/Profile';
import Notification from '../components/notification/Notification';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Profile');
  };

  return (
    <View>
      <Profile />
      <Separator borderBottomWidth={1} borderBottomColor={'#DCDCDC'} marginTop={50} />
      <Notification />
      <Separator borderBottomWidth={1} borderBottomColor={'#DCDCDC'} marginTop={50} />
      <View style={styles.buttonContainer}>
        <Button buttonText={'Log out'} onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: '5%',
  },
});

export default ProfileScreen;
