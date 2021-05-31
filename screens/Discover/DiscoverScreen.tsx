import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Custom components
import Input from '../../components/common/Input';
import DiscoverBox from '../../components/discover/DiscoverBox';

// Images for navigation boxes
import { discoverbox1, discoverbox2, discoverbox3 } from '../../assets/Assets';

interface DiscoverLabels {
  saerchPlaceholder: string;
  iconName: string;
}

const Discover = ({
  saerchPlaceholder = 'Search for events, posts, and more',
  iconName = 'search-outline',
}: DiscoverLabels) => {
  const [search, setSearch] = useState('');
  const [searchValid, setSearchValid] = useState(false);

  return (
    <View style={styles.discoverScreenContainer}>
      <Input
        iconName={iconName}
        inputValid={searchValid}
        placeholder={saerchPlaceholder}
        onValid={valid => setSearchValid(valid)}
        setContent={content => setSearch(content)}
        editable={false}
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
    marginTop: 30,
  },
  discoverBoxContainer: {
    alignItems: 'center',
  },
});

export default Discover;
