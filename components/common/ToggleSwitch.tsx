import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

interface ToggleSwitchProps {
  header: string;
  infoText: string;
}

const ToggleSwitch = ({ header, infoText }: ToggleSwitchProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitchButton = () => setIsEnabled(previousState => !previousState);

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
          // use onChange to make an even happen instead
          // should be passed as props so we can set the event to each toggle ourselves
          onValueChange={toggleSwitchButton}
          value={isEnabled}
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
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
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