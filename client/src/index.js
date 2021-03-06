import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import App from './App';
import Event from './pages/Event/index';
import Artistprofile from './pages/Artistprofile/index';
import Artistregister from './pages/Artistregister/index';
import Artistlogin from './pages/Artistlogin/index';
import Createartist from './pages/Createartist/index';
import Editartist from './pages/Editartist/index';
import Adminregister from './pages/Adminregister/index';
import Adminlogin from './pages/Adminlogin/index';
import Adminhome from './pages/Adminhome/index';
import Createevent from './pages/Createevent/index';
import Homenav from './pages/Homenav/index';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact render={props => <Homenav {...props} />} />
      <Route path='/event/:id' exact render={props => <Event {...props} />} />
      <Route path='/artist/:id' exact render={props => <Artistprofile {...props} />} />
      <Route path='/register/artist' exact render={props => <Artistregister {...props} />} />
      <Route path='/login/artist' exact render={props => <Artistlogin {...props} />} />
      <Route path='/profile/artist/create' exact render={props => <Createartist {...props} />} />
      <Route path='/artist/:id/edit' exact render={props => <Editartist {...props} />} />
      <Route path='/register/admin' exact render={props => <Adminregister {...props} />} />
      <Route path='/login/admin' exact render={props => <Adminlogin {...props} />} />
      <Route path='/admin/home' exact render={props => <Adminhome {...props} />} />
      <Route path='/create/event' exact render={props => <Createevent {...props} />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
