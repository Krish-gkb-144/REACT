import logo from './logo.svg';
import './App.css';
import { INC, DEC, ADDRECORD, DELETEDATA, EDITDATA , UPDATE_RECORD} from './action/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function App() {

  const no = useSelector(state => state.Counter);
  const dispatch = useDispatch();

  const record = useSelector(state => state.crud.users);
  const single = useSelector(state => state.crud.user)

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [edit, setEdit] = useState("");

  const submitData = () => {
    if (edit) {
      let obj = {
        id: edit,
        name: name,
        phone: phone
      }
      dispatch(UPDATE_RECORD(obj))
    } else {
      let obj = {
        id: Math.floor(Math.random() * 10000),
        name: name,
        phone: phone
      }
      dispatch(ADDRECORD(obj))
    }
    setName("");
    setPhone("");
  }
  useEffect(() => {
    setName(single.name);
    setPhone(single.phone);
    setEdit(single.id);
  }, [single]);

  return (
    <>
      <center>
        <button onClick={() => dispatch(INC())}>+</button>
        <button onClick={() => dispatch(DEC())}>-</button>
        <h1>{no}</h1>

        <table>
          <tbody>
            <tr>
              <td>Name:-</td>
              <td><input type='text' name='name' onChange={(e) => setName(e.target.value)} value={name} /></td>
            </tr>
            <tr>
              <td>Phone:-</td>
              <td><input type='text' name='phone' onChange={(e) => setPhone(e.target.value)} value={phone} /></td>
            </tr><tr>
              <td></td>
              <td>
                {
                  edit ? (<button type='button' onClick={() => submitData()}>Edit</button>) :
                    (<button type='button' onClick={() => submitData()}>Submit</button>)
                }

              </td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>phone</th>
              <th>action</th>
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
                    <tb>
                      <button onClick={() => dispatch(DELETEDATA(id))}>Delete</button>
                      <button onClick={() => dispatch(EDITDATA(id))}>Edit</button>
                    </tb>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </center>
    </>
  );
}

export default App;
