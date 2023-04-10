import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Verifytoken({ email }) {
  const [token, set_token] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit_token = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/api/verify_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, token })
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        const { error } = await response.json();
        setError(error);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='center'>
      <h3>Enter Token</h3>
      <form onSubmit={submit_token} className='card'>
        <label>
          Token:
          <input className='container' type="text" value={token} onChange={(e) => set_token(e.target.value)} />
        </label>
        <br />
        <button className='container' type="submit">Verify Token</button>
      </form>
      {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
    </div>
  );
}

export default Verifytoken;
