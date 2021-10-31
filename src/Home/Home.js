import React, { useEffect, useState } from "react";
import './Home.css'
import {Link} from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // component mounted
    fetch("http://localhost:4000/api/users/findAll", {
        method: "GET",
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    .then((resp) => resp.json())
    .then(function(response) {
        console.info('fetch()', response);
        setData(response.filter(item => item.image))
        return response;
    }).catch((error) => {
      console.log(error)
    });
  }, [])

  const deleteHandler = (_id) => {
    fetch("http://localhost:4000/api/users/" + _id, {
      method: "DELETE",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(response) {
        console.info('fetch()', response);
        setData(data.filter(item => item._id !== _id))
        return response;
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div className="main">
      <Link className="create" to="/create">Create</Link>
      <table className="table">
        <thead>
        <tr>
          <th>Sr.No</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Image</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {
          data.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td><img style={{width: '30px', height: '30px'}} src={item.image}></img></td>
                <td>
                  <Link to={"/update?_id=" + item._id}>Edit</Link>
                </td>
                <td>
                  <button onClick={() => deleteHandler(item._id)}>Delete</button>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
};

export default Home;
