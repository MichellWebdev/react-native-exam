import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// React navigation
import { useNavigation } from '@react-navigation/native';

// React redux
import { useDispatch, useSelector } from 'react-redux';
import { completeSignup } from '../redux-store/actions/UserActions';

// Common components
import Input, { AutoCapitalizeType } from './../components/common/Input';
import Button from '../components/common/Button';

// Dropdown Picker
import DropDownPicker from 'react-native-dropdown-picker';
import { images } from '../assets/images/images';

// Scroll
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
  photoURL: string;
  prototypeLabel: string;
  photoLabel: string;
  photoUrlPlaceholder: string;
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
  prototypeLabel = '* Prototype - Choose an Image*',
  photoLabel = 'Photo url',
  photoUrlPlaceholder = 'Write photo URL',
  buttonText = 'Next',
}: CompleteSignupLabels) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // User name
  const [displayName, setDisplayName] = useState('');
  const [displayNameValid, setDisplayNameValid] = useState(false);

  // Study programme
  const [studyProgramme, setStudyProgramme] = useState('');
  const [studyProgrammeValid, setStudyProgrammeValid] = useState(false);

  // Photo (when using prototype input field)
  // const [photoUrl, setPhotoUrl] = useState('');
  // const [photoUrlValid, setPhotoUrlValid] = useState(false);

  // Photo (when using dropdown picker)
  const [open, setOpen] = useState(false);
  const [listValue, setListValue] = useState(-1);
  const [items, setItems] = useState([
    { label: 'Default Image', value: 0 },
    { label: 'Image 1', value: 1 },
    { label: 'Image 2', value: 2 },
    { label: 'Image 3', value: 3 },
    { label: 'Image 4', value: 4 },
  ]);

  let path = '';
  switch (listValue) {
    case 0:
      path = images.default.uri;
      break;
    case 1:
      path = images.user1.uri;
      break;
    case 2:
      path = images.user2.uri;
      break;
    case 3:
      path = images.user3.uri;
      break;
    case 4:
      path = images.user4.uri;
      break;
    default:
      path = require('../assets/images/profile-image-placeholder.png');
  }

  const handleCompleteSignup = () => {
    if (displayNameValid && studyProgrammeValid) {
      // When using input field
      // dispatch(completeSignup(displayName, photoUrl, studyProgramme));
      // console.log(displayName, photoUrl, studyProgramme);

      // When using dropdown picker
      dispatch(completeSignup(displayName, listValue, studyProgramme));
      // console.log(displayName, listValue, studyProgramme);

      // "after_submission_4" -> no more using checks or navigation (App.tsx line 363)
      // displayNameValid && studyProgrammeValid ? navigation.navigate('Login') : null;
    }
  };

  return (
    <KeyboardAwareScrollView>
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
              <Button buttonText={profilePictureBtn} onPress={() => { }} />
            </View>
          </View>
          <View style={styles.profilePictureImgContainer}>
            <View style={styles.profilePictureBorder}>
              <Image style={styles.profilePictureImg} source={path} />
            </View>
          </View>
        </View>
        <Text style={styles.prototypeLabel}>{prototypeLabel}</Text>
        {/* 
      // When using input field for photo input (prototype)
      <Input
        label={photoLabel}
        value={photoUrl}
        inputValid={photoUrlValid}
        placeholder={photoUrlPlaceholder}
        autoCapitalize={AutoCapitalizeType.none}
        onValid={valid => setPhotoUrlValid(valid)}
        setContent={content => setPhotoUrl(content)}
      /> */}
        <DropDownPicker
          style={styles.list}
          open={open}
          value={listValue}
          items={items}
          setOpen={setOpen}
          setValue={setListValue}
          setItems={setItems}
        />
        <Input
          value={displayName}
          label={userNameLabel}
          inputValid={displayNameValid}
          placeholder={userNamePlaceholder}
          errorMessage={userNameErrorMsg}
          onValid={valid => setDisplayNameValid(valid)}
          setContent={content => setDisplayName(content)}
        />
        <Input
          label={studyProgrammeLabel}
          inputValid={studyProgrammeValid}
          placeholder={studyProgrammePlaceholder}
          errorMessage={studyProgrammeErrorMsg}
          onValid={valid => setStudyProgrammeValid(valid)}
          setContent={content => setStudyProgramme(content)}
        />
        <Button buttonText={buttonText} onPress={handleCompleteSignup} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  profilePicture: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 50,
  },
  completeSignupImage: {
    alignSelf: 'center',
    marginTop: 70,
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
  prototypeLabel: {
    marginLeft: 20,
    textTransform: 'uppercase',
    color: 'grey',
    marginBottom: 10,
  },
  list: {
    maxWidth: 370,
    margin: 20,
  },
});

export default CompleteSignup;
