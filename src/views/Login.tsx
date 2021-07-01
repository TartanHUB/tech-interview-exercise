import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import styled from 'styled-components';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

import { Alert, Button, Heading, Input } from '../components';
import useSessionStorage from '../hooks/useSessionStorage';
import { requiredField } from '../utils/validations';
import { usersEndpoint } from '../utils/endpoints';

type LoginProps = {} & RouteComponentProps;

const LoginWrapper = styled.div`
  max-width: ${(props) => props.theme.breakpoints.md};
  margin: 0 auto;
`;

const StyledLoginFormWrapper = styled(Form)`
  border: ${(props) => props.theme.mixins.baseBorderStyle};
  padding: ${(props) => props.theme.sizes.doubleSpacer};
`;

const Login: FunctionComponent<LoginProps> = () => {
  const { session, saveSessionStorage } = useSessionStorage('tartanHub');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (session) {
      navigate('/gallery');
    }
  }, [session]);

  return (
    <LoginWrapper>
      <Heading>Log In</Heading>
      <Formik
        validateOnMount
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setIsLoading(true);
          setShowErrorMessage(false);

          axios
            .get(usersEndpoint)
            .then((response) => {
              if (
                response.data.filter(
                  (user: { email: string; username: string }) =>
                    // lowercase the username, since username shouldnt be case-sensitive
                    user.username.toLocaleLowerCase() === values.username &&
                    user.email === values.password
                ).length === 1
              ) {
                saveSessionStorage({
                  username: values.username,
                  isLoggedIn: true,
                });
              } else {
                setShowErrorMessage(true);
              }
            })
            .catch((err: string) => {
              alert(err);
            })
            .finally(() => {
              setIsLoading(false);
              setSubmitting(false);
            });

          resetForm();
        }}
      >
        {({ isSubmitting, isValid }) => (
          <StyledLoginFormWrapper>
            {showErrorMessage && (
              <Alert
                type="danger"
                message="Sorry, the credentials you provided did not work. Please try again."
              />
            )}
            <Field
              as={Input}
              type="text"
              name="username"
              label="Username"
              validate={requiredField}
              required
            />
            <Field
              as={Input}
              type="password"
              name="password"
              label="Password"
              validate={requiredField}
              required
            />

            <Button type="submit" disabled={isSubmitting || !isValid || isLoading} block>
              {isLoading ? 'Logging In' : 'Log In'}
            </Button>
          </StyledLoginFormWrapper>
        )}
      </Formik>
    </LoginWrapper>
  );
};

export default Login;
