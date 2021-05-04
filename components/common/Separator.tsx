import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SeparatorProps {
  borderBottomColor: any;
  borderBottomWidth: any;
  marginTop: any;
}

const Separator = ({ borderBottomColor, borderBottomWidth, marginTop }: SeparatorProps) => {
  return (
    <View
      style={{ borderBottomColor: borderBottomColor, borderBottomWidth: borderBottomWidth, marginTop: marginTop }}></View>
  );
};

const styles = StyleSheet.create({});

export default Separator;
