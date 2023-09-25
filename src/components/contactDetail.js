import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import user from '../images/user1.jpg'

export default function ContactDetail() {
    const { id } = useParams(); // Get the 'id' parameter from the URL
    const name = new URLSearchParams(window.location.search).get('name');
    const email = new URLSearchParams(window.location.search).get('email');

    return (
        <div className="main">
            <div className="ui card centered" style={{ marginTop: '50px' }}>
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div>
                <div className="center-div">
                    <Link to={'/'}>
                        <button className='ui button blue center' style={{marginLeft:'43%'}}>
                            Back to Contact List
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
