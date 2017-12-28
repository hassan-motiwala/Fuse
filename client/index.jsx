import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';

import Home from './components/home.jsx';
import About from './components/about.jsx';
import Testing from './components/testing.jsx';
import NavBar from './components/navbar/navbar.jsx';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let routes = [
      { path: "/",           name: "Home",        btnType: "primary",   component: Home },
      { path: "/about",      name: "About",       btnType: "info",      component: About },
      { path: "/testing",      name: "Testing",       btnType: "info",      component: Testing }
    ];

    return (
      <BrowserRouter>
        <div style={{padding: "5%"}}>
          <NavBar/>
          <Switch>
              {routes.map(route => <Route exact path={route.path} component={route.component} key={route.path} />)}
              <Redirect to ="/"/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

render(<Index />, document.getElementById('app'));