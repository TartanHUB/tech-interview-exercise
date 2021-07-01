import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import { ThemeType } from '../styles/theme';

export type AlertProps = {
  type: 'success' | 'danger' | 'info';
  message: string;
};

const renderColor = (type: AlertProps['type'], theme: ThemeType) => {
  if (type === 'success') {
    return theme.colors.success;
  }
  if (type === 'danger') {
    return theme.colors.danger;
  }
  if (type === 'info') {
    return theme.colors.info;
  }
  return theme.colors.danger;
};

const renderIcon = (type: AlertProps['type']) => {
  if (type === 'danger') {
    return <FaExclamationCircle />;
  }
  if (type === 'success') {
    return <FaCheckCircle />;
  }
  if (type === 'info') {
    return <FaInfoCircle />;
  }
  return <FaInfoCircle />;
};

const AlertWrapper = styled.div<AlertProps>`
  background-color: ${(props) => props.type && renderColor(props.type, props.theme)};
  padding: ${(props) =>
    `${props.theme.sizes.baseSpacer} ${props.theme.sizes.doubleSpacer} ${props.theme.sizes.baseSpacer} ${props.theme.sizes.baseSpacer}`};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: ${(props) => props.theme.sizes.baseSpacer};
  border-radius: ${(props) => props.theme.sizes.borderRadius};
  text-align: left;
`;

const Alert: FunctionComponent<AlertProps> = (props) => (
  <AlertWrapper {...props}>
    {renderIcon(props.type)} {props.message}
  </AlertWrapper>
);

export default Alert;
