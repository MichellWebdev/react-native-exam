import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Redux
// import { useDispatch, useSelector } from 'react-redux';
// import { signup } from './../store/actions/UserActions';

// Stack navigation
import { useNavigation } from '@react-navigation/native';

// common components
import Input from './../components/common/Input';
import Button from '../components/common/Button';

interface LoginLabels {
  loginLabel: string;
  emailLabel: string;
  emailPlaceholder: string;
  errorMessageEmail: string;
  passwordLabel: string; // do labels and/or interfaces for each to look better
  passwordPlaceholder: string;
  passwordErrorMessage: string;
  forgotPassword: string;
  buttonText: string;
  signupRedirectLabel: string;
}

const LoginScreen = ({
  loginLabel = 'Log in',
  emailLabel = 'Email',
  emailPlaceholder = 'email@student.cbs.dk',
  errorMessageEmail = 'Please fill out Email',
  passwordLabel = 'Password',
  passwordPlaceholder = '******',
  passwordErrorMessage = 'Please fill out password',
  forgotPassword = 'Forgot password?',
  buttonText = 'Log in',
  signupRedirectLabel = "Don't have an account? Sign up",
}: LoginLabels) => {
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
      <View>
        <Image style={styles.signupImage} source={require('../assets/images/cbsStudentsLogo.png')} />
      </View>
      <Text style={styles.signupHeader}>{loginLabel}</Text>
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
      <Text style={styles.forgotPassword}>{forgotPassword}</Text>
      <Button buttonText={buttonText} onPress={handleSignup} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        <Text style={styles.signupRedirect}>{signupRedirectLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signupContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
  signupImage: {
    alignSelf: 'center',
    marginTop: 70,
    marginBottom: 30,
  },
  signupHeader: {
    marginBottom: 20,
    marginTop: 30,
    fontSize: 24,
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#5050A5',
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    color: '#5050A5',
    fontWeight: 'bold',
  },
  signupRedirect: {
    textAlign: 'center',
    marginTop: 20,
    color: '#5050A5',
  },
});

export default LoginScreen;