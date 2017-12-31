import React from 'react';
import axios from 'axios';
import './signup.css';

export default class Signup extends React.Component {
    constructor(props) {
		super(props);
        this.signupCheck = this.signupCheck.bind(this);
	}

	signupCheck(e) {
	    e.preventDefault();
		axios.post('/signup', {
		    fName: this.fName.value, lName: this.lName.value, phone: this.phone.value,
		    username: this.username.value, password: this.password.value, email: this.email.value,
		    bday: this.bday.value
		}).then((response)=> {
		    if (response.data.valid) {
		        window.location = '/';
		    }
		}).catch((err)=> {
		    console.log(err);
		});
	}

    render() {
        return(
            <form onSubmit={this.signupCheck}>
                <div className='form-group row'>
                    <label>First Name</label>
                    <div className='col-sm-10'>
                        <input type='text' className='form-control' name='fName' placeholder='Enter First Name' ref={fName => this.fName = fName}/>
                    </div>
                </div>
                <div className='form-group row'>
                    <label>Last Name</label>
                    <div className='col-sm-10'>
                        <input type='text' className='form-control' name='lName' placeholder='Enter Last Name' ref={lName => this.lName = lName}/>
                    </div>
                </div>
                <div className='form-group row'>
                    <label>Phone Number</label>
                    <div className='col-sm-10'>
                        <input type='number' className='form-control' name='phone' placeholder='Enter Phone Number' ref={phone => this.phone = phone}/>
                    </div>
                </div>
                <div className='form-group row'>
                    <label>User Name</label>
                    <div className='col-sm-10'>
                        <input type='text' className='form-control' name='username' placeholder='Enter Username' ref={username => this.username = username}/>
                    </div>
                    <small id='usernameHelp' className='form-text text-muted'> This is the name others will see</small>
                </div>
                <div className='form-group row'>
                    <label>Password</label>
                    <div className='col-sm-10'>
                        <input type='password' className='form-control' name='password' placeholder='Password' ref={password => this.password = password}/>
                    </div>
                </div>
                <div className='form-group row'>
                    <label>Email address</label>
                    <div className='col-sm-10'>
                        <input type='email' className='form-control' name='email' aria-describedby='emailHelp' placeholder='Enter email' ref={email => this.email = email}/>
                    </div>
                    <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
                </div>
                <div className='form-group row'>
                    <label>Date</label>
                    <div className='col-5'>
                        <input className='form-control' name='bday' type='date' defaultValue='2000-01-01' id='date-input' ref={bday => this.bday = bday}/>
                    </div>
                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        );
    }
}