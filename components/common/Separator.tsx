import React from 'react';
import { View } from 'react-native';

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

export default Separator;
