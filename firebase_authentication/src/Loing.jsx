import {signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Loing = () => {
    const navigate = useNavigate();

    const ongoogle = async() => {
        try{
            const record = await signInWithPopup(auth,googleAuthProvider);
            localStorage.setItem('token',record.user.accessToken);
            localStorage.setItem('user',JSON.stringify(record.user));
            navigate('/home');
        }catch(err){
            return false;
        }
    }
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(()=>{
        if(user){
            navigate('/home');
        }
    },[])

    return(
        <button onClick={ongoogle}>Google</button>
    )
}

export default Loing;