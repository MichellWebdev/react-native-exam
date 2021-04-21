import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// Stack navigation
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Profile</Text>
      <Text>User email</Text>
      <Text>User name</Text>
      <Button
        title={'Edit profile'}
        onPress={() => {
          navigation.navigate('EditProfile');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
