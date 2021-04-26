import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

// enum AutoCapitalizeType {
//   none = 'none',
//   sentences = 'sentences',
//   words = 'words',
//   characters = 'characters',
// }

interface InputProps {
  label: string;
  value?: string;
  placeholder?: string;
  password?: boolean;
  autoCapitalize?: any;
  inputValid: boolean;
  errorMessage: string;
  setContent: (arg: string) => void;
  onValid: (arg: boolean) => void;
}

const Input = ({
  label,
  value,
  placeholder,
  password,
  autoCapitalize,
  inputValid,
  errorMessage,
  setContent,
  onValid,
}: InputProps) => {
  const [touched, setTouched] = useState(false);

  const handleInput = (newInputText: string) => {
    setTouched(true);
    newInputText === '' ? onValid(false) : onValid(true);
    setContent(newInputText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize={autoCapitalize}
        value={value}
        placeholder={placeholder}
        secureTextEntry={password}
        onChangeText={handleInput}
        onBlur={() => setTouched(true)}
      />
      {!inputValid && touched && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 10,
    padding: 5,
  },
  label: {
    color: '#32305D',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
  },
});

export default Input;
