import { useReducer } from "react";

let initialState = 0;
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INC':
            return state + 1;
        case 'DEC':
            return state - 1;
    }
}

const CostumReducer = () => {
    const [no, dispatch] = useReducer(reducer, initialState);

    const clickPlus = () => {
        dispatch({
            type: 'INC'
        })
    }
    const clickMinus = () => {
        dispatch({
            type: 'DEC'
        })
    }

    return (
        <>
            <h1>Costum Reducer</h1>
            <button onClick={() => clickPlus()}>+</button>
            <button onClick={() => clickMinus()}>-</button>
            <h2>{no}</h2>
        </>
    )
}

export default CostumReducer;