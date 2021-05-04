import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Input from '../../components/common/Input';
import DiscoverBox from '../../components/discover/DiscoverBox';

import { discoverbox1, discoverbox2, discoverbox3 } from '../../assets/Assets';

// Need to improve:
// (1) input field blurr out (grey out) when onBlurr
// (2) input field no error even when empty when onBlurr
// (3) top 'DISCOVER' font color & bold

interface DiscoverLabels {
  saerchPlaceholder: string;
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
      <Input
        label=''
        inputValid={searchValid}
        placeholder={saerchPlaceholder}
        errorMessage={errorMessageEmail}
        onValid={valid => setSearchValid(valid)}
        setContent={content => setSearch(content)}
      />
      <View style={styles.discoverBoxContainer}>
        <DiscoverBox
          boxHeader='ALL EVENTS'
          boxBackgroundColor='rgba(64, 0, 128, 0.7)'
          boxBackgroundImage={discoverbox1}
          tabNavigationName='DiscoverEvents'
        />
        <DiscoverBox
          boxHeader='ALL STUDENT ORGANIZATIONS'
          boxBackgroundColor='rgba(2, 7, 93, 0.7)'
          boxBackgroundImage={discoverbox2}
          tabNavigationName='DiscoverStudentOrg'
        />
        <DiscoverBox
          boxHeader='ALL POSTS'
          boxBackgroundColor='rgba(0, 128, 64, 0.7)'
          boxBackgroundImage={discoverbox3}
          tabNavigationName='DiscoverPosts'
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
    marginTop: 30,
  },
  discoverBoxContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default Discover;
