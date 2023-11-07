import React from "react";
import { Link } from 'react-router-dom';
import user from '../images/User.png';

const ContactCard = (props) =>{

        const {id, name, email} = props.contact;
        return (
            <div className="item" style={{ display:'flex', justifyContent:'space-between' }}>
     
            <div className="content" style={{ display:'flex', justifyContent:'space-between' }}> 
            <div className="img">
            <img className="ui avatar image" src={user} alt="user"></img>
            </div>
            <div className="main-content">

            <Link to = {{pathname:`/contact/${id}`, state:{contact: props.contact}}}>
            <div className="header">{name}</div>
                <div>{email}</div>
            </Link>
            </div>
              
            </div>
            <div>
            
            <i className=" trash alternate icon" 
            style={{  color:'red', marginTop:'7px' }}
            onClick={()=> props.clickHandler(id)}
            ></i>
           
            <Link to = {{pathname:`/edit`, state:{contact: props.contact}}}>
            <i className=" edit alternate icon" 
            style={{  color:'red', marginTop:'7px' }}
            ></i>
            </Link>
            </div>
           </div>

        );
}

export default ContactCard;