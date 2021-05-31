import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ButtonProps {
  buttonText: string;
  buttonWidth?: string;
  secondaryBtn?: boolean;
  onPress: () => void;
}

const Button = ({ buttonText, buttonWidth, secondaryBtn, onPress }: ButtonProps) => {
  return (
    <View style={{ width: buttonWidth }}>
      <TouchableOpacity
        style={[styles.buttonContainer, secondaryBtn ? styles.secondaryBtnStyle : styles.buttonContainer]}
        onPress={onPress}>
        <Text style={[styles.button, secondaryBtn ? { color: '#5050A5' } : styles.button]}>{buttonText}</Text>
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
  secondaryBtnStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#5050A5',
  },
});

export default Button;
