import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { Link } from '@reach/router';

export type ButtonProps = {
  type: 'submit' | 'button' | 'reset' | 'link';
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  to?: string;
  disabled?: boolean;
  block?: boolean;
};

const allStyles = css<ButtonProps>`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  position: relative;
  display: inline-flex;
  ${(props) => props.block && 'width: 100%;'}
  font-family: ${(props) => props.theme.type.fontFamilySansSerif};
  font-weight: bold;
  font-size: ${(props) => props.theme.typefontSizeBase};
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  letter-spacing: 1px;
  line-height: 1.5;
  padding: ${(props) => `${props.theme.sizes.halfSpacer} ${props.theme.sizes.baseAndAHalfSpacer}`};
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  border-radius: ${(props) => props.theme.sizes.borderRadius};

  /* Disabled state */
  ${(props) =>
    props.disabled &&
    `cursor: not-allowed;
  opacity: .65;`}

  &:hover,
  &:focus {
    outline: none;
    filter: brightness(1.25);
  }
`;

const StyledButton = styled.button`
  ${allStyles}
`;

const StyledLink = styled.span`
  ${allStyles}
  padding: 0; /* remove padding from parent div and use in <a> below */

  & > a {
    padding: ${(props) =>
      `${props.theme.sizes.halfSpacer} ${props.theme.sizes.baseAndAHalfSpacer}`};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: inherit !important;

    &:hover,
    &:focus {
      color: inherit !important;
    }
  }
`;

const Button: FunctionComponent<ButtonProps> = ({
  to,
  children,
  type,
  onClick,
  disabled,
  block,
}) => {
  if (type === 'link' && to) {
    return (
      <StyledLink
        disabled={disabled}
        block={block}
        type={type}
        onClick={onClick} // even though its a Link, we may want to track things like an analytics event
      >
        <Link to={to}>{children}</Link>
      </StyledLink>
    );
  }

  if (type !== 'link') {
    return (
      <StyledButton type={type} onClick={onClick} block={block} disabled={disabled}>
        {children}
      </StyledButton>
    );
  }
  return null;
};

export default Button;
