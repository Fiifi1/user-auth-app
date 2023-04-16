import React, { useState, useEffect, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './styles.css'

const Dashboard = () => {
    const navigator = useNavigate();
    const effect_once = useRef(false);
    const [user, set_user] = useState(null);
    const [quote, set_quote] = useState('');
    const [message, set_message] = useState('');

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
            set_quote(data.quote);
        }).catch ( error => {
            console.error("fetch operation failed");
        } );
    }

    // react function to persist the token (with data) of the user from the login page
    useEffect(()=>{
        if (effect_once.current === true){
            const token = localStorage.getItem('token');
            if (token){
                const current_user = jwt_decode(token);
                if (!current_user){
                    alert('You need to sign in first');
                    navigator('/signin');
                } else{
                    set_user(current_user);
                    populateQuote();
                }
            }else{
                alert('You must be a valid user to access the dashboard');
                navigator('/')
            }
         
           }        
        return () => {
            effect_once.current = true;
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
            set_quote(message);
            set_message('');
        } else{
            alert(req_data.error);
        }
    };

    const sign_out = () => {
        set_user(null);
        navigator('/signin');
        localStorage.removeItem('token');
    };

    return (
        <div>
            {user && (
                <div className='center'>
                    <h2>Welcome to your Dashboard, {user && user.username} !</h2>
                    <h4>Your message: { quote || 'You have no message yet !' }</h4>
                    <form onSubmit={updateQuote}>
                        <textarea className='container' placeholder="Type a message here" value={ message } onChange={(e)=>set_message(e.target.value)}/>
                        <br/>
                        <input className='container' type="submit" value="update message" />
                        <button type='button' className='container' onClick={sign_out} >Sign Out</button>
                    </form>
            </div>
            )}
        </div>
    )
};

export default Dashboard;
