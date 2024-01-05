export const increment = (nr) => (
    {
        type: 'INCREMENT',
        payload: nr
    }
)

export const decrement = () =>{
    return {
        type: 'DECREMENT'
    }
}
