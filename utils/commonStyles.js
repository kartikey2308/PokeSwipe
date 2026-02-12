/**
 * Common Styles and Constants
 * Shared styling values across the app including custom font
 */

export const CUSTOM_FONT = 'ShadowsIntoLightTwo_400Regular';

// Text shadow to make font appear bolder
export const BOLD_TEXT_SHADOW = {
  textShadowColor: 'rgba(0, 0, 0, 0.15)',
  textShadowOffset: { width: 0.5, height: 0.5 },
  textShadowRadius: 0.5,
  fontWeight: '600',
};

export const fontStyles = {
  regular: {
    fontFamily: CUSTOM_FONT,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  bold: {
    fontFamily: CUSTOM_FONT,
    fontWeight: '700',
    letterSpacing: 0.4,
    ...BOLD_TEXT_SHADOW,
  },
};
