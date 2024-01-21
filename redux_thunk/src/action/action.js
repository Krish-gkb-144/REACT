import axios from "axios"

// export const INC = () => {
//     return{
//         type : "INC"
//     }
// }

export const VIEW = () => {
    return async (dispatch) => {
        let record = await axios.get(`http://localhost:8000/user`);
        dispatch({
            type: "VIEW",
            payload: record.data
        })
    }
}

export const ADD_RECORD = (name, phone) => {
    return async (dispatch) => {
        let add = await axios.post(`http://localhost:8000/user`, {
            name: name,
            phone: phone
        });
        dispatch(VIEW());
    }
}

export const DELETE_RECORD = (id) => {
    return async (dispatch) => {
        let delete_data = await axios.delete(`http://localhost:8000/user/${id}`);
        dispatch(VIEW());
    }
}


export const UPPDATE = (name,phone,id) => {
    return async (dispatch) => {
        let upp = await axios.put(`http://localhost:8000/user/${id}`,{
            name: name,
            phone: phone
        });
        dispatch(VIEW());
    }
} 