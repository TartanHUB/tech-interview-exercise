import React, { FunctionComponent } from 'react';
import styled, { CSSProperties } from 'styled-components';

import { ThemeType } from '../styles/theme';

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  inverse?: boolean;
  noMargin?: boolean;
  align?: 'left' | 'center' | 'right';
  style?: CSSProperties;
};

const renderFontSize = (as: HeadingProps['as'], theme: ThemeType) => {
  if (as === 'h1') {
    return theme.type.fontSizeH1;
  }
  if (as === 'h2') {
    return theme.type.fontSizeH2;
  }
  if (as === 'h3') {
    return theme.type.fontSizeH3;
  }
  if (as === 'h4') {
    return theme.type.fontSizeH4;
  }
  if (as === 'h5') {
    return theme.type.fontSizeH5;
  }
  if (as === 'h6') {
    return theme.type.fontSizeH6;
  }
  return theme.type.fontSizeH1;
};

const StyledHeading = styled.h1<HeadingProps>`
  font-weight: 700;
  line-height: ${(props) => props.theme.type.lineHeightSmall};
  color: ${(props) =>
    props.inverse ? props.theme.colors.white : props.theme.colors.headingsColor};
  margin-bottom: ${(props) => (props.noMargin ? '0' : props.theme.sizes.baseSpacer)};
  text-align: ${(props) => props.align};
  white-space: pre-line;
  font-size: ${(props) => renderFontSize(props.as, props.theme)};
`;

const Heading: FunctionComponent<HeadingProps> = (props) => (
  <StyledHeading {...props}>{props.children}</StyledHeading>
);

export default Heading;
