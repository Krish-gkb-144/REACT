export const INC = () => {
    return{
        type : "INCREMENT"
    }
}
export const DEC = () => {
    return{
        type :"DECREMENT"
    }
}
export const ADDRECORD = (data) => {
    return{
        type :"ADDRECORD",
        payload : data
    }
}
export const DELETEDATA = (id) => {
    return{
        type : "DELETEDATA",
        payload : id
    }
}
export const EDITDATA = (id) => {
    return{
        type : "EDITDATA",
        payload : id
    }
}
export const UPDATE_RECORD = (data) => {
    return{
        type : "UPDATE_RECORD",
        payload : data
    }
}