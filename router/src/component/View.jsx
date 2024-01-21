import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const View = () => {

    let all = localStorage.getItem('crud') ? JSON.parse(localStorage.getItem('crud')) : [] ;    

    const [record, setRecord] = useState(all);
    const [search,setSearch] = useState("");
    const [sortdata,setSortdata] = useState("");   

    const ondelete = (id) => {
        let ans = record.filter((item) => {
            return item.id !== id;
        })
        setRecord(ans);
        alert("Record Delete");
        localStorage.setItem('crud', JSON.stringify(ans));
    }

    useEffect(()=>{
        let namesearch = all.filter((item) => {
            return item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
        })
        setRecord(namesearch);
    },[search]);

    useEffect(()=>{
        let sortedData = [...record];
        if (sortdata === "asc") {
            setRecord(sortedData.sort((a, b) => a.name.localeCompare(b.name)));
        } else if (sortdata === "dsc") {
            setRecord(sortedData.sort((a, b) => b.name.localeCompare(a.name)));
        }else if (sortdata === "all"){
            setRecord([...all]);
        }
     },[sortdata]);

    // useEffect(() => {
    //     let data = JSON.parse(localStorage.getItem('crud'));
    //     if (data === null) {
    //         setRecord([]);
    //     } else {
    //         setRecord(data);
    //     }
    // }, [])
    return (
        <center>
            <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} />
            <table border={1}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action
                        <select onChange={ (e) => setSortdata(e.target.value) }>
                                   <option value="">---Select</option> 
                                   <option value="asc">---Asc---</option>
                                   <option value="dsc">---Dsc---</option>
                                   <option value="all">---All---</option>
                                </select>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        record.map((val,no) => {
                            const { id, name} = val;
                            return (
                                <tr key={id}>
                                    <td>{no + 1}</td>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>
                                        <button onClick={() => ondelete(id)}>Delete</button> ||
                                        <button> <Link to={`/edit/${id}`}>Edit</Link></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/">Add</Link>
        </center>
    )
}
export default View;