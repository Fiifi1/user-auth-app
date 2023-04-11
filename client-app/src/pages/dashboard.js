import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './styles.css'

const Dashboard = () => {
    const navigator = useNavigate();
    const [quote, setQuote] = useState('');
    const [message, setMessage] = useState('');

    //put some text message added to the user model on the dashboard
    async function populateQuote(){
        await fetch('http://localhost:5000/api/quote', {
            headers:{
                'x-access-token': localStorage.getItem('token')
            }
        }).then( response => {
            if (response.ok){
                return response.json();
            } else {
                throw new Error("Server error");
            }
        } ).then( data => {
            setQuote(data.quote);
        }).catch ( error => {
            console.error("fetch operation failed");
        } );
    }

    // react function to persist the token (with data) of the user from the login page
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token){
            const user = jwt_decode(token);
            if (!user){
                localStorage.removeItem('token');
                navigator('/');
            } else {
                populateQuote();
            }
        }
    }, [navigator]);

    async function updateQuote(event){
        event.preventDefault();
        const request = await fetch('http://localhost:5000/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                quote: message,
            }) 
        });
        const req_data = await request.json();
        if (req_data.status === 'ok'){
            setQuote(message);
            setMessage('');
        } else{
            alert(req_data.error);
        }
    };

    return (
        <div className='center'>
            <h3>Your message: { quote || 'You have no message yet !' }</h3>
            <form onSubmit={updateQuote}>
                <textarea className='container' placeholder="Type a message here" value={ message } onChange={(e)=>setMessage(e.target.value)}/>
                <br/>
                <input className='container' type="submit" value="update message" />
                <button type='button'>logout</button>
            </form>
        </div>
    )
};

export default Dashboard;
