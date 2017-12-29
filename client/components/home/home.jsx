import React from 'react'
import './home.css';

const Home = () => {
    return ( 
        <div className="content">
            <h3 className='title'>Welcome to Fuse</h3>
            <a className="btn btn-info" href='/signup'> Sign Up</a>
        </div>
    );
};

export default Home;