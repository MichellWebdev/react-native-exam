import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Menu = props => {
  return (
    <View style={styles.menuContainer}>
      <Text>Menu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
});

export default Menu;
