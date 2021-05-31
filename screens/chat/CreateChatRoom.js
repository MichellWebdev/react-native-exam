import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

// React navigation
import { useNavigation } from '@react-navigation/native';

// React redux
import { useSelector, useDispatch } from 'react-redux';
import { searchUsers, resetUserResearch } from '../../redux-store/actions/UserActions';

// Common components
import Input from '../../components/common/Input';
import ChatUser from '../../components/chat/ChatUser';

const CreateChatRoom = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const iconName = 'search-outline';
  const saerchPlaceholder = 'Search user email';

  let matchFound;

  const searchMatchingUsers = useSelector(state => state.user.searchUsers);

  const [chatroomUserEmail, setChatroomUserEmail] = useState('');
  const [chatroomUserEmailValid, setChatroomUserEmailValid] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState('Please fill out search field');
  const [ownEmail, setOwnEmail] = useState(false);

  const handleEmailInput = emailInput => {
    setChatroomUserEmail(emailInput);
    dispatch(searchUsers(emailInput));
  };

  const handleCancel = () => {
    dispatch(resetUserResearch());
    navigation.goBack();
  };

  if (searchMatchingUsers != null && searchMatchingUsers.length == 0) {
    matchFound = false;
  } else {
    matchFound = true;
  }

  return (
    <View style={styles.createChatContainer}>
      <View style={styles.userSearch}>
        <View style={styles.userSearchInput}>
          <Input
            iconName={iconName}
            inputValid={chatroomUserEmailValid}
            placeholder={saerchPlaceholder}
            errorMessage={errorMessageEmail}
            autoCapitalize={'none'}
            onValid={valid => setChatroomUserEmailValid(valid)}
            setContent={content => handleEmailInput(content)}
          />
        </View>
        <View style={styles.userSearchButton}>
          <Button title='Cancel' onPress={() => handleCancel()}></Button>
        </View>
      </View>

      <View>
        {!matchFound ? (
          <View style={styles.noUserFound}>
            <Text style={styles.noUserFoundText}>Oops!</Text>
            <Text style={styles.noUserFoundText}>There are no users with that email.</Text>
          </View>
        ) : (
          <FlatList
            data={searchMatchingUsers}
            renderItem={itemData => <ChatUser chatUser={itemData.item} ownEmail={ownEmail}></ChatUser>}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  createChatContainer: {
    flex: 1,
  },
  userSearch: {
    flexDirection: 'row',
    height: 100,
  },
  userSearchInput: {
    minWidth: '80%',
    paddingTop: 20,
    marginLeft: 5,
  },
  userSearchButton: {
    minWidth: '20%',
    paddingTop: 20,
    marginLeft: -15,
    marginTop: 5,
  },
  noUserFound: {
    margin: 25,
  },
  noUserFoundText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    color: '#989898',
    textAlign: 'center',
  },
});

export default CreateChatRoom;
