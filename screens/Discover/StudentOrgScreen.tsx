import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy data
import { STUDORGS } from '../../data/dummy';

// Custom components
import StudentOrgBox from '../../components/discover/StudentOrgBox';

const StudentOrg = () => {
  return (
    <SafeAreaView style={styles.studentOrgScreenContainer}>
      <View>
        <FlatList
          data={STUDORGS}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          renderItem={itemData => (
            <StudentOrgBox
              boxBackgroundColor='rgba(46, 49, 49, 0.5)'
              boxBackgroundImage={itemData.item.orgImage}
              studentOrg={itemData.item}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  studentOrgScreenContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: -15,
  },
});

export default StudentOrg;
