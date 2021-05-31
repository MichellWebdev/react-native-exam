import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

// React navigation
import { useNavigation } from '@react-navigation/native';

// React redux
import { useSelector, useDispatch } from 'react-redux';
import { saveUser } from '../../redux-store/actions/UserActions';

// Common components
import Input from '../common/Input';
import Button from '../common/Button';

interface EditProfileLabels {
  profilePictureLabel: string;
  uploadButtonText: string;
  userNameLabel: string;
  studyProgrammeLabel: string;
  errorMessage: string;
  buttonText: string;
}

const EditProfile = ({
  profilePictureLabel = 'Profile picture',
  uploadButtonText = 'Upload',
  userNameLabel = 'What is your name?',
  studyProgrammeLabel = 'Study programme',
  errorMessage = 'Please fill out field',
  buttonText = 'Save changes',
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

  const handleSave = () => {
    if (nameValid || studyProgrammeValid) {
      let user = { ...profileInfo };
      user.name = changeName;
      user.studyProgramme = studyProgramme;
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
            <Button buttonText={uploadButtonText} onPress={() => {}} />
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
              <Image style={styles.profilePictureImg} source={{ uri: profileInfo.image }} />
            )}
          </View>
        </View>
      </View>
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
});

export default EditProfile;
