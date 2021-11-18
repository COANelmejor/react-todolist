import React from 'react';
import { MemoryRouter, Switch, Route, Redirect } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Home from './Routes/Home';
import Dashboard from './Routes/Dashboard';
import About from './Routes/About';
import Error from './Routes/Error';
import Navbar from './Routes/Navbarapp';

import './App.css';

const accessToken = localStorage.getItem('access');

const App = () => (
  <MemoryRouter>
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <Navbar />
        <Switch>
          <Route exact path='/'>
            {accessToken ? <Redirect to='/dashboard' /> : <Home />}
          </Route>
          <Route path='/Dashboard'>
            <Dashboard />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/logout'>
            <Home />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Container>
    </Container>
  </MemoryRouter>
);

export default App;
