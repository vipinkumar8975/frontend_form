import React, { useState } from "react";
import './Create.css';
import {Link} from 'react-router-dom'

const toBase64 = function(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
} 

const CreateForm = () => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    console.log("Data", e)
    const { first_name, last_name, email, phone, image } = e.target.elements;
    const file = image.files[0]
    toBase64(file).then((imageData) => {
      let details = {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        phone: phone.value,
        image: imageData
  
        // first_
        // name: name.value,
        // email: email.value,
        // message: message.value,
      };
      return fetch("http://localhost:4000/api/users/create", {
        method: "POST",
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(details),
      })
    }).then((resp) => resp.json())
    .then(function(response) {
        console.info('fetch()', response);
        alert('Data Submitted')
        setStatus('Submit')
        return response;
    }).catch((error) => {
      setStatus('Submit')
      console.log(error)
    });
  };
  
  return (
      <div className="div">
        <Link to="/" id="link">Home</Link>
        <form onSubmit={handleSubmit} className="form">
            <div className="block">
                <label htmlFor="first_name">First name:</label>
                <input type="text" id="first_name" required />
            </div>
            <div className="block">
                <label htmlFor="last_name">Last name:</label>
                <input type="text" id="last_name" required />
            </div>
            <div className="block">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" required />
            </div>
            <div className="block">
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" required />
            </div>
            <div className="block">
                <label htmlFor="image">Upload image:</label>
                <input type="file" id="image" accept="image/png, image/gif, image/jpeg" required />
            </div>
            <button className="button" type="submit">{status}</button>
            </form>
      </div>
  );
};

export default CreateForm;
