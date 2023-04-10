import React from "react";
import "./styles.css";


const Passwordstrength = (props) => {
  let strength_color;
  let strength_width;

  switch (props.score) {
    case 1:
        strength_color = "red";
        strength_width = "20%";
        break;
    case 2:
        strength_color = "orange";
        strength_width = "40%";
        break;
    case 3:
        strength_color = "yellow";
        strength_width = "60%";
        break;
    case 4:
        strength_color = '#5cff47';
        strength_width = '80%';
        break;
    case 5:
        strength_color = 'green';
        strength_width = '100%';
        break;
    default:
        strength_color = "";
        strength_width = ""; 
  }

  const style = { 
    backgroundColor: strength_color, 
    height: '5px', 
    width: strength_width, 
    transition: 'all 300ms ease-in-out', 
    marginTop: '5px',
    marginBottom: '5px', }

  return (
  <div>
    <p className="weak_password">weak</p>
    <p className="strong_password">strong</p>
    <div style={style} />
  </div> 
  );

}

export default Passwordstrength;

