import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Input from '../components/common/Input';

// Note - Needed modification
// (1) input field blurr out (grey out) when onBlurr
// (2) input field no error even when empty when onBlurr

interface DiscoverLabels {
  saerchPlaceholder: string
  errorMessageEmail: string;
}

const Discover = ({
  saerchPlaceholder = 'Search for events, posts, and more',
  errorMessageEmail = 'Please fill out seach field',
}: DiscoverLabels) => {

  const [search, setSearch] = useState('');
  const [searchValid, setSearchValid] = useState(false);

  return (
    <View style={styles.discoverContainer}>
      <Text>Discover</Text>
      <Input
        label=''
        inputValid={searchValid}
        placeholder={saerchPlaceholder}
        errorMessage={errorMessageEmail}
        onValid={valid => setSearchValid(valid)}
        setContent={content => setSearch(content)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  discoverContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
});

export default Discover;
