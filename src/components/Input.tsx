import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { FieldMetaProps, FormikHelpers, useField } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type InputProps = {
  name: string;
  type: 'text' | 'password';
  label: string;
  helpText?: string | JSX.Element;
  required?: boolean;
  placeholder?: string;
} & FieldMetaProps<string> &
  FormikHelpers<string>;

const StyledInput = styled.input<{ invalid?: boolean }>`
  display: block;
  width: 100%;
  height: auto;
  padding: ${(props) => `${props.theme.sizes.halfSpacer} ${props.theme.sizes.baseSpacer}`};
  line-height: ${(props) => props.theme.type.lineHeightBase};
  color: ${(props) => props.theme.colors.textColor};
  background-color: ${(props) => props.theme.colors.white};
  background-image: none;
  border: ${(props) => props.theme.mixins.baseBorderStyle};
  border-radius: ${(props) => props.theme.sizes.borderRadius};
  transition: border-color 0.2s ease-in-out;

  ${(props) =>
    props.invalid &&
    `
      border-color: ${props.theme.colors.danger};
      border-width: 2px;
      box-shadow: 0 0 0 ${props.theme.sizes.borderRadius} rgba(${props.theme.colors.dangerRGB},.25);
  `}

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    border-width: 2px;
    outline: 0;
    box-shadow: 0 0 0 ${(props) => props.theme.sizes.borderRadius}
      rgba(${(props) => props.theme.colors.primaryRGB}, 0.25);
  }
`;

const StyledErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.danger};
  font-size: ${(props) => props.theme.type.fontSizeSmall};
`;

const InputWrapper = styled.div`
  margin-bottom: ${(props) => props.theme.sizes.baseSpacer};
  text-align: left;
`;

const StyledLabel = styled.label<{
  invalid?: boolean;
  required?: boolean;
}>`
  margin: 0;
  font-weight: bold;
  font-size: ${(props) => props.theme.type.fontSizeSmall};
  text-transform: uppercase;
  ${(props) =>
    props.invalid &&
    `
    color: ${props.theme.colors.danger};
  `}
  ${(props) =>
    props.required &&
    `
    &:after {
      content: ' *';
      color: ${props.theme.colors.danger};
    }
  `}
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.div`
  user-select: none;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: ${(props) => props.theme.sizes.quadrupleSpacer};
  background: ${(props) => props.theme.colors.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => props.theme.mixins.baseBorderStyle};
  padding: 0 ${(props) => props.theme.sizes.quarterSpacer};
  border-radius: 0 ${(props) => props.theme.sizes.borderRadius}
    ${(props) => props.theme.sizes.borderRadius} 0;
`;

const Input: FunctionComponent<InputProps> = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField<string>(props.name);
  // state for toggling password visibility
  const [passwordVisibility, setPasswordVisibiility] = useState(false);

  let inputTypeToRender;

  switch (props.type) {
    case 'password':
      inputTypeToRender = (
        <PasswordWrapper>
          <StyledInput
            invalid={meta && meta.touched && meta.error != null}
            placeholder={props.label || ''}
            id={props.name}
            {...field}
            {...props}
            {...meta}
            type={passwordVisibility ? 'text' : 'password'}
          />
          <PasswordToggle
            onClick={() => setPasswordVisibiility(!passwordVisibility)}
            title="Toggle Password Visibility"
          >
            {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
          </PasswordToggle>
        </PasswordWrapper>
      );
      break;
    case 'text':
    default:
      inputTypeToRender = (
        <StyledInput
          invalid={meta && meta.touched && meta.error != null}
          placeholder={props.label || ''}
          id={props.name}
          {...field}
          {...props}
          {...meta}
        />
      );
      break;
  }
  return (
    <InputWrapper>
      <StyledLabel
        htmlFor={props.name}
        invalid={meta && meta.touched && meta.error != null}
        required={props.required || false}
      >
        {props.label}
      </StyledLabel>
      {inputTypeToRender}
      {meta && meta.touched && meta.error && <StyledErrorMessage>{meta.error}</StyledErrorMessage>}
    </InputWrapper>
  );
};

export default Input;
