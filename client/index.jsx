import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';

import Home from './components/home/home.jsx';
import About from './components/about.jsx';
import Testing from './components/testing.jsx';
import NavBar from './components/navbar/navbar.jsx';
import Signup from './components/signup/signup.jsx';
import Login from './components/login/login.jsx';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			text: "Loading..."
		}
  }
  
  componentDidMount() {
		axios.get('/api/current-user')
		.then(({data}) => this.setState({
			text: data.username
		}));
	}
  render() {
    let routes = [
      { path: "/", name: "Home", component: Home },
      { path: "/about", name: "About", component: About },
      { path: "/testing", name: "Testing", component: Testing },
      { path: "/signup", name: "Signup", component: Signup },
      { path: "/login", name: "Login", component: Login }
    ];

    return (
      <BrowserRouter>
        <div style={{padding: "5%"}}>
          <NavBar/>
          <Switch>
              {routes.map(route => <Route exact path={route.path} component={route.component} key={route.path} />)}
              <Redirect to ="/"/>
          </Switch>
          <p>
  			    <pre>{this.state.text}</pre>	
          </p>
        </div>
      </BrowserRouter>
    );
  }
}

render(<Index />, document.getElementById('app'));