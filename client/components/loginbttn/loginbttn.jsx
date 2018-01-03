import React from 'react';
import axios from 'axios';
import './loginbttn.css';

export default class LoginBttn extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = {
        user: '',
        isLoggedIn: null,
        usertype: null
        };
    }
    
    //Checks if user is logged in already
    componentWillMount() {
        axios.get('/api/current-user')
        .then(({data}) => {
        if (data.username == undefined) {
            this.setState({user: '', isLoggedIn: false, usertype: null});
        } else {
            this.setState({user: data.username, isLoggedIn: true, usertype: data.usertype});
        }}).catch((err) => {
            console.log(err);
        });
	}
  
    //Handles Login
    login() {
        axios.get('/api/current-user')
        .then(({data}) => {
        if (data.username != undefined) {
            this.setState({user: data.username, isLoggedIn: true, usertype: data.usertype});
        }}).catch((err) => {
            console.log(err);
        });
    }
    
    //Handles Logout
    logout() {
        axios.get('/auth/logout')
        .then(()=> {
            this.setState({user: '', isLoggedIn: false, usertype: null});
        }).catch((err) => {
            console.log(err);
        });
    }
    
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        var button = null;
        var signup = null;
        var user = null;
        if (isLoggedIn && isLoggedIn != null) {
            button = <LogoutButton onClick = {this.logout}/>;
            user = <UserGreetings value = {this.state.user} usertype = {this.state.usertype}/>;
        } else if (isLoggedIn != null) {
            button = <LoginButton onClick = {this.login}/>;
            signup = <SignupButton/>;
        }
        return (
            <div className='log-button'>
                {user}
                {button}
                {signup}
            </div>
        );
    }
}

function UserGreetings(props) {
    var setupUserType = null;
    if (props.usertype == null) {
        setupUserType = <SetupUserType/>;
    }
    return(
        <div id='user-data'>
            <div id='user-greetings'>
                Hello, {props.value}
            </div>
            {setupUserType}
        </div>
    );
}

function LoginButton(props) {
    return (
    <div id='login'>
        <div className='modal fade' id='loginModal' role='dialog' aria-labelledby='loginModal' aria-hidden='true'>
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='login'>Login</h5>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                    <div className='modal-body'>
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
                            <button type='submit' className='btn btn-primary'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <button onClick={props.onClick} type='button' className='btn btn-primary' data-toggle='modal' data-target='#loginModal'>
        Login
        </button>
    </div>
    );
}

function LogoutButton(props) {
    return (
        <div id='logout'>
            <button onClick={props.onClick} className='btn btn-warning'>
            Logout
            </button>
        </div>
    );
}

function SignupButton (props) {
    return(
        <div id='signup'>
            <a href='/signup'>
                <button onClick={props.onClick} className='btn btn-success'>
                Sign Up
                </button>
            </a>
        </div>
    );
}

function SetupUserType(props) {
    return(
        <div id='setting-modal'>
            <button type='button' className='btn btn-primary' data-toggle='modal' data-target='#user-type-modal'>
                Declare User Type
            </button>
            <div className='modal fade' id='user-type-modal' tabIndex='-1' role='dialog' aria-labelledby='user-modal' aria-hidden='true'>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='user-modal'>What Will You Be Using Fuse For?</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='card' id='card-driver' style={{width: '16rem'}}>
                                <img className='card-img-top' src='../images/steering-wheel.png' alt='Image Fail To load'/>
                                <div className='card-body'>
                                    <h5 className='card-title'>Driver</h5>
                                    <p className='card-text'>Stuff that the driver would do...</p>
                                </div>
                            </div>
                            <div className='card' id='card-passenger' style={{width: '16rem'}}>
                                <img className='card-img-top' src='../images/seat.png' alt='Image Fail To load'/>
                                <div className='card-body'>
                                    <h5 className='card-title'>Passenger</h5>
                                    <p className='card-text'>Stuff that the passenger would do...</p>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-primary'>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}