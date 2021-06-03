import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

// React navigation
import { useNavigation } from '@react-navigation/native';

// React redux
import { useSelector, useDispatch } from 'react-redux';
import { saveUser } from '../../redux-store/actions/UserActions';

// Dropdown Picker
import DropDownPicker from 'react-native-dropdown-picker';

// Common components
import Input from '../common/Input';
import Button from '../common/Button';
import { images } from '../../assets/images/images';

interface EditProfileLabels {
  profilePictureLabel: string;
  uploadButtonText: string;
  userNameLabel: string;
  studyProgrammeLabel: string;
  errorMessage: string;
  buttonText: string;
  prototypeLabel: string;
}

const EditProfile = ({
  profilePictureLabel = 'Profile picture',
  uploadButtonText = 'Upload',
  userNameLabel = 'What is your name?',
  studyProgrammeLabel = 'Study programme',
  errorMessage = 'Please fill out field',
  buttonText = 'Save changes',
  prototypeLabel = '* Prototype *',
}: EditProfileLabels) => {
  const profileInfo = useSelector((state: any) => state.user.loggedInUser || {});

  const navigation = useNavigation();

  const dispatch = useDispatch();

  // Name
  const [changeName, setChangeName] = useState(profileInfo.name);
  const [nameValid, setNameValid] = useState(false);

  // Study programme
  const [studyProgramme, setStudyProgramme] = useState(profileInfo.studyProgramme);
  const [studyProgrammeValid, setStudyProgrammeValid] = useState(false);

  // Photo (when using dropdown picker)
  const [open, setOpen] = useState(false);
  const [listValue, setListValue] = useState(profileInfo.image);
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
      path = require('../../assets/images/profile-image-placeholder.png');
  }

  const handleSave = () => {
    if (nameValid || studyProgrammeValid) {
      let user = { ...profileInfo };
      user.name = changeName;
      user.studyProgramme = studyProgramme;
      user.image = listValue;

      dispatch(saveUser(user));
      navigation.navigate('Profile');
    } else {
      console.log(false);
    }
  };

  return (
    <View style={styles.editProfileContainer}>
      <View style={styles.profilePicture}>
        <View>
          <View>
            <Text style={styles.profilePictureText}>{profilePictureLabel}</Text>
          </View>
          <View>
            <Button buttonText={uploadButtonText} onPress={() => { }} />
          </View>
        </View>
        <View style={styles.profilePictureImgContainer}>
          <View style={styles.profilePictureImgBorder}>
            {profileInfo.image === '' ? (
              <Image
                style={styles.profilePictureImg}
                source={require('../../assets/images/profile-image-placeholder.png')}
              />
            ) : (
              // <Image style={styles.profilePictureImg} source={{ uri: profileInfo.image }} />
              <Image style={styles.profilePictureImg} source={path} />
            )}
          </View>
        </View>
      </View>
      <Text style={styles.prototypeLabel}>{prototypeLabel}</Text>
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
        label={userNameLabel}
        value={changeName}
        inputValid={nameValid}
        errorMessage={errorMessage}
        onValid={(valid: any) => setNameValid(valid)}
        setContent={(content: any) => setChangeName(content)}
      />
      <Input
        label={studyProgrammeLabel}
        value={studyProgramme}
        inputValid={studyProgrammeValid}
        errorMessage={errorMessage}
        onValid={(valid: any) => setStudyProgrammeValid(valid)}
        setContent={(content: any) => setStudyProgramme(content)}
      />
      <Button buttonText={buttonText} onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  editProfileContainer: {
    marginTop: 50,
  },
  profilePicture: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    margin: 20,
  },
  profilePictureText: {
    textTransform: 'uppercase',
    color: '#32305D',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profilePictureImgContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  profilePictureImgBorder: {
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 150,
    backgroundColor: 'white',
    padding: 5,
  },
  profilePictureImg: {
    borderRadius: 150,
    width: 90,
    height: 90,
  },
  prototypeLabel: {
    marginLeft: 20,
    textTransform: 'uppercase',
    color: 'grey',
    marginBottom: 10,
    marginTop: 30,
  },
  list: {
    maxWidth: 380,
    margin: 20,
    marginTop: 0,
  },
});

export default EditProfile;
