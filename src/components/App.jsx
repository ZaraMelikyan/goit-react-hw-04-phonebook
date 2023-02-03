import { useState, useEffect } from 'react';
import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';


const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const localStorageContacts = localStorage.getItem('contacts');
    const contactsParsed = JSON.parse(localStorageContacts);

    if (localStorageContacts) {
      return contactsParsed;
    } else {
      return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
    }
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  
  const addContact = data => {
    const id = nanoid();
    const newContact = { ...data, id };

    contacts.find(contact => contact.name === data.name)
      ? alert(`${data.name} is already in contacts`)
      : setContacts([...contacts, newContact]);
  };

 
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

 
  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  
  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

const filteredResults = filterContacts();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={filteredResults}
          onDeleteContact={deleteContact}
        />
      </Container>
    );
  }


export default App;
