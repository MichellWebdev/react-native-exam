import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { useSelector } from 'react-redux';

interface ToggleSwitchProps {
  header: string;
  infoText: string;
  disabled?: boolean;
}

const ToggleSwitch = ({ header, infoText, disabled = false }: ToggleSwitchProps) => {
  const loggedInUser = useSelector((state: any) => state.user.loggedInUser || {});

  const [isEnabled, setIsEnabled] = useState(loggedInUser.chatNotification);
  const toggleSwitchButton = () => setIsEnabled((previousState: boolean) => !previousState);

  return (
    <View style={styles.toggleSwitchContainer}>
      <View>
        <Text style={styles.header}>{header}</Text>
        <Text>{infoText}</Text>
      </View>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: '#D4D4D4', true: '#DCDCEE' }}
          thumbColor={isEnabled ? '#5050A5' : '#F5F5F5'}
          onValueChange={toggleSwitchButton}
          value={isEnabled}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleSwitchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,

    elevation: 1,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  switchContainer: {
    alignItems: 'flex-end',
    flex: 2,
  },
});

export default ToggleSwitch;
