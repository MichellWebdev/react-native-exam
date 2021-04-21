import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';

// Stack navigation
import { useNavigation } from '@react-navigation/native';

// Custom components
import Input from '../../components/common/Input';

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
    navigation.navigate('Menu');
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
      <View>
        <Button title={buttonText} onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editProfileContainer: {
    marginTop: 50,
  },
});

export default EditProfile;
