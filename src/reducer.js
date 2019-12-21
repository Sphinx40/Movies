const initial = {
    search: 'avengers',
    favourites: []
}
const reducer = (state = initial, action) => {
    switch (action.type) {
        case 'SEARCH':
            return {
                ...state,
                search: action.payload
            }
        case 'FAVS':
            const t = state.favourites.findIndex(({ id }) => id === action.payload.id);

            if (t < 0) {
                return {
                    ...state,
                    favourites: [...state.favourites, { id: action.payload.id, title: action.payload.title, img: action.payload.img }]
                }
            }else{
               return state;
            }
        case 'DELETE':
            const newArray = [
                ...state.favourites.slice(0, action.payload),
                ...state.favourites.slice(action.payload + 1)
            ];
           
           
            return {
                ...state,
                favourites: newArray
            }
        default:
            return state;
    }
}
export default reducer;