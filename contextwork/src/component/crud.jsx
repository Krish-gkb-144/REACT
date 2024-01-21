import { useContext } from "react";
import { crudContext } from "../App";

const Crud = () => {
    const record = useContext(crudContext);

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td><input type='text' name="name" onChange={record.onchange} value={record.input.name}/></td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td><input type='text' name="phone" onChange={record.onchange} value={record.input.phone}/></td>
                    </tr>
                    <tr>
                        <td>
                            {
                                (record.edit) ? (<button type="button" onClick={ () => record.submitData()} >Edit</button>)
                                            : (<button type="button" onClick={ () => record.submitData()} >Submit</button>)
                            }
                            
                        </td>
                    </tr>
                </tbody>
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
                            record.alldata.map( (val) => {
                                const {id,name,phone} =val
                                return(
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td>{phone}</td>
                                        <td>
                                            <button onClick={() => record.ondelete(id)}>Delete</button>
                                            <button onClick={() => record.onedit(id)}>Edit</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </table>
        </>
    )
}

export default Crud;