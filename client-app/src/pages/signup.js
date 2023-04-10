import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Passwordstrength from './password_strength';
import isEmail from 'validator/lib/isEmail';
import zxcvbn from 'zxcvbn';
import ReCAPTCHA from "react-google-recaptcha";
import './styles.css';

function Signup() {
  const navigate = useNavigate();
  const captcha_ref = useRef(null);
  // state variables and their functions on the signup component
  const [username, set_username] = useState("");
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [confirm_password, set_confirm_password] = useState("");
  const [score, set_score] = useState(0);
  const [showpassword, set_showpassword] = useState(false);
  const [validation_errors, set_validation_errors] = useState({
    is_form_valid: true,
    message: "",
    errors: {}
  });
 
  const setPassword = (event) => {
    const password_value = event.target.value;
    /*
    This method updates the password state and verifies the strength
    of the password using the `zxcvbn` library, based on my research, this 
    library provides the most acurate password strength score as it takes
    into consideration different kinds of common passwords as well natural 
    password formats
    */
    if (password_value !== "") {
      const { score } = zxcvbn(password_value);
      set_score(score + 1);
    } else {
      set_score(0);
    }
    
    set_password(password_value);
    console.log(password, score);
  };
  
  //Main signup function that is fired when the signup button is clicked. 
  async function signup(event){
    event.preventDefault()

    const captcha_token = captcha_ref.current.getValue();
    captcha_ref.current.reset();

    const {is_form_valid, message, errors} = validate_fields(username, email, password, confirm_password);
    set_validation_errors({is_form_valid, message, errors});

    //Validate the fields of the signup form, username, email, passwords
    if (is_form_valid){
      const response = await fetch('http://127.0.0.1:5000/api/signup', {
        method: 'POST',
        headers:{
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          captcha_token,
        })
      });
      //Move on to signin page if signup is successfull else alert the user with errors
      const user_data = await response.json();
  
      if(user_data.status === 'ok'){
        navigate('/signin');
        //console.log('sign up successful', user_data.data);
      } else {
        console.log(user_data.error);
      };
    } else {
      alert(message);
    }
  };

  // validation function that checks the fields on theform
  const validate_fields = (username, email, password, confirm_password,) => {
    const errors = {};
    let message = ""
    let is_form_valid = true;

    if (!username || typeof(username) !== "string" || username.trim().length === 0 ){
      is_form_valid = false;
      errors.username = "Kindly set a username";
    }
    if (!email || typeof(email) !== "string" || !isEmail(email)){
      is_form_valid = false;
      errors.email = "Kindly provide a correct email";
    }
    if (!password || typeof(password) !== "string" || password.trim().length < 8){
      is_form_valid = false;
      errors.password = "Your password must consist of at least 8 characters"
    }
    if (!confirm_password || password !== confirm_password){
      is_form_valid = false;
      errors.confirm_password = "Passwords do not match"
    }
    if (!is_form_valid){
      message = "Something may be wrong on the form"
    }
    return {is_form_valid, message, errors};
  };

  // simple toggler for the show or hide password button
  const toggle_show_password = () => {
    set_showpassword(!showpassword);
  };

  return (
    <div className='center'>
      <h3>Register</h3>
      <form onSubmit={signup} className='card container'>
        <input className='container' value={username} onChange={(e) => set_username(e.target.value)} type="text" placeholder="Username"/>
        {validation_errors.errors.username && <p style={{ color: "red" }}>{ validation_errors.errors.username }</p>}
        <br/>
        <input className='container' value={email} onChange={(e)  => set_email(e.target.value)} type="email" placeholder="Email" />
        {validation_errors.errors.email && <p style={{ color: "red" }}>{ validation_errors.errors.email }</p>}
        <br/>
        <input className='container' value={password} onChange={setPassword} type={showpassword ? 'text' : 'password'} placeholder="Enter password" />
        {validation_errors.errors.password && <p style={{ color: "red" }}>{ validation_errors.errors.password }</p>}
        <br/>
        <div className="center password_row">
          {score >= 1 && (
            <div className='center'>
              <Passwordstrength score={score} /> 
              <button type="button" className="showhidepasswordbutton" onClick={toggle_show_password}> {showpassword ? 'Hide' : 'Show'} </button>
            </div>
            )} 
        </div>
        <input className='container' value={confirm_password} onChange={(e) => set_confirm_password(e.target.value)} type={showpassword ? 'text' : 'password'} placeholder="Confirm password" />
        {validation_errors.errors.confirm_password && <p style={{ color: "red" }}>{ validation_errors.errors.confirm_password }</p>}
        <div>
          <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} ref={captcha_ref} />
        </div>
        
        <input type="submit" value="Sign Up" className='signup-button' />
      </form>
    </div>
  );
}

export default Signup;
