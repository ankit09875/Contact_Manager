import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactDetail from './contactDetail';
import api from '../api/contacts';
import EditContact from './EditContact';



function App() {

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);


  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuidv4(),
      ...contact
    }
    const response = await api.post('/contacts', request)

    setContacts([...contacts, response.data]);
  }

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const updatedContact = response.data;
    // Update the contact in the state with the updated data
    setContacts((contacts) =>
      contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c))
    );
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm)
    if (searchTerm !== "") {
      const newContactList = contacts.filter((Contact) => {
        return Object.values(Contact).join('').toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
      });
      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }

  }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts//${id}`);

    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContacts(newContactList)
  }

  const reteriveContacts = async () => {
    const response = await api.get('/contacts');
    return response.data;
  };


  useEffect(() => {
    const getAllCOntact = async () => {
      const allContact = await reteriveContacts();
      if (allContact) setContacts(allContact);
    }
    getAllCOntact();
  }, []);





  return (
    <>
      <div className="ui container">
        <Header />
        <Router>
          <Routes>

            <Route path='/' element={<ContactList contacts={searchTerm.length<1 ? contacts:searchResult} 
            getContactId={removeContactHandler}
              term={searchTerm} searchKeyword={searchHandler} />} 
              />

            <Route path='/add' element={<AddContact addContactHandler={addContactHandler} />}
            />
            <Route
              path="/edit/:id"
              element={<EditContact updateContactHandler={updateContactHandler} />}
            />
            <Route path="/contact/:id" element={<ContactDetail />} />

          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
