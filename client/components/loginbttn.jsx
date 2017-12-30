import React from 'react';
import axios from 'axios';

export default class LoginBttn extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = {
        user: 'Guest',
        isLoggedIn: false
        };
    }
    //Checks if user is logged in already
    componentDidMount() {
        axios.get('/api/current-user')
        .then(({data}) => {
        if (data.username == undefined) {
            this.setState({user: 'Guest', isLoggedIn: false});
        } else {
            this.setState({user: data.username, isLoggedIn: true});
        }}).catch((err) => {
            console.log(err);
        });
	}
  
    login() {
        axios.get('/api/current-user')
        .then(({data}) => {
        if (data.username != undefined) {
            this.setState({user: data.username, isLoggedIn: true});
        }}).catch((err) => {
            console.log(err);
        });
    }
  
    logout() {
        axios.get('/auth/logout')
        .then(()=> {
            this.setState({user: 'Guest', isLoggedIn: false});
        }).catch((err) => {
            console.log(err);
        });
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button = null;
        if (isLoggedIn) {
            button = <LogoutButton onClick = {this.logout} />;
        } else {
            button = <LoginButton onClick = {this.login} />;
        }
        return (
            <div className='log-button'>
                {button}
                {this.state.user}
            </div>
        );
    }
}


function LoginButton(props) {
    return (
    <div>
        <button onClick={props.onClick} type="button" className="btn btn-primary" data-toggle="modal" data-target="#loginModal">
        Login
        </button>
        <div className="modal fade" id="loginModal" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="login">Login</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form action='/login' method='POST'>
                            <div className='form-group row'>
                                <label>Email address</label>
                                <div className='col-sm-10'>
                                    <input type='email' className='form-control' name='email' aria-describedby='emailHelp' placeholder='Enter email'/>
                                </div>
                                <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
                            </div>
                            <div className='form-group row'>
                                <label>Password</label>
                                <div className='col-sm-10'>
                                    <input type='password' className='form-control' name='password' placeholder='Password'/>
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
        Logout
        </button>
    );
}