const baseSpacerUnit = 16;

// Breakpoints in REM
export const breakpoints = {
  xs: '0rem',
  sm: '32rem',
  md: '48rem',
  lg: '64rem',
  xl: '75rem',
};

// Breakpoints in pixels using above breakpoints
export const screenSizes = {
  small: Number(breakpoints.sm.slice(0, -3)) * 16,
  medium: Number(breakpoints.md.slice(0, -3)) * 16,
  large: Number(breakpoints.lg.slice(0, -3)) * 16,
  xlarge: Number(breakpoints.xl.slice(0, -3)) * 16,
};

const theme = {
  colors: {
    primary: '#433b58',
    primaryRGB: '67, 59, 88',
    secondary: '#f3c642',
    tertiary: '#96be98',
    black: '#282c34',
    white: '#f9f9f9',
    textColor: '#666666',
    lightGray: '#dddddd',
    headingColor: '#333333',
    success: '#578220',
    info: '#f3c642',
    danger: '#7d2600',
    dangerRGB: '125, 38, 0',
  },
  sizes: {
    quarterSpacer: `${baseSpacerUnit * 0.25}px`,
    halfSpacer: `${baseSpacerUnit * 0.5}px`,
    threeQuarterSpacer: `${baseSpacerUnit * 0.75}px`,
    baseSpacer: `${baseSpacerUnit * 1}px`,
    baseAndAHalfSpacer: `${baseSpacerUnit * 1.5}px`,
    doubleSpacer: `${baseSpacerUnit * 2}px`,
    tripleSpacer: `${baseSpacerUnit * 3}px`,
    quadrupleSpacer: `${baseSpacerUnit * 4}px`,
    borderRadius: '3px',
  },
  breakpoints: {
    xs: breakpoints.xs,
    sm: breakpoints.sm,
    md: breakpoints.md,
    lg: breakpoints.lg,
    xl: breakpoints.xl,
  },
  screenSizes: {
    small: Number(breakpoints.sm.slice(0, -3)) * 16,
    medium: Number(breakpoints.md.slice(0, -3)) * 16,
    large: Number(breakpoints.lg.slice(0, -3)) * 16,
    xlarge: Number(breakpoints.xl.slice(0, -3)) * 16,
  },
  type: {
    fontFamilySansSerif: 'Montserrat, "Trebuchet MS", Helvetica, =sans-serif',
    fontFamilySerif: 'Georgia, serif',
    fontFamilyMonospace: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
    lineHeightSmall: 1.1,
    lineHeightBase: 1.5,
    // Font Sizes
    // https://www.codementor.io/@ricardozea/100-responsive-typography-system-using-a-modular-scale-s5rhft58g
    fontSizeH1: '1.912em',
    fontSizeH2: '1.616em',
    fontSizeH3: '1.471em',
    fontSizeH4: '1.3em',
    fontSizeH5: '1.243em',
    fontSizeH6: '1.132em',
    fontSizeBase: '1em',
    fontSizeSmall: '.85em',
    fontSizeXSmall: '.75em',
  },
  mixins: {
    baseBorderStyle: '1px solid #dddddd',
    baseShadowStyle: '0 1px 4px 0 rgba(0,0,0,0.2)',
  },
};

export type ThemeType = typeof theme;

export default theme;
