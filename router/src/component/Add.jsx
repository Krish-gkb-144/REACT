import { useEffect, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";

const Add = () => {

    const navigate = useNavigate();
    const [input,setInput] = useState({
        name : '',
    });
    const[alldata,setAlldata] = useState([]);

    const onchange = (e) => {
        let {name,value} = e.target;
        setInput({
            ...input,[name] : value
        })
    }

    const onclick = () => {
        let {name } = input
        let obj ={
            id : Math.floor(Math.random() * 10000),
            name : name,
        }
        let data = [...alldata,obj];
        localStorage.setItem('crud',JSON.stringify(data));
        setAlldata(data);
        setInput({
            name : '',
        })
        navigate('/view');
    }
    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('crud'));
        if(data === null){
            setAlldata([])
        }else{
            setAlldata(data)
        }
    },[])

    return(
        <>
            <center>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" name="name" onChange={onchange}/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="button" value="Submit" onClick={() => onclick()}/></td>
                        </tr>
                    </tbody>
                </table>
        <Link to="/view">View</Link>
            </center>
        </>
    )
}
export default Add;