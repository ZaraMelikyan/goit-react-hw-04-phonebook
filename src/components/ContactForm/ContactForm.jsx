import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  StyledContactForm,
  StyledFormLabel,
  StyledFormInput,
  StyledFormButtonWrapper,
  StyledFormButton,
} from 'components/ContactForm/ContactForm.styled';


const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

 
  const handleChange = e => {
    const input = e.target.name;

    switch (input) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;

      default:
        break;
    }
  };
 
  const handleSubmit = e => {
    e.preventDefault();
    addContact({ name, number });
    resetForm();
  };

 
  const resetForm = () => {
    setName('');
    setNumber('');
  };

    return (
      <StyledContactForm onSubmit={handleSubmit}>
        <StyledFormLabel>
          Name
          <StyledFormInput
            type="text"
            name="name"
            value={name} 
            onChange={handleChange} 
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </StyledFormLabel>
        <StyledFormLabel>
          Number
          <StyledFormInput
            type="tel"
            name="number"
            value={number} 
            onChange={handleChange} 
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
            required
          />
        </StyledFormLabel>
        <StyledFormButtonWrapper>
          <StyledFormButton type="submit">
            Add contact
          </StyledFormButton>
        </StyledFormButtonWrapper>
      </StyledContactForm>
    );
  }


export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};