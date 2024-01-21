import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_RECORD, DELETE_RECORD, EDIT_RECORD, INC, UPPDATE, VIEW } from './action/action';
import { useEffect, useState } from 'react';

function App() {

  const dispatch = useDispatch();
  const record = useSelector(state => state.data.user)
  // const no = useSelector(state => state.data)

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [editid,setEditid] = useState("");

  const onsubmitData = () => {
    if(editid){
      dispatch(UPPDATE(name,phone,editid));
    }else{
      dispatch(ADD_RECORD(name,phone));
    }
    setName("");
    setPhone("");
    setEditid("");
  }

  const ondelete = (id) => {
    dispatch(DELETE_RECORD(id));
  }

  const onedit = (id,name,phone) => {
    setName(name);
    setPhone(phone);
    setEditid(id);
  }

  useEffect(()=>{
    dispatch(VIEW())
  },[])

  return (
    <>
      {/* <h1>No :-{no}</h1> */}
      {/* <button onClick={() => dispatch(INC())}>+</button> */}
      <table >
        <tbody>
          <tr>
            <td>Name :-</td>
            <td><input type='text' name='name' onChange={ (e) => setName(e.target.value)} value={name} /></td>
          </tr>
          <tr>
            <td>Phone :-</td>
            <td><input type='text' name='phone' onChange={ (e) => setPhone(e.target.value)} value={phone} /></td>
          </tr>
          <tr>
            <td></td>
            <td>
              {
                editid ?  (<input type='button' value="Edit" onClick={ () => onsubmitData()} />)
                :(<input type='button' value="Submit" onClick={ () => onsubmitData()} />)
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
            record.map((val)=>{
              const {id,name,phone} = val
              return(
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{phone}</td>
                  <td>
                    <button onClick={ () => ondelete(id)}>Delete</button>
                    <button onClick={ () => onedit(id,name,phone)}>Edit</button>
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
