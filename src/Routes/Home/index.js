import React, {useEffect, useState} from 'react';
import { Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';

import todoUrl from '../../data/todo-url';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseLogin, setResponseLogin] = useState({});
  const [statusCode, setStatusCode] = useState(0);
  const [loginStatus, setLoginStatus] = useState('');
  const [loginAlert, setLoginAlert] = useState('');

  const postLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    const response = await fetch(`${todoUrl}/auth/login/`, requestOptions)
    const login = await response.json();
    setStatusCode(response.status);
    setIsLoading(false);
    setResponseLogin(login);
  }
  useEffect(() => {
    setLoginStatus('');
    setLoginAlert('');
  }, []);

  useEffect(() => {
    console.log('useEffect - ResponseLogin');
    console.log(responseLogin);
    console.log('=========useEffect - ResponseLogin');
  }, [responseLogin]);
  
  useEffect(() => {
    console.log('useEffect - StatusCode');
    console.log(statusCode);
    if (statusCode === 200) {
      console.log('Login Success');
      console.log(responseLogin);
      localStorage.setItem('access', responseLogin.access);
      localStorage.setItem('refresh', responseLogin.refresh);
      setLoginStatus('Login Success');
      setLoginAlert('success');
    } else if (statusCode === 401) {
      console.log('Login Failed');
      setLoginStatus('Login Failed');
      setLoginAlert('danger');
    } else {
      setLoginStatus('');
      setLoginAlert('');
    }
  }, [statusCode]);

  return (
    <>
      <Row>
        <Col md={{span: 4, offset: 4}}>
        <h1 className="m-auto text-center">Bienvenido</h1>
        <h2 className="m-auto text-center">Iniciar Sesión</h2>
        <Form onSubmit={postLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar Usuario"
              name='username'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Col>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
            <Col>
              {!isLoading ? '' : <SpinnerLoading />}
            </Col>
          </Row>
            <Row>
              <Col className="mt-4">
              {console.log(loginAlert)}
              {loginAlert !== '' ? <AlertResponse variant={loginAlert} message={loginStatus} /> : ''}
              </Col>
            </Row>
        </Form>
        </Col>
      </Row>
    </>
  );
};

const SpinnerLoading = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

const AlertResponse = (props) => {
  return (
    <Alert variant={props.variant} className="text-center">
      {props.message}
    </Alert>
  )
}

export default Home;
