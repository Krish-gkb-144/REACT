import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [record, setRecord] = useState([]);
  const [editid, setEditid] = useState("");

  const submitdata = () => {

    if (editid) {
      axios.put(`http://localhost:8000/user/${editid}`,{
        name : name,
        phone : phone
      }).then((res)=>{
        alert("record successfully Edit");
        setEditid("");
        fetchRecord();
      }).catch((err)=>{
        console.log(err);
        return false;
      })
    } else {
      axios.post(`http://localhost:8000/user`, {
        name: name,
        phone: phone
      }).then((res) => {
        alert("record successfully add");
        fetchRecord();
      }).catch((err) => {
        console.log(err);
        return false;
      })
    }
    setName("");
    setPhone("");
  }

  const fetchRecord = () => {
    axios.get(`http://localhost:8000/user`)
      .then((res) => {
        setRecord(res.data);
      }).catch((err) => {
        console.log(err);
        return false;
      })
  }

  const deleterecord = (id) => {
    axios.delete(`http://localhost:8000/user/${id}`)
      .then((res) => {
        alert("record successfully delete");
        fetchRecord();
      }).catch((err) => {
        console.log(err);
        return false;
      })
  }

  const editrecord = async (id) => {
    try {
      let edit = await axios.get(`http://localhost:8000/user/${id}`);
      if (edit) {
        setName(edit.data.name)
        setPhone(edit.data.phone)
        setEditid(edit.data.id)
      } else {
        console.log("record not fetch");
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  useEffect(() => {
    fetchRecord();
  }, [])

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>Nmae :-</td>
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
                editid ? (<input type='button' value="Edit" onClick={() => submitdata()} />)
                  : (<input type='button' value="Submit" onClick={() => submitdata()} />)
              }
            </td>
          </tr>
        </tbody>
      </table>
      <table border={1}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            record.map((val) => {
              const { id, name, phone } = val
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{phone}</td>
                  <td>
                    <button onClick={() => deleterecord(id)}>Delete</button>
                    <button onClick={() => editrecord(id)}>Edit</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  );
}

export default App;
