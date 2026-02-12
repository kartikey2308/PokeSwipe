/**
 * Custom Text Component with Shadows Into Light Two font
 * Wraps React Native's Text component to apply custom font by default
 */

import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const CustomText = (props) => {
  const { style, ...restProps } = props;
  
  return (
    <RNText
      {...restProps}
      style={[styles.defaultFont, style]}
    />
  );
};

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: 'ShadowsIntoLightTwo_400Regular',
  },
});

export default CustomText;
