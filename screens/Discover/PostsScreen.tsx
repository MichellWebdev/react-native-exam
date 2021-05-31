import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Posts = () => {
  return (
    <View style={styles.postsContainer}>
      <Text style={styles.postsHeader}>Posts TBA!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  postsHeader: {
    fontSize: 30,
    color: '#989898',
  },
});

export default Posts;
