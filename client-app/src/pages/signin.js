import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Verifytoken from './verify_token';
import './styles.css';

function Signin() {
  //state variables and functionsfor the signin component
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [submitted, set_submitted] = useState(false);
  const navigator = useNavigate();
  
  // submit signin form
  async function signin(event){
    event.preventDefault()

    const response = await fetch('http://127.0.0.1:5000/api/signin', {
      method: 'POST',
      headers:{
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    });
    // validate the user and move on to dashboard if successful else
    // alert user of invalid credentials and go back to homepage
    const user_data = await response.json();

    if (user_data.user){
        localStorage.setItem('token', user_data.user);
        alert('Check your email for the one-time-token');
        set_submitted(true);
    } 
    else {
        alert('Invalid email and password');
        navigator('/');
    }
  };


  return (
    <div>
      { !submitted && (<div className='center' >
        <h3>Login</h3>
        <form onSubmit={signin} className='container card'>
          <input className='container' value={email} onChange={(e)  => set_email(e.target.value)} type="email" placeholder="Email" />
          <br/>
          <input className='container' value={password} onChange={(e) => set_password(e.target.value)} type="password" placeholder="Secure Password" />
          <br/>
          <input className='container' type="submit" value="Login" />
          <br/>
        </form>
      </div>)}
      {submitted && <Verifytoken email={email} />}
    </div>
  );
}

export default Signin;