import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Stack navigation
import { useNavigation } from '@react-navigation/native';

// Custom components
import Input from '../common/Input';
import Button from '../common/Button';

interface EditProfileLabels {
  label: string;
  errorMessage: string;
  buttonText: string;
}

const EditProfile = ({
  label = 'User name',
  errorMessage = 'Please write your name',
  buttonText = 'Save',
}: EditProfileLabels) => {
  const navigation = useNavigation();

  // Handling input
  const [changeName, setChangeName] = useState('');
  const [nameValid, setNameValid] = useState(false);

  const handleSave = () => {
    console.log('Name changed');
    navigation.navigate('ProfileScreen');
  };

  return (
    <View style={styles.editProfileContainer}>
      <Input
        label={label}
        value={changeName}
        inputValid={nameValid}
        errorMessage={errorMessage}
        onValid={(valid: any) => setNameValid(valid)}
        setContent={(content: any) => setChangeName(content)}
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
