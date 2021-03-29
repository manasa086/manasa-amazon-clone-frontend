export const initialState={
    basket:[],
    user:null
}

export const getBasketTotal=(basket)=>{
    const out=basket?.reduce((amount,item)=>item.price+amount,0);
    return out;

}



const reducer=(state,action)=>{
    switch(action.type){
        case "ADD_TO_BASKET":
            return{
                ...state,
                basket:[...state.basket,action.item],
            };
        
        case "REMOVE_FROM_BASKET":
            // let newBasket=[...state.basket];
            // let newBasket_index=state.basket.findIndex(each=>Number(each.index)==Number(action.index));
            // if(newBasket_index>=0)
            // {
            //     newBasket.splice(newBasket_index,1);
            // }
            // else{
            //     console.warn('Cannot remove Product from basket')
            // }
           
            return {
                ...state,
            basket:action.data};
        case "EMPTY_BASKET":
            return{
                basket:[]
            }
        case "SET_USER":
            return{
                ...state,
                user:action.user 
            }
        default:
            return state;

    }
};

export default reducer;