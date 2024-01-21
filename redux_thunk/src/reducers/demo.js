let initialState = {
    user: [],
};

const Counter = (state = initialState, action) => {
    switch (action.type) {
        // case "INC":
        //     let count =  state.pcount + 1
        //     return{
        //         ...state,
        //         user : count
        //     }

        case 'VIEW':
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}

export default Counter;