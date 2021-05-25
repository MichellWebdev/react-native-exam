import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// enum AutoCapitalizeType {
//   none = 'none',
//   sentences = 'sentences',
//   words = 'words',
//   characters = 'characters',
// }

interface InputProps {
  label?: string;
  value?: string;
  iconName?: string;
  iconColor?: string;
  placeholder?: string;
  password?: boolean;
  autoCapitalize?: any;
  inputValid?: boolean;
  errorMessage: string;
  setContent: (arg: string) => void;
  onValid: (arg: boolean) => void;
}

const Input = ({
  label,
  value,
  iconName,
  iconColor = '#32305D',
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
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[iconName ? styles.withIcon : styles.noIcon]}>
        {iconName && <Ionicons name={iconName} size={25} color={iconColor} />}
        <TextInput
          autoCapitalize={autoCapitalize}
          value={value}
          placeholder={placeholder}
          secureTextEntry={password}
          onChangeText={handleInput}
          onBlur={() => setTouched(true)}
          autoCorrect={false}
        />
      </View>
      {!inputValid && touched && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,

    elevation: 1,
  },
  label: {
    color: '#32305D',
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
  },
  withIcon: {
    flexDirection: 'row',
  },
  noIcon: {
    flexDirection: 'column',
  },
});

export default Input;
