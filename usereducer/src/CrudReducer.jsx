import { logDOM } from "@testing-library/react";
import { useEffect, useReducer, useState } from "react";

let initialState = {
    users: localStorage.getItem('crud') ? JSON.parse(localStorage.getItem('crud')) : [],
    user: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADDRECORD':
            let insertdata = action.payload;
            let data = [...state.users, insertdata];
            localStorage.setItem('crud', JSON.stringify(data))
            return {
                ...state,
                users: data
            }

        case 'DELETE_DATA':
            let ans = state.users.filter((val) => {
                return val.id !== action.payload
            })
            localStorage.setItem('crud', JSON.stringify(ans))
            return {
                ...state,
                users: ans
            }

        case 'EDIT_DATA':
            let editdata = state.users.find((val) => {
                return val.id === action.payload
            })
            return {
                ...state,
                user: editdata
            }

        case 'UPDATE_RECORD':

            let update = state.users.map((val) => {
                if (val.id === action.payload.id) {
                    return {
                        ...val,
                        name: action.payload.name,
                        email: action.payload.email
                    }
                }
                return val;
            })
            localStorage.setItem('crud', JSON.stringify(update))
            return {
                ...state,
                users : update
            }
    }
}

const Crudreducer = () => {

    const [record, dispatch] = useReducer(reducer, initialState);
    const [input, setInput] = useState({
        name: '',
        email: ''
    });
    const [edit, setEdit] = useState("");
    const onchange = (e) => {
        let { name, value } = e.target;
        setInput({
            ...input, [name]: value
        })
    }

    const onsubmit = () => {
        const { name, email } = input;
        if (edit) {
            let obj = {
                id: edit,
                name: name,
                email: email
            }
            dispatch({
                type: 'UPDATE_RECORD',
                payload: obj
            })
        } else {
            let obj = {
                id: Math.floor(Math.random() * 10000),
                name: name,
                email: email
            }
            dispatch({
                type: 'ADDRECORD',
                payload: obj
            })
        }
    }

    const ondelete = (id) => {
        dispatch({
            type: 'DELETE_DATA',
            payload: id
        })
    }

    const onedit = (id) => {
        dispatch({
            type: 'EDIT_DATA',
            payload: id
        })
    }

    useEffect(() => {
        setInput({
            name: record.user.name,
            email: record.user.email,
            id: record.user.id
        })
        setEdit(record.user.id)
    }, [record.user])
    return (
        <center>
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" name="name" onChange={onchange} value={input.name}/></td>
                    </tr>
                    <tr>
                        <td>email</td>
                        <td><input type="text" name="email" onChange={onchange} value={input.email}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            {
                                edit ? (<input type="button" value="Edit" onClick={() => onsubmit()} />)
                                    : (<input type="button" value="Submit" onClick={() => onsubmit()} />)
                            }

                        </td>
                    </tr>
                </tbody>
            </table>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nmae</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        record.users.map((val) => {
                            const { id, name, email } = val;
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>
                                        <button onClick={() => ondelete(id)}>Delelt</button>
                                        <button onClick={() => onedit(id)}>Edit</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </center>
    )
}

export default Crudreducer;