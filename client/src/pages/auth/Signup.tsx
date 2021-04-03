import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { object, ref, SchemaOf, string } from 'yup';
import Centered from '../../components/Centered';
import TextField from '../../components/Form/TextField';
import { signup } from '../../redux/authSlice/thunks/signupThunk';
import { useAppDispatch } from '../../redux/store';

interface SignupFields {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const field = {
  username: 'username',
  email: 'email',
  password: 'password',
  repeatPassword: 'repeatPassword',
};

const passwordValidationMsg =
  'Password must be at least 8 characters, and include at least 1 uppercase character and 1 number';

const schema: SchemaOf<SignupFields> = object().shape({
  username: string().required('Please select a username'),
  email: string().required('Please enter an email'),
  password: string()
    .required('Please enter a password')
    .matches(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, passwordValidationMsg),
  repeatPassword: string()
    .required('Please repeat your password')
    .oneOf([ref('password'), null], 'Passwords do not match'),
});

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const formMethods = useForm<SignupFields>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  });
  const dispatch = useAppDispatch();

  const { handleSubmit } = formMethods;

  const submitHandler = async ({ username, email, password }: SignupFields) => {
    setLoading(true);
    await dispatch(
      signup({
        username,
        email,
        password,
      })
    );
    setLoading(false);
  };

  return (
    <Centered>
      <div className={'pb-5'}>
        <h1>L7</h1>
        <Card>
          <Card.Header>Create an Account</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(submitHandler)}>
              <TextField
                name={field.username}
                type={'text'}
                label={'Username'}
                methods={formMethods}
                required
                disabled={loading}
              />
              <TextField
                name={field.email}
                type={'email'}
                label={'Email Address'}
                methods={formMethods}
                required
                disabled={loading}
              />
              <TextField
                name={field.password}
                type={'password'}
                label={'Password'}
                methods={formMethods}
                required
                disabled={loading}
              />
              <TextField
                name={field.repeatPassword}
                type={'password'}
                label={'Repeat Password'}
                methods={formMethods}
                required
                disabled={loading}
              />
              <Form.Group>
                <Button type={'submit'} disabled={loading} block>
                  Sign Up
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <div className={'text-center mt-3'}>
          Already have an account?
          <br />
          <Link to={'/login'}>Login</Link>
        </div>
      </div>
    </Centered>
  );
};

export default Signup;
