/**
 * Global Text Configuration
 * Sets default font for all Text components in the app
 */

import { Text, TextInput, Platform } from 'react-native';

const customFontStyle = {
  fontFamily: 'ShadowsIntoLightTwo_400Regular',
};

// Override defaultProps for Text
const OriginalTextDefaultProps = Text.defaultProps;
Text.defaultProps = {
  ...OriginalTextDefaultProps,
  style: [customFontStyle, OriginalTextDefaultProps?.style],
};

// Override defaultProps for TextInput
const OriginalTextInputDefaultProps = TextInput.defaultProps;
TextInput.defaultProps = {
  ...OriginalTextInputDefaultProps,
  style: [customFontStyle, OriginalTextInputDefaultProps?.style],
};

// Set allowFontScaling to false to prevent system font scaling issues
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;

