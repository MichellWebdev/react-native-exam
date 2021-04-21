import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ButtonProps {
  buttonText: string;
  onPress: () => void;
}

const Button = ({ buttonText, onPress }: ButtonProps) => {
  return (
    <View>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.button}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    width: '91%',
    backgroundColor: '#5050A5',
    alignSelf: 'center',
    borderRadius: 5,
  },
  button: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Button;
