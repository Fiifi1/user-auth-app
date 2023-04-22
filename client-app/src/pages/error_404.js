import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'

const Pagenotfound = () => {
    return (
        <div className='home'>
            <h1>You are at the end of the world!</h1>
            <h3>404 error: Page not found</h3>
            <div>
            <Link to="/">
                <button className='container'>Go to our homepage</button>
            </Link>
            </div>
        </div>
    )
}

export default Pagenotfound;