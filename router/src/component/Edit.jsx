import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {

    const navigate = useNavigate();

    const {id} = useParams();
    const [input,setInput] = useState({
        name : '',
    })

    const getRecord = () => {
        let all = JSON.parse(localStorage.getItem('crud'));
        if(all === null){
            return [];
        }else{
            return all;
        }
    }
    const [record,setRecord] = useState(getRecord);

    
    const onchange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput({
            ...input,[name] : value
        })
    }
    const alldataedit = () => {
        let name =  input.name;
        let ans = record.map((item) => {
            if(item.id == id){
                return{
                    ...item,
                    name : name,
                }
            }
            return item;
        })
        setRecord(ans);
        localStorage.setItem('crud',JSON.stringify(ans));   
        navigate('/view')
    }
    useEffect(()=>{
        let ans = record.filter((item)=>{
            return item.id == id;
        })
        setInput(ans[0])
    },[])

    return (
        <>
            <center>
                <table border={1}>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" name="name" value={input.name} onChange={onchange} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="button" value="Edit" onClick={() => alldataedit()} /></td>
                        </tr>
                    </tbody>
                </table>
            </center>
        </>
    )
}
export default Edit;