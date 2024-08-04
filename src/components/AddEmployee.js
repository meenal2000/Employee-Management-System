import React, { useState } from 'react';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    country: '',
    zip_code: ''
  });
  const [contactMethods, setContactMethods] = useState([{ contact_method: 'EMAIL', value: '' }]);

  const handleAddContactMethod = () => {
    setContactMethods([...contactMethods, { contact_method: 'EMAIL', value: '' }]);
  };

  const handleRemoveContactMethod = (index) => {
    const newContactMethods = [...contactMethods];
    newContactMethods.splice(index, 1);
    setContactMethods(newContactMethods);
  };

  const handleChangeContactMethod = (index, field, value) => {
    const newContactMethods = [...contactMethods];
    newContactMethods[index][field] = value;
    setContactMethods(newContactMethods);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = { name, address, contact_methods: contactMethods };
    fetch('https://free-ap-south-1.cosmocloud.io/development/api/employee', {
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json',
        'projectId': '66ad466e2825ff676fa85fac', 
        'environmentId': '66ad466e2825ff676fa85fad', 
      },
      body: JSON.stringify(employee)
    }).then(() => window.location.href = '/');
  };

  return (
    <div className="container">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="line1">Address Line 1</label>
        <input type="text" id="line1" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} required />

        <label htmlFor="city">City</label>
        <input type="text" id="city" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />

        <label htmlFor="country">Country</label>
        <input type="text" id="country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} required />

        <label htmlFor="zip_code">Zip Code</label>
        <input type="text" id="zip_code" value={address.zip_code} onChange={(e) => setAddress({ ...address, zip_code: e.target.value })} required />

        <div id="contact-methods">
          <label>Contact Methods</label>
          {contactMethods.map((method, index) => (
            <div className="add-contact-method" key={index}>
              <select value={method.contact_method} onChange={(e) => handleChangeContactMethod(index, 'contact_method', e.target.value)} required>
                <option value="EMAIL">Email</option>
                <option value="PHONE">Phone</option>
              </select>
              <input type="text" value={method.value} onChange={(e) => handleChangeContactMethod(index, 'value', e.target.value)} required />
              <button type="button" onClick={() => handleRemoveContactMethod(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddContactMethod}>Add</button>
        </div>

        <button type="submit">Save Employee</button>
      </form>
      <button onClick={() => window.location.href = '/'}>Back to List</button>
    </div>
  );
};

export default AddEmployee;
