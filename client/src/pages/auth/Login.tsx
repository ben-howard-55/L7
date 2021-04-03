import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Centered from '../../components/Centered';
import { login } from '../../redux/authSlice/thunks/loginThunk';
import { useAppDispatch } from '../../redux/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, SchemaOf, string } from 'yup';

interface LoginFields {
  username: string;
  password: string;
}

const field = {
  username: 'username',
  password: 'password',
};

const schema: SchemaOf<LoginFields> = object().shape({
  username: string().required('Please enter an email'),
  password: string().required('Please enter a password'),
});

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { handleSubmit, register, errors } = useForm<LoginFields>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();

  const submitHandler = async ({ username, password }: LoginFields) => {
    setLoading(true);
    setError('');
    const res = await dispatch(
      login({
        username,
        password,
      })
    );
    if (login.rejected.match(res)) {
      console.log(res.error.message);
      setError(res.error.message);
    }
    setLoading(false);
  };

  return (
    <Centered>
      <div className={'pb-5'}>
        <h1>L7</h1>
        <Card>
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(submitHandler)}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  isInvalid={Boolean(errors.username)}
                  type={'text'}
                  disabled={loading}
                  name={field.username}
                  ref={register}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  isInvalid={Boolean(errors.password)}
                  type={'password'}
                  disabled={loading}
                  name={field.password}
                  ref={register}
                />
              </Form.Group>
              <p className={'text-danger'}>
                {errors.username?.message || errors.password?.message || error}
              </p>
              <Form.Group>
                <Button type={'submit'} disabled={loading} block>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <div className={'text-center mt-3'}>
          Dont have an account?
          <br />
          <Link to={'/signup'}>Sign up</Link>
        </div>
      </div>
    </Centered>
  );
};

export default Login;
