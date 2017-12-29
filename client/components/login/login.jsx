import React from 'react';
import './login.css';

export default class Signup extends React.Component {
    render() {
        return(
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
            </form>
        )
    }
}