import React from 'react'
import user from '../images/user.png';
import { Link } from 'react-router-dom';

export default function ContactCard(props) {
  const { id, name, email } = props.contact;
  return (
    <div>
      <div className="item">
        <img className='ui avatar image' src={user} alt="user" style={{ marginBottom: '25px' }} />
        <div className="content" style={{ display: "inline-block", marginLeft: '10px' }}>
         
        <Link to={`/contact/${id}?name=${name}&email=${email}`}>



            <div className="header">{name}</div>

            <div>{email}</div>
          </Link>
        </div>
        <i className="trash alternate outline icon" 
        style={{ color: "red", float: "right", marginTop: "10px",marginLeft:'10px' }} 
        onClick={() => props.clickHandler(id)}>
        </i>
        <Link to={`/edit/${id}?name=${name}&email=${email}`}>
        <i className="edit alternate outline icon" style={{ color: "blue", float: "right", marginTop: "10px" }} ></i>
        </Link>
      </div>
    </div>
  )
}
