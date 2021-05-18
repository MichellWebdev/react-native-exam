import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ToggleSwitch from '../common/ToggleSwitch';

const Notification = () => {
  return (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationHeader}>Notifications</Text>
      <View>
        <ToggleSwitch header={'Chat'} infoText={'When you receive a new message'} />
        <ToggleSwitch header={'Event reminder'} infoText={'An hour before events you are "going to"'} disabled={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    margin: 20,
    marginTop: '10%',
  },
  notificationHeader: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#32305D',
    marginBottom: 10,
  },
});

export default Notification;
