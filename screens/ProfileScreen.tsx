import React from 'react';
import { StyleSheet, View } from 'react-native';

// Custom components
import Profile from '../components/profile/Profile';
import Notification from '../components/notification/Notification';
import Separator from '../components/common/Separator';
import Button from '../components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux-store/actions/UserActions';

const ProfileScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View>
      <Profile />
      <Separator borderBottomWidth={1} borderBottomColor={'#DCDCDC'} marginTop={50} />
      <Notification />
      <Separator borderBottomWidth={1} borderBottomColor={'#DCDCDC'} marginTop={50} />
      <View style={styles.buttonContainer}>
        <Button
          buttonText={'Log out'}
          onPress={handleLogout}
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
