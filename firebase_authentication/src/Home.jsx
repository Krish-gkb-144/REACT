import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {

    const navigate = useNavigate();

    const onLogut = async() => {
        try{
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/')
        }catch(err){
            return false;
        }
    }
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(()=>{
        if(!user){
            navigate('/');
        }
    },[])

    return(
        <button onClick={onLogut}>Logout</button>
    )
}

export default Home;