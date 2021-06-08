import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// React navigation
import { useNavigation } from '@react-navigation/native';

// React redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux-store/actions/UserActions';

// Common components
import Input, { AutoCapitalizeType } from './../components/common/Input';
import Button from '../components/common/Button';

interface LoginLabels {
  loginLabel: string;
  alertLabel1: string;
  alertLabel2: string;
  emailLabel: string;
  emailPlaceholder: string;
  errorMessageEmail: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  passwordErrorMessage: string;
  forgotPassword: string;
  buttonText: string;
  signupRedirectLabel: string;
}

const LoginScreen = ({
  loginLabel = 'Log in',
  alertLabel1 = '',
  alertLabel2 = '',
  emailLabel = 'Email',
  emailPlaceholder = 'email@student.cbs.dk',
  errorMessageEmail = '',
  passwordLabel = 'Password',
  passwordPlaceholder = '******',
  passwordErrorMessage = 'Please fill out password',
  forgotPassword = 'Forgot password?',
  buttonText = 'Log in',
  signupRedirectLabel = "Don't have an account? Sign up",
}: LoginLabels) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // email
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  errorMessageEmail = 'Please fill out Email'

  // password
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);

  // Logged Out
  const loggedOut = useSelector((state: any) => state.user.loggedOut || {});
  const loginError = useSelector((state: any) => state.user.loginError || {});
  const invalidEmailLogin = useSelector((state: any) => state.user.invalidEmailLogin || {});

  let loginErrorStatus = false;
  if (loggedOut != null && loggedOut == true) {
    loginErrorStatus = true;
    alertLabel1 = 'You are logged out.'
    alertLabel2 = 'Please log in again to get access.'
  } else if (loginError != null && loginError == true) {
    loginErrorStatus = true;
    alertLabel1 = 'Login failed.'
    alertLabel2 = 'Please provide correct email or password.'
  } else if (invalidEmailLogin != null && invalidEmailLogin == true) {
    loginErrorStatus = true;
    alertLabel1 = 'Invalid email address.'
    alertLabel2 = 'Please provide valid email address.'
  }

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  return (
    <View style={styles.loginContainer}>
      <View>
        <Image style={styles.loginImage} source={require('../assets/images/cbsStudentsLogo.png')} />
      </View>
      <View>
        <Text style={styles.loginHeader}>{loginLabel}</Text>
      </View>
      {
        loginErrorStatus
          ?
          <View style={styles.alertContainer}>
            <Text style={styles.alertHeader}>{alertLabel1}</Text>
            <Text style={styles.alertHeader}>{alertLabel2}</Text>
          </View>
          :
          <View style={styles.alertContainer}></View>
      }
      <Input
        label={emailLabel}
        inputValid={emailValid}
        placeholder={emailPlaceholder}
        errorMessage={errorMessageEmail}
        autoCapitalize={AutoCapitalizeType.none}
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
      <Button buttonText={buttonText} onPress={handleLogin} />
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
  loginContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
  loginImage: {
    alignSelf: 'center',
    marginTop: 70,
    marginBottom: 30,
  },
  loginHeader: {
    marginBottom: 20,
    marginTop: 30,
    fontSize: 24,
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#5050A5',
  },
  alertContainer: {
    // minHeight: 50,
    marginBottom: 20,
  },
  alertHeader: {
    fontSize: 15,
    marginLeft: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  forgotPassword: {
    textAlign: 'center',
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
