import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StudentOrg = () => {
  return (
    <View style={styles.studOrgContainer}>
      <Text style={styles.StudOrgHeader}>Student Organizations Detail TBA!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  studOrgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  StudOrgHeader: {
    fontSize: 30,
    color: '#989898',
    textAlign: 'center',
  },
});

export default StudentOrg;
