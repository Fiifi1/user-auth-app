import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Verifytoken({ email }) {
  console.log(email);
  
  const [is_authenticated, set_authenticated] = useState(false);
  const [token, set_token] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const effect_once = useRef(false);

  useEffect( () => {
    if (effect_once.current === true) {
      if (email) {
        set_authenticated(true);
      } else{
        alert('You can only be verified after attempting to login succesfully!');
        navigate('/');
      }
    }
    return () => {
      effect_once.current = true;
    }
  }, [email, navigate]);

  async function submit_token (event) {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/api/verify_token', {
        method: 'POST',
        headers:{
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          token: token,
        })
      });

      if (response.status === 'ok') {
          navigate('/dashboard');
      } 
      else {
        const { error } = await response.json();
        setError(error);
      }
    } 
    catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>

      {is_authenticated && (
        <div className='center'>
        <h3>Enter Token</h3>
        <form onSubmit={submit_token} className='card'>
          <label> Token: 
            <input className='container' type="text" value={token} onChange={(e) => set_token(e.target.value)} />
          </label>
          <br />
          <button className='container' type="submit">Verify Token</button>
        </form>
        {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
      </div>
      )}
    </div>
  );
}

export default Verifytoken;
