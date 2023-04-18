import React, {useState, useEffect} from "react";

function TestComponent (props){
    const email = props.email;
    console.log(email);
    const [is_email, set_email] =  useState(false);

    useEffect (()=>{
        if (email){
            set_email(true);
        }
    }, [email]);

    return (
        <div>
            {is_email &&
            <h3>The email from the login page is {email}</h3>
            }
        </div>
    );
}

export default TestComponent;