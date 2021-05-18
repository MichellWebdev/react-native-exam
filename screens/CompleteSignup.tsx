// Need to improve
// (1) CompleteSignup page shows even when signup failed (when signing up using already registered email)

import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { completeSignup } from '../redux-store/actions/UserActions';
import { RootState } from '../App';

// Stack navigation
import { useNavigation } from '@react-navigation/native';

// Common components
import Input from './../components/common/Input';
import Button from '../components/common/Button';

interface CompleteSignupLabels {
  headerLabel: string;
  profilePicture: string;
  profilePictureBtn: string;
  userNameLabel: string;
  userNamePlaceholder: string;
  userNameErrorMsg: string;
  studyProgrammeLabel: string;
  studyProgrammePlaceholder: string;
  studyProgrammeErrorMsg: string;
  buttonText: string;
}

const CompleteSignup = ({
  headerLabel = 'Before we start...',
  profilePicture = 'Profile picture',
  profilePictureBtn = 'Upload',
  userNameLabel = 'What is your name?',
  userNamePlaceholder = 'First name and last name',
  userNameErrorMsg = 'Please fill out your name',
  studyProgrammeLabel = 'Study programme',
  studyProgrammePlaceholder = 'Select study programme',
  studyProgrammeErrorMsg = 'Please select you study programme',
  buttonText = 'Next',
}: CompleteSignupLabels) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const profileInfo = useSelector((state: RootState) => state.user.loggedInUser || {});

  // User name
  const [displayName, setDisplayName] = useState('');
  const [displayNameValid, setDisplayNameValid] = useState(false);

  // Study programme
  const [studyProgramme, setStudyProgramme] = useState('');
  const [studyProgrammeValid, setStudyProgrammeValid] = useState(false);

  // Photo URL
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoUrlValid, setPhotoUrlValid] = useState(false);

  const handleCompleteSignup = () => {
    if (displayNameValid) {
      dispatch(completeSignup(displayName, photoUrl));
      console.log(displayName, photoUrl);
      displayNameValid ? navigation.navigate('Login') : null;
    }
  };

  return (
    <View style={styles.completeSignupContainer}>
      <View>
        <Image style={styles.completeSignupImage} source={require('../assets/images/cbsStudentsLogo.png')} />
      </View>
      <Text style={styles.completeSignupHeader}>{headerLabel}</Text>

      <View style={styles.profilePicture}>
        <View>
          <View style={styles.profilePictureContainer}>
            <Text style={styles.profilePictureText}>{profilePicture}</Text>
          </View>
          <View>
            <Button
              buttonText={profilePictureBtn}
              onPress={() => {
                console.log('setting profile image...');
              }}
            />
          </View>
        </View>
        <View style={styles.profilePictureImgContainer}>
          <View style={styles.profilePictureBorder}>
            <Image style={styles.profilePictureImg} source={require('../assets/images/profile-image-placeholder.png')} />
          </View>
        </View>
      </View>
      <Input
        value={displayName}
        label={userNameLabel}
        inputValid={displayNameValid}
        placeholder={userNamePlaceholder}
        errorMessage={userNameErrorMsg}
        onValid={valid => setDisplayNameValid(valid)}
        setContent={content => setDisplayName(content)}
      />
      {/* <Input
        label={studyProgrammeLabel}
        inputValid={studyProgrammeValid}
        placeholder={studyProgrammePlaceholder}
        errorMessage={studyProgrammeErrorMsg}
        onValid={valid => setStudyProgrammeValid(valid)}
        setContent={content => setStudyProgramme(content)}
      /> */}
      <Input
        label={studyProgrammeLabel}
        value={photoUrl}
        inputValid={photoUrlValid}
        placeholder={studyProgrammePlaceholder}
        errorMessage={studyProgrammeErrorMsg}
        onValid={valid => setPhotoUrlValid(valid)}
        setContent={content => setPhotoUrl(content)}
      />
      <Button buttonText={buttonText} onPress={handleCompleteSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  profilePicture: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    margin: 20,
    marginTop: 0,
  },
  profilePictureImgContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  profilePictureImg: {
    width: 90,
    height: 90,
    borderRadius: 150,
  },
  profilePictureBorder: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 150,
    padding: 10,
  },
  profilePictureContainer: {
    marginBottom: 10,
  },
  profilePictureText: {
    textTransform: 'uppercase',
    color: '#32305D',
    fontWeight: 'bold',
  },
  completeSignupContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
  completeSignupImage: {
    alignSelf: 'center',
    marginTop: 70,
    marginBottom: 30,
    width: 150,
    height: 150,
  },
  completeSignupHeader: {
    marginBottom: 20,
    marginTop: 30,
    fontSize: 24,
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#32305D',
  },
});

export default CompleteSignup;