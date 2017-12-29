import React from 'react';
import './signup.css';

export default class Signup extends React.Component {
    render() {
        return(
            <form action='/signup' method='POST'>
                <div className='form-group row'>
                    <label>First Name</label>
                    <div className='col-sm-10'>
                        <input type='text' className='form-control' name='fName' placeholder='Enter First Name'/>
                    </div>
                </div>
                <div className='form-group row'>
                    <label>Last Name</label>
                    <div className='col-sm-10'>
                        <input type='text' className='form-control' name='lName' placeholder='Enter Last Name'/>
                    </div>
                </div>
                <div className='form-group row'>
                    <label>Phone Number</label>
                    <div className='col-sm-10'>
                        <input type='number' className='form-control' name='phone' placeholder='Enter Phone Number'/>
                    </div>
                </div>
                <div className='form-group row'>
                    <label>User Name</label>
                    <div className='col-sm-10'>
                        <input type='text' className='form-control' name='username' placeholder='Enter Username'/>
                    </div>
                    <small id='usernameHelp' className='form-text text-muted'> This is the name others will see</small>
                </div>
                <div className='form-group row'>
                    <label>Password</label>
                    <div className='col-sm-10'>
                        <input type='password' className='form-control' name='password' placeholder='Password'/>
                    </div>
                </div>
                <div className='form-group row'>
                    <label>Email address</label>
                    <div className='col-sm-10'>
                        <input type='email' className='form-control' name='email' aria-describedby='emailHelp' placeholder='Enter email'/>
                    </div>
                    <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        );
    }
}