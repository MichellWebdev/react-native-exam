import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// React navigation
import { useNavigation } from '@react-navigation/native';

// React redux
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux-store/actions/UserActions';

// Common components
import Input, { AutoCapitalizeType } from './../components/common/Input';
import Button from '../components/common/Button';

interface SignupLabels {
  signupLabel: string;
  alertLabel1: string;
  alertLabel2: string;
  emailLabel: string;
  emailPlaceholder: string;
  errorMessageEmail: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  passwordErrorMessage: string;
  buttonText: string;
  loginRedirectLabel: string;
}

const SignupScreen = ({
  signupLabel = 'Sign up to get access',
  alertLabel1 = '',
  alertLabel2 = '',
  emailLabel = 'Email*',
  emailPlaceholder = 'email@student.cbs.dk',
  errorMessageEmail = 'Please fill out Email',
  passwordLabel = 'Password*',
  passwordPlaceholder = '******',
  passwordErrorMessage = 'Please fill out password',
  buttonText = 'Sign up',
  loginRedirectLabel = 'Already have a user? Log in',
}: SignupLabels) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // email
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  // password
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);

  // error messages
  const signupError = useSelector((state: any) => state.user.signupError || {});
  const emailInUse = useSelector((state: any) => state.user.emailInUse || {});

  let signupFailed = false;
  if (signupError != null && signupError == true) {
    signupFailed = true
    alertLabel1 = 'Signup failed.'
    alertLabel2 = 'Please provide correct email or password.'
  } else if (emailInUse != null && emailInUse == true) {
    signupFailed = true
    alertLabel1 = 'Signup failed.'
    alertLabel2 = 'Please provide correct email or password.'
  }

  const handleSignup = () => {
    console.log(password)
    console.log(email)
    dispatch(signup(email, password));
    passwordValid && emailValid ? navigation.navigate('CompleteSignup') : null;
  };

  return (
    <View style={styles.signupContainer}>
      <View>
        <Image style={styles.signupImage} source={require('../assets/images/cbsStudentsLogo.png')} />
      </View>
      <Text style={styles.signupHeader}>{signupLabel}</Text>
      {
        signupFailed
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
      <Button buttonText={buttonText} onPress={handleSignup} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.loginRedirect}>{loginRedirectLabel}</Text>
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
  loginRedirect: {
    textAlign: 'center',
    marginTop: 20,
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
});

export default SignupScreen;
