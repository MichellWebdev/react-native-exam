import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { saveUser } from '../../redux-store/actions/UserActions';
import { RootState } from '../../App';

// Stack navigation
import { useNavigation } from '@react-navigation/native';

// Custom components
import Input from '../common/Input';
import Button from '../common/Button';

interface EditProfileLabels {
  userNameLabel: string;
  studyProgrammeLabel: string;
  errorMessage: string;
  buttonText: string;
}

const EditProfile = ({
  userNameLabel = 'User name',
  studyProgrammeLabel = 'Study programme',
  errorMessage = 'Please fill out field',
  buttonText = 'Save',
}: EditProfileLabels) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const profileInfo = useSelector((state: RootState) => state.user.loggedInUser || {});

  // Handling input
  const [changeName, setChangeName] = useState(profileInfo.name);
  const [nameValid, setNameValid] = useState(false);

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
});

export default EditProfile;
