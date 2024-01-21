import logo from './logo.svg';
import './App.css';
import Crud from './component/crud';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';

export const crudContext = createContext();

function App() {

  const [input, setInput] = useState({
    name: '',
    phone: ''
  });
  const [alldata, setAlldata] = useState([]);
  const [edit, setEdit] = useState("");

  const onchange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input, [name]: value
    })
  }

  const submitData = () => {
    const { name, phone } = input;
    if (edit) {
      let ans = alldata.map( (val) => {
        if(val.id == edit){
          return{
            ...val,
            name : name,
            phone : phone
          }
        }
        return val;
        
      })
      localStorage.setItem('crud', JSON.stringify(ans));
      setAlldata(ans);
      setEdit("");
    } else {
      let obj = {
        id: Math.floor(Math.random() * 10000),
        name: name,
        phone: phone
      }
      let data = [...alldata, obj];
      localStorage.setItem('crud', JSON.stringify(data));
      setAlldata(data);
    }
    setInput({
      name: '',
      phone: ''
    })
  }
  const ondelete = (id) => {
    let ans = alldata.filter((val) => {
      return val.id !== id
    })
    localStorage.setItem('crud', JSON.stringify(ans));
    setAlldata(ans);
  }
  const onedit = (id) => {
    let ans = alldata.filter((val) => {
      return val.id === id
    })
    setInput(ans[0]);
    setEdit(ans)
  }
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('crud'));
    if (data === null) {
      setAlldata([])
    } else {
      setAlldata(data)
    }
  }, [])

  return (
    <>
      <crudContext.Provider value={{ onchange, submitData, ondelete, onedit ,alldata, input, edit }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Crud />}></Route>
          </Routes>
        </BrowserRouter>
      </crudContext.Provider>
    </>
  );
}

export default App;
