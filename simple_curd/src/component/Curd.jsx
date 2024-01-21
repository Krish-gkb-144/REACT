import { useEffect, useState } from "react";

const Curd = () => {
    const [input, setInput] = useState({
        name: '',
        phone: '',
    })
    const [record, setRecord] = useState([]);
    const [editid, setEditid] = useState("");
    
    const onchange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input, [name]: value
        })
    }
    const onsubmit = () => {
        const { name, phone } = input;
        if (!name || !phone) {
            alert('please Enter Your Record..');
        } else {
            let obj = {
                id: Math.floor(Math.random() * 1000),
                name: name,
                phone: phone
            }
            let data = [...record, obj];
            setRecord(data);
            localStorage.setItem('crud', JSON.stringify(data));
            setInput({
                name: '',
                phone: '',
            })
        }
    }
    const deleteData = (id) => {
        let ans = record.filter((item) => {
            return item.id !== id;
        })
        setRecord(ans);
        localStorage.setItem('crud', JSON.stringify(ans));
        alert("Delete Record");
    }
    const editData = (id) => {
        let ans = record.filter((item) => {
            return item.id === id;
        })
        setInput(ans[0]);
        setEditid(id);
    }
    const onedit = () => {
        let { name, phone } = input;
        let ans = record.map((item) => {
            if (item.id == editid) {
                return {
                    ...item,
                    name: name,
                    phone: phone
                }
            }
            return item;
        })
        setRecord(ans);
        localStorage.setItem('crud', JSON.stringify(ans));
    }
    const onsearch = (e) => {
        let alldata = JSON.parse(localStorage.getItem('crud'));
        let ans = alldata.filter((item) => {
            return item.phone === e.target.value
        });
        setRecord(ans);
    }
    useEffect(() => {
        let allrecord = JSON.parse(localStorage.getItem('crud'));
        if (allrecord === null) {
            setRecord([]);
        } else {
            setRecord(allrecord);
        }
    }, [])
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td><input type="text" onChange={onsearch} /></td>
                    </tr>
                    <tr>
                        <td>Name :-</td>
                        <td><input type="text" name="name" onChange={onchange} value={input.name} /></td>
                    </tr>
                    <tr>
                        <td>Phone :-</td>
                        <td><input type="text" name="phone" onChange={onchange} value={input.phone} /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            {
                                (editid) ? (<input type="button" value="Edit" onClick={() => onedit()} />)
                                    : (<input type="button" value="Submit" onClick={() => onsubmit()} />)
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
            <table border={1}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        record.map((itme) => {
                            const { id, name, phone } = itme
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{phone}</td>
                                    <td>
                                        <button onClick={() => deleteData(id)}>Delete</button>
                                        <button onClick={() => editData(id)}>Edit</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
export default Curd;