import React, { useRef } from 'react'
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';


export default function ContactList(props) {
  const inputEi = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id)
  }
  const rernderContactList = props.contacts.map((contact) => {

    return (
      <ContactCard contact={contact} clickHandler={deleteContactHandler} />
    )
  })

  const getSearchTerm = () => {
    props.searchKeyword(inputEi.current.value)
  }


  return (
    <div className="main">
      <h2 style={{ marginTop: '50px' }}>Contact List
        <Link to='/add'>
          <button className='ui button blue right' style={{ float: "right", marginBottom: '5px' }}>Add Contacts</button>
        </Link>

      </h2>
      <div className="ui search">
        <div className="ui icon input" style={{ marginLeft: '40%' }}>
          <input type="text" placeholder='Search contacts' className='prompt' style={{ border: "2px solid black" }}
            value={props.term} onChange={getSearchTerm} ref={inputEi}
          />
          <i className="search icon "></i>
        </div>
      </div>

      <div className='ui celled list'>
        {rernderContactList.length > 0 ? rernderContactList:"No Contacts Available"}
      </div>
    </div>
  )
}
