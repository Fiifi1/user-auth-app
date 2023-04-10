import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'

const Home = () => {
    return (
        <div className='home'>
            <h2>Good Day!</h2>
            <Link to="/signin">
                <button className='container'>Log In</button>
            </Link>
            <Link to="/signup">
                <button className='container'>Sign Up</button>
            </Link>
        </div>
    )
}

export default Home;