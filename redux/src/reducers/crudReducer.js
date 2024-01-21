let initialState = {
    users : localStorage.getItem('crud') ? JSON.parse(localStorage.getItem('crud')) : [],
    user : {}
}

const Crud = (state = initialState , action) => {
    switch(action.type){
        case "ADDRECORD" :
            let insertdata = action.payload;
            let data = [...state.users,insertdata];
            localStorage.setItem("crud",JSON.stringify(data));
            return{
                ...state,
                users : data
            }   
        break;

        case "DELETEDATA" :
            let deleteRecord = state.users.filter((val)=>{
                return val.id !== action.payload
            })
            localStorage.setItem("crud",JSON.stringify(deleteRecord));
            return{
                ...state,
                users : deleteRecord,
            }
        break;

        case "EDITDATA" :
            let edit = state.users.find((val) => {
                return val.id === action.payload
            })
            return{
                ...state,
                user : edit
            }
        break;

        case "UPDATE_RECORD" :
            let update = state.users.map((val)=>{
                if(val.id === action.payload.id){
                    return{
                        ...val,
                        name : action.payload.name,
                        phone : action.payload.phone
                    }
                }
                return val;
            })
            localStorage.setItem('crud',JSON.stringify(update));
            return {
                ...state,
                users : update
            }
        break;

        default :
        return state;
    }
}
export default Crud;