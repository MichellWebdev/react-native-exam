import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Redux
// import { useDispatch, useSelector } from 'react-redux';
// import { signup } from './../store/actions/UserActions';

// Stack navigation
import { useNavigation } from '@react-navigation/native';

// common components
import Input from './../components/common/Input';
import Button from '../components/common/Button';

interface SignupLabels {
  emailLabel: string;
  emailPlaceholder: string;
  errorMessageEmail: string;
  passwordLabel: string; // do labels and/or interfaces for each to look better
  passwordPlaceholder: string;
  passwordErrorMessage: string;
  buttonText: string;
}

const SignupScreen = ({
  emailLabel = 'Email',
  emailPlaceholder = 'email@student.cbs.dk',
  errorMessageEmail = 'Please fill out Email',
  passwordLabel = 'Password',
  passwordPlaceholder = '******',
  passwordErrorMessage = 'Please fill out password',
  buttonText = 'Signup',
}: SignupLabels) => {
  const navigation = useNavigation();

  // email
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  // password
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);

  const handleSignup = () => {
    passwordValid && emailValid ? navigation.navigate('Login') : null;
  };

  return (
    <View style={styles.signupContainer}>
      <Input
        label={emailLabel}
        inputValid={emailValid}
        placeholder={emailPlaceholder}
        errorMessage={errorMessageEmail}
        onValid={valid => setEmailValid(valid)}
        setContent={content => setEmail(content)}
      />
      <Input
        label={passwordLabel}
        password={true}
        inputValid={passwordValid}
        placeholder={passwordPlaceholder}
        errorMessage={passwordErrorMessage}
        onValid={valid => setPasswordValid(valid)}
        setContent={content => setPassword(content)}
      />
      <Button buttonText={buttonText} onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  signupContainer: {
    marginTop: 30,
  },
});

export default SignupScreen;
