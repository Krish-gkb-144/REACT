let initialState = 0;

const Counter = (state = initialState,action) => {
    switch(action.type){

        case "INCREMENT" :
            return state + 1
        break;

        case "DECREMENT" :
            return state - 1
        break;

        default : 
            return state;

    }
}

export default Counter;