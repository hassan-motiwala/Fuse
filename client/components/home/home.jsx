import React from 'react'
import './home.css';

const Home = () => {
    return ( 
        <div className="content">
            <h3 className='title'>Welcome to Fuse</h3>
            <a className="btn btn-info" href='/login'> Login</a>
            <br/>
            <a className="btn btn-info" href='/signup'> Sign Up</a>
            <br/>
            <a className="btn btn-info" href='/auth/logout'> Logout</a>
        </div>
    );
};

export default Home;