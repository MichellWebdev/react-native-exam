import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Input from '../components/common/Input';
import DiscoverBox from '../components/discover/DiscoverBox';

import { discoverbox1, discoverbox2, discoverbox3 } from '../assets/Assets'

// Note - Needed modification
// (1) input field blurr out (grey out) when onBlurr
// (2) input field no error even when empty when onBlurr
// (3) top 'DISCOVER' font color & bold

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
    <View style={styles.discoverScreenContainer}>
      <Text>Discover</Text>
      <Input
        label=''
        inputValid={searchValid}
        placeholder={saerchPlaceholder}
        errorMessage={errorMessageEmail}
        onValid={valid => setSearchValid(valid)}
        setContent={content => setSearch(content)}
      />
      <View style={styles.discoverScreenContainer}>
        <DiscoverBox
          boxHeader='ALL EVENTS'
          boxBackgroundColor='rgba(64, 0, 128, 0.7)'
          boxBackgroundImage={discoverbox1}
        />
        <DiscoverBox
          boxHeader='ALL STUDENT ORGANIZATIONS'
          boxBackgroundColor='rgba(2, 7, 93, 0.7)'
          boxBackgroundImage={discoverbox2}
        />
        <DiscoverBox
          boxHeader='ALL POSTS'
          boxBackgroundColor='rgba(0, 128, 64, 0.7)'
          boxBackgroundImage={discoverbox3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  discoverScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default Discover;
