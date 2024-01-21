import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState({
    name: "",
    date: "",
    gender: "",
    contact: "" 
  });
  const [record, setRecord] = useState([]);


  const onchange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input, [name]: value
    })
  }

  const onsubmit = () => {
    const { name, date, gender, contact } = input;
    let obj = {
      id: Math.floor(Math.random() * 1000),
      name: name,
      date: date,
      gender: gender,
      contact: contact
    }
    let data = [...record, obj];

    setRecord(data);

    let alphabets = /^[A-Za-z]+$/;
    let live_data = new Date().getFullYear() - parseInt(date);
   

    if (name.match(alphabets)) {
      if (live_data >= 18) {
        localStorage.setItem("crud", JSON.stringify(data));
      }
    } else {
      console.log("error");
    }
    // localStorage.setItem("crud",JSON.stringify(data)); 
    // console.log(contact_number);

  }




  useEffect(() => {
    let allrecord = JSON.parse(localStorage.getItem("crud"));
    if (allrecord === null) {
      setRecord([]);
    } else {
      setRecord(allrecord);
    }
  }, [])

  return (
    <div >
      <table>
        <tr>
          <td>Name :-</td>
          <td><input type='text' name='name' onChange={onchange} value={input.name} /></td>
        </tr>
        <tr>
          <td>Date :-</td>
          <td><input type='date' name='date' onChange={onchange} value={input.date} /></td>
        </tr>
        <tr>
          <td>Gender :-</td>
          <td>
            <input type="radio" id='Default' name="gender" onChange={onchange} value={"Default Select"} defaultChecked/>
            <label name="gender" htmlFor="Default" ca>Default Select</label>
            <input type="radio" id='male' name="gender" onChange={onchange} value={"Male"} />
            <label name="gender" htmlFor="male" >Male</label>
            <input type="radio" id="female" name="gender" onChange={onchange} value={"Female"} />
            <label name="gender" htmlFor="female" >Female</label>
          </td>
        </tr>
        <tr>
          <td>contact no :-</td>
          <td><input type="tel" name='contact' required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxLength="10" /></td>
        </tr>
        <tr>
          <td><button type='button' value="Submit" onClick={() => onsubmit()}>Submit</button></td>
        </tr>
      </table>
    </div>
  );
}

export default App;
