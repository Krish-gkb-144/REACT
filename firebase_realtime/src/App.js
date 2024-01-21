import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [record, setRecord] = useState([]);
  const [editid, setEditid] = useState("");

  const onsubmit = () => {
    console.log("hii");
    if (editid) {
      axios.put(`https://fir-l22-default-rtdb.firebaseio.com/user/${editid}.json`, {
        name: name,
        phone: phone
      }).then((res) => {
        setName("");
        setPhone("");
        getrecord();
      }).catch((err) => {
        return false;
      })
    } else {
      axios.post(`https://fir-l22-default-rtdb.firebaseio.com/user.json`, {
        name: name,
        phone: phone
      }).then((res) => {
        setName("");
        setPhone("");
        getrecord();
      }).catch((err) => {
        return false;
      })
    }

  }

  const getrecord = () => {
    axios.get(`https://fir-l22-default-rtdb.firebaseio.com/user.json`)
      .then((res) => {
        let data = res.data;
        let record = [];
        for (let i in data) {
          record.unshift({
            ...data[i], id: i
          });
        }
        setRecord(record);
      }).catch((err) => {
        return false;
      })
  }

  const ondeleteData = (id) => {
    axios.delete(`https://fir-l22-default-rtdb.firebaseio.com/user/${id}.json`)
      .then((res) => {
        getrecord();
      }).catch((err) => {
        return false;
      })
  }

  const onEditData = (id, name, phone) => {
    setName(name);
    setPhone(phone);
    setEditid(id);
  }

  useEffect(() => {
    getrecord();
  }, [])

  return (
    <center>
      <table>
        <tbody>
          <tr>
            <td>Name :-</td>
            <td><input type='text' name='name' onChange={(e) => setName(e.target.value)} value={name} /></td>
          </tr>
          <tr>
            <td>Phone :-</td>
            <td><input type='text' name='phone' onChange={(e) => setPhone(e.target.value)} value={phone} /></td>
          </tr>
          <tr>
            <td></td>
            <td>
              {
                editid ? (<input type='button' value="Edit" onClick={() => onsubmit()} />)
                  : (<input type='button' value="Submit" onClick={() => onsubmit()} />)
              }

            </td>
          </tr>
        </tbody>
      </table>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            record.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.phone}</td>
                  <td>
                    <button onClick={() => ondeleteData(val.id)}>Delete</button>
                    <button onClick={() => onEditData(val.id, val.name, val.phone)}>Edit</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </center>
  );
}

export default App;
