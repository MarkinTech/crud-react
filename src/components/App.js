import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import './App.css';

import {v4 as uuid} from 'uuid';
import api from '../api/contacts';
import Header from'./Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import EditContact from './EditContact';


function App() {

const LOCAL_STORAGE_KEY = "contacts";

//const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
const [contacts, setContacts] = useState([]);
const [searchTerm, setSearchTerm] = useState([]);
const [searchResults, setSearchResults] = useState([]);

const retrieveContacts = async () =>{
  const response = await api.get("/contacts");
  return response.data;
};



const addContactHandler = async (contact) => {

  const request = {
    id:uuid(),
    ...contact
  }
  const response = await api.post("/contacts",request)
  console.log(response);
  setContacts([...contacts, response.data]);
};

const updateContactHandler = async (contact) =>{
  const response = await api.put(`/contacts/${contact.id}`, contact);
  const {id,name,email} = response.data;
  setContacts(contacts.map(contact => {
      return contact.id === id ? {...response.data} : contact;
  }) 
  );
  
};



const removeContactHandler = async (id)=>{
  await api.delete(`/contacts/${id}`);
  const newContaclList = contacts.filter((contact)=>{
      return contact.id!==id;
  })

  setContacts(newContaclList);
}

const searchHandler = (searchTerm) => {
   setSearchTerm(searchTerm);
   if(searchTerm !== ""){
     const newContactList = contacts.filter((contact) => {

      return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(newContactList);
 }
 else{
  setSearchResults(contacts);
 }
}


useEffect(() => {
  const getAllContacts = async () => {
    const allContacts = await retrieveContacts();
    if(allContacts) setContacts(allContacts);
  };
   getAllContacts();
},[])


useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
},[contacts]);


  
  return (
    <div className='ui container'>
      <div className='ui card centered'> <h2 className='ui center'>CONTACT MANAGER</h2></div>
    <Router>  
     <Switch>
      <Route path='/' exact render={ (props) => (<ContactList {...props} contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId = {removeContactHandler } 
      term = {searchTerm}  
      searchKeyword = {searchHandler} /> )}  />
      <Route path='/add' render={ (props) => (<AddContact {...props} addContactHandler={addContactHandler} />)}   />



      <Route path='/edit' render={ (props) => (<EditContact {...props} updateContactHandler={updateContactHandler} />)}   />
      <Route path='/contact/:id' component={ContactDetails}></Route>

      </Switch>
    </Router>
    
          
     {/*<AddContact addContactHandler={addContactHandler} />
     <ContactList contacts ={contacts} getContactId = {removeContactHandler } /> {/*ssdfdsf*/}
     

    </div>
  );
} 

export default App;
