import React, { useState } from "react";
import './Edit.css'
import {
  Link,
  useLocation
} from "react-router-dom"

const toBase64 = function(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
} 

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Edit = () => {
  const [status, setStatus] = useState("Submit");
  const query = useQuery()
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
      return fetch("http://localhost:4000/api/users/" + query.get('_id'), {
        method: "PUT",
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
      <Link id="link" to="/">Home</Link>
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first_name">First name:</label>
        <input type="text" id="first_name" required />
      </div>
      <div>
        <label htmlFor="last_name">Last name:</label>
        <input type="text" id="last_name" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" required />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" required />
      </div>
      <div>
        <label htmlFor="image">Upload image:</label>
        <input type="file" id="image" accept="image/png, image/gif, image/jpeg" required />
      </div>
      <button className="button" type="submit">{status}</button>
    </form>
    </div>
  );
};

export default Edit;
