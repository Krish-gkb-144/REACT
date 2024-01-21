import { useEffect, useState } from "react";

const Mycrud = () => {

    const [input, setInput] = useState({
        name: ""
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
        const { name } = input;
        if (editid) {
            let ans = record.map((item)=>{
                if(item.id == editid){
                    return{
                        ...item,
                        name : name,
                    }
                }
                return item;
            })
            setRecord(ans);
            setEditid("");
        }
        else {
            let obj = {
                id: Math.floor(Math.random() * 1000),
                name: name
            }
            let data = [...record, obj];
            setRecord(data);
            localStorage.setItem('crud',JSON.stringify(data));
        }
        setInput({
            name: ""
        })
    }
    const Deletedata = (id) => {
        let ans = record.filter((item) => {
            return item.id !== id;
        })
        setRecord(ans);
        localStorage.setItem('crud', JSON.stringify(ans));
        alert("Delete Record");
    }
    const Editdata = (id) => {
        let ans = record.filter((item) => {
            return item.id === id;
        })
        setInput(ans[0]);
        setEditid(ans);
    }

    useEffect(() => {
        let allrecord = JSON.parse(localStorage.getItem('crud'));
        if (allrecord === null) {
            setRecord([]);
        } else {
            setRecord(allrecord)
        }
    }, [])

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>Name:-</td>
                        <td><input type="text" name="name" value={input.name} onChange={onchange} /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{
                            (editid) ? (<input type="button" value="Edit" onClick={() => onsubmit()} />)
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
                        <th>Actiev</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        record.map((item) => {
                            const { id, name } = item
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>
                                        <button onClick={() => Deletedata(id)}>Delete</button>
                                        <button onClick={() => Editdata(id)}>Edit</button>
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
export default Mycrud; 